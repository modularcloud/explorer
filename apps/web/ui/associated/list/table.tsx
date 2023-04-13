import { AssociatedKey } from "../../../ecs/components/associated";
import HeadBox from "../../table/head-box";
type Props = {
  label: AssociatedKey;
  children: React.ReactNode;
};

export function TableList({ children, label }: Props) {
  return (
    <div className="w-full">
      <table className="w-full text-left" cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <HeadBox classes="w-4" spacingPurposesOnly={true} />
            <HeadBox>Placeholder</HeadBox>
            <HeadBox classes="w-4" spacingPurposesOnly={true} />
          </tr>
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
