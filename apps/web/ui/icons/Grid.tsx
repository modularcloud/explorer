import * as React from "react";
import type { SVGProps } from "react";
const SvgGrid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M1 16a1 1 0 0 1-1-1V9.889a1 1 0 0 1 1-1h5.111a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1zm.778-1.778h3.555v-3.555H1.778zM8.888 1a1 1 0 0 1 1-1H15a1 1 0 0 1 1 1v5.111a1 1 0 0 1-1 1H9.889a1 1 0 0 1-1-1zm1.779.778v3.555h3.555V1.778zM0 1a1 1 0 0 1 1-1h5.111a1 1 0 0 1 1 1v5.111a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm1.778.778v3.555h3.555V1.778zM9.889 16a1 1 0 0 1-1-1V9.889a1 1 0 0 1 1-1H15a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1zm.778-1.778h3.555v-3.555h-3.555z"
    />
  </svg>
);
export default SvgGrid;
