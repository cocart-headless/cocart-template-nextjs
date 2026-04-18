import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-8 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} My Store. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <Link href="/posts" className="hover:text-foreground transition-colors">Blog</Link>
          <Link href="/cart" className="hover:text-foreground transition-colors">Cart</Link>
        </nav>
      </div>
    </footer>
  );
}
