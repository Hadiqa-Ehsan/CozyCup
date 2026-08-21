import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/lib/services/product-service";
import { productUpdateSchema } from "@/lib/validations/product";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const product = await getProductById((await params).id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const role = ((await auth())?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const product = await updateProduct((await params).id, productUpdateSchema.parse(await request.json()));
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.flatten() }, { status: 400 });
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const role = ((await auth())?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    await deleteProduct((await params).id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}