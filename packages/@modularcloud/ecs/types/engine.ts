import { load, Loaders } from "./etl";

export type MultiEngineConfig = {
  primary: EngineConfig;
  secondary: EngineConfig;
  conflicts: string[];
};
export type EngineConfig = {
  metadata: {
    endpoint: string;
    network: {
      id: string;
      displayName: string;
      logoUrl: string;
      nativeToken: string;
      sourcifyChainId?: string;
    };
  };
  loaders: Loaders;
};
export type EngineConfigMetadata = EngineConfig["metadata"];
export type LoadProps = {
  network: string;
  type: string;
  query: unknown;
};

const _CONFIGS: Record<string, EngineConfig | MultiEngineConfig> = {};

export const Engine = {
  addConfig: (name: string, config: EngineConfig | MultiEngineConfig) => {
    _CONFIGS[name] = config;
  },
  load: async ({ network, type, query }: LoadProps) => {
    const config = _CONFIGS[network];
    if (!config) {
      throw new Error(`No config found for ${network}`);
    }
    if ("primary" in config) {
      if (config.conflicts.includes(type)) {
        // initiate the backup, just in case (but don't wait for it)
        const backup = load(
          config.secondary.metadata,
          config.secondary.loaders[type],
          query,
        );
        try {
          const preferred = await load(
            config.primary.metadata,
            config.primary.loaders[type],
            query,
          );
          if (preferred) {
            return preferred;
          }
          throw new Error("No preferred data found");
        } catch {
          return await backup;
        }
      }
      const loads = [];
      if (config.primary.loaders[type]) {
        loads.push(
          load(config.primary.metadata, config.primary.loaders[type], query),
        );
      }
      if (config.secondary.loaders[type]) {
        loads.push(
          load(
            config.secondary.metadata,
            config.secondary.loaders[type],
            query,
          ),
        );
      }
      return await Promise.any(loads);
    } else {
      return await load(config.metadata, config.loaders[type], query);
    }
  },
};

// Example
/*import { z } from "zod";
import { createComponentSchema, Component } from "./component";
import { ComponentTransform, createLoader } from "./etl";

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
      tests: ["test2"],
    }),
  });
}

const x: ComponentTransform<typeof as> = {
  schema: as,
  transform: async (data: unknown): Promise<z.infer<typeof as>> => {
    return { typeId: "hello", data: { test: (data as { test: string }).test } };
  },
};
const y: ComponentTransform<typeof bs> = {
  schema: bs,
  transform: async (data: unknown): Promise<z.infer<typeof bs>> => {
    return {
      typeId: "world",
      data: { tests: (data as { tests: string[] }).tests },
    };
  },
};

const loaders = {
  testLoader: createLoader()
    .addExtract(async (endpoint: string, query: unknown) => {
      return await fetch(endpoint).then((res) => res.json());
    })
    .addTransform(x)
    .addTransform(y),
};

Engine.addConfig("tester", { endpoint: "localhost", loaders: loaders });*/
