import { NextResponse } from "next/server";
import { getSingleNetworkCached } from "~/lib/network";
import {
  getZbcPrice,
  getGasPrice,
  getBlockMetrics,
  getRealTimeMetrics,
  getEVMLatestBlocks,
  getEVMLatestTransactions,
  getTransactionVolumeHistory,
  APICORSHeaders,
} from "~/lib/server-utils";

export async function GET(_: Request, ctx: { params: { network: string } }) {
  const network = await getSingleNetworkCached(ctx.params.network);

  if (!network || !network.config.rpcUrls.evm) {
    return NextResponse.json(
      {
        error: "a network with this slug could not be found",
      },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  if (network.config.widgetLayout === "EvmWithPrice") {
    const [
      zbcPrice,
      gasPrice,
      blockMetrics,
      realTimeMetrics,
      transactionHistory,
      latestBlocks,
      latestTransactions,
    ] = await Promise.all([
      getZbcPrice(),
      getGasPrice(network.config.rpcUrls.evm!),
      getBlockMetrics(network.config.rpcUrls.evm!),
      getRealTimeMetrics(network.integrationId),
      getTransactionVolumeHistory(network.integrationId),
      getEVMLatestBlocks(network.slug, network.config.rpcUrls.evm!),
      getEVMLatestTransactions(network.slug, network.config.rpcUrls.evm!),
    ]);

    return NextResponse.json(
      {
        data: {
          zbcPrice,
          gasPrice,
          blockMetrics,
          realTimeMetrics,
          transactionHistory,
          latestBlocks,
          latestTransactions,
        },
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } else {
    return NextResponse.json(
      {
        error: "this network layout is not supported yet",
      },
      {
        status: 422,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

export async function OPTIONS(_: Request) {
  return new Response(null, {
    headers: APICORSHeaders,
  });
}

export const runtime = "edge";
export const fetchCache = "default-no-store";
