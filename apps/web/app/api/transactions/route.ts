import Web3 from "web3";
import { TransactionVolumeSchema } from "../../../schemas/transactions";

export async function GET() {
  // fetch current price of ZBC
  let zbcPrice, metrics, transactionVolumes, gasPrice, blockMetrics;
  {
    const response = await fetch("https://api2.zebec.io/price");
    const priceResponse = await response.json();
    zbcPrice = Number(Web3.utils.fromWei(priceResponse.price));
  }

  /// fetch metrics in realtime
  {
    const response = await fetch("https://triton.nautscan.com/api/metrics");
    const metricsResponse = await response.json();

    metrics = {
      contractsDeployed: metricsResponse.result.realTimeMetrics.CONTRACT,
      totalTransactions: metricsResponse.result.realTimeMetrics.TRANSACTION,
      walletAddresses: metricsResponse.result.realTimeMetrics.UNIQUE_ADDRESS,
    };
  }

  // fetch transaction volumes
  {
    const response = await fetch(
      `${process.env.METRICS_API_URL}/transaction-volume-data`
    );
    const transactionResponse = await response.json();
    const data = TransactionVolumeSchema.array().parse(
      transactionResponse.result?.transactionVolumes || []
    );
    transactionVolumes = data
      .sort((a, b) => {
        return Number(new Date(a.endTime)) - Number(new Date(b.endTime));
      })
      .map((item) => {
        return {
          time: new Date(item.endTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          volume: Number(Web3.utils.fromWei(item.volumeInWei)),
        };
      });
  }

  {
    const web3 = new Web3("https://api.evm.zebec.eclipsenetwork.xyz/solana");
    const price = await web3.eth.getGasPrice();
    gasPrice = Number(Web3.utils.fromWei(price));

    const latestBlock = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(latestBlock);
    const latestBlockTimestamp = block.timestamp;
    const thousandBlocksAgo = await web3.eth.getBlock(latestBlock - 1000);
    const thousandBlocksAgoTimestamp = thousandBlocksAgo.timestamp;
    const avgBlockTime =
      (Number(latestBlockTimestamp) - Number(thousandBlocksAgoTimestamp)) /
      1000;
    blockMetrics = {
      avgBlockTime,
      latestBlock,
    };
  }

  return new Response(
    JSON.stringify({
      zbcPrice,
      metrics,
      transactionVolumes,
      blockMetrics,
      gasPrice,
    })
  );
}
