import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type { UtmParams } from "@/lib/utm";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const utm: UtmParams = body.utm ?? {};

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    return NextResponse.json({ error: "STRIPE_PRICE_ID not configured" }, { status: 500 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const taxEnabled = process.env.STRIPE_TAX_ENABLED === "true";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { ...utm },
    },
    ...(taxEnabled ? { automatic_tax: { enabled: true } } : {}),
    metadata: { ...utm },
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/`,
  });

  return NextResponse.json({ url: session.url });
}
