import Link from "next/link";
import type { Product } from "@/lib/cocart.d";

interface ProductMetaProps {
  product: Product;
}

export function ProductMeta({ product }: ProductMetaProps) {
  const { stock, sku, categories } = product;
  const isOutOfStock = stock?.stock_status === "outofstock";
  const isManaged = stock?.manage_stock && stock?.stock_quantity !== null;

  return (
    <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
      {isOutOfStock && (
        <p className="text-destructive font-medium">This product is currently out of stock and unavailable.</p>
      )}
      {!isOutOfStock && isManaged && (
        <p>{stock.stock_quantity} in stock</p>
      )}
      {sku && (
        <p><span className="text-foreground font-medium">SKU:</span> {sku}</p>
      )}
      {categories.length > 0 && (
        <p>
          <span className="text-foreground font-medium">
            {categories.length === 1 ? "Category:" : "Categories:"}
          </span>{" "}
          {categories.map((cat, i) => (
            <span key={cat.id}>
              <Link href={`/shop/category/${cat.slug}`} className="underline hover:text-foreground transition-colors">
                {cat.name}
              </Link>
              {i < categories.length - 1 && ", "}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
