import Link from "next/link";

export const metadata = { title: "Trial started" };

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-sm text-center space-y-4">
        <div className="text-5xl">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900">Your trial has started</h1>
        <p className="text-gray-600 text-sm">
          Check your email for a magic link to sign in. You have 14 days free — no charge until
          the trial ends.
        </p>
        <Link
          href="/login"
          className="inline-block mt-4 rounded-lg bg-indigo-600 text-white px-6 py-2 text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Sign in to your account
        </Link>
      </div>
    </main>
  );
}
