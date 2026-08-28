import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface AddItemPayload {
  id?: string;
  productId?: string;
  name: string;
  price?: number;
  priceCents?: number;
  image?: string;
  imageUrl?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: AddItemPayload) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        const targetId = product.id || product.productId;
        if (!targetId) return;

        const existingItem = items.find((item) => item.productId === targetId);

        // Calculate price in rupees from either price or priceCents
        const rawPrice = product.price ?? (product.priceCents ? product.priceCents / 100 : 0);
        const image = product.image || product.imageUrl || "";

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.productId === targetId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ items: updatedItems });
        } else {
          const newItem: CartItem = {
            id: targetId,
            productId: targetId,
            name: product.name || "Product",
            price: rawPrice,
            quantity: 1,
            image: image,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price || 0) * item.quantity;
        }, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);