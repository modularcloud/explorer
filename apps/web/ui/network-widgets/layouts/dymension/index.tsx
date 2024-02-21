import { getDymensionIBCTransfertEvents } from "~/ui/network-widgets/layouts/dymension/dymension-utils";
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
