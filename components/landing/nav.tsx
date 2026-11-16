import { muse } from "@/muse.config";
import { ThemeToggle } from "@/components/theme-toggle";
import { StartTrialButton } from "./start-trial-button";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-gray-200/60 dark:border-white/10">
      <nav className="max-w-5xl mx-auto flex items-center justify-between gap-3 px-4 h-16">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-bold text-gray-900 dark:text-gray-100 tracking-tight"
        >
          <span
            className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand to-brand-2 shadow-glow"
            aria-hidden
          />
          {muse.name}
        </a>
        <div className="hidden sm:flex items-center gap-7 text-sm font-medium text-gray-600 dark:text-gray-300">
          <a href="#benefits" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Benefits
          </a>
          <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            FAQ
          </a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <StartTrialButton label="Start trial" />
        </div>
      </nav>
    </header>
  );
}
