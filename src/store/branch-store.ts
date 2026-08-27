import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SelectedBranch = {
  id: string;
  name: string;
  city: string;
  area: string;
};

export type FulfillmentType = "DELIVERY" | "PICKUP";

type BranchState = {
  branch: SelectedBranch | null;
  fulfillmentType: FulfillmentType;
  setBranch: (branch: SelectedBranch) => void;
  setFulfillmentType: (type: FulfillmentType) => void;
  clearBranch: () => void;
};

export const useBranchStore = create<BranchState>()(
  persist(
    (set) => ({
      branch: null,
      fulfillmentType: "DELIVERY",
      setBranch: (branch) => set({ branch }),
      setFulfillmentType: (fulfillmentType) => set({ fulfillmentType }),
      clearBranch: () => set({ branch: null }),
    }),
    { name: "jalal-sons-branch" }
  )
);
