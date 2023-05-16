import Web3 from "web3";
import { createModularCloud } from "@modularcloud/sdk";

export async function GET() {
  /// fetch blocks summary data
  let blocks = [],
    transactions = [];
  const web3 = new Web3("https://api.evm.zebec.eclipsenetwork.xyz/solana");
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);

  async function getTransaction(hash: string, blockNumber: number) {
    const [tx, block] = await Promise.all([
      web3.eth.getTransaction(hash),
      web3.eth.getBlock(blockNumber),
    ]);
    return {
      hash: tx.hash,
      from: tx.from,
      recipient: tx.to,
      amount: Number(web3.utils.fromWei(tx.value)).toPrecision(3),
      timestamp: Number(block.timestamp) * 1000,
    };
  }

  {
    const latestBlock = await web3.eth.getBlockNumber();
    const blockPromises = [];
    for (let i = 0; i < 8; i++) {
      const block = web3.eth.getBlock(latestBlock - i);
      blockPromises.push(block);
    }
    const rawBlocks = await Promise.all(blockPromises);
    blocks = rawBlocks.map((block) => ({
      height: block.number,
      minerAddress: block.miner,

      // from gwei to zbc
      blockreward: block.gasUsed / 1000000000,

      timestamp: Number(block.timestamp) * 1000,
    }));
  }

  {
    const txRefs = await mc.evm.getRecentTransactions("triton", 8);

    transactions = await Promise.all(
      txRefs.txs.map((txRef) => getTransaction(txRef.hash, txRef.blockNumber))
    );
  }

  return new Response(
    JSON.stringify({
      blocks,
      transactions,
    })
  );
}
