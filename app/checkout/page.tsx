"use client";

import { useCart } from "@/components/cart/cart-provider";
import { CartSummary } from "@/components/cart/cart-summary";

export default function CheckoutPage() {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/*
           * CheckoutForm goes here.
           * Run: create-cocart init --extensions checkout
           * to wire up a payment gateway and generate the CheckoutForm component.
           */}
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
            <p className="font-medium mb-1">Payment form not set up yet</p>
            <p className="text-sm">
              Run{" "}
              <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                create-cocart init --extensions checkout
              </code>{" "}
              to add a payment gateway.
            </p>
          </div>
        </div>

        {cart && <CartSummary cart={cart} />}
      </div>
    </div>
  );
}
