"use client";

import { useState, useMemo, useRef } from "react";
import {
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  ArrowUp,
  Search,
  Bell,
  Coffee,
  Clock,
  CheckCircle2,
  AlertCircle,
  X
} from "lucide-react";
import { mockProducts, mockCategories } from "../../lib/mock-data";

const initialOrders = [
  {
    id: "ORD-1001",
    customerName: "Hadiqa Ehsan",
    status: "Delivered",
    items: [
      { productId: "1", name: "JS Bread Roll", price: 495, quantity: 2 },
      { productId: "21", name: "Chocolate Cake", price: 1598, quantity: 1 }
    ]
  },
  {
    id: "ORD-1002",
    customerName: "Ali Khan",
    status: "Processing",
    items: [
      { productId: "13", name: "Classic Chicken Burger", price: 498, quantity: 2 }
    ]
  },
  {
    id: "ORD-1003",
    customerName: "Sara Ahmed",
    status: "Pending",
    items: [
      { productId: "9", name: "Fresh Organic Milk", price: 248, quantity: 3 }
    ]
  }
];

const mockUsers = [
  { id: "u1", name: "Hadiqa Ehsan", email: "hadiqa@cozycup.com", role: "Admin" },
  { id: "u2", name: "Ali Khan", email: "ali@gmail.com", role: "Customer" },
  { id: "u3", name: "Sara Ahmed", email: "sara@gmail.com", role: "Customer" }
];

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [revenuePeriod, setRevenuePeriod] = useState<"weekly" | "monthly">("weekly");
  const [orders, setOrders] = useState(initialOrders);

  // Highlight state tracking IDs
  const [highlightedOrderId, setHighlightedOrderId] = useState<string | null>(null);
  const [highlightedProductId, setHighlightedProductId] = useState<string | null>(null);
  const [highlightedUserId, setHighlightedUserId] = useState<string | null>(null);

  // Refs for smooth scrolling to sections
  const ordersSectionRef = useRef<HTMLDivElement>(null);
  const popularSectionRef = useRef<HTMLDivElement>(null);
  const orderItemRefs = useRef<{ [key: string]: HTMLTableRowElement | null }>({});
  const productItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Order Placed", desc: "Hadiqa Ehsan placed a new store order ORD-1001", time: "2m ago", read: false },
    { id: 2, title: "Low Stock Alert", desc: "Select bakery inventory is running below threshold", time: "15m ago", read: false },
    { id: 3, title: "System Sync", desc: "Database successfully synced with backend", time: "1h ago", read: true },
  ]);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const totalRevenue = useMemo(() => {
    return orders.reduce((acc, order) => {
      return acc + order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, 0);
  }, [orders]);

  const totalOrdersCount = orders.length;
  const activeProductsCount = mockProducts.length;
  const totalUsersCount = mockUsers.length;

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { matchedOrders: [], matchedProducts: [], matchedUsers: [] };
    const q = searchQuery.toLowerCase();

    const matchedOrders = orders.filter(
      o => o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q)
    );

    const matchedProducts = mockProducts.filter(
      (p: any) => p.name.toLowerCase().includes(q) || (p.categorySlug && p.categorySlug.toLowerCase().includes(q))
    );

    const matchedUsers = mockUsers.filter(
      u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );

    return { matchedOrders, matchedProducts, matchedUsers };
  }, [searchQuery, orders]);

  // Handle clicking an item from search dropdown
  const handleSelectSearchResult = (type: "order" | "product" | "user", id: string) => {
    setSearchQuery(""); // Clear search to close dropdown

    if (type === "order") {
      ordersSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setHighlightedOrderId(id);
      setTimeout(() => setHighlightedOrderId(null), 3000);
    } else if (type === "product") {
      popularSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setHighlightedProductId(id);
      setTimeout(() => setHighlightedProductId(null), 3000);
    } else if (type === "user") {
      // Since users table isn't displayed directly on dashboard bottom, scroll to orders/top or handle gracefully
      ordersSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setHighlightedUserId(id);
      setTimeout(() => setHighlightedUserId(null), 3000);
    }
  };

  const categoryBreakdown = useMemo(() => {
    const categoryMap: { [key: string]: number } = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const foundProduct: any = mockProducts.find((p: any) => p.id === item.productId);
        const catSlug = foundProduct ? (foundProduct.categorySlug || "other") : "other";
        categoryMap[catSlug] = (categoryMap[catSlug] || 0) + (item.price * item.quantity);
      });
    });

    const totalSales = Object.values(categoryMap).reduce((sum, val) => sum + val, 1);

    return mockCategories.slice(0, 5).map((cat: any, idx: number) => {
      const sales = categoryMap[cat.slug] || (idx === 0 ? 12000 : 5000);
      const percentage = Math.round((sales / totalSales) * 100);
      return {
        label: cat.name,
        bar1: Math.min(95, Math.max(30, percentage * 2)),
        bar2: Math.min(90, Math.max(25, percentage * 1.5)),
      };
    });
  }, [orders]);

  const popularDishes = useMemo(() => {
    return mockProducts.slice(0, 3).map((p: any, idx: number) => {
      const itemPrice = p.price !== undefined ? p.price : (p.priceCents ? p.priceCents / 100 : 500);
      return {
        id: p.id,
        name: p.name,
        category: (p.categorySlug || "GENERAL").toUpperCase(),
        price: `PKR ${itemPrice}`,
        orders: `${12 + idx * 5} ordered`,
        tag: idx === 0 ? "Top Seller" : idx === 1 ? "Chef Choice" : "Trending"
      };
    });
  }, []);

  const graphPoints = useMemo(() => {
    if (revenuePeriod === "weekly") {
      return {
        path: "M 0 125 Q 75 35, 150 85 T 300 45 T 450 25 T 500 15 L 500 160 L 0 160 Z",
        line: "M 0 125 Q 75 35, 150 85 T 300 45 T 450 25 T 500 15",
        values: ["Mon", "Wed", "Fri", "Sun"]
      };
    } else {
      return {
        path: "M 0 110 Q 125 15, 250 70 T 375 30 T 500 50 L 500 160 L 0 160 Z",
        line: "M 0 110 Q 125 15, 250 70 T 375 30 T 500 50",
        values: ["Jan", "Apr", "Jul", "Oct"]
      };
    }
  }, [revenuePeriod]);

  const stats = [
    { title: "Total Revenue", value: `PKR ${totalRevenue.toLocaleString()}`, change: "+14.2%", icon: TrendingUp },
    { title: "Total Orders", value: totalOrdersCount.toLocaleString(), change: "+8.1%", icon: ShoppingBag },
    { title: "Active Menu Items", value: activeProductsCount.toLocaleString(), change: "+3.4%", icon: Package },
    { title: "Registered Members", value: totalUsersCount.toLocaleString(), change: "+12.5%", icon: Users },
  ];

  return (
    <div className="space-y-8 text-[#3D2E24] font-sans pb-12 relative">
      {/* Top Header */}
      <header className="flex flex-col gap-4 rounded-3xl bg-[#F3EDD8]/80 p-6 backdrop-blur-[12px] border border-[#BDD390] shadow-md sm:flex-row sm:items-center sm:justify-between transition-all duration-300 relative z-30">
        <div>
          <h1 className="text-2xl font-black text-[#3D2E24]">Good evening, Hadiqa.</h1>
          <p className="text-sm font-medium text-[#3D2E24]/70">CozyCup Café Management & Analytics Hub</p>
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, products, users..."
              className="rounded-2xl border border-[#BDD390] bg-white/70 py-2.5 pl-10 pr-8 text-sm font-medium text-[#3D2E24] placeholder-[#3D2E24]/40 focus:outline-none focus:ring-2 focus:ring-[#3D2E24]/20 backdrop-blur-md shadow-sm transition-all w-72"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-[#3D2E24]/10 rounded-full p-1 hover:bg-[#3D2E24]/20"
              >
                <X className="h-3 w-3" />
              </button>
            )}

            {/* Interactive Clickable Search Popup Dropdown */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#F3EDD8] border border-[#BDD390] shadow-2xl z-[9999] overflow-hidden backdrop-blur-xl">
                <div className="p-2 border-b border-[#BDD390] bg-white/40 flex items-center justify-between text-[10px] font-bold uppercase text-[#3D2E24]/70 px-3">
                  <span>Search Results</span>
                  <span>Click to locate</span>
                </div>
                <div className="max-h-64 overflow-y-auto p-1 space-y-1">
                  {searchResults.matchedOrders.length === 0 && searchResults.matchedProducts.length === 0 && searchResults.matchedUsers.length === 0 ? (
                    <div className="p-3 text-center text-xs text-[#3D2E24]/60">No matches found</div>
                  ) : (
                    <>
                      {searchResults.matchedOrders.map(o => (
                        <div 
                          key={o.id} 
                          onClick={() => handleSelectSearchResult("order", o.id)}
                          className="flex items-center justify-between p-2 rounded-xl bg-white/50 hover:bg-[#BDD390] cursor-pointer text-xs transition-all"
                        >
                          <div>
                            <span className="font-black text-[#3D2E24]">{o.id}</span>
                            <span className="text-[#3D2E24]/70 ml-2">({o.customerName})</span>
                          </div>
                          <span className="text-[10px] bg-[#3D2E24] text-[#BDD390] px-2 py-0.5 rounded-full font-bold">Order</span>
                        </div>
                      ))}
                      {searchResults.matchedProducts.map((p: any) => (
                        <div 
                          key={p.id} 
                          onClick={() => handleSelectSearchResult("product", p.id)}
                          className="flex items-center justify-between p-2 rounded-xl bg-white/50 hover:bg-[#BDD390] cursor-pointer text-xs transition-all"
                        >
                          <div>
                            <span className="font-black text-[#3D2E24]">{p.name}</span>
                          </div>
                          <span className="text-[10px] bg-emerald-800 text-white px-2 py-0.5 rounded-full font-bold">Product</span>
                        </div>
                      ))}
                      {searchResults.matchedUsers.map(u => (
                        <div 
                          key={u.id} 
                          onClick={() => handleSelectSearchResult("user", u.id)}
                          className="flex items-center justify-between p-2 rounded-xl bg-white/50 hover:bg-[#BDD390] cursor-pointer text-xs transition-all"
                        >
                          <div>
                            <span className="font-black text-[#3D2E24]">{u.name}</span>
                            <span className="text-[#3D2E24]/60 ml-2 text-[10px]">{u.role}</span>
                          </div>
                          <span className="text-[10px] bg-blue-800 text-white px-2 py-0.5 rounded-full font-bold">User</span>
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
              className="relative rounded-2xl bg-white/80 p-3 text-[#3D2E24] border border-[#BDD390] hover:bg-[#3D2E24] hover:text-white shadow-sm transition-all hover:scale-105"
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
      </header>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="group rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#3D2E24]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D2E24]/70">{stat.title}</span>
              <div className="rounded-2xl bg-[#BDD390] p-3 text-[#3D2E24] shadow-sm transition-transform group-hover:scale-110">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-black text-[#3D2E24]">{stat.value}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <span className="flex items-center rounded-full bg-[#BDD390]/60 px-2.5 py-0.5 text-[#3D2E24]">
                <ArrowUp className="h-3 w-3 mr-0.5" /> {stat.change}
              </span>
              <span className="text-[#3D2E24]/60 font-normal">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 relative z-10">
        {/* Income Analytics */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#3D2E24]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold text-[#3D2E24]/60 uppercase">Income Analytics</span>
                <h2 className="text-xl font-black text-[#3D2E24]">PKR {totalRevenue.toLocaleString()} <span className="text-xs font-bold text-emerald-700 bg-[#BDD390] px-2 py-0.5 rounded-full ml-2">↑ 14.2%</span></h2>
              </div>
              <div className="flex bg-white/60 rounded-xl p-1 border border-[#BDD390]">
                <button 
                  onClick={() => setRevenuePeriod("weekly")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${revenuePeriod === "weekly" ? "bg-[#3D2E24] text-[#BDD390]" : "text-[#3D2E24]"}`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setRevenuePeriod("monthly")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${revenuePeriod === "monthly" ? "bg-[#3D2E24] text-[#BDD390]" : "text-[#3D2E24]"}`}
                >
                  Monthly
                </button>
              </div>
            </div>
            <p className="text-xs text-[#3D2E24]/60">Revenue trend overview</p>
          </div>

          <div className="my-6 relative h-40 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BDD390" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#BDD390" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <line x1="0" y1="20" x2="500" y2="20" stroke="#3D2E24" strokeOpacity="0.1" strokeDasharray="4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#3D2E24" strokeOpacity="0.1" strokeDasharray="4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#3D2E24" strokeOpacity="0.1" strokeDasharray="4" />

              <path d={graphPoints.path} fill="url(#incomeGradient)" />
              <path d={graphPoints.line} fill="none" stroke="#3D2E24" strokeWidth="3.5" />
            </svg>
          </div>

          <div className="flex justify-between text-xs font-bold text-[#3D2E24]/70 pt-2 border-t border-[#BDD390]/40">
            <span>{graphPoints.values[0]}</span>
            <span>{graphPoints.values[1]}</span>
            <span>{graphPoints.values[2]}</span>
            <span>{graphPoints.values[3]}</span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#3D2E24]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold text-[#3D2E24]/60 uppercase">Sales Category Breakdown</span>
                <h2 className="text-xl font-black text-[#3D2E24]">Category Share</h2>
              </div>
              <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full shadow-sm">Live Report</span>
            </div>
            <p className="text-xs text-[#3D2E24]/60">Comparative performance by store categories</p>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-8 px-2 my-4 border-b border-[#BDD390]/40 pb-2">
            {categoryBreakdown.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group/bar">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div style={{ height: `${item.bar1}%` }} className="w-1/2 bg-[#3D2E24] rounded-t-lg shadow-sm" />
                  <div style={{ height: `${item.bar2}%` }} className="w-1/2 bg-[#BDD390] rounded-t-lg border border-[#3D2E24]/20 shadow-sm" />
                </div>
                <span className="text-[10px] font-black text-[#3D2E24] mt-1 text-center truncate w-full">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-bold text-[#3D2E24]">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[#3D2E24]" /> In-Store Sales</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[#BDD390]" /> Delivery App</span>
          </div>
        </div>
      </div>

      {/* Popular Items Section */}
      <div ref={popularSectionRef} className="space-y-4 relative z-10 scroll-mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#3D2E24] flex items-center gap-2">
            <Coffee className="h-5 w-5 text-[#3D2E24]" /> Popular CozyCup Items
          </h2>
          <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full shadow-sm">Top Ranked Today</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {popularDishes.map((dish) => {
            const isHighlighted = highlightedProductId === dish.id;
            return (
              <div 
                key={dish.id} 
                className={`rounded-3xl p-5 backdrop-blur-[12px] border transition-all duration-500 ${
                  isHighlighted 
                    ? "bg-[#BDD390] border-[#3D2E24] ring-4 ring-[#3D2E24]/30 scale-[1.03] shadow-2xl animate-pulse" 
                    : "bg-[#F3EDD8]/50 border-[#BDD390]/60 shadow-md hover:-translate-y-1.5 hover:shadow-xl hover:border-[#3D2E24]"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold bg-[#3D2E24] text-[#BDD390] px-2.5 py-1 rounded-full shadow-sm">
                    {dish.tag}
                  </span>
                  <span className="text-xs font-bold text-[#3D2E24]/60">{dish.orders}</span>
                </div>
                <h3 className="text-base font-black text-[#3D2E24] mt-2">{dish.name}</h3>
                <p className="text-xs text-[#3D2E24]/70">{dish.category}</p>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#BDD390]/40">
                  <span className="text-sm font-black text-[#3D2E24]">{dish.price}</span>
                  <span className="text-xs font-bold text-emerald-800 bg-[#BDD390]/60 px-2.5 py-1 rounded-xl">Available</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div ref={ordersSectionRef} className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md relative z-10 scroll-mt-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-black text-[#3D2E24]">Recent Customer Orders</h2>
            <p className="text-xs text-[#3D2E24]/60">Live orders fetched directly from active orders</p>
          </div>
          <span className="text-xs font-bold bg-[#BDD390] px-3 py-1.5 rounded-xl text-[#3D2E24] shadow-sm">
            {orders.length} Total Orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#BDD390]/60">
            <thead>
              <tr>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Order ID</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Customer</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Items Ordered</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Total</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDD390]/30">
              {orders.map((order) => {
                const orderTotal = order.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
                const itemsSummary = order.items.map(i => `${i.quantity}x ${i.name}`).join(", ");
                const isHighlighted = highlightedOrderId === order.id || highlightedUserId === order.customerName;

                const statusBadge = 
                  order.status === "Pending" ? (
                    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-amber-200 text-amber-900 border border-amber-300 animate-pulse">
                      <Clock className="h-3 w-3" /> Pending
                    </span>
                  ) :
                  order.status === "Processing" ? (
                    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-blue-200 text-blue-900 border border-blue-300">
                      <AlertCircle className="h-3 w-3" /> Processing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-emerald-200 text-emerald-900 border border-emerald-300">
                      <CheckCircle2 className="h-3 w-3" /> Delivered
                    </span>
                  );

                return (
                  <tr 
                    key={order.id} 
                    className={`transition-all duration-500 ${
                      isHighlighted 
                        ? "bg-[#BDD390] ring-2 ring-[#3D2E24] scale-[1.01] shadow-lg animate-pulse" 
                        : "hover:bg-white/40"
                    }`}
                  >
                    <td className="py-4 text-xs font-bold text-[#3D2E24]">{order.id}</td>
                    <td className="py-4 text-xs font-medium text-[#3D2E24]">{order.customerName}</td>
                    <td className="py-4 text-xs font-medium text-[#3D2E24]/80 max-w-xs truncate">{itemsSummary}</td>
                    <td className="py-4 text-xs font-bold text-[#3D2E24]">PKR {orderTotal.toLocaleString()}</td>
                    <td className="py-4 text-xs">{statusBadge}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}