import { NextRequest, NextResponse } from "next/server";
import { listProductsByCategoryId } from "@/lib/services/product-service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const products = await listProductsByCategoryId((await params).id);
  if (products === null) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  return NextResponse.json(products);
}