"use client";

// utils
import { DEFAULT_BRAND_COLOR } from "~/lib/constants";
import { ErrorBox } from "~/ui/error/box";
import { HomeBg } from "~/ui/home-bg";
import { HomeBgMobile } from "~/ui/home-bg/mobile";

export default function Error() {
  return (
    <div
      className="flex h-screen w-full flex-col tab:items-center tab:justify-center gap-6 text-center"
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": DEFAULT_BRAND_COLOR,
      }}
    >
      <HomeBg className="absolute left-0 top-0 right-0 hidden tab:block z-[-1]" />
      <HomeBgMobile className="absolute left-0 top-0 right-0 tab:hidden block z-[-1]" />
      <div className="max-tab:w-screen max-tab:h-screen p-4">
        <div className="p-[3.75rem] bg-muted-100 rounded-lg max-tab:w-full max-tab:h-full">
          <ErrorBox />
        </div>
      </div>
    </div>
  );
}
