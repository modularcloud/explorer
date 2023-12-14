import * as React from "react";
import type { SVGProps } from "react";
const SvgKeyboardArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={5}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M4.354 4.313a.5.5 0 0 1-.708 0L.854 1.52a.5.5 0 0 1 .353-.853h5.586a.5.5 0 0 1 .353.853z"
    />
  </svg>
);
export default SvgKeyboardArrowDown;
