export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Terms &amp; Conditions</h1>

      <div className="flex flex-col gap-4 text-sm text-muted-foreground">
        <p>
          This is a sample/placeholder terms page for a student portfolio clone project — not a
          real legal agreement. The real Jalal Sons terms could not be verified from the live site
          for this project — TBD if real terms are ever needed.
        </p>

        <div>
          <h2 className="mb-1 font-medium text-foreground">Orders</h2>
          <p>
            Orders placed through this demo are for demonstration purposes only. Payment method is
            Cash on Delivery only, matching the real site&apos;s behavior — no online payments are
            processed here.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-medium text-foreground">Pricing &amp; availability</h2>
          <p>
            Product prices, stock, and branch information in this demo are sample data and do not
            reflect real, current pricing or availability.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-medium text-foreground">Account</h2>
          <p>You&apos;re responsible for keeping your account credentials secure.</p>
        </div>
      </div>
    </main>
  );
}
