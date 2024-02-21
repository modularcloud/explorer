import { NextResponse } from "next/server";
import { getDymensionIBCTransfertEvents } from "~/ui/network-widgets/layouts/dymension/dymension-utils";

export async function POST() {
  const events = await getDymensionIBCTransfertEvents();
  return NextResponse.json(events);
}

export const runtime = "edge";
