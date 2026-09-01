"use client";

import {
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  ArrowUp,
  Search,
  Bell
} from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "PKR 0.00", change: "+0%", icon: TrendingUp, trend: "up" },
  { title: "Total Orders", value: "0", change: "+0%", icon: ShoppingBag, trend: "up" },
  { title: "Total Products", value: "0", change: "+0%", icon: Package, trend: "up" },
  { title: "Total Users", value: "0", change: "+0%", icon: Users, trend: "up" },
];

const recentOrders = [
  { id: "#2841", customer: "Alice Khan", date: "Just now", items: 2, total: "PKR 1,598.00", status: "Pending" },
  { id: "#2840", customer: "Bilal Ahmed", date: "15 min ago", items: 1, total: "PKR 498.00", status: "Processing" },
];

const favoriteProducts = [
  { name: "Fresh Milk", category: "Dairy", orders: 45 },
  { name: "Chicken Burger", category: "Fast Food", orders: 38 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm border border-[#98AB81]/30 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3D2E24]">Good evening, Admin.</h1>
          <p className="text-sm text-[#3D2E24]/70">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/40" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-xl border border-[#98AB81]/30 bg-[#F4F6F0] py-2 pl-9 pr-4 text-sm focus:border-[#BDD390] focus:outline-none"
            />
          </div>
          <button className="rounded-xl bg-[#F4F6F0] p-2.5 text-[#3D2E24]/70 hover:bg-[#98AB81]/20">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Stats Grid Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-3xl bg-white p-6 shadow-sm border border-[#98AB81]/30 transition-all hover:border-[#BDD390]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#3D2E24]/70">{stat.title}</span>
              <div className="rounded-2xl bg-[#BDD390]/20 p-2.5">
                <stat.icon className="h-5 w-5 text-[#3D2E24]" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold text-[#3D2E24]">{stat.value}</p>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-600">
              <ArrowUp className="h-3 w-3" />
              <span>{stat.change}</span>
              <span className="text-[#3D2E24]/50 font-normal">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Progress Tracker Card */}
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#98AB81]/30">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-bold text-[#3D2E24]">Order #2841 – Charred Double Smash + 2 items</h2>
            <p className="text-xs text-[#3D2E24]/70">CozyCup Kitchen • Placed at 7:42 PM</p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-[#BDD390]/30 px-3 py-1 text-xs font-semibold text-[#3D2E24]">
            On the way • ETA 12 min
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between px-2">
          {['Confirmed', 'Cooking', 'On the way', 'Delivered'].map((step, index) => (
            <div key={step} className="flex flex-1 flex-col items-center text-center">
              <div className={`h-3 w-3 rounded-full ${index <= 2 ? 'bg-[#3D2E24]' : 'bg-[#98AB81]/30'}`} />
              <span className="mt-2 text-xs font-medium text-[#3D2E24]">{step}</span>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full rounded-2xl bg-[#3D2E24] py-3 text-center text-sm font-semibold text-white transition-all hover:bg-[#5C4A3A]">
          Track Order Live
        </button>
      </div>

      {/* Recent Orders & Favorite Dishes Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Orders Table Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#98AB81]/30 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#3D2E24]">Recent Orders</h2>
            <button className="text-xs font-semibold text-[#3D2E24]/60 hover:text-[#3D2E24]">View all</button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-[#98AB81]/20">
              <thead>
                <tr>
                  <th className="py-3 text-left text-xs font-semibold text-[#3D2E24]/70">Order ID</th>
                  <th className="py-3 text-left text-xs font-semibold text-[#3D2E24]/70">Customer</th>
                  <th className="py-3 text-left text-xs font-semibold text-[#3D2E24]/70">Total</th>
                  <th className="py-3 text-left text-xs font-semibold text-[#3D2E24]/70">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#98AB81]/10">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 text-xs font-bold text-[#3D2E24]">{order.id}</td>
                    <td className="py-3 text-xs text-[#3D2E24]/80">{order.customer}</td>
                    <td className="py-3 text-xs font-semibold text-[#3D2E24]">{order.total}</td>
                    <td className="py-3 text-xs">
                      <span className="rounded-full bg-[#BDD390]/30 px-2.5 py-1 font-medium text-[#3D2E24]">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Favorite Dishes Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#98AB81]/30">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#3D2E24]">Favorite Dishes</h2>
            <button className="text-xs font-semibold text-[#3D2E24]/60 hover:text-[#3D2E24]">See all</button>
          </div>
          <div className="mt-4 space-y-4">
            {favoriteProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between rounded-2xl bg-[#F4F6F0] p-3">
                <div>
                  <p className="text-xs font-bold text-[#3D2E24]">{product.name}</p>
                  <p className="text-[10px] text-[#3D2E24]/60">{product.category}</p>
                </div>
                <span className="text-xs font-bold text-[#3D2E24]">{product.orders} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}