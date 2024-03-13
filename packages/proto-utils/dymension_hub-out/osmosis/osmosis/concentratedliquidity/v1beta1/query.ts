/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Coin, DecCoin } from "../../../cosmos/base/v1beta1/coin";
import { Any } from "../../../google/protobuf/any";
import { Params } from "../params";
import { IncentiveRecord } from "./incentive_record";
import { FullPositionBreakdown, PositionWithPeriodLock } from "./position";
import { UptimeTracker } from "./tick_info";

export const protobufPackage = "osmosis.concentratedliquidity.v1beta1";

/** =============================== UserPositions */
export interface UserPositionsRequest {
  address: string;
  poolId: Long;
  pagination: PageRequest | undefined;
}

export interface UserPositionsResponse {
  positions: FullPositionBreakdown[];
  pagination: PageResponse | undefined;
}

/** =============================== PositionById */
export interface PositionByIdRequest {
  positionId: Long;
}

export interface PositionByIdResponse {
  position: FullPositionBreakdown | undefined;
}

export interface NumPoolPositionsRequest {
  poolId: Long;
}

export interface NumPoolPositionsResponse {
  positionCount: Long;
}

/** =============================== Pools */
export interface PoolsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

export interface PoolsResponse {
  pools: Any[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** =============================== ModuleParams */
export interface ParamsRequest {
}

export interface ParamsResponse {
  params: Params | undefined;
}

export interface TickLiquidityNet {
  liquidityNet: string;
  tickIndex: Long;
}

export interface LiquidityDepthWithRange {
  liquidityAmount: string;
  lowerTick: Long;
  upperTick: Long;
}

/** =============================== LiquidityNetInDirection */
export interface LiquidityNetInDirectionRequest {
  poolId: Long;
  tokenIn: string;
  startTick: Long;
  useCurTick: boolean;
  boundTick: Long;
  useNoBound: boolean;
}

export interface LiquidityNetInDirectionResponse {
  liquidityDepths: TickLiquidityNet[];
  currentTick: Long;
  currentLiquidity: string;
  currentSqrtPrice: string;
}

/** =============================== LiquidityPerTickRange */
export interface LiquidityPerTickRangeRequest {
  poolId: Long;
}

export interface LiquidityPerTickRangeResponse {
  liquidity: LiquidityDepthWithRange[];
  bucketIndex: Long;
}

/** ===================== QueryClaimableSpreadRewards */
export interface ClaimableSpreadRewardsRequest {
  positionId: Long;
}

export interface ClaimableSpreadRewardsResponse {
  claimableSpreadRewards: Coin[];
}

/** ===================== QueryClaimableIncentives */
export interface ClaimableIncentivesRequest {
  positionId: Long;
}

export interface ClaimableIncentivesResponse {
  claimableIncentives: Coin[];
  forfeitedIncentives: Coin[];
}

/** ===================== QueryPoolAccumulatorRewards */
export interface PoolAccumulatorRewardsRequest {
  poolId: Long;
}

export interface PoolAccumulatorRewardsResponse {
  spreadRewardGrowthGlobal: DecCoin[];
  uptimeGrowthGlobal: UptimeTracker[];
}

/** ===================== QueryTickAccumulatorTrackers */
export interface TickAccumulatorTrackersRequest {
  poolId: Long;
  tickIndex: Long;
}

export interface TickAccumulatorTrackersResponse {
  spreadRewardGrowthOppositeDirectionOfLastTraversal: DecCoin[];
  uptimeTrackers: UptimeTracker[];
}

/** ===================== QueryIncentiveRecords */
export interface IncentiveRecordsRequest {
  poolId: Long;
  pagination: PageRequest | undefined;
}

export interface IncentiveRecordsResponse {
  incentiveRecords: IncentiveRecord[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** =============================== CFMMPoolIdLinkFromConcentratedPoolId */
export interface CFMMPoolIdLinkFromConcentratedPoolIdRequest {
  concentratedPoolId: Long;
}

export interface CFMMPoolIdLinkFromConcentratedPoolIdResponse {
  cfmmPoolId: Long;
}

/** =============================== UserUnbondingPositions */
export interface UserUnbondingPositionsRequest {
  address: string;
}

export interface UserUnbondingPositionsResponse {
  positionsWithPeriodLock: PositionWithPeriodLock[];
}

/** =============================== GetTotalLiquidity */
export interface GetTotalLiquidityRequest {
}

export interface GetTotalLiquidityResponse {
  totalLiquidity: Coin[];
}

/** =============================== NumNextInitializedTicks */
export interface NumNextInitializedTicksRequest {
  poolId: Long;
  tokenInDenom: string;
  numNextInitializedTicks: Long;
}

export interface NumNextInitializedTicksResponse {
  liquidityDepths: TickLiquidityNet[];
  currentTick: Long;
  currentLiquidity: string;
}

function createBaseUserPositionsRequest(): UserPositionsRequest {
  return { address: "", poolId: Long.UZERO, pagination: undefined };
}

export const UserPositionsRequest = {
  encode(message: UserPositionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserPositionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserPositionsRequest();
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
          if (tag !== 16) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserPositionsRequest {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: UserPositionsRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserPositionsRequest>, I>>(base?: I): UserPositionsRequest {
    return UserPositionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserPositionsRequest>, I>>(object: I): UserPositionsRequest {
    const message = createBaseUserPositionsRequest();
    message.address = object.address ?? "";
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUserPositionsResponse(): UserPositionsResponse {
  return { positions: [], pagination: undefined };
}

export const UserPositionsResponse = {
  encode(message: UserPositionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.positions) {
      FullPositionBreakdown.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserPositionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserPositionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.positions.push(FullPositionBreakdown.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserPositionsResponse {
    return {
      positions: globalThis.Array.isArray(object?.positions)
        ? object.positions.map((e: any) => FullPositionBreakdown.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: UserPositionsResponse): unknown {
    const obj: any = {};
    if (message.positions?.length) {
      obj.positions = message.positions.map((e) => FullPositionBreakdown.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserPositionsResponse>, I>>(base?: I): UserPositionsResponse {
    return UserPositionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserPositionsResponse>, I>>(object: I): UserPositionsResponse {
    const message = createBaseUserPositionsResponse();
    message.positions = object.positions?.map((e) => FullPositionBreakdown.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBasePositionByIdRequest(): PositionByIdRequest {
  return { positionId: Long.UZERO };
}

export const PositionByIdRequest = {
  encode(message: PositionByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PositionByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositionByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.positionId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PositionByIdRequest {
    return { positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO };
  },

  toJSON(message: PositionByIdRequest): unknown {
    const obj: any = {};
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PositionByIdRequest>, I>>(base?: I): PositionByIdRequest {
    return PositionByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PositionByIdRequest>, I>>(object: I): PositionByIdRequest {
    const message = createBasePositionByIdRequest();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    return message;
  },
};

function createBasePositionByIdResponse(): PositionByIdResponse {
  return { position: undefined };
}

export const PositionByIdResponse = {
  encode(message: PositionByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.position !== undefined) {
      FullPositionBreakdown.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PositionByIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePositionByIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.position = FullPositionBreakdown.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PositionByIdResponse {
    return { position: isSet(object.position) ? FullPositionBreakdown.fromJSON(object.position) : undefined };
  },

  toJSON(message: PositionByIdResponse): unknown {
    const obj: any = {};
    if (message.position !== undefined) {
      obj.position = FullPositionBreakdown.toJSON(message.position);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PositionByIdResponse>, I>>(base?: I): PositionByIdResponse {
    return PositionByIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PositionByIdResponse>, I>>(object: I): PositionByIdResponse {
    const message = createBasePositionByIdResponse();
    message.position = (object.position !== undefined && object.position !== null)
      ? FullPositionBreakdown.fromPartial(object.position)
      : undefined;
    return message;
  },
};

function createBaseNumPoolPositionsRequest(): NumPoolPositionsRequest {
  return { poolId: Long.UZERO };
}

export const NumPoolPositionsRequest = {
  encode(message: NumPoolPositionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumPoolPositionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumPoolPositionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NumPoolPositionsRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: NumPoolPositionsRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NumPoolPositionsRequest>, I>>(base?: I): NumPoolPositionsRequest {
    return NumPoolPositionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NumPoolPositionsRequest>, I>>(object: I): NumPoolPositionsRequest {
    const message = createBaseNumPoolPositionsRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseNumPoolPositionsResponse(): NumPoolPositionsResponse {
  return { positionCount: Long.UZERO };
}

export const NumPoolPositionsResponse = {
  encode(message: NumPoolPositionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.positionCount.isZero()) {
      writer.uint32(8).uint64(message.positionCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumPoolPositionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumPoolPositionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.positionCount = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NumPoolPositionsResponse {
    return { positionCount: isSet(object.positionCount) ? Long.fromValue(object.positionCount) : Long.UZERO };
  },

  toJSON(message: NumPoolPositionsResponse): unknown {
    const obj: any = {};
    if (!message.positionCount.isZero()) {
      obj.positionCount = (message.positionCount || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NumPoolPositionsResponse>, I>>(base?: I): NumPoolPositionsResponse {
    return NumPoolPositionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NumPoolPositionsResponse>, I>>(object: I): NumPoolPositionsResponse {
    const message = createBaseNumPoolPositionsResponse();
    message.positionCount = (object.positionCount !== undefined && object.positionCount !== null)
      ? Long.fromValue(object.positionCount)
      : Long.UZERO;
    return message;
  },
};

function createBasePoolsRequest(): PoolsRequest {
  return { pagination: undefined };
}

export const PoolsRequest = {
  encode(message: PoolsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: PoolsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolsRequest>, I>>(base?: I): PoolsRequest {
    return PoolsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolsRequest>, I>>(object: I): PoolsRequest {
    const message = createBasePoolsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBasePoolsResponse(): PoolsResponse {
  return { pools: [], pagination: undefined };
}

export const PoolsResponse = {
  encode(message: PoolsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pools) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pools.push(Any.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolsResponse {
    return {
      pools: globalThis.Array.isArray(object?.pools) ? object.pools.map((e: any) => Any.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: PoolsResponse): unknown {
    const obj: any = {};
    if (message.pools?.length) {
      obj.pools = message.pools.map((e) => Any.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolsResponse>, I>>(base?: I): PoolsResponse {
    return PoolsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolsResponse>, I>>(object: I): PoolsResponse {
    const message = createBasePoolsResponse();
    message.pools = object.pools?.map((e) => Any.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseParamsRequest(): ParamsRequest {
  return {};
}

export const ParamsRequest = {
  encode(_: ParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): ParamsRequest {
    return {};
  },

  toJSON(_: ParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsRequest>, I>>(base?: I): ParamsRequest {
    return ParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ParamsRequest>, I>>(_: I): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
};

function createBaseParamsResponse(): ParamsResponse {
  return { params: undefined };
}

export const ParamsResponse = {
  encode(message: ParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: ParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsResponse>, I>>(base?: I): ParamsResponse {
    return ParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ParamsResponse>, I>>(object: I): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseTickLiquidityNet(): TickLiquidityNet {
  return { liquidityNet: "", tickIndex: Long.ZERO };
}

export const TickLiquidityNet = {
  encode(message: TickLiquidityNet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.liquidityNet !== "") {
      writer.uint32(10).string(message.liquidityNet);
    }
    if (!message.tickIndex.isZero()) {
      writer.uint32(16).int64(message.tickIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TickLiquidityNet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTickLiquidityNet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidityNet = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.tickIndex = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TickLiquidityNet {
    return {
      liquidityNet: isSet(object.liquidityNet) ? globalThis.String(object.liquidityNet) : "",
      tickIndex: isSet(object.tickIndex) ? Long.fromValue(object.tickIndex) : Long.ZERO,
    };
  },

  toJSON(message: TickLiquidityNet): unknown {
    const obj: any = {};
    if (message.liquidityNet !== "") {
      obj.liquidityNet = message.liquidityNet;
    }
    if (!message.tickIndex.isZero()) {
      obj.tickIndex = (message.tickIndex || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TickLiquidityNet>, I>>(base?: I): TickLiquidityNet {
    return TickLiquidityNet.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TickLiquidityNet>, I>>(object: I): TickLiquidityNet {
    const message = createBaseTickLiquidityNet();
    message.liquidityNet = object.liquidityNet ?? "";
    message.tickIndex = (object.tickIndex !== undefined && object.tickIndex !== null)
      ? Long.fromValue(object.tickIndex)
      : Long.ZERO;
    return message;
  },
};

function createBaseLiquidityDepthWithRange(): LiquidityDepthWithRange {
  return { liquidityAmount: "", lowerTick: Long.ZERO, upperTick: Long.ZERO };
}

export const LiquidityDepthWithRange = {
  encode(message: LiquidityDepthWithRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.liquidityAmount !== "") {
      writer.uint32(10).string(message.liquidityAmount);
    }
    if (!message.lowerTick.isZero()) {
      writer.uint32(16).int64(message.lowerTick);
    }
    if (!message.upperTick.isZero()) {
      writer.uint32(24).int64(message.upperTick);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LiquidityDepthWithRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidityDepthWithRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidityAmount = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lowerTick = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.upperTick = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LiquidityDepthWithRange {
    return {
      liquidityAmount: isSet(object.liquidityAmount) ? globalThis.String(object.liquidityAmount) : "",
      lowerTick: isSet(object.lowerTick) ? Long.fromValue(object.lowerTick) : Long.ZERO,
      upperTick: isSet(object.upperTick) ? Long.fromValue(object.upperTick) : Long.ZERO,
    };
  },

  toJSON(message: LiquidityDepthWithRange): unknown {
    const obj: any = {};
    if (message.liquidityAmount !== "") {
      obj.liquidityAmount = message.liquidityAmount;
    }
    if (!message.lowerTick.isZero()) {
      obj.lowerTick = (message.lowerTick || Long.ZERO).toString();
    }
    if (!message.upperTick.isZero()) {
      obj.upperTick = (message.upperTick || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LiquidityDepthWithRange>, I>>(base?: I): LiquidityDepthWithRange {
    return LiquidityDepthWithRange.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LiquidityDepthWithRange>, I>>(object: I): LiquidityDepthWithRange {
    const message = createBaseLiquidityDepthWithRange();
    message.liquidityAmount = object.liquidityAmount ?? "";
    message.lowerTick = (object.lowerTick !== undefined && object.lowerTick !== null)
      ? Long.fromValue(object.lowerTick)
      : Long.ZERO;
    message.upperTick = (object.upperTick !== undefined && object.upperTick !== null)
      ? Long.fromValue(object.upperTick)
      : Long.ZERO;
    return message;
  },
};

function createBaseLiquidityNetInDirectionRequest(): LiquidityNetInDirectionRequest {
  return {
    poolId: Long.UZERO,
    tokenIn: "",
    startTick: Long.ZERO,
    useCurTick: false,
    boundTick: Long.ZERO,
    useNoBound: false,
  };
}

export const LiquidityNetInDirectionRequest = {
  encode(message: LiquidityNetInDirectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (!message.startTick.isZero()) {
      writer.uint32(24).int64(message.startTick);
    }
    if (message.useCurTick === true) {
      writer.uint32(32).bool(message.useCurTick);
    }
    if (!message.boundTick.isZero()) {
      writer.uint32(40).int64(message.boundTick);
    }
    if (message.useNoBound === true) {
      writer.uint32(48).bool(message.useNoBound);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LiquidityNetInDirectionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidityNetInDirectionRequest();
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
          if (tag !== 18) {
            break;
          }

          message.tokenIn = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.startTick = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.useCurTick = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.boundTick = reader.int64() as Long;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.useNoBound = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LiquidityNetInDirectionRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tokenIn: isSet(object.tokenIn) ? globalThis.String(object.tokenIn) : "",
      startTick: isSet(object.startTick) ? Long.fromValue(object.startTick) : Long.ZERO,
      useCurTick: isSet(object.useCurTick) ? globalThis.Boolean(object.useCurTick) : false,
      boundTick: isSet(object.boundTick) ? Long.fromValue(object.boundTick) : Long.ZERO,
      useNoBound: isSet(object.useNoBound) ? globalThis.Boolean(object.useNoBound) : false,
    };
  },

  toJSON(message: LiquidityNetInDirectionRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.tokenIn !== "") {
      obj.tokenIn = message.tokenIn;
    }
    if (!message.startTick.isZero()) {
      obj.startTick = (message.startTick || Long.ZERO).toString();
    }
    if (message.useCurTick === true) {
      obj.useCurTick = message.useCurTick;
    }
    if (!message.boundTick.isZero()) {
      obj.boundTick = (message.boundTick || Long.ZERO).toString();
    }
    if (message.useNoBound === true) {
      obj.useNoBound = message.useNoBound;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LiquidityNetInDirectionRequest>, I>>(base?: I): LiquidityNetInDirectionRequest {
    return LiquidityNetInDirectionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LiquidityNetInDirectionRequest>, I>>(
    object: I,
  ): LiquidityNetInDirectionRequest {
    const message = createBaseLiquidityNetInDirectionRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tokenIn = object.tokenIn ?? "";
    message.startTick = (object.startTick !== undefined && object.startTick !== null)
      ? Long.fromValue(object.startTick)
      : Long.ZERO;
    message.useCurTick = object.useCurTick ?? false;
    message.boundTick = (object.boundTick !== undefined && object.boundTick !== null)
      ? Long.fromValue(object.boundTick)
      : Long.ZERO;
    message.useNoBound = object.useNoBound ?? false;
    return message;
  },
};

function createBaseLiquidityNetInDirectionResponse(): LiquidityNetInDirectionResponse {
  return { liquidityDepths: [], currentTick: Long.ZERO, currentLiquidity: "", currentSqrtPrice: "" };
}

export const LiquidityNetInDirectionResponse = {
  encode(message: LiquidityNetInDirectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.liquidityDepths) {
      TickLiquidityNet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (!message.currentTick.isZero()) {
      writer.uint32(16).int64(message.currentTick);
    }
    if (message.currentLiquidity !== "") {
      writer.uint32(26).string(message.currentLiquidity);
    }
    if (message.currentSqrtPrice !== "") {
      writer.uint32(34).string(message.currentSqrtPrice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LiquidityNetInDirectionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidityNetInDirectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidityDepths.push(TickLiquidityNet.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.currentTick = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.currentLiquidity = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.currentSqrtPrice = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LiquidityNetInDirectionResponse {
    return {
      liquidityDepths: globalThis.Array.isArray(object?.liquidityDepths)
        ? object.liquidityDepths.map((e: any) => TickLiquidityNet.fromJSON(e))
        : [],
      currentTick: isSet(object.currentTick) ? Long.fromValue(object.currentTick) : Long.ZERO,
      currentLiquidity: isSet(object.currentLiquidity) ? globalThis.String(object.currentLiquidity) : "",
      currentSqrtPrice: isSet(object.currentSqrtPrice) ? globalThis.String(object.currentSqrtPrice) : "",
    };
  },

  toJSON(message: LiquidityNetInDirectionResponse): unknown {
    const obj: any = {};
    if (message.liquidityDepths?.length) {
      obj.liquidityDepths = message.liquidityDepths.map((e) => TickLiquidityNet.toJSON(e));
    }
    if (!message.currentTick.isZero()) {
      obj.currentTick = (message.currentTick || Long.ZERO).toString();
    }
    if (message.currentLiquidity !== "") {
      obj.currentLiquidity = message.currentLiquidity;
    }
    if (message.currentSqrtPrice !== "") {
      obj.currentSqrtPrice = message.currentSqrtPrice;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LiquidityNetInDirectionResponse>, I>>(base?: I): LiquidityNetInDirectionResponse {
    return LiquidityNetInDirectionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LiquidityNetInDirectionResponse>, I>>(
    object: I,
  ): LiquidityNetInDirectionResponse {
    const message = createBaseLiquidityNetInDirectionResponse();
    message.liquidityDepths = object.liquidityDepths?.map((e) => TickLiquidityNet.fromPartial(e)) || [];
    message.currentTick = (object.currentTick !== undefined && object.currentTick !== null)
      ? Long.fromValue(object.currentTick)
      : Long.ZERO;
    message.currentLiquidity = object.currentLiquidity ?? "";
    message.currentSqrtPrice = object.currentSqrtPrice ?? "";
    return message;
  },
};

function createBaseLiquidityPerTickRangeRequest(): LiquidityPerTickRangeRequest {
  return { poolId: Long.UZERO };
}

export const LiquidityPerTickRangeRequest = {
  encode(message: LiquidityPerTickRangeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LiquidityPerTickRangeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidityPerTickRangeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LiquidityPerTickRangeRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: LiquidityPerTickRangeRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LiquidityPerTickRangeRequest>, I>>(base?: I): LiquidityPerTickRangeRequest {
    return LiquidityPerTickRangeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LiquidityPerTickRangeRequest>, I>>(object: I): LiquidityPerTickRangeRequest {
    const message = createBaseLiquidityPerTickRangeRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseLiquidityPerTickRangeResponse(): LiquidityPerTickRangeResponse {
  return { liquidity: [], bucketIndex: Long.ZERO };
}

export const LiquidityPerTickRangeResponse = {
  encode(message: LiquidityPerTickRangeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.liquidity) {
      LiquidityDepthWithRange.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (!message.bucketIndex.isZero()) {
      writer.uint32(16).int64(message.bucketIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LiquidityPerTickRangeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidityPerTickRangeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidity.push(LiquidityDepthWithRange.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.bucketIndex = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LiquidityPerTickRangeResponse {
    return {
      liquidity: globalThis.Array.isArray(object?.liquidity)
        ? object.liquidity.map((e: any) => LiquidityDepthWithRange.fromJSON(e))
        : [],
      bucketIndex: isSet(object.bucketIndex) ? Long.fromValue(object.bucketIndex) : Long.ZERO,
    };
  },

  toJSON(message: LiquidityPerTickRangeResponse): unknown {
    const obj: any = {};
    if (message.liquidity?.length) {
      obj.liquidity = message.liquidity.map((e) => LiquidityDepthWithRange.toJSON(e));
    }
    if (!message.bucketIndex.isZero()) {
      obj.bucketIndex = (message.bucketIndex || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LiquidityPerTickRangeResponse>, I>>(base?: I): LiquidityPerTickRangeResponse {
    return LiquidityPerTickRangeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LiquidityPerTickRangeResponse>, I>>(
    object: I,
  ): LiquidityPerTickRangeResponse {
    const message = createBaseLiquidityPerTickRangeResponse();
    message.liquidity = object.liquidity?.map((e) => LiquidityDepthWithRange.fromPartial(e)) || [];
    message.bucketIndex = (object.bucketIndex !== undefined && object.bucketIndex !== null)
      ? Long.fromValue(object.bucketIndex)
      : Long.ZERO;
    return message;
  },
};

function createBaseClaimableSpreadRewardsRequest(): ClaimableSpreadRewardsRequest {
  return { positionId: Long.UZERO };
}

export const ClaimableSpreadRewardsRequest = {
  encode(message: ClaimableSpreadRewardsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimableSpreadRewardsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimableSpreadRewardsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.positionId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClaimableSpreadRewardsRequest {
    return { positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO };
  },

  toJSON(message: ClaimableSpreadRewardsRequest): unknown {
    const obj: any = {};
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClaimableSpreadRewardsRequest>, I>>(base?: I): ClaimableSpreadRewardsRequest {
    return ClaimableSpreadRewardsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClaimableSpreadRewardsRequest>, I>>(
    object: I,
  ): ClaimableSpreadRewardsRequest {
    const message = createBaseClaimableSpreadRewardsRequest();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    return message;
  },
};

function createBaseClaimableSpreadRewardsResponse(): ClaimableSpreadRewardsResponse {
  return { claimableSpreadRewards: [] };
}

export const ClaimableSpreadRewardsResponse = {
  encode(message: ClaimableSpreadRewardsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.claimableSpreadRewards) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimableSpreadRewardsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimableSpreadRewardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.claimableSpreadRewards.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClaimableSpreadRewardsResponse {
    return {
      claimableSpreadRewards: globalThis.Array.isArray(object?.claimableSpreadRewards)
        ? object.claimableSpreadRewards.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ClaimableSpreadRewardsResponse): unknown {
    const obj: any = {};
    if (message.claimableSpreadRewards?.length) {
      obj.claimableSpreadRewards = message.claimableSpreadRewards.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClaimableSpreadRewardsResponse>, I>>(base?: I): ClaimableSpreadRewardsResponse {
    return ClaimableSpreadRewardsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClaimableSpreadRewardsResponse>, I>>(
    object: I,
  ): ClaimableSpreadRewardsResponse {
    const message = createBaseClaimableSpreadRewardsResponse();
    message.claimableSpreadRewards = object.claimableSpreadRewards?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseClaimableIncentivesRequest(): ClaimableIncentivesRequest {
  return { positionId: Long.UZERO };
}

export const ClaimableIncentivesRequest = {
  encode(message: ClaimableIncentivesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimableIncentivesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimableIncentivesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.positionId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClaimableIncentivesRequest {
    return { positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO };
  },

  toJSON(message: ClaimableIncentivesRequest): unknown {
    const obj: any = {};
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClaimableIncentivesRequest>, I>>(base?: I): ClaimableIncentivesRequest {
    return ClaimableIncentivesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClaimableIncentivesRequest>, I>>(object: I): ClaimableIncentivesRequest {
    const message = createBaseClaimableIncentivesRequest();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    return message;
  },
};

function createBaseClaimableIncentivesResponse(): ClaimableIncentivesResponse {
  return { claimableIncentives: [], forfeitedIncentives: [] };
}

export const ClaimableIncentivesResponse = {
  encode(message: ClaimableIncentivesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.claimableIncentives) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.forfeitedIncentives) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClaimableIncentivesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimableIncentivesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.claimableIncentives.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): ClaimableIncentivesResponse {
    return {
      claimableIncentives: globalThis.Array.isArray(object?.claimableIncentives)
        ? object.claimableIncentives.map((e: any) => Coin.fromJSON(e))
        : [],
      forfeitedIncentives: globalThis.Array.isArray(object?.forfeitedIncentives)
        ? object.forfeitedIncentives.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ClaimableIncentivesResponse): unknown {
    const obj: any = {};
    if (message.claimableIncentives?.length) {
      obj.claimableIncentives = message.claimableIncentives.map((e) => Coin.toJSON(e));
    }
    if (message.forfeitedIncentives?.length) {
      obj.forfeitedIncentives = message.forfeitedIncentives.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClaimableIncentivesResponse>, I>>(base?: I): ClaimableIncentivesResponse {
    return ClaimableIncentivesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClaimableIncentivesResponse>, I>>(object: I): ClaimableIncentivesResponse {
    const message = createBaseClaimableIncentivesResponse();
    message.claimableIncentives = object.claimableIncentives?.map((e) => Coin.fromPartial(e)) || [];
    message.forfeitedIncentives = object.forfeitedIncentives?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBasePoolAccumulatorRewardsRequest(): PoolAccumulatorRewardsRequest {
  return { poolId: Long.UZERO };
}

export const PoolAccumulatorRewardsRequest = {
  encode(message: PoolAccumulatorRewardsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolAccumulatorRewardsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolAccumulatorRewardsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolAccumulatorRewardsRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: PoolAccumulatorRewardsRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolAccumulatorRewardsRequest>, I>>(base?: I): PoolAccumulatorRewardsRequest {
    return PoolAccumulatorRewardsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolAccumulatorRewardsRequest>, I>>(
    object: I,
  ): PoolAccumulatorRewardsRequest {
    const message = createBasePoolAccumulatorRewardsRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBasePoolAccumulatorRewardsResponse(): PoolAccumulatorRewardsResponse {
  return { spreadRewardGrowthGlobal: [], uptimeGrowthGlobal: [] };
}

export const PoolAccumulatorRewardsResponse = {
  encode(message: PoolAccumulatorRewardsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.spreadRewardGrowthGlobal) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.uptimeGrowthGlobal) {
      UptimeTracker.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolAccumulatorRewardsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolAccumulatorRewardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.spreadRewardGrowthGlobal.push(DecCoin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.uptimeGrowthGlobal.push(UptimeTracker.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolAccumulatorRewardsResponse {
    return {
      spreadRewardGrowthGlobal: globalThis.Array.isArray(object?.spreadRewardGrowthGlobal)
        ? object.spreadRewardGrowthGlobal.map((e: any) => DecCoin.fromJSON(e))
        : [],
      uptimeGrowthGlobal: globalThis.Array.isArray(object?.uptimeGrowthGlobal)
        ? object.uptimeGrowthGlobal.map((e: any) => UptimeTracker.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PoolAccumulatorRewardsResponse): unknown {
    const obj: any = {};
    if (message.spreadRewardGrowthGlobal?.length) {
      obj.spreadRewardGrowthGlobal = message.spreadRewardGrowthGlobal.map((e) => DecCoin.toJSON(e));
    }
    if (message.uptimeGrowthGlobal?.length) {
      obj.uptimeGrowthGlobal = message.uptimeGrowthGlobal.map((e) => UptimeTracker.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolAccumulatorRewardsResponse>, I>>(base?: I): PoolAccumulatorRewardsResponse {
    return PoolAccumulatorRewardsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolAccumulatorRewardsResponse>, I>>(
    object: I,
  ): PoolAccumulatorRewardsResponse {
    const message = createBasePoolAccumulatorRewardsResponse();
    message.spreadRewardGrowthGlobal = object.spreadRewardGrowthGlobal?.map((e) => DecCoin.fromPartial(e)) || [];
    message.uptimeGrowthGlobal = object.uptimeGrowthGlobal?.map((e) => UptimeTracker.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTickAccumulatorTrackersRequest(): TickAccumulatorTrackersRequest {
  return { poolId: Long.UZERO, tickIndex: Long.ZERO };
}

export const TickAccumulatorTrackersRequest = {
  encode(message: TickAccumulatorTrackersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (!message.tickIndex.isZero()) {
      writer.uint32(16).int64(message.tickIndex);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TickAccumulatorTrackersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTickAccumulatorTrackersRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TickAccumulatorTrackersRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tickIndex: isSet(object.tickIndex) ? Long.fromValue(object.tickIndex) : Long.ZERO,
    };
  },

  toJSON(message: TickAccumulatorTrackersRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (!message.tickIndex.isZero()) {
      obj.tickIndex = (message.tickIndex || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TickAccumulatorTrackersRequest>, I>>(base?: I): TickAccumulatorTrackersRequest {
    return TickAccumulatorTrackersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TickAccumulatorTrackersRequest>, I>>(
    object: I,
  ): TickAccumulatorTrackersRequest {
    const message = createBaseTickAccumulatorTrackersRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tickIndex = (object.tickIndex !== undefined && object.tickIndex !== null)
      ? Long.fromValue(object.tickIndex)
      : Long.ZERO;
    return message;
  },
};

function createBaseTickAccumulatorTrackersResponse(): TickAccumulatorTrackersResponse {
  return { spreadRewardGrowthOppositeDirectionOfLastTraversal: [], uptimeTrackers: [] };
}

export const TickAccumulatorTrackersResponse = {
  encode(message: TickAccumulatorTrackersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.spreadRewardGrowthOppositeDirectionOfLastTraversal) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.uptimeTrackers) {
      UptimeTracker.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TickAccumulatorTrackersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTickAccumulatorTrackersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.spreadRewardGrowthOppositeDirectionOfLastTraversal.push(DecCoin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.uptimeTrackers.push(UptimeTracker.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TickAccumulatorTrackersResponse {
    return {
      spreadRewardGrowthOppositeDirectionOfLastTraversal:
        globalThis.Array.isArray(object?.spreadRewardGrowthOppositeDirectionOfLastTraversal)
          ? object.spreadRewardGrowthOppositeDirectionOfLastTraversal.map((e: any) => DecCoin.fromJSON(e))
          : [],
      uptimeTrackers: globalThis.Array.isArray(object?.uptimeTrackers)
        ? object.uptimeTrackers.map((e: any) => UptimeTracker.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TickAccumulatorTrackersResponse): unknown {
    const obj: any = {};
    if (message.spreadRewardGrowthOppositeDirectionOfLastTraversal?.length) {
      obj.spreadRewardGrowthOppositeDirectionOfLastTraversal = message
        .spreadRewardGrowthOppositeDirectionOfLastTraversal.map((e) => DecCoin.toJSON(e));
    }
    if (message.uptimeTrackers?.length) {
      obj.uptimeTrackers = message.uptimeTrackers.map((e) => UptimeTracker.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TickAccumulatorTrackersResponse>, I>>(base?: I): TickAccumulatorTrackersResponse {
    return TickAccumulatorTrackersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TickAccumulatorTrackersResponse>, I>>(
    object: I,
  ): TickAccumulatorTrackersResponse {
    const message = createBaseTickAccumulatorTrackersResponse();
    message.spreadRewardGrowthOppositeDirectionOfLastTraversal =
      object.spreadRewardGrowthOppositeDirectionOfLastTraversal?.map((e) => DecCoin.fromPartial(e)) || [];
    message.uptimeTrackers = object.uptimeTrackers?.map((e) => UptimeTracker.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIncentiveRecordsRequest(): IncentiveRecordsRequest {
  return { poolId: Long.UZERO, pagination: undefined };
}

export const IncentiveRecordsRequest = {
  encode(message: IncentiveRecordsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IncentiveRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentiveRecordsRequest();
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
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IncentiveRecordsRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: IncentiveRecordsRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IncentiveRecordsRequest>, I>>(base?: I): IncentiveRecordsRequest {
    return IncentiveRecordsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IncentiveRecordsRequest>, I>>(object: I): IncentiveRecordsRequest {
    const message = createBaseIncentiveRecordsRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseIncentiveRecordsResponse(): IncentiveRecordsResponse {
  return { incentiveRecords: [], pagination: undefined };
}

export const IncentiveRecordsResponse = {
  encode(message: IncentiveRecordsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.incentiveRecords) {
      IncentiveRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IncentiveRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentiveRecordsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.incentiveRecords.push(IncentiveRecord.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IncentiveRecordsResponse {
    return {
      incentiveRecords: globalThis.Array.isArray(object?.incentiveRecords)
        ? object.incentiveRecords.map((e: any) => IncentiveRecord.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: IncentiveRecordsResponse): unknown {
    const obj: any = {};
    if (message.incentiveRecords?.length) {
      obj.incentiveRecords = message.incentiveRecords.map((e) => IncentiveRecord.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IncentiveRecordsResponse>, I>>(base?: I): IncentiveRecordsResponse {
    return IncentiveRecordsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IncentiveRecordsResponse>, I>>(object: I): IncentiveRecordsResponse {
    const message = createBaseIncentiveRecordsResponse();
    message.incentiveRecords = object.incentiveRecords?.map((e) => IncentiveRecord.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseCFMMPoolIdLinkFromConcentratedPoolIdRequest(): CFMMPoolIdLinkFromConcentratedPoolIdRequest {
  return { concentratedPoolId: Long.UZERO };
}

export const CFMMPoolIdLinkFromConcentratedPoolIdRequest = {
  encode(message: CFMMPoolIdLinkFromConcentratedPoolIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.concentratedPoolId.isZero()) {
      writer.uint32(8).uint64(message.concentratedPoolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CFMMPoolIdLinkFromConcentratedPoolIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCFMMPoolIdLinkFromConcentratedPoolIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.concentratedPoolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CFMMPoolIdLinkFromConcentratedPoolIdRequest {
    return {
      concentratedPoolId: isSet(object.concentratedPoolId) ? Long.fromValue(object.concentratedPoolId) : Long.UZERO,
    };
  },

  toJSON(message: CFMMPoolIdLinkFromConcentratedPoolIdRequest): unknown {
    const obj: any = {};
    if (!message.concentratedPoolId.isZero()) {
      obj.concentratedPoolId = (message.concentratedPoolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CFMMPoolIdLinkFromConcentratedPoolIdRequest>, I>>(
    base?: I,
  ): CFMMPoolIdLinkFromConcentratedPoolIdRequest {
    return CFMMPoolIdLinkFromConcentratedPoolIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CFMMPoolIdLinkFromConcentratedPoolIdRequest>, I>>(
    object: I,
  ): CFMMPoolIdLinkFromConcentratedPoolIdRequest {
    const message = createBaseCFMMPoolIdLinkFromConcentratedPoolIdRequest();
    message.concentratedPoolId = (object.concentratedPoolId !== undefined && object.concentratedPoolId !== null)
      ? Long.fromValue(object.concentratedPoolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseCFMMPoolIdLinkFromConcentratedPoolIdResponse(): CFMMPoolIdLinkFromConcentratedPoolIdResponse {
  return { cfmmPoolId: Long.UZERO };
}

export const CFMMPoolIdLinkFromConcentratedPoolIdResponse = {
  encode(message: CFMMPoolIdLinkFromConcentratedPoolIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.cfmmPoolId.isZero()) {
      writer.uint32(8).uint64(message.cfmmPoolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CFMMPoolIdLinkFromConcentratedPoolIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCFMMPoolIdLinkFromConcentratedPoolIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.cfmmPoolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CFMMPoolIdLinkFromConcentratedPoolIdResponse {
    return { cfmmPoolId: isSet(object.cfmmPoolId) ? Long.fromValue(object.cfmmPoolId) : Long.UZERO };
  },

  toJSON(message: CFMMPoolIdLinkFromConcentratedPoolIdResponse): unknown {
    const obj: any = {};
    if (!message.cfmmPoolId.isZero()) {
      obj.cfmmPoolId = (message.cfmmPoolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CFMMPoolIdLinkFromConcentratedPoolIdResponse>, I>>(
    base?: I,
  ): CFMMPoolIdLinkFromConcentratedPoolIdResponse {
    return CFMMPoolIdLinkFromConcentratedPoolIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CFMMPoolIdLinkFromConcentratedPoolIdResponse>, I>>(
    object: I,
  ): CFMMPoolIdLinkFromConcentratedPoolIdResponse {
    const message = createBaseCFMMPoolIdLinkFromConcentratedPoolIdResponse();
    message.cfmmPoolId = (object.cfmmPoolId !== undefined && object.cfmmPoolId !== null)
      ? Long.fromValue(object.cfmmPoolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseUserUnbondingPositionsRequest(): UserUnbondingPositionsRequest {
  return { address: "" };
}

export const UserUnbondingPositionsRequest = {
  encode(message: UserUnbondingPositionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserUnbondingPositionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserUnbondingPositionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserUnbondingPositionsRequest {
    return { address: isSet(object.address) ? globalThis.String(object.address) : "" };
  },

  toJSON(message: UserUnbondingPositionsRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserUnbondingPositionsRequest>, I>>(base?: I): UserUnbondingPositionsRequest {
    return UserUnbondingPositionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserUnbondingPositionsRequest>, I>>(
    object: I,
  ): UserUnbondingPositionsRequest {
    const message = createBaseUserUnbondingPositionsRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseUserUnbondingPositionsResponse(): UserUnbondingPositionsResponse {
  return { positionsWithPeriodLock: [] };
}

export const UserUnbondingPositionsResponse = {
  encode(message: UserUnbondingPositionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.positionsWithPeriodLock) {
      PositionWithPeriodLock.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserUnbondingPositionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserUnbondingPositionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.positionsWithPeriodLock.push(PositionWithPeriodLock.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserUnbondingPositionsResponse {
    return {
      positionsWithPeriodLock: globalThis.Array.isArray(object?.positionsWithPeriodLock)
        ? object.positionsWithPeriodLock.map((e: any) => PositionWithPeriodLock.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UserUnbondingPositionsResponse): unknown {
    const obj: any = {};
    if (message.positionsWithPeriodLock?.length) {
      obj.positionsWithPeriodLock = message.positionsWithPeriodLock.map((e) => PositionWithPeriodLock.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserUnbondingPositionsResponse>, I>>(base?: I): UserUnbondingPositionsResponse {
    return UserUnbondingPositionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserUnbondingPositionsResponse>, I>>(
    object: I,
  ): UserUnbondingPositionsResponse {
    const message = createBaseUserUnbondingPositionsResponse();
    message.positionsWithPeriodLock =
      object.positionsWithPeriodLock?.map((e) => PositionWithPeriodLock.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetTotalLiquidityRequest(): GetTotalLiquidityRequest {
  return {};
}

export const GetTotalLiquidityRequest = {
  encode(_: GetTotalLiquidityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTotalLiquidityRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTotalLiquidityRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): GetTotalLiquidityRequest {
    return {};
  },

  toJSON(_: GetTotalLiquidityRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetTotalLiquidityRequest>, I>>(base?: I): GetTotalLiquidityRequest {
    return GetTotalLiquidityRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetTotalLiquidityRequest>, I>>(_: I): GetTotalLiquidityRequest {
    const message = createBaseGetTotalLiquidityRequest();
    return message;
  },
};

function createBaseGetTotalLiquidityResponse(): GetTotalLiquidityResponse {
  return { totalLiquidity: [] };
}

export const GetTotalLiquidityResponse = {
  encode(message: GetTotalLiquidityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.totalLiquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTotalLiquidityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTotalLiquidityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.totalLiquidity.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetTotalLiquidityResponse {
    return {
      totalLiquidity: globalThis.Array.isArray(object?.totalLiquidity)
        ? object.totalLiquidity.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetTotalLiquidityResponse): unknown {
    const obj: any = {};
    if (message.totalLiquidity?.length) {
      obj.totalLiquidity = message.totalLiquidity.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetTotalLiquidityResponse>, I>>(base?: I): GetTotalLiquidityResponse {
    return GetTotalLiquidityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetTotalLiquidityResponse>, I>>(object: I): GetTotalLiquidityResponse {
    const message = createBaseGetTotalLiquidityResponse();
    message.totalLiquidity = object.totalLiquidity?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNumNextInitializedTicksRequest(): NumNextInitializedTicksRequest {
  return { poolId: Long.UZERO, tokenInDenom: "", numNextInitializedTicks: Long.UZERO };
}

export const NumNextInitializedTicksRequest = {
  encode(message: NumNextInitializedTicksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(18).string(message.tokenInDenom);
    }
    if (!message.numNextInitializedTicks.isZero()) {
      writer.uint32(24).uint64(message.numNextInitializedTicks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumNextInitializedTicksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumNextInitializedTicksRequest();
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
          if (tag !== 18) {
            break;
          }

          message.tokenInDenom = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.numNextInitializedTicks = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NumNextInitializedTicksRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tokenInDenom: isSet(object.tokenInDenom) ? globalThis.String(object.tokenInDenom) : "",
      numNextInitializedTicks: isSet(object.numNextInitializedTicks)
        ? Long.fromValue(object.numNextInitializedTicks)
        : Long.UZERO,
    };
  },

  toJSON(message: NumNextInitializedTicksRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.tokenInDenom !== "") {
      obj.tokenInDenom = message.tokenInDenom;
    }
    if (!message.numNextInitializedTicks.isZero()) {
      obj.numNextInitializedTicks = (message.numNextInitializedTicks || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NumNextInitializedTicksRequest>, I>>(base?: I): NumNextInitializedTicksRequest {
    return NumNextInitializedTicksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NumNextInitializedTicksRequest>, I>>(
    object: I,
  ): NumNextInitializedTicksRequest {
    const message = createBaseNumNextInitializedTicksRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tokenInDenom = object.tokenInDenom ?? "";
    message.numNextInitializedTicks =
      (object.numNextInitializedTicks !== undefined && object.numNextInitializedTicks !== null)
        ? Long.fromValue(object.numNextInitializedTicks)
        : Long.UZERO;
    return message;
  },
};

function createBaseNumNextInitializedTicksResponse(): NumNextInitializedTicksResponse {
  return { liquidityDepths: [], currentTick: Long.ZERO, currentLiquidity: "" };
}

export const NumNextInitializedTicksResponse = {
  encode(message: NumNextInitializedTicksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.liquidityDepths) {
      TickLiquidityNet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (!message.currentTick.isZero()) {
      writer.uint32(16).int64(message.currentTick);
    }
    if (message.currentLiquidity !== "") {
      writer.uint32(26).string(message.currentLiquidity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumNextInitializedTicksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumNextInitializedTicksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidityDepths.push(TickLiquidityNet.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.currentTick = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.currentLiquidity = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NumNextInitializedTicksResponse {
    return {
      liquidityDepths: globalThis.Array.isArray(object?.liquidityDepths)
        ? object.liquidityDepths.map((e: any) => TickLiquidityNet.fromJSON(e))
        : [],
      currentTick: isSet(object.currentTick) ? Long.fromValue(object.currentTick) : Long.ZERO,
      currentLiquidity: isSet(object.currentLiquidity) ? globalThis.String(object.currentLiquidity) : "",
    };
  },

  toJSON(message: NumNextInitializedTicksResponse): unknown {
    const obj: any = {};
    if (message.liquidityDepths?.length) {
      obj.liquidityDepths = message.liquidityDepths.map((e) => TickLiquidityNet.toJSON(e));
    }
    if (!message.currentTick.isZero()) {
      obj.currentTick = (message.currentTick || Long.ZERO).toString();
    }
    if (message.currentLiquidity !== "") {
      obj.currentLiquidity = message.currentLiquidity;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NumNextInitializedTicksResponse>, I>>(base?: I): NumNextInitializedTicksResponse {
    return NumNextInitializedTicksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NumNextInitializedTicksResponse>, I>>(
    object: I,
  ): NumNextInitializedTicksResponse {
    const message = createBaseNumNextInitializedTicksResponse();
    message.liquidityDepths = object.liquidityDepths?.map((e) => TickLiquidityNet.fromPartial(e)) || [];
    message.currentTick = (object.currentTick !== undefined && object.currentTick !== null)
      ? Long.fromValue(object.currentTick)
      : Long.ZERO;
    message.currentLiquidity = object.currentLiquidity ?? "";
    return message;
  },
};

export interface Query {
  /** Pools returns all concentrated liquidity pools */
  Pools(request: PoolsRequest): Promise<PoolsResponse>;
  /** Params returns concentrated liquidity module params. */
  Params(request: ParamsRequest): Promise<ParamsResponse>;
  /** UserPositions returns all concentrated positions of some address. */
  UserPositions(request: UserPositionsRequest): Promise<UserPositionsResponse>;
  /**
   * LiquidityPerTickRange returns the amount of liquidity per every tick range
   * existing within the given pool
   */
  LiquidityPerTickRange(request: LiquidityPerTickRangeRequest): Promise<LiquidityPerTickRangeResponse>;
  /**
   * LiquidityNetInDirection returns liquidity net in the direction given.
   * Uses the bound if specified, if not uses either min tick / max tick
   * depending on the direction.
   */
  LiquidityNetInDirection(request: LiquidityNetInDirectionRequest): Promise<LiquidityNetInDirectionResponse>;
  /**
   * ClaimableSpreadRewards returns the amount of spread rewards that can be
   * claimed by a position with the given id.
   */
  ClaimableSpreadRewards(request: ClaimableSpreadRewardsRequest): Promise<ClaimableSpreadRewardsResponse>;
  /**
   * ClaimableIncentives returns the amount of incentives that can be claimed
   * and how many would be forfeited by a position with the given id.
   */
  ClaimableIncentives(request: ClaimableIncentivesRequest): Promise<ClaimableIncentivesResponse>;
  /** PositionById returns a position with the given id. */
  PositionById(request: PositionByIdRequest): Promise<PositionByIdResponse>;
  /**
   * PoolAccumulatorRewards returns the pool-global accumulator rewards.
   * Contains spread factor rewards and uptime rewards.
   */
  PoolAccumulatorRewards(request: PoolAccumulatorRewardsRequest): Promise<PoolAccumulatorRewardsResponse>;
  /** IncentiveRecords returns the incentive records for a given poolId */
  IncentiveRecords(request: IncentiveRecordsRequest): Promise<IncentiveRecordsResponse>;
  /**
   * TickAccumulatorTrackers returns the tick accumulator trackers.
   * Contains spread factor and uptime accumulator trackers.
   */
  TickAccumulatorTrackers(request: TickAccumulatorTrackersRequest): Promise<TickAccumulatorTrackersResponse>;
  /**
   * CFMMPoolIdLinkFromConcentratedPoolId returns the pool id of the CFMM
   * pool that is linked with the given concentrated pool.
   */
  CFMMPoolIdLinkFromConcentratedPoolId(
    request: CFMMPoolIdLinkFromConcentratedPoolIdRequest,
  ): Promise<CFMMPoolIdLinkFromConcentratedPoolIdResponse>;
  /**
   * UserUnbondingPositions returns the position and lock info of unbonding
   * positions of the given address.
   */
  UserUnbondingPositions(request: UserUnbondingPositionsRequest): Promise<UserUnbondingPositionsResponse>;
  /** GetTotalLiquidity returns total liquidity across all cl pools. */
  GetTotalLiquidity(request: GetTotalLiquidityRequest): Promise<GetTotalLiquidityResponse>;
  /**
   * NumNextInitializedTicks returns the provided number of next initialized
   * ticks in the direction of swapping the token in denom.
   */
  NumNextInitializedTicks(request: NumNextInitializedTicksRequest): Promise<NumNextInitializedTicksResponse>;
}

export const QueryServiceName = "osmosis.concentratedliquidity.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Pools = this.Pools.bind(this);
    this.Params = this.Params.bind(this);
    this.UserPositions = this.UserPositions.bind(this);
    this.LiquidityPerTickRange = this.LiquidityPerTickRange.bind(this);
    this.LiquidityNetInDirection = this.LiquidityNetInDirection.bind(this);
    this.ClaimableSpreadRewards = this.ClaimableSpreadRewards.bind(this);
    this.ClaimableIncentives = this.ClaimableIncentives.bind(this);
    this.PositionById = this.PositionById.bind(this);
    this.PoolAccumulatorRewards = this.PoolAccumulatorRewards.bind(this);
    this.IncentiveRecords = this.IncentiveRecords.bind(this);
    this.TickAccumulatorTrackers = this.TickAccumulatorTrackers.bind(this);
    this.CFMMPoolIdLinkFromConcentratedPoolId = this.CFMMPoolIdLinkFromConcentratedPoolId.bind(this);
    this.UserUnbondingPositions = this.UserUnbondingPositions.bind(this);
    this.GetTotalLiquidity = this.GetTotalLiquidity.bind(this);
    this.NumNextInitializedTicks = this.NumNextInitializedTicks.bind(this);
  }
  Pools(request: PoolsRequest): Promise<PoolsResponse> {
    const data = PoolsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Pools", data);
    return promise.then((data) => PoolsResponse.decode(_m0.Reader.create(data)));
  }

  Params(request: ParamsRequest): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => ParamsResponse.decode(_m0.Reader.create(data)));
  }

  UserPositions(request: UserPositionsRequest): Promise<UserPositionsResponse> {
    const data = UserPositionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UserPositions", data);
    return promise.then((data) => UserPositionsResponse.decode(_m0.Reader.create(data)));
  }

  LiquidityPerTickRange(request: LiquidityPerTickRangeRequest): Promise<LiquidityPerTickRangeResponse> {
    const data = LiquidityPerTickRangeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "LiquidityPerTickRange", data);
    return promise.then((data) => LiquidityPerTickRangeResponse.decode(_m0.Reader.create(data)));
  }

  LiquidityNetInDirection(request: LiquidityNetInDirectionRequest): Promise<LiquidityNetInDirectionResponse> {
    const data = LiquidityNetInDirectionRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "LiquidityNetInDirection", data);
    return promise.then((data) => LiquidityNetInDirectionResponse.decode(_m0.Reader.create(data)));
  }

  ClaimableSpreadRewards(request: ClaimableSpreadRewardsRequest): Promise<ClaimableSpreadRewardsResponse> {
    const data = ClaimableSpreadRewardsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClaimableSpreadRewards", data);
    return promise.then((data) => ClaimableSpreadRewardsResponse.decode(_m0.Reader.create(data)));
  }

  ClaimableIncentives(request: ClaimableIncentivesRequest): Promise<ClaimableIncentivesResponse> {
    const data = ClaimableIncentivesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClaimableIncentives", data);
    return promise.then((data) => ClaimableIncentivesResponse.decode(_m0.Reader.create(data)));
  }

  PositionById(request: PositionByIdRequest): Promise<PositionByIdResponse> {
    const data = PositionByIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PositionById", data);
    return promise.then((data) => PositionByIdResponse.decode(_m0.Reader.create(data)));
  }

  PoolAccumulatorRewards(request: PoolAccumulatorRewardsRequest): Promise<PoolAccumulatorRewardsResponse> {
    const data = PoolAccumulatorRewardsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PoolAccumulatorRewards", data);
    return promise.then((data) => PoolAccumulatorRewardsResponse.decode(_m0.Reader.create(data)));
  }

  IncentiveRecords(request: IncentiveRecordsRequest): Promise<IncentiveRecordsResponse> {
    const data = IncentiveRecordsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "IncentiveRecords", data);
    return promise.then((data) => IncentiveRecordsResponse.decode(_m0.Reader.create(data)));
  }

  TickAccumulatorTrackers(request: TickAccumulatorTrackersRequest): Promise<TickAccumulatorTrackersResponse> {
    const data = TickAccumulatorTrackersRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TickAccumulatorTrackers", data);
    return promise.then((data) => TickAccumulatorTrackersResponse.decode(_m0.Reader.create(data)));
  }

  CFMMPoolIdLinkFromConcentratedPoolId(
    request: CFMMPoolIdLinkFromConcentratedPoolIdRequest,
  ): Promise<CFMMPoolIdLinkFromConcentratedPoolIdResponse> {
    const data = CFMMPoolIdLinkFromConcentratedPoolIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CFMMPoolIdLinkFromConcentratedPoolId", data);
    return promise.then((data) => CFMMPoolIdLinkFromConcentratedPoolIdResponse.decode(_m0.Reader.create(data)));
  }

  UserUnbondingPositions(request: UserUnbondingPositionsRequest): Promise<UserUnbondingPositionsResponse> {
    const data = UserUnbondingPositionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UserUnbondingPositions", data);
    return promise.then((data) => UserUnbondingPositionsResponse.decode(_m0.Reader.create(data)));
  }

  GetTotalLiquidity(request: GetTotalLiquidityRequest): Promise<GetTotalLiquidityResponse> {
    const data = GetTotalLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetTotalLiquidity", data);
    return promise.then((data) => GetTotalLiquidityResponse.decode(_m0.Reader.create(data)));
  }

  NumNextInitializedTicks(request: NumNextInitializedTicksRequest): Promise<NumNextInitializedTicksResponse> {
    const data = NumNextInitializedTicksRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NumNextInitializedTicks", data);
    return promise.then((data) => NumNextInitializedTicksResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
