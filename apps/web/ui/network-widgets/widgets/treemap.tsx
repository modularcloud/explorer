"use client";
import * as React from "react";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";
import { ResponsiveTreeMap } from "@nivo/treemap";

interface Props {
  className?: string;
  data: Record<string, number>;
}

export function Treemap(props: Props) {
  const data = React.useMemo(() => {
    const colors = [
      "hsl(256, 100%, 60%)",
      "hsl(223, 100%, 60%)",
      "hsl(202, 100%, 60%)",
    ];
    return Object.entries(props.data).map(([id, value]) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        id,
        value,
        color,
      };
    });
  }, [props.data]);
  return (
    <Card className={cn("flex flex-col p-0", props.className)}>
      <header className="flex items-center border-b border-mid-dark-100 p-3 justify-between">
        <p className="text-lg">Data Usage</p>
        <span className="text-muted font-normal">Last 10 Days</span>
      </header>
      <div className="h-full">
        <ResponsiveTreeMap
          data={{
            id: "All Namespaces",
            color: "hsl(256, 100%, 60%)",
            children: data,
          }}
          valueFormat=".02s"
          labelSkipSize={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.2]],
          }}
          parentLabelPosition="left"
          parentLabelTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.1]],
          }}
          colors={(node) => node.data.color}
        />
      </div>
    </Card>
  );
}
