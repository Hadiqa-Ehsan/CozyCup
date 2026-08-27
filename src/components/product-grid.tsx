"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import type { ProductSummary } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name (A to Z)" },
  { value: "name-desc", label: "Name (Z to A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  const [sort, setSort] = useState<SortValue>("default");

  const sorted = useMemo(() => {
    const copy = [...products];
    switch (sort) {
      case "name-asc":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return copy.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return copy.sort((a, b) => a.priceCents - b.priceCents);
      case "price-desc":
        return copy.sort((a, b) => b.priceCents - a.priceCents);
      default:
        return copy;
    }
  }, [products, sort]);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort By</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="rounded-md border bg-transparent px-2 py-1.5 text-sm"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {sorted.length === 0 ? (
        <p className="text-muted-foreground">
          No products found here yet. Try another category, or run{" "}
          <code>npm run db:seed</code> if your database is empty.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
