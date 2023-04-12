"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PaginationArchetype } from "../../ecs/archetypes/pagination";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../lib/utils";
import { InfiniteLoaderContext } from "./context";

type Props = {
  next?: FetchLoadArgs;
  children: React.ReactNode;
};

export function InfiniteLoader({ next, children }: Props) {
  const [entityRefs, setEntityRefs] = useState<FetchLoadArgs[]>([]);
  const [nextPage, setNextPage] = useState(next);

  const loadNextPage = async () => {
    console.log(nextPage);
    if (!nextPage) return;
    const entity = await asyncUseEntity({
      resourcePath: nextPage,
      archetype: PaginationArchetype,
    });
    console.log(entity);
    if (!entity) return;
    setEntityRefs([...entityRefs, ...entity.components.pagination.data.values]);
    setNextPage(entity.components.pagination.data.next);
  };

  return (
    <div className="top-0 absolute w-full">
      <InfiniteScroll
        next={loadNextPage}
        hasMore={!!next}
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
