import React from "react";
import clsx from "clsx";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface Props {
  mode: "light" | "dark";
  placeholder: string;
  optionGroups?: {
    label: string;
    options: {
      name: string;
      value: string;
    }[];
  }[];
  selectedItem?: string;
  selectHandler: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInput = ({
  mode = "light",
  placeholder = "Go to hash or height",
  optionGroups,
  selectedItem,
  selectHandler,
}: Props) => {
  return (
    <div
      className={clsx("flex shadow rounded-lg w-full", {
        "bg-gradient-accent pt-0.5 hover:shadow-sm focus-within:bg-gradient-secondary focus-within:p-0.5":
          mode === "dark",
        "bg-white border border-gray-400 hover:shadow-ocean-shadow focus-within:border focus-within:border-ocean-400 focus-within:shadow-ocean-shadow":
          mode === "light",
      })}
    >
      <Select.Root value={selectedItem} onValueChange={selectHandler}>
        <Select.Trigger
          className={clsx(
            "select-none flex items-center justify-center p-2 sm:px-4 focus:outline-none rounded-l-lg border-r font-bold sm:min-w-[98px]",
            {
              "border-r-mid-dark-900 bg-mid-dark hover:bg-night-900 focus:bg-night-900 text-white":
                mode === "dark",
              "border-r-gray-300 hover:bg-gray-100 focus:bg-gray-100":
                mode === "light",
            }
          )}
          aria-label="SearchType"
        >
          <Select.Value
            aria-label={selectedItem}
            defaultValue={selectedItem}
          ></Select.Value>
          <Select.Icon className="ml-2">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={clsx(
              "shadow-md rounded-lg max-h-[150px] min-w-[160px] text-sleek",
              {
                "bg-mid-dark text-white": mode === "dark",
                "border border-gray-400 bg-white": mode === "light",
              }
            )}
            position="popper"
            sideOffset={8}
          >
            <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              <Select.Viewport className="font-sans">
                {optionGroups?.map((grp, index) => (
                  <Select.Group key={index}>
                    <Select.Label
                      className={clsx("font-bold p-2", {
                        "bg-slate-100 border-y border-y-slate-200":
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
                        <Select.ItemText>{opt.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                ))}
              </Select.Viewport>
            </div>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <input
        className={clsx("w-full p-2 focus:outline-none peer", {
          "bg-mid-dark hover:bg-night-900 focus:bg-night-900 text-white placeholder:text-mid-dark-600":
            mode === "dark",
          "placeholder:text-slate-800": mode === "light",
        })}
        type="text"
        placeholder={placeholder}
      />
      <button
        className={clsx(
          "p-2 px-2.5 text-gray border-l rounded-r-lg sm:border-l-0",
          {
            "bg-mid-dark border-l-mid-dark-900 hover:bg-night-900 peer-hover:bg-night-900 peer-focus:bg-night-900":
              mode === "dark",
            "border-l-gray-300 text-slate-800 bg-transparent hover:text-mid-dark peer-hover:text-mid-dark peer-focus:text-mid-dark":
              mode === "light",
          }
        )}
      >
        <MagnifyingGlassIcon />
      </button>
    </div>
  );
};
