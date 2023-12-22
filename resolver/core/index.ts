export type ResolverConfig = {
  id: string;
  cache: boolean;
};

let cacheFn: (fn: AnyResolver, input: any) => Promise<any> = async (
  fn: AnyResolver,
  input: any,
) => {
  console.log(`Cache enabled but not configured for ${fn.__config.id}`);
  return fn(input);
};

export function setCacheFn(fn: (fn: AnyResolver, input: any) => Promise<any>) {
  cacheFn = fn;
}

export function useNextUnstableCache(unstable_cache: any) {
  cacheFn = async (fn: AnyResolver, input: any) => {
    return unstable_cache(fn, [fn.__config.id, input], {
      revalidate: 1
    })(input);
  };
}

export type Resolution =
  | {
      type: "success";
      result: any;
    }
  | {
      type: "error";
      error: string;
    }
  | {
      // get notified when the resolution is done
      type: "pending";
      resolverId: string;
      input: any;
    };

// if data is not yet available, but the query is expected to be valid, throw PendingException
export const PendingException = Symbol("PendingException");
export function NotFound() {
  throw PendingException;
}

export type Trace = {
  resolverId: string;
  input: any;
  resolution: Resolution;
  createdAt: number;
  dependencies: Trace[];
};

export type ResolutionResponse = {
  trace: Trace;
} & Resolution;

type ResolverFn<K, T extends Resolver<K>[]> = {
  (input: K, ...dependencies: T): Promise<any>;
};

export type Resolver<K> = {
  (input: K): Promise<ResolutionResponse>;
  __config: ResolverConfig;
};

export type AnyResolver = Resolver<any>;

export function createResolver<K, T extends Resolver<any>[]>(
  config: ResolverConfig,
  fn: ResolverFn<K, T>,
  dependencies: T,
): Resolver<K> {
  const fnWrapper = async (input: any) => {
    const traces: Trace[] = [];
    let resolution: null | Resolution = null;
    try {
      // inject a side effect for storing traces
      const deps = dependencies.map((dependency) => {
        return async (input: any) => {
          const result = await cacheFn(dependency, input);
          traces.push(result.trace);

          return result;
        };
      }) as T;
      const result = await fn(input, ...deps);
      resolution = {
        type: "success",
        result,
      };
    } catch (e) {
      if (e === PendingException) {
        resolution = {
          type: "pending",
          resolverId: config.id,
          input,
        };
      } else {
        resolution = {
          type: "error",
          error: `${config.id}(${JSON.stringify(input)}): ${e}`,
        };
      }
    } finally {
      if (resolution) {
        return {
          trace: {
            resolverId: config.id,
            input,
            resolution: resolution,
            createdAt: Date.now(),
            dependencies: traces,
          },
          ...resolution,
        };
      } else {
        throw new Error("Execution failure");
      }
    }
  };
  fnWrapper.__config = config;
  return fnWrapper;
}
