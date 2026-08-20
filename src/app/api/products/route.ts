import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { listProducts, createProduct } from "@/lib/services/product-service";
import { productSchema } from "@/lib/validations/product";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const products = await listProducts({
    categorySlug: searchParams.get("category") ?? undefined,
    query: searchParams.get("q") ?? undefined,
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = productSchema.parse(body);
    const product = await createProduct(input);

    // Bust the cached product listing/detail pages the moment stock/price changes,
    // per the doc's caching strategy (Next.js Data Cache + revalidateTag).
    revalidateTag("products");

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
