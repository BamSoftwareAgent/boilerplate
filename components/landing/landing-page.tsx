"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";
import { muse } from "@/muse.config";
import { Hero } from "./hero";
import { ProblemAfter } from "./problem-after";
import { Benefits } from "./benefits";
import { Pricing } from "./pricing";
import { Faq } from "./faq";

export function LandingPage() {
  useEffect(() => {
    captureUtm();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content">
        <Hero />
        <ProblemAfter />
        <Benefits />
        <Pricing />
        <Faq />
      </main>
      <footer className="mt-auto py-8 px-4 text-center text-sm text-gray-400 border-t border-gray-100">
        <p className="mb-2">
          © {new Date().getFullYear()} {muse.legal.company}
        </p>
        <div className="flex justify-center gap-6">
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
      </footer>
    </div>
  );
}
