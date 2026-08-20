import { listProducts } from "@/lib/services/product-service";
import { ProductCard } from "@/components/product-card";
import { BranchRequiredNotice } from "@/components/branch-selector";
import type { ProductSummary } from "@/lib/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const products = (q ? await listProducts({ query: q }) : []) as ProductSummary[];

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <BranchRequiredNotice />
      <h1 className="mb-6 text-2xl font-semibold">
        {q ? `Search results for "${q}"` : "Search"}
      </h1>

      {!q ? (
        <p className="text-muted-foreground">Type something in the search bar above to find products.</p>
      ) : products.length === 0 ? (
        <p className="text-muted-foreground">No products matched &quot;{q}&quot;. Try a different search term.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
