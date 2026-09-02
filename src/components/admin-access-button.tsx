"use client";

import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

export function AdminAccessButton() {
  const router = useRouter();

  const handleAdminAccess = () => {
    const authStatus = localStorage.getItem("admin_auth");
    if (authStatus === "true") {
      router.push("/admin");
    } else {
      router.push("/admin/login");
    }
  };

  return (
    <button
      onClick={handleAdminAccess}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#2D231F] px-5 py-3.5 text-xs font-bold text-[#F3EDD8] shadow-2xl hover:bg-[#BDD390] hover:text-[#2D231F] transition-all border border-[#BDD390]/30"
    >
      <LayoutDashboard className="h-4 w-4 text-[#BDD390] group-hover:text-[#2D231F]" />
      Admin Portal
    </button>
  );
}