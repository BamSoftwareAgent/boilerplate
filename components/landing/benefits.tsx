import {
  Zap, Shield, TrendingUp, Clock, Star, Users,
  Layers, Globe, CheckCircle, Bell, Rocket, Lock, BarChart, Sparkles,
  type LucideProps,
} from "lucide-react";
import { muse } from "@/muse.config";
import { Reveal } from "./reveal";

type Icon = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, Icon> = {
  Zap, Shield, TrendingUp, Clock, Star, Users,
  Layers, Globe, CheckCircle, Bell, Rocket, Lock, BarChart, Sparkles,
};

function BenefitIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return (
    <div
      className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-brand-2 text-brand-fg shadow-glow mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
      aria-hidden
    >
      <Icon className="w-6 h-6" strokeWidth={1.75} />
    </div>
  );
}

export function Benefits() {
  const { heading, pillars } = muse.benefits;
  return (
    <section id="benefits" className="py-16 px-4 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12 text-balance">
            {heading}
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 110}>
              <div className="group h-full rounded-muse border border-gray-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10 hover:border-brand/20">
                <BenefitIcon name={pillar.icon} />
                <h3 className="font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
