import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";
import { AssociatedTransform } from "./associated";
import { RowTransform } from "./row";
import { CardTransform } from "./card";
import { z } from "zod";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";
import Web3 from "web3";

const namespaceHexRegex = /^[a-zA-Z0-9]{56}$/;

export async function NamespaceExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  if (Web3.utils.padLeft(query, 56).match(namespaceHexRegex)) {
    return {
      namespace: query,
    };
  }
  const base64 = Web3.utils.padLeft(
    Buffer.from(query, "base64").toString("hex"),
    56,
  );
  if (base64.match(namespaceHexRegex)) {
    return {
      namespace: base64,
    };
  }
  throw new Error("Invalid namespace");
}

export const NamespaceLoader = createLoader()
  .addExtract(NamespaceExtract)
  .addTransform(SidebarTransform)
  .addTransform(TopbarTransform)
  .addTransform(AssociatedTransform)
  .addTransform(CardTransform)
  .addTransform(RowTransform)
  .addTransform(PageTransform)
  .addTransform(RawTransform)
  .finish();
