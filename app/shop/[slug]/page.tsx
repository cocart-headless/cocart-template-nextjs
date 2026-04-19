import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/cocart-server";
import { ProductSimple } from "@/components/shop/product-simple";
import { ProductVariable } from "@/components/shop/product-variable";

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
      {product.type === "variable" ? (
        <ProductVariable product={product} />
      ) : (
        <ProductSimple product={product} />
      )}
    </div>
  );
}
