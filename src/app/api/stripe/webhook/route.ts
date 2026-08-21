import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { cancelPendingOrder, markOrderPaid } from "@/lib/services/order-service";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.orderId;
  if (!orderId) return NextResponse.json({ received: true });

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await markOrderPaid(orderId);
      break;
    case "checkout.session.expired":
    case "checkout.session.async_payment_failed":
      await cancelPendingOrder(orderId);
      break;
  }

  return NextResponse.json({ received: true });
}