import { SVGProps } from "react";
const SvgGreenTick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={10} cy={10} r={6.5} fill="#10B981" stroke="#10B981" />
    <path
      d="m7.5 10.5 2 2c1-4 3-5 3-5"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgGreenTick;
