import { Metadata } from "next";
import EntityPage, {
  generateMetadata as _generateMetadata,
} from "~/app/[network]/[type]/(standard)/[query]/page";
import { ShortenedResourcePath, mapTypes } from "./helpers";
import { getAllNetworks } from "~/lib/network";

type Props = {
  params: ShortenedResourcePath;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const allNetWorks = await getAllNetworks();
  return _generateMetadata({
    params: mapTypes(props.params, allNetWorks[0].slug),
  });
}

export default async function ShortEntityPage(props: Props) {
  const allNetWorks = await getAllNetworks();
  return <EntityPage params={mapTypes(props.params, allNetWorks[0].slug)} />;
}

export const runtime = "edge";
