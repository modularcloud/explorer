import { z } from "zod";
import { StringLiteral } from "./utilities";

export function createComponentSchema<T extends z.ZodTypeAny, K extends string>(
  schema: T,
  typeId: StringLiteral<K>
) {
  return z.object({
    typeId: z.literal(typeId),
    data: schema,
  });
}

export type ComponentSchemaType<
  T extends z.ZodTypeAny,
  K extends string
> = ReturnType<typeof createComponentSchema<T, K>>;

export type AnyComponentSchema = ComponentSchemaType<any, any>;

export type Component<T extends z.ZodTypeAny, K extends string> = z.infer<
  ComponentSchemaType<T, K>
>;
