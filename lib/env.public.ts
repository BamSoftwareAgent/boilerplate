/** Client-safe public env vars. Only NEXT_PUBLIC_* values. */
export const publicEnv = {
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
