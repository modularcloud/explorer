import { NextResponse } from "next/server";
import { getDymensionIBCTransfertEvents } from "~/lib/dymension-utils";

export async function POST() {
  const events = await getDymensionIBCTransfertEvents();
  return NextResponse.json(events);
}

export const runtime = "edge";
