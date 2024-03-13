/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DemandOrder } from "./demand_order";
import { Params } from "./params";

export const protobufPackage = "dymensionxyz.dymension.eibc";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

/** QueryGetDemandOrderRequest is the request type for the Query/GetDemandOrder RPC method. */
export interface QueryGetDemandOrderRequest {
  /** id of the demand order to get */
  id: string;
}

/** QueryDemandOrdersByStatusRequest is the request type for the Query/GetDemandOrdersByStatus RPC method. */
export interface QueryDemandOrdersByStatusRequest {
  /** id of the demand order to get */
  status: string;
}

/** QueryGetDemandOrderResponse is the response type for the Query/GetDemandOrder RPC method. */
export interface QueryGetDemandOrderResponse {
  /** demand order with the given id */
  demandOrder: DemandOrder | undefined;
}

/** QueryDemandOrdersByStatusResponse is the response type for the Query/GetDemandOrdersByStatus RPC method. */
export interface QueryDemandOrdersByStatusResponse {
  /** A list of demand orders with the given status */
  demandOrders: DemandOrder[];
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

function createBaseQueryGetDemandOrderRequest(): QueryGetDemandOrderRequest {
  return { id: "" };
}

export const QueryGetDemandOrderRequest = {
  encode(message: QueryGetDemandOrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDemandOrderRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDemandOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetDemandOrderRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: QueryGetDemandOrderRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetDemandOrderRequest>, I>>(base?: I): QueryGetDemandOrderRequest {
    return QueryGetDemandOrderRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetDemandOrderRequest>, I>>(object: I): QueryGetDemandOrderRequest {
    const message = createBaseQueryGetDemandOrderRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryDemandOrdersByStatusRequest(): QueryDemandOrdersByStatusRequest {
  return { status: "" };
}

export const QueryDemandOrdersByStatusRequest = {
  encode(message: QueryDemandOrdersByStatusRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDemandOrdersByStatusRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDemandOrdersByStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDemandOrdersByStatusRequest {
    return { status: isSet(object.status) ? globalThis.String(object.status) : "" };
  },

  toJSON(message: QueryDemandOrdersByStatusRequest): unknown {
    const obj: any = {};
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDemandOrdersByStatusRequest>, I>>(
    base?: I,
  ): QueryDemandOrdersByStatusRequest {
    return QueryDemandOrdersByStatusRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDemandOrdersByStatusRequest>, I>>(
    object: I,
  ): QueryDemandOrdersByStatusRequest {
    const message = createBaseQueryDemandOrdersByStatusRequest();
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseQueryGetDemandOrderResponse(): QueryGetDemandOrderResponse {
  return { demandOrder: undefined };
}

export const QueryGetDemandOrderResponse = {
  encode(message: QueryGetDemandOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.demandOrder !== undefined) {
      DemandOrder.encode(message.demandOrder, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDemandOrderResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDemandOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.demandOrder = DemandOrder.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetDemandOrderResponse {
    return { demandOrder: isSet(object.demandOrder) ? DemandOrder.fromJSON(object.demandOrder) : undefined };
  },

  toJSON(message: QueryGetDemandOrderResponse): unknown {
    const obj: any = {};
    if (message.demandOrder !== undefined) {
      obj.demandOrder = DemandOrder.toJSON(message.demandOrder);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetDemandOrderResponse>, I>>(base?: I): QueryGetDemandOrderResponse {
    return QueryGetDemandOrderResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetDemandOrderResponse>, I>>(object: I): QueryGetDemandOrderResponse {
    const message = createBaseQueryGetDemandOrderResponse();
    message.demandOrder = (object.demandOrder !== undefined && object.demandOrder !== null)
      ? DemandOrder.fromPartial(object.demandOrder)
      : undefined;
    return message;
  },
};

function createBaseQueryDemandOrdersByStatusResponse(): QueryDemandOrdersByStatusResponse {
  return { demandOrders: [] };
}

export const QueryDemandOrdersByStatusResponse = {
  encode(message: QueryDemandOrdersByStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.demandOrders) {
      DemandOrder.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDemandOrdersByStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDemandOrdersByStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.demandOrders.push(DemandOrder.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDemandOrdersByStatusResponse {
    return {
      demandOrders: globalThis.Array.isArray(object?.demandOrders)
        ? object.demandOrders.map((e: any) => DemandOrder.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryDemandOrdersByStatusResponse): unknown {
    const obj: any = {};
    if (message.demandOrders?.length) {
      obj.demandOrders = message.demandOrders.map((e) => DemandOrder.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDemandOrdersByStatusResponse>, I>>(
    base?: I,
  ): QueryDemandOrdersByStatusResponse {
    return QueryDemandOrdersByStatusResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDemandOrdersByStatusResponse>, I>>(
    object: I,
  ): QueryDemandOrdersByStatusResponse {
    const message = createBaseQueryDemandOrdersByStatusResponse();
    message.demandOrders = object.demandOrders?.map((e) => DemandOrder.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Demand Order by id. */
  DemandOrderById(request: QueryGetDemandOrderRequest): Promise<QueryGetDemandOrderResponse>;
  /** Queries a list of demand orders by status. */
  DemandOrdersByStatus(request: QueryDemandOrdersByStatusRequest): Promise<QueryDemandOrdersByStatusResponse>;
}

export const QueryServiceName = "dymensionxyz.dymension.eibc.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.DemandOrderById = this.DemandOrderById.bind(this);
    this.DemandOrdersByStatus = this.DemandOrdersByStatus.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  DemandOrderById(request: QueryGetDemandOrderRequest): Promise<QueryGetDemandOrderResponse> {
    const data = QueryGetDemandOrderRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DemandOrderById", data);
    return promise.then((data) => QueryGetDemandOrderResponse.decode(_m0.Reader.create(data)));
  }

  DemandOrdersByStatus(request: QueryDemandOrdersByStatusRequest): Promise<QueryDemandOrdersByStatusResponse> {
    const data = QueryDemandOrdersByStatusRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DemandOrdersByStatus", data);
    return promise.then((data) => QueryDemandOrdersByStatusResponse.decode(_m0.Reader.create(data)));
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
