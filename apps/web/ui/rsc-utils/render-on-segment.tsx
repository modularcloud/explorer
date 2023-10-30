"use client";

/**
 * This will show the child context components (e.g. right panel and top bar) if the correct route is detected client side.
 * The reason this is useful is because it allows them to be conditionally rendered while on a base layout.
 * This can help the developer experience and performance in the case of small components, assuming it is not retrieving extra data or conditionally rendering large amounts of elements.
 */

import clsx from "clsx";
import { useParams } from "next/navigation";

type Props = {
  children: React.ReactNode;
  segment: string;
  className?: string;

  // optionally, render this when the segment is not present
  fallback?: React.ReactNode;
};
export function RenderOnSegment({
  children,
  segment,
  className,
  fallback,
}: Props) {
  const params = useParams();
  return (
    <>
      <div className={clsx(className, segment in (params ?? {}) || "hidden")}>
        {children}
      </div>
      {fallback ? (
        <div className={clsx(className, segment in (params ?? {}) && "hidden")}>
          {fallback}
        </div>
      ) : null}
    </>
  );
}
