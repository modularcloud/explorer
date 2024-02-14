/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "./params";
import { AllProtocolRevenue, BaseDenom, InfoByPoolType, RouteStatistics, TokenPairArbRoutes } from "./protorev";

export const protobufPackage = "osmosis.protorev.v1beta1";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

/**
 * QueryGetProtoRevNumberOfTradesRequest is request type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesRequest {
}

/**
 * QueryGetProtoRevNumberOfTradesResponse is response type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesResponse {
  /** number_of_trades is the number of trades the module has executed */
  numberOfTrades: string;
}

/**
 * QueryGetProtoRevProfitsByDenomRequest is request type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomRequest {
  /** denom is the denom to query profits by */
  denom: string;
}

/**
 * QueryGetProtoRevProfitsByDenomResponse is response type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomResponse {
  /** profit is the profits of the module by the selected denom */
  profit: Coin | undefined;
}

/**
 * QueryGetProtoRevAllProfitsRequest is request type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsRequest {
}

/**
 * QueryGetProtoRevAllProfitsResponse is response type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsResponse {
  /** profits is a list of all of the profits from the module */
  profits: Coin[];
}

/**
 * QueryGetProtoRevStatisticsByPoolRequest is request type for the
 * Query/GetProtoRevStatisticsByRoute RPC method.
 */
export interface QueryGetProtoRevStatisticsByRouteRequest {
  /** route is the set of pool ids to query statistics by i.e. 1,2,3 */
  route: Long[];
}

/**
 * QueryGetProtoRevStatisticsByRouteResponse is response type for the
 * Query/GetProtoRevStatisticsByRoute RPC method.
 */
export interface QueryGetProtoRevStatisticsByRouteResponse {
  /**
   * statistics contains the number of trades the module has executed after a
   * swap on a given pool and the profits from the trades
   */
  statistics: RouteStatistics | undefined;
}

/**
 * QueryGetProtoRevAllRouteStatisticsRequest is request type for the
 * Query/GetProtoRevAllRouteStatistics RPC method.
 */
export interface QueryGetProtoRevAllRouteStatisticsRequest {
}

/**
 * QueryGetProtoRevAllRouteStatisticsResponse is response type for the
 * Query/GetProtoRevAllRouteStatistics RPC method.
 */
export interface QueryGetProtoRevAllRouteStatisticsResponse {
  /**
   * statistics contains the number of trades/profits the module has executed on
   * all routes it has successfully executed a trade on
   */
  statistics: RouteStatistics[];
}

/**
 * QueryGetProtoRevTokenPairArbRoutesRequest is request type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesRequest {
}

/**
 * QueryGetProtoRevTokenPairArbRoutesResponse is response type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesResponse {
  /**
   * routes is a list of all of the hot routes that the module is currently
   * arbitraging
   */
  routes: TokenPairArbRoutes[];
}

/**
 * QueryGetProtoRevAdminAccountRequest is request type for the
 * Query/GetProtoRevAdminAccount RPC method.
 */
export interface QueryGetProtoRevAdminAccountRequest {
}

/**
 * QueryGetProtoRevAdminAccountResponse is response type for the
 * Query/GetProtoRevAdminAccount RPC method.
 */
export interface QueryGetProtoRevAdminAccountResponse {
  /** admin_account is the admin account of the module */
  adminAccount: string;
}

/**
 * QueryGetProtoRevDeveloperAccountRequest is request type for the
 * Query/GetProtoRevDeveloperAccount RPC method.
 */
export interface QueryGetProtoRevDeveloperAccountRequest {
}

/**
 * QueryGetProtoRevDeveloperAccountResponse is response type for the
 * Query/GetProtoRevDeveloperAccount RPC method.
 */
export interface QueryGetProtoRevDeveloperAccountResponse {
  /** developer_account is the developer account of the module */
  developerAccount: string;
}

/**
 * QueryGetProtoRevInfoByPoolTypeRequest is request type for the
 * Query/GetProtoRevInfoByPoolType RPC method.
 */
export interface QueryGetProtoRevInfoByPoolTypeRequest {
}

/**
 * QueryGetProtoRevInfoByPoolTypeResponse is response type for the
 * Query/GetProtoRevInfoByPoolType RPC method.
 */
export interface QueryGetProtoRevInfoByPoolTypeResponse {
  /**
   * InfoByPoolType contains all information pertaining to how different
   * pool types are handled by the module.
   */
  infoByPoolType: InfoByPoolType | undefined;
}

/**
 * QueryGetProtoRevMaxPoolPointsPerBlockRequest is request type for the
 * Query/GetProtoRevMaxPoolPointsPerBlock RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerBlockRequest {
}

/**
 * QueryGetProtoRevMaxPoolPointsPerBlockResponse is response type for the
 * Query/GetProtoRevMaxPoolPointsPerBlock RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerBlockResponse {
  /**
   * max_pool_points_per_block is the maximum number of pool points that can be
   * consumed per block
   */
  maxPoolPointsPerBlock: Long;
}

/**
 * QueryGetProtoRevMaxPoolPointsPerTxRequest is request type for the
 * Query/GetProtoRevMaxPoolPointsPerTx RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerTxRequest {
}

/**
 * QueryGetProtoRevMaxPoolPointsPerTxResponse is response type for the
 * Query/GetProtoRevMaxPoolPointsPerTx RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerTxResponse {
  /**
   * max_pool_points_per_tx is the maximum number of pool points that can be
   * consumed per transaction
   */
  maxPoolPointsPerTx: Long;
}

/**
 * QueryGetProtoRevBaseDenomsRequest is request type for the
 * Query/GetProtoRevBaseDenoms RPC method.
 */
export interface QueryGetProtoRevBaseDenomsRequest {
}

/**
 * QueryGetProtoRevBaseDenomsResponse is response type for the
 * Query/GetProtoRevBaseDenoms RPC method.
 */
export interface QueryGetProtoRevBaseDenomsResponse {
  /** base_denoms is a list of all of the base denoms and step sizes */
  baseDenoms: BaseDenom[];
}

/**
 * QueryGetProtoRevEnabledRequest is request type for the
 * Query/GetProtoRevEnabled RPC method.
 */
export interface QueryGetProtoRevEnabledRequest {
}

/**
 * QueryGetProtoRevEnabledResponse is response type for the
 * Query/GetProtoRevEnabled RPC method.
 */
export interface QueryGetProtoRevEnabledResponse {
  /** enabled is whether the module is enabled */
  enabled: boolean;
}

/**
 * QueryGetProtoRevPoolRequest is request type for the
 * Query/GetProtoRevPool RPC method.
 */
export interface QueryGetProtoRevPoolRequest {
  /**
   * base_denom is the base denom set in protorev for the denom pair to pool
   * mapping
   */
  baseDenom: string;
  /** other_denom is the other denom for the denom pair to pool mapping */
  otherDenom: string;
}

/**
 * QueryGetProtoRevPoolResponse is response type for the
 * Query/GetProtoRevPool RPC method.
 */
export interface QueryGetProtoRevPoolResponse {
  /** pool_id is the pool_id stored for the denom pair */
  poolId: Long;
}

export interface QueryGetAllProtocolRevenueRequest {
}

export interface QueryGetAllProtocolRevenueResponse {
  allProtocolRevenue: AllProtocolRevenue | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
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

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetProtoRevNumberOfTradesRequest(): QueryGetProtoRevNumberOfTradesRequest {
  return {};
}

export const QueryGetProtoRevNumberOfTradesRequest = {
  encode(_: QueryGetProtoRevNumberOfTradesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevNumberOfTradesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevNumberOfTradesRequest();
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

  fromJSON(_: any): QueryGetProtoRevNumberOfTradesRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevNumberOfTradesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevNumberOfTradesRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevNumberOfTradesRequest {
    return QueryGetProtoRevNumberOfTradesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevNumberOfTradesRequest>, I>>(
    _: I,
  ): QueryGetProtoRevNumberOfTradesRequest {
    const message = createBaseQueryGetProtoRevNumberOfTradesRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevNumberOfTradesResponse(): QueryGetProtoRevNumberOfTradesResponse {
  return { numberOfTrades: "" };
}

export const QueryGetProtoRevNumberOfTradesResponse = {
  encode(message: QueryGetProtoRevNumberOfTradesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.numberOfTrades !== "") {
      writer.uint32(10).string(message.numberOfTrades);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevNumberOfTradesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevNumberOfTradesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.numberOfTrades = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevNumberOfTradesResponse {
    return { numberOfTrades: isSet(object.numberOfTrades) ? globalThis.String(object.numberOfTrades) : "" };
  },

  toJSON(message: QueryGetProtoRevNumberOfTradesResponse): unknown {
    const obj: any = {};
    if (message.numberOfTrades !== "") {
      obj.numberOfTrades = message.numberOfTrades;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevNumberOfTradesResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevNumberOfTradesResponse {
    return QueryGetProtoRevNumberOfTradesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevNumberOfTradesResponse>, I>>(
    object: I,
  ): QueryGetProtoRevNumberOfTradesResponse {
    const message = createBaseQueryGetProtoRevNumberOfTradesResponse();
    message.numberOfTrades = object.numberOfTrades ?? "";
    return message;
  },
};

function createBaseQueryGetProtoRevProfitsByDenomRequest(): QueryGetProtoRevProfitsByDenomRequest {
  return { denom: "" };
}

export const QueryGetProtoRevProfitsByDenomRequest = {
  encode(message: QueryGetProtoRevProfitsByDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevProfitsByDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevProfitsByDenomRequest();
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

  fromJSON(object: any): QueryGetProtoRevProfitsByDenomRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: QueryGetProtoRevProfitsByDenomRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevProfitsByDenomRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevProfitsByDenomRequest {
    return QueryGetProtoRevProfitsByDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevProfitsByDenomRequest>, I>>(
    object: I,
  ): QueryGetProtoRevProfitsByDenomRequest {
    const message = createBaseQueryGetProtoRevProfitsByDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryGetProtoRevProfitsByDenomResponse(): QueryGetProtoRevProfitsByDenomResponse {
  return { profit: undefined };
}

export const QueryGetProtoRevProfitsByDenomResponse = {
  encode(message: QueryGetProtoRevProfitsByDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.profit !== undefined) {
      Coin.encode(message.profit, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevProfitsByDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevProfitsByDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.profit = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevProfitsByDenomResponse {
    return { profit: isSet(object.profit) ? Coin.fromJSON(object.profit) : undefined };
  },

  toJSON(message: QueryGetProtoRevProfitsByDenomResponse): unknown {
    const obj: any = {};
    if (message.profit !== undefined) {
      obj.profit = Coin.toJSON(message.profit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevProfitsByDenomResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevProfitsByDenomResponse {
    return QueryGetProtoRevProfitsByDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevProfitsByDenomResponse>, I>>(
    object: I,
  ): QueryGetProtoRevProfitsByDenomResponse {
    const message = createBaseQueryGetProtoRevProfitsByDenomResponse();
    message.profit = (object.profit !== undefined && object.profit !== null)
      ? Coin.fromPartial(object.profit)
      : undefined;
    return message;
  },
};

function createBaseQueryGetProtoRevAllProfitsRequest(): QueryGetProtoRevAllProfitsRequest {
  return {};
}

export const QueryGetProtoRevAllProfitsRequest = {
  encode(_: QueryGetProtoRevAllProfitsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevAllProfitsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllProfitsRequest();
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

  fromJSON(_: any): QueryGetProtoRevAllProfitsRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevAllProfitsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevAllProfitsRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevAllProfitsRequest {
    return QueryGetProtoRevAllProfitsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevAllProfitsRequest>, I>>(
    _: I,
  ): QueryGetProtoRevAllProfitsRequest {
    const message = createBaseQueryGetProtoRevAllProfitsRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevAllProfitsResponse(): QueryGetProtoRevAllProfitsResponse {
  return { profits: [] };
}

export const QueryGetProtoRevAllProfitsResponse = {
  encode(message: QueryGetProtoRevAllProfitsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.profits) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevAllProfitsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllProfitsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.profits.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevAllProfitsResponse {
    return {
      profits: globalThis.Array.isArray(object?.profits) ? object.profits.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryGetProtoRevAllProfitsResponse): unknown {
    const obj: any = {};
    if (message.profits?.length) {
      obj.profits = message.profits.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevAllProfitsResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevAllProfitsResponse {
    return QueryGetProtoRevAllProfitsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevAllProfitsResponse>, I>>(
    object: I,
  ): QueryGetProtoRevAllProfitsResponse {
    const message = createBaseQueryGetProtoRevAllProfitsResponse();
    message.profits = object.profits?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryGetProtoRevStatisticsByRouteRequest(): QueryGetProtoRevStatisticsByRouteRequest {
  return { route: [] };
}

export const QueryGetProtoRevStatisticsByRouteRequest = {
  encode(message: QueryGetProtoRevStatisticsByRouteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.route) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevStatisticsByRouteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevStatisticsByRouteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.route.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.route.push(reader.uint64() as Long);
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

  fromJSON(object: any): QueryGetProtoRevStatisticsByRouteRequest {
    return { route: globalThis.Array.isArray(object?.route) ? object.route.map((e: any) => Long.fromValue(e)) : [] };
  },

  toJSON(message: QueryGetProtoRevStatisticsByRouteRequest): unknown {
    const obj: any = {};
    if (message.route?.length) {
      obj.route = message.route.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevStatisticsByRouteRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevStatisticsByRouteRequest {
    return QueryGetProtoRevStatisticsByRouteRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevStatisticsByRouteRequest>, I>>(
    object: I,
  ): QueryGetProtoRevStatisticsByRouteRequest {
    const message = createBaseQueryGetProtoRevStatisticsByRouteRequest();
    message.route = object.route?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseQueryGetProtoRevStatisticsByRouteResponse(): QueryGetProtoRevStatisticsByRouteResponse {
  return { statistics: undefined };
}

export const QueryGetProtoRevStatisticsByRouteResponse = {
  encode(message: QueryGetProtoRevStatisticsByRouteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.statistics !== undefined) {
      RouteStatistics.encode(message.statistics, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevStatisticsByRouteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevStatisticsByRouteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.statistics = RouteStatistics.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevStatisticsByRouteResponse {
    return { statistics: isSet(object.statistics) ? RouteStatistics.fromJSON(object.statistics) : undefined };
  },

  toJSON(message: QueryGetProtoRevStatisticsByRouteResponse): unknown {
    const obj: any = {};
    if (message.statistics !== undefined) {
      obj.statistics = RouteStatistics.toJSON(message.statistics);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevStatisticsByRouteResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevStatisticsByRouteResponse {
    return QueryGetProtoRevStatisticsByRouteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevStatisticsByRouteResponse>, I>>(
    object: I,
  ): QueryGetProtoRevStatisticsByRouteResponse {
    const message = createBaseQueryGetProtoRevStatisticsByRouteResponse();
    message.statistics = (object.statistics !== undefined && object.statistics !== null)
      ? RouteStatistics.fromPartial(object.statistics)
      : undefined;
    return message;
  },
};

function createBaseQueryGetProtoRevAllRouteStatisticsRequest(): QueryGetProtoRevAllRouteStatisticsRequest {
  return {};
}

export const QueryGetProtoRevAllRouteStatisticsRequest = {
  encode(_: QueryGetProtoRevAllRouteStatisticsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevAllRouteStatisticsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllRouteStatisticsRequest();
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

  fromJSON(_: any): QueryGetProtoRevAllRouteStatisticsRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevAllRouteStatisticsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevAllRouteStatisticsRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevAllRouteStatisticsRequest {
    return QueryGetProtoRevAllRouteStatisticsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevAllRouteStatisticsRequest>, I>>(
    _: I,
  ): QueryGetProtoRevAllRouteStatisticsRequest {
    const message = createBaseQueryGetProtoRevAllRouteStatisticsRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevAllRouteStatisticsResponse(): QueryGetProtoRevAllRouteStatisticsResponse {
  return { statistics: [] };
}

export const QueryGetProtoRevAllRouteStatisticsResponse = {
  encode(message: QueryGetProtoRevAllRouteStatisticsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.statistics) {
      RouteStatistics.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevAllRouteStatisticsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllRouteStatisticsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.statistics.push(RouteStatistics.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevAllRouteStatisticsResponse {
    return {
      statistics: globalThis.Array.isArray(object?.statistics)
        ? object.statistics.map((e: any) => RouteStatistics.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetProtoRevAllRouteStatisticsResponse): unknown {
    const obj: any = {};
    if (message.statistics?.length) {
      obj.statistics = message.statistics.map((e) => RouteStatistics.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevAllRouteStatisticsResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevAllRouteStatisticsResponse {
    return QueryGetProtoRevAllRouteStatisticsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevAllRouteStatisticsResponse>, I>>(
    object: I,
  ): QueryGetProtoRevAllRouteStatisticsResponse {
    const message = createBaseQueryGetProtoRevAllRouteStatisticsResponse();
    message.statistics = object.statistics?.map((e) => RouteStatistics.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryGetProtoRevTokenPairArbRoutesRequest(): QueryGetProtoRevTokenPairArbRoutesRequest {
  return {};
}

export const QueryGetProtoRevTokenPairArbRoutesRequest = {
  encode(_: QueryGetProtoRevTokenPairArbRoutesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevTokenPairArbRoutesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesRequest();
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

  fromJSON(_: any): QueryGetProtoRevTokenPairArbRoutesRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevTokenPairArbRoutesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevTokenPairArbRoutesRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevTokenPairArbRoutesRequest {
    return QueryGetProtoRevTokenPairArbRoutesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevTokenPairArbRoutesRequest>, I>>(
    _: I,
  ): QueryGetProtoRevTokenPairArbRoutesRequest {
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevTokenPairArbRoutesResponse(): QueryGetProtoRevTokenPairArbRoutesResponse {
  return { routes: [] };
}

export const QueryGetProtoRevTokenPairArbRoutesResponse = {
  encode(message: QueryGetProtoRevTokenPairArbRoutesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.routes) {
      TokenPairArbRoutes.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevTokenPairArbRoutesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.routes.push(TokenPairArbRoutes.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevTokenPairArbRoutesResponse {
    return {
      routes: globalThis.Array.isArray(object?.routes)
        ? object.routes.map((e: any) => TokenPairArbRoutes.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetProtoRevTokenPairArbRoutesResponse): unknown {
    const obj: any = {};
    if (message.routes?.length) {
      obj.routes = message.routes.map((e) => TokenPairArbRoutes.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevTokenPairArbRoutesResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevTokenPairArbRoutesResponse {
    return QueryGetProtoRevTokenPairArbRoutesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevTokenPairArbRoutesResponse>, I>>(
    object: I,
  ): QueryGetProtoRevTokenPairArbRoutesResponse {
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesResponse();
    message.routes = object.routes?.map((e) => TokenPairArbRoutes.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryGetProtoRevAdminAccountRequest(): QueryGetProtoRevAdminAccountRequest {
  return {};
}

export const QueryGetProtoRevAdminAccountRequest = {
  encode(_: QueryGetProtoRevAdminAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevAdminAccountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAdminAccountRequest();
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

  fromJSON(_: any): QueryGetProtoRevAdminAccountRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevAdminAccountRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevAdminAccountRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevAdminAccountRequest {
    return QueryGetProtoRevAdminAccountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevAdminAccountRequest>, I>>(
    _: I,
  ): QueryGetProtoRevAdminAccountRequest {
    const message = createBaseQueryGetProtoRevAdminAccountRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevAdminAccountResponse(): QueryGetProtoRevAdminAccountResponse {
  return { adminAccount: "" };
}

export const QueryGetProtoRevAdminAccountResponse = {
  encode(message: QueryGetProtoRevAdminAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.adminAccount !== "") {
      writer.uint32(10).string(message.adminAccount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevAdminAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAdminAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.adminAccount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevAdminAccountResponse {
    return { adminAccount: isSet(object.adminAccount) ? globalThis.String(object.adminAccount) : "" };
  },

  toJSON(message: QueryGetProtoRevAdminAccountResponse): unknown {
    const obj: any = {};
    if (message.adminAccount !== "") {
      obj.adminAccount = message.adminAccount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevAdminAccountResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevAdminAccountResponse {
    return QueryGetProtoRevAdminAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevAdminAccountResponse>, I>>(
    object: I,
  ): QueryGetProtoRevAdminAccountResponse {
    const message = createBaseQueryGetProtoRevAdminAccountResponse();
    message.adminAccount = object.adminAccount ?? "";
    return message;
  },
};

function createBaseQueryGetProtoRevDeveloperAccountRequest(): QueryGetProtoRevDeveloperAccountRequest {
  return {};
}

export const QueryGetProtoRevDeveloperAccountRequest = {
  encode(_: QueryGetProtoRevDeveloperAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevDeveloperAccountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevDeveloperAccountRequest();
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

  fromJSON(_: any): QueryGetProtoRevDeveloperAccountRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevDeveloperAccountRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevDeveloperAccountRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevDeveloperAccountRequest {
    return QueryGetProtoRevDeveloperAccountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevDeveloperAccountRequest>, I>>(
    _: I,
  ): QueryGetProtoRevDeveloperAccountRequest {
    const message = createBaseQueryGetProtoRevDeveloperAccountRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevDeveloperAccountResponse(): QueryGetProtoRevDeveloperAccountResponse {
  return { developerAccount: "" };
}

export const QueryGetProtoRevDeveloperAccountResponse = {
  encode(message: QueryGetProtoRevDeveloperAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.developerAccount !== "") {
      writer.uint32(10).string(message.developerAccount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevDeveloperAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevDeveloperAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.developerAccount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevDeveloperAccountResponse {
    return { developerAccount: isSet(object.developerAccount) ? globalThis.String(object.developerAccount) : "" };
  },

  toJSON(message: QueryGetProtoRevDeveloperAccountResponse): unknown {
    const obj: any = {};
    if (message.developerAccount !== "") {
      obj.developerAccount = message.developerAccount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevDeveloperAccountResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevDeveloperAccountResponse {
    return QueryGetProtoRevDeveloperAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevDeveloperAccountResponse>, I>>(
    object: I,
  ): QueryGetProtoRevDeveloperAccountResponse {
    const message = createBaseQueryGetProtoRevDeveloperAccountResponse();
    message.developerAccount = object.developerAccount ?? "";
    return message;
  },
};

function createBaseQueryGetProtoRevInfoByPoolTypeRequest(): QueryGetProtoRevInfoByPoolTypeRequest {
  return {};
}

export const QueryGetProtoRevInfoByPoolTypeRequest = {
  encode(_: QueryGetProtoRevInfoByPoolTypeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevInfoByPoolTypeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevInfoByPoolTypeRequest();
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

  fromJSON(_: any): QueryGetProtoRevInfoByPoolTypeRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevInfoByPoolTypeRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevInfoByPoolTypeRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevInfoByPoolTypeRequest {
    return QueryGetProtoRevInfoByPoolTypeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevInfoByPoolTypeRequest>, I>>(
    _: I,
  ): QueryGetProtoRevInfoByPoolTypeRequest {
    const message = createBaseQueryGetProtoRevInfoByPoolTypeRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevInfoByPoolTypeResponse(): QueryGetProtoRevInfoByPoolTypeResponse {
  return { infoByPoolType: undefined };
}

export const QueryGetProtoRevInfoByPoolTypeResponse = {
  encode(message: QueryGetProtoRevInfoByPoolTypeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.infoByPoolType !== undefined) {
      InfoByPoolType.encode(message.infoByPoolType, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevInfoByPoolTypeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevInfoByPoolTypeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.infoByPoolType = InfoByPoolType.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevInfoByPoolTypeResponse {
    return {
      infoByPoolType: isSet(object.infoByPoolType) ? InfoByPoolType.fromJSON(object.infoByPoolType) : undefined,
    };
  },

  toJSON(message: QueryGetProtoRevInfoByPoolTypeResponse): unknown {
    const obj: any = {};
    if (message.infoByPoolType !== undefined) {
      obj.infoByPoolType = InfoByPoolType.toJSON(message.infoByPoolType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevInfoByPoolTypeResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevInfoByPoolTypeResponse {
    return QueryGetProtoRevInfoByPoolTypeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevInfoByPoolTypeResponse>, I>>(
    object: I,
  ): QueryGetProtoRevInfoByPoolTypeResponse {
    const message = createBaseQueryGetProtoRevInfoByPoolTypeResponse();
    message.infoByPoolType = (object.infoByPoolType !== undefined && object.infoByPoolType !== null)
      ? InfoByPoolType.fromPartial(object.infoByPoolType)
      : undefined;
    return message;
  },
};

function createBaseQueryGetProtoRevMaxPoolPointsPerBlockRequest(): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
  return {};
}

export const QueryGetProtoRevMaxPoolPointsPerBlockRequest = {
  encode(_: QueryGetProtoRevMaxPoolPointsPerBlockRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockRequest();
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

  fromJSON(_: any): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevMaxPoolPointsPerBlockRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevMaxPoolPointsPerBlockRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
    return QueryGetProtoRevMaxPoolPointsPerBlockRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevMaxPoolPointsPerBlockRequest>, I>>(
    _: I,
  ): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevMaxPoolPointsPerBlockResponse(): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
  return { maxPoolPointsPerBlock: Long.UZERO };
}

export const QueryGetProtoRevMaxPoolPointsPerBlockResponse = {
  encode(message: QueryGetProtoRevMaxPoolPointsPerBlockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.maxPoolPointsPerBlock.isZero()) {
      writer.uint32(8).uint64(message.maxPoolPointsPerBlock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maxPoolPointsPerBlock = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
    return {
      maxPoolPointsPerBlock: isSet(object.maxPoolPointsPerBlock)
        ? Long.fromValue(object.maxPoolPointsPerBlock)
        : Long.UZERO,
    };
  },

  toJSON(message: QueryGetProtoRevMaxPoolPointsPerBlockResponse): unknown {
    const obj: any = {};
    if (!message.maxPoolPointsPerBlock.isZero()) {
      obj.maxPoolPointsPerBlock = (message.maxPoolPointsPerBlock || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevMaxPoolPointsPerBlockResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
    return QueryGetProtoRevMaxPoolPointsPerBlockResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevMaxPoolPointsPerBlockResponse>, I>>(
    object: I,
  ): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockResponse();
    message.maxPoolPointsPerBlock =
      (object.maxPoolPointsPerBlock !== undefined && object.maxPoolPointsPerBlock !== null)
        ? Long.fromValue(object.maxPoolPointsPerBlock)
        : Long.UZERO;
    return message;
  },
};

function createBaseQueryGetProtoRevMaxPoolPointsPerTxRequest(): QueryGetProtoRevMaxPoolPointsPerTxRequest {
  return {};
}

export const QueryGetProtoRevMaxPoolPointsPerTxRequest = {
  encode(_: QueryGetProtoRevMaxPoolPointsPerTxRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevMaxPoolPointsPerTxRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxRequest();
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

  fromJSON(_: any): QueryGetProtoRevMaxPoolPointsPerTxRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevMaxPoolPointsPerTxRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevMaxPoolPointsPerTxRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevMaxPoolPointsPerTxRequest {
    return QueryGetProtoRevMaxPoolPointsPerTxRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevMaxPoolPointsPerTxRequest>, I>>(
    _: I,
  ): QueryGetProtoRevMaxPoolPointsPerTxRequest {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevMaxPoolPointsPerTxResponse(): QueryGetProtoRevMaxPoolPointsPerTxResponse {
  return { maxPoolPointsPerTx: Long.UZERO };
}

export const QueryGetProtoRevMaxPoolPointsPerTxResponse = {
  encode(message: QueryGetProtoRevMaxPoolPointsPerTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.maxPoolPointsPerTx.isZero()) {
      writer.uint32(8).uint64(message.maxPoolPointsPerTx);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevMaxPoolPointsPerTxResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maxPoolPointsPerTx = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevMaxPoolPointsPerTxResponse {
    return {
      maxPoolPointsPerTx: isSet(object.maxPoolPointsPerTx) ? Long.fromValue(object.maxPoolPointsPerTx) : Long.UZERO,
    };
  },

  toJSON(message: QueryGetProtoRevMaxPoolPointsPerTxResponse): unknown {
    const obj: any = {};
    if (!message.maxPoolPointsPerTx.isZero()) {
      obj.maxPoolPointsPerTx = (message.maxPoolPointsPerTx || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevMaxPoolPointsPerTxResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevMaxPoolPointsPerTxResponse {
    return QueryGetProtoRevMaxPoolPointsPerTxResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevMaxPoolPointsPerTxResponse>, I>>(
    object: I,
  ): QueryGetProtoRevMaxPoolPointsPerTxResponse {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxResponse();
    message.maxPoolPointsPerTx = (object.maxPoolPointsPerTx !== undefined && object.maxPoolPointsPerTx !== null)
      ? Long.fromValue(object.maxPoolPointsPerTx)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryGetProtoRevBaseDenomsRequest(): QueryGetProtoRevBaseDenomsRequest {
  return {};
}

export const QueryGetProtoRevBaseDenomsRequest = {
  encode(_: QueryGetProtoRevBaseDenomsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevBaseDenomsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevBaseDenomsRequest();
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

  fromJSON(_: any): QueryGetProtoRevBaseDenomsRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevBaseDenomsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevBaseDenomsRequest>, I>>(
    base?: I,
  ): QueryGetProtoRevBaseDenomsRequest {
    return QueryGetProtoRevBaseDenomsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevBaseDenomsRequest>, I>>(
    _: I,
  ): QueryGetProtoRevBaseDenomsRequest {
    const message = createBaseQueryGetProtoRevBaseDenomsRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevBaseDenomsResponse(): QueryGetProtoRevBaseDenomsResponse {
  return { baseDenoms: [] };
}

export const QueryGetProtoRevBaseDenomsResponse = {
  encode(message: QueryGetProtoRevBaseDenomsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.baseDenoms) {
      BaseDenom.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevBaseDenomsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevBaseDenomsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.baseDenoms.push(BaseDenom.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevBaseDenomsResponse {
    return {
      baseDenoms: globalThis.Array.isArray(object?.baseDenoms)
        ? object.baseDenoms.map((e: any) => BaseDenom.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetProtoRevBaseDenomsResponse): unknown {
    const obj: any = {};
    if (message.baseDenoms?.length) {
      obj.baseDenoms = message.baseDenoms.map((e) => BaseDenom.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevBaseDenomsResponse>, I>>(
    base?: I,
  ): QueryGetProtoRevBaseDenomsResponse {
    return QueryGetProtoRevBaseDenomsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevBaseDenomsResponse>, I>>(
    object: I,
  ): QueryGetProtoRevBaseDenomsResponse {
    const message = createBaseQueryGetProtoRevBaseDenomsResponse();
    message.baseDenoms = object.baseDenoms?.map((e) => BaseDenom.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryGetProtoRevEnabledRequest(): QueryGetProtoRevEnabledRequest {
  return {};
}

export const QueryGetProtoRevEnabledRequest = {
  encode(_: QueryGetProtoRevEnabledRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevEnabledRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevEnabledRequest();
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

  fromJSON(_: any): QueryGetProtoRevEnabledRequest {
    return {};
  },

  toJSON(_: QueryGetProtoRevEnabledRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevEnabledRequest>, I>>(base?: I): QueryGetProtoRevEnabledRequest {
    return QueryGetProtoRevEnabledRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevEnabledRequest>, I>>(_: I): QueryGetProtoRevEnabledRequest {
    const message = createBaseQueryGetProtoRevEnabledRequest();
    return message;
  },
};

function createBaseQueryGetProtoRevEnabledResponse(): QueryGetProtoRevEnabledResponse {
  return { enabled: false };
}

export const QueryGetProtoRevEnabledResponse = {
  encode(message: QueryGetProtoRevEnabledResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevEnabledResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevEnabledResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.enabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevEnabledResponse {
    return { enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false };
  },

  toJSON(message: QueryGetProtoRevEnabledResponse): unknown {
    const obj: any = {};
    if (message.enabled === true) {
      obj.enabled = message.enabled;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevEnabledResponse>, I>>(base?: I): QueryGetProtoRevEnabledResponse {
    return QueryGetProtoRevEnabledResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevEnabledResponse>, I>>(
    object: I,
  ): QueryGetProtoRevEnabledResponse {
    const message = createBaseQueryGetProtoRevEnabledResponse();
    message.enabled = object.enabled ?? false;
    return message;
  },
};

function createBaseQueryGetProtoRevPoolRequest(): QueryGetProtoRevPoolRequest {
  return { baseDenom: "", otherDenom: "" };
}

export const QueryGetProtoRevPoolRequest = {
  encode(message: QueryGetProtoRevPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseDenom !== "") {
      writer.uint32(10).string(message.baseDenom);
    }
    if (message.otherDenom !== "") {
      writer.uint32(18).string(message.otherDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevPoolRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.baseDenom = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.otherDenom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetProtoRevPoolRequest {
    return {
      baseDenom: isSet(object.baseDenom) ? globalThis.String(object.baseDenom) : "",
      otherDenom: isSet(object.otherDenom) ? globalThis.String(object.otherDenom) : "",
    };
  },

  toJSON(message: QueryGetProtoRevPoolRequest): unknown {
    const obj: any = {};
    if (message.baseDenom !== "") {
      obj.baseDenom = message.baseDenom;
    }
    if (message.otherDenom !== "") {
      obj.otherDenom = message.otherDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevPoolRequest>, I>>(base?: I): QueryGetProtoRevPoolRequest {
    return QueryGetProtoRevPoolRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevPoolRequest>, I>>(object: I): QueryGetProtoRevPoolRequest {
    const message = createBaseQueryGetProtoRevPoolRequest();
    message.baseDenom = object.baseDenom ?? "";
    message.otherDenom = object.otherDenom ?? "";
    return message;
  },
};

function createBaseQueryGetProtoRevPoolResponse(): QueryGetProtoRevPoolResponse {
  return { poolId: Long.UZERO };
}

export const QueryGetProtoRevPoolResponse = {
  encode(message: QueryGetProtoRevPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetProtoRevPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevPoolResponse();
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

  fromJSON(object: any): QueryGetProtoRevPoolResponse {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: QueryGetProtoRevPoolResponse): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetProtoRevPoolResponse>, I>>(base?: I): QueryGetProtoRevPoolResponse {
    return QueryGetProtoRevPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetProtoRevPoolResponse>, I>>(object: I): QueryGetProtoRevPoolResponse {
    const message = createBaseQueryGetProtoRevPoolResponse();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryGetAllProtocolRevenueRequest(): QueryGetAllProtocolRevenueRequest {
  return {};
}

export const QueryGetAllProtocolRevenueRequest = {
  encode(_: QueryGetAllProtocolRevenueRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAllProtocolRevenueRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllProtocolRevenueRequest();
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

  fromJSON(_: any): QueryGetAllProtocolRevenueRequest {
    return {};
  },

  toJSON(_: QueryGetAllProtocolRevenueRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetAllProtocolRevenueRequest>, I>>(
    base?: I,
  ): QueryGetAllProtocolRevenueRequest {
    return QueryGetAllProtocolRevenueRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetAllProtocolRevenueRequest>, I>>(
    _: I,
  ): QueryGetAllProtocolRevenueRequest {
    const message = createBaseQueryGetAllProtocolRevenueRequest();
    return message;
  },
};

function createBaseQueryGetAllProtocolRevenueResponse(): QueryGetAllProtocolRevenueResponse {
  return { allProtocolRevenue: undefined };
}

export const QueryGetAllProtocolRevenueResponse = {
  encode(message: QueryGetAllProtocolRevenueResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.allProtocolRevenue !== undefined) {
      AllProtocolRevenue.encode(message.allProtocolRevenue, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAllProtocolRevenueResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllProtocolRevenueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.allProtocolRevenue = AllProtocolRevenue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetAllProtocolRevenueResponse {
    return {
      allProtocolRevenue: isSet(object.allProtocolRevenue)
        ? AllProtocolRevenue.fromJSON(object.allProtocolRevenue)
        : undefined,
    };
  },

  toJSON(message: QueryGetAllProtocolRevenueResponse): unknown {
    const obj: any = {};
    if (message.allProtocolRevenue !== undefined) {
      obj.allProtocolRevenue = AllProtocolRevenue.toJSON(message.allProtocolRevenue);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetAllProtocolRevenueResponse>, I>>(
    base?: I,
  ): QueryGetAllProtocolRevenueResponse {
    return QueryGetAllProtocolRevenueResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetAllProtocolRevenueResponse>, I>>(
    object: I,
  ): QueryGetAllProtocolRevenueResponse {
    const message = createBaseQueryGetAllProtocolRevenueResponse();
    message.allProtocolRevenue = (object.allProtocolRevenue !== undefined && object.allProtocolRevenue !== null)
      ? AllProtocolRevenue.fromPartial(object.allProtocolRevenue)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * GetProtoRevNumberOfTrades queries the number of arbitrage trades the module
   * has executed
   */
  GetProtoRevNumberOfTrades(
    request: QueryGetProtoRevNumberOfTradesRequest,
  ): Promise<QueryGetProtoRevNumberOfTradesResponse>;
  /** GetProtoRevProfitsByDenom queries the profits of the module by denom */
  GetProtoRevProfitsByDenom(
    request: QueryGetProtoRevProfitsByDenomRequest,
  ): Promise<QueryGetProtoRevProfitsByDenomResponse>;
  /** GetProtoRevAllProfits queries all of the profits from the module */
  GetProtoRevAllProfits(request: QueryGetProtoRevAllProfitsRequest): Promise<QueryGetProtoRevAllProfitsResponse>;
  /**
   * GetProtoRevStatisticsByRoute queries the number of arbitrages and profits
   * that have been executed for a given route
   */
  GetProtoRevStatisticsByRoute(
    request: QueryGetProtoRevStatisticsByRouteRequest,
  ): Promise<QueryGetProtoRevStatisticsByRouteResponse>;
  /**
   * GetProtoRevAllRouteStatistics queries all of routes that the module has
   * arbitraged against and the number of trades and profits that have been
   * accumulated for each route
   */
  GetProtoRevAllRouteStatistics(
    request: QueryGetProtoRevAllRouteStatisticsRequest,
  ): Promise<QueryGetProtoRevAllRouteStatisticsResponse>;
  /**
   * GetProtoRevTokenPairArbRoutes queries all of the hot routes that the module
   * is currently arbitraging
   */
  GetProtoRevTokenPairArbRoutes(
    request: QueryGetProtoRevTokenPairArbRoutesRequest,
  ): Promise<QueryGetProtoRevTokenPairArbRoutesResponse>;
  /** GetProtoRevAdminAccount queries the admin account of the module */
  GetProtoRevAdminAccount(request: QueryGetProtoRevAdminAccountRequest): Promise<QueryGetProtoRevAdminAccountResponse>;
  /** GetProtoRevDeveloperAccount queries the developer account of the module */
  GetProtoRevDeveloperAccount(
    request: QueryGetProtoRevDeveloperAccountRequest,
  ): Promise<QueryGetProtoRevDeveloperAccountResponse>;
  /**
   * GetProtoRevInfoByPoolType queries pool type information that is currently
   * being utilized by the module
   */
  GetProtoRevInfoByPoolType(
    request: QueryGetProtoRevInfoByPoolTypeRequest,
  ): Promise<QueryGetProtoRevInfoByPoolTypeResponse>;
  /**
   * GetProtoRevMaxPoolPointsPerTx queries the maximum number of pool points
   * that can be consumed per transaction
   */
  GetProtoRevMaxPoolPointsPerTx(
    request: QueryGetProtoRevMaxPoolPointsPerTxRequest,
  ): Promise<QueryGetProtoRevMaxPoolPointsPerTxResponse>;
  /**
   * GetProtoRevMaxPoolPointsPerBlock queries the maximum number of pool points
   * that can consumed per block
   */
  GetProtoRevMaxPoolPointsPerBlock(
    request: QueryGetProtoRevMaxPoolPointsPerBlockRequest,
  ): Promise<QueryGetProtoRevMaxPoolPointsPerBlockResponse>;
  /**
   * GetProtoRevBaseDenoms queries the base denoms that the module is currently
   * utilizing for arbitrage
   */
  GetProtoRevBaseDenoms(request: QueryGetProtoRevBaseDenomsRequest): Promise<QueryGetProtoRevBaseDenomsResponse>;
  /** GetProtoRevEnabled queries whether the module is enabled or not */
  GetProtoRevEnabled(request: QueryGetProtoRevEnabledRequest): Promise<QueryGetProtoRevEnabledResponse>;
  /**
   * GetProtoRevPool queries the pool id used via the highest liquidity method
   * for arbitrage route building given a pair of denominations
   */
  GetProtoRevPool(request: QueryGetProtoRevPoolRequest): Promise<QueryGetProtoRevPoolResponse>;
  /**
   * GetAllProtocolRevenue queries all of the protocol revenue that has been
   * accumulated by any module
   */
  GetAllProtocolRevenue(request: QueryGetAllProtocolRevenueRequest): Promise<QueryGetAllProtocolRevenueResponse>;
}

export const QueryServiceName = "osmosis.protorev.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.GetProtoRevNumberOfTrades = this.GetProtoRevNumberOfTrades.bind(this);
    this.GetProtoRevProfitsByDenom = this.GetProtoRevProfitsByDenom.bind(this);
    this.GetProtoRevAllProfits = this.GetProtoRevAllProfits.bind(this);
    this.GetProtoRevStatisticsByRoute = this.GetProtoRevStatisticsByRoute.bind(this);
    this.GetProtoRevAllRouteStatistics = this.GetProtoRevAllRouteStatistics.bind(this);
    this.GetProtoRevTokenPairArbRoutes = this.GetProtoRevTokenPairArbRoutes.bind(this);
    this.GetProtoRevAdminAccount = this.GetProtoRevAdminAccount.bind(this);
    this.GetProtoRevDeveloperAccount = this.GetProtoRevDeveloperAccount.bind(this);
    this.GetProtoRevInfoByPoolType = this.GetProtoRevInfoByPoolType.bind(this);
    this.GetProtoRevMaxPoolPointsPerTx = this.GetProtoRevMaxPoolPointsPerTx.bind(this);
    this.GetProtoRevMaxPoolPointsPerBlock = this.GetProtoRevMaxPoolPointsPerBlock.bind(this);
    this.GetProtoRevBaseDenoms = this.GetProtoRevBaseDenoms.bind(this);
    this.GetProtoRevEnabled = this.GetProtoRevEnabled.bind(this);
    this.GetProtoRevPool = this.GetProtoRevPool.bind(this);
    this.GetAllProtocolRevenue = this.GetAllProtocolRevenue.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevNumberOfTrades(
    request: QueryGetProtoRevNumberOfTradesRequest,
  ): Promise<QueryGetProtoRevNumberOfTradesResponse> {
    const data = QueryGetProtoRevNumberOfTradesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevNumberOfTrades", data);
    return promise.then((data) => QueryGetProtoRevNumberOfTradesResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevProfitsByDenom(
    request: QueryGetProtoRevProfitsByDenomRequest,
  ): Promise<QueryGetProtoRevProfitsByDenomResponse> {
    const data = QueryGetProtoRevProfitsByDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevProfitsByDenom", data);
    return promise.then((data) => QueryGetProtoRevProfitsByDenomResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevAllProfits(request: QueryGetProtoRevAllProfitsRequest): Promise<QueryGetProtoRevAllProfitsResponse> {
    const data = QueryGetProtoRevAllProfitsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevAllProfits", data);
    return promise.then((data) => QueryGetProtoRevAllProfitsResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevStatisticsByRoute(
    request: QueryGetProtoRevStatisticsByRouteRequest,
  ): Promise<QueryGetProtoRevStatisticsByRouteResponse> {
    const data = QueryGetProtoRevStatisticsByRouteRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevStatisticsByRoute", data);
    return promise.then((data) => QueryGetProtoRevStatisticsByRouteResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevAllRouteStatistics(
    request: QueryGetProtoRevAllRouteStatisticsRequest,
  ): Promise<QueryGetProtoRevAllRouteStatisticsResponse> {
    const data = QueryGetProtoRevAllRouteStatisticsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevAllRouteStatistics", data);
    return promise.then((data) => QueryGetProtoRevAllRouteStatisticsResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevTokenPairArbRoutes(
    request: QueryGetProtoRevTokenPairArbRoutesRequest,
  ): Promise<QueryGetProtoRevTokenPairArbRoutesResponse> {
    const data = QueryGetProtoRevTokenPairArbRoutesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevTokenPairArbRoutes", data);
    return promise.then((data) => QueryGetProtoRevTokenPairArbRoutesResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevAdminAccount(request: QueryGetProtoRevAdminAccountRequest): Promise<QueryGetProtoRevAdminAccountResponse> {
    const data = QueryGetProtoRevAdminAccountRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevAdminAccount", data);
    return promise.then((data) => QueryGetProtoRevAdminAccountResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevDeveloperAccount(
    request: QueryGetProtoRevDeveloperAccountRequest,
  ): Promise<QueryGetProtoRevDeveloperAccountResponse> {
    const data = QueryGetProtoRevDeveloperAccountRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevDeveloperAccount", data);
    return promise.then((data) => QueryGetProtoRevDeveloperAccountResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevInfoByPoolType(
    request: QueryGetProtoRevInfoByPoolTypeRequest,
  ): Promise<QueryGetProtoRevInfoByPoolTypeResponse> {
    const data = QueryGetProtoRevInfoByPoolTypeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevInfoByPoolType", data);
    return promise.then((data) => QueryGetProtoRevInfoByPoolTypeResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevMaxPoolPointsPerTx(
    request: QueryGetProtoRevMaxPoolPointsPerTxRequest,
  ): Promise<QueryGetProtoRevMaxPoolPointsPerTxResponse> {
    const data = QueryGetProtoRevMaxPoolPointsPerTxRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevMaxPoolPointsPerTx", data);
    return promise.then((data) => QueryGetProtoRevMaxPoolPointsPerTxResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevMaxPoolPointsPerBlock(
    request: QueryGetProtoRevMaxPoolPointsPerBlockRequest,
  ): Promise<QueryGetProtoRevMaxPoolPointsPerBlockResponse> {
    const data = QueryGetProtoRevMaxPoolPointsPerBlockRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevMaxPoolPointsPerBlock", data);
    return promise.then((data) => QueryGetProtoRevMaxPoolPointsPerBlockResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevBaseDenoms(request: QueryGetProtoRevBaseDenomsRequest): Promise<QueryGetProtoRevBaseDenomsResponse> {
    const data = QueryGetProtoRevBaseDenomsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevBaseDenoms", data);
    return promise.then((data) => QueryGetProtoRevBaseDenomsResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevEnabled(request: QueryGetProtoRevEnabledRequest): Promise<QueryGetProtoRevEnabledResponse> {
    const data = QueryGetProtoRevEnabledRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevEnabled", data);
    return promise.then((data) => QueryGetProtoRevEnabledResponse.decode(_m0.Reader.create(data)));
  }

  GetProtoRevPool(request: QueryGetProtoRevPoolRequest): Promise<QueryGetProtoRevPoolResponse> {
    const data = QueryGetProtoRevPoolRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetProtoRevPool", data);
    return promise.then((data) => QueryGetProtoRevPoolResponse.decode(_m0.Reader.create(data)));
  }

  GetAllProtocolRevenue(request: QueryGetAllProtocolRevenueRequest): Promise<QueryGetAllProtocolRevenueResponse> {
    const data = QueryGetAllProtocolRevenueRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetAllProtocolRevenue", data);
    return promise.then((data) => QueryGetAllProtocolRevenueResponse.decode(_m0.Reader.create(data)));
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
