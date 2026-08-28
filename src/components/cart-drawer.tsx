"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  if (!open) return null;

  const subtotal = totalPrice();
  const itemCount = totalItems();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="flex w-screen max-w-md flex-col overflow-hidden rounded-l-3xl bg-[#F3EDD8] shadow-2xl transition-all">
          
          <div className="flex items-center justify-between border-b border-[#D4C9B8] bg-[#F3EDD8] px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#242222]" />
              <h2 className="text-lg font-bold text-[#242222]">Your Cart</h2>
              {itemCount > 0 && (
                <span className="ml-1 rounded-full bg-[#242222] px-2 py-0.5 text-xs font-bold text-[#BDD390]">
                  {itemCount}
                </span>
              )}
            </div>
            <button onClick={onClose} className="rounded-full p-1.5 text-[#242222] hover:bg-[#BDD390] hover:text-[#242222] transition">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 text-[#D4C9B8]">
                  <ShoppingBag className="mx-auto h-16 w-16 stroke-[1]" />
                </div>
                <p className="text-base font-semibold text-[#242222]">Your cart is empty</p>
                <button onClick={onClose} className="mt-4 rounded-xl bg-[#BDD390] px-6 py-2 text-sm font-bold text-[#242222] transition hover:bg-[#A9C07A]">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl border border-[#D4C9B8] bg-[#F3EDD8] p-3 transition hover:border-[#242222]">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-[#D4C9B8] bg-[#F3EDD8]">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#E8E3CC] text-xs text-[#242222]/50">No img</div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#242222] line-clamp-2">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-[#242222] hover:text-[#A87A53] transition">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-1 text-sm font-bold text-[#242222]">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D4C9B8] bg-[#F3EDD8] text-[#242222] hover:border-[#242222] hover:text-[#242222] transition"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-[#242222]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D4C9B8] bg-[#F3EDD8] text-[#242222] hover:border-[#242222] hover:text-[#242222] transition"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-[#D4C9B8] bg-[#F3EDD8] p-4">
              <div className="mb-3 flex items-center justify-between text-base font-bold text-[#242222]">
                <span>Subtotal</span>
                <span className="text-[#242222]">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <Link href="/checkout" onClick={onClose} className="flex w-full items-center justify-center rounded-xl bg-[#BDD390] py-3 text-sm font-bold text-[#242222] transition hover:bg-[#A9C07A] shadow-sm">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}