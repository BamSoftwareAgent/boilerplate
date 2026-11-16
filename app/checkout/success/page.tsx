import type { Metadata } from "next";
import Link from "next/link";
import { muse } from "@/muse.config";

export const metadata: Metadata = { title: "Trial started" };

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-sm w-full text-center space-y-5">
        <div className="text-5xl" aria-hidden>🎉</div>
        <h1 className="text-2xl font-bold text-gray-900">Your trial has started</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Check your email for a magic link to sign in. You have{" "}
          {muse.stripe.trialDays} days free — your card won&apos;t be charged
          until the trial ends.
        </p>
        <Link
          href="/login"
          className="inline-block mt-2 rounded-lg bg-indigo-600 text-white px-6 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in to your account
        </Link>
        <p className="text-xs text-gray-400">
          Didn&apos;t get an email? Check your spam folder or{" "}
          <a href="/" className="underline hover:text-gray-600">
            go back to {muse.name}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
