"use client";

import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Minimal light/dark toggle. The icon swap is pure CSS (dark: variants), so
 * there is no hydration mismatch and no state to manage. An explicit choice
 * is stored; until then the page follows the system preference live.
 */
export function ThemeToggle() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      document.documentElement.classList.toggle("dark", e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="inline-flex items-center justify-center w-9 h-9 rounded-muse text-gray-500 hover:text-gray-900 hover:bg-gray-900/5 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <Sun className="w-[18px] h-[18px] dark:hidden" aria-hidden />
      <Moon className="w-[18px] h-[18px] hidden dark:block" aria-hidden />
    </button>
  );
}
