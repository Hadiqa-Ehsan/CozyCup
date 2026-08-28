"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, Calendar } from "lucide-react";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  gender: z.string().optional(),
  dob: z.string().optional(),
  mobile: z.string().min(10, "Enter a valid mobile number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterInput) {
    setServerError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.password,
          phone: data.mobile,
          gender: data.gender,
          dob: data.dob,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        const error = await res.json();
        setServerError(error.message || "Registration failed. Please try again.");
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      {/* Outer Wrapper - Overflow Visible to Let Neon Glow Out */}
      <div className="relative w-full max-w-[460px] p-[4px]">
        
        {/* 1. Bright Inner Rotating Neon Line */}
        <div className="absolute -inset-1 rounded-3xl overflow-hidden pointer-events-none">
          <div
            className="absolute -inset-[150%] animate-spin bg-[conic-gradient(from_0deg,#BDD390,#A87A53,#BDD390,#3D2E24,#BDD390)] opacity-100"
            style={{ animationDuration: "5s" }}
          />
        </div>

        {/* 2. Soft Outer Glowing Aura */}
        <div className="absolute -inset-2 rounded-3xl overflow-hidden pointer-events-none blur-md">
          <div
            className="absolute -inset-[150%] animate-spin bg-[conic-gradient(from_0deg,#BDD390,#A87A53,#BDD390,#3D2E24,#BDD390)] opacity-80"
            style={{ animationDuration: "5s" }}
          />
        </div>

        {/* Inner Card Container */}
        <div className="relative w-full rounded-[22px] bg-[#F6F4EB] p-7 shadow-2xl">
          
          {/* Floating Close Button */}
          <button
            onClick={() => router.back()}
            className="absolute right-4 top-4 rounded-full bg-gray-400/30 p-1.5 text-[#3D2E24] hover:bg-gray-400/50 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>

          {/* Heading */}
          <h1 className="mb-6 text-center text-3xl font-extrabold text-[#3D2E24]">
            Register
          </h1>

          {/* Alerts */}
          {success && (
            <div className="mb-4 rounded-xl border border-green-600 bg-green-50 p-3 text-center text-xs font-semibold text-green-700">
              Registration successful! Redirecting to login...
            </div>
          )}

          {serverError && (
            <div className="mb-4 rounded-xl border border-red-500 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#3D2E24]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-xs text-[#3D2E24] outline-none transition focus:border-[#98AB81] focus:ring-2 focus:ring-[#98AB81]/30 placeholder:text-gray-400"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#3D2E24]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="hadiqaehsan@gmail.com"
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-xs text-[#3D2E24] outline-none transition focus:border-[#98AB81] focus:ring-2 focus:ring-[#98AB81]/30 placeholder:text-gray-400"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Two-Column Row: Gender & Date Of Birth */}
            <div className="grid grid-cols-2 gap-3">
              {/* Gender */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3D2E24]">
                  Gender <span className="font-normal text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-2xl border border-gray-300 bg-white px-4 py-3 text-xs text-[#3D2E24] outline-none transition focus:border-[#98AB81] focus:ring-2 focus:ring-[#98AB81]/30"
                    {...register("gender")}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3D2E24]">
                  Date Of Birth <span className="font-normal text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-xs text-[#3D2E24] outline-none transition focus:border-[#98AB81] focus:ring-2 focus:ring-[#98AB81]/30"
                    {...register("dob")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#3D2E24]">
                Mobile Number
              </label>
              <div className="flex rounded-2xl border border-gray-300 bg-white overflow-hidden focus-within:border-[#98AB81] focus-within:ring-2 focus-within:ring-[#98AB81]/30">
                <div className="flex items-center gap-1 bg-gray-50 px-3 border-r border-gray-200 text-xs font-medium text-[#3D2E24]">
                  🇵🇰 <span className="text-gray-400">▼</span>
                </div>
                <input
                  type="tel"
                  placeholder="+92"
                  className="w-full bg-white px-3 py-3 text-xs text-[#3D2E24] outline-none placeholder:text-gray-400"
                  {...register("mobile")}
                />
              </div>
              {errors.mobile && (
                <p className="text-[11px] text-red-500">{errors.mobile.message}</p>
              )}
              <p className="text-[10px] text-gray-400 pt-0.5">Example: +92 3XX-XXXXXXX</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="mt-2 w-full rounded-2xl bg-[#98AB81] py-3.5 text-sm font-bold text-[#3D2E24] shadow-md transition hover:bg-[#869970] active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Login Redirection Link */}
          <div className="mt-5 text-center">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#3D2E24] underline hover:text-[#98AB81] transition"
            >
              Already have an Account?
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}