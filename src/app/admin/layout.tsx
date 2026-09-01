"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Coffee,
  Globe,
  Share2,
  MessageCircle
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3EDD8] p-4 lg:p-6 text-[#A87A53] flex flex-col justify-between">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 rounded-2xl bg-[#A87A53] p-2.5 text-[#F3EDD8] shadow-lg lg:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div className="mx-auto flex w-full max-w-7xl gap-6 flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-4 left-4 z-40 w-64 rounded-3xl bg-[#A87A53] p-6 shadow-xl transition-transform duration-300 lg:static lg:flex lg:flex-col ${
            sidebarOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"
          }`}
        >
          {/* Admin Profile Box */}
          <div className="rounded-2xl bg-[#F3EDD8] p-4 text-[#A87A53] shadow-inner border border-[#BDD390]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BDD390] font-black text-[#A87A53]">
                CC
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#A87A53]">Cozy Admin</h2>
                <p className="text-xs font-semibold text-[#A87A53]/70">Store Manager</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#BDD390] text-[#A87A53] shadow-md font-bold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-[#A87A53]" : "text-[#BDD390]"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-white/20">
            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-200 transition-all hover:bg-red-500/20">
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 rounded-3xl bg-white p-6 lg:p-8 text-[#A87A53] shadow-xl border border-[#BDD390]/60">
          {children}
        </main>
      </div>

      {/* Reference Footer Section Matching Image Design */}
      <footer className="mx-auto mt-8 w-full max-w-7xl rounded-3xl bg-[#A87A53] px-8 py-10 text-[#F3EDD8] shadow-xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#BDD390] text-[#A87A53]">
                <Coffee className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">COZYCUP</span>
            </div>
            <p className="text-xs text-[#F3EDD8]/80 max-w-sm leading-relaxed">
               Artisanal coffee, fresh bakery items, and daily essentials delivered right to your doorstep with love and care.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#BDD390] hover:text-[#A87A53] transition-colors"><Globe className="h-4 w-4" /></a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#BDD390] hover:text-[#A87A53] transition-colors"><Share2 className="h-4 w-4" /></a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#BDD390] hover:text-[#A87A53] transition-colors"><MessageCircle className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#BDD390]">Explore</h3>
            <ul className="mt-4 space-y-2 text-xs font-medium text-[#F3EDD8]/80">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/menu" className="hover:text-white">Menu</Link></li>
              <li><Link href="/admin" className="hover:text-white">My Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#BDD390]">Company</h3>
            <ul className="mt-4 space-y-2 text-xs font-medium text-[#F3EDD8]/80">
              <li><a href="#" className="hover:text-white">About CozyCup</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#BDD390]">Contact</h3>
            <ul className="mt-4 space-y-2 text-xs font-medium text-[#F3EDD8]/80">
              <li>+92 (555) 019-2200</li>
              <li>hello@cozycup.kitchen</li>
              <li>5 branches • citywide</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-white/10 pt-6 text-[11px] text-[#F3EDD8]/60 sm:flex-row">
          <p>© 2026 CozyCup Kitchen. All rights reserved.</p>
          <p>Fresh daily, delivered hot.</p>
        </div>
      </footer>
    </div>
  );
}