export function MCLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 61"
      fill="none"
      {...props}
    >
      <g filter="url(#a)">
        <g filter="url(#b)">
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M8.932 48.02C32.041 44.892 50.39 26.546 53.52 3.434A2.581 2.581 0 0 0 50.964.502H8.58A2.579 2.579 0 0 0 6 3.082v42.384a2.581 2.581 0 0 0 2.932 2.555Zm45.065-2.102V30.776v.001c0-1.141-1.478-1.599-2.118-.654A60.858 60.858 0 0 1 35.623 46.38c-.944.64-.487 2.118.655 2.118h15.14a2.58 2.58 0 0 0 2.58-2.58Z"
            clipRule="evenodd"
          />
        </g>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M8.932 48.02C32.041 44.892 50.39 26.546 53.52 3.434A2.581 2.581 0 0 0 50.964.502H8.58A2.579 2.579 0 0 0 6 3.082v42.384a2.581 2.581 0 0 0 2.932 2.555Zm45.065-2.102V30.776v.001c0-1.141-1.478-1.599-2.118-.654A60.858 60.858 0 0 1 35.623 46.38c-.944.64-.487 2.118.655 2.118h15.14a2.58 2.58 0 0 0 2.58-2.58Z"
          clipRule="evenodd"
          style={{
            mixBlendMode: "screen",
          }}
        />
      </g>
      <defs>
        <filter
          id="a"
          width={59.997}
          height={59.996}
          x={0}
          y={0.502}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={6} />
          <feGaussianBlur stdDeviation={3} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_253_3" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_253_3"
            result="shape"
          />
        </filter>
        <filter
          id="b"
          width={47.997}
          height={53.996}
          x={6}
          y={0.502}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={6} />
          <feGaussianBlur stdDeviation={6} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect1_innerShadow_253_3" />
        </filter>
      </defs>
    </svg>
  );
}
