"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, ArrowLeft } from "lucide-react";

export default function UpdateEmailPage() {
  const [mobile, setMobile] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[420px] p-[4px]">
        
        {/* Rotating Neon Border */}
        <div className="absolute -inset-1 rounded-3xl overflow-hidden pointer-events-none">
          <div
            className="absolute -inset-[150%] animate-spin bg-[conic-gradient(from_0deg,#BDD390,#A87A53,#BDD390,#3D2E24,#BDD390)] opacity-100"
            style={{ animationDuration: "5s" }}
          />
        </div>

        {/* Glowing Aura */}
        <div className="absolute -inset-2 rounded-3xl overflow-hidden pointer-events-none blur-md">
          <div
            className="absolute -inset-[150%] animate-spin bg-[conic-gradient(from_0deg,#BDD390,#A87A53,#BDD390,#3D2E24,#BDD390)] opacity-80"
            style={{ animationDuration: "5s" }}
          />
        </div>

        {/* Card Container */}
        <div className="relative w-full rounded-[22px] bg-[#F6F4EB] p-7 shadow-2xl">
          
          {/* Close Button */}
          <button
            onClick={() => router.back()}
            className="absolute right-4 top-4 rounded-full bg-gray-400/30 p-1.5 text-[#3D2E24] hover:bg-gray-400/50 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Go Back Link */}
          <Link
            href="/login"
            className="absolute left-4 top-4 flex items-center gap-1 text-xs text-gray-500 hover:text-[#3D2E24] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>

          {/* Heading */}
          <h1 className="mb-2 text-center text-2xl font-extrabold text-[#3D2E24]">
            Update Email
          </h1>
          <p className="mb-6 text-center text-xs text-gray-500">
            Please enter your registered phone number to update your email
          </p>

          {sent && (
            <div className="mb-4 rounded-xl border border-green-500 bg-green-50 p-3 text-center text-xs font-semibold text-green-700">
              A verification link has been sent to your mobile number!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#3D2E24]">
                Please enter your phone number
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+92"
                required
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-xs text-[#3D2E24] outline-none transition focus:border-[#98AB81] focus:ring-2 focus:ring-[#98AB81]/30 placeholder:text-gray-400"
              />
              <p className="text-[10px] text-gray-400">Example: +92 3XX-XXXXXXXX</p>
            </div>

            <button
              type="submit"
              disabled={!mobile}
              className="mt-2 w-full rounded-2xl bg-[#98AB81] py-3.5 text-sm font-bold text-[#3D2E24] shadow-md transition hover:bg-[#869970] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="text-xs text-gray-500 hover:text-[#3D2E24] hover:underline transition"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}