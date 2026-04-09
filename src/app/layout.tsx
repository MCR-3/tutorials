import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "@/styles/global.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const DESCRIPTION =
  "Practical deep learning tutorials: understand how DL frameworks work and how to build convnets, transformers, and more.";

export const metadata: Metadata = {
  title: {
    default: "simplegrad tutorials",
    template: "%s — simplegrad tutorials",
  },
  description: DESCRIPTION,
  metadataBase: new URL("https://tutorials.simplegrad.org"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "https://tutorials.simplegrad.org",
    siteName: "simplegrad tutorials",
    title: "simplegrad tutorials",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "simplegrad tutorials",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

// Static JSON-LD — hardcoded, no user input, safe for dangerouslySetInnerHTML
const websiteJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "simplegrad tutorials",
  url: "https://tutorials.simplegrad.org",
  publisher: {
    "@type": "Organization",
    name: "simplegrad",
    url: "https://simplegrad.org",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${plusJakartaSans.variable}`}
    >
      <body>
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLd }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
