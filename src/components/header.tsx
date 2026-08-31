"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";
import { useBranchStore } from "@/store/branch-store";
import { Search, ShoppingCart, User, MapPin, ChevronDown, Phone, Mail, Menu, X } from "lucide-react";
import { CategoryMenuModal } from "@/components/category-menu";
import { CartDrawer } from "@/components/cart-drawer";
import { OrderTypeSelector } from "@/components/order-type-selector";
import { Logo } from "@/components/logo";
import { mockCategories } from "@/lib/mock-data";
import type { CategoryNode } from "@/lib/types";

const getPopularSearches = () => {
  const searches: string[] = [];
  mockCategories.forEach((category) => {
    if (category.children) {
      category.children.forEach((child: any) => {
        searches.push(child.name);
      });
    }
  });
  mockCategories.forEach((category) => {
    searches.push(category.name);
  });
  return [...new Set(searches)].slice(0, 12);
};

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [, setCategories] = useState<CategoryNode[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const itemCount = useCartStore((s) => s.totalItems());
  const branch = useBranchStore((s) => s.branch);
  const { data: session, status } = useSession();

  const popularSearches = getPopularSearches();

  useEffect(() => {
    setMounted(true);
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const hardcodedCategories: CategoryNode[] = [
      { id: "1", name: "Bakery", slug: "bakery", icon: "🍞", children: [] },
      { id: "2", name: "Dairy", slug: "dairy", icon: "🥛", children: [] },
      { id: "3", name: "Sweets", slug: "sweets", icon: "🍬", children: [] },
      { id: "4", name: "Fast Food", slug: "fast-food", icon: "🍔", children: [] },
      { id: "5", name: "Pan Asian", slug: "pan-asian", icon: "🥢", children: [] },
      { id: "6", name: "Grocery", slug: "grocery", icon: "🛒", children: [] },
      { id: "7", name: "Deli", slug: "deli", icon: "🥓", children: [] },
    ];
    setCategories(hardcodedCategories);
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

  const displayLabel = branch?.name || "Select Location";
  const orderTypeLabel = branch?.orderType === "delivery" ? "Delivery from" : "Pick-Up from";

  // Determine if header should be sticky
  const isSticky = !isMobile;

  return (
    <>
      <header 
        className={`w-full bg-[#3D2E24] font-sans text-[#F4F6F0] border-b border-[#98AB81]/20 shadow-md z-50 ${
          isSticky ? 'sticky top-0' : 'relative'
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 py-2 sm:px-4 sm:py-3 overflow-visible">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              type="button"
              className="md:hidden p-1 text-[#F4F6F0] hover:text-[#98AB81] flex-shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>

            <div className="flex-shrink-0">
              <Logo light size={36} />
            </div>

            <button
              type="button"
              onClick={() => setLocationOpen(true)}
              className="flex items-center gap-2 cursor-pointer select-none hover:opacity-80 transition flex-shrink-0 max-w-[180px] sm:max-w-none"
            >
              <MapPin className="h-4 w-4 text-[#98AB81] fill-[#98AB81] sm:h-5 sm:w-5" />
              <div className="flex flex-col text-left leading-tight min-w-0">
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#F4F6F0] sm:text-sm">
                  <span className="truncate">{orderTypeLabel}</span>
                  <span className="text-[8px] sm:text-[10px]">▼</span>
                </div>
                <span className="text-[9px] text-[#F4F6F0]/70 font-medium truncate sm:text-xs">
                  {mounted ? displayLabel : "Loading..."}
                </span>
              </div>
            </button>

            {/* Desktop Search */}
            <div className="relative hidden flex-1 max-w-2xl mx-2 md:block overflow-visible" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/60" />
                <input
                  type="text"
                  placeholder="Looking for something? Start here..."
                  className="w-full rounded-xl border border-[#3D2E24]/20 bg-[#F4F6F0] py-2 pl-10 pr-4 text-sm text-[#3D2E24] outline-none transition focus:ring-2 focus:ring-[#98AB81] placeholder:text-[#3D2E24]/50"
                  onFocus={() => setSearchFocused(true)}
                />
              </div>

              {searchFocused && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-xl border border-[#3D2E24]/15 bg-[#F4F6F0] shadow-xl text-[#3D2E24]">
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
                        {[
                          { name: "Bakery", image: "/images/bread.jpg", slug: "bakery" },
                          { name: "Dairy", image: "/images/fresh-milk.jpg", slug: "dairy" },
                          { name: "Sweets", image: "/images/mango-cake.jpg", slug: "sweets" },
                          { name: "Fast Food", image: "/images/chicken-burger.jpg", slug: "fast-food" },
                          { name: "Pan Asian", image: "/images/noodle-bowl.jpg", slug: "pan-asian" },
                          { name: "Grocery", image: "/images/snacks.jpg", slug: "grocery" },
                          { name: "Deals", image: "/images/chicken-burger.jpg", slug: "deals" },
                        ].map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/shop/${cat.slug}`}
                            className="flex flex-col items-center gap-1.5 rounded-lg transition hover:opacity-80"
                            onClick={() => setSearchFocused(false)}
                          >
                            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-[#3D2E24]/20 bg-white">
                              <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                            </div>
                            <span className="text-[11px] font-bold text-[#3D2E24]">{cat.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-[#3D2E24]/15"></div>
                    <div className="mt-3">
                      <p className="text-xs font-bold text-[#3D2E24] uppercase tracking-wide">POPULAR SEARCHES</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <button
                            type="button"
                            key={term}
                            className="rounded-full border border-[#3D2E24]/20 px-3 py-1 text-xs font-medium text-[#3D2E24] hover:bg-[#98AB81] hover:text-[#3D2E24] transition"
                            onClick={() => setSearchFocused(false)}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Auth & Cart */}
            <div className="flex items-center gap-1 flex-shrink-0 sm:gap-2.5">
              {mounted && status === "authenticated" ? (
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-[10px] font-semibold text-[#F4F6F0] sm:text-sm truncate max-w-[60px] sm:max-w-none">
                    {session?.user?.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-xl bg-[#98AB81] px-1.5 py-0.5 text-[9px] font-bold text-[#3D2E24] hover:bg-[#F4F6F0] transition sm:px-4 sm:py-1.5 sm:text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1 rounded-xl border border-[#98AB81] bg-[#98AB81] px-1.5 py-0.5 text-[9px] font-bold text-[#3D2E24] hover:bg-[#F4F6F0] transition sm:gap-1.5 sm:px-4 sm:py-1.5 sm:text-sm"
                >
                  <User className="h-3 w-3 text-[#3D2E24] sm:h-4 sm:w-4" />
                  <span className="text-[9px] sm:text-sm">Login</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-1 rounded-xl bg-[#98AB81] px-1.5 py-0.5 text-[9px] font-bold text-[#3D2E24] hover:bg-[#F4F6F0] transition sm:gap-2 sm:px-4 sm:py-1.5 sm:text-sm"
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-[9px] sm:text-sm">Cart</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3D2E24] text-[8px] font-extrabold text-[#F4F6F0] sm:h-5 sm:w-5 sm:text-xs">
                  {mounted ? itemCount : 0}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-2 md:hidden relative overflow-visible">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/60" />
              <input
                type="text"
                placeholder="Looking for something? Start here..."
                className="w-full rounded-xl border border-[#3D2E24]/20 bg-[#F4F6F0] py-2.5 pl-10 pr-4 text-sm text-[#3D2E24] outline-none transition focus:ring-2 focus:ring-[#98AB81] placeholder:text-[#3D2E24]/50"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              />
            </div>

            {searchFocused && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-xl border border-[#3D2E24]/15 bg-[#F4F6F0] shadow-xl text-[#3D2E24] max-h-[70vh] overflow-y-auto">
                <div className="p-4">
                  <div className="mb-4">
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { name: "Bakery", image: "/images/bread.jpg", slug: "bakery" },
                        { name: "Dairy", image: "/images/fresh-milk.jpg", slug: "dairy" },
                        { name: "Sweets", image: "/images/mango-cake.jpg", slug: "sweets" },
                        { name: "Fast Food", image: "/images/chicken-burger.jpg", slug: "fast-food" },
                        { name: "Pan Asian", image: "/images/noodle-bowl.jpg", slug: "pan-asian" },
                        { name: "Grocery", image: "/images/snacks.jpg", slug: "grocery" },
                        { name: "Deals", image: "/images/chicken-burger.jpg", slug: "deals" },
                      ].map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/shop/${cat.slug}`}
                          className="flex flex-col items-center gap-1.5 rounded-lg transition hover:opacity-80"
                          onClick={() => setSearchFocused(false)}
                        >
                          <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-[#3D2E24]/20 bg-white">
                            <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                          </div>
                          <span className="text-[11px] font-bold text-[#3D2E24]">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-[#3D2E24]/15"></div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-[#3D2E24] uppercase tracking-wide">POPULAR SEARCHES</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          type="button"
                          key={term}
                          className="rounded-full border border-[#3D2E24]/20 px-3 py-1 text-xs font-medium text-[#3D2E24] hover:bg-[#98AB81] transition"
                          onClick={() => setSearchFocused(false)}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {mobileMenuOpen && (
            <div className="mt-3 border-t border-[#98AB81]/20 pt-3 md:hidden">
              <div className="space-y-2">
                <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:text-[#98AB81]">Shop</Link>
                <Link href="/deals" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:text-[#98AB81]">Deals</Link>
                <Link href="/branches" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:text-[#98AB81]">Locations</Link>
                {mounted && status !== "authenticated" && (
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-semibold hover:text-[#98AB81]">Login</Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[#98AB81]/20 bg-[#3D2E24]">
          <div className="mx-auto max-w-7xl px-3 py-1.5 flex flex-wrap items-center justify-between gap-1 text-xs sm:px-4 sm:py-2 sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-6">
              <button
                type="button"
                onClick={() => setCategoryMenuOpen(true)}
                className="flex items-center gap-1 rounded-lg bg-[#98AB81] px-2 py-1 text-[10px] font-extrabold text-[#3D2E24] shadow-sm hover:bg-[#F4F6F0] transition sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              >
                <Menu className="h-3 w-3 stroke-[2.5] sm:h-4 sm:w-4" />
                <span>Categories</span>
                <ChevronDown className="h-2 w-2 sm:h-4 sm:w-4 sm:ml-1" />
              </button>

              <div className="hidden md:flex items-center gap-4 text-[#F4F6F0]/80 font-medium text-sm">
                <a 
                  href="tel:+923004805000" 
                  className="flex items-center gap-1.5 text-[#F4F6F0]/80 hover:text-[#98AB81] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#98AB81]" />
                  <span>+923004805000</span>
                </a>
                
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=Info@CozyCup.com.pk&su=Inquiry%20from%20Website&body=Hello%20Cozy%20Cup%20Team," 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#F4F6F0]/80 hover:text-[#98AB81] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#98AB81]" />
                  <span>Info@CozyCup.com.pk</span>
                </a>
              </div>
            </div>
            <div className="text-[10px] font-medium text-[#F4F6F0]/80 sm:text-sm">Welcome to Cozy Cup</div>
          </div>
        </div>
      </header>

      <OrderTypeSelector isOpen={locationOpen} onClose={() => setLocationOpen(false)} />
      <CategoryMenuModal isOpen={categoryMenuOpen} onClose={() => setCategoryMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}