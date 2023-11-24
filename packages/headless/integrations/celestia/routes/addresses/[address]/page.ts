import { Page, PageContext } from "../../../../../schemas/page";
import { createResolver } from "core";
import { PaginationContext } from "../../../../../schemas/context";
import { getDefaultSidebar } from "../../../../../helpers";
import { Standard } from "../../../utils/values";

export const CelestiaAddressBalancesResolver = createResolver(
  {
    id: "celestia-address-balances-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async ({
    address,
    context,
  }: {
    address: string;
    context: PageContext & PaginationContext;
  }) => {
    let id = "7";
    if (context.chainName.indexOf("mocha") !== -1) {
      id = "6";
    }
    if (context.chainName.indexOf("arabica") !== -1) {
      id = "5";
    }
    type api = {
      result: {
        balances: {
          available: string;
          delegated: string;
          unbonding: string;
          reward: string;
        };
      };
    };
    
    const response = await fetch(
      `${process.env.NAMESPACE_ENDPOINT}/${id}/acc-address/${address}/balances`,
    );
    const data: api = await response.json();

    const page: Page = {
      context,
      metadata: {
        title: `Address ${address}`,
        description: `See the balance of namespace ${address} on ${context.chainBrand} ${context.chainName}`,
      },
      body: {
        type: "notebook",
        properties: {
          Available: Standard(data.result.balances.available),
          Delegated: Standard(data.result.balances.delegated),
          Unbonding: Standard(data.result.balances.unbonding),
          Reward: Standard(data.result.balances.reward),
        },
      },
      sidebar: getDefaultSidebar("Address", address, "Balances"),
      tabs: [
        {
          text: "Balances",
          route: ["addresses", address],
        },
        {
          text: "Transactions",
          route: ["addresses", address, "transactions"],
        },
      ],
    };
    return page;
  },
  [],
);
