import * as React from "react";
import type { SVGProps } from "react";
const SvgElipsHorizOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect
      width={1}
      height={1}
      x={10.5}
      y={9.5}
      fill="#8C8E94"
      stroke="#8C8E94"
      rx={0.5}
      transform="rotate(90 10.5 9.5)"
    />
    <rect
      width={1}
      height={1}
      x={6.5}
      y={9.5}
      fill="#8C8E94"
      stroke="#8C8E94"
      rx={0.5}
      transform="rotate(90 6.5 9.5)"
    />
    <rect
      width={1}
      height={1}
      x={14.5}
      y={9.5}
      fill="#8C8E94"
      stroke="#8C8E94"
      rx={0.5}
      transform="rotate(90 14.5 9.5)"
    />
  </svg>
);
export default SvgElipsHorizOff;
