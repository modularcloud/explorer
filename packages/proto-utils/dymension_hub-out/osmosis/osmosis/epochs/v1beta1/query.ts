/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { EpochInfo } from "./genesis";

export const protobufPackage = "osmosis.epochs.v1beta1";

export interface QueryEpochsInfoRequest {
}

export interface QueryEpochsInfoResponse {
  epochs: EpochInfo[];
}

export interface QueryCurrentEpochRequest {
  identifier: string;
}

export interface QueryCurrentEpochResponse {
  currentEpoch: Long;
}

function createBaseQueryEpochsInfoRequest(): QueryEpochsInfoRequest {
  return {};
}

export const QueryEpochsInfoRequest = {
  encode(_: QueryEpochsInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEpochsInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochsInfoRequest();
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

  fromJSON(_: any): QueryEpochsInfoRequest {
    return {};
  },

  toJSON(_: QueryEpochsInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEpochsInfoRequest>, I>>(base?: I): QueryEpochsInfoRequest {
    return QueryEpochsInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEpochsInfoRequest>, I>>(_: I): QueryEpochsInfoRequest {
    const message = createBaseQueryEpochsInfoRequest();
    return message;
  },
};

function createBaseQueryEpochsInfoResponse(): QueryEpochsInfoResponse {
  return { epochs: [] };
}

export const QueryEpochsInfoResponse = {
  encode(message: QueryEpochsInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.epochs) {
      EpochInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEpochsInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEpochsInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.epochs.push(EpochInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryEpochsInfoResponse {
    return {
      epochs: globalThis.Array.isArray(object?.epochs) ? object.epochs.map((e: any) => EpochInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryEpochsInfoResponse): unknown {
    const obj: any = {};
    if (message.epochs?.length) {
      obj.epochs = message.epochs.map((e) => EpochInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEpochsInfoResponse>, I>>(base?: I): QueryEpochsInfoResponse {
    return QueryEpochsInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEpochsInfoResponse>, I>>(object: I): QueryEpochsInfoResponse {
    const message = createBaseQueryEpochsInfoResponse();
    message.epochs = object.epochs?.map((e) => EpochInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryCurrentEpochRequest(): QueryCurrentEpochRequest {
  return { identifier: "" };
}

export const QueryCurrentEpochRequest = {
  encode(message: QueryCurrentEpochRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrentEpochRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentEpochRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identifier = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCurrentEpochRequest {
    return { identifier: isSet(object.identifier) ? globalThis.String(object.identifier) : "" };
  },

  toJSON(message: QueryCurrentEpochRequest): unknown {
    const obj: any = {};
    if (message.identifier !== "") {
      obj.identifier = message.identifier;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCurrentEpochRequest>, I>>(base?: I): QueryCurrentEpochRequest {
    return QueryCurrentEpochRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentEpochRequest>, I>>(object: I): QueryCurrentEpochRequest {
    const message = createBaseQueryCurrentEpochRequest();
    message.identifier = object.identifier ?? "";
    return message;
  },
};

function createBaseQueryCurrentEpochResponse(): QueryCurrentEpochResponse {
  return { currentEpoch: Long.ZERO };
}

export const QueryCurrentEpochResponse = {
  encode(message: QueryCurrentEpochResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.currentEpoch.isZero()) {
      writer.uint32(8).int64(message.currentEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrentEpochResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentEpochResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.currentEpoch = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCurrentEpochResponse {
    return { currentEpoch: isSet(object.currentEpoch) ? Long.fromValue(object.currentEpoch) : Long.ZERO };
  },

  toJSON(message: QueryCurrentEpochResponse): unknown {
    const obj: any = {};
    if (!message.currentEpoch.isZero()) {
      obj.currentEpoch = (message.currentEpoch || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCurrentEpochResponse>, I>>(base?: I): QueryCurrentEpochResponse {
    return QueryCurrentEpochResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentEpochResponse>, I>>(object: I): QueryCurrentEpochResponse {
    const message = createBaseQueryCurrentEpochResponse();
    message.currentEpoch = (object.currentEpoch !== undefined && object.currentEpoch !== null)
      ? Long.fromValue(object.currentEpoch)
      : Long.ZERO;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** EpochInfos provide running epochInfos */
  EpochInfos(request: QueryEpochsInfoRequest): Promise<QueryEpochsInfoResponse>;
  /** CurrentEpoch provide current epoch of specified identifier */
  CurrentEpoch(request: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse>;
}

export const QueryServiceName = "osmosis.epochs.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.EpochInfos = this.EpochInfos.bind(this);
    this.CurrentEpoch = this.CurrentEpoch.bind(this);
  }
  EpochInfos(request: QueryEpochsInfoRequest): Promise<QueryEpochsInfoResponse> {
    const data = QueryEpochsInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EpochInfos", data);
    return promise.then((data) => QueryEpochsInfoResponse.decode(_m0.Reader.create(data)));
  }

  CurrentEpoch(request: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse> {
    const data = QueryCurrentEpochRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CurrentEpoch", data);
    return promise.then((data) => QueryCurrentEpochResponse.decode(_m0.Reader.create(data)));
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
