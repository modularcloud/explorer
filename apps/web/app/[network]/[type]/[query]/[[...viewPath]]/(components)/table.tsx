import { Suspense } from "react";
import { Row } from "./row";
import HeadBox from "./head-box";
import { AssociatedKey, AssociatedValue } from "../../../../../../ecs/components/associated";

type Props = {
  label: AssociatedKey
  data: AssociatedValue;
  nextToken?: string;
};

export default async function Table({ data, label }: Props) {
  if (data.length === 0) return null;

  return (
    <table className="w-full text-left" cellSpacing={0} cellPadding={0}>
      <thead>
        <tr>
          <HeadBox classes="w-4" spacingPurposesOnly={true} />
          <Suspense fallback={<HeadBox>Loading...</HeadBox>}>
            {/* @ts-expect-error Async Server Component */}
            <Row header={true} name={label} row={data[0]} />
          </Suspense>
          <HeadBox classes="w-4" spacingPurposesOnly={true} />
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            className="border-b border-b-[#F0F0F1] hover:bg-[#08061505] cursor-pointer"
            key={row.query}
          >
            <td aria-hidden={true} className="p-2">
              {/** For spacing purposes */}
            </td>
            <Suspense fallback={<td className="h-12">Loading...</td>}>
              {/* @ts-expect-error Async Server Component */}
              <Row row={row} />
            </Suspense>
            <td aria-hidden={true} className="p-2">
              {/** For spacing purposes */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
