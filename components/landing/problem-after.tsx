export function ProblemAfter() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-3">
            Before
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">The problem today</h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex gap-2"><span>✗</span> Pain point one</li>
            <li className="flex gap-2"><span>✗</span> Pain point two</li>
            <li className="flex gap-2"><span>✗</span> Pain point three</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            After
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Life with the product</h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex gap-2"><span>✓</span> Outcome one</li>
            <li className="flex gap-2"><span>✓</span> Outcome two</li>
            <li className="flex gap-2"><span>✓</span> Outcome three</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
