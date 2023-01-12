import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BoxedValue } from "@modularcloud/design-system";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Atom/BoxedValue",
  component: BoxedValue,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: { control: { type: "text " } },
  },
} as ComponentMeta<typeof BoxedValue>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BoxedValue> = (args) => (
  <BoxedValue {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  value: "Pay For Data",
};
