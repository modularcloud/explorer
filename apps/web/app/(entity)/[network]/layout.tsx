// components
import { Header } from "~/ui/header";
import { HideBodyOverflow } from "~/ui/hide-body-overflow";
import { RQTableProvider } from "~/ui/entity/table/table-provider";

// utils
import { getSingleNetworkCached } from "~/lib/network";
import { cn } from "~/ui/shadcn/utils";

// types
import { HeadlessRoute } from "~/lib/headless-utils";

export default async function BlockLayout({
  children,
  params,
  rightpanel,
}: {
  children: React.ReactNode;
  rightpanel: React.ReactNode;
  params: Pick<HeadlessRoute, "network">;
}) {
  const network = await getSingleNetworkCached(params.network);

  return (
    <RQTableProvider>
      <main
        className="min-h-screen flex flex-col h-full"
        style={{
          // @ts-expect-error this is a CSS variable
          "--color-primary": network?.config.primaryColor,
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
              "mt-[65px] bg-white min-h-screen",
              // style children but not the header nav
              "[&>*:not(nav)]:bg-white col-span-6",
            )}
          >
            {children}
          </div>

          {/* Down gradient  */}
          <div className="fixed w-full bottom-0 z-30 left-0 h-10 !bg-gradient-to-b !rounded-none from-transparent bg-transparent to-mid-dark-100" />
          {rightpanel && (
            <aside
              className={cn(
                // the height of the sidebar is the total height of the screen - the height of the <Header /> component
                "h-[calc(100vh_-_theme('spacing.header'))] w-[27rem]",
                "bg-muted-100 hidden lg:block",
                "fixed top-[63px] bottom-0 right-0",
                "overflow-hidden z-40",
              )}
            >
              {rightpanel}
            </aside>
          )}
        </div>
      </main>
    </RQTableProvider>
  );
}

export const runtime = "edge";
