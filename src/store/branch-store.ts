import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Branch {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  orderType?: "delivery" | "pickup";
}

interface BranchStore {
  branch: Branch | null;
  setBranch: (branch: Branch) => void;
  setOrderType: (orderType: "delivery" | "pickup") => void;
  clearBranch: () => void;
}

export const useBranchStore = create<BranchStore>()(
  persist(
    (set, get) => ({
      branch: {
        id: "default",
        name: "Select Location",
        city: "",
        area: "",
        address: "",
        orderType: "pickup",
      },
      setBranch: (branch) => {
        console.log("Setting branch:", branch);
        set({ branch });
      },
      setOrderType: (orderType) => {
        const currentBranch = get().branch;
        if (currentBranch) {
          set({ branch: { ...currentBranch, orderType } });
        }
      },
      clearBranch: () => set({ branch: null }),
    }),
    {
      name: "branch-storage",
    }
  )
);