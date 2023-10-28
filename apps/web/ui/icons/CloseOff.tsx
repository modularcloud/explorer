import * as React from "react";
import type { SVGProps } from "react";
const SvgCloseOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path stroke="#888A90" strokeLinecap="round" d="m6.5 6.5 7 7m0-7-7 7" />
  </svg>
);
export default SvgCloseOff;
