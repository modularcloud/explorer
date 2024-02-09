/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DecCoin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "osmosis.concentratedliquidity.v1beta1";

export interface TickInfo {
  liquidityGross: string;
  liquidityNet: string;
  /**
   * Total spread rewards accumulated in the opposite direction that the tick
   * was last crossed. i.e. if the current tick is to the right of this tick
   * (meaning its currently a greater price), then this is the total spread
   * rewards accumulated below the tick. If the current tick is to the left of
   * this tick (meaning its currently at a lower price), then this is the total
   * spread rewards accumulated above the tick.
   *
   * Note: the way this value is used depends on the direction of spread rewards
   * we are calculating for. If we are calculating spread rewards below the
   * lower tick and the lower tick is the active tick, then this is the
   * spreadRewardGrowthGlobal - the lower tick's
   * spreadRewardGrowthOppositeDirectionOfLastTraversal. If we are calculating
   * spread rewards above the upper tick and the upper tick is the active tick,
   * then this is just the tick's
   * spreadRewardGrowthOppositeDirectionOfLastTraversal value.
   */
  spreadRewardGrowthOppositeDirectionOfLastTraversal: DecCoin[];
  /**
   * uptime_trackers is a container encapsulating the uptime trackers.
   * We use a container instead of a "repeated UptimeTracker" directly
   * because we need the ability to serialize and deserialize the
   * container easily for events when crossing a tick.
   */
  uptimeTrackers: UptimeTrackers | undefined;
}

export interface UptimeTrackers {
  list: UptimeTracker[];
}

export interface UptimeTracker {
  uptimeGrowthOutside: DecCoin[];
}

function createBaseTickInfo(): TickInfo {
  return {
    liquidityGross: "",
    liquidityNet: "",
    spreadRewardGrowthOppositeDirectionOfLastTraversal: [],
    uptimeTrackers: undefined,
  };
}

export const TickInfo = {
  encode(message: TickInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.liquidityGross !== "") {
      writer.uint32(10).string(message.liquidityGross);
    }
    if (message.liquidityNet !== "") {
      writer.uint32(18).string(message.liquidityNet);
    }
    for (const v of message.spreadRewardGrowthOppositeDirectionOfLastTraversal) {
      DecCoin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.uptimeTrackers !== undefined) {
      UptimeTrackers.encode(message.uptimeTrackers, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TickInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTickInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidityGross = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.liquidityNet = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.spreadRewardGrowthOppositeDirectionOfLastTraversal.push(DecCoin.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.uptimeTrackers = UptimeTrackers.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TickInfo {
    return {
      liquidityGross: isSet(object.liquidityGross) ? globalThis.String(object.liquidityGross) : "",
      liquidityNet: isSet(object.liquidityNet) ? globalThis.String(object.liquidityNet) : "",
      spreadRewardGrowthOppositeDirectionOfLastTraversal:
        globalThis.Array.isArray(object?.spreadRewardGrowthOppositeDirectionOfLastTraversal)
          ? object.spreadRewardGrowthOppositeDirectionOfLastTraversal.map((e: any) => DecCoin.fromJSON(e))
          : [],
      uptimeTrackers: isSet(object.uptimeTrackers) ? UptimeTrackers.fromJSON(object.uptimeTrackers) : undefined,
    };
  },

  toJSON(message: TickInfo): unknown {
    const obj: any = {};
    if (message.liquidityGross !== "") {
      obj.liquidityGross = message.liquidityGross;
    }
    if (message.liquidityNet !== "") {
      obj.liquidityNet = message.liquidityNet;
    }
    if (message.spreadRewardGrowthOppositeDirectionOfLastTraversal?.length) {
      obj.spreadRewardGrowthOppositeDirectionOfLastTraversal = message
        .spreadRewardGrowthOppositeDirectionOfLastTraversal.map((e) => DecCoin.toJSON(e));
    }
    if (message.uptimeTrackers !== undefined) {
      obj.uptimeTrackers = UptimeTrackers.toJSON(message.uptimeTrackers);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TickInfo>, I>>(base?: I): TickInfo {
    return TickInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TickInfo>, I>>(object: I): TickInfo {
    const message = createBaseTickInfo();
    message.liquidityGross = object.liquidityGross ?? "";
    message.liquidityNet = object.liquidityNet ?? "";
    message.spreadRewardGrowthOppositeDirectionOfLastTraversal =
      object.spreadRewardGrowthOppositeDirectionOfLastTraversal?.map((e) => DecCoin.fromPartial(e)) || [];
    message.uptimeTrackers = (object.uptimeTrackers !== undefined && object.uptimeTrackers !== null)
      ? UptimeTrackers.fromPartial(object.uptimeTrackers)
      : undefined;
    return message;
  },
};

function createBaseUptimeTrackers(): UptimeTrackers {
  return { list: [] };
}

export const UptimeTrackers = {
  encode(message: UptimeTrackers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.list) {
      UptimeTracker.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UptimeTrackers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUptimeTrackers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.list.push(UptimeTracker.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UptimeTrackers {
    return {
      list: globalThis.Array.isArray(object?.list) ? object.list.map((e: any) => UptimeTracker.fromJSON(e)) : [],
    };
  },

  toJSON(message: UptimeTrackers): unknown {
    const obj: any = {};
    if (message.list?.length) {
      obj.list = message.list.map((e) => UptimeTracker.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UptimeTrackers>, I>>(base?: I): UptimeTrackers {
    return UptimeTrackers.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UptimeTrackers>, I>>(object: I): UptimeTrackers {
    const message = createBaseUptimeTrackers();
    message.list = object.list?.map((e) => UptimeTracker.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUptimeTracker(): UptimeTracker {
  return { uptimeGrowthOutside: [] };
}

export const UptimeTracker = {
  encode(message: UptimeTracker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.uptimeGrowthOutside) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UptimeTracker {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUptimeTracker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uptimeGrowthOutside.push(DecCoin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UptimeTracker {
    return {
      uptimeGrowthOutside: globalThis.Array.isArray(object?.uptimeGrowthOutside)
        ? object.uptimeGrowthOutside.map((e: any) => DecCoin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UptimeTracker): unknown {
    const obj: any = {};
    if (message.uptimeGrowthOutside?.length) {
      obj.uptimeGrowthOutside = message.uptimeGrowthOutside.map((e) => DecCoin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UptimeTracker>, I>>(base?: I): UptimeTracker {
    return UptimeTracker.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UptimeTracker>, I>>(object: I): UptimeTracker {
    const message = createBaseUptimeTracker();
    message.uptimeGrowthOutside = object.uptimeGrowthOutside?.map((e) => DecCoin.fromPartial(e)) || [];
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
