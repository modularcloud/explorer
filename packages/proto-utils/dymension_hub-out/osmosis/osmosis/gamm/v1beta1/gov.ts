/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { BalancerToConcentratedPoolLink } from "./shared";

export const protobufPackage = "osmosis.gamm.v1beta1";

/**
 * ReplaceMigrationRecordsProposal is a gov Content type for updating the
 * migration records. If a ReplaceMigrationRecordsProposal passes, the
 * proposal’s records override the existing MigrationRecords set in the module.
 * Each record specifies a single connection between a single balancer pool and
 * a single concentrated pool.
 */
export interface ReplaceMigrationRecordsProposal {
  title: string;
  description: string;
  records: BalancerToConcentratedPoolLink[];
}

/**
 * For example: if the existing DistrRecords were:
 * [(Balancer 1, CL 5), (Balancer 2, CL 6), (Balancer 3, CL 7)]
 * And an UpdateMigrationRecordsProposal includes
 * [(Balancer 2, CL 0), (Balancer 3, CL 4), (Balancer 4, CL 10)]
 * This would leave Balancer 1 record, delete Balancer 2 record,
 * Edit Balancer 3 record, and Add Balancer 4 record
 * The result MigrationRecords in state would be:
 * [(Balancer 1, CL 5), (Balancer 3, CL 4), (Balancer 4, CL 10)]
 */
export interface UpdateMigrationRecordsProposal {
  title: string;
  description: string;
  records: BalancerToConcentratedPoolLink[];
}

export interface PoolRecordWithCFMMLink {
  denom0: string;
  denom1: string;
  tickSpacing: Long;
  exponentAtPriceOne: string;
  spreadFactor: string;
  balancerPoolId: Long;
}

/**
 * CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal is a gov Content type
 * for creating concentrated liquidity pools and linking it to a CFMM pool.
 */
export interface CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal {
  title: string;
  description: string;
  poolRecordsWithCfmmLink: PoolRecordWithCFMMLink[];
}

/**
 * SetScalingFactorControllerProposal is a gov Content type for updating the
 * scaling factor controller address of a stableswap pool
 */
export interface SetScalingFactorControllerProposal {
  title: string;
  description: string;
  poolId: Long;
  controllerAddress: string;
}

function createBaseReplaceMigrationRecordsProposal(): ReplaceMigrationRecordsProposal {
  return { title: "", description: "", records: [] };
}

export const ReplaceMigrationRecordsProposal = {
  encode(message: ReplaceMigrationRecordsProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.records) {
      BalancerToConcentratedPoolLink.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplaceMigrationRecordsProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplaceMigrationRecordsProposal();
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

          message.records.push(BalancerToConcentratedPoolLink.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReplaceMigrationRecordsProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      records: globalThis.Array.isArray(object?.records)
        ? object.records.map((e: any) => BalancerToConcentratedPoolLink.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ReplaceMigrationRecordsProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => BalancerToConcentratedPoolLink.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReplaceMigrationRecordsProposal>, I>>(base?: I): ReplaceMigrationRecordsProposal {
    return ReplaceMigrationRecordsProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReplaceMigrationRecordsProposal>, I>>(
    object: I,
  ): ReplaceMigrationRecordsProposal {
    const message = createBaseReplaceMigrationRecordsProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.records = object.records?.map((e) => BalancerToConcentratedPoolLink.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateMigrationRecordsProposal(): UpdateMigrationRecordsProposal {
  return { title: "", description: "", records: [] };
}

export const UpdateMigrationRecordsProposal = {
  encode(message: UpdateMigrationRecordsProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.records) {
      BalancerToConcentratedPoolLink.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateMigrationRecordsProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMigrationRecordsProposal();
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

          message.records.push(BalancerToConcentratedPoolLink.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateMigrationRecordsProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      records: globalThis.Array.isArray(object?.records)
        ? object.records.map((e: any) => BalancerToConcentratedPoolLink.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UpdateMigrationRecordsProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => BalancerToConcentratedPoolLink.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateMigrationRecordsProposal>, I>>(base?: I): UpdateMigrationRecordsProposal {
    return UpdateMigrationRecordsProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateMigrationRecordsProposal>, I>>(
    object: I,
  ): UpdateMigrationRecordsProposal {
    const message = createBaseUpdateMigrationRecordsProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.records = object.records?.map((e) => BalancerToConcentratedPoolLink.fromPartial(e)) || [];
    return message;
  },
};

function createBasePoolRecordWithCFMMLink(): PoolRecordWithCFMMLink {
  return {
    denom0: "",
    denom1: "",
    tickSpacing: Long.UZERO,
    exponentAtPriceOne: "",
    spreadFactor: "",
    balancerPoolId: Long.UZERO,
  };
}

export const PoolRecordWithCFMMLink = {
  encode(message: PoolRecordWithCFMMLink, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom0 !== "") {
      writer.uint32(10).string(message.denom0);
    }
    if (message.denom1 !== "") {
      writer.uint32(18).string(message.denom1);
    }
    if (!message.tickSpacing.isZero()) {
      writer.uint32(24).uint64(message.tickSpacing);
    }
    if (message.exponentAtPriceOne !== "") {
      writer.uint32(34).string(message.exponentAtPriceOne);
    }
    if (message.spreadFactor !== "") {
      writer.uint32(42).string(message.spreadFactor);
    }
    if (!message.balancerPoolId.isZero()) {
      writer.uint32(48).uint64(message.balancerPoolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolRecordWithCFMMLink {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolRecordWithCFMMLink();
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
        case 4:
          if (tag !== 34) {
            break;
          }

          message.exponentAtPriceOne = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.spreadFactor = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.balancerPoolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolRecordWithCFMMLink {
    return {
      denom0: isSet(object.denom0) ? globalThis.String(object.denom0) : "",
      denom1: isSet(object.denom1) ? globalThis.String(object.denom1) : "",
      tickSpacing: isSet(object.tickSpacing) ? Long.fromValue(object.tickSpacing) : Long.UZERO,
      exponentAtPriceOne: isSet(object.exponentAtPriceOne) ? globalThis.String(object.exponentAtPriceOne) : "",
      spreadFactor: isSet(object.spreadFactor) ? globalThis.String(object.spreadFactor) : "",
      balancerPoolId: isSet(object.balancerPoolId) ? Long.fromValue(object.balancerPoolId) : Long.UZERO,
    };
  },

  toJSON(message: PoolRecordWithCFMMLink): unknown {
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
    if (message.exponentAtPriceOne !== "") {
      obj.exponentAtPriceOne = message.exponentAtPriceOne;
    }
    if (message.spreadFactor !== "") {
      obj.spreadFactor = message.spreadFactor;
    }
    if (!message.balancerPoolId.isZero()) {
      obj.balancerPoolId = (message.balancerPoolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolRecordWithCFMMLink>, I>>(base?: I): PoolRecordWithCFMMLink {
    return PoolRecordWithCFMMLink.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolRecordWithCFMMLink>, I>>(object: I): PoolRecordWithCFMMLink {
    const message = createBasePoolRecordWithCFMMLink();
    message.denom0 = object.denom0 ?? "";
    message.denom1 = object.denom1 ?? "";
    message.tickSpacing = (object.tickSpacing !== undefined && object.tickSpacing !== null)
      ? Long.fromValue(object.tickSpacing)
      : Long.UZERO;
    message.exponentAtPriceOne = object.exponentAtPriceOne ?? "";
    message.spreadFactor = object.spreadFactor ?? "";
    message.balancerPoolId = (object.balancerPoolId !== undefined && object.balancerPoolId !== null)
      ? Long.fromValue(object.balancerPoolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCreateConcentratedLiquidityPoolsAndLinktoCFMMProposal(): CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal {
  return { title: "", description: "", poolRecordsWithCfmmLink: [] };
}

export const CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal = {
  encode(
    message: CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.poolRecordsWithCfmmLink) {
      PoolRecordWithCFMMLink.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateConcentratedLiquidityPoolsAndLinktoCFMMProposal();
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

          message.poolRecordsWithCfmmLink.push(PoolRecordWithCFMMLink.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      poolRecordsWithCfmmLink: globalThis.Array.isArray(object?.poolRecordsWithCfmmLink)
        ? object.poolRecordsWithCfmmLink.map((e: any) => PoolRecordWithCFMMLink.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.poolRecordsWithCfmmLink?.length) {
      obj.poolRecordsWithCfmmLink = message.poolRecordsWithCfmmLink.map((e) => PoolRecordWithCFMMLink.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal>, I>>(
    base?: I,
  ): CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal {
    return CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal>, I>>(
    object: I,
  ): CreateConcentratedLiquidityPoolsAndLinktoCFMMProposal {
    const message = createBaseCreateConcentratedLiquidityPoolsAndLinktoCFMMProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.poolRecordsWithCfmmLink =
      object.poolRecordsWithCfmmLink?.map((e) => PoolRecordWithCFMMLink.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSetScalingFactorControllerProposal(): SetScalingFactorControllerProposal {
  return { title: "", description: "", poolId: Long.UZERO, controllerAddress: "" };
}

export const SetScalingFactorControllerProposal = {
  encode(message: SetScalingFactorControllerProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(24).uint64(message.poolId);
    }
    if (message.controllerAddress !== "") {
      writer.uint32(34).string(message.controllerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetScalingFactorControllerProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetScalingFactorControllerProposal();
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
          if (tag !== 24) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.controllerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SetScalingFactorControllerProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      controllerAddress: isSet(object.controllerAddress) ? globalThis.String(object.controllerAddress) : "",
    };
  },

  toJSON(message: SetScalingFactorControllerProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.controllerAddress !== "") {
      obj.controllerAddress = message.controllerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SetScalingFactorControllerProposal>, I>>(
    base?: I,
  ): SetScalingFactorControllerProposal {
    return SetScalingFactorControllerProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SetScalingFactorControllerProposal>, I>>(
    object: I,
  ): SetScalingFactorControllerProposal {
    const message = createBaseSetScalingFactorControllerProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.controllerAddress = object.controllerAddress ?? "";
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
