"use client";
import Link from "next/link";

// utils
import { DEFAULT_BRAND_COLOR } from "~/lib/constants";

export const metadata = {
  title: "Page Not found - Modular Cloud",
};

export default function GlobalError() {
  return (
    <html>
      <body>
        <main
          className="flex h-screen w-full flex-col items-center justify-center gap-6 text-center"
          style={{
            "--color-primary": DEFAULT_BRAND_COLOR,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 33H29C31.2091 33 33 31.2091 33 29V20H7M20 33H11C8.79086 33 7 31.2091 7 29V20M20 33V7H11C8.79086 7 7 8.79086 7 11V20"
              stroke="#888A90"
              strokeOpacity="0.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32.1907 2.74387L23.2578 3.8407L24.8421 16.7438L37.7452 15.1595L36.6484 6.22658C36.3792 4.03391 34.3834 2.47465 32.1907 2.74387Z"
              fill="#EF4444"
              fillOpacity="0.2"
              stroke="#EF4444"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex flex-col gap-2">
            <h1 className="text-foreground text-xl font-semibold">SORRY !</h1>
            <p className="text-night-700">
              An unknown Error occured, this is surely on our end, no need to do
              anything
            </p>
            <p>
              In the meantime, you can&nbsp;
              <Link href="/" className="underline text-primary">
                Go to the homepage
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
