/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../google/protobuf/duration";

export const protobufPackage = "rollapp.sequencers.types";

/** Params defines the parameters for the module. */
export interface Params {
  /** unbonding_time is the time duration of unbonding. */
  unbondingTime:
    | Duration
    | undefined;
  /** max_validators is the maximum number of validators. */
  maxSequencers: number;
  /** historical_entries is the number of historical entries to persist. */
  historicalEntries: number;
}

function createBaseParams(): Params {
  return { unbondingTime: undefined, maxSequencers: 0, historicalEntries: 0 };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.unbondingTime !== undefined) {
      Duration.encode(message.unbondingTime, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxSequencers !== 0) {
      writer.uint32(16).uint32(message.maxSequencers);
    }
    if (message.historicalEntries !== 0) {
      writer.uint32(24).uint32(message.historicalEntries);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.unbondingTime = Duration.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxSequencers = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.historicalEntries = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      unbondingTime: isSet(object.unbondingTime) ? Duration.fromJSON(object.unbondingTime) : undefined,
      maxSequencers: isSet(object.maxSequencers) ? globalThis.Number(object.maxSequencers) : 0,
      historicalEntries: isSet(object.historicalEntries) ? globalThis.Number(object.historicalEntries) : 0,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.unbondingTime !== undefined) {
      obj.unbondingTime = Duration.toJSON(message.unbondingTime);
    }
    if (message.maxSequencers !== 0) {
      obj.maxSequencers = Math.round(message.maxSequencers);
    }
    if (message.historicalEntries !== 0) {
      obj.historicalEntries = Math.round(message.historicalEntries);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.unbondingTime = (object.unbondingTime !== undefined && object.unbondingTime !== null)
      ? Duration.fromPartial(object.unbondingTime)
      : undefined;
    message.maxSequencers = object.maxSequencers ?? 0;
    message.historicalEntries = object.historicalEntries ?? 0;
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
