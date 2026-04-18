import { createBrowserClient, attachCartKeyHeader } from "@cocartheadless/sdk/nextjs";
import type { Product, Category, Cart } from "./cocart.d";

export const STORE_URL = process.env.NEXT_PUBLIC_COCART_STORE_URL ?? "{{COCART_STORE_URL}}";

let _client: ReturnType<typeof createBrowserClient> | null = null;

export function getClient() {
  if (!_client) {
    _client = createBrowserClient(STORE_URL);
    attachCartKeyHeader(_client);
  }
  return _client;
}

export async function getProducts(params?: {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
}): Promise<Product[]> {
  const client = getClient();
  const response = await client.products().all(params);
  return response.toObject<Product[]>();
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const client = getClient();
  const response = await client.products().find(slug);
  return response.toObject<Product>();
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return getProducts({ category: categorySlug });
}

export async function getCategories(): Promise<Category[]> {
  const client = getClient();
  const response = await client.products().categories();
  return response.toObject<Category[]>();
}

export async function getCart(): Promise<Cart> {
  const client = getClient();
  const response = await client.cart().get();
  return response.toObject<Cart>();
}

export async function addToCart(productId: number, quantity = 1): Promise<Cart> {
  const client = getClient();
  const response = await client.cart().addItem({ product_id: productId, quantity });
  return response.toObject<Cart>();
}

export async function updateCartItem(itemKey: string, quantity: number): Promise<Cart> {
  const client = getClient();
  const response = await client.cart().updateItem(itemKey, { quantity });
  return response.toObject<Cart>();
}

export async function removeCartItem(itemKey: string): Promise<Cart> {
  const client = getClient();
  const response = await client.cart().removeItem(itemKey);
  return response.toObject<Cart>();
}

export async function clearCart(): Promise<Cart> {
  const client = getClient();
  const response = await client.cart().clear();
  return response.toObject<Cart>();
}
