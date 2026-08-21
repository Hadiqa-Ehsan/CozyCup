import Link from "next/link";

export default function CheckoutSuccessPage() {
  return <main className="mx-auto max-w-xl px-6 py-20"><h1 className="text-2xl font-semibold">Payment successful</h1><p className="mt-3 text-muted-foreground">Your order is being confirmed.</p><Link className="mt-6 inline-block underline" href="/">Return to shop</Link></main>;
}