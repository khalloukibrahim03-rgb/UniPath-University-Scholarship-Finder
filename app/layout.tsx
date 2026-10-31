import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "UniPath — Find your way forward",
    template: "%s | UniPath",
  },
  description: "Explore universities, discover scholarship opportunities, and organise your next academic step with clear, source-first guidance.",
  applicationName: "UniPath",
  keywords: ["universities", "scholarships", "study abroad", "admissions", "Morocco", "international students"],
  openGraph: {
    title: "UniPath — Find your way forward",
    description: "A clearer starting point for university discovery, scholarships, and application planning.",
    type: "website",
    siteName: "UniPath",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniPath — Find your way forward",
    description: "Explore study options and funding opportunities with source-first guidance.",
  },
};

export const viewport: Viewport = {
  themeColor: "#102b35",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="flex min-h-screen flex-col bg-[#f8f9f7] text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
