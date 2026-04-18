import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/cocart.d";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "./add-to-cart-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];

  return (
    <Card className="overflow-hidden group">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-square bg-muted overflow-hidden">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt || product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          {product.on_sale && (
            <Badge className="absolute top-2 left-2" variant="destructive">
              Sale
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-medium leading-tight hover:underline line-clamp-2">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.on_sale && product.regular_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.regular_price)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} className="w-full" />
      </CardFooter>
    </Card>
  );
}
