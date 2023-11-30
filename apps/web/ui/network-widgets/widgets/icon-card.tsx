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
    <Card
      className={cn(
        "flex flex-col items-start gap-[1.125rem] md:gap-5 min-h-36 h-full",
        className,
      )}
    >
      <div className="rounded-md border border-mid-dark-100 p-1  h-9 w-9 tab:p-2 tab:h-10 tab:w-10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <p className="text-muted uppercase text-xxs tab:text-xs">{label}</p>
        <p className="text-base tab:text-lg">{value}</p>
      </div>
    </Card>
  );
}
