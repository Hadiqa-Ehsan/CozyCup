"use client";

import { useRouter } from "next/navigation";
import { useBranchStore, type FulfillmentType } from "@/store/branch-store";
import { Button } from "@/components/ui/button";

type Branch = { id: string; name: string; city: string; area: string; address: string; phone: string | null };

export function BranchList({ branches }: { branches: Branch[] }) {
  const router = useRouter();
  const { branch: selected, fulfillmentType, setBranch, setFulfillmentType } = useBranchStore();

  function choose(branch: Branch) {
    setBranch({ id: branch.id, name: branch.name, city: branch.city, area: branch.area });
    router.push("/shop");
  }

  return (
    <div>
      <div className="mb-6 flex gap-3">
        {(["DELIVERY", "PICKUP"] as FulfillmentType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFulfillmentType(type)}
            className={`rounded-md border px-4 py-2 text-sm ${
              fulfillmentType === type ? "border-primary bg-accent font-medium" : ""
            }`}
          >
            {type === "DELIVERY" ? "Delivery" : "Pickup"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {branches.map((branch) => (
          <div key={branch.id} className="flex flex-col justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{branch.name}</p>
              <p className="text-sm text-muted-foreground">{branch.address}</p>
              {branch.phone && <p className="mt-1 text-xs text-muted-foreground">{branch.phone}</p>}
            </div>
            <Button
              size="sm"
              className="mt-4"
              variant={selected?.id === branch.id ? "default" : "outline"}
              onClick={() => choose(branch)}
            >
              {selected?.id === branch.id ? "Selected ✓" : "Select this branch"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
