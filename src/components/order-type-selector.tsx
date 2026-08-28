"use client";

import { useState } from "react";
import { X, Navigation } from "lucide-react";
import { useBranchStore } from "@/store/branch-store";
import { Logo } from "@/components/logo";

interface OrderTypeSelectorProps {
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

export function OrderTypeSelector({ isOpen, onClose }: OrderTypeSelectorProps) {
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("pickup");
  const [city, setCity] = useState("Lahore");
  const [branch, setBranch] = useState("");
  const [isLocating, setIsLocating] = useState(false);
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
    
    setStoreBranch(selectedBranch);
    setStoreOrderType(orderType);
    onClose();
  };

  const handleCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        () => {
          // Defaulting user location to Lahore for demonstration
          setCity("Lahore");
          setIsLocating(false);
        },
        (error) => {
          console.error("Error retrieving location:", error);
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[420px] rounded-3xl bg-[#F3EDD8] px-8 py-8 text-center shadow-2xl border border-[#D4C9B8]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#E8E3CC] text-[#242222] transition hover:bg-[#A87A53] hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Cozy Cup Logo Header */}
        <div className="mx-auto mb-3 flex items-center justify-center">
          <Logo size={64} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-extrabold text-[#242222]">Select your order type</h2>

        {/* Pill Toggle */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex rounded-full border border-[#D4C9B8] bg-[#E8E3CC]/50 p-1">
            <button
              type="button"
              onClick={() => setOrderType("delivery")}
              className={`rounded-full px-6 py-2 text-xs font-bold transition-all ${
                orderType === "delivery"
                  ? "bg-[#BDD390] text-[#242222] shadow-sm"
                  : "text-[#242222]/70 hover:text-[#242222]"
              }`}
            >
              Delivery
            </button>
            <button
              type="button"
              onClick={() => setOrderType("pickup")}
              className={`rounded-full px-6 py-2 text-xs font-bold transition-all ${
                orderType === "pickup"
                  ? "bg-[#BDD390] text-[#242222] shadow-sm"
                  : "text-[#242222]/70 hover:text-[#242222]"
              }`}
            >
              Pick-Up
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-xs font-bold text-[#242222]">
          {orderType === "pickup"
            ? "Which outlet would you like to pick-up from?"
            : "Please select your delivery area"}
        </p>

        {/* Use Current Location Button */}
        <div className="mt-2.5 flex justify-center">
          <button
            type="button"
            onClick={handleCurrentLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 rounded-full border border-[#A87A53] bg-transparent px-4 py-1.5 text-[11px] font-bold text-[#A87A53] transition hover:bg-[#A87A53] hover:text-white disabled:opacity-50"
          >
            <Navigation className="h-3 w-3 fill-current" />
            {isLocating ? "Detecting location..." : "Use Current Location"}
          </button>
        </div>

        {/* Form Controls */}
        <div className="mt-5 text-left space-y-3.5">
          {/* City Dropdown */}
          <div>
            <label className="mb-1 block text-[11px] font-bold text-[#242222] uppercase tracking-wide">
              Select City / Region
            </label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setBranch("");
                }}
                className={`w-full appearance-none rounded-xl border border-[#D4C9B8] bg-[#F3EDD8] px-4 py-2.5 text-xs font-semibold shadow-sm focus:border-[#A87A53] focus:outline-none ${
                  city ? "text-[#242222]" : "text-[#242222]/50"
                }`}
              >
                <option value="" disabled hidden>Select City / Region</option>
                {Object.keys(locationData).map((c) => (
                  <option key={c} value={c} className="text-[#242222] font-medium">
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-[#242222]/70 text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* Branch Dropdown */}
          <div>
            <label className="mb-1 block text-[11px] font-bold text-[#242222] uppercase tracking-wide">
              Select Branch
            </label>
            <div className="relative">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                disabled={!city}
                className={`w-full appearance-none rounded-xl border border-[#D4C9B8] bg-[#F3EDD8] px-4 py-2.5 text-xs font-semibold shadow-sm focus:border-[#A87A53] focus:outline-none disabled:bg-[#E8E3CC]/60 ${
                  branch ? "text-[#242222]" : "text-[#242222]/50"
                }`}
              >
                <option value="" disabled hidden>Select Branch</option>
                {branches.map((b) => (
                  <option key={b} value={b} className="text-[#242222] font-medium">
                    {b}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-[#242222]/70 text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleSelect}
            disabled={isSelectDisabled}
            className={`mt-2 w-full rounded-xl py-3 text-xs font-extrabold uppercase tracking-wider transition shadow-sm ${
              isSelectDisabled
                ? "bg-[#D4C9B8] text-[#242222]/40 cursor-not-allowed"
                : "bg-[#BDD390] text-[#242222] hover:bg-[#a9c07f]"
            }`}
          >
            Select Branch
          </button>
        </div>

      </div>
    </div>
  );
}