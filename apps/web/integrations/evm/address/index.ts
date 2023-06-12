import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import Web3 from "web3";
import { z } from "zod";
import { AssociatedTransform } from "./associated";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

async function safePromise<T>(p: Promise<T>) {
  try {
    return await p;
  } catch (e) {
    return null;
  }
}

export async function AddressExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const address = z.string().parse(_q);
  if (!address || !address.match(/^\w{42}$/)) {
    throw new Error("Invalid address");
  }
  const web3 = new Web3(metadata.endpoint);
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const [code, contract, nftBalances, erc20Token] = await Promise.all([
    web3.eth.getCode(address),
    safePromise(mc.evm.describeContract(metadata.network.id, address)),
    safePromise(mc.evm.getNFTBalancesByAddress(metadata.network.id, address)),
    safePromise(mc.evm.getTokenByAddress(metadata.network.id, address)),
  ]);

  return {
    address,
    code,
    contract,
    nftBalances,
    erc20Token,
  };
}

export const AddressLoader = createLoader()
  .addExtract(AddressExtract)
  .addTransform(TopbarTransform)
  .addTransform(SidebarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(PageTransform)
  .addTransform(RawTransform)
  .finish();
