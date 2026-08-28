"use client";

import { useState } from "react";
import { X, Navigation } from "lucide-react";
import { useBranchStore } from "@/store/branch-store";

interface OrderTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// City and Branch data
const locationData: Record<string, string[]> = {
  "Rawalpindi": ["DHA Phase 1", "DHA Phase 2", "DHA Phase 3", "DHA Phase 4", "Bahria Town", "Gulraiz", "Saddar"],
  "Lahore": ["DHA Phase 1", "DHA Phase 2", "DHA Phase 3", "DHA Phase 4", "DHA Phase 5", "Gulberg", "Johar Town", "Model Town", "Model Town Extension"],
  "Islamabad": ["DHA Phase 1", "DHA Phase 2", "DHA Phase 3", "DHA Phase 4", "E-11", "F-6", "F-7", "G-11"],
  "Karachi": ["DHA Phase 1", "DHA Phase 2", "DHA Phase 3", "DHA Phase 4", "Clifton", "Gulshan-e-Iqbal", "Korangi"],
  "Multan": ["Bucha Arcade", "Near Buch Villas", "Cantt", "City Center"],
};

export function OrderTypeModal({ isOpen, onClose }: OrderTypeModalProps) {
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("pickup");
  const [city, setCity] = useState("Lahore");
  const [branch, setBranch] = useState("");
  const { setBranch: setStoreBranch, setOrderType: setStoreOrderType } = useBranchStore();

  const branches = city ? locationData[city] || [] : [];
  const isSelectDisabled = !city || !branch;

  if (!isOpen) return null;

  const handleSelect = () => {
    if (isSelectDisabled) return;
    
    const selectedBranch = {
      id: branch,
      name: branch,
      city: city,
      area: branch,
      address: `${branch}, ${city}`,
      orderType: orderType,
    };
    
    console.log("Selected branch:", selectedBranch);
    setStoreBranch(selectedBranch);
    setStoreOrderType(orderType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4">
      <div className="relative w-full max-w-[420px] rounded-2xl bg-white px-8 py-9 text-center shadow-2xl">
        
        {/* Cozy Cup Double Ring Logo */}
        <div className="mx-auto mb-4 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-[3.5px] border-[#C8102E] bg-white p-1">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#C8102E]">
              <span className="text-lg font-bold italic tracking-tighter text-white">cc</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-extrabold text-gray-900">Select your order type</h2>

        {/* Pill Toggles */}
        <div className="mt-3 flex justify-center">
          <div className="inline-flex rounded-full border border-gray-200 p-1">
            <button
              type="button"
              onClick={() => setOrderType("delivery")}
              className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
                orderType === "delivery"
                  ? "bg-[#C8102E] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Delivery
            </button>
            <button
              type="button"
              onClick={() => setOrderType("pickup")}
              className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
                orderType === "pickup"
                  ? "bg-[#C8102E] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pick-Up
            </button>
          </div>
        </div>

        {/* Subtitle Message */}
        <p className="mt-5 text-sm font-semibold text-gray-700">
          {orderType === "pickup"
            ? "Which outlet would you like to pick-up from?"
            : "Please select your delivery area"}
        </p>

        {/* Use Current Location Button */}
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-[#F2F5F8] px-4 py-1.5 text-xs font-semibold text-[#002B49] transition hover:bg-gray-200"
          >
            <Navigation className="h-3.5 w-3.5 fill-[#002B49] text-[#002B49]" />
            Use Current Location
          </button>
        </div>

        {/* Form Fields */}
        <div className="mt-6 text-left space-y-4">
          {/* City Selector */}
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-800">Select City / Region</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setBranch("");
                }}
                className={`w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold shadow-sm focus:border-[#C8102E] focus:outline-none ${
                  city ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <option value="" disabled hidden>Select City / Region</option>
                {Object.keys(locationData).map((c) => (
                  <option key={c} value={c} className="text-gray-900 font-medium">{c}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <span className="text-xs text-gray-600">▼</span>
              </div>
            </div>
          </div>

          {/* Branch Selector */}
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-800">Select Branch</label>
            <div className="relative">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                disabled={!city}
                className={`w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold shadow-sm focus:border-[#C8102E] focus:outline-none disabled:bg-gray-50 ${
                  branch ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <option value="" disabled hidden>Select Branch</option>
                {branches.map((b) => (
                  <option key={b} value={b} className="text-gray-900 font-medium">{b}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <span className="text-xs text-gray-600">▼</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleSelect}
            disabled={isSelectDisabled}
            className={`mt-4 w-full rounded-xl py-3 text-sm font-bold transition ${
              isSelectDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#C8102E] text-white hover:bg-red-700"
            }`}
          >
            Select
          </button>
        </div>

      </div>
    </div>
  );
}