import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Brand tokens — driven by CSS vars set per theme preset in globals.css
        brand: {
          DEFAULT: "hsl(var(--brand))",
          2: "hsl(var(--brand-2))",
          dark: "hsl(var(--brand-dark))",
          light: "hsl(var(--brand-light))",
          fg: "hsl(var(--brand-fg))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          dark: "hsl(var(--accent-dark))",
        },
      },
      borderRadius: {
        muse: "var(--radius)",
      },
      boxShadow: {
        glow: "0 8px 30px -8px hsl(var(--brand) / 0.55)",
        "glow-lg": "0 24px 60px -20px hsl(var(--brand) / 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
