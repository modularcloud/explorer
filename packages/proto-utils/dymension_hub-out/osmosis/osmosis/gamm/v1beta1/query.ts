/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Any } from "../../../google/protobuf/any";
import { SwapAmountInRoute, SwapAmountOutRoute } from "../../poolmanager/v1beta1/swap_route";
import { MigrationRecords } from "./shared";

export const protobufPackage = "osmosis.gamm.v1beta1";

/**
 * =============================== Pool
 * Deprecated: please use the alternative in x/poolmanager
 *
 * @deprecated
 */
export interface QueryPoolRequest {
  poolId: Long;
}

/**
 * Deprecated: please use the alternative in x/poolmanager
 *
 * @deprecated
 */
export interface QueryPoolResponse {
  pool: Any | undefined;
}

/** =============================== Pools */
export interface QueryPoolsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

export interface QueryPoolsResponse {
  pools: Any[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * =============================== NumPools
 *
 * @deprecated
 */
export interface QueryNumPoolsRequest {
}

/** @deprecated */
export interface QueryNumPoolsResponse {
  numPools: Long;
}

/** =============================== PoolType */
export interface QueryPoolTypeRequest {
  poolId: Long;
}

export interface QueryPoolTypeResponse {
  poolType: string;
}

/** =============================== CalcJoinPoolShares */
export interface QueryCalcJoinPoolSharesRequest {
  poolId: Long;
  tokensIn: Coin[];
}

export interface QueryCalcJoinPoolSharesResponse {
  shareOutAmount: string;
  tokensOut: Coin[];
}

/** =============================== CalcExitPoolCoinsFromShares */
export interface QueryCalcExitPoolCoinsFromSharesRequest {
  poolId: Long;
  shareInAmount: string;
}

export interface QueryCalcExitPoolCoinsFromSharesResponse {
  tokensOut: Coin[];
}

/** =============================== PoolParams */
export interface QueryPoolParamsRequest {
  poolId: Long;
}

export interface QueryPoolParamsResponse {
  params: Any | undefined;
}

/**
 * =============================== PoolLiquidity
 * Deprecated: please use the alternative in x/poolmanager
 *
 * @deprecated
 */
export interface QueryTotalPoolLiquidityRequest {
  poolId: Long;
}

/**
 * Deprecated: please use the alternative in x/poolmanager
 *
 * @deprecated
 */
export interface QueryTotalPoolLiquidityResponse {
  liquidity: Coin[];
}

/** =============================== TotalShares */
export interface QueryTotalSharesRequest {
  poolId: Long;
}

export interface QueryTotalSharesResponse {
  totalShares: Coin | undefined;
}

/** =============================== CalcJoinPoolNoSwapShares */
export interface QueryCalcJoinPoolNoSwapSharesRequest {
  poolId: Long;
  tokensIn: Coin[];
}

export interface QueryCalcJoinPoolNoSwapSharesResponse {
  tokensOut: Coin[];
  sharesOut: string;
}

/**
 * QuerySpotPriceRequest defines the gRPC request structure for a SpotPrice
 * query.
 *
 * @deprecated
 */
export interface QuerySpotPriceRequest {
  poolId: Long;
  baseAssetDenom: string;
  quoteAssetDenom: string;
}

export interface QueryPoolsWithFilterRequest {
  /**
   * String of the coins in single string separated by comma. Ex)
   * 10uatom,100uosmo
   */
  minLiquidity: string;
  poolType: string;
  pagination: PageRequest | undefined;
}

export interface QueryPoolsWithFilterResponse {
  pools: Any[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QuerySpotPriceResponse defines the gRPC response structure for a SpotPrice
 * query.
 *
 * @deprecated
 */
export interface QuerySpotPriceResponse {
  /** String of the Dec. Ex) 10.203uatom */
  spotPrice: string;
}

/**
 * =============================== EstimateSwapExactAmountIn
 *
 * @deprecated
 */
export interface QuerySwapExactAmountInRequest {
  sender: string;
  poolId: Long;
  tokenIn: string;
  routes: SwapAmountInRoute[];
}

/** @deprecated */
export interface QuerySwapExactAmountInResponse {
  tokenOutAmount: string;
}

/**
 * =============================== EstimateSwapExactAmountOut
 *
 * @deprecated
 */
export interface QuerySwapExactAmountOutRequest {
  sender: string;
  poolId: Long;
  routes: SwapAmountOutRoute[];
  tokenOut: string;
}

/** @deprecated */
export interface QuerySwapExactAmountOutResponse {
  tokenInAmount: string;
}

export interface QueryTotalLiquidityRequest {
}

export interface QueryTotalLiquidityResponse {
  liquidity: Coin[];
}

/** =============================== QueryConcentratedPoolIdLinkFromCFMM */
export interface QueryConcentratedPoolIdLinkFromCFMMRequest {
  cfmmPoolId: Long;
}

export interface QueryConcentratedPoolIdLinkFromCFMMResponse {
  concentratedPoolId: Long;
}

/** =============================== QueryCFMMConcentratedPoolLinks */
export interface QueryCFMMConcentratedPoolLinksRequest {
}

export interface QueryCFMMConcentratedPoolLinksResponse {
  migrationRecords: MigrationRecords | undefined;
}

function createBaseQueryPoolRequest(): QueryPoolRequest {
  return { poolId: Long.UZERO };
}

export const QueryPoolRequest = {
  encode(message: QueryPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolRequest();
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

  fromJSON(object: any): QueryPoolRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: QueryPoolRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolRequest>, I>>(base?: I): QueryPoolRequest {
    return QueryPoolRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolRequest>, I>>(object: I): QueryPoolRequest {
    const message = createBaseQueryPoolRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryPoolResponse(): QueryPoolResponse {
  return { pool: undefined };
}

export const QueryPoolResponse = {
  encode(message: QueryPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool !== undefined) {
      Any.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPoolResponse {
    return { pool: isSet(object.pool) ? Any.fromJSON(object.pool) : undefined };
  },

  toJSON(message: QueryPoolResponse): unknown {
    const obj: any = {};
    if (message.pool !== undefined) {
      obj.pool = Any.toJSON(message.pool);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolResponse>, I>>(base?: I): QueryPoolResponse {
    return QueryPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolResponse>, I>>(object: I): QueryPoolResponse {
    const message = createBaseQueryPoolResponse();
    message.pool = (object.pool !== undefined && object.pool !== null) ? Any.fromPartial(object.pool) : undefined;
    return message;
  },
};

function createBaseQueryPoolsRequest(): QueryPoolsRequest {
  return { pagination: undefined };
}

export const QueryPoolsRequest = {
  encode(message: QueryPoolsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolsRequest();
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

  fromJSON(object: any): QueryPoolsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryPoolsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolsRequest>, I>>(base?: I): QueryPoolsRequest {
    return QueryPoolsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolsRequest>, I>>(object: I): QueryPoolsRequest {
    const message = createBaseQueryPoolsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryPoolsResponse(): QueryPoolsResponse {
  return { pools: [], pagination: undefined };
}

export const QueryPoolsResponse = {
  encode(message: QueryPoolsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pools) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolsResponse();
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

  fromJSON(object: any): QueryPoolsResponse {
    return {
      pools: globalThis.Array.isArray(object?.pools) ? object.pools.map((e: any) => Any.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryPoolsResponse): unknown {
    const obj: any = {};
    if (message.pools?.length) {
      obj.pools = message.pools.map((e) => Any.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolsResponse>, I>>(base?: I): QueryPoolsResponse {
    return QueryPoolsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolsResponse>, I>>(object: I): QueryPoolsResponse {
    const message = createBaseQueryPoolsResponse();
    message.pools = object.pools?.map((e) => Any.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryNumPoolsRequest(): QueryNumPoolsRequest {
  return {};
}

export const QueryNumPoolsRequest = {
  encode(_: QueryNumPoolsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNumPoolsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNumPoolsRequest();
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

  fromJSON(_: any): QueryNumPoolsRequest {
    return {};
  },

  toJSON(_: QueryNumPoolsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryNumPoolsRequest>, I>>(base?: I): QueryNumPoolsRequest {
    return QueryNumPoolsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryNumPoolsRequest>, I>>(_: I): QueryNumPoolsRequest {
    const message = createBaseQueryNumPoolsRequest();
    return message;
  },
};

function createBaseQueryNumPoolsResponse(): QueryNumPoolsResponse {
  return { numPools: Long.UZERO };
}

export const QueryNumPoolsResponse = {
  encode(message: QueryNumPoolsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.numPools.isZero()) {
      writer.uint32(8).uint64(message.numPools);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNumPoolsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNumPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.numPools = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryNumPoolsResponse {
    return { numPools: isSet(object.numPools) ? Long.fromValue(object.numPools) : Long.UZERO };
  },

  toJSON(message: QueryNumPoolsResponse): unknown {
    const obj: any = {};
    if (!message.numPools.isZero()) {
      obj.numPools = (message.numPools || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryNumPoolsResponse>, I>>(base?: I): QueryNumPoolsResponse {
    return QueryNumPoolsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryNumPoolsResponse>, I>>(object: I): QueryNumPoolsResponse {
    const message = createBaseQueryNumPoolsResponse();
    message.numPools = (object.numPools !== undefined && object.numPools !== null)
      ? Long.fromValue(object.numPools)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryPoolTypeRequest(): QueryPoolTypeRequest {
  return { poolId: Long.UZERO };
}

export const QueryPoolTypeRequest = {
  encode(message: QueryPoolTypeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolTypeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolTypeRequest();
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

  fromJSON(object: any): QueryPoolTypeRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: QueryPoolTypeRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolTypeRequest>, I>>(base?: I): QueryPoolTypeRequest {
    return QueryPoolTypeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolTypeRequest>, I>>(object: I): QueryPoolTypeRequest {
    const message = createBaseQueryPoolTypeRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryPoolTypeResponse(): QueryPoolTypeResponse {
  return { poolType: "" };
}

export const QueryPoolTypeResponse = {
  encode(message: QueryPoolTypeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolType !== "") {
      writer.uint32(10).string(message.poolType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolTypeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolTypeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPoolTypeResponse {
    return { poolType: isSet(object.poolType) ? globalThis.String(object.poolType) : "" };
  },

  toJSON(message: QueryPoolTypeResponse): unknown {
    const obj: any = {};
    if (message.poolType !== "") {
      obj.poolType = message.poolType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolTypeResponse>, I>>(base?: I): QueryPoolTypeResponse {
    return QueryPoolTypeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolTypeResponse>, I>>(object: I): QueryPoolTypeResponse {
    const message = createBaseQueryPoolTypeResponse();
    message.poolType = object.poolType ?? "";
    return message;
  },
};

function createBaseQueryCalcJoinPoolSharesRequest(): QueryCalcJoinPoolSharesRequest {
  return { poolId: Long.UZERO, tokensIn: [] };
}

export const QueryCalcJoinPoolSharesRequest = {
  encode(message: QueryCalcJoinPoolSharesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    for (const v of message.tokensIn) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCalcJoinPoolSharesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCalcJoinPoolSharesRequest();
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

          message.tokensIn.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCalcJoinPoolSharesRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tokensIn: globalThis.Array.isArray(object?.tokensIn) ? object.tokensIn.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryCalcJoinPoolSharesRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.tokensIn?.length) {
      obj.tokensIn = message.tokensIn.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCalcJoinPoolSharesRequest>, I>>(base?: I): QueryCalcJoinPoolSharesRequest {
    return QueryCalcJoinPoolSharesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCalcJoinPoolSharesRequest>, I>>(
    object: I,
  ): QueryCalcJoinPoolSharesRequest {
    const message = createBaseQueryCalcJoinPoolSharesRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tokensIn = object.tokensIn?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryCalcJoinPoolSharesResponse(): QueryCalcJoinPoolSharesResponse {
  return { shareOutAmount: "", tokensOut: [] };
}

export const QueryCalcJoinPoolSharesResponse = {
  encode(message: QueryCalcJoinPoolSharesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.shareOutAmount !== "") {
      writer.uint32(10).string(message.shareOutAmount);
    }
    for (const v of message.tokensOut) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCalcJoinPoolSharesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCalcJoinPoolSharesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.shareOutAmount = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tokensOut.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCalcJoinPoolSharesResponse {
    return {
      shareOutAmount: isSet(object.shareOutAmount) ? globalThis.String(object.shareOutAmount) : "",
      tokensOut: globalThis.Array.isArray(object?.tokensOut) ? object.tokensOut.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryCalcJoinPoolSharesResponse): unknown {
    const obj: any = {};
    if (message.shareOutAmount !== "") {
      obj.shareOutAmount = message.shareOutAmount;
    }
    if (message.tokensOut?.length) {
      obj.tokensOut = message.tokensOut.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCalcJoinPoolSharesResponse>, I>>(base?: I): QueryCalcJoinPoolSharesResponse {
    return QueryCalcJoinPoolSharesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCalcJoinPoolSharesResponse>, I>>(
    object: I,
  ): QueryCalcJoinPoolSharesResponse {
    const message = createBaseQueryCalcJoinPoolSharesResponse();
    message.shareOutAmount = object.shareOutAmount ?? "";
    message.tokensOut = object.tokensOut?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryCalcExitPoolCoinsFromSharesRequest(): QueryCalcExitPoolCoinsFromSharesRequest {
  return { poolId: Long.UZERO, shareInAmount: "" };
}

export const QueryCalcExitPoolCoinsFromSharesRequest = {
  encode(message: QueryCalcExitPoolCoinsFromSharesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.shareInAmount !== "") {
      writer.uint32(18).string(message.shareInAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCalcExitPoolCoinsFromSharesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCalcExitPoolCoinsFromSharesRequest();
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

          message.shareInAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCalcExitPoolCoinsFromSharesRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      shareInAmount: isSet(object.shareInAmount) ? globalThis.String(object.shareInAmount) : "",
    };
  },

  toJSON(message: QueryCalcExitPoolCoinsFromSharesRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.shareInAmount !== "") {
      obj.shareInAmount = message.shareInAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCalcExitPoolCoinsFromSharesRequest>, I>>(
    base?: I,
  ): QueryCalcExitPoolCoinsFromSharesRequest {
    return QueryCalcExitPoolCoinsFromSharesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCalcExitPoolCoinsFromSharesRequest>, I>>(
    object: I,
  ): QueryCalcExitPoolCoinsFromSharesRequest {
    const message = createBaseQueryCalcExitPoolCoinsFromSharesRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.shareInAmount = object.shareInAmount ?? "";
    return message;
  },
};

function createBaseQueryCalcExitPoolCoinsFromSharesResponse(): QueryCalcExitPoolCoinsFromSharesResponse {
  return { tokensOut: [] };
}

export const QueryCalcExitPoolCoinsFromSharesResponse = {
  encode(message: QueryCalcExitPoolCoinsFromSharesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tokensOut) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCalcExitPoolCoinsFromSharesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCalcExitPoolCoinsFromSharesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokensOut.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCalcExitPoolCoinsFromSharesResponse {
    return {
      tokensOut: globalThis.Array.isArray(object?.tokensOut) ? object.tokensOut.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryCalcExitPoolCoinsFromSharesResponse): unknown {
    const obj: any = {};
    if (message.tokensOut?.length) {
      obj.tokensOut = message.tokensOut.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCalcExitPoolCoinsFromSharesResponse>, I>>(
    base?: I,
  ): QueryCalcExitPoolCoinsFromSharesResponse {
    return QueryCalcExitPoolCoinsFromSharesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCalcExitPoolCoinsFromSharesResponse>, I>>(
    object: I,
  ): QueryCalcExitPoolCoinsFromSharesResponse {
    const message = createBaseQueryCalcExitPoolCoinsFromSharesResponse();
    message.tokensOut = object.tokensOut?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryPoolParamsRequest(): QueryPoolParamsRequest {
  return { poolId: Long.UZERO };
}

export const QueryPoolParamsRequest = {
  encode(message: QueryPoolParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolParamsRequest();
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

  fromJSON(object: any): QueryPoolParamsRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: QueryPoolParamsRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolParamsRequest>, I>>(base?: I): QueryPoolParamsRequest {
    return QueryPoolParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolParamsRequest>, I>>(object: I): QueryPoolParamsRequest {
    const message = createBaseQueryPoolParamsRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryPoolParamsResponse(): QueryPoolParamsResponse {
  return { params: undefined };
}

export const QueryPoolParamsResponse = {
  encode(message: QueryPoolParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Any.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPoolParamsResponse {
    return { params: isSet(object.params) ? Any.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryPoolParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Any.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolParamsResponse>, I>>(base?: I): QueryPoolParamsResponse {
    return QueryPoolParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolParamsResponse>, I>>(object: I): QueryPoolParamsResponse {
    const message = createBaseQueryPoolParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Any.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalPoolLiquidityRequest(): QueryTotalPoolLiquidityRequest {
  return { poolId: Long.UZERO };
}

export const QueryTotalPoolLiquidityRequest = {
  encode(message: QueryTotalPoolLiquidityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalPoolLiquidityRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalPoolLiquidityRequest();
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

  fromJSON(object: any): QueryTotalPoolLiquidityRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: QueryTotalPoolLiquidityRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalPoolLiquidityRequest>, I>>(base?: I): QueryTotalPoolLiquidityRequest {
    return QueryTotalPoolLiquidityRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalPoolLiquidityRequest>, I>>(
    object: I,
  ): QueryTotalPoolLiquidityRequest {
    const message = createBaseQueryTotalPoolLiquidityRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryTotalPoolLiquidityResponse(): QueryTotalPoolLiquidityResponse {
  return { liquidity: [] };
}

export const QueryTotalPoolLiquidityResponse = {
  encode(message: QueryTotalPoolLiquidityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalPoolLiquidityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalPoolLiquidityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidity.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalPoolLiquidityResponse {
    return {
      liquidity: globalThis.Array.isArray(object?.liquidity) ? object.liquidity.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryTotalPoolLiquidityResponse): unknown {
    const obj: any = {};
    if (message.liquidity?.length) {
      obj.liquidity = message.liquidity.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalPoolLiquidityResponse>, I>>(base?: I): QueryTotalPoolLiquidityResponse {
    return QueryTotalPoolLiquidityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalPoolLiquidityResponse>, I>>(
    object: I,
  ): QueryTotalPoolLiquidityResponse {
    const message = createBaseQueryTotalPoolLiquidityResponse();
    message.liquidity = object.liquidity?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryTotalSharesRequest(): QueryTotalSharesRequest {
  return { poolId: Long.UZERO };
}

export const QueryTotalSharesRequest = {
  encode(message: QueryTotalSharesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalSharesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalSharesRequest();
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

  fromJSON(object: any): QueryTotalSharesRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: QueryTotalSharesRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalSharesRequest>, I>>(base?: I): QueryTotalSharesRequest {
    return QueryTotalSharesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalSharesRequest>, I>>(object: I): QueryTotalSharesRequest {
    const message = createBaseQueryTotalSharesRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryTotalSharesResponse(): QueryTotalSharesResponse {
  return { totalShares: undefined };
}

export const QueryTotalSharesResponse = {
  encode(message: QueryTotalSharesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalShares !== undefined) {
      Coin.encode(message.totalShares, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalSharesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalSharesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.totalShares = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalSharesResponse {
    return { totalShares: isSet(object.totalShares) ? Coin.fromJSON(object.totalShares) : undefined };
  },

  toJSON(message: QueryTotalSharesResponse): unknown {
    const obj: any = {};
    if (message.totalShares !== undefined) {
      obj.totalShares = Coin.toJSON(message.totalShares);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalSharesResponse>, I>>(base?: I): QueryTotalSharesResponse {
    return QueryTotalSharesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalSharesResponse>, I>>(object: I): QueryTotalSharesResponse {
    const message = createBaseQueryTotalSharesResponse();
    message.totalShares = (object.totalShares !== undefined && object.totalShares !== null)
      ? Coin.fromPartial(object.totalShares)
      : undefined;
    return message;
  },
};

function createBaseQueryCalcJoinPoolNoSwapSharesRequest(): QueryCalcJoinPoolNoSwapSharesRequest {
  return { poolId: Long.UZERO, tokensIn: [] };
}

export const QueryCalcJoinPoolNoSwapSharesRequest = {
  encode(message: QueryCalcJoinPoolNoSwapSharesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    for (const v of message.tokensIn) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCalcJoinPoolNoSwapSharesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCalcJoinPoolNoSwapSharesRequest();
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

          message.tokensIn.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCalcJoinPoolNoSwapSharesRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tokensIn: globalThis.Array.isArray(object?.tokensIn) ? object.tokensIn.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryCalcJoinPoolNoSwapSharesRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.tokensIn?.length) {
      obj.tokensIn = message.tokensIn.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCalcJoinPoolNoSwapSharesRequest>, I>>(
    base?: I,
  ): QueryCalcJoinPoolNoSwapSharesRequest {
    return QueryCalcJoinPoolNoSwapSharesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCalcJoinPoolNoSwapSharesRequest>, I>>(
    object: I,
  ): QueryCalcJoinPoolNoSwapSharesRequest {
    const message = createBaseQueryCalcJoinPoolNoSwapSharesRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tokensIn = object.tokensIn?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryCalcJoinPoolNoSwapSharesResponse(): QueryCalcJoinPoolNoSwapSharesResponse {
  return { tokensOut: [], sharesOut: "" };
}

export const QueryCalcJoinPoolNoSwapSharesResponse = {
  encode(message: QueryCalcJoinPoolNoSwapSharesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tokensOut) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.sharesOut !== "") {
      writer.uint32(18).string(message.sharesOut);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCalcJoinPoolNoSwapSharesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCalcJoinPoolNoSwapSharesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokensOut.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sharesOut = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCalcJoinPoolNoSwapSharesResponse {
    return {
      tokensOut: globalThis.Array.isArray(object?.tokensOut) ? object.tokensOut.map((e: any) => Coin.fromJSON(e)) : [],
      sharesOut: isSet(object.sharesOut) ? globalThis.String(object.sharesOut) : "",
    };
  },

  toJSON(message: QueryCalcJoinPoolNoSwapSharesResponse): unknown {
    const obj: any = {};
    if (message.tokensOut?.length) {
      obj.tokensOut = message.tokensOut.map((e) => Coin.toJSON(e));
    }
    if (message.sharesOut !== "") {
      obj.sharesOut = message.sharesOut;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCalcJoinPoolNoSwapSharesResponse>, I>>(
    base?: I,
  ): QueryCalcJoinPoolNoSwapSharesResponse {
    return QueryCalcJoinPoolNoSwapSharesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCalcJoinPoolNoSwapSharesResponse>, I>>(
    object: I,
  ): QueryCalcJoinPoolNoSwapSharesResponse {
    const message = createBaseQueryCalcJoinPoolNoSwapSharesResponse();
    message.tokensOut = object.tokensOut?.map((e) => Coin.fromPartial(e)) || [];
    message.sharesOut = object.sharesOut ?? "";
    return message;
  },
};

function createBaseQuerySpotPriceRequest(): QuerySpotPriceRequest {
  return { poolId: Long.UZERO, baseAssetDenom: "", quoteAssetDenom: "" };
}

export const QuerySpotPriceRequest = {
  encode(message: QuerySpotPriceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.baseAssetDenom !== "") {
      writer.uint32(18).string(message.baseAssetDenom);
    }
    if (message.quoteAssetDenom !== "") {
      writer.uint32(26).string(message.quoteAssetDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpotPriceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpotPriceRequest();
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

          message.baseAssetDenom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.quoteAssetDenom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySpotPriceRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      baseAssetDenom: isSet(object.baseAssetDenom) ? globalThis.String(object.baseAssetDenom) : "",
      quoteAssetDenom: isSet(object.quoteAssetDenom) ? globalThis.String(object.quoteAssetDenom) : "",
    };
  },

  toJSON(message: QuerySpotPriceRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.baseAssetDenom !== "") {
      obj.baseAssetDenom = message.baseAssetDenom;
    }
    if (message.quoteAssetDenom !== "") {
      obj.quoteAssetDenom = message.quoteAssetDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpotPriceRequest>, I>>(base?: I): QuerySpotPriceRequest {
    return QuerySpotPriceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpotPriceRequest>, I>>(object: I): QuerySpotPriceRequest {
    const message = createBaseQuerySpotPriceRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.baseAssetDenom = object.baseAssetDenom ?? "";
    message.quoteAssetDenom = object.quoteAssetDenom ?? "";
    return message;
  },
};

function createBaseQueryPoolsWithFilterRequest(): QueryPoolsWithFilterRequest {
  return { minLiquidity: "", poolType: "", pagination: undefined };
}

export const QueryPoolsWithFilterRequest = {
  encode(message: QueryPoolsWithFilterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.minLiquidity !== "") {
      writer.uint32(10).string(message.minLiquidity);
    }
    if (message.poolType !== "") {
      writer.uint32(18).string(message.poolType);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolsWithFilterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolsWithFilterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.minLiquidity = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.poolType = reader.string();
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

  fromJSON(object: any): QueryPoolsWithFilterRequest {
    return {
      minLiquidity: isSet(object.minLiquidity) ? globalThis.String(object.minLiquidity) : "",
      poolType: isSet(object.poolType) ? globalThis.String(object.poolType) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryPoolsWithFilterRequest): unknown {
    const obj: any = {};
    if (message.minLiquidity !== "") {
      obj.minLiquidity = message.minLiquidity;
    }
    if (message.poolType !== "") {
      obj.poolType = message.poolType;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolsWithFilterRequest>, I>>(base?: I): QueryPoolsWithFilterRequest {
    return QueryPoolsWithFilterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolsWithFilterRequest>, I>>(object: I): QueryPoolsWithFilterRequest {
    const message = createBaseQueryPoolsWithFilterRequest();
    message.minLiquidity = object.minLiquidity ?? "";
    message.poolType = object.poolType ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryPoolsWithFilterResponse(): QueryPoolsWithFilterResponse {
  return { pools: [], pagination: undefined };
}

export const QueryPoolsWithFilterResponse = {
  encode(message: QueryPoolsWithFilterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pools) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolsWithFilterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolsWithFilterResponse();
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

  fromJSON(object: any): QueryPoolsWithFilterResponse {
    return {
      pools: globalThis.Array.isArray(object?.pools) ? object.pools.map((e: any) => Any.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryPoolsWithFilterResponse): unknown {
    const obj: any = {};
    if (message.pools?.length) {
      obj.pools = message.pools.map((e) => Any.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPoolsWithFilterResponse>, I>>(base?: I): QueryPoolsWithFilterResponse {
    return QueryPoolsWithFilterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPoolsWithFilterResponse>, I>>(object: I): QueryPoolsWithFilterResponse {
    const message = createBaseQueryPoolsWithFilterResponse();
    message.pools = object.pools?.map((e) => Any.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySpotPriceResponse(): QuerySpotPriceResponse {
  return { spotPrice: "" };
}

export const QuerySpotPriceResponse = {
  encode(message: QuerySpotPriceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.spotPrice !== "") {
      writer.uint32(10).string(message.spotPrice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpotPriceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySpotPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.spotPrice = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySpotPriceResponse {
    return { spotPrice: isSet(object.spotPrice) ? globalThis.String(object.spotPrice) : "" };
  },

  toJSON(message: QuerySpotPriceResponse): unknown {
    const obj: any = {};
    if (message.spotPrice !== "") {
      obj.spotPrice = message.spotPrice;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySpotPriceResponse>, I>>(base?: I): QuerySpotPriceResponse {
    return QuerySpotPriceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySpotPriceResponse>, I>>(object: I): QuerySpotPriceResponse {
    const message = createBaseQuerySpotPriceResponse();
    message.spotPrice = object.spotPrice ?? "";
    return message;
  },
};

function createBaseQuerySwapExactAmountInRequest(): QuerySwapExactAmountInRequest {
  return { sender: "", poolId: Long.UZERO, tokenIn: "", routes: [] };
}

export const QuerySwapExactAmountInRequest = {
  encode(message: QuerySwapExactAmountInRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(26).string(message.tokenIn);
    }
    for (const v of message.routes) {
      SwapAmountInRoute.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySwapExactAmountInRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySwapExactAmountInRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
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

          message.tokenIn = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.routes.push(SwapAmountInRoute.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySwapExactAmountInRequest {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tokenIn: isSet(object.tokenIn) ? globalThis.String(object.tokenIn) : "",
      routes: globalThis.Array.isArray(object?.routes)
        ? object.routes.map((e: any) => SwapAmountInRoute.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QuerySwapExactAmountInRequest): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.tokenIn !== "") {
      obj.tokenIn = message.tokenIn;
    }
    if (message.routes?.length) {
      obj.routes = message.routes.map((e) => SwapAmountInRoute.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySwapExactAmountInRequest>, I>>(base?: I): QuerySwapExactAmountInRequest {
    return QuerySwapExactAmountInRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySwapExactAmountInRequest>, I>>(
    object: I,
  ): QuerySwapExactAmountInRequest {
    const message = createBaseQuerySwapExactAmountInRequest();
    message.sender = object.sender ?? "";
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tokenIn = object.tokenIn ?? "";
    message.routes = object.routes?.map((e) => SwapAmountInRoute.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQuerySwapExactAmountInResponse(): QuerySwapExactAmountInResponse {
  return { tokenOutAmount: "" };
}

export const QuerySwapExactAmountInResponse = {
  encode(message: QuerySwapExactAmountInResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySwapExactAmountInResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySwapExactAmountInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenOutAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySwapExactAmountInResponse {
    return { tokenOutAmount: isSet(object.tokenOutAmount) ? globalThis.String(object.tokenOutAmount) : "" };
  },

  toJSON(message: QuerySwapExactAmountInResponse): unknown {
    const obj: any = {};
    if (message.tokenOutAmount !== "") {
      obj.tokenOutAmount = message.tokenOutAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySwapExactAmountInResponse>, I>>(base?: I): QuerySwapExactAmountInResponse {
    return QuerySwapExactAmountInResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySwapExactAmountInResponse>, I>>(
    object: I,
  ): QuerySwapExactAmountInResponse {
    const message = createBaseQuerySwapExactAmountInResponse();
    message.tokenOutAmount = object.tokenOutAmount ?? "";
    return message;
  },
};

function createBaseQuerySwapExactAmountOutRequest(): QuerySwapExactAmountOutRequest {
  return { sender: "", poolId: Long.UZERO, routes: [], tokenOut: "" };
}

export const QuerySwapExactAmountOutRequest = {
  encode(message: QuerySwapExactAmountOutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    for (const v of message.routes) {
      SwapAmountOutRoute.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySwapExactAmountOutRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySwapExactAmountOutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
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

          message.routes.push(SwapAmountOutRoute.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.tokenOut = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySwapExactAmountOutRequest {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      routes: globalThis.Array.isArray(object?.routes)
        ? object.routes.map((e: any) => SwapAmountOutRoute.fromJSON(e))
        : [],
      tokenOut: isSet(object.tokenOut) ? globalThis.String(object.tokenOut) : "",
    };
  },

  toJSON(message: QuerySwapExactAmountOutRequest): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.routes?.length) {
      obj.routes = message.routes.map((e) => SwapAmountOutRoute.toJSON(e));
    }
    if (message.tokenOut !== "") {
      obj.tokenOut = message.tokenOut;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySwapExactAmountOutRequest>, I>>(base?: I): QuerySwapExactAmountOutRequest {
    return QuerySwapExactAmountOutRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySwapExactAmountOutRequest>, I>>(
    object: I,
  ): QuerySwapExactAmountOutRequest {
    const message = createBaseQuerySwapExactAmountOutRequest();
    message.sender = object.sender ?? "";
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.routes = object.routes?.map((e) => SwapAmountOutRoute.fromPartial(e)) || [];
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
};

function createBaseQuerySwapExactAmountOutResponse(): QuerySwapExactAmountOutResponse {
  return { tokenInAmount: "" };
}

export const QuerySwapExactAmountOutResponse = {
  encode(message: QuerySwapExactAmountOutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySwapExactAmountOutResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySwapExactAmountOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenInAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySwapExactAmountOutResponse {
    return { tokenInAmount: isSet(object.tokenInAmount) ? globalThis.String(object.tokenInAmount) : "" };
  },

  toJSON(message: QuerySwapExactAmountOutResponse): unknown {
    const obj: any = {};
    if (message.tokenInAmount !== "") {
      obj.tokenInAmount = message.tokenInAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySwapExactAmountOutResponse>, I>>(base?: I): QuerySwapExactAmountOutResponse {
    return QuerySwapExactAmountOutResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySwapExactAmountOutResponse>, I>>(
    object: I,
  ): QuerySwapExactAmountOutResponse {
    const message = createBaseQuerySwapExactAmountOutResponse();
    message.tokenInAmount = object.tokenInAmount ?? "";
    return message;
  },
};

function createBaseQueryTotalLiquidityRequest(): QueryTotalLiquidityRequest {
  return {};
}

export const QueryTotalLiquidityRequest = {
  encode(_: QueryTotalLiquidityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalLiquidityRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalLiquidityRequest();
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

  fromJSON(_: any): QueryTotalLiquidityRequest {
    return {};
  },

  toJSON(_: QueryTotalLiquidityRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalLiquidityRequest>, I>>(base?: I): QueryTotalLiquidityRequest {
    return QueryTotalLiquidityRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalLiquidityRequest>, I>>(_: I): QueryTotalLiquidityRequest {
    const message = createBaseQueryTotalLiquidityRequest();
    return message;
  },
};

function createBaseQueryTotalLiquidityResponse(): QueryTotalLiquidityResponse {
  return { liquidity: [] };
}

export const QueryTotalLiquidityResponse = {
  encode(message: QueryTotalLiquidityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalLiquidityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalLiquidityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.liquidity.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalLiquidityResponse {
    return {
      liquidity: globalThis.Array.isArray(object?.liquidity) ? object.liquidity.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryTotalLiquidityResponse): unknown {
    const obj: any = {};
    if (message.liquidity?.length) {
      obj.liquidity = message.liquidity.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalLiquidityResponse>, I>>(base?: I): QueryTotalLiquidityResponse {
    return QueryTotalLiquidityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalLiquidityResponse>, I>>(object: I): QueryTotalLiquidityResponse {
    const message = createBaseQueryTotalLiquidityResponse();
    message.liquidity = object.liquidity?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryConcentratedPoolIdLinkFromCFMMRequest(): QueryConcentratedPoolIdLinkFromCFMMRequest {
  return { cfmmPoolId: Long.UZERO };
}

export const QueryConcentratedPoolIdLinkFromCFMMRequest = {
  encode(message: QueryConcentratedPoolIdLinkFromCFMMRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.cfmmPoolId.isZero()) {
      writer.uint32(8).uint64(message.cfmmPoolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConcentratedPoolIdLinkFromCFMMRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConcentratedPoolIdLinkFromCFMMRequest();
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

  fromJSON(object: any): QueryConcentratedPoolIdLinkFromCFMMRequest {
    return { cfmmPoolId: isSet(object.cfmmPoolId) ? Long.fromValue(object.cfmmPoolId) : Long.UZERO };
  },

  toJSON(message: QueryConcentratedPoolIdLinkFromCFMMRequest): unknown {
    const obj: any = {};
    if (!message.cfmmPoolId.isZero()) {
      obj.cfmmPoolId = (message.cfmmPoolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConcentratedPoolIdLinkFromCFMMRequest>, I>>(
    base?: I,
  ): QueryConcentratedPoolIdLinkFromCFMMRequest {
    return QueryConcentratedPoolIdLinkFromCFMMRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConcentratedPoolIdLinkFromCFMMRequest>, I>>(
    object: I,
  ): QueryConcentratedPoolIdLinkFromCFMMRequest {
    const message = createBaseQueryConcentratedPoolIdLinkFromCFMMRequest();
    message.cfmmPoolId = (object.cfmmPoolId !== undefined && object.cfmmPoolId !== null)
      ? Long.fromValue(object.cfmmPoolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryConcentratedPoolIdLinkFromCFMMResponse(): QueryConcentratedPoolIdLinkFromCFMMResponse {
  return { concentratedPoolId: Long.UZERO };
}

export const QueryConcentratedPoolIdLinkFromCFMMResponse = {
  encode(message: QueryConcentratedPoolIdLinkFromCFMMResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.concentratedPoolId.isZero()) {
      writer.uint32(8).uint64(message.concentratedPoolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConcentratedPoolIdLinkFromCFMMResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConcentratedPoolIdLinkFromCFMMResponse();
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

  fromJSON(object: any): QueryConcentratedPoolIdLinkFromCFMMResponse {
    return {
      concentratedPoolId: isSet(object.concentratedPoolId) ? Long.fromValue(object.concentratedPoolId) : Long.UZERO,
    };
  },

  toJSON(message: QueryConcentratedPoolIdLinkFromCFMMResponse): unknown {
    const obj: any = {};
    if (!message.concentratedPoolId.isZero()) {
      obj.concentratedPoolId = (message.concentratedPoolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryConcentratedPoolIdLinkFromCFMMResponse>, I>>(
    base?: I,
  ): QueryConcentratedPoolIdLinkFromCFMMResponse {
    return QueryConcentratedPoolIdLinkFromCFMMResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryConcentratedPoolIdLinkFromCFMMResponse>, I>>(
    object: I,
  ): QueryConcentratedPoolIdLinkFromCFMMResponse {
    const message = createBaseQueryConcentratedPoolIdLinkFromCFMMResponse();
    message.concentratedPoolId = (object.concentratedPoolId !== undefined && object.concentratedPoolId !== null)
      ? Long.fromValue(object.concentratedPoolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryCFMMConcentratedPoolLinksRequest(): QueryCFMMConcentratedPoolLinksRequest {
  return {};
}

export const QueryCFMMConcentratedPoolLinksRequest = {
  encode(_: QueryCFMMConcentratedPoolLinksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCFMMConcentratedPoolLinksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCFMMConcentratedPoolLinksRequest();
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

  fromJSON(_: any): QueryCFMMConcentratedPoolLinksRequest {
    return {};
  },

  toJSON(_: QueryCFMMConcentratedPoolLinksRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCFMMConcentratedPoolLinksRequest>, I>>(
    base?: I,
  ): QueryCFMMConcentratedPoolLinksRequest {
    return QueryCFMMConcentratedPoolLinksRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCFMMConcentratedPoolLinksRequest>, I>>(
    _: I,
  ): QueryCFMMConcentratedPoolLinksRequest {
    const message = createBaseQueryCFMMConcentratedPoolLinksRequest();
    return message;
  },
};

function createBaseQueryCFMMConcentratedPoolLinksResponse(): QueryCFMMConcentratedPoolLinksResponse {
  return { migrationRecords: undefined };
}

export const QueryCFMMConcentratedPoolLinksResponse = {
  encode(message: QueryCFMMConcentratedPoolLinksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.migrationRecords !== undefined) {
      MigrationRecords.encode(message.migrationRecords, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCFMMConcentratedPoolLinksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCFMMConcentratedPoolLinksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.migrationRecords = MigrationRecords.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCFMMConcentratedPoolLinksResponse {
    return {
      migrationRecords: isSet(object.migrationRecords) ? MigrationRecords.fromJSON(object.migrationRecords) : undefined,
    };
  },

  toJSON(message: QueryCFMMConcentratedPoolLinksResponse): unknown {
    const obj: any = {};
    if (message.migrationRecords !== undefined) {
      obj.migrationRecords = MigrationRecords.toJSON(message.migrationRecords);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCFMMConcentratedPoolLinksResponse>, I>>(
    base?: I,
  ): QueryCFMMConcentratedPoolLinksResponse {
    return QueryCFMMConcentratedPoolLinksResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCFMMConcentratedPoolLinksResponse>, I>>(
    object: I,
  ): QueryCFMMConcentratedPoolLinksResponse {
    const message = createBaseQueryCFMMConcentratedPoolLinksResponse();
    message.migrationRecords = (object.migrationRecords !== undefined && object.migrationRecords !== null)
      ? MigrationRecords.fromPartial(object.migrationRecords)
      : undefined;
    return message;
  },
};

export interface Query {
  Pools(request: QueryPoolsRequest): Promise<QueryPoolsResponse>;
  /**
   * Deprecated: please use the alternative in x/poolmanager
   *
   * @deprecated
   */
  NumPools(request: QueryNumPoolsRequest): Promise<QueryNumPoolsResponse>;
  TotalLiquidity(request: QueryTotalLiquidityRequest): Promise<QueryTotalLiquidityResponse>;
  /**
   * PoolsWithFilter allows you to query specific pools with requested
   * parameters
   */
  PoolsWithFilter(request: QueryPoolsWithFilterRequest): Promise<QueryPoolsWithFilterResponse>;
  /**
   * Deprecated: please use the alternative in x/poolmanager
   *
   * @deprecated
   */
  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  /**
   * PoolType returns the type of the pool.
   * Returns "Balancer" as a string literal when the pool is a balancer pool.
   * Errors if the pool is failed to be type caseted.
   */
  PoolType(request: QueryPoolTypeRequest): Promise<QueryPoolTypeResponse>;
  /**
   * Simulates joining pool without a swap. Returns the amount of shares you'd
   * get and tokens needed to provide
   */
  CalcJoinPoolNoSwapShares(
    request: QueryCalcJoinPoolNoSwapSharesRequest,
  ): Promise<QueryCalcJoinPoolNoSwapSharesResponse>;
  CalcJoinPoolShares(request: QueryCalcJoinPoolSharesRequest): Promise<QueryCalcJoinPoolSharesResponse>;
  CalcExitPoolCoinsFromShares(
    request: QueryCalcExitPoolCoinsFromSharesRequest,
  ): Promise<QueryCalcExitPoolCoinsFromSharesResponse>;
  PoolParams(request: QueryPoolParamsRequest): Promise<QueryPoolParamsResponse>;
  /**
   * Deprecated: please use the alternative in x/poolmanager
   *
   * @deprecated
   */
  TotalPoolLiquidity(request: QueryTotalPoolLiquidityRequest): Promise<QueryTotalPoolLiquidityResponse>;
  TotalShares(request: QueryTotalSharesRequest): Promise<QueryTotalSharesResponse>;
  /**
   * SpotPrice defines a gRPC query handler that returns the spot price given
   * a base denomination and a quote denomination.
   *
   * @deprecated
   */
  SpotPrice(request: QuerySpotPriceRequest): Promise<QuerySpotPriceResponse>;
  /**
   * Deprecated: please use the alternative in x/poolmanager
   *
   * @deprecated
   */
  EstimateSwapExactAmountIn(request: QuerySwapExactAmountInRequest): Promise<QuerySwapExactAmountInResponse>;
  /**
   * Deprecated: please use the alternative in x/poolmanager
   *
   * @deprecated
   */
  EstimateSwapExactAmountOut(request: QuerySwapExactAmountOutRequest): Promise<QuerySwapExactAmountOutResponse>;
  /**
   * ConcentratedPoolIdLinkFromBalancer returns the pool id of the concentrated
   * pool that is linked with the given CFMM pool.
   */
  ConcentratedPoolIdLinkFromCFMM(
    request: QueryConcentratedPoolIdLinkFromCFMMRequest,
  ): Promise<QueryConcentratedPoolIdLinkFromCFMMResponse>;
  /**
   * CFMMConcentratedPoolLinks returns migration links between CFMM and
   * Concentrated pools.
   */
  CFMMConcentratedPoolLinks(
    request: QueryCFMMConcentratedPoolLinksRequest,
  ): Promise<QueryCFMMConcentratedPoolLinksResponse>;
}

export const QueryServiceName = "osmosis.gamm.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Pools = this.Pools.bind(this);
    this.NumPools = this.NumPools.bind(this);
    this.TotalLiquidity = this.TotalLiquidity.bind(this);
    this.PoolsWithFilter = this.PoolsWithFilter.bind(this);
    this.Pool = this.Pool.bind(this);
    this.PoolType = this.PoolType.bind(this);
    this.CalcJoinPoolNoSwapShares = this.CalcJoinPoolNoSwapShares.bind(this);
    this.CalcJoinPoolShares = this.CalcJoinPoolShares.bind(this);
    this.CalcExitPoolCoinsFromShares = this.CalcExitPoolCoinsFromShares.bind(this);
    this.PoolParams = this.PoolParams.bind(this);
    this.TotalPoolLiquidity = this.TotalPoolLiquidity.bind(this);
    this.TotalShares = this.TotalShares.bind(this);
    this.SpotPrice = this.SpotPrice.bind(this);
    this.EstimateSwapExactAmountIn = this.EstimateSwapExactAmountIn.bind(this);
    this.EstimateSwapExactAmountOut = this.EstimateSwapExactAmountOut.bind(this);
    this.ConcentratedPoolIdLinkFromCFMM = this.ConcentratedPoolIdLinkFromCFMM.bind(this);
    this.CFMMConcentratedPoolLinks = this.CFMMConcentratedPoolLinks.bind(this);
  }
  Pools(request: QueryPoolsRequest): Promise<QueryPoolsResponse> {
    const data = QueryPoolsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Pools", data);
    return promise.then((data) => QueryPoolsResponse.decode(_m0.Reader.create(data)));
  }

  NumPools(request: QueryNumPoolsRequest): Promise<QueryNumPoolsResponse> {
    const data = QueryNumPoolsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NumPools", data);
    return promise.then((data) => QueryNumPoolsResponse.decode(_m0.Reader.create(data)));
  }

  TotalLiquidity(request: QueryTotalLiquidityRequest): Promise<QueryTotalLiquidityResponse> {
    const data = QueryTotalLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalLiquidity", data);
    return promise.then((data) => QueryTotalLiquidityResponse.decode(_m0.Reader.create(data)));
  }

  PoolsWithFilter(request: QueryPoolsWithFilterRequest): Promise<QueryPoolsWithFilterResponse> {
    const data = QueryPoolsWithFilterRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PoolsWithFilter", data);
    return promise.then((data) => QueryPoolsWithFilterResponse.decode(_m0.Reader.create(data)));
  }

  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse> {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Pool", data);
    return promise.then((data) => QueryPoolResponse.decode(_m0.Reader.create(data)));
  }

  PoolType(request: QueryPoolTypeRequest): Promise<QueryPoolTypeResponse> {
    const data = QueryPoolTypeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PoolType", data);
    return promise.then((data) => QueryPoolTypeResponse.decode(_m0.Reader.create(data)));
  }

  CalcJoinPoolNoSwapShares(
    request: QueryCalcJoinPoolNoSwapSharesRequest,
  ): Promise<QueryCalcJoinPoolNoSwapSharesResponse> {
    const data = QueryCalcJoinPoolNoSwapSharesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CalcJoinPoolNoSwapShares", data);
    return promise.then((data) => QueryCalcJoinPoolNoSwapSharesResponse.decode(_m0.Reader.create(data)));
  }

  CalcJoinPoolShares(request: QueryCalcJoinPoolSharesRequest): Promise<QueryCalcJoinPoolSharesResponse> {
    const data = QueryCalcJoinPoolSharesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CalcJoinPoolShares", data);
    return promise.then((data) => QueryCalcJoinPoolSharesResponse.decode(_m0.Reader.create(data)));
  }

  CalcExitPoolCoinsFromShares(
    request: QueryCalcExitPoolCoinsFromSharesRequest,
  ): Promise<QueryCalcExitPoolCoinsFromSharesResponse> {
    const data = QueryCalcExitPoolCoinsFromSharesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CalcExitPoolCoinsFromShares", data);
    return promise.then((data) => QueryCalcExitPoolCoinsFromSharesResponse.decode(_m0.Reader.create(data)));
  }

  PoolParams(request: QueryPoolParamsRequest): Promise<QueryPoolParamsResponse> {
    const data = QueryPoolParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PoolParams", data);
    return promise.then((data) => QueryPoolParamsResponse.decode(_m0.Reader.create(data)));
  }

  TotalPoolLiquidity(request: QueryTotalPoolLiquidityRequest): Promise<QueryTotalPoolLiquidityResponse> {
    const data = QueryTotalPoolLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalPoolLiquidity", data);
    return promise.then((data) => QueryTotalPoolLiquidityResponse.decode(_m0.Reader.create(data)));
  }

  TotalShares(request: QueryTotalSharesRequest): Promise<QueryTotalSharesResponse> {
    const data = QueryTotalSharesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalShares", data);
    return promise.then((data) => QueryTotalSharesResponse.decode(_m0.Reader.create(data)));
  }

  SpotPrice(request: QuerySpotPriceRequest): Promise<QuerySpotPriceResponse> {
    const data = QuerySpotPriceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SpotPrice", data);
    return promise.then((data) => QuerySpotPriceResponse.decode(_m0.Reader.create(data)));
  }

  EstimateSwapExactAmountIn(request: QuerySwapExactAmountInRequest): Promise<QuerySwapExactAmountInResponse> {
    const data = QuerySwapExactAmountInRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateSwapExactAmountIn", data);
    return promise.then((data) => QuerySwapExactAmountInResponse.decode(_m0.Reader.create(data)));
  }

  EstimateSwapExactAmountOut(request: QuerySwapExactAmountOutRequest): Promise<QuerySwapExactAmountOutResponse> {
    const data = QuerySwapExactAmountOutRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateSwapExactAmountOut", data);
    return promise.then((data) => QuerySwapExactAmountOutResponse.decode(_m0.Reader.create(data)));
  }

  ConcentratedPoolIdLinkFromCFMM(
    request: QueryConcentratedPoolIdLinkFromCFMMRequest,
  ): Promise<QueryConcentratedPoolIdLinkFromCFMMResponse> {
    const data = QueryConcentratedPoolIdLinkFromCFMMRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ConcentratedPoolIdLinkFromCFMM", data);
    return promise.then((data) => QueryConcentratedPoolIdLinkFromCFMMResponse.decode(_m0.Reader.create(data)));
  }

  CFMMConcentratedPoolLinks(
    request: QueryCFMMConcentratedPoolLinksRequest,
  ): Promise<QueryCFMMConcentratedPoolLinksResponse> {
    const data = QueryCFMMConcentratedPoolLinksRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CFMMConcentratedPoolLinks", data);
    return promise.then((data) => QueryCFMMConcentratedPoolLinksResponse.decode(_m0.Reader.create(data)));
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
