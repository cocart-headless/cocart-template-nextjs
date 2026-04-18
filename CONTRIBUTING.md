# Contributing

Thank you for your interest in contributing to this template. This guide covers everything you need to get up and running locally and submit changes.

For a deeper reference on conventions and tooling used in this project, see [AGENT.md](AGENT.md).

---

## Prerequisites

- **Node.js** 18.17 or later
- **npm** 9 or later (ships with Node.js)
- A running **WordPress + WooCommerce** site with the [CoCart plugin](https://cocartapi.com) installed and activated
- **Git**

---

## Local WordPress setup

1. Install and activate WooCommerce on your WordPress site.
2. Install and activate the [CoCart plugin](https://wordpress.org/plugins/cart-rest-api-for-woocommerce/).
3. Enable pretty permalinks: **Settings → Permalinks** — select any option except "Plain".
4. Verify the CoCart API is reachable:
   ```
   https://your-store.com/wp-json/cocart/v2/products
   ```
5. Verify the WordPress REST API is reachable:
   ```
   https://your-store.com/wp-json/wp/v2/posts
   ```

---

## Development

1. **Clone the repo and install dependencies:**
   ```bash
   git clone <repo-url>
   cd cocart-template-nextjs
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in `.env.local`:
   ```bash
   NEXT_PUBLIC_COCART_STORE_URL=https://your-store.com
   NEXT_PUBLIC_COCART_STORE_HOSTNAME=your-store.com

   NEXT_PUBLIC_WORDPRESS_URL=https://your-store.com
   NEXT_PUBLIC_WORDPRESS_HOSTNAME=your-store.com
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```
   The storefront is available at `http://localhost:3000`.

---

## Testing

There is no automated test suite in this template. Before submitting a pull request, manually verify:

- Products load on `/shop`
- Category filtering works
- A product detail page renders correctly
- Adding an item to the cart works and the cart count updates
- The cart page at `/cart` renders correctly
- Blog posts load on `/posts`
- Search returns results at `/search?q=<term>`
- `npm run build` completes without errors
- `npm run typecheck` reports no type errors
- `npm run lint` reports no lint errors

---

## Code style

- **TypeScript** — strict mode throughout; no `any` unless unavoidable
- **Server Components by default** — add `"use client"` only when the component requires browser APIs or React state/effects
- **Async params** — use `params: Promise<{ slug: string }>` (Next.js 15+ pattern)
- **No unnecessary comments** — only add a comment when the *why* is non-obvious
- **Tailwind CSS** — use the `cn()` utility from `lib/utils.ts` for conditional class names
- **Formatting** — follow the existing style; do not introduce a new formatter config

---

## Commit & pull request guidelines

- Use clear, descriptive commit messages in the imperative mood:
  `Add category filter to shop page` not `Added category filter`
- Keep commits focused — one logical change per commit
- Open a pull request against `main`
- Fill in the PR description with what changed and why
- Ensure `npm run build`, `npm run typecheck`, and `npm run lint` all pass before requesting a review

---

## Reporting bugs

Please [open an issue](../../issues) and include:

- A clear description of the bug
- Steps to reproduce
- Expected vs actual behaviour
- Your Node.js version (`node -v`) and npm version (`npm -v`)
- Any relevant error output from the browser console or terminal

---

## AI-assisted contributions

Contributions written with the help of AI tools (GitHub Copilot, Claude, ChatGPT, etc.) are welcome, provided:

- **You review and understand every line** before submitting — you are responsible for the correctness and quality of the code
- **No AI-generated placeholder comments** — remove any `// TODO: implement`, `// AI generated`, or similar filler
- The code follows the same [code style](#code-style) as the rest of the project
- Type safety is maintained — do not weaken TypeScript strictness to satisfy an AI suggestion
- If you used an AI agent with the [AGENT.md](AGENT.md) context file, note it briefly in your PR description

---

## License

By contributing you agree that your changes will be licensed under the [MIT License](LICENSE).
