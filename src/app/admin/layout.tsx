"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  MessageCircle,
  Home
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
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Cozy Cup Admin",
          text: "Cozy Cup Store Management",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EDD8] p-4 lg:p-6 text-[#2D231F] flex flex-col justify-between">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 rounded-2xl bg-[#2D231F] p-2.5 text-[#F3EDD8] shadow-lg lg:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div className="mx-auto flex w-full max-w-7xl gap-6 flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-4 left-4 z-40 w-64 rounded-3xl bg-[#2D231F] p-6 shadow-xl transition-transform duration-300 lg:static lg:flex lg:flex-col lg:justify-between ${
            sidebarOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"
          }`}
        >
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#3D312B] p-4 text-[#F3EDD8] border border-[#BDD390]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BDD390] font-black text-[#2D231F]">
                    CC
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Cozy Admin</h2>
                    <p className="text-xs font-semibold text-[#BDD390]">Store Manager</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center gap-3.5 rounded-2xl px-4 py-3 text-xs font-bold bg-[#BDD390]/10 text-[#BDD390] border border-[#BDD390]/30 hover:bg-[#BDD390] hover:text-[#2D231F] transition-all"
            >
              <Home className="h-4 w-4" /> Go to Website Homepage
            </Link>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#BDD390] text-[#2D231F] shadow-md font-extrabold"
                        : "text-[#F3EDD8]/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? "text-[#2D231F]" : "text-[#BDD390]"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold text-rose-300 transition-all hover:bg-rose-500/20"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 rounded-3xl bg-white p-6 lg:p-8 text-[#2D231F] shadow-xl border border-[#BDD390]/50 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Admin Dashboard Footer */}
      <footer className="mx-auto mt-8 w-full max-w-7xl rounded-3xl bg-[#2D231F] px-8 py-10 text-[#F3EDD8] shadow-xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#BDD390] text-[#2D231F]">
                <Coffee className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-wider text-white">COZY CUP</span>
            </div>
            <p className="text-xs text-[#F3EDD8]/70 max-w-sm leading-relaxed">
              Artisanal coffee, fresh bakery items, and daily essentials delivered right to your doorstep with love and care.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#BDD390] hover:text-[#2D231F] transition-colors text-[#BDD390]" title="Home"><Globe className="h-4 w-4" /></a>
              <button onClick={handleShare} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#BDD390] hover:text-[#2D231F] transition-colors text-[#BDD390]" title="Share"><Share2 className="h-4 w-4" /></button>
              <a href="https://wa.me/923004805000" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#BDD390] hover:text-[#2D231F] transition-colors text-[#BDD390]" title="WhatsApp"><MessageCircle className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#BDD390]">Explore</h3>
            <ul className="mt-4 space-y-2 text-xs font-medium text-[#F3EDD8]/80">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/admin" className="hover:text-white">My Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#BDD390]">Company</h3>
            <ul className="mt-4 space-y-2 text-xs font-medium text-[#F3EDD8]/80">
              <li><Link href="/about" className="hover:text-white">About Cozy Cup</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#BDD390]">Contact</h3>
            <ul className="mt-4 space-y-2 text-xs font-medium text-[#F3EDD8]/80">
              <li><a href="tel:+923004805000" className="hover:text-[#BDD390] underline">+92 300 4805000</a></li>
              <li><a href="mailto:Info@CozyCup.com.pk" className="hover:text-[#BDD390] underline">Info@CozyCup.com.pk</a></li>
              <li className="text-[#F3EDD8]/60">5 branches • citywide</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-white/10 pt-6 text-[11px] text-[#F3EDD8]/50 sm:flex-row">
          <p>© 2026 Cozy Cup. All rights reserved.</p>
          <p>Fresh daily, delivered hot.</p>
        </div>
      </footer>
    </div>
  );
}