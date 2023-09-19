import * as React from "react";
import Link from "next/link";
import { ShortcutKey } from "~/ui/shortcut-key";
import { headers } from "next/headers";

export function Footer() {
  const ua = headers().get("user-agent");

  const isMacLike = !ua ? false : /(Mac|iPhone|iPod|iPad)/i.test(ua);

  return (
    <footer className="py-10 text-center w-full flex flex-col gap-5">
      <div className="hidden md:flex items-center gap-10 lg:gap-14 mx-auto flex-wrap justify-center">
        <ShortcutKey commands={["/"]} label="Search" />
        <ShortcutKey commands={["G", "B"]} label="Latest blocks" />
        <ShortcutKey commands={["G", "T"]} label="Latest transactions" />
        <ShortcutKey
          commands={[isMacLike ? "⌘" : "^", "V"]}
          combined
          label="Search item in clipboard"
        />
      </div>
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
