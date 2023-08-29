import * as React from "react";
import type { SVGProps } from "react";
const SvgCodeOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#AEB0B7"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7.5 7.5-3 2.5 3 2.5M12.5 7.5l3 2.5-3 2.5"
    />
  </svg>
);
export default SvgCodeOff;
