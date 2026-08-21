import { NextResponse } from "next/server";
import { listCategoryTree } from "@/lib/services/category-service";

export async function GET() {
  return NextResponse.json(await listCategoryTree());
}