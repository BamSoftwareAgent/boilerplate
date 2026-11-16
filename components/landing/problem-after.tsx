import { XCircle, CheckCircle2 } from "lucide-react";
import { muse } from "@/muse.config";
import { Reveal } from "./reveal";

export function ProblemAfter() {
  const { before, after } = muse.problemAfter;
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
        <Reveal>
          <div className="h-full rounded-muse border border-red-100 dark:border-red-500/20 bg-red-50/60 dark:bg-red-500/[0.07] p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-500 dark:text-red-400 mb-3">
              Before
            </p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
              {before.heading}
            </h2>
            <ul className="space-y-3.5 text-gray-600 dark:text-gray-300 text-sm" aria-label="Problems today">
              {before.points.map((p) => (
                <li key={p} className="flex gap-2.5 items-start">
                  <XCircle className="w-[18px] h-[18px] text-red-400 flex-shrink-0 mt-0.5" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="h-full rounded-muse border border-brand/15 bg-brand-light/70 p-7 shadow-[0_12px_40px_-16px_hsl(var(--brand)/0.3)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark dark:text-brand mb-3">
              After
            </p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
              {after.heading}
            </h2>
            <ul className="space-y-3.5 text-gray-700 dark:text-gray-200 text-sm" aria-label="Outcomes with the product">
              {after.points.map((p) => (
                <li key={p} className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-[18px] h-[18px] text-brand flex-shrink-0 mt-0.5" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
