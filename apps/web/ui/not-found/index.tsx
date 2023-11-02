interface Props {
  heading: string;
  description: String;
}

export default function NotFound({ heading, description }: Props) {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-y-3 text-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 8H24V24H40V36C40 38.2091 38.2091 40 36 40H24H12C9.79086 40 8 38.2091 8 36V24V12C8 9.79086 9.79086 8 12 8Z"
          fill="#F6F8FA"
        />
        <path
          d="M24 40H36C38.2091 40 40 38.2091 40 36V24H8M24 40H12C9.79086 40 8 38.2091 8 36V24M24 40V8H12C9.79086 8 8 9.79086 8 12V24"
          stroke="#DFE1E7"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M40 4H28V20H44V8C44 5.79086 42.2091 4 40 4Z"
          fill="#FAEDCC"
          stroke="#FFBE4C"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <div>
        <p className="text-xl text-[#0D0D12] tracking-wide pb-2 font-semibold">
          {heading}
        </p>
        <p className="text-night-700 text-lg">{description}</p>
      </div>
    </div>
  );
}
