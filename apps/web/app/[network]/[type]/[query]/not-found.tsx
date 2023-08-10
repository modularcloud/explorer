export default function NotFound() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-y-6 text-center">
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
          fill="#EF4444"
          fillOpacity="0.2"
          stroke="#EF4444"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div>
        <h2 className="text-night text-[0.9375rem] font-semibold">Not Found</h2>
        <p className="text-night-700">Please request something else.</p>
      </div>
    </div>
  );
}
