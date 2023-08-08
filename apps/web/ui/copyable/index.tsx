"use client";

import { FetchLoadArgs } from "lib/utils";
import { useToast } from "ui/shadcn/components/ui/use-toast";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type Props = {
  value: string | number;
  link?: FetchLoadArgs | string;
  children?: React.ReactNode;
};

export function CopyableValue({ value, link, children }: Props) {
  // Use hooks for toast notifications and routing
  const { toast } = useToast();
  const router = useRouter();

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
  const onClickHandler = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    if (e.ctrlKey || e.metaKey) {
      open();
    } else {
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
    }
  };

  return (
    <span
      onClick={onClickHandler}
      className={clsx("cursor-pointer", link && "underline")}
    >
      {children ?? value}
    </span>
  );
}
