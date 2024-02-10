import * as React from "react";
import Link from "next/link";
import { cn } from "~/ui/shadcn/utils";

interface Props {
  className?: string;
}
export function Footer(props: Props) {
  return (
    <footer
      className={cn(
        "py-10 text-center w-full flex flex-col gap-5 text-xs",
        props.className,
      )}
    >
      <hr />
      <span className="text-muted">
        &copy; Copyright {new Date().getFullYear()}. All rights reserved.
      </span>

      <div className="flex self-center items-center justify-between px-5 gap-5">
        <Link href="#">About</Link>
        <span>&middot;</span>
        <Link href="#">Terms</Link>
        <span>&middot;</span>
        <Link href="#">Privacy</Link>
      </div>
    </footer>
  );
}
