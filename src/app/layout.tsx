import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const SITE_URL = profile.siteUrl;
const SITE_NAME = "TopengDev";
const DESC =
  "Multi-tenant SaaS, native shells, autonomous bots — all running on one VPS reliably & autonomously. Christopher Indrawan, builder out of Jakarta.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Christopher Indrawan — TopengDev",
    template: "%s · TopengDev",
  },
  description: DESC,
  applicationName: SITE_NAME,
  keywords: [
    "Christopher Indrawan",
    "TopengDev",
    "full-stack engineer",
    "Next.js",
    "Kotlin",
    "Postgres",
    "infrastructure",
    "freelance",
    "fractional",
    "Indonesia",
    "Jakarta",
    "multi-tenant SaaS",
    "POS",
    "Pulse",
    "Aenoxa",
  ],
  authors: [{ name: profile.full, url: SITE_URL }],
  creator: profile.full,
  publisher: profile.full,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Christopher Indrawan — TopengDev",
    description: DESC,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "TopengDev — Christopher Indrawan, builder out of Jakarta",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Indrawan — TopengDev",
    description: DESC,
    images: ["/og-default.png"],
    creator: "@topengdev",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.full,
  alternateName: ["TopengDev", profile.alias],
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  image: `${SITE_URL}/og-default.png`,
  jobTitle: "Full-stack Engineer & Builder",
  description: DESC,
  worksFor: {
    "@type": "Organization",
    name: "Aenoxa",
    url: profile.companyUrl,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressRegion: "DKI Jakarta",
    addressCountry: "ID",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Kotlin",
    "Android (Capacitor + native)",
    "PostgreSQL",
    "Go",
    "Rust",
    "Multi-tenant SaaS architecture",
    "Infrastructure on VPS",
  ],
  sameAs: [profile.githubUrl, profile.linkedinUrl, profile.companyUrl],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESC,
  author: { "@type": "Person", name: profile.full, url: SITE_URL },
  inLanguage: "en",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
