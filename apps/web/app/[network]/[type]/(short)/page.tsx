import EntityPage from "../(standard)/[query]/[[...viewPath]]/page";
import { getWhitelabel } from "../../../../lib/utils";
import { ShortenedResourcePath, mapTypes } from "./helpers";

type Props = {
  params: ShortenedResourcePath;
};
export default async function ShortEntityPage(props: Props) {
  const whitelabel = getWhitelabel();
  return (
    // @ts-expect-error Async Server Component
    <EntityPage params={mapTypes(props.params, whitelabel.defaultNetwork)} />
  );
}
