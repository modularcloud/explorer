import { useState, forwardRef } from "react";
import * as Select from "@radix-ui/react-select";

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
  const dropdownHover =
    mode === "dark"
      ? "hover:bg-black-50 focus:bg-black-50"
      : "hover:bg-gray-100 focus:bg-gray-100";

  return (
    <div className={`rounded-lg flex shadow`}>
      <Select.Root>
        <Select.Trigger
          className="flex items-center justify-center w-1/4 p-2 focus:outline-none"
          aria-label="Food"
        >
          <Select.Value placeholder="Maraki" />
          <Select.Icon className="SelectIcon">
            {/* <ChevronDownIcon /> */}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-black border shadow rounded-lg mt-2 w-100">
            <Select.Viewport className="p-1">
              {optionGroups.map((grp, index) => (
                <Select.Group key={index}>
                  <Select.Label className="bg-gray-50 p-2">
                    {grp.label}
                  </Select.Label>
                  {grp.options.map((opt, idx) => (
                    <Select.Item className="p-2" key={idx} value={opt.value}>
                      {opt.name}
                    </Select.Item>
                  ))}
                </Select.Group>
              ))}
              <Select.Separator className="SelectSeparator" />
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <input
        className={`w-full rounded-r-lg p-2 focus:outline-none`}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
