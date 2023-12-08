import * as React from "react";
import type { SVGProps } from "react";
const SvgMoonOff = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#888A90"
      fillOpacity={0.1}
      fillRule="evenodd"
      d="M16.093 11.351a5.5 5.5 0 0 1-7.445-7.445 5.933 5.933 0 1 0 7.445 7.445"
      clipRule="evenodd"
    />
    <path
      fill="#888A90"
      d="m16.093 11.351.477.15a.5.5 0 0 0-.713-.59zM8.65 3.906l.44.237a.5.5 0 0 0-.59-.713zm7.208 7.005a4.976 4.976 0 0 1-2.357.589v1a5.976 5.976 0 0 0 2.83-.708zM13.5 11.5a5 5 0 0 1-5-5h-1a6 6 0 0 0 6 6zm-5-5c0-.853.213-1.656.59-2.357l-.882-.473A5.976 5.976 0 0 0 7.5 6.5zM5 9.567c0-2.43 1.596-4.49 3.799-5.184l-.3-.953A6.436 6.436 0 0 0 4 9.567zM10.433 15C7.433 15 5 12.567 5 9.567H4A6.433 6.433 0 0 0 10.433 16zm5.184-3.799A5.436 5.436 0 0 1 10.433 15v1a6.436 6.436 0 0 0 6.137-4.498z"
    />
    <path
      fill="#888A90"
      stroke="#888A90"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.5 6.5c2 0 2-3 2-3s0 3 2 3c-2 0-2 3-2 3s0-3-2-3"
    />
  </svg>
);
export default SvgMoonOff;
