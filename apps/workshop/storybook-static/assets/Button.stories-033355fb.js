var s=Object.defineProperty;var a=(e,n)=>s(e,"name",{value:n,configurable:!0});import{j as r}from"./jsx-runtime-82e0d3de.js";import"./index-d84d9d3b.js";import"./es.object.get-own-property-descriptor-ca06259f.js";const o=a(({primary:e=!1,label:n="Boop",size:l="small"})=>r("button",{style:{backgroundColor:e?"red":"blue",fontSize:l==="large"?"50px":"14px"},children:n}),"Button$1");try{o.displayName="Button",o.__docgenInfo={description:"",displayName:"Button",props:{primary:{defaultValue:{value:"false"},description:"",name:"primary",required:!1,type:{name:"boolean"}},size:{defaultValue:{value:"small"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"large"'}]}},label:{defaultValue:{value:"Boop"},description:"",name:"label",required:!1,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["../../packages/ui/Button.tsx#Button"]={docgenInfo:o.__docgenInfo,name:"Button",path:"../../packages/ui/Button.tsx#Button"})}catch{}try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{primary:{defaultValue:{value:"false"},description:"",name:"primary",required:!1,type:{name:"boolean"}},size:{defaultValue:{value:"small"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"large"'}]}},label:{defaultValue:{value:"Boop"},description:"",name:"label",required:!1,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["../../packages/ui/index.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"../../packages/ui/index.tsx#Button"})}catch{}const B={parameters:{storySource:{source:`import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
`,locationsMap:{primary:{startLoc:{col:48,line:17},endLoc:{col:78,line:17},startBody:{col:48,line:17},endBody:{col:78,line:17}},secondary:{startLoc:{col:48,line:17},endLoc:{col:78,line:17},startBody:{col:48,line:17},endBody:{col:78,line:17}},large:{startLoc:{col:48,line:17},endLoc:{col:78,line:17},startBody:{col:48,line:17},endBody:{col:78,line:17}},small:{startLoc:{col:48,line:17},endLoc:{col:78,line:17},startBody:{col:48,line:17},endBody:{col:78,line:17}}}}},title:"Example/Button",component:o,argTypes:{backgroundColor:{control:"color"}}},t=a(e=>r(o,{...e}),"Template"),i=t.bind({});i.args={primary:!0,label:"Button"};const c=t.bind({});c.args={label:"Button"};const p=t.bind({});p.args={size:"large",label:"Button"};const u=t.bind({});u.args={size:"small",label:"Button"};const f=["Primary","Secondary","Large","Small"];export{p as Large,i as Primary,c as Secondary,u as Small,f as __namedExportsOrder,B as default};
//# sourceMappingURL=Button.stories-033355fb.js.map
