import { getProducts, getCategories } from "@/lib/cocart-server";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { SortSelect } from "@/components/shop/sort-select";
import Link from "next/link";

export const metadata = { title: "Shop" };

interface Props {
  searchParams: Promise<{ orderby?: string }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const { orderby } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({ perPage: 24, orderby } as Parameters<typeof getProducts>[0]).catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/shop">All</Link>
            </Button>
            {categories.map((cat) => (
              <Button key={cat.id} variant="outline" size="sm" asChild>
                <Link href={`/shop/category/${cat.slug}`}>{cat.name}</Link>
              </Button>
            ))}
          </div>
        )}
        <SortSelect />
      </div>

      {products.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
