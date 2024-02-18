import { createResolver } from "@modularcloud-resolver/core";
import { ParsedMsg, hubResolvers } from "@modularcloud-resolver/rollapp";

type IBCTransferEvent = {
  type: "transfer";
  hash: string;
  msgIndex: number;
  timestamp: number;
  amount?: string;
  from: {
    address: string;
    chainName: string;
    chainSlug: string;
    chainLogo: string;
  };
  to: {
    address: string;
    chainName: string;
    chainSlug: string;
    chainLogo: string;
  };
};

export const RollAppEvents = createResolver(
  {
    id: "rollapp-events-0.0.0",
    cache: false,
  },
  async (input: { endpoint: string }, getLatestHubMessages) => {
    const [messages, integrations] = await Promise.all([
      getLatestHubMessages({
        endpoint: input.endpoint,
        limit: 5,
      }),
      fetch(
        `${process.env.INTERNAL_INTEGRATION_API_URL}/integrations-summary?returnAll=true&maxResults=5000`,
      ).then((res) => res.json()),
    ]);
    if (messages.type !== "success") {
      throw new Error("Failed to fetch messages");
    }
    const results: [
      (
        | ParsedMsg<"/ibc.applications.transfer.v1.MsgTransfer">
        | ParsedMsg<"/ibc.core.channel.v1.MsgRecvPacket">
      ),
      string,
      number,
      number,
    ][] = messages.result;
    return Promise.all(
      results.map(async (entry) => {
        const msg = entry[0];
        const hash = entry[1];
        const timestamp = entry[2];
        const msgIndex = entry[3];
        if (msg.typeUrl === "/ibc.applications.transfer.v1.MsgTransfer") {
          const integration = integrations.result.integrations.find(
            (i: any) =>
              i.config?.platformData?.appData?.ibcHubChannel ===
              msg.decodedValue.sourceChannel,
          );
          if (!integration) return;
          let amount: string | undefined;
          const token = msg.decodedValue.token;
          if (token && token.denom === "udym") {
            const dymAmount = `${Number(token.amount) / 10 ** 18} DYM`;
            const udymAmount = `${token.amount} uDYM`;

            amount =
              dymAmount.length <= udymAmount.length ? dymAmount : udymAmount;
          }

          if (token && token.denom.startsWith("ibc/")) {
            const denomIntegration = await fetch(
              `${
                process.env.INTERNAL_INTEGRATION_API_URL
              }/integrations/dym/devnet/denom-hash/${
                token.denom.split("/")[1]
              }`,
            ).then((res) => res.json());
            if (denomIntegration.result.integration) {
              const chain = denomIntegration.result.integration.config.token;
              amount = `${
                Number(token.amount) / 10 ** chain.decimals
              } ${chain.name.toUpperCase()}`;
            }
          }

          return {
            type: "transfer",
            hash,
            timestamp,
            amount,
            msgIndex,
            from: {
              address: msg.decodedValue.sender,
              chainName: "Froopyland",
              chainSlug: "dymension-froopyland",
              chainLogo:
                "https://mc-config.s3.us-west-2.amazonaws.com/dymension-froopyland.png",
            },
            to: {
              address: msg.decodedValue.receiver,
              chainName: `${integration.chainName} (${integration.chainBrand})`,
              chainSlug: integration.slug,
              chainLogo: `${integration.config?.logoUrl}`,
            },
          };
        }
        if (msg.typeUrl === "/ibc.core.channel.v1.MsgRecvPacket") {
          const integration = integrations.result.integrations.find(
            (i: any) =>
              i.config?.platformData?.appData?.ibcHubChannel ===
              msg.decodedValue.packet?.destinationChannel,
          );
          if (!integration) return;
          try {
            const details = JSON.parse(
              Buffer.from(msg.decodedValue.packet?.data!).toString(),
            );
            let amount: string | undefined;
            if (details.denom === "udym") {
              const dymAmount = `${Number(details.amount) / 10 ** 18} DYM`;
              const udymAmount = `${details.amount} uDYM`;

              amount =
                dymAmount.length <= udymAmount.length ? dymAmount : udymAmount;
            } else {
              const denomParts = details.denom.split("/");
              // i.e. transfer/channel-1111/uexample
              const channel = denomParts[denomParts.length - 2];
              const denomIntegration = integrations.result.integrations.find(
                (i: any) =>
                  i.config?.platformData?.appData?.ibcHubChannel === channel,
              );
              if (denomIntegration) {
                const chain = denomIntegration.config.token;
                amount = `${
                  Number(details.amount) / 10 ** chain.decimals
                } ${chain.name.toUpperCase()}`;
              }
            }
            return {
              type: "transfer",
              hash,
              timestamp,
              msgIndex,
              amount,
              from: {
                address: details.sender,
                chainName: `${integration.chainName} (${integration.chainBrand})`,
                chainSlug: integration.slug,
                chainLogo: `${integration.config?.logoUrl}`,
              },
              to: {
                address: details.receiver,
                chainName: "Froopyland",
                chainSlug: "dymension-froopyland",
                chainLogo:
                  "https://mc-config.s3.us-west-2.amazonaws.com/dymension-froopyland.png",
              },
            };
          } catch (e) {
            console.error("Failed to parse packet data", e);
            return null;
          }
        }
      }),
    );
  },
  [hubResolvers.getLatestHubMessages],
);
