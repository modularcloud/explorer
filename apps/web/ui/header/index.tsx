import "server-only";
import { BrandedLogo } from "./branded-logo";
import { HeaderSearchButton } from "./header-search-button";

export async function Header() {
  return (
    <header className="flex justify-between items-center border gap-4 shadow-sm bg-white rounded-xl tab:py-4 py-3.5 px-3.5 w-full">
      <BrandedLogo />
      <HeaderSearchButton>
        <span className="text-muted text-xs">Explore</span>
        <kbd className="px-1 border border-mid-dark-100 bg-muted-100 rounded-md inline-block flex-none">
          /
        </kbd>
      </HeaderSearchButton>
      <div className="hidden md:block"></div>
    </header>
  );
}
