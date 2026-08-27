"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import type { CategoryNode } from "@/lib/types";

export function CategoryMenu({ categories }: { categories: CategoryNode[] }) {
  const [open, setOpen] = useState(false);
  const [activeParent, setActiveParent] = useState<CategoryNode | null>(null);

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen((v) => !v);
          setActiveParent(null);
        }}
        className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        <Menu size={16} />
        Categories
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-1 flex min-w-[220px] rounded-md border bg-background shadow-lg">
            <div className="flex flex-col py-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onMouseEnter={() => setActiveParent(cat)}
                  onClick={() => setActiveParent(cat)}
                  className={`flex items-center justify-between gap-4 px-4 py-2.5 text-left text-sm hover:bg-accent hover:text-accent-foreground ${
                    activeParent?.id === cat.id ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  <Link href={`/shop/${cat.slug}`} onClick={() => setOpen(false)} className="flex-1">
                    {cat.name}
                  </Link>
                  {cat.children.length > 0 && <ChevronRight size={14} />}
                </button>
              ))}
              <Link
                href="/deals"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
              >
                Deals
              </Link>
            </div>

            {activeParent && activeParent.children.length > 0 && (
              <div className="flex flex-col border-l py-2">
                {activeParent.children.map((child) => (
                  <Link
                    key={child.id}
                    href={`/shop/${child.slug}`}
                    onClick={() => setOpen(false)}
                    className="whitespace-nowrap px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
