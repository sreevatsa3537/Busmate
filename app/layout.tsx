import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
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
  title: "BusMate - Bangalore Bus Tracking",
  description: "Real-time bus tracking for Bangalore. Track buses, check crowd levels, and plan your journey with BusMate.",
  keywords: ["Bangalore", "BMTC", "bus tracking", "live tracking", "crowd", "ಬೆಂಗಳೂರು", "ಬಸ್"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
