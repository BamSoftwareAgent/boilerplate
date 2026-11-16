import type { Metadata } from "next";
import { muse } from "@/muse.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">
        {muse.legal.company} · Last updated {new Date().getFullYear()}
      </p>
      <div className="prose text-gray-700 space-y-4">
        <p className="p-4 bg-amber-50 border border-amber-200 rounded text-amber-800 text-sm">
          <strong>Template placeholder.</strong> Replace this page with your
          actual privacy policy. Have a lawyer review it once; then each muse
          only fills in its name and details.
        </p>
      </div>
    </main>
  );
}
