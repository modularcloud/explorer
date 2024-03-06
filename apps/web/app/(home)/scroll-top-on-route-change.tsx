"use client";
import { usePathname } from "next/navigation";
import * as React from "react";

export type ScrollTopOnRouteChangeProps = {};

export function ScrollTopOnRouteChange({}: ScrollTopOnRouteChangeProps) {
  //   const pathname = usePathname();
  React.useEffect(() => {
    console.log({ topBefore: window.scrollY });
    // this fixes a weird issue with safari scrolling to a section instead of the top of the page
    window.scrollTo(0, 0);
    console.log({ topAfter: window.scrollY });
    console.log("LOAD PAGE, SCROLL TOP");
  }, []);
  return null;
}
