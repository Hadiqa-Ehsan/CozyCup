import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createOrderFromCart, listUserOrders } from "@/lib/services/order-service";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await listUserOrders(session.user.id);
  return NextResponse.json(orders);
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const order = await createOrderFromCart(session.user.id);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create order.";
    const status = message.includes("Cart is empty") || message.includes("Insufficient stock") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
