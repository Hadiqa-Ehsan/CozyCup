"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Console mein path print karega taake humein confirm pata chale
  console.log("Current Pathname:", pathname);

  const cleanPath = pathname?.replace(/\/$/, "") || "";
  const isPolicyPage = cleanPath === "/terms" || cleanPath === "/privacy" || cleanPath === "/privacy-policy";

  return (
    <>
      {!isPolicyPage && <Header />}
      <div className="flex-1">{children}</div>
      {!isPolicyPage && <Footer />}
    </>
  );
}