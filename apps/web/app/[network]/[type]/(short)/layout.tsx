import EntityLayout from "../(standard)/[query]/[[...viewPath]]/layout";
import { getWhitelabel } from "../../../../lib/utils";

export type ShortenedResourcePath = {
  network: string;
  type: string;
};
type Props = {
  params: ShortenedResourcePath;
  children: React.ReactNode;
};

const TYPE_MAP: Record<string, string> = {
  tx: "transaction",
  address: "account",
};

export function mapTypes(
  params: ShortenedResourcePath,
  defaultNetwork: string
) {
  const { network: type, type: query } = params;
  return {
    network: defaultNetwork,
    type: TYPE_MAP[type] || type,
    query,
  };
}

export default async function ShortEntityLayout({ params, children }: Props) {
  const whitelabel = getWhitelabel();
  return (
    // @ts-expect-error Async Server Component
    <EntityLayout params={mapTypes(params, whitelabel.defaultNetwork)}>
      {children}
    </EntityLayout>
  );
}
