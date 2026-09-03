"use client";

import Link from "next/link";
import { ArrowLeft, Coffee, Heart, ShieldCheck, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F6F0] text-[#3D2E24] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back to Home Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold bg-[#98AB81]/20 text-[#3D2E24] px-4 py-2 rounded-xl hover:bg-[#98AB81] transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#98AB81] text-[#3D2E24] shadow-md">
            <Coffee className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">About Cozy Cup</h1>
          <p className="text-sm text-[#3D2E24]/70 max-w-lg mx-auto">
            Your neighborhood sanctuary for artisanal coffee, freshly baked goods, and daily essentials.
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#98AB81]/30 shadow-sm space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#98AB81]/20 text-[#3D2E24]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Our Philosophy</h3>
            <p className="text-xs text-[#3D2E24]/70 leading-relaxed">
              We believe every cup of coffee tells a story. From sourcing premium coffee beans to handcrafting pastries daily, quality and warmth are at the core of everything we do.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#98AB81]/30 shadow-sm space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#98AB81]/20 text-[#3D2E24]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Freshly Delivered</h3>
            <p className="text-xs text-[#3D2E24]/70 leading-relaxed">
              Operating across multiple branches in the city, we ensure your orders reach your doorstep hot, fresh, and packaged securely with absolute care.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}