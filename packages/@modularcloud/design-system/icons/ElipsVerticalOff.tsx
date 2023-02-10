import * as React from "react";
import { SVGProps } from "react";
const SvgElipsVerticalOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={9.5}
      y={9.5}
      width={1}
      height={1}
      rx={0.5}
      fill="#8C8E94"
      stroke="#8C8E94"
    />
    <rect
      x={9.5}
      y={13.5}
      width={1}
      height={1}
      rx={0.5}
      fill="#8C8E94"
      stroke="#8C8E94"
    />
    <rect
      x={9.5}
      y={5.5}
      width={1}
      height={1}
      rx={0.5}
      fill="#8C8E94"
      stroke="#8C8E94"
    />
  </svg>
);
export default SvgElipsVerticalOff;
