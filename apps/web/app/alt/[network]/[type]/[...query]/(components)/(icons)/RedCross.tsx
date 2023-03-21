import { SVGProps } from "react";
const SvgRedCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={10} cy={10} r={6.5} stroke="#EF4444" />
    <path
      d="m7.5 7.5 5 5M7.5 12.5l5-5"
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgRedCross;
