import * as React from "react";
import type { SVGProps } from "react";
const SvgTrends = (props: SVGProps<SVGSVGElement>) => (
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
      d="m3 13.011.97-2.315c.358-.855 1.578-.808 1.87.072l1.18 3.562c.308.926 1.614.914 1.904-.018l2.986-9.606c.303-.977 1.694-.927 1.927.07l3.382 14.449c.229.977 1.584 1.05 1.916.104L21 14.017"
    />
  </svg>
);
export default SvgTrends;
