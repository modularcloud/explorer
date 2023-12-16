"use client";
import { IBCTransferEventCard } from "~/ui/network-widgets/widgets/ibc-transfert-event-card";
import type { IBCTransferEvent } from "~/lib/headless-utils";
import { useDymensionWidgetData } from "./use-widget-data";
import { useParams } from "next/navigation";

export type DymensionWidgetContentProps = {
  initialEvents: IBCTransferEvent[];
};

export function DymensionWidgetContent({
  initialEvents,
}: DymensionWidgetContentProps) {
  const params = useParams() as { network: string };
  const { error, data } = useDymensionWidgetData({
    networkSlug: params.network,
    initialTransfertEvents: initialEvents,
  });

  return (
    <ul>
      {initialEvents.map((event, index) => (
        <li key={event.hash} className="flex flex-col items-center">
          <IBCTransferEventCard networkSlug={params.network} event={event} />
          {index < initialEvents.length - 1 && (
            <div aria-hidden="true" className="w-[1px] bg-mid-dark-100 h-4" />
          )}
        </li>
      ))}
    </ul>
  );
}
