/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.counter.v1";

/** MsgIncreaseCounter defines a count Msg service counter. */
export interface MsgIncreaseCounter {
  /** signer is the address that controls the module (defaults to x/gov unless overwritten). */
  signer: string;
  /** count is the number of times to increment the counter. */
  count: Long;
}

/** MsgIncreaseCountResponse is the Msg/Counter response type. */
export interface MsgIncreaseCountResponse {
  /** new_count is the number of times the counter was incremented. */
  newCount: Long;
}

function createBaseMsgIncreaseCounter(): MsgIncreaseCounter {
  return { signer: "", count: Long.ZERO };
}

export const MsgIncreaseCounter = {
  encode(message: MsgIncreaseCounter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    if (!message.count.isZero()) {
      writer.uint32(16).int64(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIncreaseCounter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIncreaseCounter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.count = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgIncreaseCounter {
    return {
      signer: isSet(object.signer) ? globalThis.String(object.signer) : "",
      count: isSet(object.count) ? Long.fromValue(object.count) : Long.ZERO,
    };
  },

  toJSON(message: MsgIncreaseCounter): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (!message.count.isZero()) {
      obj.count = (message.count || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgIncreaseCounter>, I>>(base?: I): MsgIncreaseCounter {
    return MsgIncreaseCounter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgIncreaseCounter>, I>>(object: I): MsgIncreaseCounter {
    const message = createBaseMsgIncreaseCounter();
    message.signer = object.signer ?? "";
    message.count = (object.count !== undefined && object.count !== null) ? Long.fromValue(object.count) : Long.ZERO;
    return message;
  },
};

function createBaseMsgIncreaseCountResponse(): MsgIncreaseCountResponse {
  return { newCount: Long.ZERO };
}

export const MsgIncreaseCountResponse = {
  encode(message: MsgIncreaseCountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.newCount.isZero()) {
      writer.uint32(8).int64(message.newCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIncreaseCountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIncreaseCountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.newCount = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgIncreaseCountResponse {
    return { newCount: isSet(object.newCount) ? Long.fromValue(object.newCount) : Long.ZERO };
  },

  toJSON(message: MsgIncreaseCountResponse): unknown {
    const obj: any = {};
    if (!message.newCount.isZero()) {
      obj.newCount = (message.newCount || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgIncreaseCountResponse>, I>>(base?: I): MsgIncreaseCountResponse {
    return MsgIncreaseCountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgIncreaseCountResponse>, I>>(object: I): MsgIncreaseCountResponse {
    const message = createBaseMsgIncreaseCountResponse();
    message.newCount = (object.newCount !== undefined && object.newCount !== null)
      ? Long.fromValue(object.newCount)
      : Long.ZERO;
    return message;
  },
};

/** Msg defines the counter Msg service. */
export interface Msg {
  /** IncreaseCount increments the counter by the specified amount. */
  IncreaseCount(request: MsgIncreaseCounter): Promise<MsgIncreaseCountResponse>;
}

export const MsgServiceName = "cosmos.counter.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.IncreaseCount = this.IncreaseCount.bind(this);
  }
  IncreaseCount(request: MsgIncreaseCounter): Promise<MsgIncreaseCountResponse> {
    const data = MsgIncreaseCounter.encode(request).finish();
    const promise = this.rpc.request(this.service, "IncreaseCount", data);
    return promise.then((data) => MsgIncreaseCountResponse.decode(_m0.Reader.create(data)));
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
