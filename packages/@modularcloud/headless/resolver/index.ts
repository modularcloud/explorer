import { type AnyResolver } from "@modularcloud-resolver/core";

const resolvers = new Map<string, AnyResolver>();

export function registerResolver(resolver: AnyResolver) {
    resolvers.set(resolver.__config.id, resolver);
}

export async function resolve(resolverId: string, input: any) {
    const resolver = resolvers.get(resolverId);
    if (!resolver) {
        throw new Error(`Resolver ${resolverId} not found`);
    }
    return await resolver(input);
}