interface Props {
  children?: React.ReactNode;
}

export function CardList({ children }: Props) {
  return (
    <div className="flex flex-col space-y-6 w-full p-6 sm:p-8 md:px-12 items-center">
      {children}
    </div>
  );
}
