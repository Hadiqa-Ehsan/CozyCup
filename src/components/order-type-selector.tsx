"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface OrderTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderTypeSelector({ isOpen, onClose }: OrderTypeSelectorProps) {
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Select your order type</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Order Type */}
        <div className="flex gap-3">
          <button
            onClick={() => setOrderType("delivery")}
            className={`flex-1 rounded-lg border py-3 text-center font-medium transition ${
              orderType === "delivery"
                ? "border-[#C8102E] bg-[#C8102E] text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setOrderType("pickup")}
            className={`flex-1 rounded-lg border py-3 text-center font-medium transition ${
              orderType === "pickup"
                ? "border-[#C8102E] bg-[#C8102E] text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Pick-Up
          </button>
        </div>

        {/* Location */}
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">Please select your location</h3>
          
          <button className="mb-3 flex w-full items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            <span className="text-[#C8102E]">☑</span>
            Use Current Location
          </button>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 focus:border-[#C8102E] focus:outline-none"
          >
            <option value="">Select City / Region</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
          </select>

          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 focus:border-[#C8102E] focus:outline-none"
          >
            <option value="">Select Area / Sub Region</option>
            <option value="DHA Phase 1">DHA Phase 1</option>
            <option value="DHA Phase 2">DHA Phase 2</option>
            <option value="DHA Phase 3">DHA Phase 3</option>
            <option value="DHA Phase 4">DHA Phase 4</option>
            <option value="DHA Phase 5">DHA Phase 5</option>
          </select>

          <button className="mt-4 w-full rounded-lg bg-[#C8102E] py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}