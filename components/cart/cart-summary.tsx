"use client";

import Link from "next/link";
import type { Cart } from "@/lib/cocart.d";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  cart: Cart;
}

export function CartSummary({ cart }: CartSummaryProps) {
  const { totals } = cart;

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <h2 className="font-semibold text-lg">Order summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(totals.subtotal)}</span>
        </div>
        {parseFloat(totals.shipping_total) > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{formatPrice(totals.shipping_total)}</span>
          </div>
        )}
        {parseFloat(totals.total_tax) > 0 && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>{formatPrice(totals.total_tax)}</span>
          </div>
        )}
      </div>

      <div className="border-t pt-4 flex justify-between font-semibold">
        <span>Total</span>
        <span>{formatPrice(totals.total)}</span>
      </div>

      <Button asChild className="w-full" size="lg">
        <Link href="/checkout">Proceed to checkout</Link>
      </Button>
    </div>
  );
}
