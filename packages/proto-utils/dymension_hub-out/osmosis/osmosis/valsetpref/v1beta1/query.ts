/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ValidatorPreference } from "./state";

export const protobufPackage = "osmosis.valsetpref.v1beta1";

/** Request type for UserValidatorPreferences. */
export interface UserValidatorPreferencesRequest {
  /** user account address */
  address: string;
}

/** Response type the QueryUserValidatorPreferences query request */
export interface UserValidatorPreferencesResponse {
  preferences: ValidatorPreference[];
}

function createBaseUserValidatorPreferencesRequest(): UserValidatorPreferencesRequest {
  return { address: "" };
}

export const UserValidatorPreferencesRequest = {
  encode(message: UserValidatorPreferencesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserValidatorPreferencesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserValidatorPreferencesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserValidatorPreferencesRequest {
    return { address: isSet(object.address) ? globalThis.String(object.address) : "" };
  },

  toJSON(message: UserValidatorPreferencesRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserValidatorPreferencesRequest>, I>>(base?: I): UserValidatorPreferencesRequest {
    return UserValidatorPreferencesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserValidatorPreferencesRequest>, I>>(
    object: I,
  ): UserValidatorPreferencesRequest {
    const message = createBaseUserValidatorPreferencesRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseUserValidatorPreferencesResponse(): UserValidatorPreferencesResponse {
  return { preferences: [] };
}

export const UserValidatorPreferencesResponse = {
  encode(message: UserValidatorPreferencesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.preferences) {
      ValidatorPreference.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserValidatorPreferencesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserValidatorPreferencesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.preferences.push(ValidatorPreference.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserValidatorPreferencesResponse {
    return {
      preferences: globalThis.Array.isArray(object?.preferences)
        ? object.preferences.map((e: any) => ValidatorPreference.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UserValidatorPreferencesResponse): unknown {
    const obj: any = {};
    if (message.preferences?.length) {
      obj.preferences = message.preferences.map((e) => ValidatorPreference.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserValidatorPreferencesResponse>, I>>(
    base?: I,
  ): UserValidatorPreferencesResponse {
    return UserValidatorPreferencesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserValidatorPreferencesResponse>, I>>(
    object: I,
  ): UserValidatorPreferencesResponse {
    const message = createBaseUserValidatorPreferencesResponse();
    message.preferences = object.preferences?.map((e) => ValidatorPreference.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Returns the list of ValidatorPreferences for the user. */
  UserValidatorPreferences(request: UserValidatorPreferencesRequest): Promise<UserValidatorPreferencesResponse>;
}

export const QueryServiceName = "osmosis.valsetpref.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.UserValidatorPreferences = this.UserValidatorPreferences.bind(this);
  }
  UserValidatorPreferences(request: UserValidatorPreferencesRequest): Promise<UserValidatorPreferencesResponse> {
    const data = UserValidatorPreferencesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UserValidatorPreferences", data);
    return promise.then((data) => UserValidatorPreferencesResponse.decode(_m0.Reader.create(data)));
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
