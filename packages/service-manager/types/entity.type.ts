export type Entity = {
  uniqueIdentifierLabel: string;
  uniqueIdentifier: string;
  metadata: { [key: string]: string };
  computed: { [key: string]: any };
  context: {
    network: string;
    entityTypeName: string;
  };
  raw: string;
};
