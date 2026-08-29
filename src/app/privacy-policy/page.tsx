import Link from "next/link";
import { Logo } from "@/components/logo";

export default function PrivacyPolicyPage() {
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
          <span className="text-gray-800">Privacy Policy</span>
        </div>

        {/* Centered Heading */}
        <h1 className="mb-8 text-2xl font-bold text-center">Privacy Policy</h1>

        <div className="flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">
          <p>
            This is a sample/placeholder privacy policy for a student portfolio clone project. It is
            not a real legal document and should not be used for an actual business. The real policy
            could not be verified from the live site for this project — TBD if a
            real policy is ever needed.
          </p>

          <div>
            <h2 className="mb-1 font-semibold text-gray-900">Information we collect</h2>
            <p>
              Account details (name, email, phone) you provide when signing up, and order details
              (items, delivery address, branch) when you place an order.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-semibold text-gray-900">How we use it</h2>
            <p>To create your account, process orders, and show your order history.</p>
          </div>

          <div>
            <h2 className="mb-1 font-semibold text-gray-900">Data storage</h2>
            <p>
              Data is stored in a PostgreSQL database for this demo project. Passwords are hashed and
              never stored in plain text.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-semibold text-gray-900">Third parties</h2>
            <p>This demo does not share data with any third party.</p>
          </div>
        </div>
      </div>
    </main>
  );
}