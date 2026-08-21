import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import {
  attachStripeSession,
  cancelPendingOrder,
  createOrderFromCart,
} from "@/lib/services/order-service";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let orderId: string | undefined;
  try {
    const order = await createOrderFromCart(session.user.id);
    orderId = order.id;
    const stripe = getStripe();
    const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: order.currency.toLowerCase(),
          unit_amount: item.unitPriceCents,
          product_data: {
            name: item.product.name,
            ...(item.product.imageUrl ? { images: [item.product.imageUrl] } : {}),
          },
        },
      })),
      metadata: { orderId: order.id, userId: session.user.id },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancelled?order_id=${order.id}`,
    });

    if (!checkoutSession.url) {
      await cancelPendingOrder(order.id);
      return NextResponse.json({ error: "Could not create checkout session." }, { status: 502 });
    }

    await attachStripeSession(order.id, checkoutSession.id);
    return NextResponse.json({ orderId: order.id, checkoutUrl: checkoutSession.url });
  } catch (error) {
    if (orderId) await cancelPendingOrder(orderId);
    const message = error instanceof Error ? error.message : "Could not start checkout.";
    const status = message.includes("Cart is empty") || message.includes("Insufficient stock") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}