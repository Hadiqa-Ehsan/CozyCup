"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  TrendingUp,
  Search,
  Bell,
  Sparkles,
  Crown,
  BarChart3,
  LineChart
} from "lucide-react";

export default function AdminDashboard() {
  const [revenue, setRevenue] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevenue(14250);
      setOrdersCount(328);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Weekly data for the proper charts
  const weeklyRevenueData = [
    { day: "Mon", amount: 1800 },
    { day: "Tue", amount: 2400 },
    { day: "Wed", amount: 1950 },
    { day: "Thu", amount: 3100 },
    { day: "Fri", amount: 4200 },
    { day: "Sat", amount: 5600 },
    { day: "Sun", amount: 4800 },
  ];

  const orderVolumeData = [
    { day: "Mon", orders: 24 },
    { day: "Tue", orders: 35 },
    { day: "Wed", orders: 28 },
    { day: "Thu", orders: 42 },
    { day: "Fri", orders: 58 },
    { day: "Sat", orders: 75 },
    { day: "Sun", orders: 62 },
  ];

  const maxRevenue = 6000;
  const maxOrders = 80;

  return (
    <div className="space-y-8 text-[#3D2E24] font-sans pb-10">
      {/* Top Header Card */}
      <header className="flex flex-col gap-4 rounded-3xl bg-[#F3EDD8]/80 p-6 backdrop-blur-[12px] border border-[#BDD390] shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#3D2E24]">Good evening, Admin.</h1>
          <p className="text-sm font-medium text-[#3D2E24]/70">CozyCup Store Command Center.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/50" />
            <input
              type="search"
              placeholder="Search metrics..."
              className="rounded-2xl border border-[#BDD390] bg-white/60 py-2.5 pl-10 pr-4 text-sm font-medium text-[#3D2E24] placeholder-[#3D2E24]/40 focus:outline-none backdrop-blur-md shadow-sm"
            />
          </div>
          <button className="relative rounded-2xl bg-white/80 p-3 text-[#3D2E24] border border-[#BDD390] hover:bg-[#3D2E24] hover:text-white shadow-sm transition-all">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#BDD390] animate-pulse" />
          </button>
        </div>
      </header>

      {/* OVERLAPPING FEATURED CARDS SECTION */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-[#3D2E24] flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#3D2E24]" /> Featured Performance Highlights
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-4">
          
          {/* Card 1 */}
          <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md transition-all hover:-translate-y-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D2E24]/60">Monthly Revenue</span>
              <div className="h-8 w-8 rounded-full bg-[#BDD390] flex items-center justify-center text-[#3D2E24] font-bold">₨</div>
            </div>
            <p className="text-3xl font-black text-[#3D2E24]">PKR {revenue.toLocaleString()}</p>
            <p className="text-xs font-semibold text-emerald-800 mt-2 flex items-center gap-1">
              <span className="bg-[#BDD390] px-2 py-0.5 rounded-full text-[#3D2E24]">↑ +14.2%</span> vs last month
            </p>
          </div>

          {/* Card 2: OVERLAPPING POP-OUT CARD */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#BDD390] rounded-[2.5rem] rotate-3 scale-105 shadow-lg opacity-90 transition-transform group-hover:rotate-6" />
            <div className="relative rounded-[2.5rem] bg-white p-6 shadow-xl border-2 border-[#3D2E24]/10 transition-transform hover:-translate-y-2">
              <div className="absolute -top-6 right-8 bg-[#3D2E24] text-[#BDD390] px-4 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1">
                <Crown className="h-3.5 w-3.5" /> Top Seller
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D2E24]/60">Best Performing Dish</span>
              <h3 className="text-xl font-black text-[#3D2E24] mt-1">Caramel Macchiato</h3>
              <p className="text-xs text-[#3D2E24]/70 mt-1">Espresso with vanilla syrup & caramel drizzle</p>
              
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#BDD390]/30">
                <div>
                  <span className="text-[10px] font-bold text-[#3D2E24]/50 uppercase">Orders Today</span>
                  <p className="text-lg font-black text-[#3D2E24]">142 units</p>
                </div>
                <span className="rounded-2xl bg-[#BDD390] px-4 py-2 text-xs font-black text-[#3D2E24] shadow-sm">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md transition-all hover:-translate-y-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D2E24]/60">Total Orders</span>
              <div className="h-8 w-8 rounded-full bg-[#BDD390] flex items-center justify-center text-[#3D2E24]"><ShoppingBag className="h-4 w-4" /></div>
            </div>
            <p className="text-3xl font-black text-[#3D2E24]">{ordersCount}</p>
            <p className="text-xs font-semibold text-emerald-800 mt-2 flex items-center gap-1">
              <span className="bg-[#BDD390] px-2 py-0.5 rounded-full text-[#3D2E24]">↑ +8.1%</span> vs last week
            </p>
          </div>

        </div>
      </div>

      {/* PROPER ANALYTICS CHARTS SECTION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 pt-4">
        
        {/* Chart 1: Weekly Revenue Trend */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-[#3D2E24] flex items-center gap-2">
                <LineChart className="h-4 w-4 text-[#3D2E24]" /> Weekly Revenue (PKR)
              </h2>
              <p className="text-xs text-[#3D2E24]/60 mt-0.5">Earnings across the last 7 days</p>
            </div>
            <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full shadow-sm">Live Trend</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-2 pt-4 px-2 border-b border-[#BDD390]/40 pb-2">
            {weeklyRevenueData.map((item) => {
              const heightPercentage = (item.amount / maxRevenue) * 100;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-bold text-[#3D2E24] opacity-0 group-hover:opacity-100 transition-opacity">
                    ₨{item.amount}
                  </span>
                  <div 
                    style={{ height: `${heightPercentage}%` }} 
                    className="w-full bg-[#3D2E24] rounded-t-xl transition-all duration-300 group-hover:bg-[#BDD390]" 
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between px-2 pt-3 text-xs font-bold text-[#3D2E24]/70">
            {weeklyRevenueData.map((item) => (
              <span key={item.day}>{item.day}</span>
            ))}
          </div>
        </div>

        {/* Chart 2: Daily Order Volume Bar Chart */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-[#3D2E24] flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#3D2E24]" /> Daily Order Volume
              </h2>
              <p className="text-xs text-[#3D2E24]/60 mt-0.5">Total completed orders per day</p>
            </div>
            <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full shadow-sm">Volume</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-4 px-2 border-b border-[#BDD390]/40 pb-2">
            {orderVolumeData.map((item) => {
              const heightPercentage = (item.orders / maxOrders) * 100;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-bold text-[#3D2E24] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.orders}
                  </span>
                  <div 
                    style={{ height: `${heightPercentage}%` }} 
                    className="w-full bg-[#BDD390] rounded-t-xl transition-all duration-300 group-hover:bg-[#3D2E24]" 
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between px-2 pt-3 text-xs font-bold text-[#3D2E24]/70">
            {orderVolumeData.map((item) => (
              <span key={item.day}>{item.day}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}