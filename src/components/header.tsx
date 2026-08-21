"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";
import { useBranchStore } from "@/store/branch-store";
import { Search, ShoppingCart, User, MapPin, ChevronDown, Phone, Mail, Menu, X } from "lucide-react";
import { CategoryMenu } from "@/components/category-menu";
import { CartDrawer } from "@/components/cart-drawer";
import { OrderTypeSelector } from "@/components/order-type-selector";
import { Logo } from "@/components/logo";
import type { CategoryNode } from "@/lib/types";

const popularSearches = [
  "cake", "Pizza", "Ice cream", "Chocolate", "Chicken",
  "Bread", "Milk", "Cakes", "Samosa", "Can cake"
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full bg-white font-sans text-gray-800 border-b border-gray-100 shadow-sm">
        {/* Red top stripe */}
        <div className="h-2 w-full bg-[#3D2322]" />

        {/* Main Header */}
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Toggle */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6 text-[#C8102E]" /> : <Menu className="h-6 w-6 text-[#C8102E]" />}
            </button>

            {/* Logo */}
            <Logo size={44} />

            {/* Location Picker - Click to Open Modal */}
            <button
              onClick={() => setLocationOpen(true)}
              className="hidden sm:flex items-center gap-2 cursor-pointer select-none hover:opacity-80 transition"
            >
              <MapPin className="h-5 w-5 text-[#C8102E] fill-[#C8102E]" />
              <div className="flex flex-col text-left leading-tight">
                <div className="flex items-center gap-1 text-sm font-bold text-[#C8102E]">
                  <span>Delivery to</span>
                  <span className="text-[10px]">▼</span>
                </div>
                <span className="text-xs text-red-300 font-medium">
                  {branch?.name || "DHA Phase I, Rawalpindi"}
                </span>
              </div>
            </button>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl mx-2" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Looking for something? Start here..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-red-400 placeholder:text-gray-400"
                  onFocus={() => setSearchFocused(true)}
                />
              </div>

              {/* Popular Searches Dropdown */}
              {searchFocused && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular searches</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 hover:border-[#C8102E] transition"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Login & Cart */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              {mounted && status === "authenticated" ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{session?.user?.name}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-xl border border-[#C8102E] px-4 py-1.5 text-sm font-medium text-[#C8102E] hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 rounded-xl border border-[#C8102E] px-4 py-1.5 text-sm font-semibold text-[#C8102E] hover:bg-red-50 transition"
                >
                  <User className="h-4 w-4 text-[#C8102E]" />
                  Login
                </Link>
              )}

              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-[#C8102E] px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  {mounted ? itemCount : 0}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-3 border-t pt-3 md:hidden">
              <div className="space-y-2">
                <Link href="/shop" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  Shop
                </Link>
                <Link href="/deals" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  Deals
                </Link>
                <Link href="/branches" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                  Locations
                </Link>
                {mounted && status !== "authenticated" && (
                  <Link href="/login" className="block rounded-lg px-3 py-2 text-sm text-[#C8102E] hover:bg-gray-100">
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Secondary Sub-Bar */}
        <div className="border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-6">
              <CategoryMenu categories={categories} />
              <div className="hidden md:flex items-center gap-4 text-[#C8102E] font-medium text-sm">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  +923004805000
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  Info@Jalalsons.com.pk
                </span>
              </div>
            </div>
            <div className="text-[#C8102E] font-medium text-sm">Welcome to Jalal Sons</div>
          </div>
        </div>
      </header>

      {/* Order Type Selector Modal */}
      <OrderTypeSelector isOpen={locationOpen} onClose={() => setLocationOpen(false)} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}