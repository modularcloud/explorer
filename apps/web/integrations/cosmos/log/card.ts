import { TransformInput, TransformOutput } from "@modularcloud/ecs";
import { type } from "os";
import { MessageExtract } from ".";
import { CardComponent } from "../../../ecs/components/card";
import { Value } from "../../../schemas/value";

export const CardTransform = {
  schema: CardComponent,
  transform: async ({
    data,
    metadata,
  }: TransformInput<typeof MessageExtract>): Promise<
    TransformOutput<typeof CardComponent>
  > => {
    const attributes: Record<string, Value> = {};
    for (const key in data.metadata) {
      let value = data.metadata[key];
      if (value.type === "string") {
        attributes[key] = {
          type: "standard",
          payload: value.payload,
        }
      }
      if(value.type === "time") {
        attributes[key] = {
          type: "standard",
          payload: new Date(value.payload).toUTCString(),
        }
      }
      if(value.type === "status" || value.type === "list") {
        attributes[key] = value;
      }
    };
    return {
      typeId: "card",
      data: {
        titleBar: "Message",
        badge: data.uniqueIdentifier,
        attributes,
      },
    };
  },
};
