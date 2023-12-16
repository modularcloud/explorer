/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "./params";
import { Stream } from "./stream";

export const protobufPackage = "dymensionxyz.dymension.streamer";

/**
 * GenesisState defines the streamer module's various parameters when first
 * initialized
 */
export interface GenesisState {
  /** params are all the parameters of the module */
  params:
    | Params
    | undefined;
  /** streams are all streams that should exist at genesis */
  streams: Stream[];
  /**
   * last_stream_id is what the stream number will increment from when creating
   * the next stream after genesis
   */
  lastStreamId: Long;
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, streams: [], lastStreamId: Long.UZERO };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.streams) {
      Stream.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (!message.lastStreamId.isZero()) {
      writer.uint32(24).uint64(message.lastStreamId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.streams.push(Stream.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lastStreamId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      streams: globalThis.Array.isArray(object?.streams) ? object.streams.map((e: any) => Stream.fromJSON(e)) : [],
      lastStreamId: isSet(object.lastStreamId) ? Long.fromValue(object.lastStreamId) : Long.UZERO,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.streams?.length) {
      obj.streams = message.streams.map((e) => Stream.toJSON(e));
    }
    if (!message.lastStreamId.isZero()) {
      obj.lastStreamId = (message.lastStreamId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.streams = object.streams?.map((e) => Stream.fromPartial(e)) || [];
    message.lastStreamId = (object.lastStreamId !== undefined && object.lastStreamId !== null)
      ? Long.fromValue(object.lastStreamId)
      : Long.UZERO;
    return message;
  },
};

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
