import Link from "next/link";
import { Logo } from "@/components/logo";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-8 text-gray-900">
      <div className="mx-auto max-w-3xl">
        {/* Centered Logo Icon Only */}
        <div className="flex justify-center mb-6 [&_span]:hidden">
          <Logo size={56} />
        </div>

        {/* Breadcrumb */}
        <div className="mb-6 text-xs text-gray-500">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-800">Terms &amp; Conditions</span>
        </div>

        {/* Centered Heading */}
        <h1 className="mb-8 text-2xl font-bold text-center">Terms &amp; Conditions</h1>

        <div className="flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">
          <p>
            This is a sample/placeholder terms page for a student portfolio clone project — not a
            real legal agreement. The real terms could not be verified from the live site
            for this project — TBD if real terms are ever needed.
          </p>

          <div>
            <h2 className="mb-1 font-semibold text-gray-900">Orders</h2>
            <p>
              Orders placed through this demo are for demonstration purposes only. Payment method is
              Cash on Delivery only, matching the real site&apos;s behavior — no online payments are
              processed here.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-semibold text-gray-900">Pricing &amp; availability</h2>
            <p>
              Product prices, stock, and branch information in this demo are sample data and do not
              reflect real, current pricing or availability.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-semibold text-gray-900">Account</h2>
            <p>You&apos;re responsible for keeping your account credentials secure.</p>
          </div>
        </div>
      </div>
    </main>
  );
}