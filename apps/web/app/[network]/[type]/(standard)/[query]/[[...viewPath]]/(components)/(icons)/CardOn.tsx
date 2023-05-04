import { SVGProps } from "react";
const SvgCardOn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 3.5h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z"
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 11.5h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z"
      fill="#2A2B2E"
      fillOpacity={0.2}
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 3.5h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1ZM15.5 11.5h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z"
      stroke="#2A2B2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgCardOn;
