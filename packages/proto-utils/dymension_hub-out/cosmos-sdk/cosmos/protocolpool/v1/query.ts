/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin, DecCoin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.protocolpool.v1";

/**
 * QueryCommunityPoolRequest is the request type for the Query/CommunityPool RPC
 * method.
 */
export interface QueryCommunityPoolRequest {
}

/**
 * QueryCommunityPoolResponse is the response type for the Query/CommunityPool
 * RPC method.
 */
export interface QueryCommunityPoolResponse {
  /** pool defines community pool's coins. */
  pool: DecCoin[];
}

/**
 * QueryUnclaimedBudgetRequest is the request type for the Query/UnclaimedBudgetRequest
 * RPC method.
 */
export interface QueryUnclaimedBudgetRequest {
  /** address is the recipient address to query unclaimed budget amount for. */
  address: string;
}

/**
 * QueryUnclaimedBudgetResponse is the response type for the Query/UnclaimedBudget
 * RPC method.
 */
export interface QueryUnclaimedBudgetResponse {
  /** total_budget is the total budget allocated to the recipient */
  totalBudget:
    | Coin
    | undefined;
  /** claimed_amount is the budget amount already claimed by the recipient */
  claimedAmount:
    | Coin
    | undefined;
  /** unclaimed_amount is the remaining budget amount that is unclaimed by the recipient */
  unclaimedAmount:
    | Coin
    | undefined;
  /**
   * next_claim_from is the next starting claim time for fund distribution.
   * It represents the time when we can claim funds after the period time interval has passed.
   */
  nextClaimFrom:
    | Date
    | undefined;
  /** period is the time interval for fund distribution */
  period:
    | Duration
    | undefined;
  /** tranches_left is the number of tranches left for the amount to be distributed */
  tranchesLeft: Long;
}

function createBaseQueryCommunityPoolRequest(): QueryCommunityPoolRequest {
  return {};
}

export const QueryCommunityPoolRequest = {
  encode(_: QueryCommunityPoolRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCommunityPoolRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCommunityPoolRequest();
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

  fromJSON(_: any): QueryCommunityPoolRequest {
    return {};
  },

  toJSON(_: QueryCommunityPoolRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCommunityPoolRequest>, I>>(base?: I): QueryCommunityPoolRequest {
    return QueryCommunityPoolRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCommunityPoolRequest>, I>>(_: I): QueryCommunityPoolRequest {
    const message = createBaseQueryCommunityPoolRequest();
    return message;
  },
};

function createBaseQueryCommunityPoolResponse(): QueryCommunityPoolResponse {
  return { pool: [] };
}

export const QueryCommunityPoolResponse = {
  encode(message: QueryCommunityPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pool) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCommunityPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCommunityPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pool.push(DecCoin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCommunityPoolResponse {
    return { pool: globalThis.Array.isArray(object?.pool) ? object.pool.map((e: any) => DecCoin.fromJSON(e)) : [] };
  },

  toJSON(message: QueryCommunityPoolResponse): unknown {
    const obj: any = {};
    if (message.pool?.length) {
      obj.pool = message.pool.map((e) => DecCoin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCommunityPoolResponse>, I>>(base?: I): QueryCommunityPoolResponse {
    return QueryCommunityPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCommunityPoolResponse>, I>>(object: I): QueryCommunityPoolResponse {
    const message = createBaseQueryCommunityPoolResponse();
    message.pool = object.pool?.map((e) => DecCoin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryUnclaimedBudgetRequest(): QueryUnclaimedBudgetRequest {
  return { address: "" };
}

export const QueryUnclaimedBudgetRequest = {
  encode(message: QueryUnclaimedBudgetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnclaimedBudgetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnclaimedBudgetRequest();
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

  fromJSON(object: any): QueryUnclaimedBudgetRequest {
    return { address: isSet(object.address) ? globalThis.String(object.address) : "" };
  },

  toJSON(message: QueryUnclaimedBudgetRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUnclaimedBudgetRequest>, I>>(base?: I): QueryUnclaimedBudgetRequest {
    return QueryUnclaimedBudgetRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUnclaimedBudgetRequest>, I>>(object: I): QueryUnclaimedBudgetRequest {
    const message = createBaseQueryUnclaimedBudgetRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryUnclaimedBudgetResponse(): QueryUnclaimedBudgetResponse {
  return {
    totalBudget: undefined,
    claimedAmount: undefined,
    unclaimedAmount: undefined,
    nextClaimFrom: undefined,
    period: undefined,
    tranchesLeft: Long.UZERO,
  };
}

export const QueryUnclaimedBudgetResponse = {
  encode(message: QueryUnclaimedBudgetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalBudget !== undefined) {
      Coin.encode(message.totalBudget, writer.uint32(10).fork()).ldelim();
    }
    if (message.claimedAmount !== undefined) {
      Coin.encode(message.claimedAmount, writer.uint32(18).fork()).ldelim();
    }
    if (message.unclaimedAmount !== undefined) {
      Coin.encode(message.unclaimedAmount, writer.uint32(26).fork()).ldelim();
    }
    if (message.nextClaimFrom !== undefined) {
      Timestamp.encode(toTimestamp(message.nextClaimFrom), writer.uint32(34).fork()).ldelim();
    }
    if (message.period !== undefined) {
      Duration.encode(message.period, writer.uint32(42).fork()).ldelim();
    }
    if (!message.tranchesLeft.isZero()) {
      writer.uint32(48).uint64(message.tranchesLeft);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnclaimedBudgetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnclaimedBudgetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.totalBudget = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.claimedAmount = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.unclaimedAmount = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.nextClaimFrom = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.period = Duration.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.tranchesLeft = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryUnclaimedBudgetResponse {
    return {
      totalBudget: isSet(object.totalBudget) ? Coin.fromJSON(object.totalBudget) : undefined,
      claimedAmount: isSet(object.claimedAmount) ? Coin.fromJSON(object.claimedAmount) : undefined,
      unclaimedAmount: isSet(object.unclaimedAmount) ? Coin.fromJSON(object.unclaimedAmount) : undefined,
      nextClaimFrom: isSet(object.nextClaimFrom) ? fromJsonTimestamp(object.nextClaimFrom) : undefined,
      period: isSet(object.period) ? Duration.fromJSON(object.period) : undefined,
      tranchesLeft: isSet(object.tranchesLeft) ? Long.fromValue(object.tranchesLeft) : Long.UZERO,
    };
  },

  toJSON(message: QueryUnclaimedBudgetResponse): unknown {
    const obj: any = {};
    if (message.totalBudget !== undefined) {
      obj.totalBudget = Coin.toJSON(message.totalBudget);
    }
    if (message.claimedAmount !== undefined) {
      obj.claimedAmount = Coin.toJSON(message.claimedAmount);
    }
    if (message.unclaimedAmount !== undefined) {
      obj.unclaimedAmount = Coin.toJSON(message.unclaimedAmount);
    }
    if (message.nextClaimFrom !== undefined) {
      obj.nextClaimFrom = message.nextClaimFrom.toISOString();
    }
    if (message.period !== undefined) {
      obj.period = Duration.toJSON(message.period);
    }
    if (!message.tranchesLeft.isZero()) {
      obj.tranchesLeft = (message.tranchesLeft || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUnclaimedBudgetResponse>, I>>(base?: I): QueryUnclaimedBudgetResponse {
    return QueryUnclaimedBudgetResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUnclaimedBudgetResponse>, I>>(object: I): QueryUnclaimedBudgetResponse {
    const message = createBaseQueryUnclaimedBudgetResponse();
    message.totalBudget = (object.totalBudget !== undefined && object.totalBudget !== null)
      ? Coin.fromPartial(object.totalBudget)
      : undefined;
    message.claimedAmount = (object.claimedAmount !== undefined && object.claimedAmount !== null)
      ? Coin.fromPartial(object.claimedAmount)
      : undefined;
    message.unclaimedAmount = (object.unclaimedAmount !== undefined && object.unclaimedAmount !== null)
      ? Coin.fromPartial(object.unclaimedAmount)
      : undefined;
    message.nextClaimFrom = object.nextClaimFrom ?? undefined;
    message.period = (object.period !== undefined && object.period !== null)
      ? Duration.fromPartial(object.period)
      : undefined;
    message.tranchesLeft = (object.tranchesLeft !== undefined && object.tranchesLeft !== null)
      ? Long.fromValue(object.tranchesLeft)
      : Long.UZERO;
    return message;
  },
};

/** Query defines the gRPC querier service for community pool module. */
export interface Query {
  /** CommunityPool queries the community pool coins. */
  CommunityPool(request: QueryCommunityPoolRequest): Promise<QueryCommunityPoolResponse>;
  /** UnclaimedBudget queries the remaining budget left to be claimed and it gives overall budget allocation view. */
  UnclaimedBudget(request: QueryUnclaimedBudgetRequest): Promise<QueryUnclaimedBudgetResponse>;
}

export const QueryServiceName = "cosmos.protocolpool.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.CommunityPool = this.CommunityPool.bind(this);
    this.UnclaimedBudget = this.UnclaimedBudget.bind(this);
  }
  CommunityPool(request: QueryCommunityPoolRequest): Promise<QueryCommunityPoolResponse> {
    const data = QueryCommunityPoolRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CommunityPool", data);
    return promise.then((data) => QueryCommunityPoolResponse.decode(_m0.Reader.create(data)));
  }

  UnclaimedBudget(request: QueryUnclaimedBudgetRequest): Promise<QueryUnclaimedBudgetResponse> {
    const data = QueryUnclaimedBudgetRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UnclaimedBudget", data);
    return promise.then((data) => QueryUnclaimedBudgetResponse.decode(_m0.Reader.create(data)));
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
