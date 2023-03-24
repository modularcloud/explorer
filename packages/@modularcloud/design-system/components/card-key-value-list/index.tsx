import { ValueSchemaType } from "service-manager";
import { Status } from "../status";

export function CardKeyValueList(props: { data: Record<string, ValueSchemaType> }) {
    return <dl className="grid sm:grid-cols-[minmax(200px,auto)_1fr] grid-cols-[minmax(128px,auto)_1fr] gap-y-2">
        {Object.entries(props.data).map(([key, value]) => {
            const { type, payload } = value;
            return <>
                <dt className="font-bold">{key}</dt>
                {type === "status" ? <dd><Status status={payload} /></dd> : null}
                {type === "list" ? <dd className="truncate"><ol>{payload.map((value) => <li className="truncate">{value}</li>)}</ol></dd> : null}
                {type === "string" ? <dd className="truncate">{payload}</dd> : null}
            </>
        })}
    </dl>
}