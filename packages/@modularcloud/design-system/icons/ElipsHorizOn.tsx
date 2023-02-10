import * as React from "react";
import { SVGProps } from "react";
const SvgElipsHorizOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={20} height={20} rx={6} fill="#2A2B2E" fillOpacity={0.05} />
    <rect
      x={10.5}
      y={9.5}
      width={1}
      height={1}
      rx={0.5}
      transform="rotate(90 10.5 9.5)"
      fill="#2A2B2E"
      stroke="#2A2B2E"
    />
    <rect
      x={6.5}
      y={9.5}
      width={1}
      height={1}
      rx={0.5}
      transform="rotate(90 6.5 9.5)"
      fill="#2A2B2E"
      stroke="#2A2B2E"
    />
    <rect
      x={14.5}
      y={9.5}
      width={1}
      height={1}
      rx={0.5}
      transform="rotate(90 14.5 9.5)"
      fill="#2A2B2E"
      stroke="#2A2B2E"
    />
  </svg>
);
export default SvgElipsHorizOn;
