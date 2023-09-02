import Link from "next/link";
import { ShortcutKey } from "~/ui/shortcut-key";

export function Footer() {
  return (
    <footer className="py-10 text-center w-full flex flex-col gap-5">
      <div className="hidden md:flex items-center gap-14 mx-auto">
        <ShortcutKey command="/" commandName="slash" label="Search" />
        <ShortcutKey command="E" label="Latest block" />
        <ShortcutKey command="⌥" commandName="Option" label="Clipboard" />
        <ShortcutKey command="B" label="Search Blocks" />
        <ShortcutKey command="O" label="Select hash" />
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
