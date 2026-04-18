"use client";

import { useCart } from "./cart-provider";

export function CartCount() {
  const { cart } = useCart();
  const count = cart?.item_count ?? 0;
  if (!count) return null;
  return (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
      {count > 99 ? "99+" : count}
    </span>
  );
}
