/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.counter.v1";

/** QueryGetCountRequest defines the request type for querying x/mock count. */
export interface QueryGetCountRequest {
}

/** QueryGetCountResponse defines the response type for querying x/mock count. */
export interface QueryGetCountResponse {
  totalCount: Long;
}

function createBaseQueryGetCountRequest(): QueryGetCountRequest {
  return {};
}

export const QueryGetCountRequest = {
  encode(_: QueryGetCountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetCountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCountRequest();
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

  fromJSON(_: any): QueryGetCountRequest {
    return {};
  },

  toJSON(_: QueryGetCountRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetCountRequest>, I>>(base?: I): QueryGetCountRequest {
    return QueryGetCountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetCountRequest>, I>>(_: I): QueryGetCountRequest {
    const message = createBaseQueryGetCountRequest();
    return message;
  },
};

function createBaseQueryGetCountResponse(): QueryGetCountResponse {
  return { totalCount: Long.ZERO };
}

export const QueryGetCountResponse = {
  encode(message: QueryGetCountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.totalCount.isZero()) {
      writer.uint32(8).int64(message.totalCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetCountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetCountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalCount = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetCountResponse {
    return { totalCount: isSet(object.totalCount) ? Long.fromValue(object.totalCount) : Long.ZERO };
  },

  toJSON(message: QueryGetCountResponse): unknown {
    const obj: any = {};
    if (!message.totalCount.isZero()) {
      obj.totalCount = (message.totalCount || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetCountResponse>, I>>(base?: I): QueryGetCountResponse {
    return QueryGetCountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetCountResponse>, I>>(object: I): QueryGetCountResponse {
    const message = createBaseQueryGetCountResponse();
    message.totalCount = (object.totalCount !== undefined && object.totalCount !== null)
      ? Long.fromValue(object.totalCount)
      : Long.ZERO;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** GetCount queries the parameters of x/Counter module. */
  GetCount(request: QueryGetCountRequest): Promise<QueryGetCountResponse>;
}

export const QueryServiceName = "cosmos.counter.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.GetCount = this.GetCount.bind(this);
  }
  GetCount(request: QueryGetCountRequest): Promise<QueryGetCountResponse> {
    const data = QueryGetCountRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GetCount", data);
    return promise.then((data) => QueryGetCountResponse.decode(_m0.Reader.create(data)));
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
