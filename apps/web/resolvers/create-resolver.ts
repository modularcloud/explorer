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
  dependencies: T,
): Resolver<ResolverFn<T>> {
  return async (input: any) => {
    const traces: Trace[] = [];
    let resolution: Resolution = {
      type: "pending",
      resolverId: config.id,
      input,
    };
    try {
      // inject a side effect for storing traces
      const deps = dependencies.map((dependency) => {
        return async (input: any) => {
          const result = await dependency(input);
          traces.push(result.trace);
          return result;
        };
      }) as T;
      resolution = {
        type: "success",
        result: await fn(input, ...deps),
      };
    } catch (e) {
      if (e !== PendingException) {
        resolution = {
          type: "error",
          error: String(e),
        };
      }
    } finally {
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
    }
  };
}

// const test1 = createResolver(
//   { id: "test1", input: {}, cache: false },
//   async (input) => {
//     return input;
//   },
//   []
// );
// const test2 = createResolver(
//   { id: "test2", input: {}, cache: false },
//   async (input, test1) => {
//     return test1(input);
//   },
//   [test1]
// );
