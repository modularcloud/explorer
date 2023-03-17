import { AnyComponentSchema } from "./component";
import { Entity } from "./entity";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

/**
 * Probably should simplify this whole thing
 * Using a builder in order to ensure type safety but this is not actually needed
 * */

export type ComponentTransform<T extends AnyComponentSchema> = {
  schema: T;
  transform: (data: unknown) => Promise<z.infer<T>>;
};

export type AnyComponentTransform = {
  schema: AnyComponentSchema;
  transform: (data: unknown) => Promise<any>;
};

type Extract = (endpoint: string, query: unknown) => Promise<unknown>;

export async function load(
  endpoint: string,
  loader: Loader,
  query: unknown
): Promise<Entity> {
  const { extract, components } = loader.finish();

  const id = uuidv4();
  const data = await extract(endpoint, query);
  const entity = {
    id,
    components: await Promise.all(
      components.map((component) =>
        component.schema.parse(component.transform(data))
      )
    ),
  };

  return entity;
}

function _buildLoader<T extends AnyComponentTransform>(
  extract: Extract,
  componentTransforms: T[] = []
) {
  return {
    addTransform: <K extends AnyComponentSchema>(
      transform: ComponentTransform<K>
    ) => {
      return _buildLoader(extract, [...componentTransforms, transform]);
    },
    finish: () => {
      return {
        extract,
        components: componentTransforms,
      };
    },
  };
}

export function createLoader() {
  return {
    addExtract: (extract: Extract) => _buildLoader(extract),
  };
}
export type Loader = ReturnType<ReturnType<typeof createLoader>["addExtract"]>;
export type Loaders = Record<string, Loader>;
/*export function createConfig(endpoint: string, loaders: Loaders) {
  return {
    endpoint,
    loaders: loaders.finish(),
  };
}*/

// Example
/* import { createComponentSchema, } from "./component";
const a = z.object({ test: z.string() });
const b = z.object({ tests: z.string().array() });

const as = createComponentSchema(a, "hello");
const bs = createComponentSchema(b, "world");

const ac: Component<typeof a, "hello"> = {
  typeId: "hello",
  data: { test: "test1" },
};
const bc: Component<typeof b, "world"> = {
  typeId: "world",
  data: { tests: ["test2"] },
}; */
