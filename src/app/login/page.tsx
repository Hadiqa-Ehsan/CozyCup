"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { X, Eye, EyeOff, Edit2, ChevronDown, ChevronUp } from "lucide-react";

const fullLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginInput = z.infer<typeof fullLoginSchema>;

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showRegisterMessage, setShowRegisterMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Handled both callbackUrl and next for robust param retrieval
  const next = searchParams.get("callbackUrl") || searchParams.get("next") || "/";

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(fullLoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "hadiqa@cozycup.com",
      password: "had12345",
    },
  });

  async function handleNextStep() {
    setServerError(null);
    setShowRegisterMessage(false);
    const isEmailValid = await trigger("email");
    if (isEmailValid) {
      setStep("password");
    }
  }

  async function onSubmit(data: LoginInput) {
    setServerError(null);
    setShowRegisterMessage(false);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      if (res.error === "CredentialsSignin") {
        setShowRegisterMessage(true);
        setServerError("Account not found. Please register first.");
      } else {
        setServerError("Invalid email or password.");
      }
    } else {
      setSuccess(true);
      setTimeout(() => router.push(next), 1500);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[460px] p-[4px]">
        
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
          
          {/* Close Button with safe window history fallback */}
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 2) {
                router.back();
              } else {
                router.push("/");
              }
            }}
            className="absolute right-4 top-4 rounded-full bg-gray-400/30 p-1.5 text-[#3D2E24] hover:bg-gray-400/50 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>

          <h1 className="mb-6 text-center text-3xl font-extrabold text-[#3D2E24]">
            Sign In
          </h1>

          {success && (
            <div className="mb-4 rounded-xl border border-green-600 bg-green-50 p-3 text-center text-xs font-semibold text-green-700">
              Login successful! Redirecting...
            </div>
          )}

          {showRegisterMessage && (
            <div className="mb-4 rounded-xl border border-[#3D2E24]/20 bg-[#3D2E24]/10 p-3 text-center text-xs font-semibold text-[#3D2E24]">
              Account not found. Please{" "}
              <Link href="/register" className="font-bold underline hover:text-[#98AB81]">
                Register here
              </Link>
            </div>
          )}

          {serverError && !showRegisterMessage && (
            <div className="mb-4 rounded-xl border border-red-500 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {step === "email" && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3D2E24]">
                  Enter your email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-xs text-[#3D2E24] outline-none transition focus:border-[#98AB81] focus:ring-2 focus:ring-[#98AB81]/30 placeholder:text-gray-400"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-500">{errors.email.message}</p>
                )}
              </div>
            )}

            {step === "password" && (
              <>
                <div className="flex items-center justify-between rounded-2xl border border-gray-300 bg-white px-4 py-2.5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400">Account</span>
                    <span className="text-xs font-semibold text-[#3D2E24]">{getValues("email")}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="flex items-center gap-1 text-xs font-semibold text-[#3D2E24] hover:text-[#98AB81] transition"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3D2E24]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 pr-10 text-xs text-[#3D2E24] outline-none transition focus:border-[#98AB81] focus:ring-2 focus:ring-[#98AB81]/30 placeholder:text-gray-400"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#3D2E24] transition"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </>
            )}

            {step === "email" ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="mt-2 w-full rounded-2xl bg-[#98AB81] py-3.5 text-sm font-bold text-[#3D2E24] shadow-md transition hover:bg-[#869970] active:scale-[0.99]"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || success}
                className="mt-2 w-full rounded-2xl bg-[#98AB81] py-3.5 text-sm font-bold text-[#3D2E24] shadow-md transition hover:bg-[#869970] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            )}
          </form>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="flex w-full items-center justify-between text-xs text-gray-500 hover:text-[#3D2E24] transition"
            >
              <span>Need help?</span>
              {isHelpOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {isHelpOpen && (
              <div className="mt-2 flex flex-col gap-2 rounded-xl border border-gray-200 bg-white/80 p-3">
                <Link
                  href="/help/forgot-email"
                  className="text-xs text-gray-600 hover:text-[#3D2E24] hover:underline transition"
                >
                  Forgot email?
                </Link>
                <Link
                  href="/help/update-email"
                  className="text-xs text-gray-600 hover:text-[#3D2E24] hover:underline transition"
                >
                  Update email?
                </Link>
              </div>
            )}
          </div>

          <div className="mt-4 text-center text-xs">
            <Link
              href="/register"
              className="font-semibold text-[#3D2E24] underline hover:text-[#98AB81] transition"
            >
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}