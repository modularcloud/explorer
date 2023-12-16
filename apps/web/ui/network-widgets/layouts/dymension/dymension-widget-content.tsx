"use client";
import {
  IBCTransferEventCard,
  IBCTransferEventCardSkeleton,
} from "~/ui/network-widgets/widgets/ibc-transfert-event-card";
import type { IBCTransferEvent } from "~/lib/headless-utils";
import { useDymensionWidgetData } from "./use-widget-data";
import { useParams } from "next/navigation";
import { range } from "~/lib/shared-utils";

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

  if (!data) {
    return <DymensionWidgetSkeleton error={error?.toString()} />;
  }

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

function DymensionWidgetSkeleton(props: { error?: string }) {
  return (
    <ul className="relative">
      {props.error && (
        <div className="z-10 absolute inset-0 backdrop-blur-md rounded-lg text-center p-24 border border-red-400">
          <p className="text-red-400 text-lg">
            ⚠️ An Error Occured while loading the widgets :&nbsp;
            <strong className="font-medium">{props.error}</strong>
          </p>
        </div>
      )}
      {range(0, 4).map((i) => (
        <li key={i} className="flex flex-col items-center">
          <IBCTransferEventCardSkeleton />
          {i < 4 && (
            <div aria-hidden="true" className="w-[1px] bg-mid-dark-100 h-4" />
          )}
        </li>
      ))}
    </ul>
  );
}
