import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { getBalanceQueryData, parseBalance } from "service-manager";
import { z } from "zod";
import { ABCIResponse, JSONRPCResponse } from "service-manager/types/rpc.type";
import { AssociatedTransform } from "./associated";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";

export async function AddressExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const address = z.string().parse(_q);
  const solanaAddressRegex = /^[A-Za-z0-9]{44}$/;
  if (!solanaAddressRegex.test(address)) {
    throw new Error("Invalid Solana address");
  }

  const response = await fetch(metadata.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [address],
    }),
  }).then((res) => res.json());

  let balance = 0;
  if (typeof response?.result?.value === "number") {
    balance = response.result.value;
  }

  return {
    address,
    balance,
    raw: response,
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
