import React, { useState } from "react";
import clsx from "clsx";
import * as Select from "@radix-ui/react-select";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, CubesOn, SearchOff } from "../../icons";

interface Props {
  placeholder: string;
  optionGroups?: {
    label: string;
    options: {
      name: string;
      value: string;
    }[];
  }[];
  defaultSelected?: string;
  isOpen?: boolean;
  handleOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (network: string, term: string) => void;
  fixedOption?: string;
}

export const SearchInput = ({
  placeholder = "Go to hash or height",
  optionGroups,
  isOpen,
  handleOpen,
  onSearch,
  defaultSelected,
  fixedOption,
}: Props) => {
  const [option, setOption] = useState(
    (
      fixedOption ??
      defaultSelected ??
      optionGroups?.[0]?.options[0]?.value ??
      ""
    )
      .toLowerCase()
      .replace(" ", "-")
  );
  const [term, setTerm] = useState("");
  return (
    <Popover.Root open={isOpen} onOpenChange={handleOpen}>
      <Popover.Anchor>
        <div className="flex h-[2.125rem] border border-mid-dark-100 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)] rounded-lg w-full bg-white overflow-hidden">
          {!fixedOption ? (
            <Select.Root
              value={option}
              onValueChange={(value) => setOption(value)}
            >
              <Select.Trigger
                className="outline-none flex items-center justify-center h-full pl-4 py-[0.3125rem] pr-2 font-semibold flex-none border-r border-[#2C2C2C1A]"
                aria-label="SearchType"
              >
                <Select.Value
                  aria-label={option}
                  defaultValue={option}
                ></Select.Value>
                <Select.Icon>
                  <ChevronDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content position="popper" sideOffset={8}>
                  <div className="overflow-scroll h-[8.5rem] min-w-[10.5rem] overflow-auto bg-white rounded-lg border-mid-dark-100 shadow-[0px_12px_16px_rgba(42,43,46,0.14),0px_3px_6px_rgba(42,_43,_46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
                    <Select.Viewport>
                      {optionGroups?.map((grp, index) => (
                        <Select.Group key={index}>
                          <Select.Label className="font-semibold bg-gray/[.08] border-b border-slate-100 py-1 px-3">
                            {grp.label}
                          </Select.Label>
                          <div className="py-2 px-3 space-y-0.5">
                            {grp.options.map((opt, idx) => (
                              <Select.Item
                                className="outline-none hover:text-ocean cursor-pointer"
                                key={idx}
                                value={opt.value
                                  .toLowerCase()
                                  .replace(" ", "-")}
                              >
                                <Select.ItemText>{opt.name}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </div>
                        </Select.Group>
                      ))}
                    </Select.Viewport>
                  </div>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          ) : null}
          <input
            onChange={(event: any) => setTerm(event.target.value)}
            onKeyDown={(event: any) => {
              if (event.code === "Enter" || event.code === "NumpadEnter")
                onSearch(option, term);
            }}
            className="flex-1 placeholder:text-gray px-3 py-[0.3125rem] outline-none"
            type="text"
            placeholder={
              option.toLowerCase().match(/^hub$|dymension|rollapp|triton/)
                ? "Go to hash, height, or address"
                : placeholder
            }
          />
          <button
            onClick={() => onSearch(option, term)}
            className="px-3 flex items-center"
          >
            <SearchOff />
          </button>
        </div>
      </Popover.Anchor>
      <Popover.Content className="min-w-[90%]">
        <div className="flex flex-col justify-center items-center text-center p-5 border rounded-lg shadow-md bg-white mt-2 z-100 w-[300px] sm:w-auto">
          <div className="block py-3 m-auto">
            <CubesOn />
          </div>
          <span className="font-bold text-md">Not found.</span>
          <p className="flex flex-wrap text-slate my-2">
            Something went wrong - we could not find this result.
          </p>
          <span className="font-bold">Please try again.</span>
          <button className="border border-gray-200 p-2 px-3 rounded-full block sm:hidden">
            Try Again
          </button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
