import { listBranches } from "@/lib/services/branch-service";
import { BranchList } from "@/components/branch-list";

export const revalidate = 300;

export default async function BranchesPage() {
  const branches = await listBranches();

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-semibold">Select a Branch</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Choose delivery or pickup and pick your nearest branch. Branch list is sample data — see footer note.
      </p>
      <BranchList branches={branches} />
    </main>
  );
}
