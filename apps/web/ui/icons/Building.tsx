import * as React from "react";
import type { SVGProps } from "react";
const SvgBuilding = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.166 13.5V3.167c0-.369.299-.667.667-.667h8.333c.368 0 .667.298.667.667V13.5m-9.667 0h9.667m-9.667 0H1.833m11 0h1.333M5.833 5.167h1m2.333 0h1M5.833 7.833h1m2.333 0h1M5.833 10.5h1m2.333 0h1"
    />
  </svg>
);
export default SvgBuilding;
