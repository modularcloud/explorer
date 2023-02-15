import React, { useState } from "react";
import clsx from "clsx";
import {
  SearchInput,
  Footer,
  LatestBlock,
  BigLogo,
} from "@modularcloud/design-system";
import Link from "next/link";

interface Props {
  mode: "light" | "dark";
}

const dataGroups = [
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
        value: "MMK2",
      },
      {
        name: "RollApp X",
        value: "MCA2",
      },
    ],
  },
];

export default function Homepage({ mode = "light" }: Props) {
  const [selectedItem, setSelectedItem] = useState(
    dataGroups[0].options[0].value
  );

  const handleSelect = (selectedItem: React.SetStateAction<string>) => {
    setSelectedItem(selectedItem);
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center mx-auto min-h-screen p-4",
        {
          "text-white bg-night": mode === "dark",
          "bg-gray-100 sm:bg-[url('/images/home-img-bg.png')] bg-no-repeat bg-top":
            mode === "light",
        }
      )}
    >
      <div className="container flex flex-col items-center justify-center w-full">
        <BigLogo mode={mode} />
        <div className="w-full xl:w-2/5 lg:w-3/6 md:w-4/6 sm:w-4/5 mt-6">
          <SearchInput
            mode={mode}
            placeholder="Go to hash or height"
            optionGroups={dataGroups}
            selectedItem={selectedItem}
            selectHandler={handleSelect}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
