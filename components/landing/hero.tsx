import Image from "next/image";
import { Sparkles } from "lucide-react";
import { muse } from "@/muse.config";
import { StartTrialButton } from "./start-trial-button";

/** Split the headline so the closing words carry the gradient. */
function splitHeadline(headline: string): [string, string] {
  const words = headline.trim().split(/\s+/);
  if (words.length <= 2) return ["", headline];
  return [words.slice(0, -2).join(" "), words.slice(-2).join(" ")];
}

export function Hero() {
  const { hero, pricing } = muse;
  const [lead, tail] = splitHeadline(hero.headline);

  return (
    <section className="relative overflow-hidden">
      {/* Atmosphere: blueprint grid + floating colour orbs, fading into white */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-grid" />
        <div className="aurora anim-float w-[480px] h-[480px] -top-48 -left-32 bg-[hsl(var(--brand)/0.35)]" />
        <div
          className="aurora anim-float w-[420px] h-[420px] -top-24 -right-24 bg-[hsl(var(--brand-2)/0.3)]"
          style={{ animationDelay: "-5s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="px-4 pt-20 pb-16 text-center max-w-3xl mx-auto w-full">
        <p className="anim-rise inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-light/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-dark dark:text-brand">
          <Sparkles className="w-3.5 h-3.5" aria-hidden />
          {hero.eyebrow}
        </p>

        <h1 className="anim-rise mt-6 text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.08] text-balance">
          {lead && <>{lead} </>}
          <span className="text-gradient">{tail}</span>
        </h1>

        <p className="anim-rise [animation-delay:150ms] mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
          {hero.subheadline}
        </p>

        <div className="anim-rise [animation-delay:250ms] mt-9 flex flex-col items-center gap-3">
          {/* Sentinel observed by StickyTrialBar to know when hero CTA leaves viewport */}
          <div id="hero-cta-sentinel" aria-hidden />
          <StartTrialButton size="lg" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {pricing.trialDays}-day free trial · Card required · Cancel any time · 30-day refund
          </p>
        </div>

        {hero.visual && (
          <div className="anim-rise [animation-delay:350ms] mt-14 max-w-2xl mx-auto">
            {/* Browser-chrome frame with a gradient edge */}
            <div className="rounded-[calc(var(--radius)+6px)] bg-gradient-to-br from-brand/50 via-brand-2/50 to-brand/50 p-px shadow-glow-lg">
              <div className="rounded-[calc(var(--radius)+5px)] overflow-hidden bg-white dark:bg-gray-900">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-white/10" aria-hidden>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
                </div>
                <Image
                  src={hero.visual}
                  alt={`${muse.name} product screenshot`}
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
