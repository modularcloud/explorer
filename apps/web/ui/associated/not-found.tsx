type Props = {
  primaryTypeSingular: string;
  secondaryTypePlural: string;
};

// TODO: migrate to a custom message for each scenario
export default function AssociatedNotFound({
  primaryTypeSingular,
  secondaryTypePlural,
}: Props) {
  return (
    <div className="w-full h-[75vh] flex justify-center items-center flex-col gap-y-6 text-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 33H29C31.2091 33 33 31.2091 33 29V20H7M20 33H11C8.79086 33 7 31.2091 7 29V20M20 33V7H11C8.79086 7 7 8.79086 7 11V20"
          stroke="#888A90"
          strokeOpacity="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.1907 2.74387L23.2578 3.8407L24.8421 16.7438L37.7452 15.1595L36.6484 6.22658C36.3792 4.03391 34.3834 2.47465 32.1907 2.74387Z"
          fill="#ECB526"
          fillOpacity="0.2"
          stroke="#ECB526"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div>
        <h2 className="text-night text-[0.9375rem] font-semibold">
          {`No ${secondaryTypePlural.toLowerCase()} found`}
        </h2>
        <p className="text-night-700">
          {`This ${primaryTypeSingular.toLowerCase()} does not have any ${secondaryTypePlural.toLowerCase()}.`}
        </p>
      </div>
    </div>
  );
}
