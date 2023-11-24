import { z } from "zod";

export function createComponentSchema<T extends z.ZodTypeAny, K extends string>(
  schema: T,
  typeId: K,
) {
  return z.object({
    typeId: z.literal(typeId),
    data: schema,
  });
}

export type ComponentSchemaType<
  T extends z.ZodTypeAny,
  K extends string,
> = ReturnType<typeof createComponentSchema<T, K>>;

export type AnyComponentSchema = ComponentSchemaType<any, any>;

export type Component<T extends z.ZodTypeAny, K extends string> = z.infer<
  ComponentSchemaType<T, K>
>;

export type ExtractSchema<T> = T extends ComponentSchemaType<infer U, infer V>
  ? U
  : never;
export type ExtractKey<T> = T extends ComponentSchemaType<infer U, infer V>
  ? V
  : never;
