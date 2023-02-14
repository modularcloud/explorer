import React, { useState } from "react";
import {
  TopBar,
  Header,
  RightPanel,
  EntityDetails,
  SearchInput,
  KeyValueList,
  Card,
  CardList,
} from "@modularcloud/design-system";

import { CubesOff } from "@modularcloud/design-system";

const entryLabels = [
  "Chain ID",
  "Transactions",
  "Height",
  "Block time",
  "Block time",
  "Gas (used/wanted)",
  "Block Round",
  "Transactions",
];

const entriesData: [string, string][] = [
  ["1212", "Mamaki 5411"],
  ["2323", "4"],
  ["3434", "245588"],
  ["4545", "245588"],
  ["5656", "Oct 1, 2022 at 4:09:00 PM"],
  ["6767", "8.09/19.98"],
  ["7878", "1225"],
  ["8989", "Liam Scales"],
];

const transactionLabels = [
  "Index",
  "Chain ID",
  "Height",
  "Status",
  "Block time",
  "Time",
  "Fee",
  "Gas",
  "Messages",
];

const transactionData: [string, string][] = [
  ["ffv", "1"],
  ["aee", "Mamaki"],
  ["vbx", "245588"],
  ["wef", "Failed"],
  ["ghf", "Oct 1, 2022 at 4:09:00 PM"],
  ["qqw", "8.09/19.98"],
  ["qwe", "1225"],
  ["sdf", "4"],
];

const dataGroups = [
  {
    label: "Celestia",
    options: [
      {
        name: "Mamaki",
        value: "MMK",
      },
      {
        name: "Mocha",
        value: "MCA",
      },
      {
        name: "Arabic",
        value: "ARB",
      },
    ],
  },
];

interface PanelProps {
  classes: string;
}

const EntityPanel = ({ classes }: PanelProps) => (
  <RightPanel className={classes}>
    <EntityDetails
      iconType={<CubesOff />}
      type="Block"
      hash="0xE9A41C60FA1DCBA5B9CE560325FDB6F456464"
    />
    <KeyValueList
      header="Block Information"
      entryLabels={entryLabels}
      entries={entriesData}
    />
  </RightPanel>
);

export default function Entity() {
  const [selectedItem, setSelectedItem] = useState(
    dataGroups[0].options[0].value
  );

  const handleSelect = (selectedItem: React.SetStateAction<string>) => {
    setSelectedItem(selectedItem);
  };

  return (
    <div className="flex">
      <div className="grow">
        <div className="lg:hidden">
          <TopBar />
        </div>
        <Header
          searchInput={
            <SearchInput
              mode="light"
              placeholder="Go to hash or height"
              optionGroups={dataGroups}
              selectedItem={selectedItem}
              selectHandler={handleSelect}
            />
          }
          panelContent={<EntityPanel classes="flex lg:hidden" />}
        />
        <CardList>
          <Card type="Transaction" badgeText="Get Reward" badgeIcon="reward">
            <KeyValueList
              entryLabels={transactionLabels}
              entries={transactionData}
            />
          </Card>
          <Card type="Transaction" badgeText="Get Reward" badgeIcon="reward">
            <KeyValueList
              entryLabels={transactionLabels}
              entries={transactionData}
            />
          </Card>
          <Card type="Transaction" badgeText="Get Reward" badgeIcon="reward">
            <KeyValueList
              entryLabels={transactionLabels}
              entries={transactionData}
            />
          </Card>
        </CardList>
      </div>
      <EntityPanel classes="hidden lg:flex" />
    </div>
  );
}
