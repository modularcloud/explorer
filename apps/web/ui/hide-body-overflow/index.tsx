"use client";
import * as React from "react";

/**
 * This component is used to hide the scrollbar on the body,
 * I (@fredkiss3) don't know why exactly there is a scrollbar and in fact the scrollbar doesn't have
 * any effect on the page.
 *
 * So i simply used a hack to hide the scrollbar when we are on  `/[network]/(block)/layout.tsx`,
 * when we navigate back to the network homepage for ex, we remove this property as we want that page to be scrollable.
 */
export function HideBodyOverflow() {
  React.useEffect(() => {
    const body = document.body;
    body.style.setProperty("overflow", "hidden");
    return () => {
      body.style.removeProperty("overflow");
    };
  }, []);

  return null;
}
