import type { Post, PostCategory, PostTag, Author } from "./wordpress.d";

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? "{{WORDPRESS_URL}}";

async function wpFetch<T>(path: string): Promise<T> {
  const url = `${WP_URL}/wp-json/wp/v2${path}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`WordPress API error: ${res.status} ${url}`);
  return res.json() as Promise<T>;
}

export async function getPosts(page = 1, perPage = 10): Promise<{
  posts: Post[];
  total: number;
  totalPages: number;
}> {
  const url = `${WP_URL}/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const posts = (await res.json()) as Post[];
  const total = Number(res.headers.get("X-WP-Total") ?? 0);
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);
  return { posts, total, totalPages };
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const results = await wpFetch<Post[]>(`/posts?slug=${slug}&_embed`);
  if (!results.length) throw new Error(`Post not found: ${slug}`);
  return results[0];
}

export async function getPostCategories(): Promise<PostCategory[]> {
  return wpFetch<PostCategory[]>("/categories?per_page=100");
}

export async function getPostTags(): Promise<PostTag[]> {
  return wpFetch<PostTag[]>("/tags?per_page=100");
}
