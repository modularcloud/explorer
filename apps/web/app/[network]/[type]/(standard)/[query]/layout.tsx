import { FetchLoadArgs } from "../../../../../lib/utils";
import { ViewContextProvider } from "../../../../../ui/view-context";
import { Header } from "../../../../../ui/header";

type Props = {
  params: FetchLoadArgs;
  children: React.ReactNode;
};

export default async function EntityLayout({ params, children }: Props) {
  return (
    // @ts-expect-error Async Server Component
    <ViewContextProvider resourcePath={params}>
      <Header resourcePath={params} />
      {children}
    </ViewContextProvider>
  );
}

export const dynamic = "force-dynamic";
