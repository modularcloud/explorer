interface Props {
  iconType?: React.ReactNode;
  type: string;
  hash: string;
  network: string;
}

export function EntityDetails({ iconType, type, hash, network }: Props) {
  return (
    <div className="flex flex-col w-full space-y-6">
      <img
        className="lg:w-[130px] w-[180px]"
        src={`/images/${network.toLowerCase()}-bigger.png`}
        alt={network}
      />
      <div className="flex flex-row items-center justify-evenly space-x-2 border border-gray-800 rounded-lg bg-white p-2 shadow-md">
        <div className="shrink-0">{iconType}</div>
        <span className="shrink-0 font-bold">{type}</span>
        <span>/</span>
        <span className="shrink text-ellipsis overflow-hidden">{hash}</span>
      </div>
    </div>
  );
}
