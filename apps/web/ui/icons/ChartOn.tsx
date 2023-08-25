import * as React from "react";
import type { SVGProps } from "react";
const SvgChartOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 3.5H5.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2H10ZM7.5 10.5v2M7.5 10.5v2M10 8.5v4M10 8.5v4M12.5 7.5v5M12.5 7.5v5"
    />
  </svg>
);
export default SvgChartOn;
