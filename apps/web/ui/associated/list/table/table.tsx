import { Suspense } from "react";
import { AssociatedKey } from "../../../../ecs/components/associated";
import { FetchLoadArgs } from "../../../../lib/utils";
import { TableHeader } from "./header";
import { TableHeaderLoadingFallback } from "./header/loading";
type Props = {
  label: AssociatedKey;
  children: React.ReactNode;
  initialValues: FetchLoadArgs[];
};

export function TableList({ children, label, initialValues }: Props) {
  return (
    <div className="w-full">
      <table className="w-full text-left" cellSpacing={0} cellPadding={0}>
        <thead>
          <Suspense fallback={<TableHeaderLoadingFallback />}>
            {/* @ts-expect-error Async Server Component */}
            <TableHeader label={label} rows={initialValues} />
          </Suspense>
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
