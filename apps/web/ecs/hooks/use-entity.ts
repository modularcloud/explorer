// THIS IS NOT A CLIENT SIDE REACT HOOK
// Not sure what the naming convention is for functions like this with RSC

import { AnyArchetypeSchema, verifyArchetype } from "@modularcloud/ecs";
import { fetchLoad } from "../../lib/utils";

type Args<T extends AnyArchetypeSchema> = {
    resourcePath: Parameters<typeof fetchLoad>[0],
    archetype: T
}

export async function useEntity<T extends AnyArchetypeSchema>({
    resourcePath,
    archetype
}: Args<T>) {
    const entity = await fetchLoad(resourcePath);
    if(!entity) return null;

    return verifyArchetype(archetype, entity);
}