import { muse } from "@/muse.config";

export function ProblemAfter() {
  const { before, after } = muse.problemAfter;
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            Before
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{before.heading}</h2>
          <ul className="space-y-3 text-gray-600 text-sm" aria-label="Problems today">
            {before.points.map((p) => (
              <li key={p} className="flex gap-2 items-start">
                <span aria-hidden className="text-red-400 font-bold mt-0.5">✗</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            After
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{after.heading}</h2>
          <ul className="space-y-3 text-gray-600 text-sm" aria-label="Outcomes with the product">
            {after.points.map((p) => (
              <li key={p} className="flex gap-2 items-start">
                <span aria-hidden className="text-green-500 font-bold mt-0.5">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
