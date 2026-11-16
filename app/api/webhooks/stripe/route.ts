import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { trackServer } from "@/lib/analytics/posthog-server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpsert(event.data.object as Stripe.Subscription, event.type);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_succeeded":
      case "invoice.payment_failed":
        await handleInvoice(event.data.object as Stripe.Invoice, event.type);
        break;
    }
  } catch (err) {
    console.error("Webhook handler error", event.type, err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const customerEmail = session.customer_email ?? session.customer_details?.email;
  if (!customerEmail) return;

  // Upsert user row; set stripe customer id
  const existing = await db.select().from(users).where(eq(users.email, customerEmail)).limit(1);
  if (existing.length === 0) {
    await db.insert(users).values({
      id: crypto.randomUUID(),
      email: customerEmail,
      stripeCustomerId: customerId,
    });
  } else {
    await db.update(users)
      .set({ stripeCustomerId: customerId })
      .where(eq(users.email, customerEmail));
  }
}

async function handleSubscriptionUpsert(sub: Stripe.Subscription, eventType?: string) {
  const customerId = sub.customer as string;
  const item = sub.items.data[0];
  const periodEnd = (item as Stripe.SubscriptionItem & { current_period_end?: number })
    ?.current_period_end;
  const utm = sub.metadata ?? {};

  await db.update(users)
    .set({
      subscriptionId: sub.id,
      subscriptionStatus: sub.status,
      subscriptionPriceId: item?.price.id ?? null,
      trialEndsAt: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
    })
    .where(eq(users.stripeCustomerId, customerId));

  if (eventType === "customer.subscription.created" && sub.status === "trialing") {
    trackServer(customerId, "trial_started", {
      subscription_id: sub.id,
      customer_id: customerId,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    });
  } else if (sub.status === "active") {
    trackServer(customerId, "subscription_active", {
      subscription_id: sub.id,
      customer_id: customerId,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    });
  }
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  await db.update(users)
    .set({ subscriptionStatus: "canceled" })
    .where(eq(users.subscriptionId, sub.id));

  trackServer(sub.customer as string, "canceled", {
    subscription_id: sub.id,
    customer_id: sub.customer as string,
  });
}

async function handleInvoice(invoice: Stripe.Invoice, eventType: string) {
  const subRef = invoice.parent?.subscription_details?.subscription;
  if (!subRef) return;
  const subId = typeof subRef === "string" ? subRef : subRef.id;
  const sub = await stripe.subscriptions.retrieve(subId);

  if (eventType === "invoice.payment_failed") {
    trackServer(sub.customer as string, "payment_failed", {
      subscription_id: sub.id,
      customer_id: sub.customer as string,
    });
  }

  await handleSubscriptionUpsert(sub);
}
