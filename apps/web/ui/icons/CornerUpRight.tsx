import * as React from "react";
import type { SVGProps } from "react";
const SvgCornerUpRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.125 16.042V9.167c0-.92.746-1.667 1.667-1.667H16.25m-2.5 3.334 3.039-3.039a.417.417 0 0 0 0-.59L13.75 4.168"
    />
  </svg>
);
export default SvgCornerUpRight;
