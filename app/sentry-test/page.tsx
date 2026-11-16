"use client";

export default function SentryTestPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <button
        type="button"
        className="rounded bg-red-600 px-6 py-3 text-white font-semibold"
        onClick={() => {
          throw new Error("Sentry Test Error — boilerplate setup verification");
        }}
      >
        Trigger Sentry test error
      </button>
    </main>
  );
}
