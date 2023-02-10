import clsx from "clsx";
import * as Select from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";
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
}

export const SearchInput = ({
  mode = "light",
  placeholder = "Go to hash or height",
  optionGroups,
}: Props) => {
  return (
    <div
      className={clsx("flex shadow rounded-lg w-full", {
        "bg-gradient-accent pt-0.5 hover:shadow-sm focus-within:bg-gradient-secondary focus-within:p-[1.5px]":
          mode === "dark",
        "border border-gray-400 hover:shadow-ocean-shadow focus-within:border-2 focus-within:border-ocean-400 focus-within:shadow-ocean-shadow":
          mode === "light",
      })}
    >
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
              "shadow rounded-lg overflow-auto max-h-[150px] min-w-[160px]",
              {
                "bg-mid-dark text-white": mode === "dark",
                "border ": mode === "light",
              }
            )}
            position="popper"
            sideOffset={5}
          >
            <ScrollArea.Root className="ScrollAreaRoot">
              <Select.Viewport>
                <ScrollArea.Viewport>
                  {optionGroups?.map((grp, index) => (
                    <Select.Group key={index}>
                      <Select.Label
                        className={clsx("font-bold p-2", {
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
                </ScrollArea.Viewport>
              </Select.Viewport>
              <ScrollArea.Scrollbar className="" orientation="vertical">
                <ScrollArea.Thumb className="bg-mid-black" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <input
        className={clsx("w-full p-2 focus:outline-none", {
          "bg-mid-dark hover:bg-night-900 focus:bg-night-900 text-white placeholder:text-mid-dark-600":
            mode === "dark",
          "placeholder:text-slate-400": mode === "light",
        })}
        type="text"
        placeholder={placeholder}
      />

      <button
        className={clsx("p-2 px-2.5 text-gray border-l rounded-r-lg", {
          "bg-mid-dark border-l-mid-dark-900": mode === "dark",
        })}
      >
        <MagnifyingGlassIcon />
      </button>
    </div>
  );
};
