import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { createModularCloud } from "@modularcloud/sdk";
import { uploadFile } from "@uploadcare/upload-client";
import Web3 from "web3";
import { z } from "zod";
import { CardTransform } from "./card";
import { RowTransform } from "./row";

const MetadataSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string(),
  decimals: z.number().optional(),
  properties: z.any().optional(),
});

export async function InventoryExtract(
  _q: unknown,
  metadata: EngineConfigMetadata
) {
  const query = z.string().parse(_q);
  const [account, index] = query.split(":");
  const mc = createModularCloud(process.env.EVM_CHAIN_DATA_SERVICE);
  const balances = await mc.evm.getNFTBalancesByAddress(
    metadata.network.id,
    account
  );
  const balance = balances[Number(index)];
  const uri =
    balance.tokenType === "ERC1155"
      ? balance.balance.balance.tokenUri.replace(
          "{id}",
          Web3.utils.padLeft(balance.balance.balance.tokenId, 64)
        )
      : balance.balance.balance.tokenUri;
  const md = await fetch(uri)
    .then((res) => res.json())
    .then((res) => {
      return MetadataSchema.parse(res);
    })
    .then(async (res) => {
      if (res) {
        const fimg = await fetch(res.image);
        const fimgb = Buffer.from(await fimg.arrayBuffer());
        const result = await uploadFile(fimgb, {
          publicKey: process.env.UPLOADCARE_API_KEY as string,
          store: "auto",
          metadata: {
            original: res.image,
          },
        });
        return {
          ...res,
          image: result.cdnUrl,
        };
      }
    });

  return {
    ...balance,
    metadata: md,
  };
}

export const InventoryLoader = createLoader()
  .addExtract(InventoryExtract)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .finish();
