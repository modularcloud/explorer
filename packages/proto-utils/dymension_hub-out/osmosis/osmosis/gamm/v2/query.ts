/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.gamm.v2";

/**
 * Deprecated: please use alternate in x/poolmanager
 *
 * @deprecated
 */
export interface QuerySpotPriceRequest {
  poolId: Long;
  baseAssetDenom: string;
  quoteAssetDenom: string;
}

/**
 * Deprecated: please use alternate in x/poolmanager
 *
 * @deprecated
 */
export interface QuerySpotPriceResponse {
  /** String of the Dec. Ex) 10.203uatom */
  spotPrice: string;
}

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

export interface Query {
  /**
   * Deprecated: please use alternate in x/poolmanager
   *
   * @deprecated
   */
  SpotPrice(request: QuerySpotPriceRequest): Promise<QuerySpotPriceResponse>;
}

export const QueryServiceName = "osmosis.gamm.v2.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.SpotPrice = this.SpotPrice.bind(this);
  }
  SpotPrice(request: QuerySpotPriceRequest): Promise<QuerySpotPriceResponse> {
    const data = QuerySpotPriceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SpotPrice", data);
    return promise.then((data) => QuerySpotPriceResponse.decode(_m0.Reader.create(data)));
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
