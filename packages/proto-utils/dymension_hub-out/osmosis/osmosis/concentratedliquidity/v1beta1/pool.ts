/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "osmosis.concentratedliquidity.v1beta1";

export interface Pool {
  /** pool's address holding all liquidity tokens. */
  address: string;
  /** address holding the incentives liquidity. */
  incentivesAddress: string;
  /** address holding spread rewards from swaps. */
  spreadRewardsAddress: string;
  id: Long;
  /** Amount of total liquidity */
  currentTickLiquidity: string;
  token0: string;
  token1: string;
  currentSqrtPrice: string;
  currentTick: Long;
  /**
   * tick_spacing must be one of the authorized_tick_spacing values set in the
   * concentrated-liquidity parameters
   */
  tickSpacing: Long;
  exponentAtPriceOne: Long;
  /** spread_factor is the ratio that is charged on the amount of token in. */
  spreadFactor: string;
  /**
   * last_liquidity_update is the last time either the pool liquidity or the
   * active tick changed
   */
  lastLiquidityUpdate: Date | undefined;
}

function createBasePool(): Pool {
  return {
    address: "",
    incentivesAddress: "",
    spreadRewardsAddress: "",
    id: Long.UZERO,
    currentTickLiquidity: "",
    token0: "",
    token1: "",
    currentSqrtPrice: "",
    currentTick: Long.ZERO,
    tickSpacing: Long.UZERO,
    exponentAtPriceOne: Long.ZERO,
    spreadFactor: "",
    lastLiquidityUpdate: undefined,
  };
}

export const Pool = {
  encode(message: Pool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.incentivesAddress !== "") {
      writer.uint32(18).string(message.incentivesAddress);
    }
    if (message.spreadRewardsAddress !== "") {
      writer.uint32(26).string(message.spreadRewardsAddress);
    }
    if (!message.id.isZero()) {
      writer.uint32(32).uint64(message.id);
    }
    if (message.currentTickLiquidity !== "") {
      writer.uint32(42).string(message.currentTickLiquidity);
    }
    if (message.token0 !== "") {
      writer.uint32(50).string(message.token0);
    }
    if (message.token1 !== "") {
      writer.uint32(58).string(message.token1);
    }
    if (message.currentSqrtPrice !== "") {
      writer.uint32(66).string(message.currentSqrtPrice);
    }
    if (!message.currentTick.isZero()) {
      writer.uint32(72).int64(message.currentTick);
    }
    if (!message.tickSpacing.isZero()) {
      writer.uint32(80).uint64(message.tickSpacing);
    }
    if (!message.exponentAtPriceOne.isZero()) {
      writer.uint32(88).int64(message.exponentAtPriceOne);
    }
    if (message.spreadFactor !== "") {
      writer.uint32(98).string(message.spreadFactor);
    }
    if (message.lastLiquidityUpdate !== undefined) {
      Timestamp.encode(toTimestamp(message.lastLiquidityUpdate), writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.incentivesAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.spreadRewardsAddress = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.id = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.currentTickLiquidity = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.token0 = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.token1 = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.currentSqrtPrice = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.currentTick = reader.int64() as Long;
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.tickSpacing = reader.uint64() as Long;
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.exponentAtPriceOne = reader.int64() as Long;
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.spreadFactor = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.lastLiquidityUpdate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pool {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      incentivesAddress: isSet(object.incentivesAddress) ? globalThis.String(object.incentivesAddress) : "",
      spreadRewardsAddress: isSet(object.spreadRewardsAddress) ? globalThis.String(object.spreadRewardsAddress) : "",
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      currentTickLiquidity: isSet(object.currentTickLiquidity) ? globalThis.String(object.currentTickLiquidity) : "",
      token0: isSet(object.token0) ? globalThis.String(object.token0) : "",
      token1: isSet(object.token1) ? globalThis.String(object.token1) : "",
      currentSqrtPrice: isSet(object.currentSqrtPrice) ? globalThis.String(object.currentSqrtPrice) : "",
      currentTick: isSet(object.currentTick) ? Long.fromValue(object.currentTick) : Long.ZERO,
      tickSpacing: isSet(object.tickSpacing) ? Long.fromValue(object.tickSpacing) : Long.UZERO,
      exponentAtPriceOne: isSet(object.exponentAtPriceOne) ? Long.fromValue(object.exponentAtPriceOne) : Long.ZERO,
      spreadFactor: isSet(object.spreadFactor) ? globalThis.String(object.spreadFactor) : "",
      lastLiquidityUpdate: isSet(object.lastLiquidityUpdate)
        ? fromJsonTimestamp(object.lastLiquidityUpdate)
        : undefined,
    };
  },

  toJSON(message: Pool): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.incentivesAddress !== "") {
      obj.incentivesAddress = message.incentivesAddress;
    }
    if (message.spreadRewardsAddress !== "") {
      obj.spreadRewardsAddress = message.spreadRewardsAddress;
    }
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    if (message.currentTickLiquidity !== "") {
      obj.currentTickLiquidity = message.currentTickLiquidity;
    }
    if (message.token0 !== "") {
      obj.token0 = message.token0;
    }
    if (message.token1 !== "") {
      obj.token1 = message.token1;
    }
    if (message.currentSqrtPrice !== "") {
      obj.currentSqrtPrice = message.currentSqrtPrice;
    }
    if (!message.currentTick.isZero()) {
      obj.currentTick = (message.currentTick || Long.ZERO).toString();
    }
    if (!message.tickSpacing.isZero()) {
      obj.tickSpacing = (message.tickSpacing || Long.UZERO).toString();
    }
    if (!message.exponentAtPriceOne.isZero()) {
      obj.exponentAtPriceOne = (message.exponentAtPriceOne || Long.ZERO).toString();
    }
    if (message.spreadFactor !== "") {
      obj.spreadFactor = message.spreadFactor;
    }
    if (message.lastLiquidityUpdate !== undefined) {
      obj.lastLiquidityUpdate = message.lastLiquidityUpdate.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Pool>, I>>(base?: I): Pool {
    return Pool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Pool>, I>>(object: I): Pool {
    const message = createBasePool();
    message.address = object.address ?? "";
    message.incentivesAddress = object.incentivesAddress ?? "";
    message.spreadRewardsAddress = object.spreadRewardsAddress ?? "";
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    message.currentTickLiquidity = object.currentTickLiquidity ?? "";
    message.token0 = object.token0 ?? "";
    message.token1 = object.token1 ?? "";
    message.currentSqrtPrice = object.currentSqrtPrice ?? "";
    message.currentTick = (object.currentTick !== undefined && object.currentTick !== null)
      ? Long.fromValue(object.currentTick)
      : Long.ZERO;
    message.tickSpacing = (object.tickSpacing !== undefined && object.tickSpacing !== null)
      ? Long.fromValue(object.tickSpacing)
      : Long.UZERO;
    message.exponentAtPriceOne = (object.exponentAtPriceOne !== undefined && object.exponentAtPriceOne !== null)
      ? Long.fromValue(object.exponentAtPriceOne)
      : Long.ZERO;
    message.spreadFactor = object.spreadFactor ?? "";
    message.lastLiquidityUpdate = object.lastLiquidityUpdate ?? undefined;
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
