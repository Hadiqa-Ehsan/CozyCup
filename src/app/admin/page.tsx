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
  Sparkles,
  Crown
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

      {/* OVERLAPPING FEATURED CARDS SECTION (Inspired by your food card layout reference) */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-[#3D2E24] flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#3D2E24]" /> Featured Performance Highlights
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-4">
          
          {/* Card 1: Standard Stat Card */}
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

          {/* Card 2: OVERLAPPING POP-OUT CARD (Exact style of the middle food card in your reference) */}
          <div className="relative group">
            {/* Background green decorative offset card layer */}
            <div className="absolute inset-0 bg-[#BDD390] rounded-[2.5rem] rotate-3 scale-105 shadow-lg opacity-90 transition-transform group-hover:rotate-6" />
            
            {/* Main Overlapping Foreground Card */}
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

          {/* Card 3: Standard Stat Card */}
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

      {/* ADVANCED UNIQUE CHARTS GRID (Inspired by your Hyper Charts reference) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 pt-4">
        
        {/* Chart 1: Star / Radar Metric Map (Like top-left graph in your reference) */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-[#3D2E24] flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#3D2E24]" /> Branch Performance Matrix
            </h2>
            <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full shadow-sm">Radar View</span>
          </div>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Concentric rings */}
              <div className="absolute w-48 h-48 rounded-full border border-[#3D2E24]/10" />
              <div className="absolute w-32 h-32 rounded-full border border-[#3D2E24]/15" />
              <div className="absolute w-16 h-16 rounded-full border border-[#3D2E24]/20" />
              
              {/* Star polygon shape via SVG */}
              <svg className="absolute w-44 h-44 text-[#3D2E24] drop-shadow-md" viewBox="0 0 100 100">
                <polygon 
                  points="50,10 65,35 90,40 70,65 75,90 50,75 25,90 30,65 10,40 35,35" 
                  fill="rgba(189,211,144,0.5)" 
                  stroke="#3D2E24" 
                  strokeWidth="2" 
                />
                <circle cx="50" cy="50" r="4" fill="#3D2E24" />
              </svg>
            </div>
            <div className="mt-4 flex gap-4 text-xs font-bold text-[#3D2E24]/70">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#3D2E24]" /> Gulberg</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#BDD390]" /> DHA Phase 5</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Connected Node Network (Like bottom-left graph in your reference) */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#3D2E24]">Supply Chain Node Network</h2>
            <span className="text-xs font-bold text-[#3D2E24] bg-[#BDD390] px-3 py-1 rounded-full shadow-sm">Active Map</span>
          </div>
          <div className="h-48 relative flex items-center justify-center bg-white/40 rounded-2xl border border-[#BDD390]/40 p-4">
            {/* SVG Connecting lines */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="20%" y1="30%" x2="50%" y2="70%" stroke="#3D2E24" strokeWidth="2" strokeDasharray="4" opacity="0.4" />
              <line x1="50%" y1="70%" x2="80%" y2="30%" stroke="#3D2E24" strokeWidth="2" opacity="0.6" />
              <line x1="20%" y1="30%" x2="80%" y2="30%" stroke="#BDD390" strokeWidth="3" />
            </svg>
            {/* Node points */}
            <div className="absolute left-[20%] top-[30%] -translate-x-1/2 -translate-y-1/2 bg-[#3D2E24] text-[#BDD390] p-2.5 rounded-2xl shadow-lg text-xs font-bold">
              Hub A
            </div>
            <div className="absolute left-[50%] top-[70%] -translate-x-1/2 -translate-y-1/2 bg-[#BDD390] text-[#3D2E24] p-2.5 rounded-2xl shadow-lg text-xs font-extrabold">
              Central Node
            </div>
            <div className="absolute left-[80%] top-[30%] -translate-x-1/2 -translate-y-1/2 bg-[#3D2E24] text-[#BDD390] p-2.5 rounded-2xl shadow-lg text-xs font-bold">
              Hub B
            </div>
          </div>
          <p className="text-[11px] text-[#3D2E24]/60 text-center mt-3">All regional inventory links operating at optimal routing capacity.</p>
        </div>

      </div>
    </div>
  );
}