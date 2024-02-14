/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Downtime, downtimeFromJSON, downtimeToJSON } from "./downtime_duration";

export const protobufPackage = "osmosis.downtimedetector.v1beta1";

/**
 * Query for has it been at least $RECOVERY_DURATION units of time,
 * since the chain has been down for $DOWNTIME_DURATION.
 */
export interface RecoveredSinceDowntimeOfLengthRequest {
  downtime: Downtime;
  recovery: Duration | undefined;
}

export interface RecoveredSinceDowntimeOfLengthResponse {
  succesfullyRecovered: boolean;
}

function createBaseRecoveredSinceDowntimeOfLengthRequest(): RecoveredSinceDowntimeOfLengthRequest {
  return { downtime: 0, recovery: undefined };
}

export const RecoveredSinceDowntimeOfLengthRequest = {
  encode(message: RecoveredSinceDowntimeOfLengthRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.downtime !== 0) {
      writer.uint32(8).int32(message.downtime);
    }
    if (message.recovery !== undefined) {
      Duration.encode(message.recovery, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecoveredSinceDowntimeOfLengthRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecoveredSinceDowntimeOfLengthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.downtime = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.recovery = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecoveredSinceDowntimeOfLengthRequest {
    return {
      downtime: isSet(object.downtime) ? downtimeFromJSON(object.downtime) : 0,
      recovery: isSet(object.recovery) ? Duration.fromJSON(object.recovery) : undefined,
    };
  },

  toJSON(message: RecoveredSinceDowntimeOfLengthRequest): unknown {
    const obj: any = {};
    if (message.downtime !== 0) {
      obj.downtime = downtimeToJSON(message.downtime);
    }
    if (message.recovery !== undefined) {
      obj.recovery = Duration.toJSON(message.recovery);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecoveredSinceDowntimeOfLengthRequest>, I>>(
    base?: I,
  ): RecoveredSinceDowntimeOfLengthRequest {
    return RecoveredSinceDowntimeOfLengthRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RecoveredSinceDowntimeOfLengthRequest>, I>>(
    object: I,
  ): RecoveredSinceDowntimeOfLengthRequest {
    const message = createBaseRecoveredSinceDowntimeOfLengthRequest();
    message.downtime = object.downtime ?? 0;
    message.recovery = (object.recovery !== undefined && object.recovery !== null)
      ? Duration.fromPartial(object.recovery)
      : undefined;
    return message;
  },
};

function createBaseRecoveredSinceDowntimeOfLengthResponse(): RecoveredSinceDowntimeOfLengthResponse {
  return { succesfullyRecovered: false };
}

export const RecoveredSinceDowntimeOfLengthResponse = {
  encode(message: RecoveredSinceDowntimeOfLengthResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.succesfullyRecovered === true) {
      writer.uint32(8).bool(message.succesfullyRecovered);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecoveredSinceDowntimeOfLengthResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecoveredSinceDowntimeOfLengthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.succesfullyRecovered = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RecoveredSinceDowntimeOfLengthResponse {
    return {
      succesfullyRecovered: isSet(object.succesfullyRecovered)
        ? globalThis.Boolean(object.succesfullyRecovered)
        : false,
    };
  },

  toJSON(message: RecoveredSinceDowntimeOfLengthResponse): unknown {
    const obj: any = {};
    if (message.succesfullyRecovered === true) {
      obj.succesfullyRecovered = message.succesfullyRecovered;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RecoveredSinceDowntimeOfLengthResponse>, I>>(
    base?: I,
  ): RecoveredSinceDowntimeOfLengthResponse {
    return RecoveredSinceDowntimeOfLengthResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RecoveredSinceDowntimeOfLengthResponse>, I>>(
    object: I,
  ): RecoveredSinceDowntimeOfLengthResponse {
    const message = createBaseRecoveredSinceDowntimeOfLengthResponse();
    message.succesfullyRecovered = object.succesfullyRecovered ?? false;
    return message;
  },
};

export interface Query {
  RecoveredSinceDowntimeOfLength(
    request: RecoveredSinceDowntimeOfLengthRequest,
  ): Promise<RecoveredSinceDowntimeOfLengthResponse>;
}

export const QueryServiceName = "osmosis.downtimedetector.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.RecoveredSinceDowntimeOfLength = this.RecoveredSinceDowntimeOfLength.bind(this);
  }
  RecoveredSinceDowntimeOfLength(
    request: RecoveredSinceDowntimeOfLengthRequest,
  ): Promise<RecoveredSinceDowntimeOfLengthResponse> {
    const data = RecoveredSinceDowntimeOfLengthRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RecoveredSinceDowntimeOfLength", data);
    return promise.then((data) => RecoveredSinceDowntimeOfLengthResponse.decode(_m0.Reader.create(data)));
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
