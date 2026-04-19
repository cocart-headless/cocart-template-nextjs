import { createServerClient } from "@cocartheadless/sdk/nextjs";
import { headers } from "next/headers";
import type { Product, Category } from "./cocart.d";

export const STORE_URL = process.env.NEXT_PUBLIC_COCART_STORE_URL ?? "{{COCART_STORE_URL}}";

async function getClient() {
  const headersList = await headers();
  return createServerClient(STORE_URL, headersList);
}

export async function getProducts(params?: {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
}): Promise<Product[]> {
  const client = await getClient();
  const { perPage, ...rest } = params ?? {};
  const sdkParams = { ...rest, ...(perPage !== undefined ? { per_page: perPage } : {}) };
  const response = await client.products().all(Object.keys(sdkParams).length ? sdkParams : undefined);
  const data = response.toObject<{ products: Product[] } | Product[]>();
  return Array.isArray(data) ? data : (data as { products: Product[] }).products ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const products = await getProducts({ search: slug, perPage: 100 });
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`Product not found: ${slug}`);
  return product;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return getProducts({ category: categorySlug });
}

export async function getCategories(): Promise<Category[]> {
  const client = await getClient();
  const response = await client.products().categories();
  const data = response.toObject<Category[] | unknown>();
  return Array.isArray(data) ? data : [];
}
