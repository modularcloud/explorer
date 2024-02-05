/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.store.v1beta1";

export interface Node {
  children: Child[];
}

export interface Child {
  index: Uint8Array;
  accumulation: string;
}

export interface Leaf {
  leaf: Child | undefined;
}

function createBaseNode(): Node {
  return { children: [] };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.children) {
      Child.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.children.push(Child.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Node {
    return {
      children: globalThis.Array.isArray(object?.children) ? object.children.map((e: any) => Child.fromJSON(e)) : [],
    };
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    if (message.children?.length) {
      obj.children = message.children.map((e) => Child.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Node>, I>>(base?: I): Node {
    return Node.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Node>, I>>(object: I): Node {
    const message = createBaseNode();
    message.children = object.children?.map((e) => Child.fromPartial(e)) || [];
    return message;
  },
};

function createBaseChild(): Child {
  return { index: new Uint8Array(0), accumulation: "" };
}

export const Child = {
  encode(message: Child, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index.length !== 0) {
      writer.uint32(10).bytes(message.index);
    }
    if (message.accumulation !== "") {
      writer.uint32(18).string(message.accumulation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Child {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.index = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accumulation = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Child {
    return {
      index: isSet(object.index) ? bytesFromBase64(object.index) : new Uint8Array(0),
      accumulation: isSet(object.accumulation) ? globalThis.String(object.accumulation) : "",
    };
  },

  toJSON(message: Child): unknown {
    const obj: any = {};
    if (message.index.length !== 0) {
      obj.index = base64FromBytes(message.index);
    }
    if (message.accumulation !== "") {
      obj.accumulation = message.accumulation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Child>, I>>(base?: I): Child {
    return Child.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Child>, I>>(object: I): Child {
    const message = createBaseChild();
    message.index = object.index ?? new Uint8Array(0);
    message.accumulation = object.accumulation ?? "";
    return message;
  },
};

function createBaseLeaf(): Leaf {
  return { leaf: undefined };
}

export const Leaf = {
  encode(message: Leaf, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.leaf !== undefined) {
      Child.encode(message.leaf, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Leaf {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaf();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.leaf = Child.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Leaf {
    return { leaf: isSet(object.leaf) ? Child.fromJSON(object.leaf) : undefined };
  },

  toJSON(message: Leaf): unknown {
    const obj: any = {};
    if (message.leaf !== undefined) {
      obj.leaf = Child.toJSON(message.leaf);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Leaf>, I>>(base?: I): Leaf {
    return Leaf.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Leaf>, I>>(object: I): Leaf {
    const message = createBaseLeaf();
    message.leaf = (object.leaf !== undefined && object.leaf !== null) ? Child.fromPartial(object.leaf) : undefined;
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
