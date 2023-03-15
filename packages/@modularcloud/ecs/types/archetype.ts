import { ComponentSchemaType } from "./component";
import { z } from "zod";
import { Entity } from "./entity";

export type AnyArchetypeSchema = { [componentName: string]: z.ZodTypeAny };
export type CastField<
  ParentType,
  FieldName extends keyof ParentType,
  NewFieldType
> = NewFieldType extends ParentType[FieldName]
  ? {
      [key in FieldName]: NewFieldType;
    } & Omit<ParentType, FieldName>
  : never;
export type Archetype<T extends AnyArchetypeSchema> = CastField<
  Entity,
  "components",
  { [key in keyof T]: z.infer<T[key]> }
>;

function buildArchetype<TypeId extends string, Component, ExistingComponents>(
  typeId: TypeId,
  newComponent: Component,
  components: ExistingComponents
) {
  type AllMyTypeKeys<K extends string> = {
    [key in K]: key;
  }[K];

  type AllMyTypeEntries<K extends string, V> = {
    [key in AllMyTypeKeys<K>]: V;
  };
  const addon = {
    [typeId]: newComponent,
  } as AllMyTypeEntries<TypeId, Component>;
  const newComponents = { ...components, ...addon };
  return {
    addComponent: <
      NewTypeId extends string,
      NewComponent extends ComponentSchemaType<
        any,
        NewTypeId extends TypeId ? never : NewTypeId
      >
    >(
      newTypeId: NewTypeId,
      component: NewComponent
    ) => {
      return buildArchetype<NewTypeId, NewComponent, typeof newComponents>(
        newTypeId,
        component,
        newComponents
      );
    },
    finish: () => {
      // @ts-ignore
      let { __BUILDING__, ...final } = newComponents;
      return final;
    },
  };
}

export function createArchetype() {
  return buildArchetype("__BUILDING__", true, {});
}

export function verifyArchetype<T extends AnyArchetypeSchema>(
  archetype: T,
  entity: Entity
): Archetype<T> {
  let verifiedComponents = {} as { [key in keyof T]: z.infer<T[key]> };
  const { components } = entity;
  for (const [componentName, component] of Object.entries(archetype)) {
    const entityComponent = components[componentName];
    if (!entityComponent) {
      throw new Error(`Missing component ${componentName}`);
    }
    const key = componentName as keyof T;
    verifiedComponents[key] = component.parse(entityComponent);
  }
  return {
    ...entity,
    components: verifiedComponents,
  } as Archetype<T>;
}

// Example
/* import { Component, createComponentSchema } from "./component";
const a = z.object({ test: z.string() });
const b = z.object({ tests: z.string().array() });

const as = createComponentSchema(a, "hello");
const bs = createComponentSchema(b, "world");

const ac: Component<typeof a, "hello"> = {
  typeId: "hello",
  data: { test: "test1" },
};
const bc: Component<typeof b, "world"> = {
  typeId: "world",
  data: { tests: ["test2"] },
};

const archetype = createArchetype()
  .addComponent("hello", as)
  .addComponent("world", bs)
  .finish();

try {
  const verifiedArchetype = verifyArchetype(archetype, {
    id: "1",
    components: {
      hello: { test: "test1" },
      world: { tests: ["test2"] },
    },
  });
} catch {
  // if it fails, it will throw an error like Zod
} */
