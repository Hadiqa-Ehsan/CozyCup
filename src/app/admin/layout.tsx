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
  Home,
  Search,
  Bell
} from "lucide-react";
import { useState, useMemo } from "react";
import { mockProducts } from "../../lib/mock-data";
const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const mockOrders = [
  { id: "ORD-1001", customerName: "Hadiqa Ehsan", status: "Delivered" },
  { id: "ORD-1002", customerName: "Ali Khan", status: "Processing" },
  { id: "ORD-1003", customerName: "Sara Ahmed", status: "Pending" }
];

const mockUsersList = [
  { id: "u1", name: "Hadiqa Ehsan", email: "hadiqa@cozycup.com", role: "Admin" },
  { id: "u2", name: "Ali Khan", email: "ali@gmail.com", role: "Customer" },
  { id: "u3", name: "Sara Ahmed", email: "sara@gmail.com", role: "Customer" }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Order Placed", desc: "Hadiqa Ehsan placed a new store order ORD-1001", time: "2m ago", read: false },
    { id: 2, title: "Low Stock Alert", desc: "Select bakery inventory is running below threshold", time: "15m ago", read: false },
    { id: 3, title: "System Sync", desc: "Database successfully synced with backend", time: "1h ago", read: true },
  ]);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { matchedOrders: [], matchedProducts: [], matchedUsers: [] };
    const q = searchQuery.toLowerCase();

    const matchedOrders = mockOrders.filter(
      o => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)
    );

    const matchedProducts = mockProducts.filter(
      (p: any) => p.name.toLowerCase().includes(q) || (p.categorySlug && p.categorySlug.toLowerCase().includes(q))
    );

    const matchedUsers = mockUsersList.filter(
      u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );

    return { matchedOrders, matchedProducts, matchedUsers };
  }, [searchQuery]);

  const handleSelectSearchResult = (type: "order" | "product" | "user") => {
    setSearchQuery("");
    if (type === "order") {
      router.push("/admin/orders");
    } else if (type === "product") {
      router.push("/admin/products");
    } else if (type === "user") {
      router.push("/admin/users");
    }
  };

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

      {/* Global Header Bar with Search & Notifications */}
      <div className="mx-auto w-full max-w-7xl mb-6 flex justify-end items-center gap-3 relative z-30">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, products, users..."
            className="rounded-2xl border border-[#BDD390] bg-white/80 py-2.5 pl-10 pr-8 text-sm font-medium text-[#3D2E24] placeholder-[#3D2E24]/40 focus:outline-none focus:ring-2 focus:ring-[#3D2E24]/20 backdrop-blur-md shadow-sm transition-all w-72"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-[#3D2E24]/10 rounded-full p-1 hover:bg-[#3D2E24]/20"
            >
              <X className="h-3 w-3" />
            </button>
          )}

          {/* Global Search Results Dropdown */}
          {searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#F3EDD8] border border-[#BDD390] shadow-2xl z-[99999] overflow-hidden backdrop-blur-xl pointer-events-auto">
              <div className="p-2 border-b border-[#BDD390] bg-white/40 flex items-center justify-between text-[10px] font-bold uppercase text-[#3D2E24]/70 px-3">
                <span>Global Search</span>
                <span>Click to open page</span>
              </div>
              <div className="max-h-64 overflow-y-auto p-1 space-y-1">
                {searchResults.matchedOrders.length === 0 && searchResults.matchedProducts.length === 0 && searchResults.matchedUsers.length === 0 ? (
                  <div className="p-3 text-center text-xs text-[#3D2E24]/60">No matches found</div>
                ) : (
                  <>
                    {searchResults.matchedOrders.map(o => (
                      <div 
                        key={o.id} 
                        onClick={() => handleSelectSearchResult("order")}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/70 hover:bg-[#BDD390] cursor-pointer text-xs transition-all select-none"
                      >
                        <div>
                          <span className="font-black text-[#3D2E24]">{o.id}</span>
                          <span className="text-[#3D2E24]/70 ml-2">({o.customerName})</span>
                        </div>
                        <span className="text-[10px] bg-[#3D2E24] text-[#BDD390] px-2 py-0.5 rounded-full font-bold">Orders</span>
                      </div>
                    ))}
                    {searchResults.matchedProducts.map((p: any) => (
                      <div 
                        key={p.id} 
                        onClick={() => handleSelectSearchResult("product")}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/70 hover:bg-[#BDD390] cursor-pointer text-xs transition-all select-none"
                      >
                        <div>
                          <span className="font-black text-[#3D2E24]">{p.name}</span>
                        </div>
                        <span className="text-[10px] bg-emerald-800 text-white px-2 py-0.5 rounded-full font-bold">Products</span>
                      </div>
                    ))}
                    {searchResults.matchedUsers.map(u => (
                      <div 
                        key={u.id} 
                        onClick={() => handleSelectSearchResult("user")}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/70 hover:bg-[#BDD390] cursor-pointer text-xs transition-all select-none"
                      >
                        <div>
                          <span className="font-black text-[#3D2E24]">{u.name}</span>
                          <span className="text-[#3D2E24]/60 ml-2 text-[10px]">{u.role}</span>
                        </div>
                        <span className="text-[10px] bg-blue-800 text-white px-2 py-0.5 rounded-full font-bold">Users</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Toggle */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-2xl bg-white/90 p-3 text-[#3D2E24] border border-[#BDD390] hover:bg-[#3D2E24] hover:text-white shadow-sm transition-all hover:scale-105"
          >
            <Bell className="h-4 w-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse border border-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-3xl bg-[#F3EDD8] p-4 border border-[#BDD390] shadow-2xl z-[999] backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#BDD390]">
                <span className="text-xs font-black uppercase tracking-wider text-[#3D2E24]">Notifications</span>
                <div className="flex items-center gap-2">
                  <button onClick={markAllAsRead} className="text-[10px] font-bold text-[#3D2E24]/70 hover:underline">Mark read</button>
                  <button onClick={() => setShowNotifications(false)} className="text-[#3D2E24] hover:bg-[#BDD390]/50 p-1 rounded-full">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3 rounded-2xl transition-all border ${n.read ? 'bg-white/40 border-transparent' : 'bg-white/90 border-[#BDD390] shadow-sm'}`}>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-black text-[#3D2E24]">{n.title}</h4>
                      <span className="text-[10px] text-[#3D2E24]/60">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#3D2E24]/80 mt-1">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
              <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=Info@CozyCup.com.pk&su=Inquiry%20from%20Admin&body=Hello%20Cozy%20Cup%20Team," target="_blank" rel="noopener noreferrer" className="hover:text-[#BDD390] underline">Info@CozyCup.com.pk</a></li>
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