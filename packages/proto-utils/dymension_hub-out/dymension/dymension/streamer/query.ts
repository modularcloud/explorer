/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Stream } from "./stream";

export const protobufPackage = "dymensionxyz.dymension.streamer";

export interface ModuleToDistributeCoinsRequest {
}

export interface ModuleToDistributeCoinsResponse {
  /** Coins that have yet to be distributed */
  coins: Coin[];
}

export interface StreamByIDRequest {
  /** Gague ID being queried */
  id: Long;
}

export interface StreamByIDResponse {
  /** Stream that corresponds to provided gague ID */
  stream: Stream | undefined;
}

export interface StreamsRequest {
  /** Pagination defines pagination for the request */
  pagination: PageRequest | undefined;
}

export interface StreamsResponse {
  /** Upcoming and active streams */
  data: Stream[];
  /** Pagination defines pagination for the response */
  pagination: PageResponse | undefined;
}

export interface ActiveStreamsRequest {
  /** Pagination defines pagination for the request */
  pagination: PageRequest | undefined;
}

export interface ActiveStreamsResponse {
  /** Active gagues only */
  data: Stream[];
  /** Pagination defines pagination for the response */
  pagination: PageResponse | undefined;
}

export interface UpcomingStreamsRequest {
  /** Pagination defines pagination for the request */
  pagination: PageRequest | undefined;
}

export interface UpcomingStreamsResponse {
  /** Streams whose distribution is upcoming */
  data: Stream[];
  /** Pagination defines pagination for the response */
  pagination: PageResponse | undefined;
}

function createBaseModuleToDistributeCoinsRequest(): ModuleToDistributeCoinsRequest {
  return {};
}

export const ModuleToDistributeCoinsRequest = {
  encode(_: ModuleToDistributeCoinsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleToDistributeCoinsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleToDistributeCoinsRequest();
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

  fromJSON(_: any): ModuleToDistributeCoinsRequest {
    return {};
  },

  toJSON(_: ModuleToDistributeCoinsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ModuleToDistributeCoinsRequest>, I>>(base?: I): ModuleToDistributeCoinsRequest {
    return ModuleToDistributeCoinsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModuleToDistributeCoinsRequest>, I>>(_: I): ModuleToDistributeCoinsRequest {
    const message = createBaseModuleToDistributeCoinsRequest();
    return message;
  },
};

function createBaseModuleToDistributeCoinsResponse(): ModuleToDistributeCoinsResponse {
  return { coins: [] };
}

export const ModuleToDistributeCoinsResponse = {
  encode(message: ModuleToDistributeCoinsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleToDistributeCoinsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleToDistributeCoinsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModuleToDistributeCoinsResponse {
    return { coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: ModuleToDistributeCoinsResponse): unknown {
    const obj: any = {};
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModuleToDistributeCoinsResponse>, I>>(base?: I): ModuleToDistributeCoinsResponse {
    return ModuleToDistributeCoinsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModuleToDistributeCoinsResponse>, I>>(
    object: I,
  ): ModuleToDistributeCoinsResponse {
    const message = createBaseModuleToDistributeCoinsResponse();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStreamByIDRequest(): StreamByIDRequest {
  return { id: Long.UZERO };
}

export const StreamByIDRequest = {
  encode(message: StreamByIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamByIDRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamByIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamByIDRequest {
    return { id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO };
  },

  toJSON(message: StreamByIDRequest): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamByIDRequest>, I>>(base?: I): StreamByIDRequest {
    return StreamByIDRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamByIDRequest>, I>>(object: I): StreamByIDRequest {
    const message = createBaseStreamByIDRequest();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseStreamByIDResponse(): StreamByIDResponse {
  return { stream: undefined };
}

export const StreamByIDResponse = {
  encode(message: StreamByIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stream !== undefined) {
      Stream.encode(message.stream, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamByIDResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamByIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stream = Stream.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamByIDResponse {
    return { stream: isSet(object.stream) ? Stream.fromJSON(object.stream) : undefined };
  },

  toJSON(message: StreamByIDResponse): unknown {
    const obj: any = {};
    if (message.stream !== undefined) {
      obj.stream = Stream.toJSON(message.stream);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamByIDResponse>, I>>(base?: I): StreamByIDResponse {
    return StreamByIDResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamByIDResponse>, I>>(object: I): StreamByIDResponse {
    const message = createBaseStreamByIDResponse();
    message.stream = (object.stream !== undefined && object.stream !== null)
      ? Stream.fromPartial(object.stream)
      : undefined;
    return message;
  },
};

function createBaseStreamsRequest(): StreamsRequest {
  return { pagination: undefined };
}

export const StreamsRequest = {
  encode(message: StreamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): StreamsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: StreamsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamsRequest>, I>>(base?: I): StreamsRequest {
    return StreamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamsRequest>, I>>(object: I): StreamsRequest {
    const message = createBaseStreamsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseStreamsResponse(): StreamsResponse {
  return { data: [], pagination: undefined };
}

export const StreamsResponse = {
  encode(message: StreamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Stream.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(Stream.decode(reader, reader.uint32()));
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

  fromJSON(object: any): StreamsResponse {
    return {
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Stream.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: StreamsResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => Stream.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamsResponse>, I>>(base?: I): StreamsResponse {
    return StreamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamsResponse>, I>>(object: I): StreamsResponse {
    const message = createBaseStreamsResponse();
    message.data = object.data?.map((e) => Stream.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveStreamsRequest(): ActiveStreamsRequest {
  return { pagination: undefined };
}

export const ActiveStreamsRequest = {
  encode(message: ActiveStreamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveStreamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveStreamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): ActiveStreamsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: ActiveStreamsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveStreamsRequest>, I>>(base?: I): ActiveStreamsRequest {
    return ActiveStreamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActiveStreamsRequest>, I>>(object: I): ActiveStreamsRequest {
    const message = createBaseActiveStreamsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveStreamsResponse(): ActiveStreamsResponse {
  return { data: [], pagination: undefined };
}

export const ActiveStreamsResponse = {
  encode(message: ActiveStreamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Stream.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveStreamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveStreamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(Stream.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ActiveStreamsResponse {
    return {
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Stream.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: ActiveStreamsResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => Stream.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveStreamsResponse>, I>>(base?: I): ActiveStreamsResponse {
    return ActiveStreamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActiveStreamsResponse>, I>>(object: I): ActiveStreamsResponse {
    const message = createBaseActiveStreamsResponse();
    message.data = object.data?.map((e) => Stream.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingStreamsRequest(): UpcomingStreamsRequest {
  return { pagination: undefined };
}

export const UpcomingStreamsRequest = {
  encode(message: UpcomingStreamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingStreamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingStreamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): UpcomingStreamsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: UpcomingStreamsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpcomingStreamsRequest>, I>>(base?: I): UpcomingStreamsRequest {
    return UpcomingStreamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpcomingStreamsRequest>, I>>(object: I): UpcomingStreamsRequest {
    const message = createBaseUpcomingStreamsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingStreamsResponse(): UpcomingStreamsResponse {
  return { data: [], pagination: undefined };
}

export const UpcomingStreamsResponse = {
  encode(message: UpcomingStreamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Stream.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingStreamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingStreamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(Stream.decode(reader, reader.uint32()));
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

  fromJSON(object: any): UpcomingStreamsResponse {
    return {
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Stream.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: UpcomingStreamsResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => Stream.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpcomingStreamsResponse>, I>>(base?: I): UpcomingStreamsResponse {
    return UpcomingStreamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpcomingStreamsResponse>, I>>(object: I): UpcomingStreamsResponse {
    const message = createBaseUpcomingStreamsResponse();
    message.data = object.data?.map((e) => Stream.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service */
export interface Query {
  /** ModuleToDistributeCoins returns coins that are going to be distributed */
  ModuleToDistributeCoins(request: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse>;
  /** StreamByID returns streams by their respective ID */
  StreamByID(request: StreamByIDRequest): Promise<StreamByIDResponse>;
  /** Streams returns both upcoming and active streams */
  Streams(request: StreamsRequest): Promise<StreamsResponse>;
  /** ActiveStreams returns active streams */
  ActiveStreams(request: ActiveStreamsRequest): Promise<ActiveStreamsResponse>;
  /** Returns scheduled streams that have not yet occured */
  UpcomingStreams(request: UpcomingStreamsRequest): Promise<UpcomingStreamsResponse>;
}

export const QueryServiceName = "dymensionxyz.dymension.streamer.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.ModuleToDistributeCoins = this.ModuleToDistributeCoins.bind(this);
    this.StreamByID = this.StreamByID.bind(this);
    this.Streams = this.Streams.bind(this);
    this.ActiveStreams = this.ActiveStreams.bind(this);
    this.UpcomingStreams = this.UpcomingStreams.bind(this);
  }
  ModuleToDistributeCoins(request: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse> {
    const data = ModuleToDistributeCoinsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ModuleToDistributeCoins", data);
    return promise.then((data) => ModuleToDistributeCoinsResponse.decode(_m0.Reader.create(data)));
  }

  StreamByID(request: StreamByIDRequest): Promise<StreamByIDResponse> {
    const data = StreamByIDRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "StreamByID", data);
    return promise.then((data) => StreamByIDResponse.decode(_m0.Reader.create(data)));
  }

  Streams(request: StreamsRequest): Promise<StreamsResponse> {
    const data = StreamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Streams", data);
    return promise.then((data) => StreamsResponse.decode(_m0.Reader.create(data)));
  }

  ActiveStreams(request: ActiveStreamsRequest): Promise<ActiveStreamsResponse> {
    const data = ActiveStreamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ActiveStreams", data);
    return promise.then((data) => ActiveStreamsResponse.decode(_m0.Reader.create(data)));
  }

  UpcomingStreams(request: UpcomingStreamsRequest): Promise<UpcomingStreamsResponse> {
    const data = UpcomingStreamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpcomingStreams", data);
    return promise.then((data) => UpcomingStreamsResponse.decode(_m0.Reader.create(data)));
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
