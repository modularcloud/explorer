import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Homepage } from "@modularcloud/design-system";

export default {
  title: "Pages/Homepage",
  component: Homepage,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    mode: { control: { type: "select", options: ["light", "dark"] } },
  },
} as ComponentMeta<typeof Homepage>;

const HomepageTemplate: ComponentStory<typeof Homepage> = (args) => (
  <Homepage {...args} />
);

export const LightMode = HomepageTemplate.bind({});
LightMode.args = {
  mode: "light",
};

export const DarkMode = HomepageTemplate.bind({});
DarkMode.args = {
  mode: "dark",
};
