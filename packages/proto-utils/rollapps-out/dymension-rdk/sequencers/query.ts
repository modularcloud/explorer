/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { HistoricalInfo, Validator } from "../cosmos/staking/v1beta1/staking";
import { Params } from "./params";

export const protobufPackage = "rollapp.sequencers.types";

/** QuerySequencersRequest is request type for Query/Sequencers RPC method. */
export interface QuerySequencersRequest {
  /** status enables to query for sequencers matching a given status. */
  status: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QuerySequencersResponse is response type for the Query/Sequencers RPC method */
export interface QuerySequencersResponse {
  /** sequencers contains all the queried sequencers. */
  sequencers: Validator[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QuerySequencerRequest is response type for the Query/Sequencer RPC method */
export interface QuerySequencerRequest {
  /** sequencer_addr defines the sequencer address to query for. */
  sequencerAddr: string;
}

/** QuerySequencerResponse is response type for the Query/Sequencer RPC method */
export interface QuerySequencerResponse {
  /** sequencer defines the the sequencer info. */
  sequencer: Validator | undefined;
}

/**
 * QueryHistoricalInfoRequest is request type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoRequest {
  /** height defines at which height to query the historical info. */
  height: Long;
}

/**
 * QueryHistoricalInfoResponse is response type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoResponse {
  /** hist defines the historical info at the given height. */
  hist: HistoricalInfo | undefined;
}

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

function createBaseQuerySequencersRequest(): QuerySequencersRequest {
  return { status: "", pagination: undefined };
}

export const QuerySequencersRequest = {
  encode(message: QuerySequencersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySequencersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySequencersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.status = reader.string();
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

  fromJSON(object: any): QuerySequencersRequest {
    return {
      status: isSet(object.status) ? globalThis.String(object.status) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QuerySequencersRequest): unknown {
    const obj: any = {};
    if (message.status !== "") {
      obj.status = message.status;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySequencersRequest>, I>>(base?: I): QuerySequencersRequest {
    return QuerySequencersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySequencersRequest>, I>>(object: I): QuerySequencersRequest {
    const message = createBaseQuerySequencersRequest();
    message.status = object.status ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySequencersResponse(): QuerySequencersResponse {
  return { sequencers: [], pagination: undefined };
}

export const QuerySequencersResponse = {
  encode(message: QuerySequencersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sequencers) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySequencersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySequencersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencers.push(Validator.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QuerySequencersResponse {
    return {
      sequencers: globalThis.Array.isArray(object?.sequencers)
        ? object.sequencers.map((e: any) => Validator.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QuerySequencersResponse): unknown {
    const obj: any = {};
    if (message.sequencers?.length) {
      obj.sequencers = message.sequencers.map((e) => Validator.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySequencersResponse>, I>>(base?: I): QuerySequencersResponse {
    return QuerySequencersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySequencersResponse>, I>>(object: I): QuerySequencersResponse {
    const message = createBaseQuerySequencersResponse();
    message.sequencers = object.sequencers?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQuerySequencerRequest(): QuerySequencerRequest {
  return { sequencerAddr: "" };
}

export const QuerySequencerRequest = {
  encode(message: QuerySequencerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequencerAddr !== "") {
      writer.uint32(10).string(message.sequencerAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySequencerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySequencerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencerAddr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySequencerRequest {
    return { sequencerAddr: isSet(object.sequencerAddr) ? globalThis.String(object.sequencerAddr) : "" };
  },

  toJSON(message: QuerySequencerRequest): unknown {
    const obj: any = {};
    if (message.sequencerAddr !== "") {
      obj.sequencerAddr = message.sequencerAddr;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySequencerRequest>, I>>(base?: I): QuerySequencerRequest {
    return QuerySequencerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySequencerRequest>, I>>(object: I): QuerySequencerRequest {
    const message = createBaseQuerySequencerRequest();
    message.sequencerAddr = object.sequencerAddr ?? "";
    return message;
  },
};

function createBaseQuerySequencerResponse(): QuerySequencerResponse {
  return { sequencer: undefined };
}

export const QuerySequencerResponse = {
  encode(message: QuerySequencerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequencer !== undefined) {
      Validator.encode(message.sequencer, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySequencerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySequencerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencer = Validator.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QuerySequencerResponse {
    return { sequencer: isSet(object.sequencer) ? Validator.fromJSON(object.sequencer) : undefined };
  },

  toJSON(message: QuerySequencerResponse): unknown {
    const obj: any = {};
    if (message.sequencer !== undefined) {
      obj.sequencer = Validator.toJSON(message.sequencer);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QuerySequencerResponse>, I>>(base?: I): QuerySequencerResponse {
    return QuerySequencerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QuerySequencerResponse>, I>>(object: I): QuerySequencerResponse {
    const message = createBaseQuerySequencerResponse();
    message.sequencer = (object.sequencer !== undefined && object.sequencer !== null)
      ? Validator.fromPartial(object.sequencer)
      : undefined;
    return message;
  },
};

function createBaseQueryHistoricalInfoRequest(): QueryHistoricalInfoRequest {
  return { height: Long.ZERO };
}

export const QueryHistoricalInfoRequest = {
  encode(message: QueryHistoricalInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHistoricalInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHistoricalInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryHistoricalInfoRequest {
    return { height: isSet(object.height) ? Long.fromValue(object.height) : Long.ZERO };
  },

  toJSON(message: QueryHistoricalInfoRequest): unknown {
    const obj: any = {};
    if (!message.height.isZero()) {
      obj.height = (message.height || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryHistoricalInfoRequest>, I>>(base?: I): QueryHistoricalInfoRequest {
    return QueryHistoricalInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryHistoricalInfoRequest>, I>>(object: I): QueryHistoricalInfoRequest {
    const message = createBaseQueryHistoricalInfoRequest();
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.ZERO;
    return message;
  },
};

function createBaseQueryHistoricalInfoResponse(): QueryHistoricalInfoResponse {
  return { hist: undefined };
}

export const QueryHistoricalInfoResponse = {
  encode(message: QueryHistoricalInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hist !== undefined) {
      HistoricalInfo.encode(message.hist, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryHistoricalInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHistoricalInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hist = HistoricalInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryHistoricalInfoResponse {
    return { hist: isSet(object.hist) ? HistoricalInfo.fromJSON(object.hist) : undefined };
  },

  toJSON(message: QueryHistoricalInfoResponse): unknown {
    const obj: any = {};
    if (message.hist !== undefined) {
      obj.hist = HistoricalInfo.toJSON(message.hist);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryHistoricalInfoResponse>, I>>(base?: I): QueryHistoricalInfoResponse {
    return QueryHistoricalInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryHistoricalInfoResponse>, I>>(object: I): QueryHistoricalInfoResponse {
    const message = createBaseQueryHistoricalInfoResponse();
    message.hist = (object.hist !== undefined && object.hist !== null)
      ? HistoricalInfo.fromPartial(object.hist)
      : undefined;
    return message;
  },
};

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

/** Query defines the gRPC querier service. */
export interface Query {
  /** Sequencers queries all sequencers that match the given status. */
  Sequencers(request: QuerySequencersRequest): Promise<QuerySequencersResponse>;
  /** Sequencer queries validator info for given validator address. */
  Sequencer(request: QuerySequencerRequest): Promise<QuerySequencerResponse>;
  /** HistoricalInfo queries the historical info for given height. */
  HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse>;
  /** Parameters queries the staking parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export const QueryServiceName = "rollapp.sequencers.types.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Sequencers = this.Sequencers.bind(this);
    this.Sequencer = this.Sequencer.bind(this);
    this.HistoricalInfo = this.HistoricalInfo.bind(this);
    this.Params = this.Params.bind(this);
  }
  Sequencers(request: QuerySequencersRequest): Promise<QuerySequencersResponse> {
    const data = QuerySequencersRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Sequencers", data);
    return promise.then((data) => QuerySequencersResponse.decode(_m0.Reader.create(data)));
  }

  Sequencer(request: QuerySequencerRequest): Promise<QuerySequencerResponse> {
    const data = QuerySequencerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Sequencer", data);
    return promise.then((data) => QuerySequencerResponse.decode(_m0.Reader.create(data)));
  }

  HistoricalInfo(request: QueryHistoricalInfoRequest): Promise<QueryHistoricalInfoResponse> {
    const data = QueryHistoricalInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "HistoricalInfo", data);
    return promise.then((data) => QueryHistoricalInfoResponse.decode(_m0.Reader.create(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
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
