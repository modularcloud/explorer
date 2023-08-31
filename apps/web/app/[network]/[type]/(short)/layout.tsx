import EntityLayout from "~/app/[network]/[type]/(standard)/[query]/layout";
import { mapTypes, ShortenedResourcePath } from "./helpers";
import { getAllNetworks } from "~/lib/network";

type Props = {
  params: ShortenedResourcePath;
  children: React.ReactNode;
};

export default async function ShortEntityLayout({ params, children }: Props) {
  const allNetWorks = await getAllNetworks();
  return (
    <EntityLayout params={mapTypes(params, allNetWorks[0].slug)}>
      {children}
    </EntityLayout>
  );
}

export const dynamic = "force-dynamic";
