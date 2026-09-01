"use client";

import { StatsCard } from "@/components/admin/stats-card";
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Package,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "PKR 0.00",
      change: "+0%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Total Orders",
      value: "0",
      change: "+0%",
      icon: ShoppingBag,
      trend: "up",
    },
    {
      title: "Total Products",
      value: "0",
      change: "+0%",
      icon: Package,
      trend: "up",
    },
    {
      title: "Total Users",
      value: "0",
      change: "+0%",
      icon: Users,
      trend: "up",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#3D2E24]">Dashboard</h1>
      <p className="text-sm text-[#3D2E24]/70">Welcome to your admin panel</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-sm transition-all hover:border-[#98AB81] hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#3D2E24]/70">{stat.title}</span>
              <div className="rounded-full bg-[#98AB81]/20 p-2">
                <stat.icon className="h-5 w-5 text-[#98AB81]" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-[#3D2E24]">{stat.value}</p>
            <div className="mt-2 flex items-center gap-1 text-xs font-semibold">
              {stat.trend === "up" ? (
                <ArrowUp className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500" />
              )}
              <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                {stat.change}
              </span>
              <span className="text-[#3D2E24]/60">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#3D2E24]">Recent Orders</h2>
        <p className="text-sm text-[#3D2E24]/70">No orders yet</p>
      </div>
    </div>
  );
}