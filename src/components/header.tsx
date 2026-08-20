"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";
import { BranchSelectorButton } from "@/components/branch-selector";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/deals", label: "Deals" },
  { href: "/branches", label: "Locations" },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const { data: session, status } = useSession();

  useEffect(() => setMounted(true), []);

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-bold whitespace-nowrap">
            Jalal Sons
          </Link>
          <BranchSelectorButton />
        </div>

        <SearchBar />

        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}

          <Link href="/cart" className="relative hover:underline">
            Cart
            {mounted && itemCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          {mounted && status === "authenticated" ? (
            <div className="flex items-center gap-3">
              <Link href="/account" className="hover:underline">
                {session?.user?.name || "Account"}
              </Link>
              <Button size="sm" variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
