import * as React from "react";
import type { SVGProps } from "react";
const SvgTiltedGlobe = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.186 2.815 2.814 13.185M14.167 8A6.167 6.167 0 1 1 1.833 8a6.167 6.167 0 0 1 12.334 0m-1.823 4.344c-.8.8-3.393-.497-5.792-2.896S2.856 4.456 3.656 3.656s3.393.497 5.792 2.896 3.696 4.992 2.896 5.792"
    />
  </svg>
);
export default SvgTiltedGlobe;
