import React from "react";
import clsx from "clsx";
import { SearchInput } from "../../components";
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

export const Homepage = ({ mode }: Props) => {
  return (
    <div
      className={clsx(
        "container flex flex-col items-center justify-center mx-auto min-h-screen",
        {
          "text-white bg-night": mode === "dark",
          "bg-gray-100": mode === "light",
        }
      )}
    >
      <main className="flex flex-col items-center w-full">
        <span className="bg-gradient-to-r from-ocean to-royal bg-clip-text font-bold text-transparent">
          Modular Cloud
        </span>
        <h1
          className={clsx("my-2.5 text-4xl sm:text-5xl font-black", {
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
        <div className="mt-5 w-full xl:w-2/5 lg:w-3/6 md:w-4/6 sm:w-4/5">
          <SearchInput
            mode={mode}
            placeholder="Go to hash or height"
            optionGroups={dataGroups}
          />
        </div>
      </main>
      <footer className="text-center absolute bottom-0">
        <span className="text-slate-900">
          @Copyright 2022. All rights reserved.
        </span>
        <div className="flex flex-row justify-around py-6">
          <a>About</a>
          <a>Terms</a>
          <a>Policy</a>
        </div>
      </footer>
    </div>
  );
};
