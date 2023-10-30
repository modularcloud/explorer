import * as React from "react";
import type { SVGProps } from "react";
const SvgXCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 13.667A6.667 6.667 0 1 1 7 .334a6.667 6.667 0 0 1 0 13.333Zm0-7.61L5.585 4.645a.667.667 0 0 0-.942.942l1.414 1.415-1.414 1.414a.667.667 0 0 0 .942.943L7 7.943l1.414 1.415a.667.667 0 0 0 .943-.943L7.942 7l1.415-1.415a.667.667 0 0 0-.943-.942L7 6.058Z"
    />
  </svg>
);
export default SvgXCircle;
