export type Entity = {
  uniqueIdentifierLabel: string;
  uniqueIdentifier: string;
  metadata: { [key: string]: string };
  context: {
    network: string;
    entityTypeName: string;
  };
  raw: string;
};
