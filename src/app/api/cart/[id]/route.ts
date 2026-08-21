import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { removeCartItem, updateCartItemQuantity } from "@/lib/services/cart-service";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const item = await updateCartItemQuantity(session.user.id, id, await request.json());
    if (!item) {
      return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not update cart item." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const removed = await removeCartItem(session.user.id, id);
  if (!removed) {
    return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}