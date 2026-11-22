import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import { Providers } from "@/components/providers/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/command/command-palette";
import { Concierge } from "@/components/concierge/concierge";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { IntroLoader } from "@/components/ui/intro-loader";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { profile, siteConfig, socials } from "@/data/portfolio";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${profile.name}`,
  },
  description: siteConfig.description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    "Nallamothu Srinath",
    "Srinath portfolio",
    "AI intern",
    "frontend developer",
    "machine learning",
    "data science",
    "IBM SkillsBuild",
    "Hyderabad developer",
    "B.Tech computer science",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — AI, data and interface engineering`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.png"],
  },
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
    { media: "(prefers-color-scheme: light)", color: "#f3f1ea" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteConfig.url,
  email: `mailto:${profile.email}`,
  jobTitle: "Artificial Intelligence Intern & Frontend Developer",
  description: profile.heroIntro,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Malla Reddy (MR) Deemed to be University",
  },
  worksFor: {
    "@type": "Organization",
    name: "IBM SkillsBuild (via Edunet Foundation)",
  },
  sameAs: socials.filter((social) => social.icon !== "mail").map((social) => social.href),
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Frontend Development",
    "Python",
    "Java",
    "SQL",
    "Cloud Computing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${serif.variable} ${mono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <IntroLoader />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CommandPalette />
          <Concierge />
        </Providers>
      </body>
    </html>
  );
}
