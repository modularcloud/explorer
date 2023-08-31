import { BigLogo } from "~/ui/big-logo";
import { Search } from "~/ui/search";
import { EXPLORER_CONFIG } from "~/config/explorers";
import { getSearchOptionGroups } from "~/lib/search-options";

import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: EXPLORER_CONFIG.homepageTitle,
    description: EXPLORER_CONFIG.homepageDescription,
    keywords: EXPLORER_CONFIG.homepageKeywords,
  };
}

export default async function HomePage() {
  const searchOptionGroups = await getSearchOptionGroups();
  return (
    <div className="flex flex-col items-center bg-specialty-gray bg-[url('/images/home-bg.svg')] bg-center bg-no-repeat min-h-screen">
      <div className="flex flex-col items-center justify-center w-full space-y-10 xs:pt-40 pt-[12.5rem]">
        <BigLogo />
        <div className="w-full px-2 sm:max-w-[27.875rem]">
          <Search optionGroups={searchOptionGroups} />
        </div>
      </div>
    </div>
  );
}

export const runtime = "edge";
