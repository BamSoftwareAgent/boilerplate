import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { muse } from "@/muse.config";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: muse.name, template: `%s — ${muse.name}` },
  description: muse.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsId = muse.googleAdsConversionId;
  return (
    <html lang="en" className={`theme-${muse.theme.preset}`}>
      <head>
        {/* Google Ads conversion tag — only rendered when NEXT_PUBLIC_GOOGLE_ADS_ID is set */}
        {adsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${adsId.split("/")[0]}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${adsId.split("/")[0]}');`}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
