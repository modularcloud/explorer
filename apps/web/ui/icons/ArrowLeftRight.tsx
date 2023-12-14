import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowLeftRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8.229 7.504c.26-.26.682-.26.943 0l2.12 2.122a1 1 0 0 1 0 1.414l-2.12 2.121a.667.667 0 1 1-.943-.943l1.219-1.22L1.333 11a.667.667 0 0 1 0-1.333h8.115l-1.22-1.219a.667.667 0 0 1 0-.943M2.829.838a.667.667 0 1 1 .942.942L2.552 3h8.115a.667.667 0 1 1 0 1.334H2.552l1.22 1.219a.667.667 0 0 1-.944.942l-2.12-2.12a1 1 0 0 1 0-1.415z"
    />
  </svg>
);
export default SvgArrowLeftRight;
