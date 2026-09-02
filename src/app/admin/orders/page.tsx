"use client";

import { useState } from "react";
import { ShoppingBag, Search, Clock, CheckCircle2, AlertCircle, X } from "lucide-react";

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(
    o => o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
         o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-[#3D2E24] font-sans pb-12">
      <header className="flex flex-col gap-4 rounded-3xl bg-[#F3EDD8]/80 p-6 backdrop-blur-[12px] border border-[#BDD390] shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#3D2E24]">Manage Orders</h1>
          <p className="text-sm font-medium text-[#3D2E24]/70">View and track customer store orders</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3D2E24]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders or customer..."
            className="rounded-2xl border border-[#BDD390] bg-white/70 py-2.5 pl-10 pr-8 text-sm font-medium text-[#3D2E24] placeholder-[#3D2E24]/40 focus:outline-none focus:ring-2 focus:ring-[#3D2E24]/20 shadow-sm w-72"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-[#3D2E24]/10 rounded-full p-1 hover:bg-[#3D2E24]/20"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </header>

      <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-[#3D2E24] flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#3D2E24]" /> All Store Orders
          </h2>
          <span className="text-xs font-bold bg-[#BDD390] px-3 py-1 rounded-xl text-[#3D2E24]">
            {filteredOrders.length} Orders Found
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
              {filteredOrders.map((order) => {
                const orderTotal = order.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
                const itemsSummary = order.items.map(i => `${i.quantity}x ${i.name}`).join(", ");
                
                const statusBadge = 
                  order.status === "Pending" ? (
                    <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-amber-200 text-amber-900 border border-amber-300">
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
                  <tr key={order.id} className="hover:bg-white/40 transition-colors">
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