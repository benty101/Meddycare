import type { Metadata } from "next";
import { Inter, Poppins, Urbanist, Sora, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeddyCare - Connect with Trusted Live-in Carers",
  description: "Find vetted, independent live-in carers across the UK. Quality matches for elderly care and specialized support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${urbanist.variable} ${sora.variable} ${manrope.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
