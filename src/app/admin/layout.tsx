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
  X 
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
    <div className="min-h-screen bg-[#F3EDD8] p-4 lg:p-6 text-[#A87A53]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 rounded-2xl bg-[#A87A53] p-2.5 text-[#F3EDD8] shadow-lg lg:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div className="mx-auto flex max-w-7xl gap-6">
        {/* Sidebar using Almond (#A87A53) & Sweet Corn */}
        <aside
          className={`fixed inset-y-4 left-4 z-40 w-64 rounded-3xl bg-[#A87A53] p-6 shadow-xl transition-transform duration-300 lg:static lg:flex lg:flex-col ${
            sidebarOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"
          }`}
        >
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#BDD390] font-bold text-[#A87A53]">
              CC
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-wide text-white">CozyCup</h2>
              <p className="text-xs text-[#BDD390]">Admin Panel</p>
            </div>
          </div>

          <nav className="mt-8 flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#BDD390] text-[#A87A53] shadow-md"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
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
        <main className="flex-1 rounded-3xl bg-white p-6 lg:p-8 text-[#A87A53] shadow-xl border border-[#BDD390]/40">
          {children}
        </main>
      </div>
    </div>
  );
}