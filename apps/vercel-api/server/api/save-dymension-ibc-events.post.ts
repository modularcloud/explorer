import { env } from "~/env";
import {
  createDymensionIBCTableIfNotExists,
  type IBCTransferEvent,
} from "~/lib/dymension-utils";
import { registerResolvers, resolve } from "@modularcloud/headless";
import { sql } from "@vercel/postgres";

export default eventHandler(async (event) => {
  const authHeader = event.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return Response.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
  const DYMENSION_ROLLAPP_IBC_RESOLVER_ID = "rollapp-events-0.0.0";
  const DYMENSION_ROLLAPP_IBC_RESOLVER_INPUT = {
    endpoint:
      "https://froopyland.blockpi.network/rpc/v1/0837569d56317f9a6af3c82170a7242ce8319ae4",
  } as const;

  await createDymensionIBCTableIfNotExists();
  registerResolvers();
  const result = await resolve(
    DYMENSION_ROLLAPP_IBC_RESOLVER_ID,
    DYMENSION_ROLLAPP_IBC_RESOLVER_INPUT,
  );

  if (result.type === "success") {
    const events = result.result.filter(
      (event: IBCTransferEvent | null | undefined) => Boolean(event),
    ) as Array<IBCTransferEvent>;

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

    return Response.json({
      result: `Inserted ${totalSucceededQueries} events`,
      errors: errorQueries,
    });
  }

  return Response.json(
    {
      result,
    },
    {
      status: 500,
    },
  );
});
