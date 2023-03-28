import clsx from "clsx";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function RightPanel({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "h-full lg:h-screen flex flex-col space-y-10 px-6 py-7 lg:px-5 sm:px-9 bg-gray-100 shadow-inner overflow-auto scrollbar-thin scrollbar-thumb-mid-dark-500 scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
        className
      )}
    >
      {children}
    </div>
  );
}
