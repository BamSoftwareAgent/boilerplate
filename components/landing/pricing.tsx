import { Check } from "lucide-react";
import { muse } from "@/muse.config";
import { StartTrialButton } from "./start-trial-button";
import { Reveal } from "./reveal";

export function Pricing() {
  const { amount, interval, features, trialDays } = muse.pricing;
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-20 px-4 scroll-mt-20 bg-gradient-to-b from-background via-[hsl(var(--brand-light)/0.6)] to-background"
    >
      <div className="aurora w-[380px] h-[380px] top-10 left-1/2 -translate-x-1/2 bg-[hsl(var(--brand)/0.18)]" aria-hidden />

      <div className="relative max-w-sm mx-auto text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Simple pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-sm">One plan. Everything included.</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative rounded-[calc(var(--radius)+2px)] bg-gradient-to-br from-brand via-brand-2 to-brand p-[1.5px] shadow-glow-lg">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand to-brand-2 px-4 py-1 text-xs font-semibold text-brand-fg shadow-glow">
              {trialDays}-day free trial
            </span>

            <div className="rounded-muse bg-white dark:bg-gray-900 p-8 pt-10">
              <div className="mb-7">
                <span className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white">{amount}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1.5 text-lg">{interval}</span>
              </div>

              <ul
                className="space-y-3.5 text-sm text-gray-600 dark:text-gray-300 text-left mb-8"
                aria-label="Included features"
              >
                {features.map((f) => (
                  <li key={f} className="flex gap-3 items-start">
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-light flex-shrink-0 mt-px"
                      aria-hidden
                    >
                      <Check className="w-3 h-3 text-brand-dark dark:text-brand" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <StartTrialButton size="lg" className="w-full" />

              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                {trialDays}-day free trial · Card required · Cancel any time · 30-day refund
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
