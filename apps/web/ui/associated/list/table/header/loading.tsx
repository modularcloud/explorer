import HeadBox from "./head-box";

export function TableHeaderLoadingFallback() {
  return (
    <tr>
      <HeadBox classes="w-4" spacingPurposesOnly={true} />
      <HeadBox>Loading...</HeadBox>
      <HeadBox classes="w-4" spacingPurposesOnly={true} colspan={100} />
    </tr>
  );
}
