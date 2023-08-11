import { getNetworkBySlug } from "../../../../../config/networks";
import { Sidebar } from "../../../../../ecs/components/sidebar";
import { Value } from "../../../../../schemas/value";
import { RightPanel } from "../../../../../ui/right-panel/component";

interface Props {
  params: { network: string };
}

const VMDisplayNames = {
  evm: "Ethereum Virtual Machine",
  cosmos: "Cosmos SDK",
};

export default async function RightPanelPage({ params }: Props) {
  const network = getNetworkBySlug(params.network);
  if (!network) return null;
  const alt = network.searchOptionGroup; // TODO: add logo alt text to config schema
  const attributes: Record<string, Value> = {};
  for (const [key, value] of Object.entries(network.stack)) {
    attributes[key] = {
      type: "standard",
      payload: value,
    };
  }
  const data: Sidebar = {
    logo: network.logoUrl,
    entityTypeName: "Network",
    entityId: network.isTestnet
      ? `${network.displayName} Testnet`
      : network.displayName,
    attributesHeader: "Network Information",
    attributes,
  };

  return (
    // @ts-expect-error Async Server Component
    <RightPanel
      data={data}
      alt={alt}
      className="sticky top-0 hidden w-80 shrink-0 lg:flex xl:w-[27.875rem]"
    />
  );
}

export const runtime = "edge";
