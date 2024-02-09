/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.concentratedliquidity.v1beta1";

/**
 * CreateConcentratedLiquidityPoolsProposal is a gov Content type for creating
 * concentrated liquidity pools. If a CreateConcentratedLiquidityPoolsProposal
 * passes, the pools are created via pool manager module account.
 */
export interface CreateConcentratedLiquidityPoolsProposal {
  title: string;
  description: string;
  poolRecords: PoolRecord[];
}

/**
 * TickSpacingDecreaseProposal is a gov Content type for proposing a tick
 * spacing decrease for a pool. The proposal will fail if one of the pools do
 * not exist, or if the new tick spacing is not less than the current tick
 * spacing.
 */
export interface TickSpacingDecreaseProposal {
  title: string;
  description: string;
  poolIdToTickSpacingRecords: PoolIdToTickSpacingRecord[];
}

/**
 * PoolIdToTickSpacingRecord is a struct that contains a pool id to new tick
 * spacing pair.
 */
export interface PoolIdToTickSpacingRecord {
  poolId: Long;
  newTickSpacing: Long;
}

export interface PoolRecord {
  denom0: string;
  denom1: string;
  tickSpacing: Long;
  spreadFactor: string;
}

function createBaseCreateConcentratedLiquidityPoolsProposal(): CreateConcentratedLiquidityPoolsProposal {
  return { title: "", description: "", poolRecords: [] };
}

export const CreateConcentratedLiquidityPoolsProposal = {
  encode(message: CreateConcentratedLiquidityPoolsProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.poolRecords) {
      PoolRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateConcentratedLiquidityPoolsProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateConcentratedLiquidityPoolsProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.poolRecords.push(PoolRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateConcentratedLiquidityPoolsProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      poolRecords: globalThis.Array.isArray(object?.poolRecords)
        ? object.poolRecords.map((e: any) => PoolRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateConcentratedLiquidityPoolsProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.poolRecords?.length) {
      obj.poolRecords = message.poolRecords.map((e) => PoolRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateConcentratedLiquidityPoolsProposal>, I>>(
    base?: I,
  ): CreateConcentratedLiquidityPoolsProposal {
    return CreateConcentratedLiquidityPoolsProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateConcentratedLiquidityPoolsProposal>, I>>(
    object: I,
  ): CreateConcentratedLiquidityPoolsProposal {
    const message = createBaseCreateConcentratedLiquidityPoolsProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.poolRecords = object.poolRecords?.map((e) => PoolRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTickSpacingDecreaseProposal(): TickSpacingDecreaseProposal {
  return { title: "", description: "", poolIdToTickSpacingRecords: [] };
}

export const TickSpacingDecreaseProposal = {
  encode(message: TickSpacingDecreaseProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.poolIdToTickSpacingRecords) {
      PoolIdToTickSpacingRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TickSpacingDecreaseProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTickSpacingDecreaseProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.poolIdToTickSpacingRecords.push(PoolIdToTickSpacingRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TickSpacingDecreaseProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      poolIdToTickSpacingRecords: globalThis.Array.isArray(object?.poolIdToTickSpacingRecords)
        ? object.poolIdToTickSpacingRecords.map((e: any) => PoolIdToTickSpacingRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TickSpacingDecreaseProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.poolIdToTickSpacingRecords?.length) {
      obj.poolIdToTickSpacingRecords = message.poolIdToTickSpacingRecords.map((e) =>
        PoolIdToTickSpacingRecord.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TickSpacingDecreaseProposal>, I>>(base?: I): TickSpacingDecreaseProposal {
    return TickSpacingDecreaseProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TickSpacingDecreaseProposal>, I>>(object: I): TickSpacingDecreaseProposal {
    const message = createBaseTickSpacingDecreaseProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.poolIdToTickSpacingRecords =
      object.poolIdToTickSpacingRecords?.map((e) => PoolIdToTickSpacingRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBasePoolIdToTickSpacingRecord(): PoolIdToTickSpacingRecord {
  return { poolId: Long.UZERO, newTickSpacing: Long.UZERO };
}

export const PoolIdToTickSpacingRecord = {
  encode(message: PoolIdToTickSpacingRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (!message.newTickSpacing.isZero()) {
      writer.uint32(16).uint64(message.newTickSpacing);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolIdToTickSpacingRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolIdToTickSpacingRecord();
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

          message.newTickSpacing = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolIdToTickSpacingRecord {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      newTickSpacing: isSet(object.newTickSpacing) ? Long.fromValue(object.newTickSpacing) : Long.UZERO,
    };
  },

  toJSON(message: PoolIdToTickSpacingRecord): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (!message.newTickSpacing.isZero()) {
      obj.newTickSpacing = (message.newTickSpacing || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolIdToTickSpacingRecord>, I>>(base?: I): PoolIdToTickSpacingRecord {
    return PoolIdToTickSpacingRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolIdToTickSpacingRecord>, I>>(object: I): PoolIdToTickSpacingRecord {
    const message = createBasePoolIdToTickSpacingRecord();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.newTickSpacing = (object.newTickSpacing !== undefined && object.newTickSpacing !== null)
      ? Long.fromValue(object.newTickSpacing)
      : Long.UZERO;
    return message;
  },
};

function createBasePoolRecord(): PoolRecord {
  return { denom0: "", denom1: "", tickSpacing: Long.UZERO, spreadFactor: "" };
}

export const PoolRecord = {
  encode(message: PoolRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom0 !== "") {
      writer.uint32(10).string(message.denom0);
    }
    if (message.denom1 !== "") {
      writer.uint32(18).string(message.denom1);
    }
    if (!message.tickSpacing.isZero()) {
      writer.uint32(24).uint64(message.tickSpacing);
    }
    if (message.spreadFactor !== "") {
      writer.uint32(42).string(message.spreadFactor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom0 = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom1 = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.tickSpacing = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.spreadFactor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolRecord {
    return {
      denom0: isSet(object.denom0) ? globalThis.String(object.denom0) : "",
      denom1: isSet(object.denom1) ? globalThis.String(object.denom1) : "",
      tickSpacing: isSet(object.tickSpacing) ? Long.fromValue(object.tickSpacing) : Long.UZERO,
      spreadFactor: isSet(object.spreadFactor) ? globalThis.String(object.spreadFactor) : "",
    };
  },

  toJSON(message: PoolRecord): unknown {
    const obj: any = {};
    if (message.denom0 !== "") {
      obj.denom0 = message.denom0;
    }
    if (message.denom1 !== "") {
      obj.denom1 = message.denom1;
    }
    if (!message.tickSpacing.isZero()) {
      obj.tickSpacing = (message.tickSpacing || Long.UZERO).toString();
    }
    if (message.spreadFactor !== "") {
      obj.spreadFactor = message.spreadFactor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolRecord>, I>>(base?: I): PoolRecord {
    return PoolRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolRecord>, I>>(object: I): PoolRecord {
    const message = createBasePoolRecord();
    message.denom0 = object.denom0 ?? "";
    message.denom1 = object.denom1 ?? "";
    message.tickSpacing = (object.tickSpacing !== undefined && object.tickSpacing !== null)
      ? Long.fromValue(object.tickSpacing)
      : Long.UZERO;
    message.spreadFactor = object.spreadFactor ?? "";
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
