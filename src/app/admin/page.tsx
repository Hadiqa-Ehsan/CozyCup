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
  BarChart3
} from "lucide-react";

export default function AdminDashboard() {
  // Animation states for counting up numbers on load
  const [revenue, setRevenue] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevenue(14250);
      setOrdersCount(328);
      setProductsCount(84);
      setUsersCount(1240);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: "Total Revenue", value: `PKR ${revenue.toLocaleString()}`, change: "+14.2%", icon: TrendingUp },
    { title: "Total Orders", value: ordersCount.toLocaleString(), change: "+8.1%", icon: ShoppingBag },
    { title: "Total Products", value: productsCount.toLocaleString(), change: "+3.4%", icon: Package },
    { title: "Total Users", value: usersCount.toLocaleString(), change: "+12.5%", icon: Users },
  ];

  const recentOrders = [
    { id: "#2841", customer: "Alice Khan", total: "PKR 1,598.00", status: "Pending" },
    { id: "#2840", customer: "Bilal Ahmed", total: "PKR 498.00", status: "Processing" },
    { id: "#2839", customer: "Sara Malik", total: "PKR 2,350.00", status: "Delivered" },
  ];

  return (
    <div className="space-y-6 text-white font-sans">
      {/* Top Header */}
      <header className="flex flex-col gap-4 rounded-3xl bg-[#3D2E24]/40 p-6 backdrop-blur-[12px] border border-white/20 shadow-xl transition-all duration-300 hover:border-[#BDD390] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Good evening, Admin.</h1>
          <p className="text-sm font-medium text-[#F4F6F0]/70">Here is what is happening with CozyCup today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              type="search"
              placeholder="Search metrics..."
              className="rounded-2xl border border-white/20 bg-white/10 py-2.5 pl-10 pr-4 text-sm font-medium text-white placeholder-white/40 focus:border-[#BDD390] focus:outline-none backdrop-blur-md"
            />
          </div>
          <button className="relative rounded-2xl bg-white/10 p-3 text-white border border-white/20 transition-all hover:bg-white/20 hover:border-[#BDD390] backdrop-blur-md">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#BDD390] animate-pulse" />
          </button>
        </div>
      </header>

      {/* 4 Stats Cards with Glassmorphism & Hover Lift */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="group rounded-3xl bg-[rgba(255,255,255,0.15)] p-6 backdrop-blur-[12px] border border-[rgba(255,255,255,0.2)] shadow-xl transition-all duration-300 hover:-translate-y-[6px] hover:shadow-2xl hover:border-[#BDD390]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">{stat.title}</span>
              <div className="rounded-2xl bg-[#BDD390]/30 p-3 text-[#BDD390] backdrop-blur-md border border-[#BDD390]/30 transition-transform group-hover:scale-110">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-black text-white">{stat.value}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#BDD390]">
              <span className="flex items-center rounded-full bg-[#BDD390]/20 px-2.5 py-0.5 border border-[#BDD390]/30">
                <ArrowUp className="h-3 w-3 mr-0.5" /> {stat.change}
              </span>
              <span className="text-white/50 font-normal">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Charts Section (Line & Bar representation) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-[rgba(255,255,255,0.15)] p-6 backdrop-blur-[12px] border border-[rgba(255,255,255,0.2)] shadow-xl transition-all duration-300 hover:-translate-y-[6px] hover:border-[#BDD390]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#BDD390]" /> Revenue Trend
            </h2>
            <span className="text-xs font-bold text-[#BDD390] bg-[#BDD390]/20 px-3 py-1 rounded-full border border-[#BDD390]/30">Live Weekly</span>
          </div>
          <div className="h-36 flex items-end justify-between gap-3 pt-6 px-2">
            {[40, 65, 45, 80, 95, 75, 100].map((height, i) => (
              <div key={i} className="w-full bg-white/10 rounded-2xl overflow-hidden flex flex-col justify-end h-full group">
                <div 
                  style={{ height: `${height}%` }} 
                  className="w-full bg-gradient-to-t from-[#BDD390]/60 to-[#BDD390] rounded-2xl transition-all duration-500 group-hover:brightness-125" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-[rgba(255,255,255,0.15)] p-6 backdrop-blur-[12px] border border-[rgba(255,255,255,0.2)] shadow-xl transition-all duration-300 hover:-translate-y-[6px] hover:border-[#BDD390]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#BDD390]" /> Order Volume
            </h2>
            <span className="text-xs font-bold text-[#BDD390] bg-[#BDD390]/20 px-3 py-1 rounded-full border border-[#BDD390]/30">Last 7 Days</span>
          </div>
          <div className="h-36 flex items-end justify-between gap-3 pt-6 px-2">
            {[30, 50, 70, 60, 85, 90, 110].map((val, i) => (
              <div key={i} className="w-full bg-white/10 rounded-2xl overflow-hidden flex flex-col justify-end h-full group">
                <div 
                  style={{ height: `${val}%` }} 
                  className="w-full bg-gradient-to-t from-white/20 to-white/60 rounded-2xl transition-all duration-500 group-hover:bg-[#BDD390]" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-3xl bg-[rgba(255,255,255,0.15)] p-6 backdrop-blur-[12px] border border-[rgba(255,255,255,0.2)] shadow-xl transition-all duration-300 hover:border-[#BDD390]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Orders</h2>
          <button className="text-xs font-bold text-[#BDD390] hover:underline">View all orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="py-3 text-left text-xs font-bold text-white/60 uppercase tracking-wider">Order ID</th>
                <th className="py-3 text-left text-xs font-bold text-white/60 uppercase tracking-wider">Customer</th>
                <th className="py-3 text-left text-xs font-bold text-white/60 uppercase tracking-wider">Total</th>
                <th className="py-3 text-left text-xs font-bold text-white/60 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.map((order) => {
                const statusColor = 
                  order.status === "Pending" ? "bg-amber-400/20 text-amber-200 border-amber-400/30 animate-pulse" :
                  order.status === "Processing" ? "bg-blue-400/20 text-blue-200 border-blue-400/30" :
                  "bg-emerald-400/20 text-emerald-200 border-emerald-400/30";

                return (
                  <tr key={order.id} className="transition-colors hover:bg-white/5">
                    <td className="py-4 text-xs font-bold text-white">{order.id}</td>
                    <td className="py-4 text-xs font-medium text-white/90">{order.customer}</td>
                    <td className="py-4 text-xs font-bold text-white">{order.total}</td>
                    <td className="py-4 text-xs">
                      <span className={`inline-flex rounded-full px-3 py-1 font-bold border backdrop-blur-sm ${statusColor}`}>
                        {order.status}
                      </span>
                    </td>
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