import * as React from "react";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}

export function IconCard({ icon: Icon, label, value, className }: Props) {
  return (
    <Card className={cn(className, "flex flex-col gap-4 items-start")}>
      <div className="rounded-md border border-mid-dark-100 p-3">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="text-muted uppercase text-sm">{label}</p>
      <p className="text-lg tracking-[-0.01125rem]">{value}</p>
    </Card>
  );
}
