import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Args } from "@storybook/addons";
import { SearchInput } from "@modularcloud/design-system";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    placeholder: { control: { type: "text " } },
  },
} as ComponentMeta<typeof SearchInput>;

const SearchInputTemplate: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

const SearchInputTemplateDark: ComponentStory<typeof SearchInput> = (args) => (
  <div style={{ backgroundColor: "#080615", height: "100vh", padding: "20px" }}>
    <SearchInput {...args} />
  </div>
);

export const LightMode = SearchInputTemplate.bind({});
LightMode.args = {
  mode: "light",
  placeholder: "light mode",
};

export const DarkMode = SearchInputTemplateDark.bind({});
DarkMode.args = {
  mode: "dark",
  placeholder: "dark mode",
};
