"use client";
import { signIn } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/dashboard";

  async function handleGoogle() {
    await signIn.social({ provider: "google", callbackURL: redirect });
  }

  async function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    await signIn.magicLink({ email, callbackURL: redirect });
    alert("Check your email for a login link.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Sign in</h1>

        <button
          onClick={handleGoogle}
          className="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Continue with Google
        </button>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-3 text-xs text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        <form onSubmit={handleMagicLink} className="space-y-3">
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Send magic link
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
