import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VectoSense — Nigeria Insecticide Resistance Intelligence",
  description:
    "Translating MalariaGEN genomic data into actionable recommendations for Nigerian vector control officers.",
  keywords: [
    "malaria",
    "Nigeria",
    "insecticide resistance",
    "vector control",
    "MalariaGEN",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="night"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-base-100 text-base-content antialiased">
        <Navbar />
        <main>{children}</main>
        <footer className="footer footer-center p-6 mt-16 border-t border-base-300 text-base-content/50">
          <p className="text-sm">
            VectoSense - Malaria Innovation Hackathon &copy; 2026
          </p>
        </footer>
      </body>
    </html>
  );
}