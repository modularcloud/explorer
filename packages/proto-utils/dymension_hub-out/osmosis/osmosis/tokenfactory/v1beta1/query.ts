/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DenomAuthorityMetadata } from "./authorityMetadata";
import { Params } from "./params";

export const protobufPackage = "osmosis.tokenfactory.v1beta1";

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

/**
 * QueryDenomAuthorityMetadataRequest defines the request structure for the
 * DenomAuthorityMetadata gRPC query.
 */
export interface QueryDenomAuthorityMetadataRequest {
  denom: string;
}

/**
 * QueryDenomAuthorityMetadataResponse defines the response structure for the
 * DenomAuthorityMetadata gRPC query.
 */
export interface QueryDenomAuthorityMetadataResponse {
  authorityMetadata: DenomAuthorityMetadata | undefined;
}

/**
 * QueryDenomsFromCreatorRequest defines the request structure for the
 * DenomsFromCreator gRPC query.
 */
export interface QueryDenomsFromCreatorRequest {
  creator: string;
}

/**
 * QueryDenomsFromCreatorRequest defines the response structure for the
 * DenomsFromCreator gRPC query.
 */
export interface QueryDenomsFromCreatorResponse {
  denoms: string[];
}

export interface QueryBeforeSendHookAddressRequest {
  denom: string;
}

/**
 * QueryBeforeSendHookAddressResponse defines the response structure for the
 * DenomBeforeSendHook gRPC query.
 */
export interface QueryBeforeSendHookAddressResponse {
  cosmwasmAddress: string;
}

export interface QueryAllBeforeSendHooksAddressesRequest {
}

/**
 * QueryAllBeforeSendHooksAddressesResponse defines the response structure for
 * the AllBeforeSendHooksAddresses gRPC query.
 */
export interface QueryAllBeforeSendHooksAddressesResponse {
  denoms: string[];
  beforeSendHookAddresses: string[];
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

function createBaseQueryDenomAuthorityMetadataRequest(): QueryDenomAuthorityMetadataRequest {
  return { denom: "" };
}

export const QueryDenomAuthorityMetadataRequest = {
  encode(message: QueryDenomAuthorityMetadataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomAuthorityMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomAuthorityMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomAuthorityMetadataRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: QueryDenomAuthorityMetadataRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomAuthorityMetadataRequest>, I>>(
    base?: I,
  ): QueryDenomAuthorityMetadataRequest {
    return QueryDenomAuthorityMetadataRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomAuthorityMetadataRequest>, I>>(
    object: I,
  ): QueryDenomAuthorityMetadataRequest {
    const message = createBaseQueryDenomAuthorityMetadataRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryDenomAuthorityMetadataResponse(): QueryDenomAuthorityMetadataResponse {
  return { authorityMetadata: undefined };
}

export const QueryDenomAuthorityMetadataResponse = {
  encode(message: QueryDenomAuthorityMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authorityMetadata !== undefined) {
      DenomAuthorityMetadata.encode(message.authorityMetadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomAuthorityMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomAuthorityMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authorityMetadata = DenomAuthorityMetadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomAuthorityMetadataResponse {
    return {
      authorityMetadata: isSet(object.authorityMetadata)
        ? DenomAuthorityMetadata.fromJSON(object.authorityMetadata)
        : undefined,
    };
  },

  toJSON(message: QueryDenomAuthorityMetadataResponse): unknown {
    const obj: any = {};
    if (message.authorityMetadata !== undefined) {
      obj.authorityMetadata = DenomAuthorityMetadata.toJSON(message.authorityMetadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomAuthorityMetadataResponse>, I>>(
    base?: I,
  ): QueryDenomAuthorityMetadataResponse {
    return QueryDenomAuthorityMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomAuthorityMetadataResponse>, I>>(
    object: I,
  ): QueryDenomAuthorityMetadataResponse {
    const message = createBaseQueryDenomAuthorityMetadataResponse();
    message.authorityMetadata = (object.authorityMetadata !== undefined && object.authorityMetadata !== null)
      ? DenomAuthorityMetadata.fromPartial(object.authorityMetadata)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomsFromCreatorRequest(): QueryDenomsFromCreatorRequest {
  return { creator: "" };
}

export const QueryDenomsFromCreatorRequest = {
  encode(message: QueryDenomsFromCreatorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsFromCreatorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsFromCreatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomsFromCreatorRequest {
    return { creator: isSet(object.creator) ? globalThis.String(object.creator) : "" };
  },

  toJSON(message: QueryDenomsFromCreatorRequest): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomsFromCreatorRequest>, I>>(base?: I): QueryDenomsFromCreatorRequest {
    return QueryDenomsFromCreatorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomsFromCreatorRequest>, I>>(
    object: I,
  ): QueryDenomsFromCreatorRequest {
    const message = createBaseQueryDenomsFromCreatorRequest();
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseQueryDenomsFromCreatorResponse(): QueryDenomsFromCreatorResponse {
  return { denoms: [] };
}

export const QueryDenomsFromCreatorResponse = {
  encode(message: QueryDenomsFromCreatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denoms) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsFromCreatorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsFromCreatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denoms.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomsFromCreatorResponse {
    return {
      denoms: globalThis.Array.isArray(object?.denoms) ? object.denoms.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: QueryDenomsFromCreatorResponse): unknown {
    const obj: any = {};
    if (message.denoms?.length) {
      obj.denoms = message.denoms;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomsFromCreatorResponse>, I>>(base?: I): QueryDenomsFromCreatorResponse {
    return QueryDenomsFromCreatorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomsFromCreatorResponse>, I>>(
    object: I,
  ): QueryDenomsFromCreatorResponse {
    const message = createBaseQueryDenomsFromCreatorResponse();
    message.denoms = object.denoms?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryBeforeSendHookAddressRequest(): QueryBeforeSendHookAddressRequest {
  return { denom: "" };
}

export const QueryBeforeSendHookAddressRequest = {
  encode(message: QueryBeforeSendHookAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBeforeSendHookAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBeforeSendHookAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryBeforeSendHookAddressRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: QueryBeforeSendHookAddressRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryBeforeSendHookAddressRequest>, I>>(
    base?: I,
  ): QueryBeforeSendHookAddressRequest {
    return QueryBeforeSendHookAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryBeforeSendHookAddressRequest>, I>>(
    object: I,
  ): QueryBeforeSendHookAddressRequest {
    const message = createBaseQueryBeforeSendHookAddressRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryBeforeSendHookAddressResponse(): QueryBeforeSendHookAddressResponse {
  return { cosmwasmAddress: "" };
}

export const QueryBeforeSendHookAddressResponse = {
  encode(message: QueryBeforeSendHookAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cosmwasmAddress !== "") {
      writer.uint32(10).string(message.cosmwasmAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryBeforeSendHookAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBeforeSendHookAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cosmwasmAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryBeforeSendHookAddressResponse {
    return { cosmwasmAddress: isSet(object.cosmwasmAddress) ? globalThis.String(object.cosmwasmAddress) : "" };
  },

  toJSON(message: QueryBeforeSendHookAddressResponse): unknown {
    const obj: any = {};
    if (message.cosmwasmAddress !== "") {
      obj.cosmwasmAddress = message.cosmwasmAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryBeforeSendHookAddressResponse>, I>>(
    base?: I,
  ): QueryBeforeSendHookAddressResponse {
    return QueryBeforeSendHookAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryBeforeSendHookAddressResponse>, I>>(
    object: I,
  ): QueryBeforeSendHookAddressResponse {
    const message = createBaseQueryBeforeSendHookAddressResponse();
    message.cosmwasmAddress = object.cosmwasmAddress ?? "";
    return message;
  },
};

function createBaseQueryAllBeforeSendHooksAddressesRequest(): QueryAllBeforeSendHooksAddressesRequest {
  return {};
}

export const QueryAllBeforeSendHooksAddressesRequest = {
  encode(_: QueryAllBeforeSendHooksAddressesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBeforeSendHooksAddressesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBeforeSendHooksAddressesRequest();
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

  fromJSON(_: any): QueryAllBeforeSendHooksAddressesRequest {
    return {};
  },

  toJSON(_: QueryAllBeforeSendHooksAddressesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllBeforeSendHooksAddressesRequest>, I>>(
    base?: I,
  ): QueryAllBeforeSendHooksAddressesRequest {
    return QueryAllBeforeSendHooksAddressesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllBeforeSendHooksAddressesRequest>, I>>(
    _: I,
  ): QueryAllBeforeSendHooksAddressesRequest {
    const message = createBaseQueryAllBeforeSendHooksAddressesRequest();
    return message;
  },
};

function createBaseQueryAllBeforeSendHooksAddressesResponse(): QueryAllBeforeSendHooksAddressesResponse {
  return { denoms: [], beforeSendHookAddresses: [] };
}

export const QueryAllBeforeSendHooksAddressesResponse = {
  encode(message: QueryAllBeforeSendHooksAddressesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denoms) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.beforeSendHookAddresses) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBeforeSendHooksAddressesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBeforeSendHooksAddressesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denoms.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.beforeSendHookAddresses.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllBeforeSendHooksAddressesResponse {
    return {
      denoms: globalThis.Array.isArray(object?.denoms) ? object.denoms.map((e: any) => globalThis.String(e)) : [],
      beforeSendHookAddresses: globalThis.Array.isArray(object?.beforeSendHookAddresses)
        ? object.beforeSendHookAddresses.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: QueryAllBeforeSendHooksAddressesResponse): unknown {
    const obj: any = {};
    if (message.denoms?.length) {
      obj.denoms = message.denoms;
    }
    if (message.beforeSendHookAddresses?.length) {
      obj.beforeSendHookAddresses = message.beforeSendHookAddresses;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllBeforeSendHooksAddressesResponse>, I>>(
    base?: I,
  ): QueryAllBeforeSendHooksAddressesResponse {
    return QueryAllBeforeSendHooksAddressesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllBeforeSendHooksAddressesResponse>, I>>(
    object: I,
  ): QueryAllBeforeSendHooksAddressesResponse {
    const message = createBaseQueryAllBeforeSendHooksAddressesResponse();
    message.denoms = object.denoms?.map((e) => e) || [];
    message.beforeSendHookAddresses = object.beforeSendHookAddresses?.map((e) => e) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /**
   * Params defines a gRPC query method that returns the tokenfactory module's
   * parameters.
   */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * DenomAuthorityMetadata defines a gRPC query method for fetching
   * DenomAuthorityMetadata for a particular denom.
   */
  DenomAuthorityMetadata(request: QueryDenomAuthorityMetadataRequest): Promise<QueryDenomAuthorityMetadataResponse>;
  /**
   * DenomsFromCreator defines a gRPC query method for fetching all
   * denominations created by a specific admin/creator.
   */
  DenomsFromCreator(request: QueryDenomsFromCreatorRequest): Promise<QueryDenomsFromCreatorResponse>;
  /**
   * BeforeSendHookAddress defines a gRPC query method for
   * getting the address registered for the before send hook.
   */
  BeforeSendHookAddress(request: QueryBeforeSendHookAddressRequest): Promise<QueryBeforeSendHookAddressResponse>;
  /**
   * AllBeforeSendHooksAddresses defines a gRPC query method for
   * getting all addresses with before send hook registered.
   * The response returns two arrays, an array with a list of denom and an array
   * of before send hook addresses. The idx of denom corresponds to before send
   * hook addresse's idx.
   */
  AllBeforeSendHooksAddresses(
    request: QueryAllBeforeSendHooksAddressesRequest,
  ): Promise<QueryAllBeforeSendHooksAddressesResponse>;
}

export const QueryServiceName = "osmosis.tokenfactory.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.DenomAuthorityMetadata = this.DenomAuthorityMetadata.bind(this);
    this.DenomsFromCreator = this.DenomsFromCreator.bind(this);
    this.BeforeSendHookAddress = this.BeforeSendHookAddress.bind(this);
    this.AllBeforeSendHooksAddresses = this.AllBeforeSendHooksAddresses.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  DenomAuthorityMetadata(request: QueryDenomAuthorityMetadataRequest): Promise<QueryDenomAuthorityMetadataResponse> {
    const data = QueryDenomAuthorityMetadataRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomAuthorityMetadata", data);
    return promise.then((data) => QueryDenomAuthorityMetadataResponse.decode(_m0.Reader.create(data)));
  }

  DenomsFromCreator(request: QueryDenomsFromCreatorRequest): Promise<QueryDenomsFromCreatorResponse> {
    const data = QueryDenomsFromCreatorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomsFromCreator", data);
    return promise.then((data) => QueryDenomsFromCreatorResponse.decode(_m0.Reader.create(data)));
  }

  BeforeSendHookAddress(request: QueryBeforeSendHookAddressRequest): Promise<QueryBeforeSendHookAddressResponse> {
    const data = QueryBeforeSendHookAddressRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BeforeSendHookAddress", data);
    return promise.then((data) => QueryBeforeSendHookAddressResponse.decode(_m0.Reader.create(data)));
  }

  AllBeforeSendHooksAddresses(
    request: QueryAllBeforeSendHooksAddressesRequest,
  ): Promise<QueryAllBeforeSendHooksAddressesResponse> {
    const data = QueryAllBeforeSendHooksAddressesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AllBeforeSendHooksAddresses", data);
    return promise.then((data) => QueryAllBeforeSendHooksAddressesResponse.decode(_m0.Reader.create(data)));
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
