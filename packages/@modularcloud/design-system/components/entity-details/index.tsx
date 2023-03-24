interface Props {
  iconType?: React.ReactNode;
  type: string;
  hash: string;
  network?: string;
}

export function EntityDetails({ iconType, type, hash, network }: Props) {
  return (
    <div className="flex flex-col w-full space-y-6">
      {network ? (
        <img
          className="lg:w-[130px] w-[180px]"
          src={`/images/${network.toLowerCase()}-bigger.png`}
          alt={network}
        />
      ) : null}
      <div className="flex flex-row items-center justify-evenly space-x-2 border border-mid-dark-100 rounded-lg bg-white px-4 py-2 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
        <div className="shrink-0">{iconType}</div>
        <span className="shrink-0 font-semibold">{type}</span>
        <span>/</span>
        <span className="shrink text-ellipsis overflow-hidden">{hash}</span>
      </div>
    </div>
  );
}
