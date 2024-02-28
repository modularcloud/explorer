import "server-only";
import { BrandedLogo } from "./branded-logo";
import { HeaderSearchButton } from "./header-search-button";
import { TokenPrices } from "~/ui/token-prices";
import { cn } from "~/ui/shadcn/utils";
import { ShortcutKey } from "~/ui/shortcut-key";

export async function Header() {
  return (
    <header
      className={cn(
        "flex justify-between items-center border gap-4 shadow-sm bg-white rounded-xl tab:py-4 py-3.5 px-3.5 w-full",
        "relative",
        "sticky top-4 z-50",
      )}
    >
      <BrandedLogo />
      <HeaderSearchButton className="md:absolute left-1/2 top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <span className="text-muted text-xs">Explore</span>
        <ShortcutKey command="/" />
      </HeaderSearchButton>
      <div className="hidden tab:block">
        <TokenPrices />
      </div>
    </header>
  );
}
