import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronDoubleDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m5.334 9 2.313 2.314a.5.5 0 0 0 .707 0L10.667 9M5.334 4.334l2.313 2.313a.5.5 0 0 0 .707 0l2.313-2.313"
    />
  </svg>
);
export default SvgChevronDoubleDown;
