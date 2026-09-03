"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { useBranchStore } from "@/store/branch-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Banknote,
  CreditCard,
  Wallet,
  ChevronRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  Pencil,
  X,
  MapPin,
  CheckCircle2,
  XCircle,
  Loader2,
  Plus,
} from "lucide-react";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const { items, clear } = useCartStore();
  const { branch, fulfillmentType } = useBranchStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "CARD_DELIVERY" | "ONLINE">("COD");

  // Verification Code Modal States
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(60);

  // Status Modal States
  const [statusModal, setStatusModal] = useState<{ open: boolean; success: boolean; message: string; orderId?: string }>({
    open: false,
    success: false,
    message: "",
  });

  // Address Modal States
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [modalAddressInput, setModalAddressInput] = useState("");
  const [modalRegionInput, setModalRegionInput] = useState("DHA Phase 1, Rawalpindi");

  // Date & Time Picker States
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(new Date(2026, 7, 1));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 7, 28));
  const [selectedHours, setSelectedHours] = useState("12");
  const [selectedMinutes, setSelectedMinutes] = useState("50");
  const [ampm, setAmpm] = useState<"AM" | "PM">("PM");
  const [notes, setNotes] = useState("");

  const deliveryFeeCents = fulfillmentType === "DELIVERY" ? 15000 : 0;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (session?.user) {
      if (session.user.name && !name) setName(session.user.name);
      if (session.user.email && !email) setEmail(session.user.email);
    }
  }, [session, name, email]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVerificationModalOpen && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isVerificationModalOpen, countdown]);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-[#3D2E24]/70 text-sm">Your cart is empty — nothing to check out.</p>
        <Button asChild className="mt-4 bg-[#98AB81] text-white hover:bg-[#83966c] transition-all hover:scale-105 shadow-md">
          <Link href="/shop">Browse products</Link>
        </Button>
      </main>
    );
  }

  if (!branch) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-[#3D2E24]/70 text-sm">Please select a branch before checking out.</p>
        <Button asChild className="mt-4 bg-[#98AB81] text-white hover:bg-[#83966c] transition-all hover:scale-105 shadow-md">
          <Link href="/branches">Select branch</Link>
        </Button>
      </main>
    );
  }

  // Safe Price Calculation Helpers
  const getItemPrice = (item: any) => {
    const raw = item.priceCents !== undefined && item.priceCents !== null 
      ? item.priceCents 
      : (item.price !== undefined && item.price !== null ? item.price : 0);
    
    if (typeof raw === "string") {
      const parsed = parseFloat(raw.replace(/[^0-9.]/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    return Number(raw) || 0;
  };

  // Format price in rupees with PKR prefix
  const formatPriceRupees = (amount: number) => {
    return `PKR ${amount.toFixed(2)}`;
  };

  const calculatedTotal = items.reduce((acc, item) => {
    const price = getItemPrice(item);
    const qty = Number(item.quantity) || 1;
    return acc + price * qty;
  }, 0);

  const deliveryFeeRupees = deliveryFeeCents / 100;
  const grandTotal = calculatedTotal + deliveryFeeRupees;

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const daysInMonthCount = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const handleConfirmDateTime = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${months[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
    const formattedTime = `${selectedHours.padStart(2, "0")}:${selectedMinutes.padStart(2, "0")} ${ampm}`;
    setDeliveryTime(`${formattedDate} at ${formattedTime}`);
    setIsPickerOpen(false);
  };

  const handleSaveAddress = () => {
    if (modalAddressInput.trim()) {
      setAddress(modalAddressInput);
      setArea(modalRegionInput);
      setIsAddressModalOpen(false);
    }
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryTime) {
      setError("Please select a delivery time.");
      return;
    }
    setError(null);
    setCountdown(60);
    setIsVerificationModalOpen(true);
  };

  async function handleVerifyAndPlaceOrder() {
    setIsVerificationModalOpen(false);
    setSubmitting(true);

    try {
      const fullAddress = address ? `${address}, ${area}, ${city}`.replace(/^, |, $/g, "") : "";

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone: `+92${phone}`,
          email,
          fulfillmentType,
          branchId: branch!.id,
          address: fulfillmentType === "DELIVERY" ? fullAddress : undefined,
          city: fulfillmentType === "DELIVERY" ? city : undefined,
          area: fulfillmentType === "DELIVERY" ? area : undefined,
          deliveryTime,
          paymentMethod,
          notes,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            quantity: i.quantity || 1,
            unitPriceCents: Math.round(getItemPrice(i) * 100),
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusModal({
          open: true,
          success: false,
          message: data.error?.formErrors?.[0] || data.error || "Failed to place your order. Please try again.",
        });
        return;
      }

      clear();
      setStatusModal({
        open: true,
        success: true,
        message: "Your order has been placed successfully!",
        orderId: data.id,
      });
    } catch {
      setStatusModal({
        open: true,
        success: false,
        message: "Something went wrong. Please check your network connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F6F0] py-8 px-4 sm:px-6 lg:px-8 text-[#3D2E24]">
      <style jsx global>{`
        @keyframes intense-neon-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-neon-glow {
          animation: intense-neon-spin 3s linear infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex items-center justify-between text-xs text-[#3D2E24]/70">
          <div className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#98AB81] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-[#98AB81]">Checkout</span>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 shadow-sm border border-[#98AB81]/30 text-[#3D2E24] hover:bg-[#98AB81] hover:text-white transition-all font-medium"
          >
            <X className="h-3.5 w-3.5" />
            <span>Cancel & Return</span>
          </Link>
        </nav>

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-semibold text-red-700 shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleInitialSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Customer Details Form */}
            <div className="flex flex-col gap-6 lg:col-span-8">
              <div className="rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-xs transition-all hover:border-[#98AB81] hover:shadow-md">
                <div className="mb-4 border-b border-[#98AB81]/20 pb-2">
                  <h3 className="text-sm font-bold text-[#3D2E24]">Customer Details</h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="name" className="mb-2 block text-xs font-semibold text-[#3D2E24]">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 rounded-xl bg-[#F4F6F0]/60 border-[#98AB81]/50 text-sm placeholder:text-[#3D2E24]/40 transition-all hover:bg-white focus-visible:ring-2 focus-visible:ring-[#98AB81]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="mb-2 block text-xs font-semibold text-[#3D2E24]">
                      Mobile Number
                    </Label>
                    <div className="flex items-center overflow-hidden rounded-xl border border-[#98AB81]/50 bg-[#F4F6F0]/60 transition-all hover:bg-white hover:border-[#98AB81] focus-within:ring-2 focus-within:ring-[#98AB81]">
                      <div className="flex items-center gap-1.5 border-r border-[#98AB81]/30 px-3 py-2 text-sm text-[#3D2E24]/70">
                        <span className="text-base">🇵🇰</span>
                        <span className="font-medium">+92</span>
                      </div>
                      <Input
                        id="phone"
                        required
                        type="tel"
                        placeholder="3XX-XXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 border-none bg-transparent shadow-none text-sm placeholder:text-[#3D2E24]/40 focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="mb-2 block text-xs font-semibold text-[#3D2E24]">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 rounded-xl bg-[#F4F6F0]/60 border-[#98AB81]/50 text-sm placeholder:text-[#3D2E24]/40 transition-all hover:bg-white focus-visible:ring-2 focus-visible:ring-[#98AB81]"
                    />
                  </div>
                </div>

                {/* Address Box */}
                <div className="mt-6 rounded-xl border border-[#98AB81]/40 bg-[#98AB81]/10 p-4 transition-all hover:border-[#98AB81] hover:bg-[#98AB81]/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#3D2E24]">Your Address</span>
                    <Button
                      type="button"
                      onClick={() => {
                        setModalAddressInput(address);
                        setIsAddressModalOpen(true);
                      }}
                      className="h-9 rounded-full bg-[#98AB81] px-4 text-xs font-medium text-white transition-all hover:bg-[#83966c] hover:scale-105 shadow-sm"
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" /> {address ? "Edit Address" : "Add new Address"}
                    </Button>
                  </div>

                  {address ? (
                    <div className="mt-3 rounded-lg border border-[#98AB81]/40 bg-white p-3.5 text-xs text-[#3D2E24] shadow-xs hover:border-[#98AB81] transition-all">
                      <p className="font-semibold">{address}</p>
                      {area && <p className="mt-1 text-[#3D2E24]/70">{area}</p>}
                    </div>
                  ) : (
                    <div className="mt-3 rounded-lg border border-dashed border-[#98AB81]/50 bg-white/60 p-4 text-xs text-[#3D2E24]/70">
                      You don&apos;t have a saved address. Click above to enter delivery details.
                    </div>
                  )}
                </div>
              </div>

              {/* Delivery Time */}
              <div className="rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-xs transition-all hover:border-[#98AB81] hover:shadow-md flex flex-col gap-5">
                <div>
                  <Label htmlFor="deliveryTime" className="mb-2 block text-xs font-semibold text-[#3D2E24]">
                    Choose Delivery Time
                  </Label>
                  <div className="relative">
                    <Input
                      id="deliveryTime"
                      readOnly
                      onClick={() => setIsPickerOpen(true)}
                      placeholder="Click to select date & time"
                      value={deliveryTime}
                      className="h-11 cursor-pointer rounded-xl bg-[#F4F6F0]/60 border-[#98AB81]/50 text-sm placeholder:text-[#3D2E24]/40 pr-10 transition-all hover:border-[#98AB81] hover:bg-white focus-visible:ring-2 focus-visible:ring-[#98AB81]"
                    />
                    <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-[#98AB81] pointer-events-none" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes" className="mb-2 block text-xs font-semibold text-[#3D2E24]">
                    Special Instructions ( Optional )
                  </Label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Add any comment, e.g. about allergies, or delivery instructions here."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-[#98AB81]/50 bg-[#F4F6F0]/60 p-3 text-sm text-[#3D2E24] placeholder:text-[#3D2E24]/40 outline-none transition-all hover:bg-white hover:border-[#98AB81] focus:ring-2 focus:ring-[#98AB81]"
                  />
                </div>
              </div>

              {/* Payment Option */}
              <div className="rounded-2xl border border-[#98AB81]/40 bg-white p-6 shadow-xs transition-all hover:border-[#98AB81] hover:shadow-md">
                <Label className="mb-3 block text-xs font-semibold text-[#3D2E24]">Select Payment Method</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-xs font-medium transition-all ${
                      paymentMethod === "COD"
                        ? "border-[#98AB81] bg-[#98AB81]/20 text-[#3D2E24] ring-2 ring-[#98AB81] shadow-sm scale-[1.02]"
                        : "border-[#98AB81]/30 bg-white text-[#3D2E24]/70 hover:border-[#98AB81] hover:bg-[#F4F6F0] hover:text-[#3D2E24]"
                    }`}
                  >
                    <Banknote className="h-4 w-4 text-[#98AB81]" />
                    <span>Cash On Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CARD_DELIVERY")}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-xs font-medium transition-all ${
                      paymentMethod === "CARD_DELIVERY"
                        ? "border-[#98AB81] bg-[#98AB81]/20 text-[#3D2E24] ring-2 ring-[#98AB81] shadow-sm scale-[1.02]"
                        : "border-[#98AB81]/30 bg-white text-[#3D2E24]/70 hover:border-[#98AB81] hover:bg-[#F4F6F0] hover:text-[#3D2E24]"
                    }`}
                  >
                    <Wallet className="h-4 w-4 text-[#3D2E24]" />
                    <span>Card on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("ONLINE")}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-xs font-medium transition-all ${
                      paymentMethod === "ONLINE"
                        ? "border-[#98AB81] bg-[#98AB81]/20 text-[#3D2E24] ring-2 ring-[#98AB81] shadow-sm scale-[1.02]"
                        : "border-[#98AB81]/30 bg-white text-[#3D2E24]/70 hover:border-[#98AB81] hover:bg-[#F4F6F0] hover:text-[#3D2E24]"
                    }`}
                  >
                    <CreditCard className="h-4 w-4 text-[#3D2E24]" />
                    <span>Credit/Debit Card</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Cart Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-6 overflow-hidden rounded-2xl border border-[#98AB81]/40 bg-white shadow-xs transition-all hover:border-[#98AB81] hover:shadow-lg">
                <div className="border-b border-[#98AB81]/30 bg-[#98AB81] px-6 py-4 text-white">
                  <h2 className="text-base font-bold">Your Cart</h2>
                </div>

                <div className="max-h-[380px] overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => {
                    const imageSrc = item.image || item.imageUrl || "";
                    const price = getItemPrice(item);
                    const quantity = Number(item.quantity) || 1;
                    const itemTotal = price * quantity;

                    return (
                      <div key={item.productId} className="flex gap-3 border-b border-[#98AB81]/20 pb-4 last:border-none hover:bg-[#F4F6F0]/50 p-2 rounded-xl transition-all">
                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-[#98AB81]/30 bg-[#F4F6F0]">
                          {imageSrc ? (
                            <Image
                              src={imageSrc}
                              alt={item.name}
                              fill
                              unoptimized
                              className="object-cover transition-transform hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-[#3D2E24]/40 font-medium">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <h4 className="text-xs font-bold text-[#3D2E24] line-clamp-1">{item.name}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-md border border-dashed border-[#98AB81] bg-[#98AB81]/10 px-1.5 text-[11px] font-semibold text-[#3D2E24]">
                              {quantity}
                            </span>
                            <span className="text-xs font-bold text-[#3D2E24]">{formatPriceRupees(itemTotal)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-[#98AB81]/30 bg-[#F4F6F0] p-6">
                  <div className="space-y-2 text-xs text-[#3D2E24]/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#3D2E24]">{formatPriceRupees(calculatedTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span className="font-medium text-[#3D2E24]">{formatPriceRupees(deliveryFeeRupees)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#98AB81]/30 pt-3 text-sm font-bold text-[#3D2E24]">
                    <span>Grand total</span>
                    <span className="text-base text-[#3D2E24]">{formatPriceRupees(grandTotal)}</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 w-full rounded-xl bg-[#98AB81] py-6 text-base font-extrabold text-white shadow-lg transition-all duration-300 hover:bg-[#83966c] hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 border border-[#83966c]/30 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <span>Place Order</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* --- EMAIL VERIFICATION CODE MODAL --- */}
      {isVerificationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-[440px] rounded-2xl bg-white p-7 shadow-2xl transition-all">
            <button
              type="button"
              onClick={() => setIsVerificationModalOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white hover:bg-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-[#3D2E24] pr-6 leading-snug">
              Enter the code received on your email address ({email || "hadiqaehsan@gmail.com"}).
            </h3>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#3D2E24]">Code</label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="Enter Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-[#3D2E24] placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#98AB81] pr-14"
                  />
                  <span className="absolute right-4 text-sm font-medium text-gray-500">
                    ({countdown.toString().padStart(2, "0")})
                  </span>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleVerifyAndPlaceOrder}
                className="w-full rounded-xl bg-[#98AB81] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#83966c] hover:shadow-md active:scale-95"
              >
                Verify & Place Order
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* --- CONFIRMATION STATUS POPUP MODAL --- */}
      {statusModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-2xl text-center transition-all animate-in fade-in zoom-in-95">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F4F6F0]">
              {statusModal.success ? (
                <CheckCircle2 className="h-10 w-10 text-[#98AB81]" />
              ) : (
                <XCircle className="h-10 w-10 text-red-500" />
              )}
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-[#3D2E24]">
              {statusModal.success ? "Order Confirmed!" : "Order Placement Failed"}
            </h3>

            <p className="mt-2 text-xs text-[#3D2E24]/70 leading-relaxed">{statusModal.message}</p>

            <div className="mt-6">
              {statusModal.success ? (
                <Button
                  onClick={() => {
                    setStatusModal({ ...statusModal, open: false });
                    router.push(`/order-confirmation/${statusModal.orderId}`);
                  }}
                  className="w-full rounded-xl bg-[#98AB81] py-3 text-sm font-bold text-white transition hover:bg-[#83966c]"
                >
                  View Order Details
                </Button>
              ) : (
                <Button
                  onClick={() => setStatusModal({ ...statusModal, open: false })}
                  className="w-full rounded-xl bg-[#3D2E24] py-3 text-sm font-bold text-white transition hover:bg-[#2A2018]"
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- ADD NEW ADDRESS MODAL --- */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl transition-all">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-lg font-bold text-[#3D2E24]">Add new Address</h2>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400/80 text-white hover:bg-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3D2E24]/80">
                  Address (with post code if applicable)
                </label>
                <Input
                  type="text"
                  placeholder="Enter your complete street address"
                  value={modalAddressInput}
                  onChange={(e) => setModalAddressInput(e.target.value)}
                  className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-[#3D2E24] placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#98AB81]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3D2E24]/80">Region</label>
                <Input
                  type="text"
                  placeholder="DHA Phase 1, Rawalpindi"
                  value={modalRegionInput}
                  onChange={(e) => setModalRegionInput(e.target.value)}
                  className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-[#3D2E24] placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#98AB81]"
                />
                <p className="mt-2 text-[11px] text-gray-500">
                  To change your area/region, please do it from top header location button.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#98AB81]/40 bg-[#F4F6F0] p-4 text-[#3D2E24]">
                <MapPin className="h-6 w-6 text-[#98AB81] flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold">{modalRegionInput || "Delivery Location"}</p>
                  <p className="text-[#3D2E24]/70">{modalAddressInput || "Street address will be pinned here"}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveAddress}
                disabled={!modalAddressInput.trim()}
                className="mt-2 w-full rounded-xl bg-[#98AB81] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#83966c] hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DATE & TIME PICKER MODAL */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative p-[4px] overflow-hidden rounded-[22px] shadow-[0_0_30px_rgba(152,171,129,0.8)] max-w-[360px] w-full">
            <div className="absolute inset-[-150%] animate-neon-glow bg-[conic-gradient(from_0deg,#98AB81_0%,#ffffff_25%,#3D2E24_50%,#98AB81_75%,#ffffff_100%)] filter blur-[2px]" />

            <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-inner">
              <div className="bg-[#98AB81] p-5 text-white">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-white/90 font-bold">
                  <span>SELECT DATE & TIME</span>
                  <Pencil className="h-4 w-4 cursor-pointer hover:opacity-80 transition-opacity" />
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-white/80">{selectedDate.getFullYear()}</div>
                    <div className="text-2xl font-extrabold whitespace-nowrap">
                      {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <div className="flex items-center gap-1 text-lg font-bold">
                      <select 
                        value={selectedHours} 
                        onChange={(e) => setSelectedHours(e.target.value)}
                        aria-label="Select hour"
                        className="bg-transparent text-white outline-none cursor-pointer [&>option]:text-[#3D2E24]"
                      >
                        {Array.from({ length: 12 }, (_, i) => {
                          const hour = (i + 1).toString();
                          return <option key={hour} value={hour}>{hour.padStart(2, "0")}</option>;
                        })}
                      </select>
                      <span>:</span>
                      <select 
                        value={selectedMinutes} 
                        onChange={(e) => setSelectedMinutes(e.target.value)}
                        aria-label="Select minute"
                        className="bg-transparent text-white outline-none cursor-pointer [&>option]:text-[#3D2E24]"
                      >
                        {["00", "15", "30", "45"].map((min) => (
                          <option key={min} value={min}>{min}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex rounded-lg bg-black/20 p-0.5 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setAmpm("AM")}
                        className={`px-2 py-1 rounded-md transition-all ${ampm === "AM" ? "bg-white text-[#3D2E24]" : "text-white"}`}
                      >
                        AM
                      </button>
                      <button
                        type="button"
                        onClick={() => setAmpm("PM")}
                        className={`px-2 py-1 rounded-md transition-all ${ampm === "PM" ? "bg-white text-[#3D2E24]" : "text-white"}`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Grid Body */}
              <div className="p-5 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-[#3D2E24]">
                    {viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-[#F4F6F0] text-[#3D2E24]">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-[#F4F6F0] text-[#3D2E24]">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#3D2E24]/60 mb-2">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonthCount }).map((_, i) => {
                    const dayNum = i + 1;
                    const isSelected =
                      selectedDate.getDate() === dayNum &&
                      selectedDate.getMonth() === viewDate.getMonth() &&
                      selectedDate.getFullYear() === viewDate.getFullYear();

                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNum))}
                        className={`h-9 w-9 mx-auto flex items-center justify-center rounded-xl font-medium transition-all ${
                          isSelected
                            ? "bg-[#98AB81] text-white shadow-md scale-105 font-bold"
                            : "text-[#3D2E24] hover:bg-[#F4F6F0]"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsPickerOpen(false)}
                    className="text-xs text-[#3D2E24]/70 hover:bg-[#F4F6F0]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleConfirmDateTime}
                    className="rounded-xl bg-[#98AB81] px-5 py-2 text-xs font-bold text-white hover:bg-[#83966c]"
                  >
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}