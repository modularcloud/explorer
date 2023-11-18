import { createResolver, PendingException } from "@modularcloud-resolver/core";
import * as RollApp from "@modularcloud-resolver/rollapp";
import { Page, PageContext, Value } from "../../../../../schemas/page";
import * as Celestia from "@modularcloud-resolver/celestia";
import { BlockResponse, TransactionResponse } from "../../../types";
import { z } from "zod";
import {
  getBlockProperties,
  getTransactionProperties,
  selectSidebarBlockProperties,
} from "../../../helpers";
import { getDefaultSidebar } from "../../../../../helpers";

export const RollappTransactionResolver = createResolver(
  {
    id: "rollapp-page-transaction-0.0.0",
    cache: false, // all cache is disabled for now
  },
  async (
    { context, hash }: { context: PageContext; hash: string },
    getTransaction: typeof RollApp.TransactionResolver,
    getBlock: typeof RollApp.BlockHeightResolver,
  ) => {
    console.log("hello2!")
    const response = await getTransaction({
      endpoint: context.rpcEndpoint,
      hash: hash,
    });
    if (response.type === "error") throw response.error;
    if (response.type === "pending") throw PendingException;

    const { Hash, Height, ...rest } = getTransactionProperties(response.result);

    /**
     * The block data to contextualize the transaction
     */
    const blockResponse = await getBlock({
      endpoint: context.rpcEndpoint,
      height: (response.result as TransactionResponse)?.result?.height,
    });

    const blockProperties: Record<string, Value> = {};

    if (blockResponse.type === "success") {
      const parsedBlockResponse = getBlockProperties(blockResponse.result);
      blockProperties["Timestamp"] = parsedBlockResponse["Timestamp"];

      // there has to be a better way...
      if (Height.type === "link") {
        Height.payload.sidebar.properties =
          selectSidebarBlockProperties(parsedBlockResponse);
        Height.payload.route.unshift(
          `${context.chainBrand}-${context.chainName}`,
        );
      }
    }

    let ibcReceviedTx_Hub 
    let ibcReceviedTx_DestinationChain
    let ibcAcknowledgementTx_SourceChain
    
    const baseUrl =
    // use the public vercel url if it exists
    (process.env.NEXT_PUBLIC_VERCEL_URL &&
      `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ||
    // otherwise use the internal vercel url
    (process.env.VERCEL_URL && `http://${process.env.VERCEL_URL}`) ||
    // otherwise use the localhost
    "http://localhost:3000";
  
    const messagesResponse = await fetch(baseUrl + "/api/node/get-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ str: response.result.result.tx }),
    });
    const messages = await messagesResponse.json();
    const txType = messages[0]?.uniqueIdentifier ?? "Unknown";

    if (txType === "IBC Transfer") {
      console.log("IBC Transfer!!!");
      let sourceChainPacketSequence
      // Get IBC Recevied on DymensionHub
      /// 1. Get packet sequence from events
      response.result.result.tx_result.events.forEach((event :{
        type: string;
        attributes: {
          key: string;
          value: string;
          index: boolean;
        }[];
      }) => {
        if (event.type === "send_packet") {
          event.attributes.forEach((attribute: { key: string; value: string; index: boolean; }) => {
            if (attribute.key === "cGFja2V0X3NlcXVlbmNl") {
              const decodedValue = Buffer.from(attribute.value, 'base64').toString();
              sourceChainPacketSequence = decodedValue;
            }
          });
        }
      });
      /// 2. Get channelId from config
      /// TODO: Get it from integration config
      let sourceChainHubChannelId = "channel-5446"
      
      // 3: Query hub node
      // TODO: Get hubNodeUrl from env
      const hubNodeUrl = "https://froopyland.rpc.silknodes.io";
      // 4: Query hub node for packet 
      const hubNodeResponse = await fetch(hubNodeUrl + "/tx_search?query=\"recv_packet.packet_sequence=" + sourceChainPacketSequence + " AND recv_packet.packet_dst_channel='" + sourceChainHubChannelId + "'\"");
      const hubNodeResponseJson = await hubNodeResponse.json();
      
      // 5: Get packet sequence and destination chain hub channel from the result
      let hubPacketSequence
      let destinationChainHubChannel
      // TODO: error handling
      ibcReceviedTx_Hub = hubNodeResponseJson.result.txs[0].hash;
      hubNodeResponseJson.result.txs[0].tx_result.events.forEach((event :{
        type: string;
        attributes: {
          key: string;
          value: string;
          index: boolean;
        }[];
      }) => {
        if (event.type === "send_packet") {
          event.attributes.forEach((attribute: { key: string; value: string; index: boolean; }) => {
            if (attribute.key === "cGFja2V0X3NlcXVlbmNl") { // packet_sequence. TODO: define costant
              const decodedValue = Buffer.from(attribute.value, 'base64').toString();
              hubPacketSequence = decodedValue;
            } else if (attribute.key === "cGFja2V0X3NyY19jaGFubmVs") { // packet_src_channel. TODO: define costant
              const decodedValue = Buffer.from(attribute.value, 'base64').toString();
              destinationChainHubChannel = decodedValue;
            }
          });
        }
      });

      // Get IBC recevied on destination chain
      //// 1. Query destination chain node for packet
      //// TODO: Get it from config by hub channel
      let destinationChainRpcUrl = "https://froopyland.dymension.xyz/4/modularfam_6209067-1/rpc"
      const destinationChainNodeResponse = await fetch(destinationChainRpcUrl + "/tx_search?query=recv_packet.packet_sequence=" + hubPacketSequence + " AND recv_packet.packet_src_channel='" + destinationChainHubChannel + "'&prove=false&page=1&per_page=10&order_by=desc");
      const destinationChainNodeResponseJson = await destinationChainNodeResponse.json();
      ibcReceviedTx_DestinationChain = destinationChainNodeResponseJson.result.txs[0].hash;

      // Get IBC Ack on source chain
      //// TODO: Get it from integ config
      let sourcChainRpcUrl = "https://froopyland.dymension.xyz/7/coinhunterstrrollapp_9084503-1/rpc"
      const sourceChainAckTx = await fetch(sourcChainRpcUrl + "/tx_search?query=acknowledge_packet.packet_sequence=" + sourceChainPacketSequence + "&prove=false&page=1&per_page=10&order_by=desc");
      const sourcChainAckTxJson = await sourceChainAckTx.json();
      ibcAcknowledgementTx_SourceChain = sourcChainAckTxJson.result.txs[0].hash;
    
      
      console.log("IBCReceviedTx_Hub: " + ibcReceviedTx_Hub);
      console.log("IBCReceviedTx_DestinationChain: " + ibcReceviedTx_DestinationChain);
      console.log("IBCAcknowledgementTx_SourceChain: " + ibcAcknowledgementTx_SourceChain);
  
    }

    // find the 
    const page: Page = {
      context,
      metadata: {
        title: `Transaction ${hash}`,
        description: `See the details of transaction ${hash}`,
      },
      body: {
        type: "notebook",
        properties: {
          // Setting the proper order
          Hash,
          Height,
          ...blockProperties,
          ...rest,
        },
      },
      sidebar: getDefaultSidebar("Transaction", hash, "Overview"),
      tabs: [
        {
          text: "Overview",
          route: ["transactions", hash],
        },
        {
          text: "Messages",
          route: ["transactions", hash, "messages"],
        },
      ],
    };
    return page;
  },
  [RollApp.TransactionResolver, RollApp.BlockHeightResolver],
);