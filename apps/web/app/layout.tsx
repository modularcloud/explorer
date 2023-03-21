import { Inter } from "@next/font/google";
import "../styles/globals.css";

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
  return (
    <html className={`${inter.variable} font-sans text-sleek text-night`} lang="en">
      <body>{children}</body>
    </html>
  );
}
