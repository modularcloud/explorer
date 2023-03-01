import { CELESTIA_MOCHA, DYMENSION_HUB, DYMENSION_ROLLAPP_X } from "./network-names";
import { Whitelabel } from "./whitelabel";
export const getSearchOptions = async () => {
    if(Whitelabel === "dymension") {
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
    } else if(Whitelabel === "nautilus") {
        return [
            {
                label: "Eclipse",
                options: [
                    {
                        name: "Triton",
                        value: "Triton"
                    }
                ]
            }
        ]
    } else {
        return [
            {
                label: "Celestia",
                options: [
                    {
                        name: "Mocha",
                        value: CELESTIA_MOCHA,
                    },
                ],
            },
            {
                label: "Eclipse",
                options: await fetch(process.env.ADD_NETWORK_ENDPOINT + "/chain-config").then((res) => res.json()).then((json) => json.result.map((network: any) => { return { name: network.name, value: network.name } }))
            },
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
        ];
    }
}