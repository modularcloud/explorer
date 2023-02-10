import * as React from "react";
import { SVGProps } from "react";
const SvgCloseOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m6.5 6.5 7 7m0-7-7 7" stroke="#888A90" strokeLinecap="round" />
  </svg>
);
export default SvgCloseOff;
