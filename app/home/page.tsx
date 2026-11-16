import { LandingPage } from "@/components/landing/landing-page";

export const metadata = {
  title: "App Name — Tagline",
  description: "One-line description of what this product does.",
  openGraph: {
    title: "App Name — Tagline",
    description: "One-line description of what this product does.",
    type: "website",
  },
};

export default function HomePpage() {
  return <LandingPage />;
}
