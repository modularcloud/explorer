import { getNetworkBySlug } from "../../../../config/networks";
import { Sidebar } from "../../../../ecs/components/sidebar";
import { getWhitelabel } from "../../../../lib/utils";
import { RightPanel } from "../../../../ui/right-panel/component";

const VMDisplayNames = {
  evm: "Ethereum Virtual Machine",
  cosmos: "Cosmos SDK",
};

export default async function RightPanelPage() {
  const whitelabel = getWhitelabel();
  const network = getNetworkBySlug(whitelabel.defaultNetwork);
  if (!network) return null;
  const alt = network.searchOptionGroup; // TODO: add logo alt text to config schema
  const data: Sidebar = {
    logo: network.logoUrl,
    entityTypeName: "Network",
    entityId: network.isTestnet
      ? `${network.displayName} Testnet`
      : network.displayName,
    attributesHeader: "Network Information",
    attributes: {
      Execution: {
        type: "standard",
        payload: VMDisplayNames[network.vm],
      },
      // "Data Availability": {
      //   type: "standard",
      //   payload: "Celestia",
      // },
    },
  };

  return (
    // @ts-expect-error Async Server Component
    <RightPanel
      data={data}
      alt={alt}
      className="shrink-0 sticky top-0 hidden lg:flex w-80 xl:w-[27.875rem]"
    />
  );
}
