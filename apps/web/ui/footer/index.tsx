import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-10 text-center w-full flex flex-col gap-5">
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
