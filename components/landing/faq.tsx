"use client";

import { useState } from "react";
import { muse } from "@/muse.config";
import { cn } from "@/lib/utils";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  // Replace {{trialDays}} template token with the actual value from config.
  const body = a.replace(/\{\{trialDays\}\}/g, String(muse.pricing.trialDays));
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex justify-between items-start py-4 text-left text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors gap-4"
      >
        <span>{q}</span>
        <span
          aria-hidden
          className={cn(
            "flex-shrink-0 text-gray-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          ▾
        </span>
      </button>
      {open && (
        <p className="pb-4 text-sm text-gray-600 leading-relaxed">{body}</p>
      )}
    </div>
  );
}

export function Faq() {
  return (
    <section className="py-14 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
          Frequently asked questions
        </h2>
        <div role="list">
          {muse.faq.map((item) => (
            <div key={item.q} role="listitem">
              <FaqItem q={item.q} a={item.a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
