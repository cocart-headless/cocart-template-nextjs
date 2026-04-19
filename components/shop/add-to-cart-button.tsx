"use client";

import { useState } from "react";
import type { Product } from "@/lib/cocart.d";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  product: Product;
  showQuantity?: boolean;
  variation?: Record<string, string>;
}

export function AddToCartButton({ product, showQuantity = false, variation, children, ...props }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const isDisabled = props.disabled || loading;

  async function handleClick() {
    if (isDisabled) return;
    setLoading(true);
    try {
      await addItem(product.id, quantity, variation);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3 w-full">
      {showQuantity && <div className="flex items-center border rounded-md overflow-hidden">
        <button
          type="button"
          className="px-3 py-2 text-sm hover:bg-muted transition-colors disabled:opacity-50"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1 || isDisabled}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="px-4 py-2 text-sm font-medium min-w-[2.5rem] text-center">{quantity}</span>
        <button
          type="button"
          className="px-3 py-2 text-sm hover:bg-muted transition-colors disabled:opacity-50"
          onClick={() => setQuantity((q) => q + 1)}
          disabled={isDisabled}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>}

      <Button onClick={handleClick} disabled={isDisabled} {...props} className={`flex-1 ${props.className ?? ""}`}>
        {loading ? "Adding..." : (children ?? "Add to cart")}
      </Button>
    </div>
  );
}
