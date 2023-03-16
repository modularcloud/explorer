import { Entity, EntityBaseSchema } from "./entity";

export type Loader = {
  extract: (endpoint: string, query: unknown) => Promise<unknown>;
  transform: (data: unknown) => Promise<Entity>;
};

export type Config = {
  endpoint: string;
  loaders: Record<string, Loader>;
};

export async function load(
  config: Config,
  loader: string,
  query: unknown
): Promise<Entity> {
  const { endpoint, loaders } = config;
  const { extract, transform } = loaders[loader];

  const data = await extract(endpoint, query).then(transform);

  // extra validation
  const entity = EntityBaseSchema.parse(data);

  return entity;
}
