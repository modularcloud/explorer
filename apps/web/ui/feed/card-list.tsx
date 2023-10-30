interface Props {
  children?: React.ReactNode;
}

export function CardList({ children }: Props) {
  return (
    <div className="flex w-full flex-col items-center space-y-6 p-6 sm:p-8 md:px-12">
      {children}
    </div>
  );
}
