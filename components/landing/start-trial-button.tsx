"use client";

import { useState } from "react";
import { getUtm } from "@/lib/utm";
import { track } from "@/lib/analytics/posthog-client";
import { cn } from "@/lib/utils";

interface Props {
  size?: "default" | "lg";
  className?: string;
}

export function StartTrialButton({ size = "default", className }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const utm = getUtm();
      const priceId = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
      track("checkout_started", { price_id: priceId, ...utm });
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ utm }),
      });
      if (!res.ok) throw new Error("Failed to start checkout");
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleClick}
        disabled={loading}
        className={cn(
          "rounded-lg bg-indigo-600 text-white font-semibold transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed",
          size === "lg" ? "px-8 py-3 text-base" : "px-5 py-2 text-sm",
          className,
        )}
      >
        {loading ? "Loading…" : "Start free trial"}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
