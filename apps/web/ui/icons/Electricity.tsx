import * as React from "react";
import type { SVGProps } from "react";
const SvgElectricity = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5.666 5h4.4a.5.5 0 0 1 .415.777L5.25 13.626a.5.5 0 0 1-.916-.277V9H.549a.5.5 0 0 1-.429-.757L4.737.548c.261-.435.929-.25.929.257V5M4.333 6.333v-2.52L2.02 7.668h3.645v2.93l2.842-4.264H4.333"
    />
  </svg>
);
export default SvgElectricity;
