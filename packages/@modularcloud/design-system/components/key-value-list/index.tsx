import clsx from "clsx";
import { ValueSchemaType } from "service-manager";
import { Status } from "../status";
import dayjs from "dayjs";

export function KeyValueList(props: {
  data: Record<string, ValueSchemaType>;
  type: "card" | "sidebar";
}) {
  return (
    <dl
      className={clsx(
        "grid",
        props.type === "card" &&
          "sm:grid-cols-[minmax(200px,auto)_1fr] grid-cols-[minmax(128px,auto)_1fr] gap-y-2",
        props.type === "sidebar" && "grid-cols-[auto_1fr] gap-y-4 gap-x-6"
      )}
    >
      {Object.entries(props.data).map(([key, value]) => {
        const { type, payload } = value;
        return (
          <>
            <dt className="font-bold">{key}</dt>
            {type === "status" ? (
              <dd>
                <Status status={payload} />
              </dd>
            ) : null}
            {type === "list" ? (
              <dd className="truncate">
                <ol>
                  {payload.map((value) => (
                    <li className="truncate">{value}</li>
                  ))}
                </ol>
              </dd>
            ) : null}
            {type === "string" ? <dd className="truncate">{payload}</dd> : null}
            {type === "time" ? (
              <dd className="truncate">{dayjs(payload).toString().replace("GMT", "UTC")}</dd>
            ) : null}
          </>
        );
      })}
    </dl>
  );
}
