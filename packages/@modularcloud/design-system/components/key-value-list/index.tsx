import clsx from "clsx";
import { Status } from "../status";
import { ValueSchemaType } from "service-manager";

interface Props {
  header?: string;
  entryLabels?: string[];
  entries?: Array<[key: string, value: ValueSchemaType]>;
}

export function KeyValueList({ header, entries }: Props) {
  return (
    <div className="flex flex-col w-full space-y-4">
      <span className={clsx("font-bold", { hidden: !header })}>{header}</span>
      <div className="flex flex-col flex-1 space-y-4">
        {entries?.map((entry, idx) => {
          const key = entry[0];
          const { type, payload: value } = entry[1];
          return (
            <div key={key} className="flex flex-row space-x-5">
              <label className="lg:w-1/2 xl:w-[30%] font-bold">
                {key}
              </label>
              <span className="lg:w-1/2 truncate">
                {type === "status" ? <Status status={value} /> : null}
                {type === "list"
                  ? value.map((value, index) => (
                      <>
                        {index ? <br /> : null}
                        <span>{value}</span>
                      </>
                    ))
                  : null}
                {type === "string" ? value : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
