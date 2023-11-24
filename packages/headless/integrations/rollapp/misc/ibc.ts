import { createResolver } from "core";
import { z } from "zod";
import { Value } from "../../../schemas/page";
import * as Rollapp from "rollapp";

const Transaction = z.object({
  blockHeight: z.number(),
  transactionHash: z.string(),
  timeStamp: z.number(),
});

const Step = z.object({
  name: z.string(),
  integrationId: z.string(),
  status: z.string(),
  transaction: Transaction,
});

const IntegrationConfig = z.object({
  integrationId: z.string(),
  chainBrand: z.string(),
  chainName: z.string(),
  slug: z.string(),
  config: z.object({
    logoUrl: z.string(),
  }),
});

const IBC = z.object({
  overview: z.object({
    sourceIntegrationId: z.string(),
    destinationIntegrationId: z.string(),
  }),
  steps: z.array(Step),
});

const Result = z.object({
  result: z.object({
    ibc: IBC,
    metadata: z.object({
      integrationConfigs: z.array(IntegrationConfig),
    }),
  }),
});

type node = {
  type: "completed";
  id: string;
  shortId?: string;
  label: string;
  timestamp: string | number;
  link: string;
  sidebar: Record<string, Value>;
  image: string;
};

export const IBCResolver = createResolver(
  {
    id: "rollapp-ibc-0.0.0",
    cache: false,
  },
  async ({
    hash,
    step,
    slug,
  }: {
    hash: string;
    step: 0 | 1 | 2 | 3;
    slug: string;
  }) => {
    const integration = await fetch(
      `${process.env.INTERNAL_INTEGRATION_API_URL}/integrations/slug/${slug}`,
    ).then((res) => res.json());
    const integrationId = integration.result.integration.integrationId;
    //const rpcEndpoint = integration.result.integration.config.rpcUrls.cosmos;
    const stepName = [
      "IBCTransfer_SRC",
      "IBCRecevied_HUB",
      "IBCRecevied_DST",
      "IBCAcknowledgement_SRC",
    ][step];
    const response = await fetch(
      `https://aptaki5hsk.execute-api.us-west-2.amazonaws.com/prod/v1/integration/${integrationId}/ibc-info/tx-hash/${hash}?step=${stepName}`,
    ).then((res) => res.json());
    const data = Result.parse(response);
    const id = data.result.ibc.steps[0].transaction.transactionHash;
    const integrations = await fetch(
      `${process.env.INTERNAL_INTEGRATION_API_URL}/integrations-summary`,
    ).then((res) => res.json());
    const rpcIntegration = integrations.result.integrations.find(
      (i: any) => i.integrationId === data.result.ibc.steps[0].integrationId,
    );
    const rpcEndpoint = rpcIntegration.config.rpcUrls.cosmos;
    const tx = await fetch(
      `${rpcEndpoint}/tx?hash=${step === 1 ? "0x" : ""}${id}&prove=false`,
    ).then((res) => res.json());
    const messages = Rollapp.helpers.getMessages(tx.result.tx);
    const msgName = [
      "MsgTransfer",
      "MsgRecvPacket",
      "MsgRecvPacket",
      "MsgAcknowledgement",
    ][step];
    const messageIndex = messages.findIndex(
      (m) => m.typeUrl.indexOf(msgName) !== -1,
    );
    const label = ["Transfer", "Received", "Received", "Acknowledgement"][step];
    const message = messages[messageIndex];
    const node: node = {
      type: "completed",
      label,
      id,
      shortId: id.slice(0, 3) + "..." + id.slice(-3),
      timestamp: data.result.ibc.steps[0].transaction.timeStamp,
      link: `/${rpcIntegration.slug}/transactions/${id}/messages/${messageIndex}`,
      sidebar: Object.entries(
        Rollapp.helpers.convertMessageToKeyValue(message),
      ).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: {
            type: "standard",
            payload: value,
          },
        };
      }, {}),
      image: `${data.result.metadata.integrationConfigs.find(
        (i) => i.integrationId === data.result.ibc.steps[0].integrationId,
      )?.config.logoUrl}?raw=true`,
    };
    return node;
  },
  [],
);
