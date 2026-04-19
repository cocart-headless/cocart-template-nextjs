import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/cocart-server";
import { ProductGallery } from "@/components/shop/product-gallery";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts({ perPage: 100 }).catch(() => []);
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) return {};
  const image = product.images[0]?.src?.large || product.images[0]?.src?.full;
  return {
    title: product.name,
    description: product.short_description || product.name,
    openGraph: {
      title: product.name,
      description: product.short_description || product.name,
      images: image ? [{ url: image }] : [],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-4">
          <div>
            {product.categories.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="mr-1">
                {cat.name}
              </Badge>
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
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          <AddToCartButton product={product} size="lg" className="w-full sm:w-auto" />

          {product.description && (
            <div className="pt-6 border-t">
              <h2 className="font-semibold mb-2">Description</h2>
              <div
                className="prose prose-sm max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
