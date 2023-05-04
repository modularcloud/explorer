import { z } from "zod";
import { AnyArchetypeSchema } from "./archetype";

export const EntityBaseSchema = z.object({
  id: z.string(),
  components: z.record(z.any()),
});

export type Entity<Archetype extends AnyArchetypeSchema = AnyArchetypeSchema> =
  AnyArchetypeSchema extends Archetype
    ? z.infer<typeof EntityBaseSchema>
    : {
        id: string;
        components: {
          [key in keyof Archetype]: z.infer<Archetype[key]>;
        };
      };
