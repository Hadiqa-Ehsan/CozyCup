import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/deals", label: "Deals" },
  { href: "/branches", label: "Locations" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:underline">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          This is an unofficial student/portfolio clone project built for learning purposes. It is
          not affiliated with or endorsed by the real Jalal Sons. Branch, pricing, and product data
          are sample/representative only.
        </p>
      </div>
    </footer>
  );
}
