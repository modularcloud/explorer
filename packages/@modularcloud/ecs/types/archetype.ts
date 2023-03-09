import {
  Component,
  ComponentSchemaType,
  createComponentSchema,
} from "./component";
import { z } from "zod";
import { StringLiteral } from "./utilities";

export type Archetype<T extends Component<any, any>> = T[];

const a = z.object({ test: z.string() });
const b = z.object({ idl: z.string().array() });

const as = createComponentSchema(a, "tesert");
const bs = createComponentSchema(b, "teser4444t");

const ac: Component<typeof a, "tesert"> = {
  typeId: "tesert",
  data: { test: "test1" },
};
const bc: Component<typeof b, "teser4444t"> = {
  typeId: "teser4444t",
  data: { idl: ["test2"] },
};

//const archetype = [as, bs];

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
        let { __BUILDING__, ...final } = components;
        type PrettyType<T> = { [key in keyof T]: T[key] };
        return newComponents as PrettyType<typeof final>;
    },
  };
}

export function createArchetype() {
  return buildArchetype("__BUILDING__", true, {});
}

const archetype = createArchetype().addComponent("tesert", as)
  .addComponent("teser4444t", bs)
  .finish();
type arche = typeof archetype;
type PrettyType<T> = { [key in keyof T]: T[key] };
type PrettyArchetype = PrettyType<arche>;
//type arche = (typeof archetype)["_output"];
//const archetype = createArchetype(as);
