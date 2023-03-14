import {
  Component,
  ComponentSchemaType,
  createComponentSchema,
} from "./component";
import { z } from "zod";

export type AnyArchteype = { [componentName: string]: z.ZodTypeAny };

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

export function verifyArchetype<T extends AnyArchteype>(
  archetype: T,
  entity: { [component: string]: any }
): { [key in keyof T]: z.infer<T[key]> } {
  let verifiedEntity = {} as { [key in keyof T]: z.infer<T[key]> };
  for (const [componentName, component] of Object.entries(archetype)) {
    const entityComponent = entity[componentName];
    if (!entityComponent) {
      throw new Error(`Missing component ${componentName}`);
    }
    const key = componentName as keyof T;
    verifiedEntity[key] = component.parse(entityComponent);
  }
  return verifiedEntity;
}

// Example
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
    hello: { test: "test1" },
    world: { tests: ["test2"] },
  });
} catch {
  // if it fails, it will throw an error like Zod
}

