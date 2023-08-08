import { createLoader, EngineConfigMetadata } from "@modularcloud/ecs";
import { SidebarTransform } from "./sidebar";
import { TopbarTransform } from "./topbar";
import { AssociatedTransform } from "./associated";
import { RowTransform } from "./row";
import { CardTransform } from "./card";
import { z } from "zod";
import { PageTransform } from "./page";
import { RawTransform } from "./raw";

const namespaceHexRegex = /^[a-zA-Z0-9]{16}$/;

export async function NamespaceExtract(
  _q: unknown,
  metadata: EngineConfigMetadata,
) {
  const query = z.string().parse(_q);
  if (query.match(namespaceHexRegex)) {
    return {
      namespace: query,
    };
  }
  if (Buffer.from(query, "base64").toString("hex").match(namespaceHexRegex)) {
    return {
      namespace: Buffer.from(query, "base64").toString("hex"),
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
