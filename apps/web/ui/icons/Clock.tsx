import * as React from "react";
import type { SVGProps } from "react";
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8.44 16.36A7.689 7.689 0 1 1 8.44.98a7.689 7.689 0 0 1 0 15.378m0-1.539a6.151 6.151 0 1 0 0-12.302 6.151 6.151 0 0 0 0 12.302m.769-6.15h2.306a.769.769 0 1 1 0 1.537H9.113A1.442 1.442 0 0 1 7.67 8.766V5.595a.769.769 0 1 1 1.538 0z"
    />
  </svg>
);
export default SvgClock;
