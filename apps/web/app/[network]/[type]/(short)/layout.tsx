import EntityLayout from "../(standard)/[query]/[[...viewPath]]/layout";
import { getWhitelabel } from "../../../../lib/utils";
import { mapTypes, ShortenedResourcePath } from "./helpers";

type Props = {
  params: ShortenedResourcePath;
  children: React.ReactNode;
};

export default async function ShortEntityLayout({ params, children }: Props) {
  const whitelabel = getWhitelabel();
  return (
    // @ts-expect-error Async Server Component
    <EntityLayout params={mapTypes(params, whitelabel.defaultNetwork)}>
      {children}
    </EntityLayout>
  );
}
