/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { AccumulatorContent, Record } from "../../accum/v1beta1/accum";
import { Params } from "../params";
import { IncentiveRecord } from "./incentive_record";
import { Position } from "./position";
import { TickInfo } from "./tick_info";

export const protobufPackage = "osmosis.concentratedliquidity.v1beta1";

/**
 * FullTick contains tick index and pool id along with other tick model
 * information.
 */
export interface FullTick {
  /** pool id associated with the tick. */
  poolId: Long;
  /** tick's index. */
  tickIndex: Long;
  /** tick's info. */
  info: TickInfo | undefined;
}

/**
 * PoolData represents a serialized pool along with its ticks
 * for genesis state.
 */
export interface PoolData {
  /** pool struct */
  pool:
    | Any
    | undefined;
  /** pool's ticks */
  ticks: FullTick[];
  spreadRewardAccumulator: AccumObject | undefined;
  incentivesAccumulators: AccumObject[];
  /** incentive records to be set */
  incentiveRecords: IncentiveRecord[];
}

export interface PositionData {
  position: Position | undefined;
  lockId: Long;
  spreadRewardAccumRecord: Record | undefined;
  uptimeAccumRecords: Record[];
}

/** GenesisState defines the concentrated liquidity module's genesis state. */
export interface GenesisState {
  /** params are all the parameters of the module */
  params:
    | Params
    | undefined;
  /** pool data containing serialized pool struct and ticks. */
  poolData: PoolData[];
  positionData: PositionData[];
  nextPositionId: Long;
  nextIncentiveRecordId: Long;
  incentivesAccumulatorPoolIdMigrationThreshold: Long;
}

/**
 * In original struct of Accum object, store.KVStore is stored together.
 * For handling genesis, we do not need to include store.KVStore since we use
 * CL module's KVStore.
 */
export interface AccumObject {
  /** Accumulator's name (pulled from AccumulatorContent) */
  name: string;
  accumContent: AccumulatorContent | undefined;
}

function createBaseFullTick(): FullTick {
  return { poolId: Long.UZERO, tickIndex: Long.ZERO, info: undefined };
}

export const FullTick = {
  encode(message: FullTick, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (!message.tickIndex.isZero()) {
      writer.uint32(16).int64(message.tickIndex);
    }
    if (message.info !== undefined) {
      TickInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FullTick {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullTick();
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

          message.tickIndex = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.info = TickInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FullTick {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tickIndex: isSet(object.tickIndex) ? Long.fromValue(object.tickIndex) : Long.ZERO,
      info: isSet(object.info) ? TickInfo.fromJSON(object.info) : undefined,
    };
  },

  toJSON(message: FullTick): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (!message.tickIndex.isZero()) {
      obj.tickIndex = (message.tickIndex || Long.ZERO).toString();
    }
    if (message.info !== undefined) {
      obj.info = TickInfo.toJSON(message.info);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FullTick>, I>>(base?: I): FullTick {
    return FullTick.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FullTick>, I>>(object: I): FullTick {
    const message = createBaseFullTick();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tickIndex = (object.tickIndex !== undefined && object.tickIndex !== null)
      ? Long.fromValue(object.tickIndex)
      : Long.ZERO;
    message.info = (object.info !== undefined && object.info !== null) ? TickInfo.fromPartial(object.info) : undefined;
    return message;
  },
};

function createBasePoolData(): PoolData {
  return {
    pool: undefined,
    ticks: [],
    spreadRewardAccumulator: undefined,
    incentivesAccumulators: [],
    incentiveRecords: [],
  };
}

export const PoolData = {
  encode(message: PoolData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool !== undefined) {
      Any.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.ticks) {
      FullTick.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.spreadRewardAccumulator !== undefined) {
      AccumObject.encode(message.spreadRewardAccumulator, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.incentivesAccumulators) {
      AccumObject.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.incentiveRecords) {
      IncentiveRecord.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool = Any.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ticks.push(FullTick.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.spreadRewardAccumulator = AccumObject.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.incentivesAccumulators.push(AccumObject.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.incentiveRecords.push(IncentiveRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolData {
    return {
      pool: isSet(object.pool) ? Any.fromJSON(object.pool) : undefined,
      ticks: globalThis.Array.isArray(object?.ticks) ? object.ticks.map((e: any) => FullTick.fromJSON(e)) : [],
      spreadRewardAccumulator: isSet(object.spreadRewardAccumulator)
        ? AccumObject.fromJSON(object.spreadRewardAccumulator)
        : undefined,
      incentivesAccumulators: globalThis.Array.isArray(object?.incentivesAccumulators)
        ? object.incentivesAccumulators.map((e: any) => AccumObject.fromJSON(e))
        : [],
      incentiveRecords: globalThis.Array.isArray(object?.incentiveRecords)
        ? object.incentiveRecords.map((e: any) => IncentiveRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PoolData): unknown {
    const obj: any = {};
    if (message.pool !== undefined) {
      obj.pool = Any.toJSON(message.pool);
    }
    if (message.ticks?.length) {
      obj.ticks = message.ticks.map((e) => FullTick.toJSON(e));
    }
    if (message.spreadRewardAccumulator !== undefined) {
      obj.spreadRewardAccumulator = AccumObject.toJSON(message.spreadRewardAccumulator);
    }
    if (message.incentivesAccumulators?.length) {
      obj.incentivesAccumulators = message.incentivesAccumulators.map((e) => AccumObject.toJSON(e));
    }
    if (message.incentiveRecords?.length) {
      obj.incentiveRecords = message.incentiveRecords.map((e) => IncentiveRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolData>, I>>(base?: I): PoolData {
    return PoolData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolData>, I>>(object: I): PoolData {
    const message = createBasePoolData();
    message.pool = (object.pool !== undefined && object.pool !== null) ? Any.fromPartial(object.pool) : undefined;
    message.ticks = object.ticks?.map((e) => FullTick.fromPartial(e)) || [];
    message.spreadRewardAccumulator =
      (object.spreadRewardAccumulator !== undefined && object.spreadRewardAccumulator !== null)
        ? AccumObject.fromPartial(object.spreadRewardAccumulator)
        : undefined;
    message.incentivesAccumulators = object.incentivesAccumulators?.map((e) => AccumObject.fromPartial(e)) || [];
    message.incentiveRecords = object.incentiveRecords?.map((e) => IncentiveRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBasePositionData(): PositionData {
  return { position: undefined, lockId: Long.UZERO, spreadRewardAccumRecord: undefined, uptimeAccumRecords: [] };
}

export const PositionData = {
  encode(message: PositionData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      Position.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (!message.lockId.isZero()) {
      writer.uint32(16).uint64(message.lockId);
    }
    if (message.spreadRewardAccumRecord !== undefined) {
      Record.encode(message.spreadRewardAccumRecord, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.uptimeAccumRecords) {
      Record.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PositionData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositionData();
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
          if (tag !== 16) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.spreadRewardAccumRecord = Record.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.uptimeAccumRecords.push(Record.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PositionData {
    return {
      position: isSet(object.position) ? Position.fromJSON(object.position) : undefined,
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO,
      spreadRewardAccumRecord: isSet(object.spreadRewardAccumRecord)
        ? Record.fromJSON(object.spreadRewardAccumRecord)
        : undefined,
      uptimeAccumRecords: globalThis.Array.isArray(object?.uptimeAccumRecords)
        ? object.uptimeAccumRecords.map((e: any) => Record.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PositionData): unknown {
    const obj: any = {};
    if (message.position !== undefined) {
      obj.position = Position.toJSON(message.position);
    }
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    if (message.spreadRewardAccumRecord !== undefined) {
      obj.spreadRewardAccumRecord = Record.toJSON(message.spreadRewardAccumRecord);
    }
    if (message.uptimeAccumRecords?.length) {
      obj.uptimeAccumRecords = message.uptimeAccumRecords.map((e) => Record.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PositionData>, I>>(base?: I): PositionData {
    return PositionData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PositionData>, I>>(object: I): PositionData {
    const message = createBasePositionData();
    message.position = (object.position !== undefined && object.position !== null)
      ? Position.fromPartial(object.position)
      : undefined;
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    message.spreadRewardAccumRecord =
      (object.spreadRewardAccumRecord !== undefined && object.spreadRewardAccumRecord !== null)
        ? Record.fromPartial(object.spreadRewardAccumRecord)
        : undefined;
    message.uptimeAccumRecords = object.uptimeAccumRecords?.map((e) => Record.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    poolData: [],
    positionData: [],
    nextPositionId: Long.UZERO,
    nextIncentiveRecordId: Long.UZERO,
    incentivesAccumulatorPoolIdMigrationThreshold: Long.UZERO,
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.poolData) {
      PoolData.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.positionData) {
      PositionData.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.nextPositionId.isZero()) {
      writer.uint32(32).uint64(message.nextPositionId);
    }
    if (!message.nextIncentiveRecordId.isZero()) {
      writer.uint32(40).uint64(message.nextIncentiveRecordId);
    }
    if (!message.incentivesAccumulatorPoolIdMigrationThreshold.isZero()) {
      writer.uint32(48).uint64(message.incentivesAccumulatorPoolIdMigrationThreshold);
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

          message.poolData.push(PoolData.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.positionData.push(PositionData.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.nextPositionId = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.nextIncentiveRecordId = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.incentivesAccumulatorPoolIdMigrationThreshold = reader.uint64() as Long;
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
      poolData: globalThis.Array.isArray(object?.poolData) ? object.poolData.map((e: any) => PoolData.fromJSON(e)) : [],
      positionData: globalThis.Array.isArray(object?.positionData)
        ? object.positionData.map((e: any) => PositionData.fromJSON(e))
        : [],
      nextPositionId: isSet(object.nextPositionId) ? Long.fromValue(object.nextPositionId) : Long.UZERO,
      nextIncentiveRecordId: isSet(object.nextIncentiveRecordId)
        ? Long.fromValue(object.nextIncentiveRecordId)
        : Long.UZERO,
      incentivesAccumulatorPoolIdMigrationThreshold: isSet(object.incentivesAccumulatorPoolIdMigrationThreshold)
        ? Long.fromValue(object.incentivesAccumulatorPoolIdMigrationThreshold)
        : Long.UZERO,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.poolData?.length) {
      obj.poolData = message.poolData.map((e) => PoolData.toJSON(e));
    }
    if (message.positionData?.length) {
      obj.positionData = message.positionData.map((e) => PositionData.toJSON(e));
    }
    if (!message.nextPositionId.isZero()) {
      obj.nextPositionId = (message.nextPositionId || Long.UZERO).toString();
    }
    if (!message.nextIncentiveRecordId.isZero()) {
      obj.nextIncentiveRecordId = (message.nextIncentiveRecordId || Long.UZERO).toString();
    }
    if (!message.incentivesAccumulatorPoolIdMigrationThreshold.isZero()) {
      obj.incentivesAccumulatorPoolIdMigrationThreshold =
        (message.incentivesAccumulatorPoolIdMigrationThreshold || Long.UZERO).toString();
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
    message.poolData = object.poolData?.map((e) => PoolData.fromPartial(e)) || [];
    message.positionData = object.positionData?.map((e) => PositionData.fromPartial(e)) || [];
    message.nextPositionId = (object.nextPositionId !== undefined && object.nextPositionId !== null)
      ? Long.fromValue(object.nextPositionId)
      : Long.UZERO;
    message.nextIncentiveRecordId =
      (object.nextIncentiveRecordId !== undefined && object.nextIncentiveRecordId !== null)
        ? Long.fromValue(object.nextIncentiveRecordId)
        : Long.UZERO;
    message.incentivesAccumulatorPoolIdMigrationThreshold =
      (object.incentivesAccumulatorPoolIdMigrationThreshold !== undefined &&
          object.incentivesAccumulatorPoolIdMigrationThreshold !== null)
        ? Long.fromValue(object.incentivesAccumulatorPoolIdMigrationThreshold)
        : Long.UZERO;
    return message;
  },
};

function createBaseAccumObject(): AccumObject {
  return { name: "", accumContent: undefined };
}

export const AccumObject = {
  encode(message: AccumObject, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.accumContent !== undefined) {
      AccumulatorContent.encode(message.accumContent, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccumObject {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccumObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accumContent = AccumulatorContent.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccumObject {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      accumContent: isSet(object.accumContent) ? AccumulatorContent.fromJSON(object.accumContent) : undefined,
    };
  },

  toJSON(message: AccumObject): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.accumContent !== undefined) {
      obj.accumContent = AccumulatorContent.toJSON(message.accumContent);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccumObject>, I>>(base?: I): AccumObject {
    return AccumObject.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccumObject>, I>>(object: I): AccumObject {
    const message = createBaseAccumObject();
    message.name = object.name ?? "";
    message.accumContent = (object.accumContent !== undefined && object.accumContent !== null)
      ? AccumulatorContent.fromPartial(object.accumContent)
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
