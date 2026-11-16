import type { UtmParams } from "@/lib/utm";

/** All analytics events the boilerplate emits. Extend per product. */
export type AnalyticsEvent =
  | { name: "page_viewed"; props: { path: string } & UtmParams }
  | { name: "checkout_started"; props: { price_id: string } & UtmParams }
  | { name: "trial_started"; props: { subscription_id: string; customer_id: string } & UtmParams }
  | { name: "subscription_active"; props: { subscription_id: string; customer_id: string } & UtmParams }
  | { name: "payment_failed"; props: { subscription_id: string; customer_id: string } }
  | { name: "canceled"; props: { subscription_id: string; customer_id: string } };

export type EventName = AnalyticsEvent["name"];
export type EventProps<T extends EventName> = Extract<AnalyticsEvent, { name: T }>["props"];
