import type { Cart } from "./cocart.d";

const CART_KEY_HEADER = "X-Cart-Key";

function getCartKey(): string | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem("cocart_cart_key");
}

function saveCartKey(key: string | null) {
  if (typeof localStorage === "undefined" || !key) return;
  localStorage.setItem("cocart_cart_key", key);
}

async function cartFetch(path: string, options: RequestInit = {}): Promise<Cart> {
  const cartKey = getCartKey();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };
  if (cartKey) headers[CART_KEY_HEADER] = cartKey;

  const res = await fetch(path, { ...options, headers });
  const cartKey2 = res.headers.get("Cart-Key");
  if (cartKey2) saveCartKey(cartKey2);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? `Cart error ${res.status}`);
  }
  return res.json() as Promise<Cart>;
}

export async function getCart(): Promise<Cart> {
  return cartFetch("/api/cart");
}

export async function addToCart(productId: number, quantity = 1, variation?: Record<string, string>): Promise<Cart> {
  return cartFetch("/api/cart/add-item", {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity, variation }),
  });
}

export async function updateCartItem(itemKey: string, quantity: number): Promise<Cart> {
  return cartFetch("/api/cart/update-item", {
    method: "POST",
    body: JSON.stringify({ item_key: itemKey, quantity }),
  });
}

export async function removeCartItem(itemKey: string): Promise<Cart> {
  return cartFetch("/api/cart/remove-item", {
    method: "DELETE",
    body: JSON.stringify({ item_key: itemKey }),
  });
}

export async function clearCart(): Promise<Cart> {
  return cartFetch("/api/cart/clear", { method: "DELETE" });
}
