import clsx from "clsx";
import { Status } from "../status";
import { Value } from "../../schemas/value";
import Image from "next/image";
import { CopyableValue } from "ui/copyable";

interface Props {
  attributes: Record<string, Value>;
  className?: string;
  type: "card" | "sidebar";
}

function Entry({ label, value }: { label: string; value: Value }) {
  const { type, payload } = value;
  if (!payload) return null;
  return (
    <>
      <dt className="font-bold">{label}</dt>
      {type === "image" ? (
        <dd>
          <Image
            src={payload.src}
            alt={payload.alt}
            width={payload.width}
            height={payload.height}
          />
        </dd>
      ) : null}
      {type === "status" ? (
        <dd>
          <Status status={payload} />
        </dd>
      ) : null}
      {type === "list" ? (
        <dd className="truncate">
          <ol>
            {payload.map((value) => (
              <li key={value} className="truncate">
                <CopyableValue value={value} />
              </li>
            ))}
          </ol>
        </dd>
      ) : null}
      {type === "standard" ? (
        <dd className="truncate">
          <CopyableValue value={payload} />
        </dd>
      ) : null}
    </>
  );
}

export function KeyValueList({ attributes, type: kvType, className }: Props) {
  return (
    <dl
      className={clsx(
        className,
        "grid",
        kvType === "card" &&
          "grid-cols-[minmax(128px,auto)_1fr] gap-y-2 sm:grid-cols-[minmax(200px,auto)_1fr]",
        kvType === "sidebar" && "grid-cols-[auto_1fr] gap-x-6 gap-y-4",
      )}
    >
      {Object.entries(attributes).map(([key, value]) => {
        return <Entry key={key} label={key} value={value} />;
      })}
    </dl>
  );
}
