/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.cosmwasmpool.v1beta1";

/** ===================== MsgCreateCosmwasmPool */
export interface MsgCreateCosmWasmPool {
  codeId: Long;
  instantiateMsg: Uint8Array;
  sender: string;
}

/** Returns a unique poolID to identify the pool with. */
export interface MsgCreateCosmWasmPoolResponse {
  poolId: Long;
}

function createBaseMsgCreateCosmWasmPool(): MsgCreateCosmWasmPool {
  return { codeId: Long.UZERO, instantiateMsg: new Uint8Array(0), sender: "" };
}

export const MsgCreateCosmWasmPool = {
  encode(message: MsgCreateCosmWasmPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.codeId.isZero()) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.instantiateMsg.length !== 0) {
      writer.uint32(18).bytes(message.instantiateMsg);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateCosmWasmPool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateCosmWasmPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.codeId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.instantiateMsg = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sender = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateCosmWasmPool {
    return {
      codeId: isSet(object.codeId) ? Long.fromValue(object.codeId) : Long.UZERO,
      instantiateMsg: isSet(object.instantiateMsg) ? bytesFromBase64(object.instantiateMsg) : new Uint8Array(0),
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
    };
  },

  toJSON(message: MsgCreateCosmWasmPool): unknown {
    const obj: any = {};
    if (!message.codeId.isZero()) {
      obj.codeId = (message.codeId || Long.UZERO).toString();
    }
    if (message.instantiateMsg.length !== 0) {
      obj.instantiateMsg = base64FromBytes(message.instantiateMsg);
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateCosmWasmPool>, I>>(base?: I): MsgCreateCosmWasmPool {
    return MsgCreateCosmWasmPool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateCosmWasmPool>, I>>(object: I): MsgCreateCosmWasmPool {
    const message = createBaseMsgCreateCosmWasmPool();
    message.codeId = (object.codeId !== undefined && object.codeId !== null)
      ? Long.fromValue(object.codeId)
      : Long.UZERO;
    message.instantiateMsg = object.instantiateMsg ?? new Uint8Array(0);
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseMsgCreateCosmWasmPoolResponse(): MsgCreateCosmWasmPoolResponse {
  return { poolId: Long.UZERO };
}

export const MsgCreateCosmWasmPoolResponse = {
  encode(message: MsgCreateCosmWasmPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateCosmWasmPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateCosmWasmPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateCosmWasmPoolResponse {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: MsgCreateCosmWasmPoolResponse): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateCosmWasmPoolResponse>, I>>(base?: I): MsgCreateCosmWasmPoolResponse {
    return MsgCreateCosmWasmPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateCosmWasmPoolResponse>, I>>(
    object: I,
  ): MsgCreateCosmWasmPoolResponse {
    const message = createBaseMsgCreateCosmWasmPoolResponse();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

export interface MsgCreator {
  CreateCosmWasmPool(request: MsgCreateCosmWasmPool): Promise<MsgCreateCosmWasmPoolResponse>;
}

export const MsgCreatorServiceName = "osmosis.cosmwasmpool.v1beta1.MsgCreator";
export class MsgCreatorClientImpl implements MsgCreator {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgCreatorServiceName;
    this.rpc = rpc;
    this.CreateCosmWasmPool = this.CreateCosmWasmPool.bind(this);
  }
  CreateCosmWasmPool(request: MsgCreateCosmWasmPool): Promise<MsgCreateCosmWasmPoolResponse> {
    const data = MsgCreateCosmWasmPool.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateCosmWasmPool", data);
    return promise.then((data) => MsgCreateCosmWasmPoolResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
