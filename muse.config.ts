/**
 * muse.config.ts — the only file you edit per product.
 * Everything on the landing page comes from here.
 */

export const muse = {
  // ── Identity ────────────────────────────────────────────────────────────────
  name: "App Name",
  tagline: "The one-line outcome your customer gets.",
  description:
    "Two sentences. Who it's for and the specific problem it solves.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  // ── Open Graph ───────────────────────────────────────────────────────────────
  og: {
    title: "App Name — Tagline",
    description:
      "Two sentences. Who it's for and the specific problem it solves.",
    // Place a 1200×630 image at public/og.png and change this path.
    image: "/og.png",
  },

  // ── Hero ─────────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "PRODUCT CATEGORY",
    headline: "The headline that names the outcome",
    subheadline:
      "One or two sentences describing the problem you solve and who you solve it for.",
  },

  // ── Problem / After ──────────────────────────────────────────────────────────
  problemAfter: {
    before: {
      heading: "The problem today",
      points: ["Pain point one", "Pain point two", "Pain point three"],
    },
    after: {
      heading: "Life with the product",
      points: ["Outcome one", "Outcome two", "Outcome three"],
    },
  },

  // ── Benefit pillars (exactly 3) ───────────────────────────────────────────────
  benefits: [
    {
      icon: "⚡",
      title: "Benefit pillar one",
      body: "One sentence explaining what this pillar does and why it matters.",
    },
    {
      icon: "🔒",
      title: "Benefit pillar two",
      body: "One sentence explaining what this pillar does and why it matters.",
    },
    {
      icon: "📈",
      title: "Benefit pillar three",
      body: "One sentence explaining what this pillar does and why it matters.",
    },
  ] as [BenefitPillar, BenefitPillar, BenefitPillar],

  // ── Pricing ──────────────────────────────────────────────────────────────────
  pricing: {
    // Display price only — Stripe is the source of truth for the actual charge.
    amount: "$XX",
    interval: "/ month",
    features: [
      "Feature one",
      "Feature two",
      "Feature three",
      "Feature four",
    ],
    trialDays: 14,
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────────
  faq: [
    {
      q: "How does the free trial work?",
      a: "You get {{trialDays}} days free with full access. Your card is required to start — it won't be charged until the trial ends. Cancel any time before then and you won't be charged.",
    },
    {
      q: "Can I cancel at any time?",
      a: "Yes. Cancel via your account settings at any time. You keep access until the end of the billing period.",
    },
    {
      q: "What if I want a refund?",
      a: "If you're not happy within 30 days of your first charge, email us and we'll refund it — no questions asked.",
    },
    {
      q: "PLACEHOLDER — What does [feature] do?",
      a: "Replace this with a real question about your product.",
    },
  ],

  // ── Legal ────────────────────────────────────────────────────────────────────
  legal: {
    company: "Your Company Name",
    // Fill these in after a lawyer reviews the templates.
    termsUrl: "/legal/terms",
    privacyUrl: "/legal/privacy",
  },

  // ── Google Ads ───────────────────────────────────────────────────────────────
  // Set NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX/YYYYYYY in .env to enable.
  googleAdsConversionId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? null,
} as const;

export type MuseConfig = typeof muse;
type BenefitPillar = { icon: string; title: string; body: string };
