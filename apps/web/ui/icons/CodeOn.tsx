import * as React from "react";
import type { SVGProps } from "react";
const SvgCodeOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7.5 7.5-3 2.5 3 2.5M12.5 7.5l3 2.5-3 2.5"
    />
  </svg>
);
export default SvgCodeOn;
