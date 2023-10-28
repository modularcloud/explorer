import * as React from "react";
import type { SVGProps } from "react";
const SvgBarChart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M.222 8.903c0-.483.391-.875.875-.875h2.916c.484 0 .875.392.875.875v4.472a.875.875 0 0 1-.875.875H1.097a.875.875 0 0 1-.875-.875V8.903Zm10.889-3.89c0-.482.391-.874.875-.874h2.916c.484 0 .875.392.875.875v8.361a.875.875 0 0 1-.875.875h-2.916a.875.875 0 0 1-.875-.875V5.014ZM5.666 1.126c0-.483.392-.875.875-.875h2.917c.483 0 .875.392.875.875v12.25a.875.875 0 0 1-.875.875H6.54a.875.875 0 0 1-.875-.875V1.125ZM1.777 9.583v3.111h1.556v-3.11H1.777Zm5.445-7.777v10.888h1.555V1.806H7.222Zm5.444 3.888v7h1.556v-7h-1.556Z"
    />
  </svg>
);
export default SvgBarChart;
