import clsx from "clsx";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export function CardList({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "flex flex-col space-y-6 w-full xl:w-[80%] sm:m-auto p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
