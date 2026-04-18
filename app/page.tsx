import Link from "next/link";
import { getProducts, getCategories } from "@/lib/cocart";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ perPage: 8 }).catch(() => []),
    getCategories().catch(() => []),
  ]);

  const featured = products.filter((p) => p.featured).slice(0, 4);
  const showcase = featured.length >= 4 ? featured : products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="py-24 px-4 text-center bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Welcome to My Store
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover our collection of products, powered by CoCart.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Shop now</Link>
          </Button>
        </div>
      </section>

      {/* Featured products */}
      {showcase.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Featured products</h2>
              <Button variant="outline" asChild>
                <Link href="/shop">View all</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {showcase.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8">Shop by category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.slice(0, 8).map((cat) => (
                <Button key={cat.id} variant="outline" asChild>
                  <Link href={`/shop/category/${cat.slug}`}>{cat.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
