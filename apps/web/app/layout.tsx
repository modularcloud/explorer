import "~/styles/globals.css";
// components
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "~/ui/shadcn/components/ui/toaster";
import { TailwindIndicator } from "~/ui/tailwind-indicator";
import { GlobalHotkeyProvider } from "~/ui/global-hotkey-provider";
import { SkipToMainContent } from "~/ui/skip-to-main-content";

// utils
import { Inter } from "next/font/google";
import { getSearchOptionGroups } from "~/lib/search-options";
import { EXPLORER_CONFIG } from "~/config/explorers";

// types
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Modular Cloud",
    default: EXPLORER_CONFIG.homepageTitle,
  },
  description: EXPLORER_CONFIG.homepageDescription,
  keywords: EXPLORER_CONFIG.homepageKeywords,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchOptionGroups = await getSearchOptionGroups();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body
        className={`${inter.variable} font-sans text-foreground`}
        suppressHydrationWarning
      >
        <SkipToMainContent />
        <GlobalHotkeyProvider optionGroups={searchOptionGroups}>
          {children}
          {process.env.NODE_ENV !== "production" && <TailwindIndicator />}
          <Toaster />
          <Analytics />
        </GlobalHotkeyProvider>
      </body>
    </html>
  );
}
