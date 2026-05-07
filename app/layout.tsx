import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Body HQ — Free Health & Wellness Calculators",
  description: "Free personalized health and wellness calculators. Sleep cycle calculator, vitamin and mineral calculator, intermittent fasting calculator, pregnancy due date calculator, and stress burnout score.",
  verification: {
    google: "0fRQMaF_xLlkUy9yk-ghGqsAtMdq1II8_nYXHEV9LXM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
