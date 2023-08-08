import { Metadata } from "next";
import EntityPage, {
  generateMetadata as _generateMetadata,
} from "../(standard)/[query]/page";
import { getWhitelabel } from "../../../../lib/utils";
import { ShortenedResourcePath, mapTypes } from "./helpers";

type Props = {
  params: ShortenedResourcePath;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const whitelabel = getWhitelabel();
  return _generateMetadata({
    params: mapTypes(props.params, whitelabel.defaultNetwork),
  });
}

export default async function ShortEntityPage(props: Props) {
  const whitelabel = getWhitelabel();
  return (
    // @ts-expect-error Async Server Component
    <EntityPage params={mapTypes(props.params, whitelabel.defaultNetwork)} />
  );
}

export const runtime = "edge";
