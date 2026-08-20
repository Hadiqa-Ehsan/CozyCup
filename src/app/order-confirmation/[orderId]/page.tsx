import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/lib/services/order-service";
import { formatPrice, type OrderWithItems } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = (await getOrderById(orderId)) as OrderWithItems | null;

  if (!order) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-8">
      <div className="mb-6 rounded-lg border border-green-300 bg-green-50 p-6 text-center">
        <h1 className="text-xl font-semibold text-green-800">Order placed successfully!</h1>
        <p className="mt-1 text-sm text-green-700">Order ID: {order.id}</p>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="mb-3 font-medium">Order summary</h2>
        <div className="flex flex-col divide-y">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.unitPriceCents * item.quantity, order.currency)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t pt-3 font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.totalCents, order.currency)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-lg border p-4 text-sm">
        <p>
          <span className="text-muted-foreground">Status: </span>
          {order.status}
        </p>
        <p>
          <span className="text-muted-foreground">Fulfillment: </span>
          {order.fulfillmentType === "DELIVERY" ? "Delivery" : "Pickup"}
        </p>
        {order.branch && (
          <p>
            <span className="text-muted-foreground">Branch: </span>
            {order.branch.name}
          </p>
        )}
        {order.fulfillmentType === "DELIVERY" && order.address && (
          <p>
            <span className="text-muted-foreground">Delivering to: </span>
            {order.address}, {order.area}, {order.city}
          </p>
        )}
        <p>
          <span className="text-muted-foreground">Payment: </span>
          {order.paymentMethod}
        </p>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Button asChild variant="outline">
          <Link href="/account">View my orders</Link>
        </Button>
        <Button asChild>
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </main>
  );
}
