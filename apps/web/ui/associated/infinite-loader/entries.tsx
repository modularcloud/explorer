"use client";

import { Suspense, useContext } from "react";
import { ClientAssociatedEntry } from "../entry/client";
import { AssociatedEntryLoadingFallback } from "../entry/loading";
import { InfiniteLoaderContext } from "./context";

export function InfiniteLoaderEntries() {
  const entries = useContext(InfiniteLoaderContext);
  return (
    <>
      {entries.map((entry) => (
        <Suspense
          key={`${entry.network}/${entry.type}/${entry.query}`}
          fallback={<AssociatedEntryLoadingFallback />}
        >
          <ClientAssociatedEntry resourcePath={entry} />
        </Suspense>
      ))}
    </>
  );
}
