import {
  CELESTIA_MOCHA,
  DYMENSION_HUB,
  DYMENSION_ROLLAPP_X,
  SOLANA_HUB,
} from './network-names';
import { Whitelabel } from './whitelabel';

export const SearchOptions = Whitelabel === "dymension" ? [
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
    {
      label: "Solana",
      options: [
        {
          name: "Solana",
          value: SOLANA_HUB,
        }
      ]
    }
] : [
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
      label: "Solana",
      options: [
        {
          name: "Solana",
          value: SOLANA_HUB,
        }
      ]
    },
];