import { Check } from "lucide-react";
import { muse } from "@/muse.config";
import { StartTrialButton } from "./start-trial-button";

export function Pricing() {
  const { amount, interval, features, trialDays } = muse.pricing;
  return (
    <section className="bg-brand-light py-14 px-4">
      <div className="max-w-sm mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Simple pricing</h2>
        <p className="text-gray-600 mb-8 text-sm">One plan. Everything included.</p>

        <div className="bg-white rounded-muse border border-brand/20 shadow-sm p-8">
          <div className="mb-6">
            <span className="text-5xl font-bold text-gray-900">{amount}</span>
            <span className="text-gray-500 ml-1 text-lg">{interval}</span>
          </div>

          <ul className="space-y-3 text-sm text-gray-600 text-left mb-8" aria-label="Included features">
            {features.map((f) => (
              <li key={f} className="flex gap-2 items-start">
                <Check className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" strokeWidth={2.5} aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <StartTrialButton size="lg" className="w-full" />

          <p className="mt-4 text-xs text-gray-400">
            {trialDays}-day free trial · Card required · Cancel any time · 30-day refund
          </p>
        </div>
      </div>
    </section>
  );
}
