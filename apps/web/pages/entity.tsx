import React, { useState } from "react";
import {
  TopBar,
  Header,
  RightPanel,
  KeyValueList,
  EntityDetails,
  SearchInput,
  Table
} from "@modularcloud/design-system";

import { CubesOff } from "@modularcloud/design-system";

const entriesData: [string, string][] = [
  ["1", "Mamaki 5411"],
  ["2", "4"],
  ["3", "245588"],
  ["4", "245588"],
  ["5", "Oct 1, 2022 at 4:09:00 PM"],
  ["6", "8.09/19.98"],
  ["7", "1225"],
  ["8", "Liam Scales"],
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
    <KeyValueList header="Block Information" entries={entriesData} />
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
        <Table />
      </div>
      <EntityPanel classes="hidden lg:flex" />
    </div>
  );
}
