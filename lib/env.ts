/**
 * Validates required env vars at boot. Throws at startup if any are missing
 * so misconfigured deploys fail fast rather than at runtime.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = {
  // Supabase / Neon — server
  databaseUrl: requireEnv("DATABASE_URL"),

  // Better Auth
  betterAuthSecret: requireEnv("BETTER_AUTH_SECRET"),
  betterAuthUrl: requireEnv("BETTER_AUTH_URL"),

  // Stripe — server
  stripeSecretKey: requireEnv("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: requireEnv("STRIPE_WEBHOOK_SECRET"),
  stripePriceId: requireEnv("STRIPE_PRICE_ID"),
  stripeTaxEnabled: process.env.STRIPE_TAX_ENABLED === "true",

  // Google OAuth (optional — only used by Better Auth if present)
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
} as const;

/** Public vars — safe to access on the client */
export const publicEnv = {
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "",
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
