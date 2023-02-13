import React, { useState } from "react";
import clsx from "clsx";
import { SearchInput, Footer, LatestBlock, BigLogo } from "../../components";

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

export const Homepage: React.FC<Props> = ({ mode = "light" }) => {
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
          "bg-gray-100 bg-no-repeat bg-top": mode === "light",
        }
      )}
    >
      <main className="container flex flex-col items-center justify-center w-full">
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
        <a href="/">
          <LatestBlock block={258306} />
        </a>
      </main>
      <Footer />
    </div>
  );
};
