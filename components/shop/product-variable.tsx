"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/shop/product-gallery";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { ProductMeta } from "@/components/shop/product-meta";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/cocart.d";

export function ProductVariable({ product }: { product: Product }) {
  const attributes = Object.values(product.attributes ?? {})
    .filter((a) => a.is_attribute_visible)
    .sort((a, b) => a.position - b.position);

  const [selected, setSelected] = useState<Record<string, string>>({});
  const outOfStock = product.stock?.stock_status === "outofstock";
  const allSelected = attributes.length === 0 || attributes.every((a) => !!selected[a.name]);

  // Build variation in the format the API expects: { "attribute_pa_color": "beige", ... }
  const variationPayload = Object.fromEntries(
    Object.entries(product.attributes ?? {})
      .filter(([, attr]) => attr.is_attribute_visible && selected[attr.name])
      .map(([key, attr]) => [key, selected[attr.name]])
  );

  function toggle(name: string, option: string) {
    setSelected((prev) => ({
      ...prev,
      [name]: prev[name] === option ? "" : option,
    }));
  }

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-10">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-4">
          <div>
            {product.categories.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="mr-1">{cat.name}</Badge>
            ))}
          </div>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold">{formatPrice(product.prices.price, product.prices.currency)}</span>
            {product.prices.on_sale && product.prices.regular_price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.prices.regular_price, product.prices.currency)}
              </span>
            )}
            {product.prices.on_sale && <Badge variant="destructive">Sale</Badge>}
          </div>

          {product.short_description && (
            <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.short_description }} />
          )}

          {attributes.map((attr) => (
            <div key={attr.id} className="space-y-2">
              <p className="text-sm font-medium">{attr.name}</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(attr.options).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={selected[attr.name] === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggle(attr.name, key)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {!outOfStock && (
            <>
              <AddToCartButton
                product={product}
                size="lg"
                className="w-full sm:w-auto"
                disabled={!allSelected}
                showQuantity
                variation={variationPayload}
              >
                {allSelected ? "Add to cart" : "Select options"}
              </AddToCartButton>
              {!allSelected && attributes.length > 0 && (
                <p className="text-sm text-muted-foreground">Please select all options above.</p>
              )}
            </>
          )}

          <ProductMeta product={product} />
        </div>
      </div>

      {product.description && (
        <div className="border-t pt-8">
          <h2 className="font-semibold text-lg mb-3">Description</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}
    </div>
  );
}
