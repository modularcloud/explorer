type Props = {
  children: React.ReactNode;
  header: React.ReactNode;
};

export function TableList({ children, header }: Props) {
  return (
    <div className="w-full">
      <table className="w-full text-left" cellSpacing={0} cellPadding={0}>
        <thead>
          {header}
        </thead>
        <tbody>
          <tr className="h-header" aria-hidden={true}>
            {/** For spacing purposes */}
          </tr>
          {children}
        </tbody>
      </table>
    </div>
  );
}
