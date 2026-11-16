import { muse } from "@/muse.config";

export function Benefits() {
  return (
    <section className="py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
          How it works
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {muse.benefits.map((pillar) => (
            <div key={pillar.title} className="text-center px-2">
              <div className="text-4xl mb-4" aria-hidden>
                {pillar.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{pillar.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
