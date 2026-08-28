"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = totalPrice();
  const itemCount = totalItems();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Your Cart</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-12 shadow-sm transition-all duration-300">
          <div className="mb-4 rounded-full bg-gray-100 p-4">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-700">Your cart is empty</p>
          <p className="mt-1 text-sm text-gray-500">Looks like you haven't added anything yet</p>
          <Button asChild className="mt-6 rounded-xl bg-[#C8102E] px-8 py-2.5 hover:bg-red-700 transition-all duration-300">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-4 transition-all duration-300 hover:bg-gray-50 ${
                  index !== items.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Product Image */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No img
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Rs. {item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Price & Remove */}
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-1 text-sm text-gray-400 transition hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">
                Total ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
              <span className="text-2xl font-bold text-[#C8102E]">
                Rs. {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <Button asChild variant="outline" className="flex-1 rounded-xl border-gray-300 hover:bg-gray-50 transition-all duration-300">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button asChild className="flex-1 rounded-xl bg-[#C8102E] px-8 py-2.5 hover:bg-red-700 transition-all duration-300">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}