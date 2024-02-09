import { jsonFetch } from "~/lib/shared-utils";
import { CACHE_KEYS } from "~/lib/cache-keys";
import useSWR from "swr";
import type { IBCTransferEvent } from "~/lib/dymension-utils";

type UseSvmWidgetDataArgs = {
  networkSlug: string;
  initialTransfertEvents: IBCTransferEvent[];
};

export function useDymensionWidgetData({
  networkSlug,
  initialTransfertEvents,
}: UseSvmWidgetDataArgs) {
  const THIRTY_SECONDS = 30 * 1000;
  return useSWR<IBCTransferEvent[]>(
    CACHE_KEYS.widgets.data(networkSlug),
    () => {
      return jsonFetch<IBCTransferEvent[]>("/api/get-dymension-ibc-events", {
        method: "POST",
      });
    },
    {
      refreshInterval: THIRTY_SECONDS,
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      fallbackData: initialTransfertEvents,
    },
  );
}
