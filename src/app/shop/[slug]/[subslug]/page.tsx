"use client";

import React, { useState, useRef, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { mockCategories, mockProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";

// SVG Icons
const ChevronUpIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SlidersIcon = () => (
  <svg className="w-4 h-4 text-[#242222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Name (A to Z)", value: "name-asc" },
  { label: "Name (Z to A)", value: "name-desc" },
  { label: "Price (Low to High)", value: "price-asc" },
  { label: "Price (High to Low)", value: "price-desc" },
];

export default function SubCategoryPage({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }>;
}) {
  const { slug, subslug } = use(params);

  // Sorting and State
  const [sortBy, setSortBy] = useState("default");
  const [isSectionsOpen, setIsSectionsOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Parent & Subcategory
  const parentCategory = mockCategories.find((c) => c.slug === slug);
  if (!parentCategory) notFound();

  const subcategory = parentCategory.children?.find((c: any) => c.slug === subslug);
  if (!subcategory) notFound();

  // Filter products by subcategory (using categorySlug = subslug)
  let products = mockProducts.filter((p) => p.categorySlug === subslug);

  // Execute Sorting
  if (sortBy === "name-asc") {
    products = [...products].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    products = [...products].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "price-asc") {
    products = [...products].sort((a, b) => a.priceCents - b.priceCents);
  } else if (sortBy === "price-desc") {
    products = [...products].sort((a, b) => b.priceCents - a.priceCents);
  }

  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Default";

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 bg-[#F3EDD8] min-h-screen">
      {/* Breadcrumb - Home > Category > Subcategory */}
      <nav className="mb-3 text-xs text-[#D4C9B8] font-medium">
        <Link href="/" className="hover:text-[#A87A53] hover:underline">
          Home
        </Link>
        <span className="mx-1 text-[#D4C9B8]">&gt;</span>
        <Link href={`/shop/${parentCategory.slug}`} className="hover:text-[#A87A53] hover:underline">
          {parentCategory.name}
        </Link>
        <span className="mx-1 text-[#D4C9B8]">&gt;</span>
        <span className="text-[#242222]">{subcategory.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        
        {/* LEFT SIDEBAR FILTERS */}
        <aside className="rounded-2xl border border-[#D4C9B8] bg-[#F3EDD8] p-5 shadow-sm h-fit">
          <div className="flex items-center gap-2 border-b border-[#D4C9B8] pb-4">
            <SlidersIcon />
            <span className="font-bold text-[#242222] text-sm tracking-wide">Filters</span>
          </div>

          {/* SECTIONS - Shows all subcategories in this category */}
          <div className="mt-5 border-b border-[#D4C9B8] pb-5">
            <button
              type="button"
              onClick={() => setIsSectionsOpen(!isSectionsOpen)}
              className="flex w-full items-center justify-between font-bold text-xs text-[#242222] tracking-wider uppercase mb-3"
            >
              <span>SECTIONS</span>
              {isSectionsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>

            {isSectionsOpen && (
              <div className="flex flex-col gap-2.5">
                {parentCategory.children?.map((child: any) => {
                  const isActive = child.slug === subslug;
                  return (
                    <Link
                      key={child.id}
                      href={`/shop/${parentCategory.slug}/${child.slug}`}
                      className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                        isActive
                          ? "border border-[#A87A53] bg-[#BDD390] text-[#242222] shadow-sm"
                          : "text-[#242222] hover:bg-[#BDD390] hover:text-[#242222]"
                      }`}
                    >
                      <span
                        className={`h-3 w-3 rounded-full ${
                          isActive ? "bg-[#A87A53] ring-2 ring-[#A87A53]/20" : "bg-[#D4C9B8]"
                        } shrink-0`}
                      />
                      <span className="truncate">{child.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* LEFT SORT BY */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex w-full items-center justify-between font-bold text-xs text-[#242222] tracking-wider uppercase mb-3"
            >
              <span>SORT BY</span>
              {isSortOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>

            {isSortOpen && (
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map((option) => {
                  const isActive = sortBy === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSortBy(option.value)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all border ${
                        isActive
                          ? "border-[#A87A53] bg-[#A87A53] text-white"
                          : "border-[#D4C9B8] bg-[#F3EDD8] text-[#242222] hover:bg-[#A87A53] hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <div>
          {/* Header Bar */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-black text-[#242222] tracking-tight">
              {subcategory.name}
            </h1>

            {/* RIGHT DROPDOWN MENU */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-1.5 text-xs text-[#242222]">
                <span>Sort By</span>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 font-semibold text-[#242222] border-b border-[#D4C9B8] pb-0.5 hover:text-[#A87A53]"
                >
                  {currentSortLabel}
                  <ChevronDownIcon className="w-3 h-3 text-[#242222]" />
                </button>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#F3EDD8] p-1.5 shadow-xl border border-[#D4C9B8] z-50">
                  {SORT_OPTIONS.map((option) => {
                    const isActive = sortBy === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSortBy(option.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left rounded-lg px-3 py-2 text-xs transition-colors ${
                          isActive
                            ? "bg-[#A87A53] text-white font-semibold"
                            : "text-[#242222] hover:bg-[#A87A53] hover:text-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* PRODUCTS GRID - Shows products for this subcategory */}
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D4C9B8] bg-[#F3EDD8] p-12 text-center">
              <p className="text-sm text-[#242222]">No products found in this section.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}