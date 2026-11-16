import type { Metadata } from "next";
import { muse } from "@/muse.config";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: muse.og.title,
  description: muse.og.description,
  openGraph: {
    title: muse.og.title,
    description: muse.og.description,
    url: muse.url,
    siteName: muse.name,
    images: [
      {
        url: muse.og.image,
        width: 1200,
        height: 630,
        alt: muse.og.title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: muse.og.title,
    description: muse.og.description,
    images: [muse.og.image],
  },
};

export default function RootPage() {
  return <LandingPage />;
}
