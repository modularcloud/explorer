export type ShortenedResourcePath = {
  network: string;
  type: string;
};

const TYPE_MAP: Record<string, string> = {
  tx: "transaction",
  address: "account",
};

export function mapTypes(
  params: ShortenedResourcePath,
  defaultNetwork: string,
) {
  const { network: type, type: query } = params;
  return {
    network: defaultNetwork,
    type: TYPE_MAP[type] || type,
    query,
  };
}
