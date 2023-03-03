import { ValueSchemaType } from "./valueschema.type";

export type Entity = {
  uniqueIdentifierLabel: string;
  uniqueIdentifier: string;
  metadata: { [key: string]: ValueSchemaType };
  computed: { [key: string]: any };
  context: {
    network: string;
    entityTypeName: string;
  };
  raw: string;
};
