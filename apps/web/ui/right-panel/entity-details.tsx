import { CopyableValue } from "ui/copyable";

interface Props {
  imageUrl: string;
  label: string;
  value: string;
  alt: string;
}

export function EntityDetails({ imageUrl, label, value, alt }: Props) {
  return (
    <div className="flex w-full flex-col space-y-6">
      <img className="mx-1 w-[180px] lg:w-[130px]" src={imageUrl} alt={alt} />
      <div className="border-mid-dark-100 flex flex-row space-x-2 rounded-lg border bg-white px-4 py-2 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
        {/* <div className="shrink-0">{iconType}</div> */}
        <span className="shrink-0 font-semibold">{label}</span>
        <span>/</span>
        <span className="shrink overflow-hidden text-ellipsis">
          <CopyableValue value={value} />
        </span>
      </div>
    </div>
  );
}
