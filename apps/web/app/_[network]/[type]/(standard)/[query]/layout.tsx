import { ViewContextProvider } from "~/ui/view-context";
// import { Header } from "~/ui/header";
import type { FetchLoadArgs } from "~/lib/utils";

type Props = {
  params: FetchLoadArgs;
  children: React.ReactNode;
};

export default async function EntityLayout({ params, children }: Props) {
  return (
    <ViewContextProvider resourcePath={params}>
      {/* <Header resourcePath={params} /> */}
      {children}
    </ViewContextProvider>
  );
}

export const dynamic = "force-dynamic";
