"use client";

import { useState } from "react";
import { Settings, Save, Store, Bell, Lock, Mail, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("CozyCup Café & Bakery");
  const [storeEmail, setStoreEmail] = useState("hadiqa@cozycup.com");
  const [currency, setCurrency] = useState("PKR");
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 text-[#3D2E24] font-sans pb-12 max-w-4xl">
      <header className="flex flex-col gap-2 rounded-3xl bg-[#F3EDD8]/80 p-6 backdrop-blur-[12px] border border-[#BDD390] shadow-md">
        <h1 className="text-2xl font-black text-[#3D2E24] flex items-center gap-2">
          <Settings className="h-6 w-6 text-[#3D2E24]" /> Admin Settings
        </h1>
        <p className="text-sm font-medium text-[#3D2E24]/70">Configure your store preferences, notifications, and profile details</p>
      </header>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="h-4 w-4" /> Settings updated and saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store General Settings */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md space-y-4">
          <h2 className="text-base font-black text-[#3D2E24] flex items-center gap-2 pb-2 border-b border-[#BDD390]/40">
            <Store className="h-4 w-4" /> Store Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2E24]/70 mb-1">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-2xl border border-[#BDD390] bg-white/70 py-2.5 px-4 text-sm font-medium text-[#3D2E24] focus:outline-none focus:ring-2 focus:ring-[#3D2E24]/20 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2E24]/70 mb-1">Store Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-2xl border border-[#BDD390] bg-white/70 py-2.5 px-4 text-sm font-medium text-[#3D2E24] focus:outline-none focus:ring-2 focus:ring-[#3D2E24]/20 shadow-sm"
              >
                <option value="PKR">PKR (Pakistani Rupee)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Admin Account Settings */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md space-y-4">
          <h2 className="text-base font-black text-[#3D2E24] flex items-center gap-2 pb-2 border-b border-[#BDD390]/40">
            <Lock className="h-4 w-4" /> Admin Account
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2E24]/70 mb-1">Admin Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3D2E24]/50" />
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#BDD390] bg-white/70 py-2.5 pl-10 pr-4 text-sm font-medium text-[#3D2E24] focus:outline-none focus:ring-2 focus:ring-[#3D2E24]/20 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="rounded-3xl bg-[#F3EDD8]/40 p-6 backdrop-blur-[12px] border border-[#BDD390]/60 shadow-md space-y-4">
          <h2 className="text-base font-black text-[#3D2E24] flex items-center gap-2 pb-2 border-b border-[#BDD390]/40">
            <Bell className="h-4 w-4" /> Notifications & Alerts
          </h2>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-xs font-black text-[#3D2E24]">New Order Sound & Popup Alerts</h4>
              <p className="text-[11px] text-[#3D2E24]/70">Receive instant notification whenever a customer places an order</p>
            </div>
            <input
              type="checkbox"
              checked={orderAlerts}
              onChange={(e) => setOrderAlerts(e.target.checked)}
              className="h-5 w-5 rounded border-[#BDD390] text-[#3D2E24] focus:ring-[#3D2E24]/20 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-[#3D2E24] text-[#BDD390] px-6 py-3 text-xs font-black shadow-lg hover:bg-[#3D2E24]/95 transition-all hover:scale-105"
          >
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}