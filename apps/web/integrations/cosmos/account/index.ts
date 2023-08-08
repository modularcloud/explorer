import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { getBalanceQueryData, parseBalance } from "service-manager";
import { z } from "zod";
import { ABCIResponse, JSONRPCResponse } from "../../../lib/service-manager";
import { AssociatedTransform } from "./associated";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function AccountExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const address = z.string().parse(_q);
  let queryInput, denom;
  if (address.match(/^dym\w{39}$/)) {
    // dymension hub
    const data = getBalanceQueryData(address, "udym");
    queryInput = `https://rpc-hub-35c.dymension.xyz/abci_query?path="/cosmos.bank.v1beta1.Query/Balance"&data=0x${data}`;
    denom = "DYM";
  } else if (address.match(/^celestia\w{39}$/)) {
    // celestia mocha
    const celestiaBase =
      metadata.network.id.indexOf("mocha") !== -1
        ? "https://rpc-mocha.pops.one"
        : "http://consensus-full-arabica-9.celestia-arabica.com:26657";
    const data = getBalanceQueryData(address, "utia");
    queryInput = `${celestiaBase}/abci_query?path="/cosmos.bank.v1beta1.Query/Balance"&data=0x${data}`;
    denom = "TIA";
  } else if (address.match(/^rol\w{39}$/)) {
    // dymension rollappX
    const data = getBalanceQueryData(address, "urax");
    queryInput = `https://rpc-rollappx-35c.dymension.xyz/abci_query?path=/cosmos.bank.v1beta1.Query/Balance&data=${data}&height=0&prove=false`;
    denom = "RAX";
  } else {
    throw new Error("Unsupported address");
  }
  const response = await fetch(queryInput);
  const json = (await response.json()) as JSONRPCResponse<ABCIResponse>;
  const balance =
    (Number(parseBalance(json.result.response.value)) || 0) / 1000000;

  return {
    address,
    denom,
    balance,
  };
}

export const AccountLoader = createLoader()
  .addExtract(AccountExtract)
  .addTransform(TopbarTransform)
  .addTransform(SidebarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(PageTransform)
  .addTransform(RawTransform)
  .finish();
