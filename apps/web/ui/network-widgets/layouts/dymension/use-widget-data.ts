import { jsonFetch } from "~/lib/shared-utils";
import { CACHE_KEYS } from "~/lib/cache-keys";
import { IBCTransferEventSchema } from "~/ui/network-widgets/layouts/dymension/ibc-event-schema";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { z } from "zod";

export function useDymensionWidgetData({
  networkSlug,
}: {
  networkSlug: string;
}) {
  const THIRTY_SECONDS = 30 * 1000;
  const apiResultSchema = z.array(IBCTransferEventSchema);
  return useQuery({
    queryKey: CACHE_KEYS.widgets.data(networkSlug),
    queryFn: () =>
      jsonFetch("/api/get-dymension-ibc-events", {
        method: "POST",
      }).then((data) => apiResultSchema.parse(data)),
    staleTime: THIRTY_SECONDS,
    refetchInterval: THIRTY_SECONDS,
    placeholderData: keepPreviousData,
  });
}
