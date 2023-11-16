import { getAllNetworksCached } from "./network";
import type { OptionGroups, SearchOption } from "./shared-utils";

/**
 * Transform the list of integrations to a `searchOptions` object
 * which is just a list of chains grouped by name.
 * @returns `{ [brand]: [ {chain1}, {chain2}, {chain3} ] }`
 */
export async function getSearchOptionGroups(): Promise<OptionGroups> {
  const integrations = await getAllNetworksCached();

  const optionGroups = integrations.reduce((acc, currentValue) => {
    const brand = currentValue.chainBrand;

    let helpText;
    switch (currentValue.chainBrand) {
      case "celestia":
        helpText = 'Search blocks, transactions, addresses, or namespaces';
        break;
      default:
        helpText = 'Search blocks, transactions, or addresses';
    }
  
    const newOption = {
      brandColor: currentValue.config.primaryColor,
      layout: currentValue.config.widgetLayout,
      verified: currentValue.paidVersion,
      displayName: currentValue.chainName,
      id: currentValue.slug,
      brandName: currentValue.chainBrand,
      logoURL: currentValue.config.logoUrl,
      helpText: helpText,
    } satisfies SearchOption;
    if (acc[brand]) {
      if (currentValue.chainName === "mainnet") {
        acc[brand].unshift(newOption);
      } else {
        acc[brand].push(newOption);
      }
    } else {
      acc[brand] = [newOption];
    }

    return acc;
  }, {} as OptionGroups);

  return optionGroups;
}
