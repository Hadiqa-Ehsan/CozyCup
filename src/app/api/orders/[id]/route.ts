import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserOrderById } from "@/lib/services/order-service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await getUserOrderById(session.user.id, (await params).id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
