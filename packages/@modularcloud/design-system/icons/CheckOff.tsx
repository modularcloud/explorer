import * as React from "react";
import { SVGProps } from "react";
const SvgCheckOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.5 4.707a5.5 5.5 0 1 0 4 5.293v-.5"
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m8.5 9.5 1.5 2s1.5-3 4.5-5"
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgCheckOff;
