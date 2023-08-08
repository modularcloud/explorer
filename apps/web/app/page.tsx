import { getWhitelabel } from "../lib/utils";
import { BigLogo } from "../ui/big-logo";
import { Footer } from "../ui/footer";
import { Stats } from "../ui/stats";
import { Search } from "../ui/search";
import { EXPLORER_CONFIG } from "../config/explorers";
import { Metadata } from "next";

const whitelabel = getWhitelabel(); // TODO: deprecate
const {
  homepageTitle,
  homepageDescription,
  homepageKeywords,
  id: explorerId,
} = EXPLORER_CONFIG;

export function generateMetadata(): Metadata {
  return {
    title: homepageTitle,
    description: homepageDescription,
    keywords: homepageKeywords,
  };
}
export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-specialty-gray bg-[url('/images/home-bg.svg')] bg-center bg-no-repeat min-h-screen">
      <div className="flex flex-col items-center justify-center w-full space-y-10 xs:pt-40 pt-[12.5rem]">
        {/* @ts-expect-error Async Server Component */}
        <BigLogo />
        <div className="w-full px-2 sm:max-w-[27.875rem]">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
      </div>
    </div>
  );
}

export const runtime = "edge";
