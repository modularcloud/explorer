"use client";

import { FetchLoadArgs } from "~/lib/utils";
import { useToast } from "~/ui/shadcn/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CopyOff as CopyIcon } from "../icons";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  value: string | number;
  link?: FetchLoadArgs | string;
  children?: React.ReactNode;
};

export function CopyableValue({ value, link, children }: Props) {
  // Use hooks for toast notifications and routing
  const { toast } = useToast();
  const router = useRouter();

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

  // Construct link from FetchLoadArgs
  const constructLink = (link: FetchLoadArgs) =>
    `${link.network}/${link.type}/${link.query}`;

  // Function to navigate to the link
  const open = () => {
    if (link) {
      const route = typeof link === "string" ? link : constructLink(link);
      router.push(route);
    }
  };

  // Handler for onClick event
  const onClickHandler = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    const copied = await copy();

    if (copied) {
      const val =
        String(value).length > 20
          ? `${String(value).slice(0, 20)}...`
          : value;
      toast({
        title: "Copied",
        description: `"${val}" copied to clipboard`,
      });
    }
  };

  return (
    <span
      className={clsx("cursor-pointer", link && "underline", "flex items-center")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children ?? value}
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
