import { FetchLoadArgs } from "../../../../../lib/utils";
import { AssociatedViewContextProvider } from "../../../../../ui/associated/context";
import { Header } from "../../../../../ui/header";

type Props = {
  params: FetchLoadArgs;
  children: React.ReactNode;
};

export default async function EntityLayout({ params, children }: Props) {
  return (
    // @ts-expect-error Async Server Component
    <AssociatedViewContextProvider resourcePath={params}>
      <Header resourcePath={params} />
      {children}
    </AssociatedViewContextProvider>
  );
}

export const dynamic = "force-dynamic";
