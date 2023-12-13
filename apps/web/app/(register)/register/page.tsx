import * as React from "react";
import type { Metadata } from "next";

import { HomeBg } from "~/ui/home-bg";
import { HomeBgMobile } from "~/ui/home-bg/mobile";
import { RegisterForm } from "~/ui/register-form";

export const metadata: Metadata = {
  title: "Register your chain",
};

export default function RegisterPage() {
  return (
    <main
      id="main-content"
      className="h-[100dvh] flex flex-col items-stretch"
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": "212 100% 49%",
      }}
    >
      <HomeBg
        aria-hidden="true"
        className="fixed left-0 top-5 right-0 hidden tab:block z-[-1]"
      />
      <HomeBgMobile
        aria-hidden="true"
        className="fixed left-0 top-5 right-0 tab:hidden block z-[-1]"
      />
      <RegisterForm />
    </main>
  );
}

export const runtime = "edge";
