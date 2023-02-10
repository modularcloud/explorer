import { useState, forwardRef } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

interface Props {
  mode: "light" | "dark";
  placeholder: string;
  optionGroups: {
    label: string;
    options: {
      name: string;
      value: string;
    }[];
  }[];
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

export const SearchInput = ({
  mode = "light",
  placeholder = "Go to hash or height",
  optionGroups = dataGroups,
}: Props) => {
  const backgroundStyle =
    mode === "dark"
      ? "bg-gradient-accent pt-0.5 focus-within:bg-gradient-secondary focus-within:p-0.5"
      : "border border-gray-10 hover:shadow-md hover:border-gray-50 focus-within:border-2 focus-within:border-primary-30 focus:border-primary-30 focus:ring-primary-30 focus:shadow-input-shadow";

  const generalStyle = mode === "dark" ? "bg-black-30 text-white" : "";

  return (
    <div className={clsx("rounded-lg flex shadow", {})}>
      <Select.Root>
        <Select.Trigger
          className={clsx(
            "flex items-center justify-center p-2 sm:px-4 focus:outline-none rounded-l-lg border-r font-bold",
            {
              "border-r-mid-dark-900 bg-mid-dark hover:bg-night-900 focus:bg-night-900 text-white":
                mode === "dark",
              "border-r-gray-300 hover:bg-gray-100 focus:bg-gray-100":
                mode === "light",
            }
          )}
          aria-label="SearchType"
        >
          <Select.Value placeholder="Mamaki" />
          <Select.Icon className="ml-2">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={clsx(
              "shadow rounded-lg overflow-auto w-inherit max-h-[150px] w-[var(--radix-select-trigger-width)]",
              {
                "bg-mid-dark text-white": mode === "dark",
                "border ": mode === "light",
              }
            )}
            position="popper"
            sideOffset={5}
          >
            <Select.ScrollUpButton />
            <Select.Viewport className="">
              {optionGroups.map((grp, index) => (
                <Select.Group key={index}>
                  <Select.Label
                    className={clsx("font-bold p-2 py-2.5", {
                      "bg-gray-100 border-b border-b-gray-400":
                        mode === "light",
                      "border-b border-b-mid-dark-900": mode === "dark",
                    })}
                  >
                    {grp.label}
                  </Select.Label>
                  {grp.options.map((opt, idx) => (
                    <Select.Item
                      className="p-1.5 px-3 focus:outline-none hover:text-ocean cursor-pointer"
                      key={idx}
                      value={opt.value}
                    >
                      {opt.name}
                    </Select.Item>
                  ))}
                </Select.Group>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <input
        className={clsx("w-full rounded-r-lg p-2 focus:outline-none", {
          "bg-mid-dark hover:bg-night-900 text-white": mode === "dark",
        })}
        type="text"
        placeholder={placeholder}
      />

      <button
        className={clsx("p-2 px-2.5 text-gray border-l", {
          "border-l-gray-300": mode === "light",
          "border-r-gray-300": mode === "dark",
        })}
      >
        <MagnifyingGlassIcon />
      </button>
    </div>
  );
};
