type Props = {
  children: React.ReactNode;
  header: React.ReactNode;
  label: string;
};

export function TableList({ children, header, label }: Props) {
  return (
    <div className="w-full">
      <table className="w-full text-left" cellSpacing={0} cellPadding={0}>
        <caption className="xs:hidden text-left px-4 w-full sticky top-header z-10 py-2 bg-translucent backdrop-blur-xs border-b border-b-night-100 h-10 font-bold">
          {label}
        </caption>
        <thead className="max-xs:hidden">{header}</thead>
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
