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
    <div className="min-h-screen bg-[#F4F6F0] p-4 lg:p-6">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-[#3D2E24] p-2 text-white shadow-md lg:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div className="mx-auto flex max-w-7xl gap-6">
        {/* Floating Sidebar Card */}
        <aside
          className={`fixed inset-y-4 left-4 z-40 w-64 rounded-3xl bg-white p-6 shadow-sm border border-[#98AB81]/30 transition-transform duration-300 lg:static lg:flex lg:flex-col ${
            sidebarOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"
          }`}
        >
          {/* Profile Card Box Inside Sidebar */}
          <div className="rounded-2xl bg-[#3D2E24] p-4 text-[#F4F6F0] shadow-inner">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BDD390] font-bold text-[#3D2E24]">
                AC
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Cozy Admin</h2>
                <p className="text-xs text-[#BDD390]">Store Manager</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#3D2E24] text-white shadow-sm"
                      : "text-[#3D2E24]/70 hover:bg-[#F4F6F0] hover:text-[#3D2E24]"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-[#BDD390]" : "text-[#3D2E24]/60"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="pt-4">
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50">
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </div>
        </aside>

        {/* Main Content Card Area */}
        <main className="flex-1 rounded-3xl bg-transparent lg:max-w-[calc(100%-17rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}