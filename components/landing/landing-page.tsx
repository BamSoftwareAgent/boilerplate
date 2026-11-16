"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";
import { muse } from "@/muse.config";
import { Nav } from "./nav";
import { Hero } from "./hero";
import { ProblemAfter } from "./problem-after";
import { Benefits } from "./benefits";
import { Proof } from "./proof";
import { Pricing } from "./pricing";
import { Faq } from "./faq";
import { StickyTrialBar } from "./sticky-trial-bar";

export function LandingPage() {
  useEffect(() => {
    captureUtm();
  }, []);

  return (
    <div id="top" className="flex flex-col min-h-screen">
      <Nav />
      <main id="main-content">
        <Hero />
        <ProblemAfter />
        <Benefits />
        <Proof />
        <Pricing />
        <Faq />
      </main>
      <footer className="mt-auto border-t border-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2.5 font-bold text-gray-900 tracking-tight">
            <span
              className="w-5 h-5 rounded-md bg-gradient-to-br from-brand to-brand-2"
              aria-hidden
            />
            {muse.name}
          </div>
          <p className="text-sm text-gray-500 max-w-xs">{muse.tagline}</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a
              href={muse.legal.termsUrl}
              className="hover:text-gray-600 transition-colors"
            >
              Terms
            </a>
            <a
              href={muse.legal.privacyUrl}
              className="hover:text-gray-600 transition-colors"
            >
              Privacy
            </a>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {muse.legal.company}
          </p>
        </div>
      </footer>
      <StickyTrialBar />
    </div>
  );
}
