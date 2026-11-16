"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { muse } from "@/muse.config";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  // Replace {{trialDays}} template token with the actual value from config.
  const body = a.replace(/\{\{trialDays\}\}/g, String(muse.pricing.trialDays));
  return (
    <div
      className={cn(
        "rounded-muse border transition-all duration-200",
        open
          ? "border-brand/25 bg-white dark:bg-gray-900 shadow-md shadow-brand/5"
          : "border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20",
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-center px-5 py-4 text-left text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors gap-4"
      >
        <span>{q}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            "flex-shrink-0 w-4 h-4 text-gray-400 transition-transform duration-300",
            open && "rotate-180 text-brand",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-16 px-4 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Frequently asked questions
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div role="list" className="space-y-3">
            {muse.faq.map((item) => (
              <div key={item.q} role="listitem">
                <FaqItem q={item.q} a={item.a} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
