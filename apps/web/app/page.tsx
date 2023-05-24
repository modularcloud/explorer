import { Metadata } from "next";
import { getWhitelabel } from "../lib/utils";
import { BigLogo } from "../ui/big-logo";
import { Footer } from "../ui/footer";
import { Search } from "./[network]/[type]/(standard)/[query]/[section]/(components)/search";

const whitelabel = getWhitelabel();
export const metadata: Metadata = {
  title: `${whitelabel.metadata.title} by Modular Cloud`,
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-specialty-gray bg-[url('/images/home-bg.svg')] bg-center bg-no-repeat min-h-screen">
      <div className="flex flex-col items-center justify-center w-full space-y-10 xs:pt-40 pt-[12.5rem]">
        {/* @ts-expect-error Async Server Component */}
        <BigLogo />
        <div className="sm:w-[27.875rem] xs:w-[20.4375rem] w-11/12">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
