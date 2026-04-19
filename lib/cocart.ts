import { createBrowserClient, attachCartKeyHeader } from "@cocartheadless/sdk/nextjs";
import type { Cart } from "./cocart.d";

export const STORE_URL = process.env.NEXT_PUBLIC_COCART_STORE_URL ?? "{{COCART_STORE_URL}}";

let _client: ReturnType<typeof createBrowserClient> | null = null;

export function getClient() {
  if (!_client) {
    _client = createBrowserClient(STORE_URL);
    attachCartKeyHeader(_client);
  }
  return _client;
}

export async function getCart(): Promise<Cart> {
  const response = await getClient().cart().get();
  return response.toObject<Cart>();
}

export async function addToCart(productId: number, quantity = 1): Promise<Cart> {
  const response = await getClient().cart().addItem(productId, quantity);
  return response.toObject<Cart>();
}

export async function updateCartItem(itemKey: string, quantity: number): Promise<Cart> {
  const response = await getClient().cart().updateItem(itemKey, { quantity });
  return response.toObject<Cart>();
}

export async function removeCartItem(itemKey: string): Promise<Cart> {
  const response = await getClient().cart().removeItem(itemKey);
  return response.toObject<Cart>();
}

export async function clearCart(): Promise<Cart> {
  const response = await getClient().cart().clear();
  return response.toObject<Cart>();
}
