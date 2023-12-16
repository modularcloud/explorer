/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Params } from "./params";
import { Rollapp, RollappSummary } from "./rollapp";
import { StateInfo, StateInfoIndex, StateInfoSummary } from "./state_info";

export const protobufPackage = "dymensionxyz.dymension.rollapp";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetRollappRequest {
  rollappId: string;
}

export interface QueryGetRollappByEIP155Request {
  eip155: Long;
}

export interface QueryGetLatestStateIndexRequest {
  rollappId: string;
  finalized: boolean;
}

export interface QueryGetLatestStateIndexResponse {
  stateIndex: StateInfoIndex | undefined;
}

export interface QueryGetRollappResponse {
  rollapp:
    | Rollapp
    | undefined;
  /** Defines the index of the last rollapp UpdateState. */
  latestStateIndex:
    | StateInfoIndex
    | undefined;
  /** Defines the index of the last rollapp UpdateState that was finalized. */
  latestFinalizedStateIndex: StateInfoIndex | undefined;
}

export interface QueryAllRollappRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllRollappResponse {
  rollapp: RollappSummary[];
  pagination: PageResponse | undefined;
}

export interface QueryGetStateInfoRequest {
  rollappId: string;
  index: Long;
  height: Long;
  finalized: boolean;
}

export interface QueryGetStateInfoResponse {
  stateInfo: StateInfo | undefined;
}

export interface QueryAllStateInfoRequest {
  rollappId: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllStateInfoResponse {
  stateInfo: StateInfoSummary[];
  pagination: PageResponse | undefined;
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

function createBaseQueryGetRollappRequest(): QueryGetRollappRequest {
  return { rollappId: "" };
}

export const QueryGetRollappRequest = {
  encode(message: QueryGetRollappRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRollappRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRollappRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rollappId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetRollappRequest {
    return { rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "" };
  },

  toJSON(message: QueryGetRollappRequest): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetRollappRequest>, I>>(base?: I): QueryGetRollappRequest {
    return QueryGetRollappRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetRollappRequest>, I>>(object: I): QueryGetRollappRequest {
    const message = createBaseQueryGetRollappRequest();
    message.rollappId = object.rollappId ?? "";
    return message;
  },
};

function createBaseQueryGetRollappByEIP155Request(): QueryGetRollappByEIP155Request {
  return { eip155: Long.UZERO };
}

export const QueryGetRollappByEIP155Request = {
  encode(message: QueryGetRollappByEIP155Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.eip155.isZero()) {
      writer.uint32(8).uint64(message.eip155);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRollappByEIP155Request {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRollappByEIP155Request();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.eip155 = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetRollappByEIP155Request {
    return { eip155: isSet(object.eip155) ? Long.fromValue(object.eip155) : Long.UZERO };
  },

  toJSON(message: QueryGetRollappByEIP155Request): unknown {
    const obj: any = {};
    if (!message.eip155.isZero()) {
      obj.eip155 = (message.eip155 || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetRollappByEIP155Request>, I>>(base?: I): QueryGetRollappByEIP155Request {
    return QueryGetRollappByEIP155Request.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetRollappByEIP155Request>, I>>(
    object: I,
  ): QueryGetRollappByEIP155Request {
    const message = createBaseQueryGetRollappByEIP155Request();
    message.eip155 = (object.eip155 !== undefined && object.eip155 !== null)
      ? Long.fromValue(object.eip155)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryGetLatestStateIndexRequest(): QueryGetLatestStateIndexRequest {
  return { rollappId: "", finalized: false };
}

export const QueryGetLatestStateIndexRequest = {
  encode(message: QueryGetLatestStateIndexRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    if (message.finalized === true) {
      writer.uint32(16).bool(message.finalized);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetLatestStateIndexRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetLatestStateIndexRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rollappId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.finalized = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetLatestStateIndexRequest {
    return {
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      finalized: isSet(object.finalized) ? globalThis.Boolean(object.finalized) : false,
    };
  },

  toJSON(message: QueryGetLatestStateIndexRequest): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (message.finalized === true) {
      obj.finalized = message.finalized;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetLatestStateIndexRequest>, I>>(base?: I): QueryGetLatestStateIndexRequest {
    return QueryGetLatestStateIndexRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetLatestStateIndexRequest>, I>>(
    object: I,
  ): QueryGetLatestStateIndexRequest {
    const message = createBaseQueryGetLatestStateIndexRequest();
    message.rollappId = object.rollappId ?? "";
    message.finalized = object.finalized ?? false;
    return message;
  },
};

function createBaseQueryGetLatestStateIndexResponse(): QueryGetLatestStateIndexResponse {
  return { stateIndex: undefined };
}

export const QueryGetLatestStateIndexResponse = {
  encode(message: QueryGetLatestStateIndexResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stateIndex !== undefined) {
      StateInfoIndex.encode(message.stateIndex, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetLatestStateIndexResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetLatestStateIndexResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stateIndex = StateInfoIndex.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetLatestStateIndexResponse {
    return { stateIndex: isSet(object.stateIndex) ? StateInfoIndex.fromJSON(object.stateIndex) : undefined };
  },

  toJSON(message: QueryGetLatestStateIndexResponse): unknown {
    const obj: any = {};
    if (message.stateIndex !== undefined) {
      obj.stateIndex = StateInfoIndex.toJSON(message.stateIndex);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetLatestStateIndexResponse>, I>>(
    base?: I,
  ): QueryGetLatestStateIndexResponse {
    return QueryGetLatestStateIndexResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetLatestStateIndexResponse>, I>>(
    object: I,
  ): QueryGetLatestStateIndexResponse {
    const message = createBaseQueryGetLatestStateIndexResponse();
    message.stateIndex = (object.stateIndex !== undefined && object.stateIndex !== null)
      ? StateInfoIndex.fromPartial(object.stateIndex)
      : undefined;
    return message;
  },
};

function createBaseQueryGetRollappResponse(): QueryGetRollappResponse {
  return { rollapp: undefined, latestStateIndex: undefined, latestFinalizedStateIndex: undefined };
}

export const QueryGetRollappResponse = {
  encode(message: QueryGetRollappResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollapp !== undefined) {
      Rollapp.encode(message.rollapp, writer.uint32(10).fork()).ldelim();
    }
    if (message.latestStateIndex !== undefined) {
      StateInfoIndex.encode(message.latestStateIndex, writer.uint32(18).fork()).ldelim();
    }
    if (message.latestFinalizedStateIndex !== undefined) {
      StateInfoIndex.encode(message.latestFinalizedStateIndex, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetRollappResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRollappResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rollapp = Rollapp.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.latestStateIndex = StateInfoIndex.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.latestFinalizedStateIndex = StateInfoIndex.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetRollappResponse {
    return {
      rollapp: isSet(object.rollapp) ? Rollapp.fromJSON(object.rollapp) : undefined,
      latestStateIndex: isSet(object.latestStateIndex) ? StateInfoIndex.fromJSON(object.latestStateIndex) : undefined,
      latestFinalizedStateIndex: isSet(object.latestFinalizedStateIndex)
        ? StateInfoIndex.fromJSON(object.latestFinalizedStateIndex)
        : undefined,
    };
  },

  toJSON(message: QueryGetRollappResponse): unknown {
    const obj: any = {};
    if (message.rollapp !== undefined) {
      obj.rollapp = Rollapp.toJSON(message.rollapp);
    }
    if (message.latestStateIndex !== undefined) {
      obj.latestStateIndex = StateInfoIndex.toJSON(message.latestStateIndex);
    }
    if (message.latestFinalizedStateIndex !== undefined) {
      obj.latestFinalizedStateIndex = StateInfoIndex.toJSON(message.latestFinalizedStateIndex);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetRollappResponse>, I>>(base?: I): QueryGetRollappResponse {
    return QueryGetRollappResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetRollappResponse>, I>>(object: I): QueryGetRollappResponse {
    const message = createBaseQueryGetRollappResponse();
    message.rollapp = (object.rollapp !== undefined && object.rollapp !== null)
      ? Rollapp.fromPartial(object.rollapp)
      : undefined;
    message.latestStateIndex = (object.latestStateIndex !== undefined && object.latestStateIndex !== null)
      ? StateInfoIndex.fromPartial(object.latestStateIndex)
      : undefined;
    message.latestFinalizedStateIndex =
      (object.latestFinalizedStateIndex !== undefined && object.latestFinalizedStateIndex !== null)
        ? StateInfoIndex.fromPartial(object.latestFinalizedStateIndex)
        : undefined;
    return message;
  },
};

function createBaseQueryAllRollappRequest(): QueryAllRollappRequest {
  return { pagination: undefined };
}

export const QueryAllRollappRequest = {
  encode(message: QueryAllRollappRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRollappRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRollappRequest();
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

  fromJSON(object: any): QueryAllRollappRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllRollappRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllRollappRequest>, I>>(base?: I): QueryAllRollappRequest {
    return QueryAllRollappRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllRollappRequest>, I>>(object: I): QueryAllRollappRequest {
    const message = createBaseQueryAllRollappRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllRollappResponse(): QueryAllRollappResponse {
  return { rollapp: [], pagination: undefined };
}

export const QueryAllRollappResponse = {
  encode(message: QueryAllRollappResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.rollapp) {
      RollappSummary.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllRollappResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRollappResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rollapp.push(RollappSummary.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllRollappResponse {
    return {
      rollapp: globalThis.Array.isArray(object?.rollapp)
        ? object.rollapp.map((e: any) => RollappSummary.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllRollappResponse): unknown {
    const obj: any = {};
    if (message.rollapp?.length) {
      obj.rollapp = message.rollapp.map((e) => RollappSummary.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllRollappResponse>, I>>(base?: I): QueryAllRollappResponse {
    return QueryAllRollappResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllRollappResponse>, I>>(object: I): QueryAllRollappResponse {
    const message = createBaseQueryAllRollappResponse();
    message.rollapp = object.rollapp?.map((e) => RollappSummary.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetStateInfoRequest(): QueryGetStateInfoRequest {
  return { rollappId: "", index: Long.UZERO, height: Long.UZERO, finalized: false };
}

export const QueryGetStateInfoRequest = {
  encode(message: QueryGetStateInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    if (!message.index.isZero()) {
      writer.uint32(16).uint64(message.index);
    }
    if (!message.height.isZero()) {
      writer.uint32(24).uint64(message.height);
    }
    if (message.finalized === true) {
      writer.uint32(32).bool(message.finalized);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetStateInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetStateInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rollappId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.index = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.finalized = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetStateInfoRequest {
    return {
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      index: isSet(object.index) ? Long.fromValue(object.index) : Long.UZERO,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      finalized: isSet(object.finalized) ? globalThis.Boolean(object.finalized) : false,
    };
  },

  toJSON(message: QueryGetStateInfoRequest): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (!message.index.isZero()) {
      obj.index = (message.index || Long.UZERO).toString();
    }
    if (!message.height.isZero()) {
      obj.height = (message.height || Long.UZERO).toString();
    }
    if (message.finalized === true) {
      obj.finalized = message.finalized;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetStateInfoRequest>, I>>(base?: I): QueryGetStateInfoRequest {
    return QueryGetStateInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetStateInfoRequest>, I>>(object: I): QueryGetStateInfoRequest {
    const message = createBaseQueryGetStateInfoRequest();
    message.rollappId = object.rollappId ?? "";
    message.index = (object.index !== undefined && object.index !== null) ? Long.fromValue(object.index) : Long.UZERO;
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.UZERO;
    message.finalized = object.finalized ?? false;
    return message;
  },
};

function createBaseQueryGetStateInfoResponse(): QueryGetStateInfoResponse {
  return { stateInfo: undefined };
}

export const QueryGetStateInfoResponse = {
  encode(message: QueryGetStateInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stateInfo !== undefined) {
      StateInfo.encode(message.stateInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetStateInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetStateInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stateInfo = StateInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetStateInfoResponse {
    return { stateInfo: isSet(object.stateInfo) ? StateInfo.fromJSON(object.stateInfo) : undefined };
  },

  toJSON(message: QueryGetStateInfoResponse): unknown {
    const obj: any = {};
    if (message.stateInfo !== undefined) {
      obj.stateInfo = StateInfo.toJSON(message.stateInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetStateInfoResponse>, I>>(base?: I): QueryGetStateInfoResponse {
    return QueryGetStateInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetStateInfoResponse>, I>>(object: I): QueryGetStateInfoResponse {
    const message = createBaseQueryGetStateInfoResponse();
    message.stateInfo = (object.stateInfo !== undefined && object.stateInfo !== null)
      ? StateInfo.fromPartial(object.stateInfo)
      : undefined;
    return message;
  },
};

function createBaseQueryAllStateInfoRequest(): QueryAllStateInfoRequest {
  return { rollappId: "", pagination: undefined };
}

export const QueryAllStateInfoRequest = {
  encode(message: QueryAllStateInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllStateInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStateInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rollappId = reader.string();
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

  fromJSON(object: any): QueryAllStateInfoRequest {
    return {
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllStateInfoRequest): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllStateInfoRequest>, I>>(base?: I): QueryAllStateInfoRequest {
    return QueryAllStateInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllStateInfoRequest>, I>>(object: I): QueryAllStateInfoRequest {
    const message = createBaseQueryAllStateInfoRequest();
    message.rollappId = object.rollappId ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllStateInfoResponse(): QueryAllStateInfoResponse {
  return { stateInfo: [], pagination: undefined };
}

export const QueryAllStateInfoResponse = {
  encode(message: QueryAllStateInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.stateInfo) {
      StateInfoSummary.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllStateInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllStateInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stateInfo.push(StateInfoSummary.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllStateInfoResponse {
    return {
      stateInfo: globalThis.Array.isArray(object?.stateInfo)
        ? object.stateInfo.map((e: any) => StateInfoSummary.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllStateInfoResponse): unknown {
    const obj: any = {};
    if (message.stateInfo?.length) {
      obj.stateInfo = message.stateInfo.map((e) => StateInfoSummary.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllStateInfoResponse>, I>>(base?: I): QueryAllStateInfoResponse {
    return QueryAllStateInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllStateInfoResponse>, I>>(object: I): QueryAllStateInfoResponse {
    const message = createBaseQueryAllStateInfoResponse();
    message.stateInfo = object.stateInfo?.map((e) => StateInfoSummary.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Rollapp by index. */
  Rollapp(request: QueryGetRollappRequest): Promise<QueryGetRollappResponse>;
  /** Queries a Rollapp by index. */
  RollappByEIP155(request: QueryGetRollappByEIP155Request): Promise<QueryGetRollappResponse>;
  /** Queries a list of Rollapp items. */
  RollappAll(request: QueryAllRollappRequest): Promise<QueryAllRollappResponse>;
  /** Queries a LatestStateIndex by rollapp-id. */
  LatestStateIndex(request: QueryGetLatestStateIndexRequest): Promise<QueryGetLatestStateIndexResponse>;
  /** Queries a StateInfo by index. */
  StateInfo(request: QueryGetStateInfoRequest): Promise<QueryGetStateInfoResponse>;
  /** Queries a list of StateInfo items. */
  StateInfoAll(request: QueryAllStateInfoRequest): Promise<QueryAllStateInfoResponse>;
}

export const QueryServiceName = "dymensionxyz.dymension.rollapp.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Rollapp = this.Rollapp.bind(this);
    this.RollappByEIP155 = this.RollappByEIP155.bind(this);
    this.RollappAll = this.RollappAll.bind(this);
    this.LatestStateIndex = this.LatestStateIndex.bind(this);
    this.StateInfo = this.StateInfo.bind(this);
    this.StateInfoAll = this.StateInfoAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  Rollapp(request: QueryGetRollappRequest): Promise<QueryGetRollappResponse> {
    const data = QueryGetRollappRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Rollapp", data);
    return promise.then((data) => QueryGetRollappResponse.decode(_m0.Reader.create(data)));
  }

  RollappByEIP155(request: QueryGetRollappByEIP155Request): Promise<QueryGetRollappResponse> {
    const data = QueryGetRollappByEIP155Request.encode(request).finish();
    const promise = this.rpc.request(this.service, "RollappByEIP155", data);
    return promise.then((data) => QueryGetRollappResponse.decode(_m0.Reader.create(data)));
  }

  RollappAll(request: QueryAllRollappRequest): Promise<QueryAllRollappResponse> {
    const data = QueryAllRollappRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RollappAll", data);
    return promise.then((data) => QueryAllRollappResponse.decode(_m0.Reader.create(data)));
  }

  LatestStateIndex(request: QueryGetLatestStateIndexRequest): Promise<QueryGetLatestStateIndexResponse> {
    const data = QueryGetLatestStateIndexRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "LatestStateIndex", data);
    return promise.then((data) => QueryGetLatestStateIndexResponse.decode(_m0.Reader.create(data)));
  }

  StateInfo(request: QueryGetStateInfoRequest): Promise<QueryGetStateInfoResponse> {
    const data = QueryGetStateInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "StateInfo", data);
    return promise.then((data) => QueryGetStateInfoResponse.decode(_m0.Reader.create(data)));
  }

  StateInfoAll(request: QueryAllStateInfoRequest): Promise<QueryAllStateInfoResponse> {
    const data = QueryAllStateInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "StateInfoAll", data);
    return promise.then((data) => QueryAllStateInfoResponse.decode(_m0.Reader.create(data)));
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
