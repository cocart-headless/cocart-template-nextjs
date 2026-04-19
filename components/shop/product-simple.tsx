import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/shop/product-gallery";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { ProductMeta } from "@/components/shop/product-meta";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/cocart.d";

export function ProductSimple({ product }: { product: Product }) {
  const outOfStock = product.stock?.stock_status === "outofstock";

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

          {!outOfStock && <AddToCartButton product={product} size="lg" className="w-full sm:w-auto" showQuantity />}

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
