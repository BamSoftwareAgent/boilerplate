# CLAUDE.md 

## Standard: SLC

Simple, Lovable, Complete. Every feature shipped must be all three.

- No stubs, placeholders, "coming soon" banners, or half-built flows.
- When behind schedule: cut scope, never quality. A smaller product that works beats a bigger one that doesn't.

## Scope

_Fill this in per product._

**In scope:**
- …

**Deliberately excluded** _(and the signal that would justify adding it)_:
- …

## Never Build

Do not build features that require the owner's manual involvement to function:

- Approval queues or manual review steps
- Manual fulfilment workflows
- Support tooling that assumes a human replies
- Live chat or real-time human support
- Admin workflows that run per-customer

If a feature breaks when the owner is asleep, don't ship it.

## Quality Bar

Every screen must have:

- **Empty state** — useful, not a blank void
- **Loading state** — feedback within 200 ms
- **Error state** — actionable message, not a raw stack trace
- **Mobile** — works at 390 px width without horizontal scroll

## Workflow

- Work on a branch; never push directly to `main`.
- Open a PR with screenshots of every changed screen.
- Never touch billing config or production credentials without a PR and a second pair of eyes.
- PR titles follow conventional commits (`feat:`, `fix:`, `chore:`, etc.).

## Stack 

_Frontend, backend, database, auth, and hosting: fill in per deployment (see [docs/boilerplate-spec.md](docs/boilerplate-spec.md))._
| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript, Tailwind, shadcn/ui |
| Database | Neon Postgres + Drizzle ORM |
| Hosting | Vercel Pro, one team, one project per muse |
| Auth | Better Auth (email magic link + Google OAuth, admin plugin) |
| Payments | Stripe Checkout + Billing + hosted Customer Portal, one Stripe account per muse |
| Transactional email | Resend + React Email, sent from each muse's domain |
| Inbound email | Cloudflare Email Routing to one support inbox, batched weekly |
| Analytics | PostHog, one project per muse |
| Errors | Sentry, one project per muse |
| Uptime | Better Stack, email alerts only |
| Domains and DNS | Cloudflare Registrar |
| Scheduled jobs | Vercel Cron; a durable job runner only under the rule of two |
| Code hosting | GitHub, one private repo per muse, created from the `boilerplate` template |