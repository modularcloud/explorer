/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { PeriodLock } from "../../lockup/lock";

export const protobufPackage = "osmosis.concentratedliquidity.v1beta1";

/**
 * Position contains position's id, address, pool id, lower tick, upper tick
 * join time, and liquidity.
 */
export interface Position {
  positionId: Long;
  address: string;
  poolId: Long;
  lowerTick: Long;
  upperTick: Long;
  joinTime: Date | undefined;
  liquidity: string;
}

/**
 * FullPositionBreakdown returns:
 * - the position itself
 * - the amount the position translates in terms of asset0 and asset1
 * - the amount of claimable fees
 * - the amount of claimable incentives
 * - the amount of incentives that would be forfeited if the position was closed
 * now
 */
export interface FullPositionBreakdown {
  position: Position | undefined;
  asset0: Coin | undefined;
  asset1: Coin | undefined;
  claimableSpreadRewards: Coin[];
  claimableIncentives: Coin[];
  forfeitedIncentives: Coin[];
}

export interface PositionWithPeriodLock {
  position: Position | undefined;
  locks: PeriodLock | undefined;
}

function createBasePosition(): Position {
  return {
    positionId: Long.UZERO,
    address: "",
    poolId: Long.UZERO,
    lowerTick: Long.ZERO,
    upperTick: Long.ZERO,
    joinTime: undefined,
    liquidity: "",
  };
}

export const Position = {
  encode(message: Position, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(24).uint64(message.poolId);
    }
    if (!message.lowerTick.isZero()) {
      writer.uint32(32).int64(message.lowerTick);
    }
    if (!message.upperTick.isZero()) {
      writer.uint32(40).int64(message.upperTick);
    }
    if (message.joinTime !== undefined) {
      Timestamp.encode(toTimestamp(message.joinTime), writer.uint32(50).fork()).ldelim();
    }
    if (message.liquidity !== "") {
      writer.uint32(58).string(message.liquidity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Position {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.positionId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.lowerTick = reader.int64() as Long;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.upperTick = reader.int64() as Long;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.joinTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.liquidity = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Position {
    return {
      positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO,
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      lowerTick: isSet(object.lowerTick) ? Long.fromValue(object.lowerTick) : Long.ZERO,
      upperTick: isSet(object.upperTick) ? Long.fromValue(object.upperTick) : Long.ZERO,
      joinTime: isSet(object.joinTime) ? fromJsonTimestamp(object.joinTime) : undefined,
      liquidity: isSet(object.liquidity) ? globalThis.String(object.liquidity) : "",
    };
  },

  toJSON(message: Position): unknown {
    const obj: any = {};
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (!message.lowerTick.isZero()) {
      obj.lowerTick = (message.lowerTick || Long.ZERO).toString();
    }
    if (!message.upperTick.isZero()) {
      obj.upperTick = (message.upperTick || Long.ZERO).toString();
    }
    if (message.joinTime !== undefined) {
      obj.joinTime = message.joinTime.toISOString();
    }
    if (message.liquidity !== "") {
      obj.liquidity = message.liquidity;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Position>, I>>(base?: I): Position {
    return Position.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Position>, I>>(object: I): Position {
    const message = createBasePosition();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    message.address = object.address ?? "";
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.lowerTick = (object.lowerTick !== undefined && object.lowerTick !== null)
      ? Long.fromValue(object.lowerTick)
      : Long.ZERO;
    message.upperTick = (object.upperTick !== undefined && object.upperTick !== null)
      ? Long.fromValue(object.upperTick)
      : Long.ZERO;
    message.joinTime = object.joinTime ?? undefined;
    message.liquidity = object.liquidity ?? "";
    return message;
  },
};

function createBaseFullPositionBreakdown(): FullPositionBreakdown {
  return {
    position: undefined,
    asset0: undefined,
    asset1: undefined,
    claimableSpreadRewards: [],
    claimableIncentives: [],
    forfeitedIncentives: [],
  };
}

export const FullPositionBreakdown = {
  encode(message: FullPositionBreakdown, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      Position.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.asset0 !== undefined) {
      Coin.encode(message.asset0, writer.uint32(18).fork()).ldelim();
    }
    if (message.asset1 !== undefined) {
      Coin.encode(message.asset1, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.claimableSpreadRewards) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.claimableIncentives) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.forfeitedIncentives) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FullPositionBreakdown {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullPositionBreakdown();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.position = Position.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.asset0 = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.asset1 = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.claimableSpreadRewards.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.claimableIncentives.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.forfeitedIncentives.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FullPositionBreakdown {
    return {
      position: isSet(object.position) ? Position.fromJSON(object.position) : undefined,
      asset0: isSet(object.asset0) ? Coin.fromJSON(object.asset0) : undefined,
      asset1: isSet(object.asset1) ? Coin.fromJSON(object.asset1) : undefined,
      claimableSpreadRewards: globalThis.Array.isArray(object?.claimableSpreadRewards)
        ? object.claimableSpreadRewards.map((e: any) => Coin.fromJSON(e))
        : [],
      claimableIncentives: globalThis.Array.isArray(object?.claimableIncentives)
        ? object.claimableIncentives.map((e: any) => Coin.fromJSON(e))
        : [],
      forfeitedIncentives: globalThis.Array.isArray(object?.forfeitedIncentives)
        ? object.forfeitedIncentives.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FullPositionBreakdown): unknown {
    const obj: any = {};
    if (message.position !== undefined) {
      obj.position = Position.toJSON(message.position);
    }
    if (message.asset0 !== undefined) {
      obj.asset0 = Coin.toJSON(message.asset0);
    }
    if (message.asset1 !== undefined) {
      obj.asset1 = Coin.toJSON(message.asset1);
    }
    if (message.claimableSpreadRewards?.length) {
      obj.claimableSpreadRewards = message.claimableSpreadRewards.map((e) => Coin.toJSON(e));
    }
    if (message.claimableIncentives?.length) {
      obj.claimableIncentives = message.claimableIncentives.map((e) => Coin.toJSON(e));
    }
    if (message.forfeitedIncentives?.length) {
      obj.forfeitedIncentives = message.forfeitedIncentives.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FullPositionBreakdown>, I>>(base?: I): FullPositionBreakdown {
    return FullPositionBreakdown.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FullPositionBreakdown>, I>>(object: I): FullPositionBreakdown {
    const message = createBaseFullPositionBreakdown();
    message.position = (object.position !== undefined && object.position !== null)
      ? Position.fromPartial(object.position)
      : undefined;
    message.asset0 = (object.asset0 !== undefined && object.asset0 !== null)
      ? Coin.fromPartial(object.asset0)
      : undefined;
    message.asset1 = (object.asset1 !== undefined && object.asset1 !== null)
      ? Coin.fromPartial(object.asset1)
      : undefined;
    message.claimableSpreadRewards = object.claimableSpreadRewards?.map((e) => Coin.fromPartial(e)) || [];
    message.claimableIncentives = object.claimableIncentives?.map((e) => Coin.fromPartial(e)) || [];
    message.forfeitedIncentives = object.forfeitedIncentives?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePositionWithPeriodLock(): PositionWithPeriodLock {
  return { position: undefined, locks: undefined };
}

export const PositionWithPeriodLock = {
  encode(message: PositionWithPeriodLock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      Position.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.locks !== undefined) {
      PeriodLock.encode(message.locks, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PositionWithPeriodLock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositionWithPeriodLock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.position = Position.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.locks = PeriodLock.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PositionWithPeriodLock {
    return {
      position: isSet(object.position) ? Position.fromJSON(object.position) : undefined,
      locks: isSet(object.locks) ? PeriodLock.fromJSON(object.locks) : undefined,
    };
  },

  toJSON(message: PositionWithPeriodLock): unknown {
    const obj: any = {};
    if (message.position !== undefined) {
      obj.position = Position.toJSON(message.position);
    }
    if (message.locks !== undefined) {
      obj.locks = PeriodLock.toJSON(message.locks);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PositionWithPeriodLock>, I>>(base?: I): PositionWithPeriodLock {
    return PositionWithPeriodLock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PositionWithPeriodLock>, I>>(object: I): PositionWithPeriodLock {
    const message = createBasePositionWithPeriodLock();
    message.position = (object.position !== undefined && object.position !== null)
      ? Position.fromPartial(object.position)
      : undefined;
    message.locks = (object.locks !== undefined && object.locks !== null)
      ? PeriodLock.fromPartial(object.locks)
      : undefined;
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
