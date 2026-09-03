import Link from "next/link";
import { Coffee, ArrowLeft, Heart, ShieldCheck, Truck, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F3EDD8] p-6 lg:p-12 text-[#2D231F]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2D231F] bg-white/80 px-4 py-2 rounded-2xl shadow-sm hover:bg-white transition-all border border-[#BDD390]/40"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-[#BDD390]/50 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-[#BDD390]/30 pb-6">
            <div className="p-4 bg-[#2D231F] rounded-2xl text-[#BDD390] shadow-md">
              <Coffee className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#2D231F]">About Cozy Cup</h1>
              <p className="text-xs font-semibold text-[#2D231F]/60 mt-1">Brewing perfection & delivering freshness citywide</p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-[#2D231F]/80">
            <p className="text-base font-medium">
              Welcome to <strong className="text-[#2D231F]">Cozy Cup</strong> — your ultimate destination for artisanal coffee, freshly baked pastries, fast food favorites, and daily grocery essentials. Founded with a deep passion for culinary excellence, we strive to bring warmth, comfort, and premium quality directly to your doorstep.
            </p>
            <p>
              Operating across 5 citywide branches in Pakistan, our dedicated team works tirelessly every single day to source the finest local and imported ingredients. Whether you are starting your morning with our signature signature brew or ordering family dinner essentials, Cozy Cup guarantees absolute freshness, unbeatable taste, and reliable doorstep delivery.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-[#F3EDD8]/50 border border-[#BDD390]/40 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#BDD390] flex items-center justify-center text-[#2D231F] font-bold">
                  <Truck className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#2D231F]">Fast Delivery</h3>
                <p className="text-[11px] text-[#2D231F]/70">Hot food and fresh essentials delivered at lightning speed.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F3EDD8]/50 border border-[#BDD390]/40 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#BDD390] flex items-center justify-center text-[#2D231F] font-bold">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#2D231F]">Top Quality</h3>
                <p className="text-[11px] text-[#2D231F]/70">Strict hygiene and supreme ingredient standards guaranteed.</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F3EDD8]/50 border border-[#BDD390]/40 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#BDD390] flex items-center justify-center text-[#2D231F] font-bold">
                  <Heart className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#2D231F]">Made with Love</h3>
                <p className="text-[11px] text-[#2D231F]/70">Crafted by master baristas and bakers dedicated to your smile.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}