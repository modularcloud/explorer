"use client";

import { Suspense, useContext } from "react";
import { FetchLoadArgs } from "../../../lib/utils";
import { ClientAssociatedEntry } from "../entry/client";
import { AssociatedEntryLoadingFallback } from "../entry/loading";
import { InfiniteLoaderContext } from "./context";
import React from "react";

const Entry = React.memo(
  ({ resourcePath }: { resourcePath: FetchLoadArgs }) => {
    return (
      <Suspense fallback={<AssociatedEntryLoadingFallback />}>
        <ClientAssociatedEntry resourcePath={resourcePath} />
      </Suspense>
    );
  },
);

function deepEqual(a: FetchLoadArgs[], b: FetchLoadArgs[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].network !== b[i].network ||
      a[i].type !== b[i].type ||
      a[i].query !== b[i].query
    ) {
      return false;
    }
  }
  return true;
}

function useDeepCompareMemoize(value: FetchLoadArgs[]) {
  const ref = React.useRef<FetchLoadArgs[]>();
  if (!ref.current || !deepEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

export function InfiniteLoaderEntries() {
  let entries = useContext(InfiniteLoaderContext);
  entries = useDeepCompareMemoize(entries);

  return (
    <>
      {entries.map((entry) => (
        <Entry
          key={`${entry.network}/${entry.type}/${entry.query}`}
          resourcePath={entry}
        />
      ))}
    </>
  );
}
