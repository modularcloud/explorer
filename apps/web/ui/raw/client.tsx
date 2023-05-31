"use client";
import Editor from "@monaco-editor/react";

type Props = { content?: string; language?: string };

export function ClientRaw({
  content = "// No source data found",
  language = "json",
}: Props) {
  return (
    <div className="flex w-full p-6 justify-center">
      <div className="bg-translucent backdrop-blur-xs w-full overflow-hidden border border-mid-dark-100 shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)] rounded-xl max-w-7xl">
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
