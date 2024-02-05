/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Any } from "../../../google/protobuf/any";
import { Params } from "./genesis";
import { SwapAmountInRoute, SwapAmountOutRoute } from "./swap_route";

export const protobufPackage = "osmosis.poolmanager.v1beta1";

/** =============================== Params */
export interface ParamsRequest {
}

export interface ParamsResponse {
  params: Params | undefined;
}

/** =============================== EstimateSwapExactAmountIn */
export interface EstimateSwapExactAmountInRequest {
  /** @deprecated */
  poolId: Long;
  tokenIn: string;
  routes: SwapAmountInRoute[];
}

export interface EstimateSwapExactAmountInWithPrimitiveTypesRequest {
  /** @deprecated */
  poolId: Long;
  tokenIn: string;
  routesPoolId: Long[];
  routesTokenOutDenom: string[];
}

export interface EstimateSinglePoolSwapExactAmountInRequest {
  poolId: Long;
  tokenIn: string;
  tokenOutDenom: string;
}

export interface EstimateSwapExactAmountInResponse {
  tokenOutAmount: string;
}

/** =============================== EstimateSwapExactAmountOut */
export interface EstimateSwapExactAmountOutRequest {
  /** @deprecated */
  poolId: Long;
  routes: SwapAmountOutRoute[];
  tokenOut: string;
}

export interface EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
  /** @deprecated */
  poolId: Long;
  routesPoolId: Long[];
  routesTokenInDenom: string[];
  tokenOut: string;
}

export interface EstimateSinglePoolSwapExactAmountOutRequest {
  poolId: Long;
  tokenInDenom: string;
  tokenOut: string;
}

export interface EstimateSwapExactAmountOutResponse {
  tokenInAmount: string;
}

/** =============================== NumPools */
export interface NumPoolsRequest {
}

export interface NumPoolsResponse {
  numPools: Long;
}

/** =============================== Pool */
export interface PoolRequest {
  poolId: Long;
}

export interface PoolResponse {
  pool: Any | undefined;
}

/** =============================== AllPools */
export interface AllPoolsRequest {
}

export interface AllPoolsResponse {
  pools: Any[];
}

/**
 * =======================================================
 * ListPoolsByDenomRequest
 */
export interface ListPoolsByDenomRequest {
  denom: string;
}

export interface ListPoolsByDenomResponse {
  pools: Any[];
}

/**
 * ==========================================================
 * SpotPriceRequest defines the gRPC request structure for a SpotPrice
 * query.
 */
export interface SpotPriceRequest {
  poolId: Long;
  baseAssetDenom: string;
  quoteAssetDenom: string;
}

/**
 * SpotPriceResponse defines the gRPC response structure for a SpotPrice
 * query.
 */
export interface SpotPriceResponse {
  /** String of the Dec. Ex) 10.203uatom */
  spotPrice: string;
}

/** =============================== TotalPoolLiquidity */
export interface TotalPoolLiquidityRequest {
  poolId: Long;
}

export interface TotalPoolLiquidityResponse {
  liquidity: Coin[];
}

/** =============================== TotalLiquidity */
export interface TotalLiquidityRequest {
}

export interface TotalLiquidityResponse {
  liquidity: Coin[];
}

/** =============================== TotalVolumeForPool */
export interface TotalVolumeForPoolRequest {
  poolId: Long;
}

export interface TotalVolumeForPoolResponse {
  volume: Coin[];
}

/** =============================== TradingPairTakerFee */
export interface TradingPairTakerFeeRequest {
  denom0: string;
  denom1: string;
}

export interface TradingPairTakerFeeResponse {
  takerFee: string;
}

/**
 * EstimateTradeBasedOnPriceImpactRequest represents a request to estimate a
 * trade for Balancer/StableSwap/Concentrated liquidity pool types based on the
 * given parameters.
 */
export interface EstimateTradeBasedOnPriceImpactRequest {
  /** from_coin is the total amount of tokens that the user wants to sell. */
  fromCoin:
    | Coin
    | undefined;
  /**
   * to_coin_denom is the denom identifier of the token that the user wants to
   * buy.
   */
  toCoinDenom: string;
  /**
   * pool_id is the identifier of the liquidity pool that the trade will occur
   * on.
   */
  poolId: Long;
  /**
   * max_price_impact is the maximum percentage that the user is willing
   * to affect the price of the liquidity pool.
   */
  maxPriceImpact: string;
  /**
   * external_price is an optional external price that the user can enter.
   * It adjusts the MaxPriceImpact as the SpotPrice of a pool can be changed at
   * any time.
   */
  externalPrice: string;
}

/**
 * EstimateTradeBasedOnPriceImpactResponse represents the response data
 * for an estimated trade based on price impact. If a trade fails to be
 * estimated the response would be 0,0 for input_coin and output_coin and will
 * not error.
 */
export interface EstimateTradeBasedOnPriceImpactResponse {
  /**
   * input_coin is the actual input amount that would be tradeable
   * under the specified price impact.
   */
  inputCoin:
    | Coin
    | undefined;
  /**
   * output_coin is the amount of tokens of the ToCoinDenom type
   * that will be received for the actual InputCoin trade.
   */
  outputCoin: Coin | undefined;
}

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

function createBaseEstimateSwapExactAmountInRequest(): EstimateSwapExactAmountInRequest {
  return { poolId: Long.UZERO, tokenIn: "", routes: [] };
}

export const EstimateSwapExactAmountInRequest = {
  encode(message: EstimateSwapExactAmountInRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSwapExactAmountInRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountInRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): EstimateSwapExactAmountInRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tokenIn: isSet(object.tokenIn) ? globalThis.String(object.tokenIn) : "",
      routes: globalThis.Array.isArray(object?.routes)
        ? object.routes.map((e: any) => SwapAmountInRoute.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EstimateSwapExactAmountInRequest): unknown {
    const obj: any = {};
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

  create<I extends Exact<DeepPartial<EstimateSwapExactAmountInRequest>, I>>(
    base?: I,
  ): EstimateSwapExactAmountInRequest {
    return EstimateSwapExactAmountInRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSwapExactAmountInRequest>, I>>(
    object: I,
  ): EstimateSwapExactAmountInRequest {
    const message = createBaseEstimateSwapExactAmountInRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tokenIn = object.tokenIn ?? "";
    message.routes = object.routes?.map((e) => SwapAmountInRoute.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEstimateSwapExactAmountInWithPrimitiveTypesRequest(): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
  return { poolId: Long.UZERO, tokenIn: "", routesPoolId: [], routesTokenOutDenom: [] };
}

export const EstimateSwapExactAmountInWithPrimitiveTypesRequest = {
  encode(
    message: EstimateSwapExactAmountInWithPrimitiveTypesRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    writer.uint32(26).fork();
    for (const v of message.routesPoolId) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.routesTokenOutDenom) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountInWithPrimitiveTypesRequest();
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
          if (tag === 24) {
            message.routesPoolId.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.routesPoolId.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.routesTokenOutDenom.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tokenIn: isSet(object.tokenIn) ? globalThis.String(object.tokenIn) : "",
      routesPoolId: globalThis.Array.isArray(object?.routesPoolId)
        ? object.routesPoolId.map((e: any) => Long.fromValue(e))
        : [],
      routesTokenOutDenom: globalThis.Array.isArray(object?.routesTokenOutDenom)
        ? object.routesTokenOutDenom.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: EstimateSwapExactAmountInWithPrimitiveTypesRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.tokenIn !== "") {
      obj.tokenIn = message.tokenIn;
    }
    if (message.routesPoolId?.length) {
      obj.routesPoolId = message.routesPoolId.map((e) => (e || Long.UZERO).toString());
    }
    if (message.routesTokenOutDenom?.length) {
      obj.routesTokenOutDenom = message.routesTokenOutDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateSwapExactAmountInWithPrimitiveTypesRequest>, I>>(
    base?: I,
  ): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
    return EstimateSwapExactAmountInWithPrimitiveTypesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSwapExactAmountInWithPrimitiveTypesRequest>, I>>(
    object: I,
  ): EstimateSwapExactAmountInWithPrimitiveTypesRequest {
    const message = createBaseEstimateSwapExactAmountInWithPrimitiveTypesRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tokenIn = object.tokenIn ?? "";
    message.routesPoolId = object.routesPoolId?.map((e) => Long.fromValue(e)) || [];
    message.routesTokenOutDenom = object.routesTokenOutDenom?.map((e) => e) || [];
    return message;
  },
};

function createBaseEstimateSinglePoolSwapExactAmountInRequest(): EstimateSinglePoolSwapExactAmountInRequest {
  return { poolId: Long.UZERO, tokenIn: "", tokenOutDenom: "" };
}

export const EstimateSinglePoolSwapExactAmountInRequest = {
  encode(message: EstimateSinglePoolSwapExactAmountInRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOutDenom !== "") {
      writer.uint32(26).string(message.tokenOutDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSinglePoolSwapExactAmountInRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSinglePoolSwapExactAmountInRequest();
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
          if (tag !== 26) {
            break;
          }

          message.tokenOutDenom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EstimateSinglePoolSwapExactAmountInRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tokenIn: isSet(object.tokenIn) ? globalThis.String(object.tokenIn) : "",
      tokenOutDenom: isSet(object.tokenOutDenom) ? globalThis.String(object.tokenOutDenom) : "",
    };
  },

  toJSON(message: EstimateSinglePoolSwapExactAmountInRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.tokenIn !== "") {
      obj.tokenIn = message.tokenIn;
    }
    if (message.tokenOutDenom !== "") {
      obj.tokenOutDenom = message.tokenOutDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateSinglePoolSwapExactAmountInRequest>, I>>(
    base?: I,
  ): EstimateSinglePoolSwapExactAmountInRequest {
    return EstimateSinglePoolSwapExactAmountInRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSinglePoolSwapExactAmountInRequest>, I>>(
    object: I,
  ): EstimateSinglePoolSwapExactAmountInRequest {
    const message = createBaseEstimateSinglePoolSwapExactAmountInRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOutDenom = object.tokenOutDenom ?? "";
    return message;
  },
};

function createBaseEstimateSwapExactAmountInResponse(): EstimateSwapExactAmountInResponse {
  return { tokenOutAmount: "" };
}

export const EstimateSwapExactAmountInResponse = {
  encode(message: EstimateSwapExactAmountInResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSwapExactAmountInResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountInResponse();
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

  fromJSON(object: any): EstimateSwapExactAmountInResponse {
    return { tokenOutAmount: isSet(object.tokenOutAmount) ? globalThis.String(object.tokenOutAmount) : "" };
  },

  toJSON(message: EstimateSwapExactAmountInResponse): unknown {
    const obj: any = {};
    if (message.tokenOutAmount !== "") {
      obj.tokenOutAmount = message.tokenOutAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateSwapExactAmountInResponse>, I>>(
    base?: I,
  ): EstimateSwapExactAmountInResponse {
    return EstimateSwapExactAmountInResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSwapExactAmountInResponse>, I>>(
    object: I,
  ): EstimateSwapExactAmountInResponse {
    const message = createBaseEstimateSwapExactAmountInResponse();
    message.tokenOutAmount = object.tokenOutAmount ?? "";
    return message;
  },
};

function createBaseEstimateSwapExactAmountOutRequest(): EstimateSwapExactAmountOutRequest {
  return { poolId: Long.UZERO, routes: [], tokenOut: "" };
}

export const EstimateSwapExactAmountOutRequest = {
  encode(message: EstimateSwapExactAmountOutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSwapExactAmountOutRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountOutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): EstimateSwapExactAmountOutRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      routes: globalThis.Array.isArray(object?.routes)
        ? object.routes.map((e: any) => SwapAmountOutRoute.fromJSON(e))
        : [],
      tokenOut: isSet(object.tokenOut) ? globalThis.String(object.tokenOut) : "",
    };
  },

  toJSON(message: EstimateSwapExactAmountOutRequest): unknown {
    const obj: any = {};
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

  create<I extends Exact<DeepPartial<EstimateSwapExactAmountOutRequest>, I>>(
    base?: I,
  ): EstimateSwapExactAmountOutRequest {
    return EstimateSwapExactAmountOutRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSwapExactAmountOutRequest>, I>>(
    object: I,
  ): EstimateSwapExactAmountOutRequest {
    const message = createBaseEstimateSwapExactAmountOutRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.routes = object.routes?.map((e) => SwapAmountOutRoute.fromPartial(e)) || [];
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
};

function createBaseEstimateSwapExactAmountOutWithPrimitiveTypesRequest(): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
  return { poolId: Long.UZERO, routesPoolId: [], routesTokenInDenom: [], tokenOut: "" };
}

export const EstimateSwapExactAmountOutWithPrimitiveTypesRequest = {
  encode(
    message: EstimateSwapExactAmountOutWithPrimitiveTypesRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    writer.uint32(18).fork();
    for (const v of message.routesPoolId) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.routesTokenInDenom) {
      writer.uint32(26).string(v!);
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountOutWithPrimitiveTypesRequest();
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
          if (tag === 16) {
            message.routesPoolId.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.routesPoolId.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.routesTokenInDenom.push(reader.string());
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

  fromJSON(object: any): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      routesPoolId: globalThis.Array.isArray(object?.routesPoolId)
        ? object.routesPoolId.map((e: any) => Long.fromValue(e))
        : [],
      routesTokenInDenom: globalThis.Array.isArray(object?.routesTokenInDenom)
        ? object.routesTokenInDenom.map((e: any) => globalThis.String(e))
        : [],
      tokenOut: isSet(object.tokenOut) ? globalThis.String(object.tokenOut) : "",
    };
  },

  toJSON(message: EstimateSwapExactAmountOutWithPrimitiveTypesRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.routesPoolId?.length) {
      obj.routesPoolId = message.routesPoolId.map((e) => (e || Long.UZERO).toString());
    }
    if (message.routesTokenInDenom?.length) {
      obj.routesTokenInDenom = message.routesTokenInDenom;
    }
    if (message.tokenOut !== "") {
      obj.tokenOut = message.tokenOut;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateSwapExactAmountOutWithPrimitiveTypesRequest>, I>>(
    base?: I,
  ): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
    return EstimateSwapExactAmountOutWithPrimitiveTypesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSwapExactAmountOutWithPrimitiveTypesRequest>, I>>(
    object: I,
  ): EstimateSwapExactAmountOutWithPrimitiveTypesRequest {
    const message = createBaseEstimateSwapExactAmountOutWithPrimitiveTypesRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.routesPoolId = object.routesPoolId?.map((e) => Long.fromValue(e)) || [];
    message.routesTokenInDenom = object.routesTokenInDenom?.map((e) => e) || [];
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
};

function createBaseEstimateSinglePoolSwapExactAmountOutRequest(): EstimateSinglePoolSwapExactAmountOutRequest {
  return { poolId: Long.UZERO, tokenInDenom: "", tokenOut: "" };
}

export const EstimateSinglePoolSwapExactAmountOutRequest = {
  encode(message: EstimateSinglePoolSwapExactAmountOutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(18).string(message.tokenInDenom);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSinglePoolSwapExactAmountOutRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSinglePoolSwapExactAmountOutRequest();
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
          if (tag !== 26) {
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

  fromJSON(object: any): EstimateSinglePoolSwapExactAmountOutRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      tokenInDenom: isSet(object.tokenInDenom) ? globalThis.String(object.tokenInDenom) : "",
      tokenOut: isSet(object.tokenOut) ? globalThis.String(object.tokenOut) : "",
    };
  },

  toJSON(message: EstimateSinglePoolSwapExactAmountOutRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.tokenInDenom !== "") {
      obj.tokenInDenom = message.tokenInDenom;
    }
    if (message.tokenOut !== "") {
      obj.tokenOut = message.tokenOut;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateSinglePoolSwapExactAmountOutRequest>, I>>(
    base?: I,
  ): EstimateSinglePoolSwapExactAmountOutRequest {
    return EstimateSinglePoolSwapExactAmountOutRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSinglePoolSwapExactAmountOutRequest>, I>>(
    object: I,
  ): EstimateSinglePoolSwapExactAmountOutRequest {
    const message = createBaseEstimateSinglePoolSwapExactAmountOutRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.tokenInDenom = object.tokenInDenom ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
};

function createBaseEstimateSwapExactAmountOutResponse(): EstimateSwapExactAmountOutResponse {
  return { tokenInAmount: "" };
}

export const EstimateSwapExactAmountOutResponse = {
  encode(message: EstimateSwapExactAmountOutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSwapExactAmountOutResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountOutResponse();
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

  fromJSON(object: any): EstimateSwapExactAmountOutResponse {
    return { tokenInAmount: isSet(object.tokenInAmount) ? globalThis.String(object.tokenInAmount) : "" };
  },

  toJSON(message: EstimateSwapExactAmountOutResponse): unknown {
    const obj: any = {};
    if (message.tokenInAmount !== "") {
      obj.tokenInAmount = message.tokenInAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateSwapExactAmountOutResponse>, I>>(
    base?: I,
  ): EstimateSwapExactAmountOutResponse {
    return EstimateSwapExactAmountOutResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSwapExactAmountOutResponse>, I>>(
    object: I,
  ): EstimateSwapExactAmountOutResponse {
    const message = createBaseEstimateSwapExactAmountOutResponse();
    message.tokenInAmount = object.tokenInAmount ?? "";
    return message;
  },
};

function createBaseNumPoolsRequest(): NumPoolsRequest {
  return {};
}

export const NumPoolsRequest = {
  encode(_: NumPoolsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumPoolsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumPoolsRequest();
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

  fromJSON(_: any): NumPoolsRequest {
    return {};
  },

  toJSON(_: NumPoolsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<NumPoolsRequest>, I>>(base?: I): NumPoolsRequest {
    return NumPoolsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NumPoolsRequest>, I>>(_: I): NumPoolsRequest {
    const message = createBaseNumPoolsRequest();
    return message;
  },
};

function createBaseNumPoolsResponse(): NumPoolsResponse {
  return { numPools: Long.UZERO };
}

export const NumPoolsResponse = {
  encode(message: NumPoolsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.numPools.isZero()) {
      writer.uint32(8).uint64(message.numPools);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NumPoolsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumPoolsResponse();
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

  fromJSON(object: any): NumPoolsResponse {
    return { numPools: isSet(object.numPools) ? Long.fromValue(object.numPools) : Long.UZERO };
  },

  toJSON(message: NumPoolsResponse): unknown {
    const obj: any = {};
    if (!message.numPools.isZero()) {
      obj.numPools = (message.numPools || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NumPoolsResponse>, I>>(base?: I): NumPoolsResponse {
    return NumPoolsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NumPoolsResponse>, I>>(object: I): NumPoolsResponse {
    const message = createBaseNumPoolsResponse();
    message.numPools = (object.numPools !== undefined && object.numPools !== null)
      ? Long.fromValue(object.numPools)
      : Long.UZERO;
    return message;
  },
};

function createBasePoolRequest(): PoolRequest {
  return { poolId: Long.UZERO };
}

export const PoolRequest = {
  encode(message: PoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolRequest();
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

  fromJSON(object: any): PoolRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: PoolRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolRequest>, I>>(base?: I): PoolRequest {
    return PoolRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolRequest>, I>>(object: I): PoolRequest {
    const message = createBasePoolRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBasePoolResponse(): PoolResponse {
  return { pool: undefined };
}

export const PoolResponse = {
  encode(message: PoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pool !== undefined) {
      Any.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolResponse();
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

  fromJSON(object: any): PoolResponse {
    return { pool: isSet(object.pool) ? Any.fromJSON(object.pool) : undefined };
  },

  toJSON(message: PoolResponse): unknown {
    const obj: any = {};
    if (message.pool !== undefined) {
      obj.pool = Any.toJSON(message.pool);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolResponse>, I>>(base?: I): PoolResponse {
    return PoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolResponse>, I>>(object: I): PoolResponse {
    const message = createBasePoolResponse();
    message.pool = (object.pool !== undefined && object.pool !== null) ? Any.fromPartial(object.pool) : undefined;
    return message;
  },
};

function createBaseAllPoolsRequest(): AllPoolsRequest {
  return {};
}

export const AllPoolsRequest = {
  encode(_: AllPoolsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllPoolsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllPoolsRequest();
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

  fromJSON(_: any): AllPoolsRequest {
    return {};
  },

  toJSON(_: AllPoolsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AllPoolsRequest>, I>>(base?: I): AllPoolsRequest {
    return AllPoolsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AllPoolsRequest>, I>>(_: I): AllPoolsRequest {
    const message = createBaseAllPoolsRequest();
    return message;
  },
};

function createBaseAllPoolsResponse(): AllPoolsResponse {
  return { pools: [] };
}

export const AllPoolsResponse = {
  encode(message: AllPoolsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pools) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllPoolsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pools.push(Any.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllPoolsResponse {
    return { pools: globalThis.Array.isArray(object?.pools) ? object.pools.map((e: any) => Any.fromJSON(e)) : [] };
  },

  toJSON(message: AllPoolsResponse): unknown {
    const obj: any = {};
    if (message.pools?.length) {
      obj.pools = message.pools.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AllPoolsResponse>, I>>(base?: I): AllPoolsResponse {
    return AllPoolsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AllPoolsResponse>, I>>(object: I): AllPoolsResponse {
    const message = createBaseAllPoolsResponse();
    message.pools = object.pools?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListPoolsByDenomRequest(): ListPoolsByDenomRequest {
  return { denom: "" };
}

export const ListPoolsByDenomRequest = {
  encode(message: ListPoolsByDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPoolsByDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPoolsByDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListPoolsByDenomRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: ListPoolsByDenomRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListPoolsByDenomRequest>, I>>(base?: I): ListPoolsByDenomRequest {
    return ListPoolsByDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListPoolsByDenomRequest>, I>>(object: I): ListPoolsByDenomRequest {
    const message = createBaseListPoolsByDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseListPoolsByDenomResponse(): ListPoolsByDenomResponse {
  return { pools: [] };
}

export const ListPoolsByDenomResponse = {
  encode(message: ListPoolsByDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pools) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPoolsByDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPoolsByDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pools.push(Any.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListPoolsByDenomResponse {
    return { pools: globalThis.Array.isArray(object?.pools) ? object.pools.map((e: any) => Any.fromJSON(e)) : [] };
  },

  toJSON(message: ListPoolsByDenomResponse): unknown {
    const obj: any = {};
    if (message.pools?.length) {
      obj.pools = message.pools.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ListPoolsByDenomResponse>, I>>(base?: I): ListPoolsByDenomResponse {
    return ListPoolsByDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ListPoolsByDenomResponse>, I>>(object: I): ListPoolsByDenomResponse {
    const message = createBaseListPoolsByDenomResponse();
    message.pools = object.pools?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSpotPriceRequest(): SpotPriceRequest {
  return { poolId: Long.UZERO, baseAssetDenom: "", quoteAssetDenom: "" };
}

export const SpotPriceRequest = {
  encode(message: SpotPriceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SpotPriceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotPriceRequest();
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

  fromJSON(object: any): SpotPriceRequest {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      baseAssetDenom: isSet(object.baseAssetDenom) ? globalThis.String(object.baseAssetDenom) : "",
      quoteAssetDenom: isSet(object.quoteAssetDenom) ? globalThis.String(object.quoteAssetDenom) : "",
    };
  },

  toJSON(message: SpotPriceRequest): unknown {
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

  create<I extends Exact<DeepPartial<SpotPriceRequest>, I>>(base?: I): SpotPriceRequest {
    return SpotPriceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SpotPriceRequest>, I>>(object: I): SpotPriceRequest {
    const message = createBaseSpotPriceRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.baseAssetDenom = object.baseAssetDenom ?? "";
    message.quoteAssetDenom = object.quoteAssetDenom ?? "";
    return message;
  },
};

function createBaseSpotPriceResponse(): SpotPriceResponse {
  return { spotPrice: "" };
}

export const SpotPriceResponse = {
  encode(message: SpotPriceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.spotPrice !== "") {
      writer.uint32(10).string(message.spotPrice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SpotPriceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpotPriceResponse();
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

  fromJSON(object: any): SpotPriceResponse {
    return { spotPrice: isSet(object.spotPrice) ? globalThis.String(object.spotPrice) : "" };
  },

  toJSON(message: SpotPriceResponse): unknown {
    const obj: any = {};
    if (message.spotPrice !== "") {
      obj.spotPrice = message.spotPrice;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SpotPriceResponse>, I>>(base?: I): SpotPriceResponse {
    return SpotPriceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SpotPriceResponse>, I>>(object: I): SpotPriceResponse {
    const message = createBaseSpotPriceResponse();
    message.spotPrice = object.spotPrice ?? "";
    return message;
  },
};

function createBaseTotalPoolLiquidityRequest(): TotalPoolLiquidityRequest {
  return { poolId: Long.UZERO };
}

export const TotalPoolLiquidityRequest = {
  encode(message: TotalPoolLiquidityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalPoolLiquidityRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalPoolLiquidityRequest();
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

  fromJSON(object: any): TotalPoolLiquidityRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: TotalPoolLiquidityRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalPoolLiquidityRequest>, I>>(base?: I): TotalPoolLiquidityRequest {
    return TotalPoolLiquidityRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalPoolLiquidityRequest>, I>>(object: I): TotalPoolLiquidityRequest {
    const message = createBaseTotalPoolLiquidityRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseTotalPoolLiquidityResponse(): TotalPoolLiquidityResponse {
  return { liquidity: [] };
}

export const TotalPoolLiquidityResponse = {
  encode(message: TotalPoolLiquidityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalPoolLiquidityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalPoolLiquidityResponse();
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

  fromJSON(object: any): TotalPoolLiquidityResponse {
    return {
      liquidity: globalThis.Array.isArray(object?.liquidity) ? object.liquidity.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: TotalPoolLiquidityResponse): unknown {
    const obj: any = {};
    if (message.liquidity?.length) {
      obj.liquidity = message.liquidity.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalPoolLiquidityResponse>, I>>(base?: I): TotalPoolLiquidityResponse {
    return TotalPoolLiquidityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalPoolLiquidityResponse>, I>>(object: I): TotalPoolLiquidityResponse {
    const message = createBaseTotalPoolLiquidityResponse();
    message.liquidity = object.liquidity?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTotalLiquidityRequest(): TotalLiquidityRequest {
  return {};
}

export const TotalLiquidityRequest = {
  encode(_: TotalLiquidityRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalLiquidityRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalLiquidityRequest();
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

  fromJSON(_: any): TotalLiquidityRequest {
    return {};
  },

  toJSON(_: TotalLiquidityRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalLiquidityRequest>, I>>(base?: I): TotalLiquidityRequest {
    return TotalLiquidityRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalLiquidityRequest>, I>>(_: I): TotalLiquidityRequest {
    const message = createBaseTotalLiquidityRequest();
    return message;
  },
};

function createBaseTotalLiquidityResponse(): TotalLiquidityResponse {
  return { liquidity: [] };
}

export const TotalLiquidityResponse = {
  encode(message: TotalLiquidityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalLiquidityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalLiquidityResponse();
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

  fromJSON(object: any): TotalLiquidityResponse {
    return {
      liquidity: globalThis.Array.isArray(object?.liquidity) ? object.liquidity.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: TotalLiquidityResponse): unknown {
    const obj: any = {};
    if (message.liquidity?.length) {
      obj.liquidity = message.liquidity.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalLiquidityResponse>, I>>(base?: I): TotalLiquidityResponse {
    return TotalLiquidityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalLiquidityResponse>, I>>(object: I): TotalLiquidityResponse {
    const message = createBaseTotalLiquidityResponse();
    message.liquidity = object.liquidity?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTotalVolumeForPoolRequest(): TotalVolumeForPoolRequest {
  return { poolId: Long.UZERO };
}

export const TotalVolumeForPoolRequest = {
  encode(message: TotalVolumeForPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalVolumeForPoolRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalVolumeForPoolRequest();
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

  fromJSON(object: any): TotalVolumeForPoolRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: TotalVolumeForPoolRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalVolumeForPoolRequest>, I>>(base?: I): TotalVolumeForPoolRequest {
    return TotalVolumeForPoolRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalVolumeForPoolRequest>, I>>(object: I): TotalVolumeForPoolRequest {
    const message = createBaseTotalVolumeForPoolRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseTotalVolumeForPoolResponse(): TotalVolumeForPoolResponse {
  return { volume: [] };
}

export const TotalVolumeForPoolResponse = {
  encode(message: TotalVolumeForPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.volume) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalVolumeForPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalVolumeForPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.volume.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TotalVolumeForPoolResponse {
    return { volume: globalThis.Array.isArray(object?.volume) ? object.volume.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: TotalVolumeForPoolResponse): unknown {
    const obj: any = {};
    if (message.volume?.length) {
      obj.volume = message.volume.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalVolumeForPoolResponse>, I>>(base?: I): TotalVolumeForPoolResponse {
    return TotalVolumeForPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalVolumeForPoolResponse>, I>>(object: I): TotalVolumeForPoolResponse {
    const message = createBaseTotalVolumeForPoolResponse();
    message.volume = object.volume?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTradingPairTakerFeeRequest(): TradingPairTakerFeeRequest {
  return { denom0: "", denom1: "" };
}

export const TradingPairTakerFeeRequest = {
  encode(message: TradingPairTakerFeeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom0 !== "") {
      writer.uint32(10).string(message.denom0);
    }
    if (message.denom1 !== "") {
      writer.uint32(18).string(message.denom1);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TradingPairTakerFeeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradingPairTakerFeeRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TradingPairTakerFeeRequest {
    return {
      denom0: isSet(object.denom0) ? globalThis.String(object.denom0) : "",
      denom1: isSet(object.denom1) ? globalThis.String(object.denom1) : "",
    };
  },

  toJSON(message: TradingPairTakerFeeRequest): unknown {
    const obj: any = {};
    if (message.denom0 !== "") {
      obj.denom0 = message.denom0;
    }
    if (message.denom1 !== "") {
      obj.denom1 = message.denom1;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TradingPairTakerFeeRequest>, I>>(base?: I): TradingPairTakerFeeRequest {
    return TradingPairTakerFeeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TradingPairTakerFeeRequest>, I>>(object: I): TradingPairTakerFeeRequest {
    const message = createBaseTradingPairTakerFeeRequest();
    message.denom0 = object.denom0 ?? "";
    message.denom1 = object.denom1 ?? "";
    return message;
  },
};

function createBaseTradingPairTakerFeeResponse(): TradingPairTakerFeeResponse {
  return { takerFee: "" };
}

export const TradingPairTakerFeeResponse = {
  encode(message: TradingPairTakerFeeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.takerFee !== "") {
      writer.uint32(10).string(message.takerFee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TradingPairTakerFeeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradingPairTakerFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.takerFee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TradingPairTakerFeeResponse {
    return { takerFee: isSet(object.takerFee) ? globalThis.String(object.takerFee) : "" };
  },

  toJSON(message: TradingPairTakerFeeResponse): unknown {
    const obj: any = {};
    if (message.takerFee !== "") {
      obj.takerFee = message.takerFee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TradingPairTakerFeeResponse>, I>>(base?: I): TradingPairTakerFeeResponse {
    return TradingPairTakerFeeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TradingPairTakerFeeResponse>, I>>(object: I): TradingPairTakerFeeResponse {
    const message = createBaseTradingPairTakerFeeResponse();
    message.takerFee = object.takerFee ?? "";
    return message;
  },
};

function createBaseEstimateTradeBasedOnPriceImpactRequest(): EstimateTradeBasedOnPriceImpactRequest {
  return { fromCoin: undefined, toCoinDenom: "", poolId: Long.UZERO, maxPriceImpact: "", externalPrice: "" };
}

export const EstimateTradeBasedOnPriceImpactRequest = {
  encode(message: EstimateTradeBasedOnPriceImpactRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fromCoin !== undefined) {
      Coin.encode(message.fromCoin, writer.uint32(10).fork()).ldelim();
    }
    if (message.toCoinDenom !== "") {
      writer.uint32(18).string(message.toCoinDenom);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(24).uint64(message.poolId);
    }
    if (message.maxPriceImpact !== "") {
      writer.uint32(34).string(message.maxPriceImpact);
    }
    if (message.externalPrice !== "") {
      writer.uint32(42).string(message.externalPrice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateTradeBasedOnPriceImpactRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateTradeBasedOnPriceImpactRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fromCoin = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.toCoinDenom = reader.string();
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

          message.maxPriceImpact = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.externalPrice = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EstimateTradeBasedOnPriceImpactRequest {
    return {
      fromCoin: isSet(object.fromCoin) ? Coin.fromJSON(object.fromCoin) : undefined,
      toCoinDenom: isSet(object.toCoinDenom) ? globalThis.String(object.toCoinDenom) : "",
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      maxPriceImpact: isSet(object.maxPriceImpact) ? globalThis.String(object.maxPriceImpact) : "",
      externalPrice: isSet(object.externalPrice) ? globalThis.String(object.externalPrice) : "",
    };
  },

  toJSON(message: EstimateTradeBasedOnPriceImpactRequest): unknown {
    const obj: any = {};
    if (message.fromCoin !== undefined) {
      obj.fromCoin = Coin.toJSON(message.fromCoin);
    }
    if (message.toCoinDenom !== "") {
      obj.toCoinDenom = message.toCoinDenom;
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.maxPriceImpact !== "") {
      obj.maxPriceImpact = message.maxPriceImpact;
    }
    if (message.externalPrice !== "") {
      obj.externalPrice = message.externalPrice;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateTradeBasedOnPriceImpactRequest>, I>>(
    base?: I,
  ): EstimateTradeBasedOnPriceImpactRequest {
    return EstimateTradeBasedOnPriceImpactRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateTradeBasedOnPriceImpactRequest>, I>>(
    object: I,
  ): EstimateTradeBasedOnPriceImpactRequest {
    const message = createBaseEstimateTradeBasedOnPriceImpactRequest();
    message.fromCoin = (object.fromCoin !== undefined && object.fromCoin !== null)
      ? Coin.fromPartial(object.fromCoin)
      : undefined;
    message.toCoinDenom = object.toCoinDenom ?? "";
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.maxPriceImpact = object.maxPriceImpact ?? "";
    message.externalPrice = object.externalPrice ?? "";
    return message;
  },
};

function createBaseEstimateTradeBasedOnPriceImpactResponse(): EstimateTradeBasedOnPriceImpactResponse {
  return { inputCoin: undefined, outputCoin: undefined };
}

export const EstimateTradeBasedOnPriceImpactResponse = {
  encode(message: EstimateTradeBasedOnPriceImpactResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inputCoin !== undefined) {
      Coin.encode(message.inputCoin, writer.uint32(10).fork()).ldelim();
    }
    if (message.outputCoin !== undefined) {
      Coin.encode(message.outputCoin, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateTradeBasedOnPriceImpactResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateTradeBasedOnPriceImpactResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.inputCoin = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.outputCoin = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EstimateTradeBasedOnPriceImpactResponse {
    return {
      inputCoin: isSet(object.inputCoin) ? Coin.fromJSON(object.inputCoin) : undefined,
      outputCoin: isSet(object.outputCoin) ? Coin.fromJSON(object.outputCoin) : undefined,
    };
  },

  toJSON(message: EstimateTradeBasedOnPriceImpactResponse): unknown {
    const obj: any = {};
    if (message.inputCoin !== undefined) {
      obj.inputCoin = Coin.toJSON(message.inputCoin);
    }
    if (message.outputCoin !== undefined) {
      obj.outputCoin = Coin.toJSON(message.outputCoin);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateTradeBasedOnPriceImpactResponse>, I>>(
    base?: I,
  ): EstimateTradeBasedOnPriceImpactResponse {
    return EstimateTradeBasedOnPriceImpactResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateTradeBasedOnPriceImpactResponse>, I>>(
    object: I,
  ): EstimateTradeBasedOnPriceImpactResponse {
    const message = createBaseEstimateTradeBasedOnPriceImpactResponse();
    message.inputCoin = (object.inputCoin !== undefined && object.inputCoin !== null)
      ? Coin.fromPartial(object.inputCoin)
      : undefined;
    message.outputCoin = (object.outputCoin !== undefined && object.outputCoin !== null)
      ? Coin.fromPartial(object.outputCoin)
      : undefined;
    return message;
  },
};

export interface Query {
  Params(request: ParamsRequest): Promise<ParamsResponse>;
  /** Estimates swap amount out given in. */
  EstimateSwapExactAmountIn(request: EstimateSwapExactAmountInRequest): Promise<EstimateSwapExactAmountInResponse>;
  /**
   * EstimateSwapExactAmountInWithPrimitiveTypes is an alternative query for
   * EstimateSwapExactAmountIn. Supports query via GRPC-Gateway by using
   * primitive types instead of repeated structs. Each index in the
   * routes_pool_id field corresponds to the respective routes_token_out_denom
   * value, thus they are required to have the same length and are grouped
   * together as pairs.
   * example usage:
   * http://0.0.0.0:1317/osmosis/poolmanager/v1beta1/1/estimate/
   * swap_exact_amount_in_with_primitive_types?token_in=100000stake&routes_token_out_denom=uatom
   * &routes_token_out_denom=uion&routes_pool_id=1&routes_pool_id=2
   */
  EstimateSwapExactAmountInWithPrimitiveTypes(
    request: EstimateSwapExactAmountInWithPrimitiveTypesRequest,
  ): Promise<EstimateSwapExactAmountInResponse>;
  EstimateSinglePoolSwapExactAmountIn(
    request: EstimateSinglePoolSwapExactAmountInRequest,
  ): Promise<EstimateSwapExactAmountInResponse>;
  /** Estimates swap amount in given out. */
  EstimateSwapExactAmountOut(request: EstimateSwapExactAmountOutRequest): Promise<EstimateSwapExactAmountOutResponse>;
  /** Estimates swap amount in given out. */
  EstimateSwapExactAmountOutWithPrimitiveTypes(
    request: EstimateSwapExactAmountOutWithPrimitiveTypesRequest,
  ): Promise<EstimateSwapExactAmountOutResponse>;
  EstimateSinglePoolSwapExactAmountOut(
    request: EstimateSinglePoolSwapExactAmountOutRequest,
  ): Promise<EstimateSwapExactAmountOutResponse>;
  /** Returns the total number of pools existing in Osmosis. */
  NumPools(request: NumPoolsRequest): Promise<NumPoolsResponse>;
  /** Pool returns the Pool specified by the pool id */
  Pool(request: PoolRequest): Promise<PoolResponse>;
  /** AllPools returns all pools on the Osmosis chain sorted by IDs. */
  AllPools(request: AllPoolsRequest): Promise<AllPoolsResponse>;
  /** ListPoolsByDenom return all pools by denom */
  ListPoolsByDenom(request: ListPoolsByDenomRequest): Promise<ListPoolsByDenomResponse>;
  /**
   * SpotPrice defines a gRPC query handler that returns the spot price given
   * a base denomination and a quote denomination.
   */
  SpotPrice(request: SpotPriceRequest): Promise<SpotPriceResponse>;
  /** TotalPoolLiquidity returns the total liquidity of the specified pool. */
  TotalPoolLiquidity(request: TotalPoolLiquidityRequest): Promise<TotalPoolLiquidityResponse>;
  /** TotalLiquidity returns the total liquidity across all pools. */
  TotalLiquidity(request: TotalLiquidityRequest): Promise<TotalLiquidityResponse>;
  /** TotalVolumeForPool returns the total volume of the specified pool. */
  TotalVolumeForPool(request: TotalVolumeForPoolRequest): Promise<TotalVolumeForPoolResponse>;
  /** TradingPairTakerFee returns the taker fee for a given set of denoms */
  TradingPairTakerFee(request: TradingPairTakerFeeRequest): Promise<TradingPairTakerFeeResponse>;
  /**
   * EstimateTradeBasedOnPriceImpact returns an estimated trade based on price
   * impact, if a trade cannot be estimated a 0 input and 0 output would be
   * returned.
   */
  EstimateTradeBasedOnPriceImpact(
    request: EstimateTradeBasedOnPriceImpactRequest,
  ): Promise<EstimateTradeBasedOnPriceImpactResponse>;
}

export const QueryServiceName = "osmosis.poolmanager.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.EstimateSwapExactAmountIn = this.EstimateSwapExactAmountIn.bind(this);
    this.EstimateSwapExactAmountInWithPrimitiveTypes = this.EstimateSwapExactAmountInWithPrimitiveTypes.bind(this);
    this.EstimateSinglePoolSwapExactAmountIn = this.EstimateSinglePoolSwapExactAmountIn.bind(this);
    this.EstimateSwapExactAmountOut = this.EstimateSwapExactAmountOut.bind(this);
    this.EstimateSwapExactAmountOutWithPrimitiveTypes = this.EstimateSwapExactAmountOutWithPrimitiveTypes.bind(this);
    this.EstimateSinglePoolSwapExactAmountOut = this.EstimateSinglePoolSwapExactAmountOut.bind(this);
    this.NumPools = this.NumPools.bind(this);
    this.Pool = this.Pool.bind(this);
    this.AllPools = this.AllPools.bind(this);
    this.ListPoolsByDenom = this.ListPoolsByDenom.bind(this);
    this.SpotPrice = this.SpotPrice.bind(this);
    this.TotalPoolLiquidity = this.TotalPoolLiquidity.bind(this);
    this.TotalLiquidity = this.TotalLiquidity.bind(this);
    this.TotalVolumeForPool = this.TotalVolumeForPool.bind(this);
    this.TradingPairTakerFee = this.TradingPairTakerFee.bind(this);
    this.EstimateTradeBasedOnPriceImpact = this.EstimateTradeBasedOnPriceImpact.bind(this);
  }
  Params(request: ParamsRequest): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => ParamsResponse.decode(_m0.Reader.create(data)));
  }

  EstimateSwapExactAmountIn(request: EstimateSwapExactAmountInRequest): Promise<EstimateSwapExactAmountInResponse> {
    const data = EstimateSwapExactAmountInRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateSwapExactAmountIn", data);
    return promise.then((data) => EstimateSwapExactAmountInResponse.decode(_m0.Reader.create(data)));
  }

  EstimateSwapExactAmountInWithPrimitiveTypes(
    request: EstimateSwapExactAmountInWithPrimitiveTypesRequest,
  ): Promise<EstimateSwapExactAmountInResponse> {
    const data = EstimateSwapExactAmountInWithPrimitiveTypesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateSwapExactAmountInWithPrimitiveTypes", data);
    return promise.then((data) => EstimateSwapExactAmountInResponse.decode(_m0.Reader.create(data)));
  }

  EstimateSinglePoolSwapExactAmountIn(
    request: EstimateSinglePoolSwapExactAmountInRequest,
  ): Promise<EstimateSwapExactAmountInResponse> {
    const data = EstimateSinglePoolSwapExactAmountInRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateSinglePoolSwapExactAmountIn", data);
    return promise.then((data) => EstimateSwapExactAmountInResponse.decode(_m0.Reader.create(data)));
  }

  EstimateSwapExactAmountOut(request: EstimateSwapExactAmountOutRequest): Promise<EstimateSwapExactAmountOutResponse> {
    const data = EstimateSwapExactAmountOutRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateSwapExactAmountOut", data);
    return promise.then((data) => EstimateSwapExactAmountOutResponse.decode(_m0.Reader.create(data)));
  }

  EstimateSwapExactAmountOutWithPrimitiveTypes(
    request: EstimateSwapExactAmountOutWithPrimitiveTypesRequest,
  ): Promise<EstimateSwapExactAmountOutResponse> {
    const data = EstimateSwapExactAmountOutWithPrimitiveTypesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateSwapExactAmountOutWithPrimitiveTypes", data);
    return promise.then((data) => EstimateSwapExactAmountOutResponse.decode(_m0.Reader.create(data)));
  }

  EstimateSinglePoolSwapExactAmountOut(
    request: EstimateSinglePoolSwapExactAmountOutRequest,
  ): Promise<EstimateSwapExactAmountOutResponse> {
    const data = EstimateSinglePoolSwapExactAmountOutRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateSinglePoolSwapExactAmountOut", data);
    return promise.then((data) => EstimateSwapExactAmountOutResponse.decode(_m0.Reader.create(data)));
  }

  NumPools(request: NumPoolsRequest): Promise<NumPoolsResponse> {
    const data = NumPoolsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NumPools", data);
    return promise.then((data) => NumPoolsResponse.decode(_m0.Reader.create(data)));
  }

  Pool(request: PoolRequest): Promise<PoolResponse> {
    const data = PoolRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Pool", data);
    return promise.then((data) => PoolResponse.decode(_m0.Reader.create(data)));
  }

  AllPools(request: AllPoolsRequest): Promise<AllPoolsResponse> {
    const data = AllPoolsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AllPools", data);
    return promise.then((data) => AllPoolsResponse.decode(_m0.Reader.create(data)));
  }

  ListPoolsByDenom(request: ListPoolsByDenomRequest): Promise<ListPoolsByDenomResponse> {
    const data = ListPoolsByDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListPoolsByDenom", data);
    return promise.then((data) => ListPoolsByDenomResponse.decode(_m0.Reader.create(data)));
  }

  SpotPrice(request: SpotPriceRequest): Promise<SpotPriceResponse> {
    const data = SpotPriceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SpotPrice", data);
    return promise.then((data) => SpotPriceResponse.decode(_m0.Reader.create(data)));
  }

  TotalPoolLiquidity(request: TotalPoolLiquidityRequest): Promise<TotalPoolLiquidityResponse> {
    const data = TotalPoolLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalPoolLiquidity", data);
    return promise.then((data) => TotalPoolLiquidityResponse.decode(_m0.Reader.create(data)));
  }

  TotalLiquidity(request: TotalLiquidityRequest): Promise<TotalLiquidityResponse> {
    const data = TotalLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalLiquidity", data);
    return promise.then((data) => TotalLiquidityResponse.decode(_m0.Reader.create(data)));
  }

  TotalVolumeForPool(request: TotalVolumeForPoolRequest): Promise<TotalVolumeForPoolResponse> {
    const data = TotalVolumeForPoolRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalVolumeForPool", data);
    return promise.then((data) => TotalVolumeForPoolResponse.decode(_m0.Reader.create(data)));
  }

  TradingPairTakerFee(request: TradingPairTakerFeeRequest): Promise<TradingPairTakerFeeResponse> {
    const data = TradingPairTakerFeeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TradingPairTakerFee", data);
    return promise.then((data) => TradingPairTakerFeeResponse.decode(_m0.Reader.create(data)));
  }

  EstimateTradeBasedOnPriceImpact(
    request: EstimateTradeBasedOnPriceImpactRequest,
  ): Promise<EstimateTradeBasedOnPriceImpactResponse> {
    const data = EstimateTradeBasedOnPriceImpactRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateTradeBasedOnPriceImpact", data);
    return promise.then((data) => EstimateTradeBasedOnPriceImpactResponse.decode(_m0.Reader.create(data)));
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
