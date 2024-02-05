/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Gauge } from "./gauge";

export const protobufPackage = "osmosis.incentives";

/** SplittingPolicy determines the way we want to split incentives in groupGauges */
export enum SplittingPolicy {
  ByVolume = 0,
  UNRECOGNIZED = -1,
}

export function splittingPolicyFromJSON(object: any): SplittingPolicy {
  switch (object) {
    case 0:
    case "ByVolume":
      return SplittingPolicy.ByVolume;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SplittingPolicy.UNRECOGNIZED;
  }
}

export function splittingPolicyToJSON(object: SplittingPolicy): string {
  switch (object) {
    case SplittingPolicy.ByVolume:
      return "ByVolume";
    case SplittingPolicy.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Note that while both InternalGaugeInfo and InternalGaugeRecord could
 * technically be replaced by DistrInfo and DistrRecord from the pool-incentives
 * module, we create separate types here to keep our abstractions clean and
 * readable (pool-incentives distribution abstractions are used in a very
 * specific way that does not directly relate to gauge logic). This also helps
 * us sidestep a refactor to avoid an import cycle.
 */
export interface InternalGaugeInfo {
  totalWeight: string;
  gaugeRecords: InternalGaugeRecord[];
}

export interface InternalGaugeRecord {
  gaugeId: Long;
  /**
   * CurrentWeight is the current weight of this gauge being distributed to for
   * this epoch. For instance, for volume splitting policy, this stores the
   * volume generated in the last epoch of the linked pool.
   */
  currentWeight: string;
  /**
   * CumulativeWeight serves as a snapshot of the accumulator being tracked
   * based on splitting policy. For instance, for volume splitting policy, this
   * stores the cumulative volume for the linked pool at time of last update.
   */
  cumulativeWeight: string;
}

/**
 * Group is an object that stores a 1:1 mapped gauge ID, a list of pool gauge
 * info, and a splitting policy. These are grouped into a single abstraction to
 * allow for distribution of group incentives to internal gauges according to
 * the specified splitting policy.
 */
export interface Group {
  groupGaugeId: Long;
  internalGaugeInfo: InternalGaugeInfo | undefined;
  splittingPolicy: SplittingPolicy;
}

/**
 * CreateGroup is called via governance to create a new group.
 * It takes an array of pool IDs to split the incentives across.
 */
export interface CreateGroup {
  poolIds: Long[];
}

/**
 * GroupsWithGauge is a helper struct that stores a group and its
 * associated gauge.
 */
export interface GroupsWithGauge {
  group: Group | undefined;
  gauge: Gauge | undefined;
}

function createBaseInternalGaugeInfo(): InternalGaugeInfo {
  return { totalWeight: "", gaugeRecords: [] };
}

export const InternalGaugeInfo = {
  encode(message: InternalGaugeInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalWeight !== "") {
      writer.uint32(10).string(message.totalWeight);
    }
    for (const v of message.gaugeRecords) {
      InternalGaugeRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InternalGaugeInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInternalGaugeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.totalWeight = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.gaugeRecords.push(InternalGaugeRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InternalGaugeInfo {
    return {
      totalWeight: isSet(object.totalWeight) ? globalThis.String(object.totalWeight) : "",
      gaugeRecords: globalThis.Array.isArray(object?.gaugeRecords)
        ? object.gaugeRecords.map((e: any) => InternalGaugeRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: InternalGaugeInfo): unknown {
    const obj: any = {};
    if (message.totalWeight !== "") {
      obj.totalWeight = message.totalWeight;
    }
    if (message.gaugeRecords?.length) {
      obj.gaugeRecords = message.gaugeRecords.map((e) => InternalGaugeRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InternalGaugeInfo>, I>>(base?: I): InternalGaugeInfo {
    return InternalGaugeInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InternalGaugeInfo>, I>>(object: I): InternalGaugeInfo {
    const message = createBaseInternalGaugeInfo();
    message.totalWeight = object.totalWeight ?? "";
    message.gaugeRecords = object.gaugeRecords?.map((e) => InternalGaugeRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInternalGaugeRecord(): InternalGaugeRecord {
  return { gaugeId: Long.UZERO, currentWeight: "", cumulativeWeight: "" };
}

export const InternalGaugeRecord = {
  encode(message: InternalGaugeRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.gaugeId.isZero()) {
      writer.uint32(8).uint64(message.gaugeId);
    }
    if (message.currentWeight !== "") {
      writer.uint32(18).string(message.currentWeight);
    }
    if (message.cumulativeWeight !== "") {
      writer.uint32(26).string(message.cumulativeWeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InternalGaugeRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInternalGaugeRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.gaugeId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.currentWeight = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cumulativeWeight = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InternalGaugeRecord {
    return {
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
      currentWeight: isSet(object.currentWeight) ? globalThis.String(object.currentWeight) : "",
      cumulativeWeight: isSet(object.cumulativeWeight) ? globalThis.String(object.cumulativeWeight) : "",
    };
  },

  toJSON(message: InternalGaugeRecord): unknown {
    const obj: any = {};
    if (!message.gaugeId.isZero()) {
      obj.gaugeId = (message.gaugeId || Long.UZERO).toString();
    }
    if (message.currentWeight !== "") {
      obj.currentWeight = message.currentWeight;
    }
    if (message.cumulativeWeight !== "") {
      obj.cumulativeWeight = message.cumulativeWeight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InternalGaugeRecord>, I>>(base?: I): InternalGaugeRecord {
    return InternalGaugeRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InternalGaugeRecord>, I>>(object: I): InternalGaugeRecord {
    const message = createBaseInternalGaugeRecord();
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    message.currentWeight = object.currentWeight ?? "";
    message.cumulativeWeight = object.cumulativeWeight ?? "";
    return message;
  },
};

function createBaseGroup(): Group {
  return { groupGaugeId: Long.UZERO, internalGaugeInfo: undefined, splittingPolicy: 0 };
}

export const Group = {
  encode(message: Group, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.groupGaugeId.isZero()) {
      writer.uint32(8).uint64(message.groupGaugeId);
    }
    if (message.internalGaugeInfo !== undefined) {
      InternalGaugeInfo.encode(message.internalGaugeInfo, writer.uint32(18).fork()).ldelim();
    }
    if (message.splittingPolicy !== 0) {
      writer.uint32(24).int32(message.splittingPolicy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Group {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.groupGaugeId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.internalGaugeInfo = InternalGaugeInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.splittingPolicy = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Group {
    return {
      groupGaugeId: isSet(object.groupGaugeId) ? Long.fromValue(object.groupGaugeId) : Long.UZERO,
      internalGaugeInfo: isSet(object.internalGaugeInfo)
        ? InternalGaugeInfo.fromJSON(object.internalGaugeInfo)
        : undefined,
      splittingPolicy: isSet(object.splittingPolicy) ? splittingPolicyFromJSON(object.splittingPolicy) : 0,
    };
  },

  toJSON(message: Group): unknown {
    const obj: any = {};
    if (!message.groupGaugeId.isZero()) {
      obj.groupGaugeId = (message.groupGaugeId || Long.UZERO).toString();
    }
    if (message.internalGaugeInfo !== undefined) {
      obj.internalGaugeInfo = InternalGaugeInfo.toJSON(message.internalGaugeInfo);
    }
    if (message.splittingPolicy !== 0) {
      obj.splittingPolicy = splittingPolicyToJSON(message.splittingPolicy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Group>, I>>(base?: I): Group {
    return Group.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Group>, I>>(object: I): Group {
    const message = createBaseGroup();
    message.groupGaugeId = (object.groupGaugeId !== undefined && object.groupGaugeId !== null)
      ? Long.fromValue(object.groupGaugeId)
      : Long.UZERO;
    message.internalGaugeInfo = (object.internalGaugeInfo !== undefined && object.internalGaugeInfo !== null)
      ? InternalGaugeInfo.fromPartial(object.internalGaugeInfo)
      : undefined;
    message.splittingPolicy = object.splittingPolicy ?? 0;
    return message;
  },
};

function createBaseCreateGroup(): CreateGroup {
  return { poolIds: [] };
}

export const CreateGroup = {
  encode(message: CreateGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.poolIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.poolIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.poolIds.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateGroup {
    return {
      poolIds: globalThis.Array.isArray(object?.poolIds) ? object.poolIds.map((e: any) => Long.fromValue(e)) : [],
    };
  },

  toJSON(message: CreateGroup): unknown {
    const obj: any = {};
    if (message.poolIds?.length) {
      obj.poolIds = message.poolIds.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateGroup>, I>>(base?: I): CreateGroup {
    return CreateGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateGroup>, I>>(object: I): CreateGroup {
    const message = createBaseCreateGroup();
    message.poolIds = object.poolIds?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseGroupsWithGauge(): GroupsWithGauge {
  return { group: undefined, gauge: undefined };
}

export const GroupsWithGauge = {
  encode(message: GroupsWithGauge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group !== undefined) {
      Group.encode(message.group, writer.uint32(10).fork()).ldelim();
    }
    if (message.gauge !== undefined) {
      Gauge.encode(message.gauge, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupsWithGauge {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupsWithGauge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group = Group.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.gauge = Gauge.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GroupsWithGauge {
    return {
      group: isSet(object.group) ? Group.fromJSON(object.group) : undefined,
      gauge: isSet(object.gauge) ? Gauge.fromJSON(object.gauge) : undefined,
    };
  },

  toJSON(message: GroupsWithGauge): unknown {
    const obj: any = {};
    if (message.group !== undefined) {
      obj.group = Group.toJSON(message.group);
    }
    if (message.gauge !== undefined) {
      obj.gauge = Gauge.toJSON(message.gauge);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GroupsWithGauge>, I>>(base?: I): GroupsWithGauge {
    return GroupsWithGauge.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GroupsWithGauge>, I>>(object: I): GroupsWithGauge {
    const message = createBaseGroupsWithGauge();
    message.group = (object.group !== undefined && object.group !== null) ? Group.fromPartial(object.group) : undefined;
    message.gauge = (object.gauge !== undefined && object.gauge !== null) ? Gauge.fromPartial(object.gauge) : undefined;
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
