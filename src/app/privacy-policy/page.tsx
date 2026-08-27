export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Privacy Policy</h1>

      <div className="flex flex-col gap-4 text-sm text-muted-foreground">
        <p>
          This is a sample/placeholder privacy policy for a student portfolio clone project. It is
          not a real legal document and should not be used for an actual business. The real Jalal
          Sons privacy policy could not be verified from the live site for this project — TBD if a
          real policy is ever needed.
        </p>

        <div>
          <h2 className="mb-1 font-medium text-foreground">Information we collect</h2>
          <p>
            Account details (name, email, phone) you provide when signing up, and order details
            (items, delivery address, branch) when you place an order.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-medium text-foreground">How we use it</h2>
          <p>To create your account, process orders, and show your order history.</p>
        </div>

        <div>
          <h2 className="mb-1 font-medium text-foreground">Data storage</h2>
          <p>
            Data is stored in a PostgreSQL database for this demo project. Passwords are hashed and
            never stored in plain text.
          </p>
        </div>

        <div>
          <h2 className="mb-1 font-medium text-foreground">Third parties</h2>
          <p>This demo does not share data with any third party.</p>
        </div>
      </div>
    </main>
  );
}
