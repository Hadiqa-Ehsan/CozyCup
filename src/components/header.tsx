"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useBranchStore } from "@/store/branch-store";
import { SearchBar } from "@/components/search-bar";
import { Logo } from "@/components/logo";
import { CategoryMenu } from "@/components/category-menu";
import { CartDrawer } from "@/components/cart-drawer";
import { Button } from "@/components/ui/button";
import type { CategoryNode } from "@/lib/types";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const itemCount = useCartStore((s) => s.itemCount());
  const branch = useBranchStore((s) => s.branch);
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  return (
    <header className="border-b bg-background">
      {/* Row 1: logo, delivery location, search, login, cart */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={36} />
        </Link>

        <Link href="/branches" className="flex flex-col text-xs leading-tight">
          <span className="font-semibold text-primary">Delivery to ▾</span>
          <span className="text-muted-foreground">
            {mounted && branch ? `${branch.area}, ${branch.city}` : "Select location"}
          </span>
        </Link>

        <div className="flex-1">
          <SearchBar />
        </div>

        {mounted && status === "authenticated" ? (
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/account"
              className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 hover:bg-accent"
            >
              <User size={16} />
              {session?.user?.name?.split(" ")[0] || "Account"}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-xs text-muted-foreground hover:underline"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Button asChild variant="outline" size="sm">
            <Link href="/login">
              <User size={16} /> Login
            </Link>
          </Button>
        )}

        <Button size="sm" className="relative" onClick={() => setCartOpen(true)}>
          <ShoppingCart size={16} />
          Cart
          {mounted && itemCount > 0 && (
            <span className="ml-1 rounded-full bg-primary-foreground px-1.5 text-xs text-primary">
              {itemCount}
            </span>
          )}
        </Button>
      </div>

      {/* Row 2: categories menu, contact placeholder, welcome message */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-2.5 text-sm">
          <CategoryMenu categories={categories} />
          <span className="text-muted-foreground">
            Sample contact info — placeholder for demo (see footer note)
          </span>
          <span className="hidden text-primary sm:inline">Welcome to Jalal Sons</span>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
