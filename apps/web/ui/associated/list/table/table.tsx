type Props = {
  children: React.ReactNode;
  header: React.ReactNode;
  label: string;
};

export function TableList({ children, header, label }: Props) {
  return (
    <div className="w-full">
      <table className="w-full text-left" cellSpacing={0} cellPadding={0}>
        <caption className="xs:hidden top-header bg-translucent backdrop-blur-xs border-b-night-100 sticky z-10 h-10 w-full border-b px-4 py-2 text-left font-bold">
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
