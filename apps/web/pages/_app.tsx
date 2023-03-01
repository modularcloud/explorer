import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Inter } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Head from "next/head";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans text-sleek text-night`}>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </main>
  )
}
