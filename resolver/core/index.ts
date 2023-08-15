export type ResolverConfig = {
  id: string;
  cache: boolean;
};

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

type ResolverFn<T extends Resolver<any>[]> = {
  (input: any, ...dependencies: T): Promise<any>;
};

type Resolver<T extends ResolverFn<any>> = {
  (input: Parameters<T>[0]): Promise<ResolutionResponse>;
};

export function createResolver<T extends Resolver<any>[]>(
  config: ResolverConfig,
  fn: ResolverFn<T>,
  dependencies: T
): Resolver<ResolverFn<T>> {
  return async (input: any) => {
    const traces: Trace[] = [];
    let resolution: null | Resolution = null;
    try {
      // inject a side effect for storing traces
      const deps = dependencies.map((dependency) => {
        return async (input: any) => {
          const result = await dependency(input);
          traces.push(result.trace);

          if (result.type === "error" || result.type === "pending") {
            const { trace, ...rest } = result;
            resolution = rest;
          }

          return result;
        };
      }) as T;
      const result = await fn(input, ...deps);
      if (!resolution) {
        resolution = {
          type: "success",
          result,
        };
      }
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
          error: `${config.id}(${JSON.stringify(input)}): ${e}}`,
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
}