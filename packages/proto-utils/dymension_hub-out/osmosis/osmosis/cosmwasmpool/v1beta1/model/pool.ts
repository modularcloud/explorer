/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.cosmwasmpool.v1beta1";

/**
 * CosmWasmPool represents the data serialized into state for each CW pool.
 *
 * Note: CW Pool has 2 pool models:
 * - CosmWasmPool which is a proto-generated store model used for serialization
 * into state.
 * - Pool struct that encapsulates the CosmWasmPool and wasmKeeper for calling
 * the contract.
 *
 * CosmWasmPool implements the poolmanager.PoolI interface but it panics on all
 * methods. The reason is that access to wasmKeeper is required to call the
 * contract.
 *
 * Instead, all interactions and poolmanager.PoolI methods are to be performed
 * on the Pool struct. The reason why we cannot have a Pool struct only is
 * because it cannot be serialized into state due to having a non-serializable
 * wasmKeeper field.
 */
export interface CosmWasmPool {
  contractAddress: string;
  poolId: Long;
  codeId: Long;
  instantiateMsg: Uint8Array;
}

function createBaseCosmWasmPool(): CosmWasmPool {
  return { contractAddress: "", poolId: Long.UZERO, codeId: Long.UZERO, instantiateMsg: new Uint8Array(0) };
}

export const CosmWasmPool = {
  encode(message: CosmWasmPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (!message.codeId.isZero()) {
      writer.uint32(24).uint64(message.codeId);
    }
    if (message.instantiateMsg.length !== 0) {
      writer.uint32(34).bytes(message.instantiateMsg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CosmWasmPool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCosmWasmPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.contractAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.codeId = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.instantiateMsg = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CosmWasmPool {
    return {
      contractAddress: isSet(object.contractAddress) ? globalThis.String(object.contractAddress) : "",
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      codeId: isSet(object.codeId) ? Long.fromValue(object.codeId) : Long.UZERO,
      instantiateMsg: isSet(object.instantiateMsg) ? bytesFromBase64(object.instantiateMsg) : new Uint8Array(0),
    };
  },

  toJSON(message: CosmWasmPool): unknown {
    const obj: any = {};
    if (message.contractAddress !== "") {
      obj.contractAddress = message.contractAddress;
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (!message.codeId.isZero()) {
      obj.codeId = (message.codeId || Long.UZERO).toString();
    }
    if (message.instantiateMsg.length !== 0) {
      obj.instantiateMsg = base64FromBytes(message.instantiateMsg);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CosmWasmPool>, I>>(base?: I): CosmWasmPool {
    return CosmWasmPool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CosmWasmPool>, I>>(object: I): CosmWasmPool {
    const message = createBaseCosmWasmPool();
    message.contractAddress = object.contractAddress ?? "";
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.codeId = (object.codeId !== undefined && object.codeId !== null)
      ? Long.fromValue(object.codeId)
      : Long.UZERO;
    message.instantiateMsg = object.instantiateMsg ?? new Uint8Array(0);
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
