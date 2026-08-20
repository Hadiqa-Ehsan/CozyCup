import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { listOrdersForUser } from "@/lib/services/order-service";
import { formatPrice, type OrderWithItems } from "@/lib/types";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/account");

  const orders = (await listOrdersForUser(session.user.id)) as OrderWithItems[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-semibold">My Account</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Signed in as {session.user.email}
      </p>

      <h2 className="mb-4 text-lg font-medium">Order history</h2>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t placed any orders yet.{" "}
          <Link href="/shop" className="text-primary hover:underline">
            Start shopping
          </Link>
          .
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/order-confirmation/${order.id}`}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent"
            >
              <div>
                <p className="font-medium">Order #{order.id.slice(-8)}</p>
                <p className="text-sm text-muted-foreground">
                  {order.items.length} item(s) · {order.fulfillmentType === "DELIVERY" ? "Delivery" : "Pickup"} ·{" "}
                  {order.status}
                </p>
              </div>
              <span className="font-medium">{formatPrice(order.totalCents, order.currency)}</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
