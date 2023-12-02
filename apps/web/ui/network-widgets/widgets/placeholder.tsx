import { cn } from "~/ui/shadcn/utils";

export function Placeholder(props: {
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
}) {
  return (
    <div
      className={cn(props.className, "rounded-lg w-full h-full", {
        "animate-pulse": props.isLoading,
        "bg-muted-100": !props.isError,
        "bg-red-100": props.isError,
      })}
    />
  );
}
