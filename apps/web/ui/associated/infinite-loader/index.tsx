"use client";

import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PaginationArchetype } from "../../../ecs/archetypes/pagination";
import { asyncUseEntity } from "../../../ecs/hooks/use-entity/server";
import { FetchLoadArgs } from "../../../lib/utils";
import { InfiniteLoaderContext } from "./context";
import useSWR from "swr";

type Props = {
  next?: FetchLoadArgs;
  initialState?: FetchLoadArgs[];
  refreshQuery: FetchLoadArgs;
  children: React.ReactNode;
};

export default function InfiniteLoader({
  next,
  children,
  refreshQuery,
  initialState = [],
}: Props) {
  const [entityRefs, setEntityRefs] = useState<FetchLoadArgs[]>();
  const [nextPage, setNextPage] = useState(next);

  const result = useSWR(
    refreshQuery,
    async () => {
      console.log("refreshing");
      const pagination = await asyncUseEntity({
        resourcePath: refreshQuery,
        archetype: PaginationArchetype,
      });
      if (pagination) {
        return pagination.components.pagination.data.values;
      }
      return Promise.resolve(initialState);
    },
    { refreshInterval: 1000, fallbackData: initialState },
  );
  const data = useMemo<FetchLoadArgs[]>(() => {
    if (entityRefs) {
      return entityRefs;
    }
    return result.data || initialState;
  }, [result.data, entityRefs]);

  const loadNextPage = async () => {
    if (!nextPage) return;
    const entity = await asyncUseEntity({
      resourcePath: nextPage,
      archetype: PaginationArchetype,
    });

    if (!entity) return;
    setEntityRefs([...data, ...entity.components.pagination.data.values]);
    setNextPage(entity.components.pagination.data.next);
  };

  return (
    <div className="absolute top-0 w-full">
      <InfiniteScroll
        next={loadNextPage}
        hasMore={!!nextPage}
        dataLength={data.length}
        loader={<div>Loader...</div>}
        height="100vh"
      >
        <InfiniteLoaderContext.Provider value={data}>
          {children}
        </InfiniteLoaderContext.Provider>
      </InfiniteScroll>
    </div>
  );
}
