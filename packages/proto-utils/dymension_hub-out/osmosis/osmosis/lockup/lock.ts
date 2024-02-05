/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Duration } from "../../google/protobuf/duration";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "osmosis.lockup";

/**
 * LockQueryType defines the type of the lock query that can
 * either be by duration or start time of the lock.
 */
export enum LockQueryType {
  ByDuration = 0,
  ByTime = 1,
  NoLock = 2,
  ByGroup = 3,
  UNRECOGNIZED = -1,
}

export function lockQueryTypeFromJSON(object: any): LockQueryType {
  switch (object) {
    case 0:
    case "ByDuration":
      return LockQueryType.ByDuration;
    case 1:
    case "ByTime":
      return LockQueryType.ByTime;
    case 2:
    case "NoLock":
      return LockQueryType.NoLock;
    case 3:
    case "ByGroup":
      return LockQueryType.ByGroup;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LockQueryType.UNRECOGNIZED;
  }
}

export function lockQueryTypeToJSON(object: LockQueryType): string {
  switch (object) {
    case LockQueryType.ByDuration:
      return "ByDuration";
    case LockQueryType.ByTime:
      return "ByTime";
    case LockQueryType.NoLock:
      return "NoLock";
    case LockQueryType.ByGroup:
      return "ByGroup";
    case LockQueryType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * PeriodLock is a single lock unit by period defined by the x/lockup module.
 * It's a record of a locked coin at a specific time. It stores owner, duration,
 * unlock time and the number of coins locked. A state of a period lock is
 * created upon lock creation, and deleted once the lock has been matured after
 * the `duration` has passed since unbonding started.
 */
export interface PeriodLock {
  /**
   * ID is the unique id of the lock.
   * The ID of the lock is decided upon lock creation, incrementing by 1 for
   * every lock.
   */
  ID: Long;
  /**
   * Owner is the account address of the lock owner.
   * Only the owner can modify the state of the lock.
   */
  owner: string;
  /**
   * Duration is the time needed for a lock to mature after unlocking has
   * started.
   */
  duration:
    | Duration
    | undefined;
  /**
   * EndTime refers to the time at which the lock would mature and get deleted.
   * This value is first initialized when an unlock has started for the lock,
   * end time being block time + duration.
   */
  endTime:
    | Date
    | undefined;
  /** Coins are the tokens locked within the lock, kept in the module account. */
  coins: Coin[];
  /**
   * Reward Receiver Address is the address that would be receiving rewards for
   * the incentives for the lock. This is set to owner by default and can be
   * changed via separate msg.
   */
  rewardReceiverAddress: string;
}

/**
 * QueryCondition is a struct used for querying locks upon different conditions.
 * Duration field and timestamp fields could be optional, depending on the
 * LockQueryType.
 */
export interface QueryCondition {
  /** LockQueryType is a type of lock query, ByLockDuration | ByLockTime */
  lockQueryType: LockQueryType;
  /** Denom represents the token denomination we are looking to lock up */
  denom: string;
  /**
   * Duration is used to query locks with longer duration than the specified
   * duration. Duration field must not be nil when the lock query type is
   * `ByLockDuration`.
   */
  duration:
    | Duration
    | undefined;
  /**
   * Timestamp is used by locks started before the specified duration.
   * Timestamp field must not be nil when the lock query type is `ByLockTime`.
   * Querying locks with timestamp is currently not implemented.
   */
  timestamp: Date | undefined;
}

/**
 * SyntheticLock is creating virtual lockup where new denom is combination of
 * original denom and synthetic suffix. At the time of synthetic lockup creation
 * and deletion, accumulation store is also being updated and on querier side,
 * they can query as freely as native lockup.
 */
export interface SyntheticLock {
  /**
   * Underlying Lock ID is the underlying native lock's id for this synthetic
   * lockup. A synthetic lock MUST have an underlying lock.
   */
  underlyingLockId: Long;
  /**
   * SynthDenom is the synthetic denom that is a combination of
   * gamm share + bonding status + validator address.
   */
  synthDenom: string;
  /**
   * used for unbonding synthetic lockups, for active synthetic lockups, this
   * value is set to uninitialized value
   */
  endTime:
    | Date
    | undefined;
  /**
   * Duration is the duration for a synthetic lock to mature
   * at the point of unbonding has started.
   */
  duration: Duration | undefined;
}

function createBasePeriodLock(): PeriodLock {
  return { ID: Long.UZERO, owner: "", duration: undefined, endTime: undefined, coins: [], rewardReceiverAddress: "" };
}

export const PeriodLock = {
  encode(message: PeriodLock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.ID.isZero()) {
      writer.uint32(8).uint64(message.ID);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.rewardReceiverAddress !== "") {
      writer.uint32(50).string(message.rewardReceiverAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PeriodLock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriodLock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.ID = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.duration = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.rewardReceiverAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PeriodLock {
    return {
      ID: isSet(object.ID) ? Long.fromValue(object.ID) : Long.UZERO,
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      rewardReceiverAddress: isSet(object.rewardReceiverAddress) ? globalThis.String(object.rewardReceiverAddress) : "",
    };
  },

  toJSON(message: PeriodLock): unknown {
    const obj: any = {};
    if (!message.ID.isZero()) {
      obj.ID = (message.ID || Long.UZERO).toString();
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    if (message.endTime !== undefined) {
      obj.endTime = message.endTime.toISOString();
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    if (message.rewardReceiverAddress !== "") {
      obj.rewardReceiverAddress = message.rewardReceiverAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PeriodLock>, I>>(base?: I): PeriodLock {
    return PeriodLock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PeriodLock>, I>>(object: I): PeriodLock {
    const message = createBasePeriodLock();
    message.ID = (object.ID !== undefined && object.ID !== null) ? Long.fromValue(object.ID) : Long.UZERO;
    message.owner = object.owner ?? "";
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    message.endTime = object.endTime ?? undefined;
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.rewardReceiverAddress = object.rewardReceiverAddress ?? "";
    return message;
  },
};

function createBaseQueryCondition(): QueryCondition {
  return { lockQueryType: 0, denom: "", duration: undefined, timestamp: undefined };
}

export const QueryCondition = {
  encode(message: QueryCondition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lockQueryType !== 0) {
      writer.uint32(8).int32(message.lockQueryType);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCondition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lockQueryType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.duration = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCondition {
    return {
      lockQueryType: isSet(object.lockQueryType) ? lockQueryTypeFromJSON(object.lockQueryType) : 0,
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: QueryCondition): unknown {
    const obj: any = {};
    if (message.lockQueryType !== 0) {
      obj.lockQueryType = lockQueryTypeToJSON(message.lockQueryType);
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCondition>, I>>(base?: I): QueryCondition {
    return QueryCondition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCondition>, I>>(object: I): QueryCondition {
    const message = createBaseQueryCondition();
    message.lockQueryType = object.lockQueryType ?? 0;
    message.denom = object.denom ?? "";
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseSyntheticLock(): SyntheticLock {
  return { underlyingLockId: Long.UZERO, synthDenom: "", endTime: undefined, duration: undefined };
}

export const SyntheticLock = {
  encode(message: SyntheticLock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.underlyingLockId.isZero()) {
      writer.uint32(8).uint64(message.underlyingLockId);
    }
    if (message.synthDenom !== "") {
      writer.uint32(18).string(message.synthDenom);
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SyntheticLock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSyntheticLock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.underlyingLockId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.synthDenom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.duration = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SyntheticLock {
    return {
      underlyingLockId: isSet(object.underlyingLockId) ? Long.fromValue(object.underlyingLockId) : Long.UZERO,
      synthDenom: isSet(object.synthDenom) ? globalThis.String(object.synthDenom) : "",
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
    };
  },

  toJSON(message: SyntheticLock): unknown {
    const obj: any = {};
    if (!message.underlyingLockId.isZero()) {
      obj.underlyingLockId = (message.underlyingLockId || Long.UZERO).toString();
    }
    if (message.synthDenom !== "") {
      obj.synthDenom = message.synthDenom;
    }
    if (message.endTime !== undefined) {
      obj.endTime = message.endTime.toISOString();
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SyntheticLock>, I>>(base?: I): SyntheticLock {
    return SyntheticLock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SyntheticLock>, I>>(object: I): SyntheticLock {
    const message = createBaseSyntheticLock();
    message.underlyingLockId = (object.underlyingLockId !== undefined && object.underlyingLockId !== null)
      ? Long.fromValue(object.underlyingLockId)
      : Long.UZERO;
    message.synthDenom = object.synthDenom ?? "";
    message.endTime = object.endTime ?? undefined;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
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
