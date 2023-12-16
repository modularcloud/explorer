/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "celestia.upgrade.v1";

/**
 * QueryVersionTallyRequest is the request type for the UpgradeStatus RPC
 * method.
 */
export interface QueryVersionTallyRequest {
  version: Long;
}

/**
 * QueryVersionTallyResponse is the response type for the UpgradeStatus RPC
 * method.
 */
export interface QueryVersionTallyResponse {
  votingPower: Long;
  thresholdPower: Long;
  totalVotingPower: Long;
}

function createBaseQueryVersionTallyRequest(): QueryVersionTallyRequest {
  return { version: Long.UZERO };
}

export const QueryVersionTallyRequest = {
  encode(message: QueryVersionTallyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.version.isZero()) {
      writer.uint32(8).uint64(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVersionTallyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVersionTallyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.version = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVersionTallyRequest {
    return { version: isSet(object.version) ? Long.fromValue(object.version) : Long.UZERO };
  },

  toJSON(message: QueryVersionTallyRequest): unknown {
    const obj: any = {};
    if (!message.version.isZero()) {
      obj.version = (message.version || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVersionTallyRequest>, I>>(base?: I): QueryVersionTallyRequest {
    return QueryVersionTallyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVersionTallyRequest>, I>>(object: I): QueryVersionTallyRequest {
    const message = createBaseQueryVersionTallyRequest();
    message.version = (object.version !== undefined && object.version !== null)
      ? Long.fromValue(object.version)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryVersionTallyResponse(): QueryVersionTallyResponse {
  return { votingPower: Long.UZERO, thresholdPower: Long.UZERO, totalVotingPower: Long.UZERO };
}

export const QueryVersionTallyResponse = {
  encode(message: QueryVersionTallyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.votingPower.isZero()) {
      writer.uint32(8).uint64(message.votingPower);
    }
    if (!message.thresholdPower.isZero()) {
      writer.uint32(16).uint64(message.thresholdPower);
    }
    if (!message.totalVotingPower.isZero()) {
      writer.uint32(24).uint64(message.totalVotingPower);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVersionTallyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVersionTallyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.votingPower = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.thresholdPower = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalVotingPower = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVersionTallyResponse {
    return {
      votingPower: isSet(object.votingPower) ? Long.fromValue(object.votingPower) : Long.UZERO,
      thresholdPower: isSet(object.thresholdPower) ? Long.fromValue(object.thresholdPower) : Long.UZERO,
      totalVotingPower: isSet(object.totalVotingPower) ? Long.fromValue(object.totalVotingPower) : Long.UZERO,
    };
  },

  toJSON(message: QueryVersionTallyResponse): unknown {
    const obj: any = {};
    if (!message.votingPower.isZero()) {
      obj.votingPower = (message.votingPower || Long.UZERO).toString();
    }
    if (!message.thresholdPower.isZero()) {
      obj.thresholdPower = (message.thresholdPower || Long.UZERO).toString();
    }
    if (!message.totalVotingPower.isZero()) {
      obj.totalVotingPower = (message.totalVotingPower || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVersionTallyResponse>, I>>(base?: I): QueryVersionTallyResponse {
    return QueryVersionTallyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVersionTallyResponse>, I>>(object: I): QueryVersionTallyResponse {
    const message = createBaseQueryVersionTallyResponse();
    message.votingPower = (object.votingPower !== undefined && object.votingPower !== null)
      ? Long.fromValue(object.votingPower)
      : Long.UZERO;
    message.thresholdPower = (object.thresholdPower !== undefined && object.thresholdPower !== null)
      ? Long.fromValue(object.thresholdPower)
      : Long.UZERO;
    message.totalVotingPower = (object.totalVotingPower !== undefined && object.totalVotingPower !== null)
      ? Long.fromValue(object.totalVotingPower)
      : Long.UZERO;
    return message;
  },
};

/** Query defines the upgrade Query service. */
export interface Query {
  /**
   * VersionTally allows the querying of the tally of voting power by all
   * validators that have signalled for each version
   */
  VersionTally(request: QueryVersionTallyRequest): Promise<QueryVersionTallyResponse>;
}

export const QueryServiceName = "celestia.upgrade.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.VersionTally = this.VersionTally.bind(this);
  }
  VersionTally(request: QueryVersionTallyRequest): Promise<QueryVersionTallyResponse> {
    const data = QueryVersionTallyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VersionTally", data);
    return promise.then((data) => QueryVersionTallyResponse.decode(_m0.Reader.create(data)));
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
