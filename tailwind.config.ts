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
    },
  },
  plugins: [],
};
export default config;
