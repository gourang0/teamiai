import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FallingOrbs } from "@/components/FallingOrbs";
import { CursorTrail } from "@/components/CursorTrail";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teamify — Intelligence, Engineered.",
  description:
    "Teamify builds AI systems, automation infrastructure, and operational intelligence ecosystems that transform how organizations work.",
  keywords: [
    "AI systems",
    "AI orchestration",
    "intelligent automation",
    "enterprise AI",
    "AI infrastructure",
    "AI agents",
    "operational intelligence",
  ],
  openGraph: {
    title: "Teamify — Intelligence, Engineered.",
    description:
      "Building AI systems and operational intelligence for the modern enterprise.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <FallingOrbs />
          <CursorTrail />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
