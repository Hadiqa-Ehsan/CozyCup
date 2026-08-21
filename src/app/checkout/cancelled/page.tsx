import Link from "next/link";

export default function CheckoutCancelledPage() {
  return <main className="mx-auto max-w-xl px-6 py-20"><h1 className="text-2xl font-semibold">Checkout cancelled</h1><p className="mt-3 text-muted-foreground">Your payment was not completed.</p><Link className="mt-6 inline-block underline" href="/cart">Return to cart</Link></main>;
}