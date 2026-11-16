/**
 * scripts/stripe-setup.ts
 * Creates the Stripe product and price for this muse from muse.config.ts.
 * Run once per muse with test keys; re-run with live keys before launch.
 *
 * Usage:
 *   npx tsx scripts/stripe-setup.ts
 *
 * Requires STRIPE_SECRET_KEY in the environment (or .env.local).
 */
import Stripe from "stripe";
import { muse } from "../muse.config";

async function main() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.error("STRIPE_SECRET_KEY is not set. Copy .env.example to .env.local first.");
    process.exit(1);
  }

  const stripe = new Stripe(key, { apiVersion: "2026-10-28.endive", typescript: true });

  console.log(`\nSetting up Stripe for "${muse.stripe.productName}" …\n`);

  // Check if a product with this name already exists (idempotent).
  const existing = await stripe.products.search({
    query: `name:'${muse.stripe.productName}'`,
    limit: 1,
  });

  let product: Stripe.Product;
  if (existing.data.length > 0) {
    product = existing.data[0];
    console.log(`✓ Product already exists: ${product.id}`);
  } else {
    product = await stripe.products.create({
      name: muse.stripe.productName,
      statement_descriptor: muse.stripe.statementDescriptor,
    });
    console.log(`✓ Created product: ${product.id}`);
  }

  // Look for an active recurring price on this product.
  const prices = await stripe.prices.list({ product: product.id, active: true, limit: 10 });
  const existing_price = prices.data.find(
    (p) => p.recurring?.interval === "month" && p.type === "recurring",
  );

  if (existing_price) {
    console.log(`✓ Price already exists: ${existing_price.id}`);
    console.log(`\nAdd to .env.local:\n  STRIPE_PRICE_ID=${existing_price.id}\n`);
    return;
  }

  // Prompt for the price amount since it's not stored in the config
  // (the config has the display string, not cents).
  const amountStr = process.argv[2];
  if (!amountStr) {
    console.error(
      `\nPass the monthly price in cents as the first argument.\n` +
      `  Example (for $29/month): npx tsx scripts/stripe-setup.ts 2900\n`,
    );
    process.exit(1);
  }
  const unit_amount = parseInt(amountStr, 10);
  if (isNaN(unit_amount) || unit_amount <= 0) {
    console.error("Invalid amount. Must be a positive integer (cents).");
    process.exit(1);
  }

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount,
    currency: "usd",
    recurring: { interval: "month" },
  });

  console.log(`✓ Created price: ${price.id}  ($${(unit_amount / 100).toFixed(2)}/month)`);
  console.log(`\nAdd to .env.local:\n  STRIPE_PRICE_ID=${price.id}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
