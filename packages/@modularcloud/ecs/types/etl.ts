import { AnyComponentSchema } from "./component";
import { Entity } from "./entity";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

/**
 * Probably should simplify this whole thing
 * Using a builder in order to ensure type safety but this is not actually needed
 * */

export type ComponentTransform<Input, T extends AnyComponentSchema> = {
  schema: T;
  transform: (data: Input) => Promise<z.infer<T>>;
};

export type AnyComponentTransform<Input> = {
  schema: AnyComponentSchema;
  transform: (data: Input) => Promise<any>;
};

export type Extract<T> = (endpoint: string, query: unknown) => Promise<T>;

export type TransformInput<ExtractFn extends (...args: any) => any> = Awaited<
  ReturnType<ExtractFn>
>;
export type TransformOutput<Schema extends AnyComponentSchema> =
  z.infer<Schema>;

export async function load(
  endpoint: string,
  loader: Loader,
  query: unknown
): Promise<Entity> {
  const { extract, components } = loader;

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

function _buildLoader<Input, T extends AnyComponentTransform<Input>>(
  extract: Extract<Input>,
  componentTransforms: T[] = []
) {
  return {
    addTransform: <K extends AnyComponentSchema>(
      transform: ComponentTransform<Input, K>
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
    addExtract: <T>(extract: Extract<T>) => _buildLoader(extract),
  };
}
export type Loader = {
  extract: Extract<any>;
  components: AnyComponentTransform<any>[];
};
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
