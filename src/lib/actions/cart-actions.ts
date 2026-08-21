"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import {
  addItemToCart,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/services/cart-service";

export async function addToCartAction(productId: string, quantity = 1) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const data = await addItemToCart(session.user.id, { productId, quantity });
  revalidatePath("/cart");
  return { data };
}

export async function updateCartItemAction(cartItemId: string, quantity: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const data = await updateCartItemQuantity(session.user.id, cartItemId, { quantity });
  if (!data) return { error: "Cart item not found." };
  revalidatePath("/cart");
  return { data };
}

export async function removeFromCartAction(cartItemId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const data = await removeCartItem(session.user.id, cartItemId);
  if (!data) return { error: "Cart item not found." };
  revalidatePath("/cart");
  return { data };
}