import Image from "next/image";
import { muse } from "@/muse.config";
import { StartTrialButton } from "./start-trial-button";

export function Hero() {
  const { hero, pricing } = muse;
  return (
    <section className="px-4 pt-16 pb-14 text-center max-w-3xl mx-auto w-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-4">
        {hero.eyebrow}
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight text-balance">
        {hero.headline}
      </h1>
      <p className="mt-5 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
        {hero.subheadline}
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        {/* Sentinel observed by StickyTrialBar to know when hero CTA leaves viewport */}
        <div id="hero-cta-sentinel" aria-hidden />
        <StartTrialButton size="lg" />
        <p className="text-sm text-gray-500">
          {pricing.trialDays}-day free trial · Card required · Cancel any time · 30-day refund
        </p>
      </div>

      {hero.visual && (
        <div className="mt-12 max-w-2xl mx-auto">
          <Image
            src={hero.visual}
            alt={`${muse.name} product screenshot`}
            width={1200}
            height={675}
            priority
            className="rounded-muse shadow-xl ring-1 ring-black/5 w-full h-auto"
          />
        </div>
      )}
    </section>
  );
}
