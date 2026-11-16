import { muse } from "@/muse.config";
import { StartTrialButton } from "./start-trial-button";

export function Hero() {
  const { hero, pricing } = muse;
  return (
    <section className="px-4 pt-16 pb-14 text-center max-w-3xl mx-auto w-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4">
        {hero.eyebrow}
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
        {hero.headline}
      </h1>
      <p className="mt-5 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
        {hero.subheadline}
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <StartTrialButton size="lg" />
        <p className="text-sm text-gray-500">
          {pricing.trialDays}-day free trial · Card required · Cancel any time
        </p>
      </div>
    </section>
  );
}
