import { ZodAny } from "zod";

export type Resolver = {
  id: string;
  invoke: (input: any) => Promise<unknown>;
  schema?: ZodAny,
  depedencies: string[];
}

export const Resolvers: Record<string, Resolver> = {}
export const Engine = {
  getResolver: (id: string) => Resolvers[id],
  registerResolver: (resolver: Resolver) => {
    Resolvers[resolver.id] = resolver;
  },
  resolve: async (id: string, input: any): Promise<any> => {
    const resolver = Engine.getResolver(id);
    if (!resolver) {
      throw new Error(`Resolver ${id} not found`);
    }
    const depedencies = await Promise.all(resolver.depedencies.map((dep) => Engine.resolve(dep, input)));
    return resolver.invoke(depedencies.reduce((acc, dep, i) => {
      acc[resolver.depedencies[i]] = dep;
      return acc;
    }, {} as Record<string, any>));
  }
}
