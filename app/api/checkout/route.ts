import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { publicEnv } from "@/lib/env";
import type { UtmParams } from "@/lib/utm";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const utm: UtmParams = body.utm ?? {};

  const taxEnabled = process.env.STRIPE_TAX_ENABLED === "true";
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!priceId) {
    return NextResponse.json({ error: "STRIPE_PRICE_ID not configured" }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { ...utm },
    },
    ...(taxEnabled ? { automatic_tax: { enabled: true } } : {}),
    metadata: { ...utm },
    success_url: `${publicEnv.appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${publicEnv.appUrl}/home`,
  });

  return NextResponse.json({ url: session.url });
}
