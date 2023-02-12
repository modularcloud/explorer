import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans text-sleek text-night`}>
      <Component {...pageProps} />
    </main>
  )
}
