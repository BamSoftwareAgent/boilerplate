"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { muse } from "@/muse.config";
import { StartTrialButton } from "./start-trial-button";

export function StickyTrialBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("hero-cta-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "sm:hidden fixed bottom-0 inset-x-0 z-50",
        "glass border-t border-gray-200/70 dark:border-white/10 shadow-[0_-8px_30px_-12px_rgb(0_0_0/0.15)]",
        "px-4 py-3 flex flex-col items-center gap-1.5",
        "transition-transform duration-200 ease-out",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <StartTrialButton size="lg" className="w-full max-w-sm" />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {muse.pricing.trialDays}-day trial · Cancel any time · 30-day refund
      </p>
    </div>
  );
}
