"use client";

import { useToast } from "~/ui/shadcn/components/ui/use-toast";
import { CopyOff as CopyIcon } from "../icons";
import { useState } from "react";

type Props = {
  value: string | number;
  isBodyClickable?: boolean;
  children?: React.ReactNode;
};

export function CopyableValue({
  value,
  children,
  isBodyClickable = true,
}: Props) {
  // Use hooks for toast notifications
  const { toast } = useToast();

  // State for hover
  const [hover, setHover] = useState(false);

  // Function to copy the value to the clipboard
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value.toString());
      return true;
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false;
    }
  };

  // Handler for onClick event
  const onClickHandler = async (e: React.MouseEvent<HTMLElement | SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    const copied = await copy();

    if (copied) {
      const val =
        String(value).length > 20 ? `${String(value).slice(0, 20)}...` : value;
      toast({
        title: "Copied",
        description: `"${val}" copied to clipboard`,
      });
    }
  };

  return (
    <span
      className="flex items-center cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        onClick={(e) => {
          if (!isBodyClickable) return;
          e.stopPropagation();
          onClickHandler(e);
        }}
      >
        {children ?? value}
      </span>
      {hover && (
        <CopyIcon
          onClick={(e) => {
            e.stopPropagation();
            onClickHandler(e);
          }}
          className="ml-1"
        />
      )}
    </span>
  );
}
