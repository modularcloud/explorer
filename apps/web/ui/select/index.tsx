import * as React from "react";

import * as RadixSelect from "@radix-ui/react-select";
import { ArrowDown } from "~/ui/icons";
import clsx from "clsx";
import { CheckIcon } from "lucide-react";

interface Props {
  options: { label: string; value: string }[];
  value: string;
  onChange: (newValue: string) => void;
}

export function Select({ options, value, onChange }: Props) {
  const [primaryColor, setPrimaryColor] = React.useState<string | null>("");
  const selectRef =
    React.useRef<React.ElementRef<typeof RadixSelect.Trigger>>(null);

  // Get primary color and pass it to the host
  React.useEffect(() => {
    if (selectRef.current) {
      const primary = getComputedStyle(selectRef.current).getPropertyValue(
        "--color-primary",
      );
      setPrimaryColor(primary);
    }
  }, []);

  return (
    <>
      <RadixSelect.Root value={value} onValueChange={onChange}>
        <RadixSelect.Trigger
          ref={selectRef}
          className={clsx(
            "border border-mid-dark-100 rounded-md flex items-center py-1.5 pl-3 pr-1",
            "focus:border-primary focus:border-2 outline-none",
          )}
        >
          <RadixSelect.Value placeholder="Select a time frame" />
          <RadixSelect.Icon>
            <ArrowDown className="text-muted" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className="overflow-hidden bg-white rounded-md shadow-sm border border-mid-dark-100">
            <RadixSelect.Viewport className="p-1">
              {options.map((option) => (
                <RadixSelect.Item
                  value={option.value}
                  key={option.value}
                  style={{
                    // @ts-ignore
                    "--color-primary": primaryColor,
                  }}
                  className={clsx(
                    "px-4 py-2 outline-none font-medium",
                    "data-[highlighted]:bg-primary data-[highlighted]:text-white",
                    "rounded-sm",
                  )}
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator />
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </>
  );
}
