import { jsonFetch } from "~/lib/shared-utils";
import { CACHE_KEYS } from "~/lib/cache-keys";
import type { IBCTransferEvent } from "~/lib/dymension-utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type UseSvmWidgetDataArgs = {
  networkSlug: string;
  initialTransfertEvents: IBCTransferEvent[];
};

export function useDymensionWidgetData({
  networkSlug,
  initialTransfertEvents,
}: UseSvmWidgetDataArgs) {
  const THIRTY_SECONDS = 30 * 1000;
  return useQuery({
    queryKey: CACHE_KEYS.widgets.data(networkSlug),
    queryFn: () =>
      jsonFetch<IBCTransferEvent[]>("/api/get-dymension-ibc-events", {
        method: "POST",
      }),
    refetchInterval: THIRTY_SECONDS,
    placeholderData: keepPreviousData,
    initialData: initialTransfertEvents,
  });
}
