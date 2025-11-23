import type { Metadata } from "next";
import { Inter, Urbanist, Sora, Manrope, Fraunces, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/auth-provider";
import { MotionProvider } from "@/components/providers/MotionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "MeddyCare - Connect with Trusted Live-in Carers",
    template: "%s | MeddyCare"
  },
  description: "Find vetted, independent live-in carers across the UK. Quality matches for elderly care, dementia support, and specialized live-in services.",
  keywords: ["live-in care", "elderly care", "dementia care", "carer", "UK care", "home care", "respite care"],
  authors: [{ name: "MeddyCare" }],
  creator: "MeddyCare",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://meddycare.co.uk",
    title: "MeddyCare - Trusted Live-in Care",
    description: "Connect with professional, vetted live-in carers for your loved ones. Personalized care at home.",
    siteName: "MeddyCare",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MeddyCare - Connecting Families with Carers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeddyCare - Trusted Live-in Care",
    description: "Find vetted, independent live-in carers across the UK.",
    images: ["/og-image.jpg"],
    creator: "@meddycare",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${urbanist.variable} ${sora.variable} ${manrope.variable} ${fraunces.variable} ${playfair.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <MotionProvider>
            {children}
          </MotionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
