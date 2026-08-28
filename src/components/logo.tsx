import Link from "next/link";

export function Logo({ size = 40, light = false }: { size?: number; light?: boolean }) {
  return (
    <Link href="/" className="flex-shrink-0">
      <div className="flex items-center gap-2">
        <div 
          className="flex items-center justify-center rounded-full bg-[#98AB81] text-[#3D2E24] shadow-sm"
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 fill-current">
            <path d="M50,0 A50,50 0 1,0 100,50 A50,50 0 0,0 50,0 Z M50,90 A40,40 0 1,1 90,50 A40,40 0 0,1 50,90 Z" />
            <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="38" fontWeight="bold" fontFamily="serif" fontStyle="italic">CC</text>
          </svg>
        </div>
        <span className={`hidden text-xl font-bold sm:block tracking-tight ${light ? "text-[#F5F5EC]" : "text-[#3D2E24]"}`}>
          Cozy Cup
        </span>
      </div>
    </Link>
  );
}