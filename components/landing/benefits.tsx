const PILLARS = [
  {
    icon: "⚡",
    title: "Benefit pillar one",
    body: "One sentence explaining what this pillar does and why it matters to the customer.",
  },
  {
    icon: "🔒",
    title: "Benefit pillar two",
    body: "One sentence explaining what this pillar does and why it matters to the customer.",
  },
  {
    icon: "📈",
    title: "Benefit pillar three",
    body: "One sentence explaining what this pillar does and why it matters to the customer.",
  },
];

export function Benefits() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
          How it works
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {PILLARS.map((p) => (
            <div key={p.title} className="text-center">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
