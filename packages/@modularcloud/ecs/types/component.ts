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

export type ExtractSchema<T> = T extends ComponentSchemaType<infer U, infer V> ? U : never;
export type ExtractKey<T> = T extends ComponentSchemaType<infer U, infer V> ? V : never;
export type InferComponent<T> = T extends ComponentSchemaType<infer U, infer V> ? Component<U, V> : never;
export type InferIdentity<T> = T extends ComponentSchemaType<infer U, infer V> ? ComponentSchemaType<U, V> : never;

// Unfortunately, this doesn't work due to infinite recursion
/*type InferUnion<T> = T extends ComponentSchemaType<infer U, infer V> ? ComponentSchemaType<U, V> : (
  T extends (infer A | infer B) ? (InferUnion<A> | InferUnion<B>) : never
)*/