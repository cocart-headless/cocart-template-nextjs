# AGENT.md

This file provides guidance to any AI coding agent when working with code in this template.

## Tech stack

| | |
|---|---|
| [Next.js](https://nextjs.org/) | React framework (App Router) |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [shadcn/ui](https://ui.shadcn.com/) | UI components |
| [craft](https://github.com/brijr/craft) | Flexible design system |
| [@cocartheadless/sdk](https://www.npmjs.com/package/@cocartheadless/sdk) | CoCart API client |

## Architecture Overview

Headless WooCommerce storefront powered by CoCart, built with Next.js App Router, React 19, TypeScript, Tailwind CSS, and shadcn/ui.

## Placeholder Variables

This template uses two substitution variables that are replaced by the CLI at init time:

- `{{COCART_STORE_URL}}` — replaced with the WooCommerce store URL
- `{{WORDPRESS_URL}}` — replaced with the WordPress site URL (may differ from store URL)

These appear in `.env.example`, `lib/cocart.ts`, `lib/wordpress.ts`, and `next.config.ts`.

## Project Structure

```text
lib/
  cocart.ts        # CoCart browser client, product/cart helper functions
  cocart.d.ts      # Product, Category, Cart, CartItem types
  wordpress.ts     # WordPress REST API helpers (posts, categories)
  wordpress.d.ts   # Post, Author, Category, FeaturedMedia types
  utils.ts         # cn() Tailwind utility, formatPrice()
components/
  ui/              # shadcn/ui primitives (Button, Card, Badge, Input, Skeleton)
  layout/          # Header, Footer, Nav, MobileMenu
  shop/            # ProductCard, ProductGallery, AddToCartButton, SearchInput
  cart/            # CartProvider (React context), CartItem, CartSummary, CartCount
  posts/           # PostCard
app/
  layout.tsx       # Root layout — CartProvider, OG metadata defaults
  page.tsx         # Homepage — hero + featured products + categories
  error.tsx        # Global error boundary
  not-found.tsx    # 404 page
  sitemap.ts       # /sitemap.xml — products, categories, posts, static routes
  robots.ts        # /robots.txt
  shop/            # Product listing, product detail, category listing
    loading.tsx    # Skeleton grid
    error.tsx      # Error boundary
  cart/            # Cart page (client component)
  checkout/        # Minimal checkout shell + thank-you page
  posts/           # Blog listing and post detail
    loading.tsx    # Skeleton grid
    error.tsx      # Error boundary
  search/          # /search?q=... — product search results
    loading.tsx    # Skeleton grid
```

## Data Layer

### CoCart (`lib/cocart.ts`)

- Browser client via `createBrowserClient` from `@cocartheadless/sdk/nextjs`
- `attachCartKeyHeader` persists cart session across requests
- Functions: `getProducts`, `getProductBySlug`, `getProductsByCategory`, `getCategories`, `getCart`, `addToCart`, `updateCartItem`, `removeCartItem`, `clearCart`
- Returns strongly-typed objects via `.toObject<T>()`

### WordPress (`lib/wordpress.ts`)

- Direct REST API calls to `/wp-json/wp/v2`
- Functions: `getPosts`, `getPostBySlug`, `getPostCategories`, `getPostTags`
- Uses `next: { revalidate: 3600 }` for incremental static regeneration (1-hour cache)

## Cart System

`CartProvider` is a React context component wrapping the entire app (see `app/layout.tsx`). It:

- Fetches the cart on mount
- Persists the cart key to `localStorage`
- Exposes: `cart`, `loading`, `addItem`, `updateItem`, `removeItem`, `clear`

All client components that need cart access use `useCart()` from `components/cart/cart-provider`.

## Checkout

The checkout page (`app/checkout/page.tsx`) is a minimal shell. The actual payment form is injected by the CLI when you run:

```bash
create-cocart init --extensions checkout
```

This adds the `@cocartheadless/checkout` extension with your chosen payment gateway.

## Code Style

- Strict TypeScript throughout
- Server Components by default; `"use client"` only for interactivity
- Async params: `params: Promise<{ slug: string }>` (Next.js 15+ pattern)
- No comments on obvious code — only when WHY is non-obvious

## Environment Variables

```
NEXT_PUBLIC_COCART_STORE_URL=https://your-store.com
NEXT_PUBLIC_COCART_STORE_HOSTNAME=your-store.com   # for next.config.ts image domains

NEXT_PUBLIC_WORDPRESS_URL=https://your-store.com
NEXT_PUBLIC_WORDPRESS_HOSTNAME=your-store.com      # for next.config.ts image domains
```

Copy `.env.example` to `.env.local` and fill in your values.
