export function MCLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M.978 15.842C8.682 14.8 14.799 8.682 15.843.977A.86.86 0 0 0 14.99 0H.86A.86.86 0 0 0 0 .86v14.13c0 .522.46.923.978.852Zm15.024-.7v-5.05.001c0-.38-.493-.533-.706-.218a20.29 20.29 0 0 1-5.42 5.42c-.315.213-.162.706.218.706h5.048a.86.86 0 0 0 .86-.86Z"
        clipRule="evenodd"
        style={{
          mixBlendMode: "screen",
        }}
      />
    </svg>
  );
}
