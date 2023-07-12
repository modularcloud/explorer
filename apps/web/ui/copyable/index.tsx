"use client";

import { useToast } from "ui/shadcn/components/ui/use-toast";

type Props = {
  value: string | number,
}
export function CopyableValue({ value }: Props) {
  const { toast } = useToast();
  const copy = () => {
    navigator.clipboard.writeText(value.toString())
  }
  return (
    <span onClick={(e) => {
      e.stopPropagation();
      const val = String(value).length > 20 ? String(value).slice(0, 20) + "..." : value;
      copy();
      toast({
        title: "Copied",
        description: `"${val}" copied to clipboard`,
      })
    }} className="cursor-pointer">
      {value}
    </span>
  )
}
