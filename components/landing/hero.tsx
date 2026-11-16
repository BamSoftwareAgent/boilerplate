"use client";

import { StartTrialButton } from "./start-trial-button";

export function Hero() {
  return (
    <section className="px-4 pt-20 pb-16 text-center max-w-3xl mx-auto w-full">
      {/* Replace these copy placeholders — see docs/boilerplate-spec.md */}
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-4">
        PRODUCT CATEGORY
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
        The headline that names the outcome
      </h1>
      <p className="mt-5 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">
        One or two sentences that describe the problem you solve and who you solve it for.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <StartTrialButton size="lg" />
        <p className="text-sm text-gray-500 self-center">
          14-day free trial · Card required · Cancel any time
        </p>
      </div>
    </section>
  );
}
