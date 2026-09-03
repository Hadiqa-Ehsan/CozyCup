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
  const { data: session, status } = useSession();

  const { items, clearCart } = useCartStore();
  const { branch } = useBranchStore();

  const fulfillmentType =
    branch?.orderType === "delivery" ? "DELIVERY" : "PICKUP";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Rawalpindi");
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
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/checkout");
    }
  }, [status, router]);

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

  if (!mounted || status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F4F6F0]">
        <Loader2 className="h-8 w-8 animate-spin text-[#98AB81]" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

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

  const getItemPrice = (item: any) => {
    const raw = item.price !== undefined && item.price !== null ? item.price : 0;

    if (typeof raw === "string") {
      const parsed = parseFloat(raw.replace(/[^0-9.]/g, ""));
      return isNaN(parsed) ? 0 : parsed;
    }
    return Number(raw) || 0;
  };

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
    if (fulfillmentType === "DELIVERY" && !address) {
      setError("Please provide a delivery address.");
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

      clearCart();
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

            <div className="lg:col-span-4">
              <div className="sticky top-6 overflow-hidden rounded-2xl border border-[#98AB81]/40 bg-white shadow-xs transition-all hover:border-[#98AB81] hover:shadow-lg">
                <div className="border-b border-[#98AB81]/30 bg-[#98AB81] px-6 py-4 text-white">
                  <h2 className="text-base font-bold">Your Cart</h2>
                </div>

                <div className="max-h-[380px] overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => {
                    const imageSrc = item.image || "";
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

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-[#3D2E24]">Enter Delivery Address</h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <Label className="mb-1 block text-xs font-semibold text-[#3D2E24]">Street Address / House No.</Label>
                <Input
                  placeholder="e.g. House 123, Street 4"
                  value={modalAddressInput}
                  onChange={(e) => setModalAddressInput(e.target.value)}
                  className="h-10 text-xs"
                />
              </div>
              <div>
                <Label className="mb-1 block text-xs font-semibold text-[#3D2E24]">Area / Sector</Label>
                <Input
                  placeholder="e.g. DHA Phase 1, Rawalpindi"
                  value={modalRegionInput}
                  onChange={(e) => setModalRegionInput(e.target.value)}
                  className="h-10 text-xs"
                />
              </div>
              <Button
                onClick={handleSaveAddress}
                className="w-full bg-[#98AB81] text-white hover:bg-[#83966c] font-semibold text-xs py-2.5 rounded-xl shadow-md"
              >
                Save Address
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Date & Time Picker Modal */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-[#3D2E24]">Select Delivery Date & Time</h3>
              <button onClick={() => setIsPickerOpen(false)} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#3D2E24]">
                  {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
                </span>
                <div className="flex gap-1">
                  <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100"><ChevronLeft className="h-4 w-4" /></button>
                  <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-gray-500 mb-2">
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
                      className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                        isSelected ? "bg-[#98AB81] text-white font-bold" : "hover:bg-gray-100 text-[#3D2E24]"
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 border-t pt-3">
                <label className="block text-xs font-semibold text-[#3D2E24] mb-1">Time</label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedHours}
                    onChange={(e) => setSelectedHours(e.target.value)}
                    className="rounded-lg border border-gray-300 p-1.5 text-xs bg-white"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                      <option key={h} value={String(h).padStart(2, "0")}>{String(h).padStart(2, "0")}</option>
                    ))}
                  </select>
                  <span>:</span>
                  <select
                    value={selectedMinutes}
                    onChange={(e) => setSelectedMinutes(e.target.value)}
                    className="rounded-lg border border-gray-300 p-1.5 text-xs bg-white"
                  >
                    {["00", "15", "30", "45"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    value={ampm}
                    onChange={(e) => setAmpm(e.target.value as "AM" | "PM")}
                    className="rounded-lg border border-gray-300 p-1.5 text-xs bg-white"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <Button
                onClick={handleConfirmDateTime}
                className="mt-5 w-full bg-[#98AB81] text-white hover:bg-[#83966c] text-xs py-2.5 rounded-xl font-semibold shadow-md"
              >
                Confirm Date & Time
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Code Modal */}
      {isVerificationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
            <h3 className="text-base font-bold text-[#3D2E24] mb-2">Verify Your Order</h3>
            <p className="text-xs text-gray-500 mb-4">Please enter the 4-digit code sent to your phone or email.</p>
            <Input
              type="text"
              maxLength={4}
              placeholder="1234"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="h-12 text-center text-lg tracking-widest mb-4"
            />
            <div className="text-xs text-gray-400 mb-4">
              Resend code in <span className="font-semibold text-[#3D2E24]">{countdown}s</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsVerificationModalOpen(false)}
                className="w-1/2 rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerifyAndPlaceOrder}
                className="w-1/2 bg-[#98AB81] text-white hover:bg-[#83966c] rounded-xl text-xs font-semibold"
              >
                Verify & Place
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Status Modal */}
      {statusModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              {statusModal.success ? (
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <h3 className="text-base font-bold text-[#3D2E24] mb-1">
              {statusModal.success ? "Order Confirmed!" : "Order Failed"}
            </h3>
            <p className="text-xs text-gray-600 mb-4">{statusModal.message}</p>
            {statusModal.success && statusModal.orderId && (
              <p className="text-[11px] text-gray-400 mb-4">Order ID: {statusModal.orderId}</p>
            )}
            <Button
              onClick={() => {
                setStatusModal({ open: false, success: false, message: "" });
                if (statusModal.success) {
                  router.push("/orders");
                }
              }}
              className="w-full bg-[#98AB81] text-white hover:bg-[#83966c] text-xs py-2.5 rounded-xl font-semibold"
            >
              {statusModal.success ? "View Orders" : "Try Again"}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}