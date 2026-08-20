"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBranchStore } from "@/store/branch-store";
import { Button } from "@/components/ui/button";

export function BranchSelectorButton() {
  const [mounted, setMounted] = useState(false);
  const branch = useBranchStore((s) => s.branch);
  const router = useRouter();

  // Avoid hydration mismatch: persisted store only reflects real state after mount.
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => router.push("/branches")}
      className="flex flex-col items-start rounded-md border border-input px-3 py-1.5 text-left text-xs hover:bg-accent"
    >
      <span className="text-muted-foreground">Deliver to</span>
      <span className="font-medium">
        {mounted && branch ? `${branch.area}, ${branch.city}` : "Select branch"}
      </span>
    </button>
  );
}

export function BranchRequiredNotice() {
  const [mounted, setMounted] = useState(false);
  const branch = useBranchStore((s) => s.branch);
  useEffect(() => setMounted(true), []);

  if (!mounted || branch) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm">
      <span>Select your branch to see accurate availability and delivery.</span>
      <Button asChild size="sm" variant="outline">
        <Link href="/branches">Select branch</Link>
      </Button>
    </div>
  );
}
