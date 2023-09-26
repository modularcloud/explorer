import { getSingleNetworkCached } from "~/lib/network";
import { FetchLoadArgs } from "~/lib/utils";
import { Header } from "~/ui/header";
import { cn } from "~/ui/shadcn/utils";

export default async function BlockLayout({
  children,
  params,
  rightpanel,
}: {
  children: React.ReactNode;
  rightpanel: React.ReactNode;
  params: Pick<FetchLoadArgs, "network">;
}) {
  const network = await getSingleNetworkCached(params.network);
  return (
    <main
      className="min-h-screen flex flex-col h-full"
      style={{
        // @ts-expect-error this is a CSS variable
        "--color-primary": network!.config.primaryColor,
        "--gradient-primary": network!.config.cssGradient,
      }}
    >
      <Header networkSlug={params.network} />
      <div className="grid tab:grid-cols-6">
        <div
          id="main-content"
          className={cn(
            rightpanel ? "tab:col-span-4" : "col-span-6",
            "mt-[65px]",
          )}
        >
          {children}
        </div>

        {rightpanel && (
          <aside
            className={cn(
              "h-[calc(100vh-65px)] bg-muted-100 hidden tab:block w-1/3",
              "fixed top-[65px] bottom-0 right-0",
              "overflow-hidden",
            )}
          >
            {rightpanel}
          </aside>
        )}
      </div>
    </main>
  );
}

export const runtime = "edge";
