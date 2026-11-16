import {
  Zap, Shield, TrendingUp, Clock, Star, Users,
  Layers, Globe, CheckCircle, Bell, Rocket, Lock, BarChart, Sparkles,
  type LucideProps,
} from "lucide-react";
import { muse } from "@/muse.config";

type Icon = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, Icon> = {
  Zap, Shield, TrendingUp, Clock, Star, Users,
  Layers, Globe, CheckCircle, Bell, Rocket, Lock, BarChart, Sparkles,
};

function BenefitIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return (
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-muse bg-brand-light mb-4" aria-hidden>
      <Icon className="w-6 h-6 text-brand" strokeWidth={1.75} />
    </div>
  );
}

export function Benefits() {
  const { heading, pillars } = muse.benefits;
  return (
    <section className="py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
          {heading}
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center px-2">
              <BenefitIcon name={pillar.icon} />
              <h3 className="font-semibold text-gray-900 mb-2">{pillar.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
