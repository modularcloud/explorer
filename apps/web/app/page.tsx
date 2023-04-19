import { Metadata } from "next";
import { getWhitelabel } from "../lib/utils";
import { BigLogo } from "../ui/big-logo";
import { Footer } from "../ui/footer";
import { Search } from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/search";

const whitelabel = getWhitelabel();

export const metadata: Metadata = {
  title: `${whitelabel.name.join("")} by Modular Cloud`,
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-specialty-gray bg-[url('/images/home-bg.svg')] bg-center bg-no-repeat min-h-screen">
      <div className="flex flex-col items-center justify-center w-full space-y-10 xs:pt-40 pt-[12.5rem]">
        {/* @ts-expect-error Async Server Component */}
        <BigLogo />
        <div className="w-[27.875rem]">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
