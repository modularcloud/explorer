/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DecCoin } from "../../../cosmos/base/v1beta1/coin";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "osmosis.concentratedliquidity.v1beta1";

/**
 * IncentiveRecord is the high-level struct we use to deal with an independent
 * incentive being distributed on a pool. Note that PoolId, Denom, and MinUptime
 * are included in the key so we avoid storing them in state, hence the
 * distinction between IncentiveRecord and IncentiveRecordBody.
 */
export interface IncentiveRecord {
  /** incentive_id is the id uniquely identifying this incentive record. */
  incentiveId: Long;
  poolId: Long;
  /** incentive record body holds necessary */
  incentiveRecordBody:
    | IncentiveRecordBody
    | undefined;
  /**
   * min_uptime is the minimum uptime required for liquidity to qualify for this
   * incentive. It should be always be one of the supported uptimes in
   * types.SupportedUptimes
   */
  minUptime: Duration | undefined;
}

/**
 * IncentiveRecordBody represents the body stored in state for each individual
 * record.
 */
export interface IncentiveRecordBody {
  /** remaining_coin is the total amount of incentives to be distributed */
  remainingCoin:
    | DecCoin
    | undefined;
  /** emission_rate is the incentive emission rate per second */
  emissionRate: string;
  /** start_time is the time when the incentive starts distributing */
  startTime: Date | undefined;
}

function createBaseIncentiveRecord(): IncentiveRecord {
  return { incentiveId: Long.UZERO, poolId: Long.UZERO, incentiveRecordBody: undefined, minUptime: undefined };
}

export const IncentiveRecord = {
  encode(message: IncentiveRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.incentiveId.isZero()) {
      writer.uint32(8).uint64(message.incentiveId);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.incentiveRecordBody !== undefined) {
      IncentiveRecordBody.encode(message.incentiveRecordBody, writer.uint32(34).fork()).ldelim();
    }
    if (message.minUptime !== undefined) {
      Duration.encode(message.minUptime, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IncentiveRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentiveRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.incentiveId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.incentiveRecordBody = IncentiveRecordBody.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.minUptime = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IncentiveRecord {
    return {
      incentiveId: isSet(object.incentiveId) ? Long.fromValue(object.incentiveId) : Long.UZERO,
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      incentiveRecordBody: isSet(object.incentiveRecordBody)
        ? IncentiveRecordBody.fromJSON(object.incentiveRecordBody)
        : undefined,
      minUptime: isSet(object.minUptime) ? Duration.fromJSON(object.minUptime) : undefined,
    };
  },

  toJSON(message: IncentiveRecord): unknown {
    const obj: any = {};
    if (!message.incentiveId.isZero()) {
      obj.incentiveId = (message.incentiveId || Long.UZERO).toString();
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.incentiveRecordBody !== undefined) {
      obj.incentiveRecordBody = IncentiveRecordBody.toJSON(message.incentiveRecordBody);
    }
    if (message.minUptime !== undefined) {
      obj.minUptime = Duration.toJSON(message.minUptime);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IncentiveRecord>, I>>(base?: I): IncentiveRecord {
    return IncentiveRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IncentiveRecord>, I>>(object: I): IncentiveRecord {
    const message = createBaseIncentiveRecord();
    message.incentiveId = (object.incentiveId !== undefined && object.incentiveId !== null)
      ? Long.fromValue(object.incentiveId)
      : Long.UZERO;
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.incentiveRecordBody = (object.incentiveRecordBody !== undefined && object.incentiveRecordBody !== null)
      ? IncentiveRecordBody.fromPartial(object.incentiveRecordBody)
      : undefined;
    message.minUptime = (object.minUptime !== undefined && object.minUptime !== null)
      ? Duration.fromPartial(object.minUptime)
      : undefined;
    return message;
  },
};

function createBaseIncentiveRecordBody(): IncentiveRecordBody {
  return { remainingCoin: undefined, emissionRate: "", startTime: undefined };
}

export const IncentiveRecordBody = {
  encode(message: IncentiveRecordBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.remainingCoin !== undefined) {
      DecCoin.encode(message.remainingCoin, writer.uint32(10).fork()).ldelim();
    }
    if (message.emissionRate !== "") {
      writer.uint32(18).string(message.emissionRate);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IncentiveRecordBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentiveRecordBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.remainingCoin = DecCoin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.emissionRate = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IncentiveRecordBody {
    return {
      remainingCoin: isSet(object.remainingCoin) ? DecCoin.fromJSON(object.remainingCoin) : undefined,
      emissionRate: isSet(object.emissionRate) ? globalThis.String(object.emissionRate) : "",
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
    };
  },

  toJSON(message: IncentiveRecordBody): unknown {
    const obj: any = {};
    if (message.remainingCoin !== undefined) {
      obj.remainingCoin = DecCoin.toJSON(message.remainingCoin);
    }
    if (message.emissionRate !== "") {
      obj.emissionRate = message.emissionRate;
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IncentiveRecordBody>, I>>(base?: I): IncentiveRecordBody {
    return IncentiveRecordBody.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IncentiveRecordBody>, I>>(object: I): IncentiveRecordBody {
    const message = createBaseIncentiveRecordBody();
    message.remainingCoin = (object.remainingCoin !== undefined && object.remainingCoin !== null)
      ? DecCoin.fromPartial(object.remainingCoin)
      : undefined;
    message.emissionRate = object.emissionRate ?? "";
    message.startTime = object.startTime ?? undefined;
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
