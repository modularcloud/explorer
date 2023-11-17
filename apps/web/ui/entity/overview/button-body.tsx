import { cn } from "~/ui/shadcn/utils";

export function ButtonBody({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 p-[0.375rem_0.5rem] pl-[0.75rem] rounded-md bg-[var(--neutral-white,#FFF)] shadow-[0px_0px_0px_1px_rgba(18,43,105,0.08),0px_1px_2px_0px_rgba(18,43,105,0.08),0px_2px_6px_0px_rgba(18,43,105,0.04)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
