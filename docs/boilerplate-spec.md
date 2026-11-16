Answers to your questions, all from the spec:
- Stack: Next.js App Router + TypeScript + Tailwind + shadcn/ui, Neon Postgres + Drizzle, Better Auth, Vercel Pro, Stripe Checkout + Billing + Customer Portal, Resend, PostHog, Sentry, Better Stack.
- Week 1 exit criterion: a validation page can be deployed for a real idea, with UTM capture, the real price, and a "Start trial" button that opens real Stripe Checkout (test mode, 14-day card-required trial), with checkout_started recorded in PostHog carrying the UTM source. No signup, no dashboard, no auth in week 1.
- Validation-mode landing page: NOT a waitlist. Hero, problem/after state, 3 benefit pillars, real price, FAQ, Start trial button into real Stripe Checkout. Email waitlists never count as payment intent.
- Analytics: PostHog.

After the spec PR is merged, build week 1 as previously asked: one PR per component, stop at the exit criterion.


# 0.4 — Boilerplate Specification (The Reusable Machine)
 
Foundation output. Built once, used by every muse. Updated 23 October 2026.
 
---
 
## Decision
 
- **Size:** v1 is about 65 hours of your time. **Hard cap: 70 hours, or two calendar weeks.** At the cap, ship whatever passes the end-to-end test and cut the rest.
- **Build order:** the landing page and checkout come first, so Stage 1 tests can start in week one while the rest is built.
- **Rule of two:** nothing joins the boilerplate after v1 unless two of the first three muses had to build it by hand.
---
 
## Stack decisions (closes the open items in the stack document)
 
| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (current stable, App Router), TypeScript, Tailwind, shadcn/ui | Your proven stack; agents are fluent in it |
| Database | **Neon Postgres + Drizzle ORM** | Permanent free tier, 100 projects, scales to zero, no paid minimum; standard Postgres, so it's portable and saleable. Supabase was rejected: its free projects pause after 7 days idle, and only 2 free projects are allowed |
| Hosting | **Vercel Pro, one team, one project per muse** | Hobby forbids commercial use. Projects transfer to a buyer's team. A dormant muse costs roughly nothing extra |
| Auth | **Better Auth** (email magic link + Google OAuth; admin plugin) | Library, not a vendor: users live in the muse's own database, nothing per user, nothing to migrate at sale |
| Payments | **Stripe Checkout + Billing + hosted Customer Portal**, one Stripe account per muse | Checkout-only (no custom card forms) keeps the Managed Payments switch to a single flag |
| Transactional email | **Resend + React Email**, sending from each muse's domain | Simple API, per-domain setup |
| Inbound email | Cloudflare Email Routing → a single support inbox you batch weekly | Business address per muse with no personal inbox, per the charter |
| Analytics | **PostHog** (web and product analytics, one project per muse) | Covers UTMs, funnels and server-side conversion events in one tool |
| Errors | **Sentry** (free tier, one project per muse) | Standard choice |
| Uptime | **Better Stack** (free monitors, email alerts only) | Batched, not paged, per the charter |
| Domains and DNS | Cloudflare Registrar | At-cost renewals, DNS in one place |
| Scheduled jobs | Vercel Cron in v1; add a durable job runner only when a muse needs it | Rule of two |
 
Pricing and free-tier limits are as found in October 2026; check each at signup.
 
**Saleability rule:** every muse gets its own repo, Vercel project, Neon project, Stripe account, domain, PostHog project and Sentry project. Nothing is shared at the account level except your Vercel team, and projects transfer out of it.
 
---
 
## Components, ranked by hours saved per muse
 
"Your hours" covers spec, review, account setup and testing while Claude Code builds; agent time is not the constraint. "Saved per muse" is what each built muse would otherwise cost you. All figures are estimates.
 
| Rank | Component | Build or buy | Your hours to build | Saved per built muse | v1? |
|---|---|---|---|---|---|
| 1 | **Landing page template** (validation mode and launch mode) | Build | 10–12 | ~30 (about 8 per Stage 1 test × ~4 tests per built muse) | v1, week 1 |
| 2 | **Stripe subscriptions, trials, dunning** | Build the integration; buy dunning from Stripe | 10–14 | ~15, plus avoided billing bugs | v1, week 1 (checkout), week 2 (lifecycle) |
| 3 | **Next.js starter + provisioning script** | Build | 8–10 | ~10 | v1 |
| 4 | **Analytics and conversion tracking** | Buy PostHog; build the event layer | 4–6 | ~6 | v1, week 1 |
| 5 | **Auth** | Buy the library (Better Auth); build the screens | 3–5 | ~5 | v1 |
| 6 | **Admin panel** (minimal) | Build on the Better Auth admin plugin; use the Stripe dashboard for billing | 4–6 | ~5 | v1 (minimal) |
| 7 | **Ops runbook template** | Write | 3–4 | ~5, plus monthly ops hours | v1 |
| 8 | **Transactional email** | Buy Resend; build templates | 4–5 | ~4 | v1 |
| 9 | **Launch checklist** | Write | 2–3 | ~3, plus missed steps avoided | v1 |
| 10 | **Error tracking and uptime** | Buy Sentry and Better Stack | 1–2 | ~2 | v1 |
| — | **End-to-end test + "muse zero" dry run** | Build | 6–8 | Proves everything above | v1, last |
 
**Total: about 55–75 hours.** It pays back during muse one's validation tests, before muse one is built.
 
---
 
## What each component must contain (v1)
 
1. **Landing page template.**
    - **Validation mode:** hero, problem/after state, 3 benefit pillars, the real price, FAQ, and a "Start trial" button. The button opens a real Stripe Checkout (14-day trial, card required, launch date stated), or a pre-order page with a refund promise.
    - **Launch mode:** the same page plus the signup path into the app.
    - **Plumbing:** UTM capture persisted through to Checkout metadata, Open Graph images, legal page slots (terms, privacy), and a Google Ads conversion tag for validation spend.
    - Each validation page is deployable in under an hour of your time.
2. **Stripe.**
    - Products and prices are created from a config file. Checkout is in subscription mode with trials, and the Customer Portal handles cancel, card update and invoices.
    - Webhooks drive subscription state into the database, idempotently.
    - Access rules are defined for trialing, active, past_due and canceled.
    - Smart Retries and Stripe's built-in failed-payment and trial-ending emails are switched on.
    - Refunds are done from the Stripe dashboard only (charter rule: no questions, 30 days).
    - The Managed Payments flag is wired but off until the accountant decides.
3. **Starter + provisioning.**
    - A `create-muse` script clones the template; creates the Vercel, Neon, Sentry and PostHog projects; sets environment variables; and deploys a preview.
    - Environment variables are validated at boot. CI runs typecheck, lint and the end-to-end test on every pull request.
    - Includes a `CLAUDE.md` (conventions, gate-packet instructions) and a Playwright script that screenshots every screen for G4–G6 gate packets.
4. **Analytics.** PostHog web analytics on all pages. Server-side events from the Stripe webhooks: `checkout_started`, `trial_started`, `subscription_active`, `payment_failed`, `canceled`. Each event carries the original UTM source, so the channel log gets cost per customer by channel.
5. **Auth.** Email magic link plus Google, a session-protected app shell, account deletion, and a data export. No passwords, teams or roles (excluded by the stack document).
6. **Admin.** An `/admin` route limited to your account: find a user by email, see their plan status and last login, a link to the Stripe customer, and impersonation. Nothing else.
7. **Ops runbook template.**
    - Refund, failed-payment, feature-request and support decision rules from the charter.
    - The FAQ auto-reply, the weekly support batch routine, and an incident checklist.
    - Monthly ops-hours logging.
    - Procedures for maintenance mode, sale handover and shutdown (30-day notice, refund the current period, export data).
8. **Transactional email.** Welcome/magic link, trial started, activation nudge (one, at day 3), and cancellation confirmation. Stripe sends receipts, trial-ending and failed-payment emails. The contact-form auto-reply links to the FAQ.
9. **Launch checklist.** The 0.2 launch-week sequence, plus domain, DNS and email authentication (SPF, DKIM, DMARC), Search Console, Stripe live mode, legal pages, uptime monitors, and test purchase and refund in live mode.
10. **Errors and uptime.** Sentry with source maps. Better Stack monitors on the home page, the app and the webhook endpoint, with email alerts only.
---
 
## Definition of done: the end-to-end test
 
The boilerplate is done when one automated Playwright run passes against a fresh preview deploy of a dummy "muse zero", created by `create-muse` from a clean clone. The run must show all of these:
 
1. A visitor lands on the validation page with UTM tags. PostHog records the page view with the source.
2. They click "Start trial" and reach Stripe Checkout in test mode, which counts as payment intent. `checkout_started` is recorded.
3. They pay with a test card. The webhook creates the user and a trialing subscription in Neon, and `trial_started` carries the original UTM.
4. The welcome email arrives (captured in a test inbox). The magic link logs them into the app shell.
5. Using a Stripe test clock: the trial converts to active; then a failed payment sets past_due, triggers Stripe's dunning email and applies the access rule; recovery restores access.
6. Canceling via the Customer Portal ends access at period end, and the cancellation email is sent.
7. The admin finds the user by email and sees the correct status.
8. A deliberate thrown error appears in Sentry, and a stopped endpoint triggers a Better Stack email.
**Plus one time test:** from `create-muse` to a deployed muse with working test-mode checkout in **2 hours or less of your time**, measured on muse zero. This number replaces the stack document's open item on empty-repo-to-deployed time, and sets the real build envelope.
 
---
 
## Build schedule
 
- **Week 1 (about 30 hours):** starter and provisioning, landing template in validation mode, Stripe Checkout with trials, the analytics event layer. **Exit criterion:** a validation page can be deployed for a real idea, and Stage 1 tests may start.
- **Week 2 (about 35 hours):** auth, subscription lifecycle and dunning, email, admin, errors and uptime, runbook, checklist, end-to-end test, the muse-zero dry run.
- **Stop at 70 hours,** whatever state it is in. What fails the end-to-end test gets fixed; anything not in v1 does not get started.
---
 
## After muse three (only under the rule of two)
 
These wait until two of your first three muses needed them:
 
- annual plans, coupons, and plan switching with proration UI
- usage-based billing
- an onboarding email sequence beyond one nudge
- in-app review prompts (marketplace muses)
- a programmatic SEO page generator
- a free-tool or calculator template
- affiliate tracking (only after a Stage 3 pass)
- feature flags and A/B tests
- a durable background job runner
- an admin metrics dashboard (use Stripe and PostHog until then)
- internationalisation
Never, per the stack document: teams, roles and permissions, real-time collaboration, native mobile.
 
---
 
## Questions for an accountant (before the first paying customer)
 
Not tax advice. These are the questions that decide whether to switch on Stripe Managed Payments:
 
1. Do I need to register for GST now, and are subscriptions sold to overseas customers GST-free?
2. What foreign VAT or sales-tax obligations do my sales create, B2B versus B2C, and at what thresholds?
3. Does Stripe Managed Payments' extra 3.5% cost less than registering and filing myself, at $1k, $4k and $8k USD MRR? Is Australia an eligible seller country for it?
4. Should each muse start in its own entity, or move into one only when it turns a profit (charter spin-out rule)?
Also have a lawyer review the terms and privacy templates once; after that, each muse only fills in its details.
 
---
 
## The money
 
- **Build cost:** about 65 hours, roughly two weeks of capacity.
- **Return:** about 8 hours per Stage 1 test and about 55 hours per built muse. At 4 tests a month (~1 build), that's about 85 hours a month. It pays back in the first month of validation.
- **Running cost:** Vercel Pro at about $20 USD/month for the whole portfolio. Everything else is free per muse until a muse has real usage. Stripe Billing and payment fees scale with revenue.
- **What has to be true:** the `create-muse`-to-checkout time stays at 2 hours or less. If muse one takes longer than that to stand up, fix the provisioning script before muse two.