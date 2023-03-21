import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Separator from "@radix-ui/react-separator";
import { ListViewOn, ListViewOff, CardOn, CardOff } from "../../icons";
import { useState } from "react";

type Props = {
  onSwitchView: (view: string) => void;
  defaultView: string;
};

export function ViewSwitcher({ onSwitchView, defaultView }: Props) {
  const [value, setValue] = useState(defaultView);

  return (
    <ToggleGroup.Root
      type="single"
      className="flex items-center"
      value={value}
      onValueChange={(value) => {
        if (value) {
          setValue(value);
          onSwitchView(value);
        }
      }}
    >
      <ToggleGroup.Item value="table" className="h-[34px] w-[34px] p-[7px]">
        {value === "table" ? <ListViewOn /> : <ListViewOff />}
      </ToggleGroup.Item>
      <Separator.Root
        className="SeparatorRoot mx-1 bg-slate-200 w-px h-5"
        decorative
        orientation="vertical"
      />
      <ToggleGroup.Item value="cards" className="h-[34px] w-[34px] p-[7px]">
        {value === "cards" ? <CardOn /> : <CardOff />}
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
