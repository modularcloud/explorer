import { FetchLoadArgs } from "~/lib/utils";
import { Header } from "~/ui/header";

export default function BlockLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Pick<FetchLoadArgs, "network">;
}) {
  return (
    <main className="min-h-screen flex flex-col h-full">
      <Header networkSlug={params.network} />
      {children}
    </main>
  );
}

export const runtime = "edge";
