import clsx from "clsx";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export function CardList({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "flex flex-col space-y-6 w-full p-6 sm:p-8 md:px-12 items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
