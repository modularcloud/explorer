export type Entity = {
  uniqueIdentifierLabel: string;
  uniqueIdentifier: string;
  metadata: { [key: string]: string };
  raw: string;
};
