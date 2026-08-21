import { listProducts } from "@/lib/services/product-service";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";

export const revalidate = 60; // ISR: refresh product list every 60s at most

export default async function Home() {
  const products: Awaited<ReturnType<typeof listProducts>> = await listProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-2xl font-semibold">Jalal Sons</h1>

      {products.length === 0 ? (
        <p className="text-muted-foreground">
          No products yet — run <code>npm run db:seed</code> after connecting your database.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="mb-4 aspect-[4/3] rounded-md bg-cover bg-center"
                  style={{ backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : undefined }}
                />
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <p className="mt-2 font-medium">
                  {(product.priceCents / 100).toFixed(2)} {product.currency}
                </p>
              </CardContent>
              <CardFooter>
                <ProductCard product={product} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
