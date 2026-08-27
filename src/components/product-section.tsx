import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import type { ProductSummary } from "@/lib/types";

export function ProductSection({
  title,
  viewAllLink,
  products,
}: {
  title: string;
  viewAllLink?: string;
  products: ProductSummary[];
}) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-sm font-medium text-[#C8102E] hover:underline">
            View all
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}