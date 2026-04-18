import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/cocart";
import { getPosts } from "@/lib/wordpress";

const BASE_URL = process.env.NEXT_PUBLIC_COCART_STORE_URL ?? "https://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, { posts }] = await Promise.all([
    getProducts({ perPage: 100 }).catch(() => []),
    getCategories().catch(() => []),
    getPosts(1, 100).catch(() => ({ posts: [] })),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/cart`, lastModified: new Date(), changeFrequency: "never", priority: 0.1 },
    { url: `${BASE_URL}/posts`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/shop/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/posts/${p.slug}`,
    lastModified: new Date(p.modified),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...postRoutes];
}
