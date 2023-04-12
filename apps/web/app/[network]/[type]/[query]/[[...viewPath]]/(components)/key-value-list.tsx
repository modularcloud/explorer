import clsx from "clsx";
import { Status } from "./status";
import { FetchLoadArgs } from "../../../../../../lib/utils";
import { PageArchetype } from "../../../../../../ecs/archetypes/page";
import { asyncUseEntity as getEntity } from "../../../../../../ecs/hooks/use-entity/server";
import { AssociatedArchetype } from "../../../../../../ecs/archetypes/associated";
import { Value } from "../../../../../../schemas/value";

interface Props {
  resourcePath: FetchLoadArgs;
  type: "card" | "sidebar";
}

export async function KeyValueList({ type: kvType, resourcePath }: Props) {
  const entity =
    kvType === "sidebar"
      ? await getEntity({
          resourcePath,
          archetype: PageArchetype,
        })
      : await getEntity({
          resourcePath,
          archetype: AssociatedArchetype,
        });

  if (!entity) return null;

  let attributes = {} as Record<string, Value>;

  if ("sidebar" in entity.components) {
    attributes = entity.components.sidebar.data.attributes;
  }

  if ("card" in entity.components) {
    attributes = entity.components.card.data.attributes;
  }

  return (
    <dl
      className={clsx(
        "grid",
        kvType === "card" &&
          "sm:grid-cols-[minmax(200px,auto)_1fr] grid-cols-[minmax(128px,auto)_1fr] gap-y-2",
        kvType === "sidebar" && "grid-cols-[auto_1fr] gap-y-4 gap-x-6"
      )}
    >
      {Object.entries(attributes).map(([key, value]) => {
        const { type, payload } = value;
        if (!payload) return null;
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
            {type === "standard" ? (
              <dd className="truncate">{payload}</dd>
            ) : null}
          </>
        );
      })}
    </dl>
  );
}
