# Boilerplate Spec

A reusable foundation for independent subscription SaaS products.
Each product is a fresh deployment with its own Stripe account.

---
 
## Stripe

### Products in use

| Product | Used | Notes |
|---------|------|-------|
| Payments (Checkout) | ✅ | Hosted Checkout only — no custom card forms |
| Billing (Subscriptions) | ✅ | See details below |
| Tax (Stripe Tax) | ⬜ | Wired but **off** — pending accountant sign-off |
| Connect | ❌ | Not needed |
| Invoicing / Quotes | ❌ | Not needed |

### Billing details

- **Subscriptions** via Stripe Billing.
- **Trials:** 14-day card-required trial on every new subscription.
- **Customer Portal:** hosted Stripe portal for plan changes, payment method updates, and cancellations. No custom portal UI.
- **Smart Retries:** enabled on all subscriptions (Stripe's default dunning).
- **Webhooks:** subscription state is owned by Stripe and synced into the app via webhooks. The app never trusts client-side session state for access control.

### Key webhook events to handle

```
checkout.session.completed
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
invoice.payment_succeeded
invoice.payment_failed
```

### Mode

**Test mode only** during development. Flip to live keys at deploy time via environment variables — never commit live keys.

### Tax

`automatic_tax[enabled]` is passed to Checkout and subscription creation calls, but the value is controlled by an env flag `STRIPE_TAX_ENABLED=false` until the accountant confirms. No code changes needed to enable it — flip the flag.

---

## Stack

_To be filled in per deployment._

- **Frontend:** …
- **Backend:** …
- **Database:** …
- **Auth:** …
- **Hosting:** …

---

## Environment variables

```
# Stripe — use test keys locally, live keys in production
STRIPE_SECRET_KEY=sk_test_…
STRIPE_PUBLISHABLE_KEY=pk_test_…
STRIPE_WEBHOOK_SECRET=whsec_…
STRIPE_PRICE_ID=price_…          # the default subscription price

# Feature flags
STRIPE_TAX_ENABLED=false          # flip to true once accountant confirms
```

---

## Decisions log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-11-16 | Checkout only, no custom card form | Reduces PCI scope; faster to build |
| 2026-11-16 | 14-day card-required trial | Reduces trial abuse; Stripe handles card validation |
| 2026-11-16 | Hosted Customer Portal | No custom billing UI to maintain |
| 2026-11-16 | Tax wired but off | Accountant review pending |
| 2026-11-16 | Each product gets its own Stripe account | Clean separation; no Connect needed |
