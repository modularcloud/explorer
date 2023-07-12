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
    <div className="bg-specialty-gray flex min-h-screen flex-col items-center bg-[url('/images/home-bg.svg')] bg-top  bg-no-repeat">
      <div className="md:pt-18 tab:pt-28 flex w-full flex-1 flex-col items-center justify-start space-y-10 pt-6 sm:pt-14">
        {/* @ts-expect-error Async Server Component */}
        <BigLogo />
        <div className="w-full px-2 sm:max-w-[27.875rem]">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
      </div>
      {/* @ts-expect-error Async Server Component */}
      {explorerId === "nautilus" /* || explorerId === "proteus" */ ? <Stats extended={true} /> : null}
      <Footer />
    </div>
  );
}

export const dynamic = "force-dynamic";
