import React, { useState } from "react";
import clsx from "clsx";
import { SearchInput, Footer, LatestBlock } from "@modularcloud/design-system";
// import bgLight from "./img/";

interface Props {
  mode: "light" | "dark";
}

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
  {
    label: "Celestia2",
    options: [
      {
        name: "Mamaki2",
        value: "MMK2",
      },
      {
        name: "Mocha2",
        value: "MCA2",
      },
      {
        name: "Arabic2",
        value: "ARB2",
      },
    ],
  },
];

export const Homepage: React.FC<Props> = ({ mode }) => {
  const [selectedItem, setSelectedItem] = useState(
    dataGroups[0].options[0].value
  );

  const handleSelect = (selectedItem: React.SetStateAction<string>) => {
    setSelectedItem(selectedItem);
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center mx-auto min-h-screen p-2",
        {
          "text-white bg-night": mode === "dark",
          "bg-gray-100": mode === "light",
        }
      )}
    >
      <main className="container flex flex-col items-center w-full">
        <span className="bg-gradient-to-r from-ocean to-royal bg-clip-text font-bold text-transparent">
          Modular Cloud
        </span>
        <h1
          className={clsx("text-4xl sm:text-5xl font-bold mt-2.5", {
            "text-white": mode === "dark",
          })}
        >
          Celestia
          <span
            className={clsx("font-bold", {
              "text-white": mode === "dark",
              "bg-gradient-to-r from-ocean to-royal bg-clip-text text-transparent":
                mode === "light",
            })}
          >
            Scan
          </span>
        </h1>
        <div className="w-full xl:w-2/5 lg:w-3/6 md:w-4/6 sm:w-4/5 mt-6">
          <SearchInput
            mode={mode}
            placeholder="Go to hash or height"
            optionGroups={dataGroups}
            selectedItem={selectedItem}
            selectHandler={handleSelect}
          />
        </div>
        <LatestBlock block={258306} />
      </main>
      <Footer />
    </div>
  );
};
