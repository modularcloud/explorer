import { PageArchetype } from "../../ecs/archetypes/page";
import { Code } from "bright";
import { Entity } from "@modularcloud/ecs";
import { tabs } from "./extension";

type Props = { entity: Entity<typeof PageArchetype> };

export function Raw({ entity }: Props) {
  const data = Object.entries(entity.components.raw.data).map(
    ([key, value]) => ({
      code: value.content,
      lang: value.language,
      title: key,
    }),
  );
  if (data.length === 0) {
    data.push({
      code: "// No source data found",
      lang: "json",
      title: "Source",
    });
  }
  return (
    <div className="flex w-full justify-center p-6">
      <div className="bg-translucent backdrop-blur-xs border-mid-dark-100 w-full max-w-7xl overflow-hidden rounded-xl border shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
        {/* @ts-expect-error Async Server Component */}
        <Code
          style={{ margin: 0 }}
          lineNumbers={true}
          theme="github-light"
          extensions={[tabs]}
          subProps={data}
        />
      </div>
    </div>
  );
}
