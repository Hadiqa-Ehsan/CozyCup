import { prisma } from "@/lib/prisma";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/order";

// Creates an order + its line items in one transaction, then decrements
// stock for each product. Keeps this logic out of the Route Handler per the
// doc's /lib/services pattern.
export async function createOrder(userId: string, input: CheckoutInput) {
  const data = checkoutSchema.parse(input);
  const totalCents = data.items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return prisma.$transaction(async (tx: any) => {
    const order = await tx.order.create({
      data: {
        userId,
        fulfillmentType: data.fulfillmentType,
        branchId: data.branchId,
        customerName: data.customerName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        area: data.area,
        notes: data.notes,
        totalCents,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
          })),
        },
      },
      include: { items: true, branch: true },
    });

    for (const item of data.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return order;
  });
}

export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, branch: true },
  });
}

export async function listOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true, branch: true },
    orderBy: { createdAt: "desc" },
  });
}
