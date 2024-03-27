import { Header } from "~/ui/header";
import { HideBodyOverflow } from "~/ui/hide-body-overflow";
import { getSingleNetwork } from "~/lib/network";
import { cn } from "~/ui/shadcn/utils";
import { DEFAULT_BRAND_COLOR } from "~/lib/constants";
import type { HeadlessRoute } from "~/lib/headless-utils";

export default async function BlockLayout({
  children,
  params,
  rightpanel,
}: {
  children: React.ReactNode;
  rightpanel: React.ReactNode;
  params: Pick<HeadlessRoute, "network">;
}) {
  const network = await getSingleNetwork(params.network);

  return (
    <main
      className="min-h-screen flex flex-col h-full"
      style={{
        "--color-primary": network?.config.primaryColor ?? DEFAULT_BRAND_COLOR,
        "--gradient-primary": network?.config.cssGradient,
      }}
    >
      <HideBodyOverflow />

      <Header networkSlug={params.network} />

      <div className="grid lg:grid-cols-6">
        <div
          id="main-content"
          tabIndex={0}
          className={cn(
            "mt-[calc(var(--header-size)+var(--titlebar-size))] bg-white min-h-screen",
            // style children but not the header nav
            "[&>*:not(nav)]:bg-white col-span-6",
          )}
        >
          {children}
        </div>

        {/* Down gradient  */}
        <div className="fixed w-full bottom-0 z-30 left-0 h-10 !bg-gradient-to-b !rounded-none from-transparent bg-transparent to-mid-dark-100" />
        {rightpanel}
      </div>
    </main>
  );
}

export const runtime = "edge";
