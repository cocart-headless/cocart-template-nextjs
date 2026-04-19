"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { Cart, CartItem } from "@/lib/cocart.d";
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from "@/lib/cocart";

const CART_KEY_STORAGE = "cocart_cart_key";

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  addItem: (productId: number, quantity?: number, variation?: Record<string, string>) => Promise<void>;
  updateItem: (itemKey: string, quantity: number) => Promise<void>;
  removeItem: (itemKey: string) => Promise<void>;
  clear: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await getCart();
      setCart(data);
      if (data.cart_key) localStorage.setItem(CART_KEY_STORAGE, data.cart_key);
    } catch {
      // Ignore errors on initial load — cart may not exist yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(async (productId: number, quantity = 1, variation?: Record<string, string>) => {
    const updated = await addToCart(productId, quantity, variation);
    setCart(updated);
  }, []);

  const updateItem = useCallback(async (itemKey: string, quantity: number) => {
    const updated = await updateCartItem(itemKey, quantity);
    setCart(updated);
  }, []);

  const removeItem = useCallback(async (itemKey: string) => {
    const updated = await removeCartItem(itemKey);
    setCart(updated);
  }, []);

  const clear = useCallback(async () => {
    const updated = await clearCart();
    setCart(updated);
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
