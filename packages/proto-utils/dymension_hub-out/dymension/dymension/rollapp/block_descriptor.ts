/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dymensionxyz.dymension.rollapp";

/** BlockDescriptor defines a single rollapp chain block description. */
export interface BlockDescriptor {
  /** height is the height of the block */
  height: Long;
  /** stateRoot is a 32 byte array of the hash of the block (state root of the block) */
  stateRoot: Uint8Array;
  /**
   * intermediateStatesRoot is a 32 byte array representing
   * the root of a Merkle tree built from the ISRs of the block (Intermediate State Roots)
   */
  intermediateStatesRoot: Uint8Array;
}

/** BlockDescriptors defines list of BlockDescriptor. */
export interface BlockDescriptors {
  BD: BlockDescriptor[];
}

function createBaseBlockDescriptor(): BlockDescriptor {
  return { height: Long.UZERO, stateRoot: new Uint8Array(0), intermediateStatesRoot: new Uint8Array(0) };
}

export const BlockDescriptor = {
  encode(message: BlockDescriptor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.stateRoot.length !== 0) {
      writer.uint32(18).bytes(message.stateRoot);
    }
    if (message.intermediateStatesRoot.length !== 0) {
      writer.uint32(26).bytes(message.intermediateStatesRoot);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockDescriptor {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockDescriptor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stateRoot = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.intermediateStatesRoot = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockDescriptor {
    return {
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      stateRoot: isSet(object.stateRoot) ? bytesFromBase64(object.stateRoot) : new Uint8Array(0),
      intermediateStatesRoot: isSet(object.intermediateStatesRoot)
        ? bytesFromBase64(object.intermediateStatesRoot)
        : new Uint8Array(0),
    };
  },

  toJSON(message: BlockDescriptor): unknown {
    const obj: any = {};
    if (!message.height.isZero()) {
      obj.height = (message.height || Long.UZERO).toString();
    }
    if (message.stateRoot.length !== 0) {
      obj.stateRoot = base64FromBytes(message.stateRoot);
    }
    if (message.intermediateStatesRoot.length !== 0) {
      obj.intermediateStatesRoot = base64FromBytes(message.intermediateStatesRoot);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockDescriptor>, I>>(base?: I): BlockDescriptor {
    return BlockDescriptor.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockDescriptor>, I>>(object: I): BlockDescriptor {
    const message = createBaseBlockDescriptor();
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.UZERO;
    message.stateRoot = object.stateRoot ?? new Uint8Array(0);
    message.intermediateStatesRoot = object.intermediateStatesRoot ?? new Uint8Array(0);
    return message;
  },
};

function createBaseBlockDescriptors(): BlockDescriptors {
  return { BD: [] };
}

export const BlockDescriptors = {
  encode(message: BlockDescriptors, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.BD) {
      BlockDescriptor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockDescriptors {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockDescriptors();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.BD.push(BlockDescriptor.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockDescriptors {
    return { BD: globalThis.Array.isArray(object?.BD) ? object.BD.map((e: any) => BlockDescriptor.fromJSON(e)) : [] };
  },

  toJSON(message: BlockDescriptors): unknown {
    const obj: any = {};
    if (message.BD?.length) {
      obj.BD = message.BD.map((e) => BlockDescriptor.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockDescriptors>, I>>(base?: I): BlockDescriptors {
    return BlockDescriptors.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockDescriptors>, I>>(object: I): BlockDescriptors {
    const message = createBaseBlockDescriptors();
    message.BD = object.BD?.map((e) => BlockDescriptor.fromPartial(e)) || [];
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
