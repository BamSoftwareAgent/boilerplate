import Image from "next/image";
import { muse } from "@/muse.config";

export function Proof() {
  const { proof } = muse;
  const hasContent =
    proof.customerCount !== null ||
    proof.testimonials.length > 0 ||
    proof.logos.length > 0;

  if (!hasContent) return null;

  return (
    <section className="py-14 px-4 border-t border-gray-100 dark:border-white/10">
      <div className="max-w-5xl mx-auto">
        {proof.customerCount && (
          <p className="text-center text-3xl font-bold text-brand mb-10">
            {proof.customerCount}
          </p>
        )}

        {proof.logos.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 opacity-50">
            {proof.logos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            ))}
          </div>
        )}

        {proof.testimonials.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proof.testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-muse border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm p-6 flex flex-col gap-4 transition-shadow hover:shadow-md"
              >
                <blockquote className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{t.name}</span>
                  {t.role && <span> · {t.role}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
