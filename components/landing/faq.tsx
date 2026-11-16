"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How does the free trial work?",
    a: "You get 14 days free with full access. Your card is required to start — it won't be charged until the trial ends. Cancel any time before then and pay nothing.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes. Cancel via your account settings at any time. You'll keep access until the end of the billing period.",
  },
  {
    q: "What if I want a refund?",
    a: "If you're not happy within 30 days of your first charge, email us and we'll refund it — no questions asked.",
  },
  {
    q: "PLACEHOLDER — What does [feature] do?",
    a: "Replace this FAQ with a real question about your product.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start py-4 text-left text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className={cn("ml-4 flex-shrink-0 transition-transform", open && "rotate-180")}>
          ▾
        </span>
      </button>
      {open && <p className="pb-4 text-sm text-gray-600">{a}</p>}
    </div>
  );
}

export function Faq() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
          Frequently asked questions
        </h2>
        <div>
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
