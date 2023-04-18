"use client";

import { useState, useRef } from "react";
import * as Select from "@radix-ui/react-select";
import * as Popover from "@radix-ui/react-popover";
import ChevronDown from "./(icons)/ChevronDown";
import CubesOn from "./(icons)/CubesOn";
import SearchOff from "./(icons)/SearchOff";
import { OptionGroups } from "../../../../../../../lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  optionGroups: OptionGroups;
}

export const Search = ({ optionGroups }: Props) => {
  const router = useRouter();
  const [option, setOption] = useState(Object.values(optionGroups)[0][0].id);
  const searchInput = useRef<HTMLInputElement>(null);
  return (
    <Popover.Root open={false} onOpenChange={() => console.log("opened")}>
      <Popover.Anchor>
        <div className="flex h-[2.125rem] border border-mid-dark-100 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)] rounded-lg w-full bg-white overflow-hidden">
          <Select.Root
            value={option}
            onValueChange={(value) => setOption(value)}
          >
            <Select.Trigger className="outline-none flex items-center justify-center h-full pl-4 py-[0.3125rem] pr-2 font-semibold flex-none border-r border-[#2C2C2C1A]">
              <Select.Value defaultValue={option}></Select.Value>
              <Select.Icon>
                <ChevronDown />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content position="popper" className="z-10" sideOffset={8}>
                <div className="overflow-scroll max-h-[8.5rem] min-w-[10.5rem] overflow-auto bg-white rounded-lg border-mid-dark-100 shadow-[0px_12px_16px_rgba(42,43,46,0.14),0px_3px_6px_rgba(42,_43,_46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
                  <Select.Viewport>
                    {Object.entries(optionGroups).map((entry, index) => {
                      const [groupDisplayName, options] = entry;
                      return (
                        <Select.Group key={index}>
                          <Select.Label className="font-semibold bg-gray/[.08] border-b border-slate-100 py-1 px-3">
                            {groupDisplayName}
                          </Select.Label>
                          <div className="py-2 px-3 space-y-0.5">
                            {options.map((option, index) => (
                              <Select.Item
                                className="outline-none hover:text-ocean cursor-pointer"
                                key={index}
                                value={option.id}
                              >
                                <Select.ItemText>
                                  {option.displayName}
                                </Select.ItemText>
                              </Select.Item>
                            ))}
                          </div>
                        </Select.Group>
                      );
                    })}
                  </Select.Viewport>
                </div>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <input
            ref={searchInput}
            onChange={(event: any) =>
              router.prefetch(`/${option}/search/${event.target.value}`)
            }
            onKeyDown={(event: any) => {
              if (event.code === "Enter" || event.code === "NumpadEnter")
                router.push(`/${option}/search/${event.target.value}`);
            }}
            className="flex-1 placeholder:text-gray px-3 py-[0.3125rem] outline-none"
            type="text"
            placeholder="Go to hash, height, or address"
          />
          <button
            onClick={() => {
              if (searchInput.current)
                router.push(`/${option}/search/${searchInput.current.value}`);
            }}
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
