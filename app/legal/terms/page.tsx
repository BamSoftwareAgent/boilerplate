import type { Metadata } from "next";
import { muse } from "@/muse.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
        {muse.legal.company} · Last updated {new Date().getFullYear()}
      </p>
      <div className="prose text-gray-700 dark:text-gray-300 space-y-4">
        <p className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded text-amber-800 dark:text-amber-300 text-sm">
          <strong>Template placeholder.</strong> Replace this page with your
          actual terms of service. Have a lawyer review it once; then each muse
          only fills in its name and details.
        </p>
      </div>
    </main>
  );
}
