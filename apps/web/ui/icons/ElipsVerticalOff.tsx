import * as React from "react";
import type { SVGProps } from "react";
const SvgElipsVerticalOff = (props: SVGProps<SVGSVGElement>) => (
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
      x={9.5}
      y={9.5}
      fill="#8C8E94"
      stroke="#8C8E94"
      rx={0.5}
    />
    <rect
      width={1}
      height={1}
      x={9.5}
      y={13.5}
      fill="#8C8E94"
      stroke="#8C8E94"
      rx={0.5}
    />
    <rect
      width={1}
      height={1}
      x={9.5}
      y={5.5}
      fill="#8C8E94"
      stroke="#8C8E94"
      rx={0.5}
    />
  </svg>
);
export default SvgElipsVerticalOff;
