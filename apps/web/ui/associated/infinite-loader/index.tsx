"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PaginationArchetype } from "../../../ecs/archetypes/pagination";
import { asyncUseEntity } from "../../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../../lib/utils";
import { InfiniteLoaderContext } from "./context";

type Props = {
  next?: FetchLoadArgs;
  initialState?: FetchLoadArgs[];
  children: React.ReactNode;
};

export default function InfiniteLoader({
  next,
  children,
  initialState = [],
}: Props) {
  const [entityRefs, setEntityRefs] = useState<FetchLoadArgs[]>(initialState);
  const [nextPage, setNextPage] = useState(next);

  const loadNextPage = async () => {
    if (!nextPage) return;
    const entity = await asyncUseEntity({
      resourcePath: nextPage,
      archetype: PaginationArchetype,
    });

    if (!entity) return;
    setEntityRefs([...entityRefs, ...entity.components.pagination.data.values]);
    setNextPage(entity.components.pagination.data.next);
  };

  return (
    <div className="absolute top-0 w-full">
      <InfiniteScroll
        next={loadNextPage}
        hasMore={!!nextPage}
        dataLength={entityRefs.length}
        loader={<div>Loader...</div>}
        height="100vh"
      >
        <InfiniteLoaderContext.Provider value={entityRefs}>
          {children}
        </InfiniteLoaderContext.Provider>
      </InfiniteScroll>
    </div>
  );
}
