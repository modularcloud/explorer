import EntityLayout from "~/app/_[network]/[type]/(standard)/[query]/layout";
import { mapTypes, ShortenedResourcePath } from "./helpers";
import { getAllNetworksCached } from "~/lib/network";

type Props = {
  params: ShortenedResourcePath;
  children: React.ReactNode;
};

export default async function ShortEntityLayout({ params, children }: Props) {
  const allNetWorks = await getAllNetworksCached();
  return (
    <EntityLayout params={mapTypes(params, allNetWorks[0].slug)}>
      {children}
    </EntityLayout>
  );
}

export const dynamic = "force-dynamic";
