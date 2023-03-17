import { ComponentTransform, createLoader, load, Loaders } from "./etl";

type Config = {
  endpoint: string;
  loaders: Loaders;
}

const _CONFIGS: Record<string, Config> = {};

export const Engine = {
  addConfig: (name: string, config: Config) => {
    _CONFIGS[name] = config;
  },
  load: async (name: string, loader: string, query: unknown) => {
    const config = _CONFIGS[name];
    if (!config) {
      throw new Error(`No config found for ${name}`);
    }

    return await load(config.endpoint, config.loaders[loader], query);
  },
};

// Example
import { z } from "zod";
import { createComponentSchema, Component, AnyComponentSchema } from "./component";
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
};

function fetch(endpoint: string) {
    return Promise.resolve({
        json: () => ({
            test: "test1",
            tests: ["test2"]
        })
    });
}
const config = {
    endpoint: "http://localhost:3000",
    loaders: {
        test: {
            extract: async (endpoint: string, query: unknown) => {
                return await fetch(endpoint).then((res) => res.json());
            },
            components: [
                {
                    schema: as,
                    transform: async (data: unknown): Promise<z.infer<typeof as>> => {
                        return { typeId: "hello", data: { test: (data as { test: string }).test } };
                    }
                },
                /*{
                    schema: bs,
                    transform: async (data: unknown): Promise<z.infer<typeof bs>> => {
                        return { typeId: "world", data: { tests: (data as { tests: string }).tests } };
                    }
                }*/
            ]
        }
    }
};

const x: ComponentTransform<typeof as> = {
    schema: as,
    transform: async (data: unknown): Promise<z.infer<typeof as>> => {
        return { typeId: "hello", data: { test: (data as { test: string }).test } };
    }
}
const y: ComponentTransform<typeof bs> = {
    schema: bs,
    transform: async (data: unknown): Promise<z.infer<typeof bs>> => {
        return { typeId: "world", data: { tests: (data as { tests: string[] }).tests } };
    }
}

const loaders = {
    testLoader:
      createLoader()
        .addExtract(async (endpoint: string, query: unknown) => {
          return await fetch(endpoint).then((res) => res.json());
        })
        .addTransform(x)
        .addTransform(y)
}

Engine.addConfig("tester", { endpoint: config.endpoint, loaders: loaders });