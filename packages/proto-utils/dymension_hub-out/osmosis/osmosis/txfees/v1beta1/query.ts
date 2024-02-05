/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { FeeToken } from "./feetoken";

export const protobufPackage = "osmosis.txfees.v1beta1";

export interface QueryFeeTokensRequest {
}

export interface QueryFeeTokensResponse {
  feeTokens: FeeToken[];
}

/**
 * QueryDenomSpotPriceRequest defines grpc request structure for querying spot
 * price for the specified tx fee denom
 */
export interface QueryDenomSpotPriceRequest {
  denom: string;
}

/**
 * QueryDenomSpotPriceRequest defines grpc response structure for querying spot
 * price for the specified tx fee denom
 */
export interface QueryDenomSpotPriceResponse {
  poolID: Long;
  spotPrice: string;
}

export interface QueryDenomPoolIdRequest {
  denom: string;
}

export interface QueryDenomPoolIdResponse {
  poolID: Long;
}

export interface QueryBaseDenomRequest {
}

export interface QueryBaseDenomResponse {
  baseDenom: string;
}

export interface QueryEipBaseFeeRequest {
}

export interface QueryEipBaseFeeResponse {
  baseFee: string;
}

function createBaseQueryFeeTokensRequest(): QueryFeeTokensRequest {
  return {};
}

export const QueryFeeTokensRequest = {
  encode(_: QueryFeeTokensRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeTokensRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeTokensRequest();
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

  fromJSON(_: any): QueryFeeTokensRequest {
    return {};
  },

  toJSON(_: QueryFeeTokensRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryFeeTokensRequest>, I>>(base?: I): QueryFeeTokensRequest {
    return QueryFeeTokensRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryFeeTokensRequest>, I>>(_: I): QueryFeeTokensRequest {
    const message = createBaseQueryFeeTokensRequest();
    return message;
  },
};

function createBaseQueryFeeTokensResponse(): QueryFeeTokensResponse {
  return { feeTokens: [] };
}

export const QueryFeeTokensResponse = {
  encode(message: QueryFeeTokensResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.feeTokens) {
      FeeToken.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeTokensResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.feeTokens.push(FeeToken.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryFeeTokensResponse {
    return {
      feeTokens: globalThis.Array.isArray(object?.feeTokens)
        ? object.feeTokens.map((e: any) => FeeToken.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryFeeTokensResponse): unknown {
    const obj: any = {};
    if (message.feeTokens?.length) {
      obj.feeTokens = message.feeTokens.map((e) => FeeToken.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryFeeTokensResponse>, I>>(base?: I): QueryFeeTokensResponse {
    return QueryFeeTokensResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryFeeTokensResponse>, I>>(object: I): QueryFeeTokensResponse {
    const message = createBaseQueryFeeTokensResponse();
    message.feeTokens = object.feeTokens?.map((e) => FeeToken.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryDenomSpotPriceRequest(): QueryDenomSpotPriceRequest {
  return { denom: "" };
}

export const QueryDenomSpotPriceRequest = {
  encode(message: QueryDenomSpotPriceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomSpotPriceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomSpotPriceRequest();
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

  fromJSON(object: any): QueryDenomSpotPriceRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: QueryDenomSpotPriceRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomSpotPriceRequest>, I>>(base?: I): QueryDenomSpotPriceRequest {
    return QueryDenomSpotPriceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomSpotPriceRequest>, I>>(object: I): QueryDenomSpotPriceRequest {
    const message = createBaseQueryDenomSpotPriceRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryDenomSpotPriceResponse(): QueryDenomSpotPriceResponse {
  return { poolID: Long.UZERO, spotPrice: "" };
}

export const QueryDenomSpotPriceResponse = {
  encode(message: QueryDenomSpotPriceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolID.isZero()) {
      writer.uint32(8).uint64(message.poolID);
    }
    if (message.spotPrice !== "") {
      writer.uint32(18).string(message.spotPrice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomSpotPriceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomSpotPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolID = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): QueryDenomSpotPriceResponse {
    return {
      poolID: isSet(object.poolID) ? Long.fromValue(object.poolID) : Long.UZERO,
      spotPrice: isSet(object.spotPrice) ? globalThis.String(object.spotPrice) : "",
    };
  },

  toJSON(message: QueryDenomSpotPriceResponse): unknown {
    const obj: any = {};
    if (!message.poolID.isZero()) {
      obj.poolID = (message.poolID || Long.UZERO).toString();
    }
    if (message.spotPrice !== "") {
      obj.spotPrice = message.spotPrice;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomSpotPriceResponse>, I>>(base?: I): QueryDenomSpotPriceResponse {
    return QueryDenomSpotPriceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomSpotPriceResponse>, I>>(object: I): QueryDenomSpotPriceResponse {
    const message = createBaseQueryDenomSpotPriceResponse();
    message.poolID = (object.poolID !== undefined && object.poolID !== null)
      ? Long.fromValue(object.poolID)
      : Long.UZERO;
    message.spotPrice = object.spotPrice ?? "";
    return message;
  },
};

function createBaseQueryDenomPoolIdRequest(): QueryDenomPoolIdRequest {
  return { denom: "" };
}

export const QueryDenomPoolIdRequest = {
  encode(message: QueryDenomPoolIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomPoolIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomPoolIdRequest();
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

  fromJSON(object: any): QueryDenomPoolIdRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: QueryDenomPoolIdRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomPoolIdRequest>, I>>(base?: I): QueryDenomPoolIdRequest {
    return QueryDenomPoolIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomPoolIdRequest>, I>>(object: I): QueryDenomPoolIdRequest {
    const message = createBaseQueryDenomPoolIdRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryDenomPoolIdResponse(): QueryDenomPoolIdResponse {
  return { poolID: Long.UZERO };
}

export const QueryDenomPoolIdResponse = {
  encode(message: QueryDenomPoolIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolID.isZero()) {
      writer.uint32(8).uint64(message.poolID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomPoolIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomPoolIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolID = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomPoolIdResponse {
    return { poolID: isSet(object.poolID) ? Long.fromValue(object.poolID) : Long.UZERO };
  },

  toJSON(message: QueryDenomPoolIdResponse): unknown {
    const obj: any = {};
    if (!message.poolID.isZero()) {
      obj.poolID = (message.poolID || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomPoolIdResponse>, I>>(base?: I): QueryDenomPoolIdResponse {
    return QueryDenomPoolIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomPoolIdResponse>, I>>(object: I): QueryDenomPoolIdResponse {
    const message = createBaseQueryDenomPoolIdResponse();
    message.poolID = (object.poolID !== undefined && object.poolID !== null)
      ? Long.fromValue(object.poolID)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryBaseDenomRequest(): QueryBaseDenomRequest {
  return {};
}

export const QueryBaseDenomRequest = {
  encode(_: QueryBaseDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBaseDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBaseDenomRequest();
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

  fromJSON(_: any): QueryBaseDenomRequest {
    return {};
  },

  toJSON(_: QueryBaseDenomRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryBaseDenomRequest>, I>>(base?: I): QueryBaseDenomRequest {
    return QueryBaseDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryBaseDenomRequest>, I>>(_: I): QueryBaseDenomRequest {
    const message = createBaseQueryBaseDenomRequest();
    return message;
  },
};

function createBaseQueryBaseDenomResponse(): QueryBaseDenomResponse {
  return { baseDenom: "" };
}

export const QueryBaseDenomResponse = {
  encode(message: QueryBaseDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseDenom !== "") {
      writer.uint32(10).string(message.baseDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBaseDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBaseDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.baseDenom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryBaseDenomResponse {
    return { baseDenom: isSet(object.baseDenom) ? globalThis.String(object.baseDenom) : "" };
  },

  toJSON(message: QueryBaseDenomResponse): unknown {
    const obj: any = {};
    if (message.baseDenom !== "") {
      obj.baseDenom = message.baseDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryBaseDenomResponse>, I>>(base?: I): QueryBaseDenomResponse {
    return QueryBaseDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryBaseDenomResponse>, I>>(object: I): QueryBaseDenomResponse {
    const message = createBaseQueryBaseDenomResponse();
    message.baseDenom = object.baseDenom ?? "";
    return message;
  },
};

function createBaseQueryEipBaseFeeRequest(): QueryEipBaseFeeRequest {
  return {};
}

export const QueryEipBaseFeeRequest = {
  encode(_: QueryEipBaseFeeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEipBaseFeeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEipBaseFeeRequest();
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

  fromJSON(_: any): QueryEipBaseFeeRequest {
    return {};
  },

  toJSON(_: QueryEipBaseFeeRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEipBaseFeeRequest>, I>>(base?: I): QueryEipBaseFeeRequest {
    return QueryEipBaseFeeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEipBaseFeeRequest>, I>>(_: I): QueryEipBaseFeeRequest {
    const message = createBaseQueryEipBaseFeeRequest();
    return message;
  },
};

function createBaseQueryEipBaseFeeResponse(): QueryEipBaseFeeResponse {
  return { baseFee: "" };
}

export const QueryEipBaseFeeResponse = {
  encode(message: QueryEipBaseFeeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseFee !== "") {
      writer.uint32(10).string(message.baseFee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEipBaseFeeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEipBaseFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.baseFee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryEipBaseFeeResponse {
    return { baseFee: isSet(object.baseFee) ? globalThis.String(object.baseFee) : "" };
  },

  toJSON(message: QueryEipBaseFeeResponse): unknown {
    const obj: any = {};
    if (message.baseFee !== "") {
      obj.baseFee = message.baseFee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEipBaseFeeResponse>, I>>(base?: I): QueryEipBaseFeeResponse {
    return QueryEipBaseFeeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEipBaseFeeResponse>, I>>(object: I): QueryEipBaseFeeResponse {
    const message = createBaseQueryEipBaseFeeResponse();
    message.baseFee = object.baseFee ?? "";
    return message;
  },
};

export interface Query {
  /**
   * FeeTokens returns a list of all the whitelisted fee tokens and their
   * corresponding pools. It does not include the BaseDenom, which has its own
   * query endpoint
   */
  FeeTokens(request: QueryFeeTokensRequest): Promise<QueryFeeTokensResponse>;
  /** DenomSpotPrice returns all spot prices by each registered token denom. */
  DenomSpotPrice(request: QueryDenomSpotPriceRequest): Promise<QueryDenomSpotPriceResponse>;
  /** Returns the poolID for a specified denom input. */
  DenomPoolId(request: QueryDenomPoolIdRequest): Promise<QueryDenomPoolIdResponse>;
  /** Returns a list of all base denom tokens and their corresponding pools. */
  BaseDenom(request: QueryBaseDenomRequest): Promise<QueryBaseDenomResponse>;
  /** Returns a list of all base denom tokens and their corresponding pools. */
  GetEipBaseFee(request: QueryEipBaseFeeRequest): Promise<QueryEipBaseFeeResponse>;
}

export const QueryServiceName = "osmosis.txfees.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.FeeTokens = this.FeeTokens.bind(this);
    this.DenomSpotPrice = this.DenomSpotPrice.bind(this);
    this.DenomPoolId = this.DenomPoolId.bind(this);
    this.BaseDenom = this.BaseDenom.bind(this);
    this.GetEipBaseFee = this.GetEipBaseFee.bind(this);
  }
  FeeTokens(request: QueryFeeTokensRequest): Promise<QueryFeeTokensResponse> {
    const data = QueryFeeTokensRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "FeeTokens", data);
    return promise.then((data) => QueryFeeTokensResponse.decode(_m0.Reader.create(data)));
  }

  DenomSpotPrice(request: QueryDenomSpotPriceRequest): Promise<QueryDenomSpotPriceResponse> {
    const data = QueryDenomSpotPriceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomSpotPrice", data);
    return promise.then((data) => QueryDenomSpotPriceResponse.decode(_m0.Reader.create(data)));
  }

  DenomPoolId(request: QueryDenomPoolIdRequest): Promise<QueryDenomPoolIdResponse> {
    const data = QueryDenomPoolIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomPoolId", data);
    return promise.then((data) => QueryDenomPoolIdResponse.decode(_m0.Reader.create(data)));
  }

  BaseDenom(request: QueryBaseDenomRequest): Promise<QueryBaseDenomResponse> {
    const data = QueryBaseDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BaseDenom", data);
    return promise.then((data) => QueryBaseDenomResponse.decode(_m0.Reader.create(data)));
  }

  GetEipBaseFee(request: QueryEipBaseFeeRequest): Promise<QueryEipBaseFeeResponse> {
    const data = QueryEipBaseFeeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetEipBaseFee", data);
    return promise.then((data) => QueryEipBaseFeeResponse.decode(_m0.Reader.create(data)));
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
