import { ComponentSchemaType, ExtractKey } from "./component";
import { z } from "zod";
import { Entity } from "./entity";

export type AnyArchetypeSchema = { [componentName: string]: z.ZodTypeAny };

// TODO: Prevent duplicate typeIds
function buildArchetype<Prev>(prev: Prev = {} as Prev) {
  return {
    addComponent: <
      TypeId extends string,
      NewComponent extends ComponentSchemaType<any, TypeId>,
    >(
      newComponent: NewComponent,
    ) => {
      const typeId = newComponent.shape.typeId
        .value as unknown as ExtractKey<NewComponent>;
      return buildArchetype({ ...prev, [typeId]: newComponent } as Prev & {
        [key in typeof typeId]: NewComponent;
      });
    },
    finish: () => {
      return prev;
    },
  };
}

export function createArchetype() {
  return buildArchetype();
}

// TODO: Use Zod
export function verifyArchetype<T extends AnyArchetypeSchema>(
  archetype: T,
  entity: Entity,
): Entity<T> {
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
  };
}

// Example
/*import { Component, createComponentSchema } from "./component";
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

const archetype = createArchetype().addComponent(as).addComponent(bs).finish();

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
}*/
