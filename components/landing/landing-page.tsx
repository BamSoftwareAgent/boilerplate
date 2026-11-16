"use client";

import { useEffect } from "react";
import { captureUtm, getUtm } from "@/lib/utm";
import { track } from "@/lib/analytics/posthog-client";
import { Hero } from "./hero";
import { ProblemAfter } from "./problem-after";
import { Benefits } from "./benefits";
import { Pricing } from "./pricing";
import { Faq } from "./faq";

export function LandingPage() {
  useEffect(() => {
    captureUtm();
    const utm = getUtm();
    track("page_viewed", { path: "/home", ...utm });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProblemAfter />
      <Benefits />
      <Pricing />
      <Faq />
      <footer className="mt-auto py-8 text-center text-sm text-gray-400 border-t border-gray-100">
        <div className="flex justify-center gap-6">
          <a href="/legal/terms" className="hover:text-gray-600 transition-colors">Terms</a>
          <a href="/legal/privacy" className="hover:text-gray-600 transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
