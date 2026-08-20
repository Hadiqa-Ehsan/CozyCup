import { NextResponse } from "next/server";
import { listCategoryTree } from "@/lib/services/category-service";

export async function GET() {
  const categories = await listCategoryTree();
  return NextResponse.json(categories);
}
