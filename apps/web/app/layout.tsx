import "~/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "~/ui/shadcn/components/ui/toaster";
import { TailwindIndicator } from "~/ui/tailwind-indicator";
import { GlobalHotkeyProvider } from "~/ui/global-hotkey-provider";
import { SkipToMainContent } from "~/ui/skip-to-main-content";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClientProviders } from "~/ui/client-providers";
import { env } from "~/env.mjs";
import localFont from "next/font/local";
import { getGroupedNetworkChains } from "~/lib/grouped-network-chains";

// types
import type { Metadata } from "next";

const interDisplay = localFont({
  src: [
    {
      path: "../fonts/InterDisplay/InterDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InterDisplay/InterDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/InterDisplay/InterDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/InterDisplay/InterDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter-display",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Modular Cloud",
    default: "Explorer by Modular Cloud",
  },
  description: "A block exporer for modular blockchains.",
  keywords:
    "block explorer, modular cloud, modular, blockchain, ethereum, evm, cosmos, ibc, rollapp, rollups, namespace, data availability, celestia, eclipse, nautilus, dymension, caldera, worlds, aeg, aether games",
  metadataBase: new URL(env.NEXT_PUBLIC_PRODUCTION_URL),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchOptionGroups = await getGroupedNetworkChains();

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body
        className={`${interDisplay.variable} font-sans text-foreground`}
        suppressHydrationWarning
      >
        <SkipToMainContent />
        <ClientProviders searchOptions={searchOptionGroups}>
          <GlobalHotkeyProvider optionGroups={searchOptionGroups}>
            {children}
            {process.env.NODE_ENV !== "production" && <TailwindIndicator />}
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </GlobalHotkeyProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
