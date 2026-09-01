import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  trend: "up" | "down";
}

export function StatsCard({ title, value, icon: Icon, change, trend }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-sm transition-all hover:border-[#98AB81] hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#3D2E24]/70">{title}</span>
        <div className="rounded-full bg-[#98AB81]/20 p-2">
          <Icon className="h-5 w-5 text-[#98AB81]" />
        </div>
      </div>
      <p className="mt-2 text-2xl font-bold text-[#3D2E24]">{value}</p>
      <div className="mt-2 flex items-center gap-1 text-xs font-semibold">
        <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
          {change}
        </span>
        <span className="text-[#3D2E24]/60">from last month</span>
      </div>
    </div>
  );
}