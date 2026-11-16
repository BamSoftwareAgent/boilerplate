"use client";

import { StartTrialButton } from "./start-trial-button";

/** Replace PRICE and INTERVAL per product. */
const PRICE = "$XX";
const INTERVAL = "/ month";

export function Pricing() {
  return (
    <section className="bg-indigo-50 py-16 px-4">
      <div className="max-w-sm mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Simple pricing</h2>
        <p className="text-gray-600 mb-8 text-sm">One plan. Everything included.</p>

        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-8">
          <div className="mb-6">
            <span className="text-5xl font-bold text-gray-900">{PRICE}</span>
            <span className="text-gray-500 ml-1">{INTERVAL}</span>
          </div>

          <ul className="space-y-3 text-sm text-gray-600 text-left mb-8">
            <li className="flex gap-2 items-start"><span className="text-green-500 font-bold mt-0.5">✓</span> Feature one</li>
            <li className="flex gap-2 items-start"><span className="text-green-500 font-bold mt-0.5">✓</span> Feature two</li>
            <li className="flex gap-2 items-start"><span className="text-green-500 font-bold mt-0.5">✓</span> Feature three</li>
            <li className="flex gap-2 items-start"><span className="text-green-500 font-bold mt-0.5">✓</span> Feature four</li>
          </ul>

          <StartTrialButton size="lg" className="w-full" />

          <p className="mt-4 text-xs text-gray-400">
            14-day free trial. Card required. Cancel any time — no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
