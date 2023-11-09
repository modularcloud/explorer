/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "celestia.mint.v1";

/**
 * QueryInflationRateRequest is the request type for the Query/InflationRate RPC
 * method.
 */
export interface QueryInflationRateRequest {
}

/**
 * QueryInflationRateResponse is the response type for the Query/InflationRate
 * RPC method.
 */
export interface QueryInflationRateResponse {
  /** InflationRate is the current inflation rate. */
  inflationRate: Uint8Array;
}

/**
 * QueryAnnualProvisionsRequest is the request type for the
 * Query/AnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsRequest {
}

/**
 * QueryAnnualProvisionsResponse is the response type for the
 * Query/AnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsResponse {
  /** AnnualProvisions is the current annual provisions. */
  annualProvisions: Uint8Array;
}

/**
 * QueryGenesisTimeRequest is the request type for the Query/GenesisTime RPC
 * method.
 */
export interface QueryGenesisTimeRequest {
}

/**
 * QueryGenesisTimeResponse is the response type for the Query/GenesisTime RPC
 * method.
 */
export interface QueryGenesisTimeResponse {
  /** GenesisTime is the timestamp associated with the first block. */
  genesisTime: Date | undefined;
}

function createBaseQueryInflationRateRequest(): QueryInflationRateRequest {
  return {};
}

export const QueryInflationRateRequest = {
  encode(_: QueryInflationRateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryInflationRateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInflationRateRequest();
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

  fromJSON(_: any): QueryInflationRateRequest {
    return {};
  },

  toJSON(_: QueryInflationRateRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryInflationRateRequest>, I>>(base?: I): QueryInflationRateRequest {
    return QueryInflationRateRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryInflationRateRequest>, I>>(_: I): QueryInflationRateRequest {
    const message = createBaseQueryInflationRateRequest();
    return message;
  },
};

function createBaseQueryInflationRateResponse(): QueryInflationRateResponse {
  return { inflationRate: new Uint8Array(0) };
}

export const QueryInflationRateResponse = {
  encode(message: QueryInflationRateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inflationRate.length !== 0) {
      writer.uint32(10).bytes(message.inflationRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryInflationRateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryInflationRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.inflationRate = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryInflationRateResponse {
    return { inflationRate: isSet(object.inflationRate) ? bytesFromBase64(object.inflationRate) : new Uint8Array(0) };
  },

  toJSON(message: QueryInflationRateResponse): unknown {
    const obj: any = {};
    if (message.inflationRate.length !== 0) {
      obj.inflationRate = base64FromBytes(message.inflationRate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryInflationRateResponse>, I>>(base?: I): QueryInflationRateResponse {
    return QueryInflationRateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryInflationRateResponse>, I>>(object: I): QueryInflationRateResponse {
    const message = createBaseQueryInflationRateResponse();
    message.inflationRate = object.inflationRate ?? new Uint8Array(0);
    return message;
  },
};

function createBaseQueryAnnualProvisionsRequest(): QueryAnnualProvisionsRequest {
  return {};
}

export const QueryAnnualProvisionsRequest = {
  encode(_: QueryAnnualProvisionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAnnualProvisionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnualProvisionsRequest();
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

  fromJSON(_: any): QueryAnnualProvisionsRequest {
    return {};
  },

  toJSON(_: QueryAnnualProvisionsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAnnualProvisionsRequest>, I>>(base?: I): QueryAnnualProvisionsRequest {
    return QueryAnnualProvisionsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAnnualProvisionsRequest>, I>>(_: I): QueryAnnualProvisionsRequest {
    const message = createBaseQueryAnnualProvisionsRequest();
    return message;
  },
};

function createBaseQueryAnnualProvisionsResponse(): QueryAnnualProvisionsResponse {
  return { annualProvisions: new Uint8Array(0) };
}

export const QueryAnnualProvisionsResponse = {
  encode(message: QueryAnnualProvisionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.annualProvisions.length !== 0) {
      writer.uint32(10).bytes(message.annualProvisions);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAnnualProvisionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAnnualProvisionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.annualProvisions = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAnnualProvisionsResponse {
    return {
      annualProvisions: isSet(object.annualProvisions) ? bytesFromBase64(object.annualProvisions) : new Uint8Array(0),
    };
  },

  toJSON(message: QueryAnnualProvisionsResponse): unknown {
    const obj: any = {};
    if (message.annualProvisions.length !== 0) {
      obj.annualProvisions = base64FromBytes(message.annualProvisions);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAnnualProvisionsResponse>, I>>(base?: I): QueryAnnualProvisionsResponse {
    return QueryAnnualProvisionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAnnualProvisionsResponse>, I>>(
    object: I,
  ): QueryAnnualProvisionsResponse {
    const message = createBaseQueryAnnualProvisionsResponse();
    message.annualProvisions = object.annualProvisions ?? new Uint8Array(0);
    return message;
  },
};

function createBaseQueryGenesisTimeRequest(): QueryGenesisTimeRequest {
  return {};
}

export const QueryGenesisTimeRequest = {
  encode(_: QueryGenesisTimeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGenesisTimeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGenesisTimeRequest();
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

  fromJSON(_: any): QueryGenesisTimeRequest {
    return {};
  },

  toJSON(_: QueryGenesisTimeRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGenesisTimeRequest>, I>>(base?: I): QueryGenesisTimeRequest {
    return QueryGenesisTimeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGenesisTimeRequest>, I>>(_: I): QueryGenesisTimeRequest {
    const message = createBaseQueryGenesisTimeRequest();
    return message;
  },
};

function createBaseQueryGenesisTimeResponse(): QueryGenesisTimeResponse {
  return { genesisTime: undefined };
}

export const QueryGenesisTimeResponse = {
  encode(message: QueryGenesisTimeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.genesisTime !== undefined) {
      Timestamp.encode(toTimestamp(message.genesisTime), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGenesisTimeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGenesisTimeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.genesisTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGenesisTimeResponse {
    return { genesisTime: isSet(object.genesisTime) ? fromJsonTimestamp(object.genesisTime) : undefined };
  },

  toJSON(message: QueryGenesisTimeResponse): unknown {
    const obj: any = {};
    if (message.genesisTime !== undefined) {
      obj.genesisTime = message.genesisTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGenesisTimeResponse>, I>>(base?: I): QueryGenesisTimeResponse {
    return QueryGenesisTimeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGenesisTimeResponse>, I>>(object: I): QueryGenesisTimeResponse {
    const message = createBaseQueryGenesisTimeResponse();
    message.genesisTime = object.genesisTime ?? undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** InflationRate returns the current inflation rate. */
  InflationRate(request: QueryInflationRateRequest): Promise<QueryInflationRateResponse>;
  /** AnnualProvisions returns the current annual provisions. */
  AnnualProvisions(request: QueryAnnualProvisionsRequest): Promise<QueryAnnualProvisionsResponse>;
  /** GenesisTime returns the genesis time. */
  GenesisTime(request: QueryGenesisTimeRequest): Promise<QueryGenesisTimeResponse>;
}

export const QueryServiceName = "celestia.mint.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.InflationRate = this.InflationRate.bind(this);
    this.AnnualProvisions = this.AnnualProvisions.bind(this);
    this.GenesisTime = this.GenesisTime.bind(this);
  }
  InflationRate(request: QueryInflationRateRequest): Promise<QueryInflationRateResponse> {
    const data = QueryInflationRateRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "InflationRate", data);
    return promise.then((data) => QueryInflationRateResponse.decode(_m0.Reader.create(data)));
  }

  AnnualProvisions(request: QueryAnnualProvisionsRequest): Promise<QueryAnnualProvisionsResponse> {
    const data = QueryAnnualProvisionsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AnnualProvisions", data);
    return promise.then((data) => QueryAnnualProvisionsResponse.decode(_m0.Reader.create(data)));
  }

  GenesisTime(request: QueryGenesisTimeRequest): Promise<QueryGenesisTimeResponse> {
    const data = QueryGenesisTimeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GenesisTime", data);
    return promise.then((data) => QueryGenesisTimeResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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
