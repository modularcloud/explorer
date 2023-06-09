"use client";

import { Entity } from "@modularcloud/ecs";
import Editor from "@monaco-editor/react";
import { PageArchetype } from "../../ecs/archetypes/page";

type Props = { entity: Entity<typeof PageArchetype> };

export function Raw({ entity }: Props) {
  const data = entity.components.raw.data;
  const language = Object.values(data)[0]?.language ?? "json";
  const content = Object.values(data)[0]?.content ?? "// No source data found";
  return (
    <div className="flex w-full justify-center p-6">
      <div className="bg-translucent backdrop-blur-xs border-mid-dark-100 w-full max-w-7xl overflow-hidden rounded-xl border shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
        <Editor
          width="100%"
          height="75vh"
          language={language}
          value={content}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollbar: { vertical: "hidden", horizontal: "hidden" },
            overviewRulerLanes: 0,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
