import { prisma } from "@/lib/prisma";
import {
  addToCartSchema,
  updateCartItemSchema,
  type AddToCartInput,
  type UpdateCartItemInput,
} from "@/lib/validations/cart";

export async function getOrCreateCart(userId: string) {
  return prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
    include: {
      items: {
        include: { product: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export async function addItemToCart(userId: string, input: AddToCartInput) {
  const data = addToCartSchema.parse(input);
  const product = await prisma.product.findUnique({ where: { id: data.productId } });
  if (!product) return { error: "Product not found." } as const;
  if (product.stock < data.quantity) return { error: "Insufficient stock." } as const;

  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId: data.productId } },
  });

  if (existing) {
    if (product.stock < existing.quantity + data.quantity) {
      return { error: "Insufficient stock." } as const;
    }
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + data.quantity },
      include: { product: true },
    });
  }

  return prisma.cartItem.create({
    data: { cartId: cart.id, productId: data.productId, quantity: data.quantity },
    include: { product: true },
  });
}

async function findOwnedCartItem(userId: string, cartItemId: string) {
  const item = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    include: { cart: true },
  });
  return item?.cart.userId === userId ? item : null;
}

export async function updateCartItemQuantity(
  userId: string,
  cartItemId: string,
  input: UpdateCartItemInput
) {
  const data = updateCartItemSchema.parse(input);
  if (!(await findOwnedCartItem(userId, cartItemId))) return null;

  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: data.quantity },
    include: { product: true },
  });
}

export async function removeCartItem(userId: string, cartItemId: string) {
  if (!(await findOwnedCartItem(userId, cartItemId))) return null;
  return prisma.cartItem.delete({ where: { id: cartItemId } });
}