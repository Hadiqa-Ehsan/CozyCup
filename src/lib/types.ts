// Lightweight shared types used by client components, decoupled from the
// full Prisma-generated types (which include extra internal fields).

export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  unit: string | null;
  priceCents: number;
  dealPriceCents: number | null;
  currency: string;
  imageUrl: string | null;
  stock: number;
  isDeal: boolean;
};

export type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  children: { id: string; name: string; slug: string }[];
};

export type OrderWithItems = {
  id: string;
  status: string;
  fulfillmentType: string;
  paymentMethod: string;
  totalCents: number;
  currency: string;
  address: string | null;
  area: string | null;
  city: string | null;
  branch: { id: string; name: string } | null;
  items: { id: string; name: string; quantity: number; unitPriceCents: number }[];
};

export function formatPrice(cents: number, currency = "PKR") {
  return `${currency} ${(cents / 100).toFixed(2)}`;
}
