import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db/client";
import { stripeEvents } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Stripe requires the raw body for signature verification — do not parse as JSON.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency: skip events we've already processed.
  const existing = await db
    .select({ id: stripeEvents.id })
    .from(stripeEvents)
    .where(eq(stripeEvents.id, event.id))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  // Record the raw event. Lifecycle handling (access rules, emails) is week 2.
  await db.insert(stripeEvents).values({
    id: event.id,
    type: event.type,
    payload: body,
  });

  return NextResponse.json({ received: true });
}
