import { getDymensionIBCTransfertEvents } from "~/lib/dymension-utils";
import { DymensionWidgetContent } from "./dymension-widget-content";

export type DymensionWidgetLayoutProps = {};

export async function DymensionWidgetLayout({}: DymensionWidgetLayoutProps) {
  const ibcEvents = await getDymensionIBCTransfertEvents();
  return (
    <DymensionWidgetContent
      initialEvents={ibcEvents}
      initialUpdatedAt={new Date()}
    />
  );
}
