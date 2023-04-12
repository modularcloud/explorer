"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PaginationArchetype } from "../../ecs/archetypes/pagination";
import { asyncUseEntity } from "../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../lib/utils";
import { InfiniteTableLoaderContext } from "./context";

type Props = {
  next?: FetchLoadArgs;
  children: React.ReactNode;
};

export function InfiniteTableLoader({ next, children }: Props) {
  const [tableRows, setTableRows] = useState<FetchLoadArgs[]>([]);
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
    setTableRows([...tableRows, ...entity.components.pagination.data.values]);
    setNextPage(entity.components.pagination.data.next);
  };

  return (
    <InfiniteScroll
      next={loadNextPage}
      hasMore={!!next}
      dataLength={tableRows.length}
      loader={<div>Loader...</div>}
    >
      <InfiniteTableLoaderContext.Provider value={tableRows}>
        {children}
      </InfiniteTableLoaderContext.Provider>
    </InfiniteScroll>
  );
}
