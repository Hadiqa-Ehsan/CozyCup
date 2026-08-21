import { prisma } from "@/lib/prisma";

export async function listUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
}

export async function getUserOrderById(userId: string, orderId: string) {
  return prisma.order.findFirst({
    where: { id: orderId, userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
}

export async function createOrderFromCart(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  let totalCents = 0;
  const orderItemsData: Array<{ productId: string; quantity: number; unitPriceCents: number }> = [];

  for (const item of cart.items) {
    if (!item.product) {
      throw new Error(`Product ${item.productId} not found.`);
    }

    if (item.quantity > item.product.stock) {
      throw new Error(`Insufficient stock for ${item.product.name}.`);
    }

    totalCents += item.product.priceCents * item.quantity;
    orderItemsData.push({
      productId: item.productId,
      quantity: item.quantity,
      unitPriceCents: item.product.priceCents,
    });
  }

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId,
        totalCents,
        currency: "USD",
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return created;
  });

  return order;
}

export async function attachStripeSession(orderId: string, stripeSessionId: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { stripeSessionId },
  });
}

export async function markOrderPaid(orderId: string) {
  return prisma.order.updateMany({
    where: { id: orderId, status: "PENDING" },
    data: { status: "PAID" },
  });
}

export async function cancelPendingOrder(orderId: string) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findFirst({
      where: { id: orderId, status: "PENDING" },
      include: { items: true },
    });

    if (!order) return false;

    await tx.order.update({
      where: { id: order.id },
      data: { status: "CANCELLED" },
    });

    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }

    return true;
  });
}
