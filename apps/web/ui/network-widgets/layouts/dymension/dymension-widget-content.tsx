"use client";
import {
  IBCTransferEventCard,
  IBCTransferEventCardSkeleton,
} from "~/ui/network-widgets/widgets/ibc-transfert-event-card";
import type { IBCTransferEvent } from "~/lib/dymension-utils";
import { useDymensionWidgetData } from "./use-widget-data";
import { useParams } from "next/navigation";
import { range } from "~/lib/shared-utils";
import { useClientOnlyTime } from "../../use-client-only-time";

export type DymensionWidgetContentProps = {
  initialEvents: IBCTransferEvent[];
  initialUpdatedAt: Date;
};

export function DymensionWidgetContent({
  initialEvents,
  initialUpdatedAt,
}: DymensionWidgetContentProps) {
  const params = useParams() as { network: string };
  const { error, data } = useDymensionWidgetData({
    networkSlug: params.network,
    initialTransfertEvents: initialEvents,
  });

  const lastUpdatedTime = useClientOnlyTime(initialUpdatedAt, [data]);

  if (!data) {
    return <DymensionWidgetSkeleton error={error.toString()} />;
  }

  return (
    <div className="max-w-[52.5rem] mx-auto flex flex-col gap-4 w-full">
      <div className="hidden tab:inline-block h-4 mx-auto text-center">
        {lastUpdatedTime && (
          <time
            className="text-xs text-muted/40 mx-auto font-normal animate-fade-in"
            dateTime={lastUpdatedTime.toISOString()}
          >
            Last Updated:&nbsp;
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "long",
              timeStyle: "long",
              hour12: true,
              timeZone: "America/Los_Angeles",
            }).format(lastUpdatedTime)}
          </time>
        )}
      </div>
      <ul>
        {data.map((event, index) => (
          <li key={event.hash} className="flex flex-col items-center">
            <IBCTransferEventCard networkSlug={params.network} event={event} />
            {index < data.length - 1 && (
              <div aria-hidden="true" className="w-[1px] bg-mid-dark-100 h-4" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DymensionWidgetSkeleton(props: { error?: string }) {
  return (
    <ul className="relative max-w-[52.5rem]  mx-auto">
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
