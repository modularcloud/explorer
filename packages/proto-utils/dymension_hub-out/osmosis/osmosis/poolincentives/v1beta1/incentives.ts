/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";

export const protobufPackage = "osmosis.poolincentives.v1beta1";

export interface Params {
  /**
   * minted_denom is the denomination of the coin expected to be minted by the
   * minting module. Pool-incentives module doesn’t actually mint the coin
   * itself, but rather manages the distribution of coins that matches the
   * defined minted_denom.
   */
  mintedDenom: string;
}

export interface LockableDurationsInfo {
  lockableDurations: Duration[];
}

export interface DistrInfo {
  totalWeight: string;
  records: DistrRecord[];
}

export interface DistrRecord {
  gaugeId: Long;
  weight: string;
}

export interface PoolToGauge {
  poolId: Long;
  gaugeId: Long;
  duration: Duration | undefined;
}

export interface AnyPoolToInternalGauges {
  poolToGauge: PoolToGauge[];
}

export interface ConcentratedPoolToNoLockGauges {
  poolToGauge: PoolToGauge[];
}

function createBaseParams(): Params {
  return { mintedDenom: "" };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mintedDenom !== "") {
      writer.uint32(10).string(message.mintedDenom);
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

          message.mintedDenom = reader.string();
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
    return { mintedDenom: isSet(object.mintedDenom) ? globalThis.String(object.mintedDenom) : "" };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.mintedDenom !== "") {
      obj.mintedDenom = message.mintedDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.mintedDenom = object.mintedDenom ?? "";
    return message;
  },
};

function createBaseLockableDurationsInfo(): LockableDurationsInfo {
  return { lockableDurations: [] };
}

export const LockableDurationsInfo = {
  encode(message: LockableDurationsInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.lockableDurations) {
      Duration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LockableDurationsInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLockableDurationsInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lockableDurations.push(Duration.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LockableDurationsInfo {
    return {
      lockableDurations: globalThis.Array.isArray(object?.lockableDurations)
        ? object.lockableDurations.map((e: any) => Duration.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LockableDurationsInfo): unknown {
    const obj: any = {};
    if (message.lockableDurations?.length) {
      obj.lockableDurations = message.lockableDurations.map((e) => Duration.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LockableDurationsInfo>, I>>(base?: I): LockableDurationsInfo {
    return LockableDurationsInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LockableDurationsInfo>, I>>(object: I): LockableDurationsInfo {
    const message = createBaseLockableDurationsInfo();
    message.lockableDurations = object.lockableDurations?.map((e) => Duration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDistrInfo(): DistrInfo {
  return { totalWeight: "", records: [] };
}

export const DistrInfo = {
  encode(message: DistrInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalWeight !== "") {
      writer.uint32(10).string(message.totalWeight);
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistrInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistrInfo();
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

          message.records.push(DistrRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DistrInfo {
    return {
      totalWeight: isSet(object.totalWeight) ? globalThis.String(object.totalWeight) : "",
      records: globalThis.Array.isArray(object?.records) ? object.records.map((e: any) => DistrRecord.fromJSON(e)) : [],
    };
  },

  toJSON(message: DistrInfo): unknown {
    const obj: any = {};
    if (message.totalWeight !== "") {
      obj.totalWeight = message.totalWeight;
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => DistrRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DistrInfo>, I>>(base?: I): DistrInfo {
    return DistrInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DistrInfo>, I>>(object: I): DistrInfo {
    const message = createBaseDistrInfo();
    message.totalWeight = object.totalWeight ?? "";
    message.records = object.records?.map((e) => DistrRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDistrRecord(): DistrRecord {
  return { gaugeId: Long.UZERO, weight: "" };
}

export const DistrRecord = {
  encode(message: DistrRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.gaugeId.isZero()) {
      writer.uint32(8).uint64(message.gaugeId);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistrRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistrRecord();
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

          message.weight = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DistrRecord {
    return {
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
      weight: isSet(object.weight) ? globalThis.String(object.weight) : "",
    };
  },

  toJSON(message: DistrRecord): unknown {
    const obj: any = {};
    if (!message.gaugeId.isZero()) {
      obj.gaugeId = (message.gaugeId || Long.UZERO).toString();
    }
    if (message.weight !== "") {
      obj.weight = message.weight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DistrRecord>, I>>(base?: I): DistrRecord {
    return DistrRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DistrRecord>, I>>(object: I): DistrRecord {
    const message = createBaseDistrRecord();
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    message.weight = object.weight ?? "";
    return message;
  },
};

function createBasePoolToGauge(): PoolToGauge {
  return { poolId: Long.UZERO, gaugeId: Long.UZERO, duration: undefined };
}

export const PoolToGauge = {
  encode(message: PoolToGauge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (!message.gaugeId.isZero()) {
      writer.uint32(16).uint64(message.gaugeId);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolToGauge {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolToGauge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.gaugeId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): PoolToGauge {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
    };
  },

  toJSON(message: PoolToGauge): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (!message.gaugeId.isZero()) {
      obj.gaugeId = (message.gaugeId || Long.UZERO).toString();
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolToGauge>, I>>(base?: I): PoolToGauge {
    return PoolToGauge.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolToGauge>, I>>(object: I): PoolToGauge {
    const message = createBasePoolToGauge();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    return message;
  },
};

function createBaseAnyPoolToInternalGauges(): AnyPoolToInternalGauges {
  return { poolToGauge: [] };
}

export const AnyPoolToInternalGauges = {
  encode(message: AnyPoolToInternalGauges, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.poolToGauge) {
      PoolToGauge.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnyPoolToInternalGauges {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnyPoolToInternalGauges();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.poolToGauge.push(PoolToGauge.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AnyPoolToInternalGauges {
    return {
      poolToGauge: globalThis.Array.isArray(object?.poolToGauge)
        ? object.poolToGauge.map((e: any) => PoolToGauge.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AnyPoolToInternalGauges): unknown {
    const obj: any = {};
    if (message.poolToGauge?.length) {
      obj.poolToGauge = message.poolToGauge.map((e) => PoolToGauge.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AnyPoolToInternalGauges>, I>>(base?: I): AnyPoolToInternalGauges {
    return AnyPoolToInternalGauges.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AnyPoolToInternalGauges>, I>>(object: I): AnyPoolToInternalGauges {
    const message = createBaseAnyPoolToInternalGauges();
    message.poolToGauge = object.poolToGauge?.map((e) => PoolToGauge.fromPartial(e)) || [];
    return message;
  },
};

function createBaseConcentratedPoolToNoLockGauges(): ConcentratedPoolToNoLockGauges {
  return { poolToGauge: [] };
}

export const ConcentratedPoolToNoLockGauges = {
  encode(message: ConcentratedPoolToNoLockGauges, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.poolToGauge) {
      PoolToGauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConcentratedPoolToNoLockGauges {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConcentratedPoolToNoLockGauges();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolToGauge.push(PoolToGauge.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConcentratedPoolToNoLockGauges {
    return {
      poolToGauge: globalThis.Array.isArray(object?.poolToGauge)
        ? object.poolToGauge.map((e: any) => PoolToGauge.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ConcentratedPoolToNoLockGauges): unknown {
    const obj: any = {};
    if (message.poolToGauge?.length) {
      obj.poolToGauge = message.poolToGauge.map((e) => PoolToGauge.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConcentratedPoolToNoLockGauges>, I>>(base?: I): ConcentratedPoolToNoLockGauges {
    return ConcentratedPoolToNoLockGauges.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConcentratedPoolToNoLockGauges>, I>>(
    object: I,
  ): ConcentratedPoolToNoLockGauges {
    const message = createBaseConcentratedPoolToNoLockGauges();
    message.poolToGauge = object.poolToGauge?.map((e) => PoolToGauge.fromPartial(e)) || [];
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
