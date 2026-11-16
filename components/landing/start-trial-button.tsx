"use client";

import { useState } from "react";
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
          "rounded-muse bg-brand text-brand-fg font-semibold transition-colors",
          "hover:bg-brand-dark active:bg-brand-dark",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          size === "lg" ? "px-8 py-3 text-base" : "px-5 py-2.5 text-sm",
          className,
        )}
      >
        {loading ? (
          <span className="flex items-center gap-2">
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
