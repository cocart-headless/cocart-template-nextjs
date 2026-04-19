"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

function getInitials(customer: { first_name: string; last_name: string; display_name: string }) {
  if (customer.first_name || customer.last_name) {
    return `${customer.first_name.charAt(0)}${customer.last_name.charAt(0)}`.toUpperCase();
  }
  return customer.display_name.charAt(0).toUpperCase();
}

export function UserAvatar() {
  const { customer, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!customer) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        Sign in
      </Link>
    );
  }

  const AUTH_ONLY_PATHS = ["/account", "/orders", "/checkout"];

  function handleLogout() {
    logout();
    setOpen(false);
    if (AUTH_ONLY_PATHS.some((p) => window.location.pathname.startsWith(p))) {
      router.push("/");
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-semibold overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Account menu"
        aria-expanded={open}
      >
        {customer.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={customer.avatar_url} alt={customer.display_name} className="w-full h-full object-cover" />
        ) : (
          getInitials(customer)
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-md border bg-background shadow-md z-50 py-1">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium truncate">{customer.display_name}</p>
            <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
          </div>
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
          >
            My account
          </Link>
          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
          >
            Orders
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
