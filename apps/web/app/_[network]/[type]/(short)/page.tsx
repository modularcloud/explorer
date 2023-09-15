import { Metadata } from "next";
import EntityPage, {
  generateMetadata as _generateMetadata,
} from "~/app/_[network]/[type]/(standard)/[query]/page";
import { ShortenedResourcePath, mapTypes } from "./helpers";
import { getAllNetworksCached } from "~/lib/network";

type Props = {
  params: ShortenedResourcePath;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const allNetWorks = await getAllNetworksCached();
  return _generateMetadata({
    params: mapTypes(props.params, allNetWorks[0].slug),
  });
}

export default async function ShortEntityPage(props: Props) {
  const allNetWorks = await getAllNetworksCached();
  return <EntityPage params={mapTypes(props.params, allNetWorks[0].slug)} />;
}

export const runtime = "edge";
