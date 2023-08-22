"use client";

import { FetchLoadArgs, copyTextToClipboard } from "lib/utils";
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
      if (await copyTextToClipboard(value.toString())) {
        toast({
          title: "Copied",
          description: `"${value}" copied to clipboard`,
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
