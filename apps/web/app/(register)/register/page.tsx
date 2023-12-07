import * as React from "react";
import type { Metadata } from "next";

import { HomeBg } from "~/ui/home-bg";
import { HomeBgMobile } from "~/ui/home-bg/mobile";

export const metadata: Metadata = {
  title: "Register your chain",
};

export default function RegisterPage() {
  return (
    <div
      className="h-[100dvh] flex flex-col justify-between"
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": "212 100% 49%",
      }}
    >
      <header className="p-4 border-b bg-white z-10 relative"></header>
      <main id="main-content" className="flex-1 flex flex-col">
        <HomeBg className="fixed left-0 top-0 right-0 hidden tab:block z-[-1]" />
        <HomeBgMobile className="fixed left-0 top-0 right-0 tab:hidden block z-[-1]" />
        {/* TODO */}
      </main>
      <footer className="p-4 border-t bg-white z-10 relative">
        {/* TODO */}
      </footer>
    </div>
  );
}
