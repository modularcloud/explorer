import { SVGProps } from "react";
const SvgRadialBgIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="160"
    viewBox="0 0 1440 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_26_136"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="1440"
      height="160"
    >
      <rect width="1440" height="160" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_26_136)">
      <g filter="url(#filter0_f_26_136)">
        <ellipse
          cx="719.5"
          cy="-33"
          rx="322.5"
          ry="33"
          fill="url(#paint0_linear_26_136)"
          fill-opacity="0.32"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_26_136"
        x="241"
        y="-222"
        width="957"
        height="378"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="78"
          result="effect1_foregroundBlur_26_136"
        />
      </filter>
      <linearGradient
        id="paint0_linear_26_136"
        x1="973.779"
        y1="-54.2143"
        x2="531.81"
        y2="95.1394"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3773FE" />
        <stop offset="1" stopColor="#C15EFE" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgRadialBgIcon;
