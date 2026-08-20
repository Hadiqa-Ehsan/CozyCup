import { prisma } from "@/lib/prisma";

// NOTE: Branch data is SAMPLE/representative — see prisma/seed.ts for details.
export async function listBranches() {
  return prisma.branch.findMany({
    where: { isActive: true },
    orderBy: { area: "asc" },
  });
}

export async function getBranchById(id: string) {
  return prisma.branch.findUnique({ where: { id } });
}
