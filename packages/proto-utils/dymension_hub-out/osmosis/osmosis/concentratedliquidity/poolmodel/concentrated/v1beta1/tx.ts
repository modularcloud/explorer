/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.concentratedliquidity.poolmodel.concentrated.v1beta1";

/** ===================== MsgCreateConcentratedPool */
export interface MsgCreateConcentratedPool {
  sender: string;
  denom0: string;
  denom1: string;
  tickSpacing: Long;
  spreadFactor: string;
}

/** Returns a unique poolID to identify the pool with. */
export interface MsgCreateConcentratedPoolResponse {
  poolId: Long;
}

function createBaseMsgCreateConcentratedPool(): MsgCreateConcentratedPool {
  return { sender: "", denom0: "", denom1: "", tickSpacing: Long.UZERO, spreadFactor: "" };
}

export const MsgCreateConcentratedPool = {
  encode(message: MsgCreateConcentratedPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.denom0 !== "") {
      writer.uint32(18).string(message.denom0);
    }
    if (message.denom1 !== "") {
      writer.uint32(26).string(message.denom1);
    }
    if (!message.tickSpacing.isZero()) {
      writer.uint32(32).uint64(message.tickSpacing);
    }
    if (message.spreadFactor !== "") {
      writer.uint32(42).string(message.spreadFactor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateConcentratedPool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateConcentratedPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom0 = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.denom1 = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.tickSpacing = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.spreadFactor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateConcentratedPool {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      denom0: isSet(object.denom0) ? globalThis.String(object.denom0) : "",
      denom1: isSet(object.denom1) ? globalThis.String(object.denom1) : "",
      tickSpacing: isSet(object.tickSpacing) ? Long.fromValue(object.tickSpacing) : Long.UZERO,
      spreadFactor: isSet(object.spreadFactor) ? globalThis.String(object.spreadFactor) : "",
    };
  },

  toJSON(message: MsgCreateConcentratedPool): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.denom0 !== "") {
      obj.denom0 = message.denom0;
    }
    if (message.denom1 !== "") {
      obj.denom1 = message.denom1;
    }
    if (!message.tickSpacing.isZero()) {
      obj.tickSpacing = (message.tickSpacing || Long.UZERO).toString();
    }
    if (message.spreadFactor !== "") {
      obj.spreadFactor = message.spreadFactor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateConcentratedPool>, I>>(base?: I): MsgCreateConcentratedPool {
    return MsgCreateConcentratedPool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateConcentratedPool>, I>>(object: I): MsgCreateConcentratedPool {
    const message = createBaseMsgCreateConcentratedPool();
    message.sender = object.sender ?? "";
    message.denom0 = object.denom0 ?? "";
    message.denom1 = object.denom1 ?? "";
    message.tickSpacing = (object.tickSpacing !== undefined && object.tickSpacing !== null)
      ? Long.fromValue(object.tickSpacing)
      : Long.UZERO;
    message.spreadFactor = object.spreadFactor ?? "";
    return message;
  },
};

function createBaseMsgCreateConcentratedPoolResponse(): MsgCreateConcentratedPoolResponse {
  return { poolId: Long.UZERO };
}

export const MsgCreateConcentratedPoolResponse = {
  encode(message: MsgCreateConcentratedPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateConcentratedPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateConcentratedPoolResponse();
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

  fromJSON(object: any): MsgCreateConcentratedPoolResponse {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: MsgCreateConcentratedPoolResponse): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateConcentratedPoolResponse>, I>>(
    base?: I,
  ): MsgCreateConcentratedPoolResponse {
    return MsgCreateConcentratedPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateConcentratedPoolResponse>, I>>(
    object: I,
  ): MsgCreateConcentratedPoolResponse {
    const message = createBaseMsgCreateConcentratedPoolResponse();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

export interface Msg {
  CreateConcentratedPool(request: MsgCreateConcentratedPool): Promise<MsgCreateConcentratedPoolResponse>;
}

export const MsgServiceName = "osmosis.concentratedliquidity.poolmodel.concentrated.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateConcentratedPool = this.CreateConcentratedPool.bind(this);
  }
  CreateConcentratedPool(request: MsgCreateConcentratedPool): Promise<MsgCreateConcentratedPoolResponse> {
    const data = MsgCreateConcentratedPool.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateConcentratedPool", data);
    return promise.then((data) => MsgCreateConcentratedPoolResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
