import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Nav } from "./nav";
import { MobileMenu } from "./mobile-menu";
import { CartCount } from "@/components/cart/cart-count";
import { SearchInput } from "@/components/shop/search-input";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl tracking-tight">
          My Store
        </Link>

        <Nav />

        <SearchInput />

        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative flex items-center gap-1 text-sm font-medium">
            <ShoppingCart className="h-5 w-5" />
            <CartCount />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
