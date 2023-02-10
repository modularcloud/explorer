import * as React from "react";
import { SVGProps } from "react";
const SvgElipsVerticalOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={20} height={20} rx={6} fill="#2A2B2E" fillOpacity={0.05} />
    <rect
      x={9.5}
      y={9.5}
      width={1}
      height={1}
      rx={0.5}
      fill="#2A2B2E"
      stroke="#2A2B2E"
    />
    <rect
      x={9.5}
      y={13.5}
      width={1}
      height={1}
      rx={0.5}
      fill="#2A2B2E"
      stroke="#2A2B2E"
    />
    <rect
      x={9.5}
      y={5.5}
      width={1}
      height={1}
      rx={0.5}
      fill="#2A2B2E"
      stroke="#2A2B2E"
    />
  </svg>
);
export default SvgElipsVerticalOn;
