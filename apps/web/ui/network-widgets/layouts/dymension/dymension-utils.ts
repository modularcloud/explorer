import "server-only";
import { sql } from "@vercel/postgres";
import {
  type IBCTransferEvent,
  IBCTransferEventRowSchema,
} from "./ibc-event-schema";
import { z } from "zod";

export async function getDymensionIBCTransfertEvents() {
  await sql`CREATE TABLE IF NOT EXISTS "ibc_transfer_events" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR(50) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "amount" VARCHAR(255),
    "msg_index" INTEGER DEFAULT 0 NOT NULL,
    "from_address" VARCHAR(255) NOT NULL,
    "from_chainname" VARCHAR(255) NOT NULL,
    "from_chainslug" VARCHAR(255) NOT NULL,
    "from_chainlogo" VARCHAR(255) NOT NULL,
    "to_address" VARCHAR(255) NOT NULL,
    "to_chainname" VARCHAR(255) NOT NULL,
    "to_chainslug" VARCHAR(255) NOT NULL,
    "to_chainlogo" VARCHAR(255) NOT NULL
  );`;

  const dbResultSchema = z.object({
    rows: z.array(IBCTransferEventRowSchema),
  });
  const { rows } = dbResultSchema.parse(
    await sql`SELECT * FROM "ibc_transfer_events" ORDER BY timestamp DESC LIMIT 5;`,
  );

  return rows.map(
    (row) =>
      ({
        type: "transfer" as const,
        hash: row.hash,
        timestamp: Number(row.timestamp),
        msgIndex: Number(row.msg_index),
        amount: row.amount,
        from: {
          address: row.from_address,
          chainName: row.from_chainname,
          chainSlug: row.from_chainslug,
          chainLogo: row.from_chainlogo,
        },
        to: {
          address: row.to_address,
          chainName: row.to_chainname,
          chainSlug: row.to_chainslug,
          chainLogo: row.to_chainlogo,
        },
      }) satisfies IBCTransferEvent,
  );
}
