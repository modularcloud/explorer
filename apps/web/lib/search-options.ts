import { Whitelabel } from "./whitelabel";
export const SearchOptions = Whitelabel === "dymension" ? [
    {
        label: "Dymension",
        options: [
            {
                name: "Hub",
                value: "hub",
            },
            {
                name: "RollApp X",
                value: "rollappx",
            },
        ],
    },
    {
        label: "Celestia",
        options: [
            {
                name: "Mocha",
                value: "celestia-mocha",
            },
        ],
    },
] : [
    {
        label: "Celestia",
        options: [
            {
                name: "Mocha",
                value: "MCA",
            },
        ],
    },
    {
        label: "Dymension",
        options: [
            {
                name: "Hub",
                value: "dymension-hub",
            },
            {
                name: "RollApp X",
                value: "dymension-rollappx",
            },
        ],
    },
];