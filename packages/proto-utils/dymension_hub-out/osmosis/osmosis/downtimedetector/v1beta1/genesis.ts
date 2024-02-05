/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Downtime, downtimeFromJSON, downtimeToJSON } from "./downtime_duration";

export const protobufPackage = "osmosis.downtimedetector.v1beta1";

export interface GenesisDowntimeEntry {
  duration: Downtime;
  lastDowntime: Date | undefined;
}

/** GenesisState defines the twap module's genesis state. */
export interface GenesisState {
  downtimes: GenesisDowntimeEntry[];
  lastBlockTime: Date | undefined;
}

function createBaseGenesisDowntimeEntry(): GenesisDowntimeEntry {
  return { duration: 0, lastDowntime: undefined };
}

export const GenesisDowntimeEntry = {
  encode(message: GenesisDowntimeEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.duration !== 0) {
      writer.uint32(8).int32(message.duration);
    }
    if (message.lastDowntime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastDowntime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisDowntimeEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisDowntimeEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.duration = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastDowntime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisDowntimeEntry {
    return {
      duration: isSet(object.duration) ? downtimeFromJSON(object.duration) : 0,
      lastDowntime: isSet(object.lastDowntime) ? fromJsonTimestamp(object.lastDowntime) : undefined,
    };
  },

  toJSON(message: GenesisDowntimeEntry): unknown {
    const obj: any = {};
    if (message.duration !== 0) {
      obj.duration = downtimeToJSON(message.duration);
    }
    if (message.lastDowntime !== undefined) {
      obj.lastDowntime = message.lastDowntime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisDowntimeEntry>, I>>(base?: I): GenesisDowntimeEntry {
    return GenesisDowntimeEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisDowntimeEntry>, I>>(object: I): GenesisDowntimeEntry {
    const message = createBaseGenesisDowntimeEntry();
    message.duration = object.duration ?? 0;
    message.lastDowntime = object.lastDowntime ?? undefined;
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return { downtimes: [], lastBlockTime: undefined };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.downtimes) {
      GenesisDowntimeEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.lastBlockTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastBlockTime), writer.uint32(18).fork()).ldelim();
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

          message.downtimes.push(GenesisDowntimeEntry.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastBlockTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
      downtimes: globalThis.Array.isArray(object?.downtimes)
        ? object.downtimes.map((e: any) => GenesisDowntimeEntry.fromJSON(e))
        : [],
      lastBlockTime: isSet(object.lastBlockTime) ? fromJsonTimestamp(object.lastBlockTime) : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.downtimes?.length) {
      obj.downtimes = message.downtimes.map((e) => GenesisDowntimeEntry.toJSON(e));
    }
    if (message.lastBlockTime !== undefined) {
      obj.lastBlockTime = message.lastBlockTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.downtimes = object.downtimes?.map((e) => GenesisDowntimeEntry.fromPartial(e)) || [];
    message.lastBlockTime = object.lastBlockTime ?? undefined;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
