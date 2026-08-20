import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex gap-4">
            <Logo size={44} />
            <div>
              <h3 className="mb-2 font-semibold text-primary">Contact Us</h3>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">PHONE</span>
                  <br />
                  +92 300 000 0000 (sample — see note below)
                </p>
                <p className="mt-2">
                  <span className="font-medium text-foreground">EMAIL</span>
                  <br />
                  demo@example.com (sample — see note below)
                </p>
                <p className="mt-2">
                  <span className="font-medium text-foreground">ADDRESS</span>
                  <br />
                  Sample Address, Demo Plaza, Canal Road, Lahore
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-primary">
              Our Timings
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between rounded-md bg-secondary px-4 py-2">
                <span>Monday - Thursday</span>
                <span className="text-muted-foreground">09:00 AM - 12:30 AM</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-secondary px-4 py-2">
                <span>Friday</span>
                <span className="text-muted-foreground text-right">
                  09:00 AM - 12:30 PM
                  <br />
                  02:00 PM - 12:30 AM
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-secondary px-4 py-2">
                <span>Saturday - Sunday</span>
                <span className="text-muted-foreground">09:00 AM - 12:30 AM</span>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Link href="/terms" className="rounded-md border border-primary px-4 py-2 text-sm text-primary hover:bg-accent">
                Terms and conditions
              </Link>
              <Link href="/privacy-policy" className="rounded-md border border-primary px-4 py-2 text-sm text-primary hover:bg-accent">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/shop" className="text-muted-foreground hover:underline">Shop</Link>
            <Link href="/deals" className="text-muted-foreground hover:underline">Deals</Link>
            <Link href="/branches" className="text-muted-foreground hover:underline">Locations</Link>
            <Link href="/contact" className="text-muted-foreground hover:underline">Contact</Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          This is an unofficial student/portfolio clone project built for learning purposes. It is
          not affiliated with or endorsed by the real Jalal Sons. The logo, phone number, email,
          and address shown here are placeholders — not the real business&apos;s actual contact
          details — so this demo can&apos;t be mistaken for a live channel to the real company.
          Branch, pricing, and product data are sample/representative only.
        </p>
      </div>
    </footer>
  );
}
