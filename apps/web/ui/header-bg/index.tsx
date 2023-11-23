import * as React from "react";

export function HeaderBg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 693"
      fill="none"
      {...props}
    >
      <path
        stroke="url(#a)"
        strokeLinejoin="round"
        d="m-59-320 194.625 194.615M-59-320V-8.616M-59-320h311.4m1245.6 0h-311.4m311.4 0-194.62 194.615M1498-320V-8.615M135.625-125.385 330.25 69.231M135.625-125.385v233.539m0-233.539h233.55m934.205 0h-233.55m233.55 0L1108.75 69.231m194.63-194.616v233.539M330.25 69.231l194.625 194.615M330.25 69.231v155.692m0-155.692h155.7m622.8 0L914.125 263.846M1108.75 69.231h-155.7m155.7 0v155.692m-583.875 38.923h77.85m-77.85 0v77.846m389.25-77.846v77.846m0-77.846h-77.85m-155.7 0h77.85m-77.85 0h-77.85m77.85 0L641.65 69.231m116.775 194.615h77.85m-77.85 0L797.35 69.231M602.725 263.846 485.95 69.231m38.925 272.461v77.846m0-77.846L330.25 224.923m194.625 194.615v77.847m0-77.847L330.25 380.615m194.625 194.616v-77.846m0 77.846v77.846h389.25v-77.846m-389.25 0L330.25 692V536.308m194.625-38.923L330.25 536.308m583.875 38.923v-77.846m0 77.846L1108.75 692V536.308m-194.625-38.923v-77.847m0 77.847 194.625 38.923M914.125 341.692v77.846m0-77.846 194.625-116.769M914.125 419.538l194.625-38.923M836.275 263.846 953.05 69.231m0 0 116.78-194.616M953.05 69.231h-155.7m-467.1 155.692L135.625 108.154M330.25 224.923v155.692M1186.6-320l-116.77 194.615M1186.6-320H875.2m194.63 194.615H836.275m-700.65 233.539L-59-8.616m194.625 116.77v233.538M-59-8.616V302.77M485.95 69.231h155.7m-155.7 0L369.175-125.385M797.35 69.231h-155.7m155.7 0 38.925-194.616M641.65 69.231l-38.925-194.616m-272.475 506v155.693m0-155.693-194.625-38.923M330.25 536.308l-194.625 38.923m973.125-38.923V380.615m0 155.693 194.63 38.923m-194.63-350.308v155.692m0-155.692 194.63-116.769m-194.63 272.461 194.63-38.923m0 233.539V341.692m0 233.539L1498 614.154V302.769m-194.62 38.923V108.154m0 233.538L1498 302.769M135.625 341.692v233.539m0-233.539L-59 302.769m194.625 272.462L-59 614.154V302.769m661.725-428.154h-233.55m233.55 0h233.55m-233.55 0L563.8-320M369.175-125.385 252.4-320m583.875 194.615L875.2-320m428.18 428.154L1498-8.616M875.2-320H563.8m0 0H252.4M1498 302.769V-8.615"
      />
      <path stroke="url(#b)" d="m1303 342-144 28.5" />
      <path stroke="url(#c)" d="m136 342 195 38.5" />
      <path stroke="url(#d)" d="M1303 169v173" />
      <path stroke="url(#e)" d="M136 111v231" />
      <defs>
        <linearGradient
          id="b"
          x1={1325.5}
          x2={1159}
          y1={335}
          y2={371}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--color-primary))" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="c"
          x1={113.5}
          x2={280}
          y1={335}
          y2={371}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--color-primary))" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="d"
          x1={1303.5}
          x2={1303.5}
          y1={169}
          y2={342}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity={0} />
          <stop offset={1} stopColor="hsl(var(--color-primary))" />
        </linearGradient>
        <linearGradient
          id="e"
          x1={136.5}
          x2={136.5}
          y1={111}
          y2={342}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity={0} />
          <stop offset={1} stopColor="hsl(var(--color-primary))" />
        </linearGradient>
        <radialGradient
          id="a"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 -778.461 1104.37 0 719.5 458.461)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.341} stopColor="#DFE1E7" stopOpacity={0} />
          <stop offset={0.616} stopColor="#DFE1E7" />
        </radialGradient>
      </defs>
    </svg>
  );
}
