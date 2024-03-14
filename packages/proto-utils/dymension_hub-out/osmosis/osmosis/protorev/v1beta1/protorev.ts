/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { TakerFeesTracker } from "../../poolmanager/v1beta1/genesis";

export const protobufPackage = "osmosis.protorev.v1beta1";

/** TokenPairArbRoutes tracks all of the hot routes for a given pair of tokens */
export interface TokenPairArbRoutes {
  /** Stores all of the possible hot paths for a given pair of tokens */
  arbRoutes: Route[];
  /** Token denomination of the first asset */
  tokenIn: string;
  /** Token denomination of the second asset */
  tokenOut: string;
}

/** Route is a hot route for a given pair of tokens */
export interface Route {
  /**
   * The pool IDs that are traversed in the directed cyclic graph (traversed
   * left
   * -> right)
   */
  trades: Trade[];
  /**
   * The step size that will be used to find the optimal swap amount in the
   * binary search
   */
  stepSize: string;
}

/** Trade is a single trade in a route */
export interface Trade {
  /** The pool id of the pool that is traded on */
  pool: Long;
  /** The denom of the token that is traded */
  tokenIn: string;
  /** The denom of the token that is received */
  tokenOut: string;
}

/**
 * RouteStatistics contains the number of trades the module has executed after a
 * swap on a given route and the profits from the trades
 */
export interface RouteStatistics {
  /** profits is the total profit from all trades on this route */
  profits: Coin[];
  /**
   * number_of_trades is the number of trades the module has executed using this
   * route
   */
  numberOfTrades: string;
  /** route is the route that was used (pool ids along the arbitrage route) */
  route: Long[];
}

/**
 * PoolWeights contains the weights of all of the different pool types. This
 * distinction is made and necessary because the execution time ranges
 * significantly between the different pool types. Each weight roughly
 * corresponds to the amount of time (in ms) it takes to execute a swap on that
 * pool type.
 *
 * DEPRECATED: This field is deprecated and will be removed in the next
 * release. It is replaced by the `info_by_pool_type` field.
 */
export interface PoolWeights {
  /** The weight of a stableswap pool */
  stableWeight: Long;
  /** The weight of a balancer pool */
  balancerWeight: Long;
  /** The weight of a concentrated pool */
  concentratedWeight: Long;
  /** The weight of a cosmwasm pool */
  cosmwasmWeight: Long;
}

/**
 * InfoByPoolType contains information pertaining to how expensive (in terms of
 * gas and time) it is to execute a swap on a given pool type. This distinction
 * is made and necessary because the execution time ranges significantly between
 * the different pool types.
 */
export interface InfoByPoolType {
  /** The stable pool info */
  stable:
    | StablePoolInfo
    | undefined;
  /** The balancer pool info */
  balancer:
    | BalancerPoolInfo
    | undefined;
  /** The concentrated pool info */
  concentrated:
    | ConcentratedPoolInfo
    | undefined;
  /** The cosmwasm pool info */
  cosmwasm: CosmwasmPoolInfo | undefined;
}

/** StablePoolInfo contains meta data pertaining to a stableswap pool type. */
export interface StablePoolInfo {
  /** The weight of a stableswap pool */
  weight: Long;
}

/** BalancerPoolInfo contains meta data pertaining to a balancer pool type. */
export interface BalancerPoolInfo {
  /** The weight of a balancer pool */
  weight: Long;
}

/**
 * ConcentratedPoolInfo contains meta data pertaining to a concentrated pool
 * type.
 */
export interface ConcentratedPoolInfo {
  /** The weight of a concentrated pool */
  weight: Long;
  /** The maximum number of ticks we can move when rebalancing */
  maxTicksCrossed: Long;
}

/** CosmwasmPoolInfo contains meta data pertaining to a cosmwasm pool type. */
export interface CosmwasmPoolInfo {
  /** The weight of a cosmwasm pool (by contract address) */
  weightMaps: WeightMap[];
}

/**
 * WeightMap maps a contract address to a weight. The weight of an address
 * corresponds to the amount of ms required to execute a swap on that contract.
 */
export interface WeightMap {
  /** The weight of a cosmwasm pool (by contract address) */
  weight: Long;
  /** The contract address */
  contractAddress: string;
}

/**
 * BaseDenom represents a single base denom that the module uses for its
 * arbitrage trades. It contains the denom name alongside the step size of the
 * binary search that is used to find the optimal swap amount
 */
export interface BaseDenom {
  /** The denom i.e. name of the base denom (ex. uosmo) */
  denom: string;
  /**
   * The step size of the binary search that is used to find the optimal swap
   * amount
   */
  stepSize: string;
}

/**
 * BaseDenoms represents all of the base denoms that the module uses for its
 * arbitrage trades.
 */
export interface BaseDenoms {
  baseDenoms: BaseDenom[];
}

export interface AllProtocolRevenue {
  takerFeesTracker: TakerFeesTracker | undefined;
  cyclicArbTracker: CyclicArbTracker | undefined;
}

export interface CyclicArbTracker {
  cyclicArb: Coin[];
  heightAccountingStartsFrom: Long;
}

function createBaseTokenPairArbRoutes(): TokenPairArbRoutes {
  return { arbRoutes: [], tokenIn: "", tokenOut: "" };
}

export const TokenPairArbRoutes = {
  encode(message: TokenPairArbRoutes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.arbRoutes) {
      Route.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenPairArbRoutes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenPairArbRoutes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.arbRoutes.push(Route.decode(reader, reader.uint32()));
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

  fromJSON(object: any): TokenPairArbRoutes {
    return {
      arbRoutes: globalThis.Array.isArray(object?.arbRoutes) ? object.arbRoutes.map((e: any) => Route.fromJSON(e)) : [],
      tokenIn: isSet(object.tokenIn) ? globalThis.String(object.tokenIn) : "",
      tokenOut: isSet(object.tokenOut) ? globalThis.String(object.tokenOut) : "",
    };
  },

  toJSON(message: TokenPairArbRoutes): unknown {
    const obj: any = {};
    if (message.arbRoutes?.length) {
      obj.arbRoutes = message.arbRoutes.map((e) => Route.toJSON(e));
    }
    if (message.tokenIn !== "") {
      obj.tokenIn = message.tokenIn;
    }
    if (message.tokenOut !== "") {
      obj.tokenOut = message.tokenOut;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TokenPairArbRoutes>, I>>(base?: I): TokenPairArbRoutes {
    return TokenPairArbRoutes.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TokenPairArbRoutes>, I>>(object: I): TokenPairArbRoutes {
    const message = createBaseTokenPairArbRoutes();
    message.arbRoutes = object.arbRoutes?.map((e) => Route.fromPartial(e)) || [];
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
};

function createBaseRoute(): Route {
  return { trades: [], stepSize: "" };
}

export const Route = {
  encode(message: Route, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.trades) {
      Trade.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.stepSize !== "") {
      writer.uint32(18).string(message.stepSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Route {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.trades.push(Trade.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stepSize = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Route {
    return {
      trades: globalThis.Array.isArray(object?.trades) ? object.trades.map((e: any) => Trade.fromJSON(e)) : [],
      stepSize: isSet(object.stepSize) ? globalThis.String(object.stepSize) : "",
    };
  },

  toJSON(message: Route): unknown {
    const obj: any = {};
    if (message.trades?.length) {
      obj.trades = message.trades.map((e) => Trade.toJSON(e));
    }
    if (message.stepSize !== "") {
      obj.stepSize = message.stepSize;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Route>, I>>(base?: I): Route {
    return Route.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Route>, I>>(object: I): Route {
    const message = createBaseRoute();
    message.trades = object.trades?.map((e) => Trade.fromPartial(e)) || [];
    message.stepSize = object.stepSize ?? "";
    return message;
  },
};

function createBaseTrade(): Trade {
  return { pool: Long.UZERO, tokenIn: "", tokenOut: "" };
}

export const Trade = {
  encode(message: Trade, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.pool.isZero()) {
      writer.uint32(8).uint64(message.pool);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Trade {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.pool = reader.uint64() as Long;
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

  fromJSON(object: any): Trade {
    return {
      pool: isSet(object.pool) ? Long.fromValue(object.pool) : Long.UZERO,
      tokenIn: isSet(object.tokenIn) ? globalThis.String(object.tokenIn) : "",
      tokenOut: isSet(object.tokenOut) ? globalThis.String(object.tokenOut) : "",
    };
  },

  toJSON(message: Trade): unknown {
    const obj: any = {};
    if (!message.pool.isZero()) {
      obj.pool = (message.pool || Long.UZERO).toString();
    }
    if (message.tokenIn !== "") {
      obj.tokenIn = message.tokenIn;
    }
    if (message.tokenOut !== "") {
      obj.tokenOut = message.tokenOut;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Trade>, I>>(base?: I): Trade {
    return Trade.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Trade>, I>>(object: I): Trade {
    const message = createBaseTrade();
    message.pool = (object.pool !== undefined && object.pool !== null) ? Long.fromValue(object.pool) : Long.UZERO;
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
};

function createBaseRouteStatistics(): RouteStatistics {
  return { profits: [], numberOfTrades: "", route: [] };
}

export const RouteStatistics = {
  encode(message: RouteStatistics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.profits) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.numberOfTrades !== "") {
      writer.uint32(18).string(message.numberOfTrades);
    }
    writer.uint32(26).fork();
    for (const v of message.route) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RouteStatistics {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRouteStatistics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.profits.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.numberOfTrades = reader.string();
          continue;
        case 3:
          if (tag === 24) {
            message.route.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 26) {
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

  fromJSON(object: any): RouteStatistics {
    return {
      profits: globalThis.Array.isArray(object?.profits) ? object.profits.map((e: any) => Coin.fromJSON(e)) : [],
      numberOfTrades: isSet(object.numberOfTrades) ? globalThis.String(object.numberOfTrades) : "",
      route: globalThis.Array.isArray(object?.route) ? object.route.map((e: any) => Long.fromValue(e)) : [],
    };
  },

  toJSON(message: RouteStatistics): unknown {
    const obj: any = {};
    if (message.profits?.length) {
      obj.profits = message.profits.map((e) => Coin.toJSON(e));
    }
    if (message.numberOfTrades !== "") {
      obj.numberOfTrades = message.numberOfTrades;
    }
    if (message.route?.length) {
      obj.route = message.route.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RouteStatistics>, I>>(base?: I): RouteStatistics {
    return RouteStatistics.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RouteStatistics>, I>>(object: I): RouteStatistics {
    const message = createBaseRouteStatistics();
    message.profits = object.profits?.map((e) => Coin.fromPartial(e)) || [];
    message.numberOfTrades = object.numberOfTrades ?? "";
    message.route = object.route?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBasePoolWeights(): PoolWeights {
  return {
    stableWeight: Long.UZERO,
    balancerWeight: Long.UZERO,
    concentratedWeight: Long.UZERO,
    cosmwasmWeight: Long.UZERO,
  };
}

export const PoolWeights = {
  encode(message: PoolWeights, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.stableWeight.isZero()) {
      writer.uint32(8).uint64(message.stableWeight);
    }
    if (!message.balancerWeight.isZero()) {
      writer.uint32(16).uint64(message.balancerWeight);
    }
    if (!message.concentratedWeight.isZero()) {
      writer.uint32(24).uint64(message.concentratedWeight);
    }
    if (!message.cosmwasmWeight.isZero()) {
      writer.uint32(32).uint64(message.cosmwasmWeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolWeights {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolWeights();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.stableWeight = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.balancerWeight = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.concentratedWeight = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.cosmwasmWeight = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolWeights {
    return {
      stableWeight: isSet(object.stableWeight) ? Long.fromValue(object.stableWeight) : Long.UZERO,
      balancerWeight: isSet(object.balancerWeight) ? Long.fromValue(object.balancerWeight) : Long.UZERO,
      concentratedWeight: isSet(object.concentratedWeight) ? Long.fromValue(object.concentratedWeight) : Long.UZERO,
      cosmwasmWeight: isSet(object.cosmwasmWeight) ? Long.fromValue(object.cosmwasmWeight) : Long.UZERO,
    };
  },

  toJSON(message: PoolWeights): unknown {
    const obj: any = {};
    if (!message.stableWeight.isZero()) {
      obj.stableWeight = (message.stableWeight || Long.UZERO).toString();
    }
    if (!message.balancerWeight.isZero()) {
      obj.balancerWeight = (message.balancerWeight || Long.UZERO).toString();
    }
    if (!message.concentratedWeight.isZero()) {
      obj.concentratedWeight = (message.concentratedWeight || Long.UZERO).toString();
    }
    if (!message.cosmwasmWeight.isZero()) {
      obj.cosmwasmWeight = (message.cosmwasmWeight || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolWeights>, I>>(base?: I): PoolWeights {
    return PoolWeights.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolWeights>, I>>(object: I): PoolWeights {
    const message = createBasePoolWeights();
    message.stableWeight = (object.stableWeight !== undefined && object.stableWeight !== null)
      ? Long.fromValue(object.stableWeight)
      : Long.UZERO;
    message.balancerWeight = (object.balancerWeight !== undefined && object.balancerWeight !== null)
      ? Long.fromValue(object.balancerWeight)
      : Long.UZERO;
    message.concentratedWeight = (object.concentratedWeight !== undefined && object.concentratedWeight !== null)
      ? Long.fromValue(object.concentratedWeight)
      : Long.UZERO;
    message.cosmwasmWeight = (object.cosmwasmWeight !== undefined && object.cosmwasmWeight !== null)
      ? Long.fromValue(object.cosmwasmWeight)
      : Long.UZERO;
    return message;
  },
};

function createBaseInfoByPoolType(): InfoByPoolType {
  return { stable: undefined, balancer: undefined, concentrated: undefined, cosmwasm: undefined };
}

export const InfoByPoolType = {
  encode(message: InfoByPoolType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stable !== undefined) {
      StablePoolInfo.encode(message.stable, writer.uint32(10).fork()).ldelim();
    }
    if (message.balancer !== undefined) {
      BalancerPoolInfo.encode(message.balancer, writer.uint32(18).fork()).ldelim();
    }
    if (message.concentrated !== undefined) {
      ConcentratedPoolInfo.encode(message.concentrated, writer.uint32(26).fork()).ldelim();
    }
    if (message.cosmwasm !== undefined) {
      CosmwasmPoolInfo.encode(message.cosmwasm, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InfoByPoolType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfoByPoolType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stable = StablePoolInfo.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.balancer = BalancerPoolInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.concentrated = ConcentratedPoolInfo.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cosmwasm = CosmwasmPoolInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InfoByPoolType {
    return {
      stable: isSet(object.stable) ? StablePoolInfo.fromJSON(object.stable) : undefined,
      balancer: isSet(object.balancer) ? BalancerPoolInfo.fromJSON(object.balancer) : undefined,
      concentrated: isSet(object.concentrated) ? ConcentratedPoolInfo.fromJSON(object.concentrated) : undefined,
      cosmwasm: isSet(object.cosmwasm) ? CosmwasmPoolInfo.fromJSON(object.cosmwasm) : undefined,
    };
  },

  toJSON(message: InfoByPoolType): unknown {
    const obj: any = {};
    if (message.stable !== undefined) {
      obj.stable = StablePoolInfo.toJSON(message.stable);
    }
    if (message.balancer !== undefined) {
      obj.balancer = BalancerPoolInfo.toJSON(message.balancer);
    }
    if (message.concentrated !== undefined) {
      obj.concentrated = ConcentratedPoolInfo.toJSON(message.concentrated);
    }
    if (message.cosmwasm !== undefined) {
      obj.cosmwasm = CosmwasmPoolInfo.toJSON(message.cosmwasm);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InfoByPoolType>, I>>(base?: I): InfoByPoolType {
    return InfoByPoolType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InfoByPoolType>, I>>(object: I): InfoByPoolType {
    const message = createBaseInfoByPoolType();
    message.stable = (object.stable !== undefined && object.stable !== null)
      ? StablePoolInfo.fromPartial(object.stable)
      : undefined;
    message.balancer = (object.balancer !== undefined && object.balancer !== null)
      ? BalancerPoolInfo.fromPartial(object.balancer)
      : undefined;
    message.concentrated = (object.concentrated !== undefined && object.concentrated !== null)
      ? ConcentratedPoolInfo.fromPartial(object.concentrated)
      : undefined;
    message.cosmwasm = (object.cosmwasm !== undefined && object.cosmwasm !== null)
      ? CosmwasmPoolInfo.fromPartial(object.cosmwasm)
      : undefined;
    return message;
  },
};

function createBaseStablePoolInfo(): StablePoolInfo {
  return { weight: Long.UZERO };
}

export const StablePoolInfo = {
  encode(message: StablePoolInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.weight.isZero()) {
      writer.uint32(8).uint64(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StablePoolInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStablePoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.weight = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StablePoolInfo {
    return { weight: isSet(object.weight) ? Long.fromValue(object.weight) : Long.UZERO };
  },

  toJSON(message: StablePoolInfo): unknown {
    const obj: any = {};
    if (!message.weight.isZero()) {
      obj.weight = (message.weight || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StablePoolInfo>, I>>(base?: I): StablePoolInfo {
    return StablePoolInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StablePoolInfo>, I>>(object: I): StablePoolInfo {
    const message = createBaseStablePoolInfo();
    message.weight = (object.weight !== undefined && object.weight !== null)
      ? Long.fromValue(object.weight)
      : Long.UZERO;
    return message;
  },
};

function createBaseBalancerPoolInfo(): BalancerPoolInfo {
  return { weight: Long.UZERO };
}

export const BalancerPoolInfo = {
  encode(message: BalancerPoolInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.weight.isZero()) {
      writer.uint32(8).uint64(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BalancerPoolInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalancerPoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.weight = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BalancerPoolInfo {
    return { weight: isSet(object.weight) ? Long.fromValue(object.weight) : Long.UZERO };
  },

  toJSON(message: BalancerPoolInfo): unknown {
    const obj: any = {};
    if (!message.weight.isZero()) {
      obj.weight = (message.weight || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BalancerPoolInfo>, I>>(base?: I): BalancerPoolInfo {
    return BalancerPoolInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BalancerPoolInfo>, I>>(object: I): BalancerPoolInfo {
    const message = createBaseBalancerPoolInfo();
    message.weight = (object.weight !== undefined && object.weight !== null)
      ? Long.fromValue(object.weight)
      : Long.UZERO;
    return message;
  },
};

function createBaseConcentratedPoolInfo(): ConcentratedPoolInfo {
  return { weight: Long.UZERO, maxTicksCrossed: Long.UZERO };
}

export const ConcentratedPoolInfo = {
  encode(message: ConcentratedPoolInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.weight.isZero()) {
      writer.uint32(8).uint64(message.weight);
    }
    if (!message.maxTicksCrossed.isZero()) {
      writer.uint32(16).uint64(message.maxTicksCrossed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConcentratedPoolInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConcentratedPoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.weight = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxTicksCrossed = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConcentratedPoolInfo {
    return {
      weight: isSet(object.weight) ? Long.fromValue(object.weight) : Long.UZERO,
      maxTicksCrossed: isSet(object.maxTicksCrossed) ? Long.fromValue(object.maxTicksCrossed) : Long.UZERO,
    };
  },

  toJSON(message: ConcentratedPoolInfo): unknown {
    const obj: any = {};
    if (!message.weight.isZero()) {
      obj.weight = (message.weight || Long.UZERO).toString();
    }
    if (!message.maxTicksCrossed.isZero()) {
      obj.maxTicksCrossed = (message.maxTicksCrossed || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConcentratedPoolInfo>, I>>(base?: I): ConcentratedPoolInfo {
    return ConcentratedPoolInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConcentratedPoolInfo>, I>>(object: I): ConcentratedPoolInfo {
    const message = createBaseConcentratedPoolInfo();
    message.weight = (object.weight !== undefined && object.weight !== null)
      ? Long.fromValue(object.weight)
      : Long.UZERO;
    message.maxTicksCrossed = (object.maxTicksCrossed !== undefined && object.maxTicksCrossed !== null)
      ? Long.fromValue(object.maxTicksCrossed)
      : Long.UZERO;
    return message;
  },
};

function createBaseCosmwasmPoolInfo(): CosmwasmPoolInfo {
  return { weightMaps: [] };
}

export const CosmwasmPoolInfo = {
  encode(message: CosmwasmPoolInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.weightMaps) {
      WeightMap.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CosmwasmPoolInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCosmwasmPoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.weightMaps.push(WeightMap.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CosmwasmPoolInfo {
    return {
      weightMaps: globalThis.Array.isArray(object?.weightMaps)
        ? object.weightMaps.map((e: any) => WeightMap.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CosmwasmPoolInfo): unknown {
    const obj: any = {};
    if (message.weightMaps?.length) {
      obj.weightMaps = message.weightMaps.map((e) => WeightMap.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CosmwasmPoolInfo>, I>>(base?: I): CosmwasmPoolInfo {
    return CosmwasmPoolInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CosmwasmPoolInfo>, I>>(object: I): CosmwasmPoolInfo {
    const message = createBaseCosmwasmPoolInfo();
    message.weightMaps = object.weightMaps?.map((e) => WeightMap.fromPartial(e)) || [];
    return message;
  },
};

function createBaseWeightMap(): WeightMap {
  return { weight: Long.UZERO, contractAddress: "" };
}

export const WeightMap = {
  encode(message: WeightMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.weight.isZero()) {
      writer.uint32(8).uint64(message.weight);
    }
    if (message.contractAddress !== "") {
      writer.uint32(18).string(message.contractAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WeightMap {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeightMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.weight = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.contractAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WeightMap {
    return {
      weight: isSet(object.weight) ? Long.fromValue(object.weight) : Long.UZERO,
      contractAddress: isSet(object.contractAddress) ? globalThis.String(object.contractAddress) : "",
    };
  },

  toJSON(message: WeightMap): unknown {
    const obj: any = {};
    if (!message.weight.isZero()) {
      obj.weight = (message.weight || Long.UZERO).toString();
    }
    if (message.contractAddress !== "") {
      obj.contractAddress = message.contractAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WeightMap>, I>>(base?: I): WeightMap {
    return WeightMap.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WeightMap>, I>>(object: I): WeightMap {
    const message = createBaseWeightMap();
    message.weight = (object.weight !== undefined && object.weight !== null)
      ? Long.fromValue(object.weight)
      : Long.UZERO;
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
};

function createBaseBaseDenom(): BaseDenom {
  return { denom: "", stepSize: "" };
}

export const BaseDenom = {
  encode(message: BaseDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.stepSize !== "") {
      writer.uint32(18).string(message.stepSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseDenom {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stepSize = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BaseDenom {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      stepSize: isSet(object.stepSize) ? globalThis.String(object.stepSize) : "",
    };
  },

  toJSON(message: BaseDenom): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.stepSize !== "") {
      obj.stepSize = message.stepSize;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BaseDenom>, I>>(base?: I): BaseDenom {
    return BaseDenom.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BaseDenom>, I>>(object: I): BaseDenom {
    const message = createBaseBaseDenom();
    message.denom = object.denom ?? "";
    message.stepSize = object.stepSize ?? "";
    return message;
  },
};

function createBaseBaseDenoms(): BaseDenoms {
  return { baseDenoms: [] };
}

export const BaseDenoms = {
  encode(message: BaseDenoms, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.baseDenoms) {
      BaseDenom.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseDenoms {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseDenoms();
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

  fromJSON(object: any): BaseDenoms {
    return {
      baseDenoms: globalThis.Array.isArray(object?.baseDenoms)
        ? object.baseDenoms.map((e: any) => BaseDenom.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BaseDenoms): unknown {
    const obj: any = {};
    if (message.baseDenoms?.length) {
      obj.baseDenoms = message.baseDenoms.map((e) => BaseDenom.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BaseDenoms>, I>>(base?: I): BaseDenoms {
    return BaseDenoms.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BaseDenoms>, I>>(object: I): BaseDenoms {
    const message = createBaseBaseDenoms();
    message.baseDenoms = object.baseDenoms?.map((e) => BaseDenom.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAllProtocolRevenue(): AllProtocolRevenue {
  return { takerFeesTracker: undefined, cyclicArbTracker: undefined };
}

export const AllProtocolRevenue = {
  encode(message: AllProtocolRevenue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.takerFeesTracker !== undefined) {
      TakerFeesTracker.encode(message.takerFeesTracker, writer.uint32(10).fork()).ldelim();
    }
    if (message.cyclicArbTracker !== undefined) {
      CyclicArbTracker.encode(message.cyclicArbTracker, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllProtocolRevenue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllProtocolRevenue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.takerFeesTracker = TakerFeesTracker.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cyclicArbTracker = CyclicArbTracker.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllProtocolRevenue {
    return {
      takerFeesTracker: isSet(object.takerFeesTracker) ? TakerFeesTracker.fromJSON(object.takerFeesTracker) : undefined,
      cyclicArbTracker: isSet(object.cyclicArbTracker) ? CyclicArbTracker.fromJSON(object.cyclicArbTracker) : undefined,
    };
  },

  toJSON(message: AllProtocolRevenue): unknown {
    const obj: any = {};
    if (message.takerFeesTracker !== undefined) {
      obj.takerFeesTracker = TakerFeesTracker.toJSON(message.takerFeesTracker);
    }
    if (message.cyclicArbTracker !== undefined) {
      obj.cyclicArbTracker = CyclicArbTracker.toJSON(message.cyclicArbTracker);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AllProtocolRevenue>, I>>(base?: I): AllProtocolRevenue {
    return AllProtocolRevenue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AllProtocolRevenue>, I>>(object: I): AllProtocolRevenue {
    const message = createBaseAllProtocolRevenue();
    message.takerFeesTracker = (object.takerFeesTracker !== undefined && object.takerFeesTracker !== null)
      ? TakerFeesTracker.fromPartial(object.takerFeesTracker)
      : undefined;
    message.cyclicArbTracker = (object.cyclicArbTracker !== undefined && object.cyclicArbTracker !== null)
      ? CyclicArbTracker.fromPartial(object.cyclicArbTracker)
      : undefined;
    return message;
  },
};

function createBaseCyclicArbTracker(): CyclicArbTracker {
  return { cyclicArb: [], heightAccountingStartsFrom: Long.ZERO };
}

export const CyclicArbTracker = {
  encode(message: CyclicArbTracker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.cyclicArb) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (!message.heightAccountingStartsFrom.isZero()) {
      writer.uint32(16).int64(message.heightAccountingStartsFrom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CyclicArbTracker {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCyclicArbTracker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cyclicArb.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.heightAccountingStartsFrom = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CyclicArbTracker {
    return {
      cyclicArb: globalThis.Array.isArray(object?.cyclicArb) ? object.cyclicArb.map((e: any) => Coin.fromJSON(e)) : [],
      heightAccountingStartsFrom: isSet(object.heightAccountingStartsFrom)
        ? Long.fromValue(object.heightAccountingStartsFrom)
        : Long.ZERO,
    };
  },

  toJSON(message: CyclicArbTracker): unknown {
    const obj: any = {};
    if (message.cyclicArb?.length) {
      obj.cyclicArb = message.cyclicArb.map((e) => Coin.toJSON(e));
    }
    if (!message.heightAccountingStartsFrom.isZero()) {
      obj.heightAccountingStartsFrom = (message.heightAccountingStartsFrom || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CyclicArbTracker>, I>>(base?: I): CyclicArbTracker {
    return CyclicArbTracker.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CyclicArbTracker>, I>>(object: I): CyclicArbTracker {
    const message = createBaseCyclicArbTracker();
    message.cyclicArb = object.cyclicArb?.map((e) => Coin.fromPartial(e)) || [];
    message.heightAccountingStartsFrom =
      (object.heightAccountingStartsFrom !== undefined && object.heightAccountingStartsFrom !== null)
        ? Long.fromValue(object.heightAccountingStartsFrom)
        : Long.ZERO;
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
