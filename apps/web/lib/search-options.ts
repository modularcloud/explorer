import { slugify } from "service-manager";
import {
  CELESTIA_MOCHA,
  DYMENSION_HUB,
  DYMENSION_ROLLAPP_X,
} from "./network-names";
import { Whitelabel } from "./whitelabel";
export const getSearchOptions = async () => {
  if (Whitelabel === "dymension") {
    return [
      {
        label: "Dymension",
        options: [
          {
            name: "Hub",
            value: DYMENSION_HUB,
          },
          {
            name: "RollApp X",
            value: DYMENSION_ROLLAPP_X,
          },
        ],
      },
      {
        label: "Celestia",
        options: [
          {
            name: "Mocha",
            value: CELESTIA_MOCHA,
          },
        ],
      },
    ];
  } else {
    return [
      ...(Whitelabel === "dev"
        ? [
            {
              label: "Caldera",
              options: [
                {
                  name: "Caldera",
                  value: "caldera",
                },
              ],
            },
            {
              label: "Dymension",
              options: [
                ...(await fetch(
                  process.env.ADD_NETWORK_ENDPOINT + "/chain-config",
                )
                  .then((res) => res.json())
                  .then((json) =>
                    json.result
                      .filter(
                        (network: any) =>
                          network.id.toLowerCase() === "rollapp1",
                      )
                      .map((network: any) => {
                        return {
                          name: network.name,
                          value: slugify(network.name),
                        };
                      }),
                  )),
                {
                  name: "Hub",
                  value: DYMENSION_HUB,
                },
                {
                  name: "RollApp X",
                  value: DYMENSION_ROLLAPP_X,
                },
              ],
            },
            {
              label: "Dev",
              options: [
                {
                  name: "Ethereum",
                  value: "Ethereum",
                },
                {
                  name: "Solana",
                  value: "Solana",
                },
              ],
            },
            {
              label: "Eclipse",
              options: await fetch(
                process.env.ADD_NETWORK_ENDPOINT + "/chain-config",
              )
                .then((res) => res.json())
                .then((json) =>
                  json.result
                    .filter(
                      (network: any) => network.id.toLowerCase() !== "rollapp1",
                    )
                    .map((network: any) => {
                      return {
                        name: network.name,
                        value: slugify(network.name),
                      };
                    }),
                ),
            },
          ]
        : []),
      {
        label: "Celestia",
        options: [
          {
            name: "Mocha",
            value: CELESTIA_MOCHA,
          },
        ],
      },
    ];
  }
};
