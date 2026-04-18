export interface RenderedContent {
  rendered: string;
}

export interface FeaturedMedia {
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  avatar_urls: Record<string, string>;
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface PostTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface Post {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: RenderedContent;
  excerpt: RenderedContent;
  content: RenderedContent;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Author[];
    "wp:featuredmedia"?: FeaturedMedia[];
    "wp:term"?: (PostCategory[] | PostTag[])[];
  };
}
