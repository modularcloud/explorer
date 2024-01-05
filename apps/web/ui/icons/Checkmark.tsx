import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckmark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M21.59 3.193a1 1 0 0 1 .217 1.398l-11.706 16a1 1 0 0 1-1.429.192l-6.294-5a1 1 0 1 1 1.244-1.566l5.48 4.353L20.192 3.41a1 1 0 0 1 1.397-.217"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheckmark;
