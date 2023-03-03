import clsx from 'clsx';

type Props = {
  list: string[],
  long?: boolean
};

export function Badge({ list, long }: Props) {
    const count = list?.length ?? 0;
    const hasExtra = count > 1;

    if(count === 0) {
        return null;
    }

    return <div className={clsx("flex gap-2 border rounded-[2.5rem] border-mid-dark-100 pl-3 py-[.1875rem] w-max", hasExtra ? "pr-[.1875rem]" : "pr-3")}>
        <div className={clsx(!long && "max-w-[80px] truncate")}>{list[count - 1]}</div>
        {hasExtra ? <div className="w-8 py-1 flex justify-center items-center bg-slate-100 text-[#80838D] rounded-2xl text-xs">+{count - 1}</div> : null}
    </div>
}