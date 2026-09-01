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
    <div className="space-y-6 text-[#3D2E24] font-sans">
      {/* Top Header Card */}
      <header className="flex flex-col gap-4 rounded-3xl bg-[#F3EDD8]/80 p-6 backdrop-blur-[12px] border border-[#BDD390] shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#3D2E24]">Good evening, Admin.</h1>
          <p className="text-sm font-medium text-[#3D2E24]/70">Here is what is happening with CozyCup today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/50" />
            <input
              type="search"
              placeholder="Search metrics..."
              className="rounded-2xl border border-[#BDD390] bg-white/60 py-2.5 pl-10 pr-4 text-sm font-medium text-[#3D2E24] placeholder-[#3D2E24]/40 focus:border-[#3D2E24] focus:outline-none backdrop-blur-md shadow-sm"
            />
          </div>
          <button className="relative rounded-2xl bg-white/80 p-3 text-[#3D2E24] border border-[#BDD390] transition-all hover:bg-[#3D2E24] hover:text-white shadow-sm">
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
            className="group rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md transition-all duration-300 hover:-translate-y-[6px] hover:shadow-xl hover:border-[#3D2E24]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D2E24]/70">{stat.title}</span>
              <div className="rounded-2xl bg-[#BDD390] p-3 text-[#3D2E24] shadow-sm transition-transform group-hover:scale-110">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-black text-[#3D2E24]">{stat.value}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <span className="flex items-center rounded-full bg-[#BDD390]/60 px-2.5 py-0.5 text-[#3D2E24]">
                <ArrowUp className="h-3 w-3 mr-0.5" /> {stat.change}
              </span>
              <span className="text-[#3D2E24]/60 font-normal">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md transition-all duration-300 hover:-translate-y-[6px] hover:border-[#3D2E24]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#3D2E24] flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#3D2E24]" /> Revenue Trend
            </h2>
            <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full shadow-sm">Live Weekly</span>
          </div>
          <div className="h-36 flex items-end justify-between gap-3 pt-6 px-2">
            {[40, 65, 45, 80, 95, 75, 100].map((height, i) => (
              <div key={i} className="w-full bg-[#3D2E24]/5 rounded-2xl overflow-hidden flex flex-col justify-end h-full group">
                <div 
                  style={{ height: `${height}%` }} 
                  className="w-full bg-gradient-to-t from-[#BDD390] to-[#3D2E24] rounded-2xl transition-all duration-500 group-hover:brightness-110" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md transition-all duration-300 hover:-translate-y-[6px] hover:border-[#3D2E24]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#3D2E24] flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#3D2E24]" /> Order Volume
            </h2>
            <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full shadow-sm">Last 7 Days</span>
          </div>
          <div className="h-36 flex items-end justify-between gap-3 pt-6 px-2">
            {[30, 50, 70, 60, 85, 90, 110].map((val, i) => (
              <div key={i} className="w-full bg-[#3D2E24]/5 rounded-2xl overflow-hidden flex flex-col justify-end h-full group">
                <div 
                  style={{ height: `${val}%` }} 
                  className="w-full bg-gradient-to-t from-[#BDD390]/80 to-[#BDD390] rounded-2xl transition-all duration-500 group-hover:bg-[#3D2E24]" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md transition-all duration-300 hover:border-[#3D2E24]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#3D2E24]">Recent Orders</h2>
          <button className="text-xs font-bold text-[#3D2E24] hover:underline">View all orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#BDD390]">
            <thead>
              <tr>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Order ID</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Customer</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Total</th>
                <th className="py-3 text-left text-xs font-bold text-[#3D2E24]/70 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDD390]/30">
              {recentOrders.map((order) => {
                const statusColor = 
                  order.status === "Pending" ? "bg-amber-200 text-amber-900 border-amber-300 animate-pulse" :
                  order.status === "Processing" ? "bg-blue-200 text-blue-900 border-blue-300" :
                  "bg-emerald-200 text-emerald-900 border-emerald-300";

                return (
                  <tr key={order.id} className="transition-colors hover:bg-white/40">
                    <td className="py-4 text-xs font-bold text-[#3D2E24]">{order.id}</td>
                    <td className="py-4 text-xs font-medium text-[#3D2E24]">{order.customer}</td>
                    <td className="py-4 text-xs font-bold text-[#3D2E24]">{order.total}</td>
                    <td className="py-4 text-xs">
                      <span className={`inline-flex rounded-full px-3 py-1 font-bold border shadow-sm ${statusColor}`}>
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