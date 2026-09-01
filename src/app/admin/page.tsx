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
  { title: "Total Revenue", value: "PKR 0.00", change: "+0%", icon: TrendingUp },
  { title: "Total Orders", value: "0", change: "+0%", icon: ShoppingBag },
  { title: "Total Products", value: "0", change: "+0%", icon: Package },
  { title: "Total Users", value: "0", change: "+0%", icon: Users },
];

const recentOrders = [
  { id: "#2841", customer: "Alice Khan", total: "PKR 1,598.00", status: "Pending" },
  { id: "#2840", customer: "Bilal Ahmed", total: "PKR 498.00", status: "Processing" },
];

const favoriteProducts = [
  { name: "Fresh Milk", category: "Dairy", orders: 45 },
  { name: "Chicken Burger", category: "Fast Food", orders: 38 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <header className="flex flex-col gap-4 rounded-3xl bg-[#F3EDD8]/60 p-6 shadow-sm border border-[#BDD390] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#2D231F]">Good evening, Admin.</h1>
          <p className="text-sm font-medium text-[#2D231F]/70">Here is what is happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2D231F]/50" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-2xl border border-[#BDD390] bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-[#2D231F] focus:border-[#2D231F] focus:outline-none"
            />
          </div>
          <button className="rounded-2xl bg-white p-3 text-[#2D231F] border border-[#BDD390] transition-all hover:bg-[#2D231F] hover:text-white shadow-sm">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-3xl bg-[#F3EDD8]/30 p-6 shadow-sm border border-[#BDD390]/70 transition-all hover:border-[#2D231F]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D231F]/60">{stat.title}</span>
              <div className="rounded-2xl bg-[#BDD390] p-3 text-[#2D231F] shadow-sm">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-black text-[#2D231F]">{stat.value}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <span className="flex items-center rounded-full bg-[#BDD390]/50 px-2.5 py-0.5 text-[#2D231F]">
                <ArrowUp className="h-3 w-3 mr-0.5" /> {stat.change}
              </span>
              <span className="text-[#2D231F]/50 font-normal">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Order Tracker Banner */}
      <div className="rounded-3xl bg-[#2D231F] p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-bold text-white">Order #2841 – Charred Double Smash + 2 items</h2>
            <p className="text-xs text-[#BDD390]">Cozy Cup Kitchen • Placed at 7:42 PM</p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-[#BDD390] px-3.5 py-1 text-xs font-extrabold text-[#2D231F]">
            On the way • ETA 12 min
          </span>
        </div>

        <div className="mt-8 flex items-center justify-between px-4">
          {['Confirmed', 'Cooking', 'On the way', 'Delivered'].map((step, index) => (
            <div key={step} className="flex flex-1 flex-col items-center text-center">
              <div className={`h-3.5 w-3.5 rounded-full ${index <= 2 ? 'bg-[#BDD390]' : 'bg-white/30'}`} />
              <span className={`mt-2 text-xs font-semibold ${index <= 2 ? 'text-white' : 'text-white/50'}`}>{step}</span>
            </div>
          ))}
        </div>

        <button className="mt-8 w-full rounded-2xl bg-[#BDD390] py-3.5 text-center text-sm font-extrabold text-[#2D231F] transition-all hover:bg-[#a9c07a]">
          Track Order Live
        </button>
      </div>

      {/* Tables & Lists Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-[#F3EDD8]/20 p-6 shadow-sm border border-[#BDD390] lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D231F]">Recent Orders</h2>
            <button className="text-xs font-bold text-[#2D231F]/70 hover:text-[#2D231F]">View all</button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-[#BDD390]">
              <thead>
                <tr>
                  <th className="py-3 text-left text-xs font-bold text-[#2D231F]/70 uppercase tracking-wider">Order ID</th>
                  <th className="py-3 text-left text-xs font-bold text-[#2D231F]/70 uppercase tracking-wider">Customer</th>
                  <th className="py-3 text-left text-xs font-bold text-[#2D231F]/70 uppercase tracking-wider">Total</th>
                  <th className="py-3 text-left text-xs font-bold text-[#2D231F]/70 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BDD390]/30">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3.5 text-xs font-bold text-[#2D231F]">{order.id}</td>
                    <td className="py-3.5 text-xs font-medium text-[#2D231F]/90">{order.customer}</td>
                    <td className="py-3.5 text-xs font-bold text-[#2D231F]">{order.total}</td>
                    <td className="py-3.5 text-xs">
                      <span className="rounded-full bg-[#BDD390] px-3 py-1 font-bold text-[#2D231F]">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-[#F3EDD8]/20 p-6 shadow-sm border border-[#BDD390]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2D231F]">Favorite Dishes</h2>
            <button className="text-xs font-bold text-[#2D231F]/70 hover:text-[#2D231F]">See all</button>
          </div>
          <div className="mt-4 space-y-3">
            {favoriteProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between rounded-2xl bg-white p-4 border border-[#BDD390]/60 shadow-sm">
                <div>
                  <p className="text-xs font-bold text-[#2D231F]">{product.name}</p>
                  <p className="text-[10px] font-semibold text-[#2D231F]/60">{product.category}</p>
                </div>
                <span className="rounded-full bg-[#BDD390]/50 px-2.5 py-1 text-xs font-bold text-[#2D231F]">{product.orders} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}