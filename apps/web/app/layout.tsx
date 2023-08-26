import { Inter } from "next/font/google";
// import Script from "next/script";
// import { getWhitelabel } from "~/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import { Toaster } from "~/ui/shadcn/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  // const whitelabel = getWhitelabel();
  return (
    <html lang="en">
      <body className={`${inter.variable} text-sleek text-night font-sans`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
      {/* TODO: whitelabel is not used anymore, but we keep for future reorganization */}
      {/* {whitelabel.env === "nautilus" ? (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-WM976PHBGC"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WM976PHBGC');
          `}
          </Script>
        </>
      ) : null} */}
    </html>
  );
}
