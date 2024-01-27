import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.5 6.5h-11m8.333-3.333V1.833M5.167 3.167V1.833M12.833 13.5H3.167a.667.667 0 0 1-.667-.667v-9c0-.368.298-.666.667-.666h9.666c.368 0 .667.298.667.666v9a.667.667 0 0 1-.667.667"
    />
  </svg>
);
export default SvgCalendar;
