import * as Celestia from "@modularcloud-resolver/celestia";
import { createResolver, PendingException } from "@modularcloud-resolver/core";
import { z } from "zod";
import { Page, PageContext, Value } from "../../../../../schemas/page";
import { BlockResponse } from "../../../types";

export const CelestiaBlockResolver = createResolver(
    {
      id: "celestia-page-block-0.0.0",
      cache: false, // all cache is disabled for now
    },
    async (
      { context, hashOrHeight }: { context: PageContext; hashOrHeight: string },
      getBlock: typeof Celestia.BlockHeightResolver,
      getBlockByHash: typeof Celestia.BlockHashResolver,
    ) => {
      let type: "hash" | "height" | undefined;
      if (hashOrHeight.match(/^\d+$/)) {
        type = "height";
      }
      if (hashOrHeight.match(/^(?:0x)?([a-fA-F0-9]{64})$/)) {
        type = "hash";
      }
      if (!type) {
        throw new Error("Invalid hash or height");
      }
      const fn = type === "hash" ? getBlockByHash : getBlock;
      const response = await fn({
        endpoint: context.rpcEndpoint,
        [type]: hashOrHeight,
      } as any);
  
      if (response.type === "error") throw response.error;
      if (response.type === "pending") throw PendingException;
  
      const data: BlockResponse = response.result;
  
      const properties: Record<string, Value> = {
        Type: {
          type: "standard",
          payload: "Block",
        },
      };
  
      try {
        properties["Hash"] = {
          type: "standard",
          payload: z.string().parse(data.result.block_id.hash),
        };
      } catch {}
      try {
        properties["Height"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.header.height),
        };
      } catch {}
      try {
        properties["Timestamp"] = {
          type: "standard",
          payload:
            new Date(data.result.block.header.time).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "UTC",
            }) + " UTC",
        };
      } catch {}
      try {
        properties["Proposer"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.header.proposer_address),
        };
      } catch {}
      try {
        properties["Transactions"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.data.txs.length),
        };
      } catch {}
      try {
        properties["Last Commit Hash"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.header.last_commit_hash),
        };
      } catch {}
      try {
        properties["Data Hash"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.header.data_hash),
        };
      } catch {}
      try {
        properties["Validators Hash"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.header.validators_hash),
        };
      } catch {}
      try {
        properties["Next Validators Hash"] = {
          type: "standard",
          payload: z
            .string()
            .parse(data.result.block.header.next_validators_hash),
        };
      } catch {}
      try {
        properties["Consensus Hash"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.header.consensus_hash),
        };
      } catch {}
      try {
        properties["App Hash"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.header.app_hash),
        };
      } catch {}
      try {
        properties["Last Results Hash"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.header.last_results_hash),
        };
      } catch {}
      try {
        properties["Evidence Hash"] = {
          type: "standard",
          payload: z.string().parse(data.result.block.header.evidence_hash),
        };
      } catch {}
  
      const page: Page = {
        context,
        metadata: {
          title: `Block ${hashOrHeight}`,
          description: `See the details of block ${hashOrHeight}`,
        },
        body: {
          type: "notebook",
          properties,
        },
        sidebar: {
          headerKey: "Network",
          headerValue: context.chainName,
          properties: {
            Layer: {
              type: "standard",
              payload: "Data Availability",
            },
            Execution: {
              type: "standard",
              payload: "Cosmos SDK",
            },
          },
        },
        tabs: [
          {
            text: "Overview",
            route: ["blocks", hashOrHeight],
          },
          {
            text: "Transactions",
            route: ["blocks", hashOrHeight, "transactions"],
          },
        ],
      };
      return page;
    },
    [Celestia.BlockHeightResolver, Celestia.BlockHashResolver],
  );