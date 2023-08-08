"use client";

import { useState, useRef } from "react";
import * as Select from "@radix-ui/react-select";
import * as Popover from "@radix-ui/react-popover";
import { OptionGroups } from "../../lib/utils";
import { useRouter } from "next/navigation";
import SvgChevronDown from "../icons/ChevronDown";
import SvgSearchOff from "../icons/SearchOff";
import SvgCubesOn from "../icons/CubesOn";
import SvgLoading from "../icons/Loading";

interface Props {
  optionGroups: OptionGroups;
  defaultValue?: string;
}

export const Search = ({ optionGroups, defaultValue }: Props) => {
  const router = useRouter();
  const [option, setOption] = useState(
    defaultValue ?? Object.values(optionGroups)[0][0].id,
  );
  const [isSearching, setIsSearching] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  return (
    <Popover.Root open={false} onOpenChange={() => console.log("opened")}>
      <Popover.Anchor>
        <div className="border-mid-dark-100 flex h-[2.125rem] w-full items-center overflow-hidden rounded-lg border bg-white shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
          <Select.Root
            value={option}
            onValueChange={(value) => setOption(value)}
          >
            <Select.Trigger className="flex h-full flex-none items-center justify-center border-r border-[#2C2C2C1A] py-[0.3125rem] pl-4 pr-2 font-semibold outline-none">
              <Select.Value defaultValue={option}></Select.Value>
              <Select.Icon>
                <SvgChevronDown />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content position="popper" className="z-10" sideOffset={8}>
                <div className="border-mid-dark-100 max-h-[8.5rem] min-w-[10.5rem] overflow-auto overflow-scroll rounded-lg bg-white shadow-[0px_12px_16px_rgba(42,43,46,0.14),0px_3px_6px_rgba(42,_43,_46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
                  <Select.Viewport>
                    {Object.entries(optionGroups).map((entry, index) => {
                      const [groupDisplayName, options] = entry;
                      return (
                        <Select.Group key={index}>
                          <Select.Label className="bg-gray/[.08] border-b border-slate-100 px-3 py-1 font-semibold">
                            {groupDisplayName}
                          </Select.Label>
                          <div className="space-y-0.5 px-3 py-2">
                            {options.map((option, index) => (
                              <Select.Item
                                className="hover:text-ocean cursor-pointer outline-none"
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
          <div className="grid grow grid-cols-[1fr_auto] items-center">
            <input
              ref={searchInput}
              onChange={(event: any) =>
                router.prefetch(
                  `/${option}/search/${event.target.value.trim()}`,
                )
              }
              onKeyDown={(event: any) => {
                if (
                  (event.code === "Enter" || event.code === "NumpadEnter") &&
                  event.target.value.trim() !== ""
                ) {
                  setIsSearching(true);
                  router.push(`/${option}/search/${event.target.value.trim()}`);
                }
              }}
              className="placeholder:text-gray mx-3 w-full py-[0.3125rem] outline-none"
              type="text"
              placeholder="Go to hash, height, or address"
            />
            <button
              onClick={() => {
                if (
                  searchInput.current &&
                  searchInput.current.value.trim() !== ""
                ) {
                  () => setIsSearching(true);
                  router.push(
                    `/${option}/search/${searchInput.current.value.trim()}`,
                  );
                }
              }}
              className="flex items-center px-3"
            >
              {isSearching ? (
                <span className="animate-spin">
                  <SvgLoading />
                </span>
              ) : (
                <SvgSearchOff />
              )}
            </button>
          </div>
        </div>
      </Popover.Anchor>
      <Popover.Content className="min-w-[90%]">
        <div className="z-100 mt-2 flex w-[300px] flex-col items-center justify-center rounded-lg border bg-white p-5 text-center shadow-md sm:w-auto">
          <div className="m-auto block py-3">
            <SvgCubesOn />
          </div>
          <span className="text-md font-bold">Not found.</span>
          <p className="text-slate my-2 flex flex-wrap">
            Something went wrong - we could not find this result.
          </p>
          <span className="font-bold">Please try again.</span>
          <button className="block rounded-full border border-gray-200 p-2 px-3 sm:hidden">
            Try Again
          </button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
