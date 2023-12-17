/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmos.accounts.v1";

/** AccountQueryRequest is the request type for the Query/AccountQuery RPC */
export interface AccountQueryRequest {
  /** target defines the account to be queried. */
  target: string;
  /** request defines the query message being sent to the account. */
  request: Any | undefined;
}

/** AccountQueryResponse is the response type for the Query/AccountQuery RPC method. */
export interface AccountQueryResponse {
  /** response defines the query response of the account. */
  response: Any | undefined;
}

/** SchemaResponse is the response type for the Query/Schema RPC method. */
export interface SchemaRequest {
  /** account_type defines the account type to query the schema for. */
  accountType: string;
}

/** SchemaResponse is the response type for the Query/Schema RPC method. */
export interface SchemaResponse {
  /** init_schema defines the schema descriptor for the Init account method. */
  initSchema:
    | SchemaResponse_Handler
    | undefined;
  /** execute_handlers defines the schema descriptor for the Execute account method. */
  executeHandlers: SchemaResponse_Handler[];
  /** query_handlers defines the schema descriptor for the Query account method. */
  queryHandlers: SchemaResponse_Handler[];
}

/**
 * Handler defines a schema descriptor for a handler.
 * Where request and response are names that can be used to lookup the
 * reflection descriptor.
 */
export interface SchemaResponse_Handler {
  /** request is the request name */
  request: string;
  /** response is the response name */
  response: string;
}

/** AccountTypeRequest is the request type for the Query/AccountType RPC method. */
export interface AccountTypeRequest {
  /** address defines the address to query the account type for. */
  address: string;
}

/** AccountTypeResponse is the response type for the Query/AccountType RPC method. */
export interface AccountTypeResponse {
  /** account_type defines the account type for the address. */
  accountType: string;
}

function createBaseAccountQueryRequest(): AccountQueryRequest {
  return { target: "", request: undefined };
}

export const AccountQueryRequest = {
  encode(message: AccountQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.target !== "") {
      writer.uint32(10).string(message.target);
    }
    if (message.request !== undefined) {
      Any.encode(message.request, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.target = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.request = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountQueryRequest {
    return {
      target: isSet(object.target) ? globalThis.String(object.target) : "",
      request: isSet(object.request) ? Any.fromJSON(object.request) : undefined,
    };
  },

  toJSON(message: AccountQueryRequest): unknown {
    const obj: any = {};
    if (message.target !== "") {
      obj.target = message.target;
    }
    if (message.request !== undefined) {
      obj.request = Any.toJSON(message.request);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountQueryRequest>, I>>(base?: I): AccountQueryRequest {
    return AccountQueryRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountQueryRequest>, I>>(object: I): AccountQueryRequest {
    const message = createBaseAccountQueryRequest();
    message.target = object.target ?? "";
    message.request = (object.request !== undefined && object.request !== null)
      ? Any.fromPartial(object.request)
      : undefined;
    return message;
  },
};

function createBaseAccountQueryResponse(): AccountQueryResponse {
  return { response: undefined };
}

export const AccountQueryResponse = {
  encode(message: AccountQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.response !== undefined) {
      Any.encode(message.response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.response = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountQueryResponse {
    return { response: isSet(object.response) ? Any.fromJSON(object.response) : undefined };
  },

  toJSON(message: AccountQueryResponse): unknown {
    const obj: any = {};
    if (message.response !== undefined) {
      obj.response = Any.toJSON(message.response);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountQueryResponse>, I>>(base?: I): AccountQueryResponse {
    return AccountQueryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountQueryResponse>, I>>(object: I): AccountQueryResponse {
    const message = createBaseAccountQueryResponse();
    message.response = (object.response !== undefined && object.response !== null)
      ? Any.fromPartial(object.response)
      : undefined;
    return message;
  },
};

function createBaseSchemaRequest(): SchemaRequest {
  return { accountType: "" };
}

export const SchemaRequest = {
  encode(message: SchemaRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountType !== "") {
      writer.uint32(10).string(message.accountType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemaRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchemaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accountType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SchemaRequest {
    return { accountType: isSet(object.accountType) ? globalThis.String(object.accountType) : "" };
  },

  toJSON(message: SchemaRequest): unknown {
    const obj: any = {};
    if (message.accountType !== "") {
      obj.accountType = message.accountType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SchemaRequest>, I>>(base?: I): SchemaRequest {
    return SchemaRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SchemaRequest>, I>>(object: I): SchemaRequest {
    const message = createBaseSchemaRequest();
    message.accountType = object.accountType ?? "";
    return message;
  },
};

function createBaseSchemaResponse(): SchemaResponse {
  return { initSchema: undefined, executeHandlers: [], queryHandlers: [] };
}

export const SchemaResponse = {
  encode(message: SchemaResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.initSchema !== undefined) {
      SchemaResponse_Handler.encode(message.initSchema, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.executeHandlers) {
      SchemaResponse_Handler.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.queryHandlers) {
      SchemaResponse_Handler.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemaResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchemaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.initSchema = SchemaResponse_Handler.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.executeHandlers.push(SchemaResponse_Handler.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.queryHandlers.push(SchemaResponse_Handler.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SchemaResponse {
    return {
      initSchema: isSet(object.initSchema) ? SchemaResponse_Handler.fromJSON(object.initSchema) : undefined,
      executeHandlers: globalThis.Array.isArray(object?.executeHandlers)
        ? object.executeHandlers.map((e: any) => SchemaResponse_Handler.fromJSON(e))
        : [],
      queryHandlers: globalThis.Array.isArray(object?.queryHandlers)
        ? object.queryHandlers.map((e: any) => SchemaResponse_Handler.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SchemaResponse): unknown {
    const obj: any = {};
    if (message.initSchema !== undefined) {
      obj.initSchema = SchemaResponse_Handler.toJSON(message.initSchema);
    }
    if (message.executeHandlers?.length) {
      obj.executeHandlers = message.executeHandlers.map((e) => SchemaResponse_Handler.toJSON(e));
    }
    if (message.queryHandlers?.length) {
      obj.queryHandlers = message.queryHandlers.map((e) => SchemaResponse_Handler.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SchemaResponse>, I>>(base?: I): SchemaResponse {
    return SchemaResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SchemaResponse>, I>>(object: I): SchemaResponse {
    const message = createBaseSchemaResponse();
    message.initSchema = (object.initSchema !== undefined && object.initSchema !== null)
      ? SchemaResponse_Handler.fromPartial(object.initSchema)
      : undefined;
    message.executeHandlers = object.executeHandlers?.map((e) => SchemaResponse_Handler.fromPartial(e)) || [];
    message.queryHandlers = object.queryHandlers?.map((e) => SchemaResponse_Handler.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSchemaResponse_Handler(): SchemaResponse_Handler {
  return { request: "", response: "" };
}

export const SchemaResponse_Handler = {
  encode(message: SchemaResponse_Handler, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.request !== "") {
      writer.uint32(10).string(message.request);
    }
    if (message.response !== "") {
      writer.uint32(18).string(message.response);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemaResponse_Handler {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchemaResponse_Handler();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.request = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.response = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SchemaResponse_Handler {
    return {
      request: isSet(object.request) ? globalThis.String(object.request) : "",
      response: isSet(object.response) ? globalThis.String(object.response) : "",
    };
  },

  toJSON(message: SchemaResponse_Handler): unknown {
    const obj: any = {};
    if (message.request !== "") {
      obj.request = message.request;
    }
    if (message.response !== "") {
      obj.response = message.response;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SchemaResponse_Handler>, I>>(base?: I): SchemaResponse_Handler {
    return SchemaResponse_Handler.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SchemaResponse_Handler>, I>>(object: I): SchemaResponse_Handler {
    const message = createBaseSchemaResponse_Handler();
    message.request = object.request ?? "";
    message.response = object.response ?? "";
    return message;
  },
};

function createBaseAccountTypeRequest(): AccountTypeRequest {
  return { address: "" };
}

export const AccountTypeRequest = {
  encode(message: AccountTypeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountTypeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountTypeRequest();
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

  fromJSON(object: any): AccountTypeRequest {
    return { address: isSet(object.address) ? globalThis.String(object.address) : "" };
  },

  toJSON(message: AccountTypeRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountTypeRequest>, I>>(base?: I): AccountTypeRequest {
    return AccountTypeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountTypeRequest>, I>>(object: I): AccountTypeRequest {
    const message = createBaseAccountTypeRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseAccountTypeResponse(): AccountTypeResponse {
  return { accountType: "" };
}

export const AccountTypeResponse = {
  encode(message: AccountTypeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountType !== "") {
      writer.uint32(10).string(message.accountType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountTypeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountTypeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accountType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountTypeResponse {
    return { accountType: isSet(object.accountType) ? globalThis.String(object.accountType) : "" };
  },

  toJSON(message: AccountTypeResponse): unknown {
    const obj: any = {};
    if (message.accountType !== "") {
      obj.accountType = message.accountType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AccountTypeResponse>, I>>(base?: I): AccountTypeResponse {
    return AccountTypeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AccountTypeResponse>, I>>(object: I): AccountTypeResponse {
    const message = createBaseAccountTypeResponse();
    message.accountType = object.accountType ?? "";
    return message;
  },
};

/** Query defines the Query service for the x/accounts module. */
export interface Query {
  /** AccountQuery runs an account query. */
  AccountQuery(request: AccountQueryRequest): Promise<AccountQueryResponse>;
  /** Schema returns an x/account schema. Unstable. */
  Schema(request: SchemaRequest): Promise<SchemaResponse>;
  /** AccountType returns the account type for an address. */
  AccountType(request: AccountTypeRequest): Promise<AccountTypeResponse>;
}

export const QueryServiceName = "cosmos.accounts.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.AccountQuery = this.AccountQuery.bind(this);
    this.Schema = this.Schema.bind(this);
    this.AccountType = this.AccountType.bind(this);
  }
  AccountQuery(request: AccountQueryRequest): Promise<AccountQueryResponse> {
    const data = AccountQueryRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AccountQuery", data);
    return promise.then((data) => AccountQueryResponse.decode(_m0.Reader.create(data)));
  }

  Schema(request: SchemaRequest): Promise<SchemaResponse> {
    const data = SchemaRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Schema", data);
    return promise.then((data) => SchemaResponse.decode(_m0.Reader.create(data)));
  }

  AccountType(request: AccountTypeRequest): Promise<AccountTypeResponse> {
    const data = AccountTypeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AccountType", data);
    return promise.then((data) => AccountTypeResponse.decode(_m0.Reader.create(data)));
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
