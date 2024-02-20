"use client";
import { useParams } from "next/navigation";
import * as React from "react";
import { capitalize } from "~/lib/shared-utils";
import { ErrorBox } from "~/ui/error/box";
import { Footer } from "~/ui/footer";
import { HomeBg } from "~/ui/home-bg";
import { HomeBgMobile } from "~/ui/home-bg/mobile";
import { useSearchOptionsContext } from "~/ui/search-options-context";

export default function Error() {
  const params = useParams();
  const optionGroups = useSearchOptionsContext();
  const network = React.useMemo(() => {
    const values = optionGroups.flat();
    return (
      values.find((network) => network.slug === params.network) ?? values[0]
    );
  }, [optionGroups, params.network]);

  return (
    <div className="container flex overflow-auto h-[calc(100svh-theme('spacing.header'))] w-full flex-col items-center py-12 tab:py-5 tab:justify-between gap-6 text-center">
      <HomeBg className="absolute left-0 top-0 right-0 hidden tab:block z-[1]" />
      <HomeBgMobile className="absolute left-0 top-0 right-0 tab:hidden block z-[1]" />
      <div className="relative z-10 h-full w-full flex flex-col justify-center items-center flex-grow gap-4 p-4 tab:max-w-min mt-12">
        <div className="p-6 tab:p-[3.75rem] h-auto flex-none bg-muted-100 rounded-lg w-full flex justify-center">
          <ErrorBox networkName={capitalize(network.displayName)} />
        </div>
        <div className="p-2 w-full bg-muted-100 rounded-lg text-sm">
          The&nbsp;
          <strong className="font-medium">
            {capitalize(network.brandName)} {capitalize(network.displayName)}
          </strong>
          &nbsp; network could not be reached. Please try again later.
        </div>
      </div>

      <Footer className="pb-5" />
    </div>
  );
}
