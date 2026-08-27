"use client";

import { useEffect, useState } from "react";
import { useBranchStore, type FulfillmentType } from "@/store/branch-store";
import { Logo } from "@/components/logo";

type Branch = { id: string; name: string; city: string; area: string };

export function OrderTypeModal() {
  const [mounted, setMounted] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedType, setSelectedType] = useState<FulfillmentType>("DELIVERY");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const { branch, setBranch, setFulfillmentType } = useBranchStore();

  useEffect(() => {
    setMounted(true);
    fetch("/api/branches")
      .then((res) => res.json())
      .then((data) => setBranches(Array.isArray(data) ? data : []))
      .catch(() => setBranches([]));
  }, []);

  // Avoid hydration mismatch: only decide whether to show after mount, once
  // we know the real persisted state.
  if (!mounted || branch) return null;

  function handleSelect() {
    const chosen = branches.find((b) => b.id === selectedAreaId);
    if (!chosen) return;
    setFulfillmentType(selectedType);
    setBranch(chosen);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-lg bg-background p-8 text-center shadow-xl">
        <div className="mb-4 flex justify-center">
          <Logo size={56} />
        </div>
        <h2 className="mb-6 text-lg font-semibold">Select your order type</h2>

        <div className="mb-6 flex justify-center gap-2">
          <button
            onClick={() => setSelectedType("DELIVERY")}
            className={`rounded-md px-6 py-2 text-sm font-semibold ${
              selectedType === "DELIVERY"
                ? "bg-primary text-primary-foreground"
                : "border text-foreground"
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setSelectedType("PICKUP")}
            className={`rounded-md px-6 py-2 text-sm font-semibold ${
              selectedType === "PICKUP"
                ? "bg-primary text-primary-foreground"
                : "border text-foreground"
            }`}
          >
            Pick-Up
          </button>
        </div>

        <p className="mb-2 text-left text-sm font-medium">Please select your location</p>
        <button
          type="button"
          disabled
          title="Not implemented in this demo — TBD"
          className="mb-4 w-full rounded-md border px-4 py-2 text-left text-sm text-muted-foreground opacity-60"
        >
          📍 Use Current Location
        </button>

        <p className="mb-2 text-left text-sm font-medium">Select City / Region</p>
        <select
          value={selectedAreaId}
          onChange={(e) => setSelectedAreaId(e.target.value)}
          className="mb-6 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
        >
          <option value="">Select City / Region</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.area}, {b.city}
            </option>
          ))}
        </select>

        <button
          onClick={handleSelect}
          disabled={!selectedAreaId}
          className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Select
        </button>
      </div>
    </div>
  );
}
