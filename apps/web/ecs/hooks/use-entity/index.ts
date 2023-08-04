import { AnyArchetypeSchema } from "@modularcloud/ecs";
import { fetchLoad } from "../../../lib/utils";
import useSWRImmutable from "swr/immutable";
import { asyncUseEntity } from "./server";

type Args<T extends AnyArchetypeSchema> = {
  resourcePath: Parameters<typeof fetchLoad>[0];
  archetype: T;
};

export function useEntity<T extends AnyArchetypeSchema>({
  resourcePath,
  archetype,
}: Args<T>) {
  return useSWRImmutable(
    resourcePath,
    () => asyncUseEntity({ resourcePath, archetype }),
    { suspense: true },
  );
}
