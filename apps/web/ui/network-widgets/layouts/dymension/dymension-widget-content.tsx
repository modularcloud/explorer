"use client";
import * as React from "react";
import {
  IBCTransferEventCard,
  IBCTransferEventCardSkeleton,
} from "~/ui/network-widgets/widgets/ibc-transfert-event-card";
import type { IBCTransferEvent } from "~/lib/dymension-utils";
import { useDymensionWidgetData } from "./use-widget-data";
import { useParams } from "next/navigation";
import { range } from "~/lib/shared-utils";
import { useClientOnlyTime } from "~/ui/network-widgets/use-client-only-time";
import { Transition } from "@headlessui/react";

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

  const [items, setItems] = React.useState<
    (IBCTransferEvent & { show: boolean })[]
  >(() =>
    initialEvents.map((event) => ({
      ...event,
      show: true,
    })),
  );

  React.useEffect(() => {
    setItems((oldEvents) => {
      const newEvents = [...oldEvents];
      const newData = data ?? [];

      // hide events that aren't in the new data returned from the API
      // we want to limit to only 5 items shown at a time
      for (const event of newEvents) {
        if (!newData.find((ev) => ev.hash === event.hash)) {
          event.show = false;
        }
      }
      for (const event of newData) {
        if (!newEvents.find((ev) => ev.hash === event.hash)) {
          newEvents.push({
            ...event,
            show: true,
          });
        }
      }

      return newEvents.sort((a, b) => {
        // put showed events before every other item
        if (a.show) {
          if (a.timestamp > b.timestamp) return -1;
          if (b.timestamp > a.timestamp) return 1;
        }
        if (b.show) return 1;
        return 0;
      });
    });
  }, [data]);

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
        {items.map((event, index) => (
          <Transition
            as="li"
            appear
            className="flex flex-col items-center"
            show={event.show}
            key={event.hash}
            enter="transform transition duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform transition ease-in-out duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <>
              <IBCTransferEventCard
                networkSlug={params.network}
                event={event}
              />
              {event.show && index < 4 && (
                <div
                  aria-hidden="true"
                  className="w-[1px] bg-mid-dark-100 h-4"
                />
              )}
            </>
          </Transition>
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
