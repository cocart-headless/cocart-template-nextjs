"use client";

import { useState } from "react";
import type { Product } from "@/lib/cocart.d";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  product: Product;
  quantity?: number;
}

export function AddToCartButton({ product, quantity = 1, children, ...props }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const outOfStock = product.stock_status === "outofstock";

  async function handleClick() {
    if (loading || outOfStock) return;
    setLoading(true);
    try {
      await addItem(product.id, quantity);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleClick} disabled={loading || outOfStock} {...props}>
      {loading ? "Adding..." : outOfStock ? "Out of stock" : (children ?? "Add to cart")}
    </Button>
  );
}
