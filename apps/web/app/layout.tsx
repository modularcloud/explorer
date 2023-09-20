import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "~/ui/shadcn/components/ui/toaster";
import { TailwindIndicator } from "~/ui/tailwind-indicator";
import { GlobalHotkeyProvider } from "~/ui/global-hotkey-provider";
import { getSearchOptionGroups } from "~/lib/search-options";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchOptionGroups = await getSearchOptionGroups();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} font-sans text-foreground`}
        suppressHydrationWarning
      >
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
