import { NextResponse } from "next/server";
import { listBranches } from "@/lib/services/branch-service";

export async function GET() {
  const branches = await listBranches();
  return NextResponse.json(branches);
}
