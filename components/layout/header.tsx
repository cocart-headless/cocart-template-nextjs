import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Nav } from "./nav";
import { MobileMenu } from "./mobile-menu";
import { CartCount } from "@/components/cart/cart-count";
import { SearchInput } from "@/components/shop/search-input";
import { UserAvatar } from "@/components/auth/user-avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-6 px-4">
        <Link href="/" className="font-bold text-xl tracking-tight">
          My Store
        </Link>

        <Nav />

        <div className="flex flex-1 items-center justify-end gap-4">
          <SearchInput />
          <Link href="/cart" className="relative flex items-center gap-1 text-sm font-medium">
            <ShoppingCart className="h-5 w-5" />
            <CartCount />
          </Link>
          <UserAvatar />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
