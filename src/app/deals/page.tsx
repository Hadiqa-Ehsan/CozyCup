import { listDealProducts } from "@/lib/services/product-service";
import { ProductCard } from "@/components/product-card";
import { BranchRequiredNotice } from "@/components/branch-selector";
import type { ProductSummary } from "@/lib/types";

export const revalidate = 60;

export default async function DealsPage() {
  const deals = (await listDealProducts()) as ProductSummary[];

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <BranchRequiredNotice />
      <h1 className="mb-6 text-2xl font-semibold">Today&apos;s Deals</h1>

      {deals.length === 0 ? (
        <p className="text-muted-foreground">No active deals right now — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
