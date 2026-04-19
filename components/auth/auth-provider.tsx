"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { Customer } from "@/lib/auth.d";

const STORAGE_KEY = "cocart_customer";

interface AuthContextValue {
  customer: Customer | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCustomer(JSON.parse(stored) as Customer);
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json() as { customer?: Customer; extras?: Record<string, unknown>; error?: string };

    if (!res.ok) {
      throw new Error(data.error ?? "Login failed.");
    }

    const user = data.customer!;
    setCustomer(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

    // Persist JWT tokens if the CoCart JWT Auth plugin is active
    if (data.extras?.jwt_token) {
      localStorage.setItem("cocart_jwt_token", data.extras.jwt_token as string);
    }
    if (data.extras?.jwt_refresh) {
      localStorage.setItem("cocart_jwt_refresh_token", data.extras.jwt_refresh as string);
    }
  }, []);

  const logout = useCallback(() => {
    setCustomer(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("cocart_jwt_token");
    localStorage.removeItem("cocart_jwt_refresh_token");
  }, []);

  return (
    <AuthContext.Provider value={{ customer, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
