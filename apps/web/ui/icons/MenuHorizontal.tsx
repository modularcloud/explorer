import * as React from "react";
import type { SVGProps } from "react";
const SvgMenuHorizontal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#818898"
      d="M3.333 1.333c0-.368.299-.666.667-.666h7.333a.667.667 0 1 1 0 1.333H4a.667.667 0 0 1-.667-.667ZM1 2.333a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM1 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 4.6a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM3.333 6c0-.368.299-.667.667-.667h7.333a.667.667 0 1 1 0 1.334H4A.667.667 0 0 1 3.333 6Zm0 4.667c0-.368.299-.667.667-.667h7.333a.667.667 0 1 1 0 1.334H4a.667.667 0 0 1-.667-.667Z"
    />
  </svg>
);
export default SvgMenuHorizontal;
