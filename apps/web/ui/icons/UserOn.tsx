import * as React from "react";
import type { SVGProps } from "react";
const SvgUserOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <circle
      cx={10}
      cy={10}
      r={7.5}
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx={10}
      cy={8}
      r={1.5}
      fill="#2A2B2E"
      fillOpacity={0.2}
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill="#2A2B2E"
      fillOpacity={0.2}
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m5.5 16 .618-1.743C6.784 12.585 8.311 11.5 10 11.5c1.69 0 3.216 1.085 3.882 2.757L14.5 16c-1.236 1.057-2.8 1.5-4.5 1.5-1.7 0-3.264-.443-4.5-1.5"
    />
  </svg>
);
export default SvgUserOn;
