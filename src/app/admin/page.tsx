"use client";

import {
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  ArrowUp,
  ArrowDown,
  Search,
  Bell
} from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "PKR 0.00", change: "+0%", icon: TrendingUp, trend: "up" },
  { title: "Total Orders", value: "0", change: "+0%", icon: ShoppingBag, trend: "up" },
  { title: "Total Products", value: "0", change: "+0%", icon: Package, trend: "up" },
  { title: "Total Users", value: "0", change: "+0%", icon: Users, trend: "up" },
];

// Mock data for Recent Orders
const recentOrders = [
  { id: "#2841", customer: "Alice Khan", date: "Just now", items: 2, total: "PKR 1,598.00", status: "Pending" },
  { id: "#2840", customer: "Bilal Ahmed", date: "15 min ago", items: 1, total: "PKR 498.00", status: "Processing" },
  { id: "#2839", customer: "Sara Zafar", date: "1 hour ago", items: 4, total: "PKR 2,894.00", status: "Shipped" },
];

// Mock data for Favorite Products
const favoriteProducts = [
  { name: "Fresh Milk", category: "Dairy", orders: 45 },
  { name: "Chicken Burger", category: "Fast Food", orders: 38 },
  { name: "Chocolate Cake", category: "Bakery", orders: 29 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section (Mocked) */}
      <header className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm border border-[#98AB81]/40">
        <div>
          <h1 className="text-2xl font-bold text-[#3D2E24]">Good evening, Admin</h1>
          <p className="text-sm text-[#3D2E24]/70">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3D2E24]/50" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-xl border border-[#98AB81]/40 bg-[#F4F6F0] py-2 pl-10 pr-4 text-sm focus:border-[#BDD390] focus:ring-1 focus:ring-[#BDD390]"
            />
          </div>
          <button className="rounded-full bg-[#F4F6F0] p-2 text-[#3D2E24]/70 hover:bg-[#98AB81]/20">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-sm transition-all hover:border-[#BDD390] hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#3D2E24]/70">{stat.title}</span>
              <div className="rounded-full bg-[#98AB81]/20 p-2">
                <stat.icon className="h-5 w-5 text-[#98AB81]" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold text-[#3D2E24]">{stat.value}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
              <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                {stat.change}
              </span>
              <span className="text-[#3D2E24]/60">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Progress Tracker (Mocked) */}
      <div className="rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#3D2E24]">Order #{recentOrders[0].id} – {recentOrders[0].items} items</h2>
            <p className="text-sm text-[#3D2E24]/70">Customer: {recentOrders[0].customer} - Placed at 7:42 PM</p>
          </div>
          <button className="rounded-full bg-[#F4F6F0] px-4 py-1 text-xs font-medium text-[#3D2E24]/70 hover:bg-[#98AB81]/20">
            On the way – ETA 12 min
          </button>
        </div>
        <div className="mt-6 flex items-center justify-between">
          {['Confirmed', 'Cooking', 'On the way', 'Delivered'].map((step, index) => (
            <div key={step} className="flex flex-1 flex-col items-center text-center">
              <div className={`relative h-3 w-3 rounded-full ${index <= 2 ? 'bg-[#BDD390]' : 'bg-[#98AB81]/30'}`}>
                {index < 2 && <div className="absolute left-full top-1/2 h-0.5 w-full bg-[#BDD390]" />}
                {index === 2 && <div className="absolute left-full top-1/2 h-0.5 w-1/2 bg-[#BDD390]" />}
              </div>
              <span className={`mt-2 text-xs font-medium ${index <= 2 ? 'text-[#3D2E24]' : 'text-[#3D2E24]/50'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full rounded-xl bg-[#3D2E24] py-3 text-center text-sm font-semibold text-white hover:bg-[#5C4A3A]">
          Track Order Live
        </button>
      </div>

      {/* Recent Orders & Favorite Dishes */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Orders Table */}
        <div className="rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#3D2E24]">Recent Orders</h2>
            <button className="text-sm font-medium text-[#98AB81] hover:text-[#BDD390]">View all</button>
          </div>
          <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-[#98AB81]/20">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#3D2E24] sm:pl-0">Order ID</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-[#3D2E24]">Customer</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-[#3D2E24]">Date</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-[#3D2E24]">Total</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-[#3D2E24]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#98AB81]/20">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#98AB81] sm:pl-0">{order.id}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#3D2E24]">{order.customer}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#3D2E24]/70">{order.date}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-[#3D2E24]">{order.total}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'Shipped' ? 'bg-green-100 text-green-800' : ''
                            }`}>
                                {order.status}
                            </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Dishes List */}
        <div className="rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#3D2E24]">Favorite Dishes</h2>
            <button className="text-sm font-medium text-[#98AB81] hover:text-[#BDD390]">See all</button>
          </div>
          <ul role="list" className="mt-6 divide-y divide-[#98AB81]/20">
            {favoriteProducts.map((product) => (
              <li key={product.name} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[#F4F6F0] border border-[#98AB81]/20 flex items-center justify-center">
                     <Package className="h-5 w-5 text-[#98AB81]/50"/>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#3D2E24]">{product.name}</p>
                    <p className="text-xs text-[#3D2E24]/70">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-[#98AB81]">{product.orders}</p>
                    <p className="text-xs text-[#3D2E24]/70">Orders</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}