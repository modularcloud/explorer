import { registerResolvers, resolve } from "@modularcloud/headless";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env.mjs";
import {
  DYMENSION_ROLLAPP_IBC_RESOLVER_ID,
  DYMENSION_ROLLAPP_IBC_RESOLVER_INPUT,
} from "~/lib/constants";
import { IBCTransferEventSchema } from "~/ui/network-widgets/layouts/dymension/ibc-event-schema";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  registerResolvers();
  const result = await resolve(
    DYMENSION_ROLLAPP_IBC_RESOLVER_ID,
    DYMENSION_ROLLAPP_IBC_RESOLVER_INPUT,
  );

  if (result.type === "success") {
    const headlessResultSchema = z.array(IBCTransferEventSchema);
    const events = headlessResultSchema.parse(
      result.result.filter((event: any | null | undefined) => Boolean(event)),
    );

    // Insert all rows
    const queryResults = await Promise.allSettled(
      events.map(
        (event) => sql`
      INSERT INTO "ibc_transfer_events" 
      (type, hash, timestamp, amount, from_address, from_chainname, from_chainslug, from_chainlogo, to_address, to_chainname, to_chainslug, to_chainlogo, msg_index) VALUES
      ('transfer',
        ${event.hash},
        ${event.timestamp},
        ${event.amount},
        ${event.from.address},
        ${event.from.chainName},
        ${event.from.chainSlug},
        ${event.from.chainLogo},
        ${event.to.address},
        ${event.to.chainName},
        ${event.to.chainSlug},
        ${event.to.chainLogo},
        ${event.msgIndex}
      )
    `,
      ),
    );

    const totalSucceededQueries = queryResults.filter(
      (r) => r.status === "fulfilled",
    ).length;
    const errorQueries = queryResults.filter((r) => r.status === "rejected");

    console.log({
      result: `Inserted ${totalSucceededQueries} events`,
      errors: errorQueries,
    });
    return NextResponse.json({
      result: `Inserted ${totalSucceededQueries} events`,
      errors: errorQueries,
    });
  }

  return NextResponse.json(
    {
      result,
    },
    {
      status: 500,
    },
  );
}
