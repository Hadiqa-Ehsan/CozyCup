"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  ArrowUp,
  Search,
  Bell,
  Activity,
  Crown,
  Coffee,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [revenue, setRevenue] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  // Interactive state for graph period toggles (live working feel)
  const [revenuePeriod, setRevenuePeriod] = useState<"weekly" | "monthly">("weekly");

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevenue(32134);
      setOrdersCount(328);
      setProductsCount(42);
      setUsersCount(1240);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: "Total Revenue", value: `PKR ${revenue.toLocaleString()}`, change: "+14.2%", icon: TrendingUp },
    { title: "Coffee Orders", value: ordersCount.toLocaleString(), change: "+8.1%", icon: ShoppingBag },
    { title: "Active Menu Items", value: productsCount.toLocaleString(), change: "+3.4%", icon: Package },
    { title: "Registered Members", value: usersCount.toLocaleString(), change: "+12.5%", icon: Users },
  ];

  const popularDishes = [
    { name: "Caramel Macchiato", category: "Espresso & Coffee", price: "PKR 580", orders: "142 today", tag: "Top Seller" },
    { name: "Classic Croissant", category: "Bakery & Pastry", price: "PKR 420", orders: "98 today", tag: "Chef Choice" },
    { name: "Iced Vanilla Latte", category: "Cold Beverages", price: "PKR 650", orders: "115 today", tag: "Trending" },
  ];

  const recentOrders = [
    { id: "#CC-2841", customer: "Hadiqa Ehsan", item: "2x Caramel Macchiato, 1x Croissant", total: "PKR 1,580", status: "Pending" },
    { id: "#CC-2840", customer: "Bilal Ahmed", item: "1x Iced Vanilla Latte", total: "PKR 650", status: "Processing" },
    { id: "#CC-2839", customer: "Sara Malik", item: "3x Espresso Shot, 2x Blueberry Muffin", total: "PKR 2,150", status: "Delivered" },
    { id: "#CC-2838", customer: "Usman Ali", item: "1x Mocha Frappe", total: "PKR 720", status: "Delivered" },
  ];

  return (
    <div className="space-y-8 text-[#3D2E24] font-sans pb-12">
      {/* Top Header */}
      <header className="flex flex-col gap-4 rounded-3xl bg-[#F3EDD8]/80 p-6 backdrop-blur-[12px] border border-[#BDD390] shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#3D2E24]">Good evening, Admin.</h1>
          <p className="text-sm font-medium text-[#3D2E24]/70">CozyCup Café Management & Analytics Hub</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/50" />
            <input
              type="search"
              placeholder="Search orders, menu..."
              className="rounded-2xl border border-[#BDD390] bg-white/60 py-2.5 pl-10 pr-4 text-sm font-medium text-[#3D2E24] placeholder-[#3D2E24]/40 focus:outline-none backdrop-blur-md shadow-sm"
            />
          </div>
          <button className="relative rounded-2xl bg-white/80 p-3 text-[#3D2E24] border border-[#BDD390] hover:bg-[#3D2E24] hover:text-white shadow-sm transition-all">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#BDD390] animate-pulse" />
          </button>
        </div>
      </header>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* TWO UNIQUE INTERACTIVE WORKING GRAPHS (Based on reference style 1 & 2) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Graph 1: Smooth Income Trend Area/Line Chart (Reference Image Style) */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold text-[#3D2E24]/60 uppercase">Income Analytics</span>
                <h2 className="text-xl font-black text-[#3D2E24]">PKR 32,134 <span className="text-xs font-bold text-emerald-700 bg-[#BDD390] px-2 py-0.5 rounded-full ml-2">↑ 2.5%</span></h2>
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
            <p className="text-xs text-[#3D2E24]/60">Compared to PKR 21,340 last period</p>
          </div>

          {/* SVG Smooth Curve Area Chart */}
          <div className="my-6 relative h-40 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160">
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BDD390" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#BDD390" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {/* Background Grid lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#3D2E24" strokeOpacity="0.1" strokeDasharray="4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#3D2E24" strokeOpacity="0.1" strokeDasharray="4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#3D2E24" strokeOpacity="0.1" strokeDasharray="4" />

              {/* Area fill */}
              <path
                d={revenuePeriod === "weekly" 
                  ? "M 0 120 Q 80 40, 160 90 T 320 50 T 500 20 L 500 160 L 0 160 Z"
                  : "M 0 100 Q 100 20, 200 80 T 400 30 T 500 60 L 500 160 L 0 160 Z"
                }
                fill="url(#incomeGradient)"
              />
              {/* Main curve line */}
              <path
                d={revenuePeriod === "weekly" 
                  ? "M 0 120 Q 80 40, 160 90 T 320 50 T 500 20"
                  : "M 0 100 Q 100 20, 200 80 T 400 30 T 500 60"
                }
                fill="none"
                stroke="#3D2E24"
                strokeWidth="3.5"
              />
              {/* Interactive Data Points */}
              <circle cx="160" cy="90" r="5" fill="#3D2E24" className="transition-all hover:scale-150 cursor-pointer" />
              <circle cx="320" cy="50" r="5" fill="#BDD390" stroke="#3D2E24" strokeWidth="2" className="transition-all hover:scale-150 cursor-pointer" />
              <circle cx="500" cy="20" r="5" fill="#3D2E24" className="transition-all hover:scale-150 cursor-pointer" />
            </svg>
          </div>

          <div className="flex justify-between text-xs font-bold text-[#3D2E24]/70 pt-2 border-t border-[#BDD390]/40">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Graph 2: Multi-Metric Sales Breakdown Bar Report (Reference Image Style 2) */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold text-[#3D2E24]/60 uppercase">Sales Category Breakdown</span>
                <h2 className="text-xl font-black text-[#3D2E24]">Beverages vs Bakery</h2>
              </div>
              <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full shadow-sm">Live Report</span>
            </div>
            <p className="text-xs text-[#3D2E24]/60">Breakdown of daily item category performance</p>
          </div>

          {/* Grouped Bar Chart Visual */}
          <div className="h-44 flex items-end justify-between gap-4 pt-8 px-4 my-4 border-b border-[#BDD390]/40 pb-2">
            {[
              { label: "Espresso", bar1: 85, bar2: 60 },
              { label: "Cold Brew", bar1: 65, bar2: 90 },
              { label: "Pastries", bar1: 45, bar2: 70 },
              { label: "Desserts", bar1: 95, bar2: 50 },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div 
                    style={{ height: `${item.bar1}%` }} 
                    className="w-1/2 bg-[#3D2E24] rounded-t-lg transition-all duration-300 group-hover:brightness-125" 
                  />
                  <div 
                    style={{ height: `${item.bar2}%` }} 
                    className="w-1/2 bg-[#BDD390] rounded-t-lg border border-[#3D2E24]/20 transition-all duration-300 group-hover:brightness-90" 
                  />
                </div>
                <span className="text-[11px] font-bold text-[#3D2E24] mt-1">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-bold text-[#3D2E24]">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[#3D2E24]" /> In-Store Sales</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-[#BDD390]" /> Delivery App</span>
          </div>
        </div>

      </div>

      {/* POPULAR DISHES & MENU HIGHLIGHTS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#3D2E24] flex items-center gap-2">
            <Coffee className="h-5 w-5 text-[#3D2E24]" /> Popular CozyCup Items
          </h2>
          <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full">Top Ranked Today</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {popularDishes.map((dish, i) => (
            <div key={i} className="rounded-3xl bg-[#F3EDD8]/50 p-5 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md transition-all hover:-translate-y-1 hover:border-[#3D2E24]">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-bold bg-[#3D2E24] text-[#BDD390] px-2.5 py-1 rounded-full">
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
          ))}
        </div>
      </div>

      {/* RECENT ORDERS TABLE SECTION */}
      <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-[#3D2E24]">Recent Customer Orders</h2>
            <p className="text-xs text-[#3D2E24]/60">Live orders coming from CozyCup POS & web app</p>
          </div>
          <button className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-4 py-2 rounded-xl hover:brightness-105 shadow-sm">View All Orders</button>
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
              {recentOrders.map((order) => {
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
                  <tr key={order.id} className="transition-colors hover:bg-white/40">
                    <td className="py-4 text-xs font-bold text-[#3D2E24]">{order.id}</td>
                    <td className="py-4 text-xs font-medium text-[#3D2E24]">{order.customer}</td>
                    <td className="py-4 text-xs font-medium text-[#3D2E24]/80">{order.item}</td>
                    <td className="py-4 text-xs font-bold text-[#3D2E24]">{order.total}</td>
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