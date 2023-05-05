import { getWhitelabel } from "../lib/utils";
import { BigLogo } from "../ui/big-logo";
import { Footer } from "../ui/footer";
import { Stats } from "../ui/stats";
import { Search } from "./[network]/[type]/(standard)/[query]/[[...viewPath]]/(components)/search";

const whitelabel = getWhitelabel();

export default function HomePage() {
  return (
    <div className="flex flex-col items-center bg-specialty-gray radial-check-bg  min-h-screen">
      <div className="flex flex-col items-center justify-center w-full space-y-10 pt-6 sm:pt-20 md:pt-24 tab:pt-32">
        {/* @ts-expect-error Async Server Component */}
        <BigLogo />
        <div className="w-full sm:max-w-[27.875rem] px-2">
          <Search optionGroups={whitelabel.searchOptions} />
        </div>
      </div>
      {/* @ts-expect-error Async Server Component */}
      <Stats extended={true} />
      <Footer />
    </div>
  );
}
