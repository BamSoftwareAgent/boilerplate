"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { publicEnv } from "@/lib/env.public";
import { getUtm } from "@/lib/utm";
import { cn } from "@/lib/utils";

interface Props {
  size?: "default" | "lg";
  className?: string;
  label?: string;
}

export function StartTrialButton({
  size = "default",
  className,
  label = "Start free trial",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (publicEnv.posthogKey && publicEnv.posthogHost) {
      posthog.capture("trial_checkout_initiated");
    }

    setLoading(true);
    setError(null);
    try {
      const utm = getUtm();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ utm }),
      });
      if (!res.ok) throw new Error("Failed to create checkout session");
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={handleClick}
        disabled={loading}
        aria-busy={loading}
        className={cn(
          "btn-shine rounded-muse font-semibold text-brand-fg",
          "bg-gradient-to-br from-brand to-brand-2",
          "shadow-glow transition-all duration-200",
          "hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:brightness-95",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          size === "lg" ? "px-8 py-3.5 text-base" : "px-5 py-2.5 text-sm",
          className,
        )}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              role="status"
              aria-label="Loading"
            />
            Loading…
          </span>
        ) : (
          label
        )}
      </button>
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
