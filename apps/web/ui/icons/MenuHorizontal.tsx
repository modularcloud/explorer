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
      d="M3.333 1.334c0-.369.299-.667.667-.667h7.333a.667.667 0 1 1 0 1.333H4a.667.667 0 0 1-.667-.667M1 2.334a1 1 0 1 1 0-2 1 1 0 0 1 0 2M1 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0 4.6a1 1 0 1 1 0-2 1 1 0 0 1 0 2M3.333 6c0-.368.299-.667.667-.667h7.333a.667.667 0 1 1 0 1.334H4A.667.667 0 0 1 3.333 6m0 4.667c0-.368.299-.667.667-.667h7.333a.667.667 0 1 1 0 1.334H4a.667.667 0 0 1-.667-.667"
    />
  </svg>
);
export default SvgMenuHorizontal;
