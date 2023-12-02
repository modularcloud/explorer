import * as React from "react";
import type { SVGProps } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6 .333c3.312 0 6 2.689 6 6 0 3.313-2.688 6-6 6s-6-2.687-6-6c0-3.311 2.688-6 6-6ZM6 11a4.665 4.665 0 0 0 4.667-4.666A4.665 4.665 0 0 0 6 1.667a4.665 4.665 0 0 0-4.667 4.667A4.665 4.665 0 0 0 6 11m5.185.519c.26-.26.683-.26.943 0l.943.943a.667.667 0 0 1-.943.943l-.943-.943a.667.667 0 0 1 0-.943"
    />
  </svg>
);
export default SvgSearch;
