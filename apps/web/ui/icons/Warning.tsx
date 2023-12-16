import * as React from "react";
import type { SVGProps } from "react";
const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8.885v3.034M9.482 4.433l-6.03 9.93C2.224 16.385 3.644 19 5.969 19h12.062c2.325 0 3.745-2.615 2.518-4.637l-6.031-9.93a2.929 2.929 0 0 0-5.036 0"
    />
    <rect
      width={2.5}
      height={2.5}
      x={10.75}
      y={13.75}
      fill="currentColor"
      rx={1.25}
    />
  </svg>
);
export default SvgWarning;
