import * as React from "react";
import type { SVGProps } from "react";
const SvgMenuHorizontal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth={2}
      d="M4 12h16M4 19h16M4 5h16"
    />
  </svg>
);
export default SvgMenuHorizontal;
