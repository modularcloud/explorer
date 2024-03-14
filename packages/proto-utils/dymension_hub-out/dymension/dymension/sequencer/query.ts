/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { OperatingStatus, operatingStatusFromJSON, operatingStatusToJSON } from "./operating_status";
import { Params } from "./params";
import { Scheduler } from "./scheduler";
import { Sequencer } from "./sequencer";

export const protobufPackage = "dymensionxyz.dymension.sequencer";

/** SequencerInfo holds information for user query. */
export interface SequencerInfo {
  /** basic sequencer info */
  sequencer:
    | Sequencer
    | undefined;
  /** sequencers' operating status */
  status: OperatingStatus;
}

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetSequencerRequest {
  sequencerAddress: string;
}

export interface QueryGetSequencerResponse {
  sequencerInfo: SequencerInfo | undefined;
}

export interface QueryAllSequencerRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllSequencerResponse {
  sequencerInfoList: SequencerInfo[];
  pagination: PageResponse | undefined;
}

export interface QueryGetSequencersByRollappRequest {
  rollappId: string;
}

export interface QueryGetSequencersByRollappResponse {
  rollappId: string;
  sequencerInfoList: SequencerInfo[];
}

export interface QueryAllSequencersByRollappRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllSequencersByRollappResponse {
  sequencersByRollapp: QueryGetSequencersByRollappResponse[];
  pagination: PageResponse | undefined;
}

export interface QueryGetSchedulerRequest {
  sequencerAddress: string;
}

export interface QueryGetSchedulerResponse {
  scheduler: Scheduler | undefined;
}

export interface QueryAllSchedulerRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllSchedulerResponse {
  scheduler: Scheduler[];
  pagination: PageResponse | undefined;
}

function createBaseSequencerInfo(): SequencerInfo {
  return { sequencer: undefined, status: 0 };
}

export const SequencerInfo = {
  encode(message: SequencerInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequencer !== undefined) {
      Sequencer.encode(message.sequencer, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SequencerInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequencerInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencer = Sequencer.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SequencerInfo {
    return {
      sequencer: isSet(object.sequencer) ? Sequencer.fromJSON(object.sequencer) : undefined,
      status: isSet(object.status) ? operatingStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: SequencerInfo): unknown {
    const obj: any = {};
    if (message.sequencer !== undefined) {
      obj.sequencer = Sequencer.toJSON(message.sequencer);
    }
    if (message.status !== 0) {
      obj.status = operatingStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SequencerInfo>, I>>(base?: I): SequencerInfo {
    return SequencerInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SequencerInfo>, I>>(object: I): SequencerInfo {
    const message = createBaseSequencerInfo();
    message.sequencer = (object.sequencer !== undefined && object.sequencer !== null)
      ? Sequencer.fromPartial(object.sequencer)
      : undefined;
    message.status = object.status ?? 0;
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

function createBaseQueryGetSequencerRequest(): QueryGetSequencerRequest {
  return { sequencerAddress: "" };
}

export const QueryGetSequencerRequest = {
  encode(message: QueryGetSequencerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequencerAddress !== "") {
      writer.uint32(10).string(message.sequencerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSequencerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSequencerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetSequencerRequest {
    return { sequencerAddress: isSet(object.sequencerAddress) ? globalThis.String(object.sequencerAddress) : "" };
  },

  toJSON(message: QueryGetSequencerRequest): unknown {
    const obj: any = {};
    if (message.sequencerAddress !== "") {
      obj.sequencerAddress = message.sequencerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetSequencerRequest>, I>>(base?: I): QueryGetSequencerRequest {
    return QueryGetSequencerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetSequencerRequest>, I>>(object: I): QueryGetSequencerRequest {
    const message = createBaseQueryGetSequencerRequest();
    message.sequencerAddress = object.sequencerAddress ?? "";
    return message;
  },
};

function createBaseQueryGetSequencerResponse(): QueryGetSequencerResponse {
  return { sequencerInfo: undefined };
}

export const QueryGetSequencerResponse = {
  encode(message: QueryGetSequencerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequencerInfo !== undefined) {
      SequencerInfo.encode(message.sequencerInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSequencerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSequencerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencerInfo = SequencerInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetSequencerResponse {
    return { sequencerInfo: isSet(object.sequencerInfo) ? SequencerInfo.fromJSON(object.sequencerInfo) : undefined };
  },

  toJSON(message: QueryGetSequencerResponse): unknown {
    const obj: any = {};
    if (message.sequencerInfo !== undefined) {
      obj.sequencerInfo = SequencerInfo.toJSON(message.sequencerInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetSequencerResponse>, I>>(base?: I): QueryGetSequencerResponse {
    return QueryGetSequencerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetSequencerResponse>, I>>(object: I): QueryGetSequencerResponse {
    const message = createBaseQueryGetSequencerResponse();
    message.sequencerInfo = (object.sequencerInfo !== undefined && object.sequencerInfo !== null)
      ? SequencerInfo.fromPartial(object.sequencerInfo)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSequencerRequest(): QueryAllSequencerRequest {
  return { pagination: undefined };
}

export const QueryAllSequencerRequest = {
  encode(message: QueryAllSequencerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSequencerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSequencerRequest();
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

  fromJSON(object: any): QueryAllSequencerRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllSequencerRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllSequencerRequest>, I>>(base?: I): QueryAllSequencerRequest {
    return QueryAllSequencerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllSequencerRequest>, I>>(object: I): QueryAllSequencerRequest {
    const message = createBaseQueryAllSequencerRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSequencerResponse(): QueryAllSequencerResponse {
  return { sequencerInfoList: [], pagination: undefined };
}

export const QueryAllSequencerResponse = {
  encode(message: QueryAllSequencerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sequencerInfoList) {
      SequencerInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSequencerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSequencerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencerInfoList.push(SequencerInfo.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllSequencerResponse {
    return {
      sequencerInfoList: globalThis.Array.isArray(object?.sequencerInfoList)
        ? object.sequencerInfoList.map((e: any) => SequencerInfo.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllSequencerResponse): unknown {
    const obj: any = {};
    if (message.sequencerInfoList?.length) {
      obj.sequencerInfoList = message.sequencerInfoList.map((e) => SequencerInfo.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllSequencerResponse>, I>>(base?: I): QueryAllSequencerResponse {
    return QueryAllSequencerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllSequencerResponse>, I>>(object: I): QueryAllSequencerResponse {
    const message = createBaseQueryAllSequencerResponse();
    message.sequencerInfoList = object.sequencerInfoList?.map((e) => SequencerInfo.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetSequencersByRollappRequest(): QueryGetSequencersByRollappRequest {
  return { rollappId: "" };
}

export const QueryGetSequencersByRollappRequest = {
  encode(message: QueryGetSequencersByRollappRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSequencersByRollappRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSequencersByRollappRequest();
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

  fromJSON(object: any): QueryGetSequencersByRollappRequest {
    return { rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "" };
  },

  toJSON(message: QueryGetSequencersByRollappRequest): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetSequencersByRollappRequest>, I>>(
    base?: I,
  ): QueryGetSequencersByRollappRequest {
    return QueryGetSequencersByRollappRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetSequencersByRollappRequest>, I>>(
    object: I,
  ): QueryGetSequencersByRollappRequest {
    const message = createBaseQueryGetSequencersByRollappRequest();
    message.rollappId = object.rollappId ?? "";
    return message;
  },
};

function createBaseQueryGetSequencersByRollappResponse(): QueryGetSequencersByRollappResponse {
  return { rollappId: "", sequencerInfoList: [] };
}

export const QueryGetSequencersByRollappResponse = {
  encode(message: QueryGetSequencersByRollappResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    for (const v of message.sequencerInfoList) {
      SequencerInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSequencersByRollappResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSequencersByRollappResponse();
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

          message.sequencerInfoList.push(SequencerInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetSequencersByRollappResponse {
    return {
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      sequencerInfoList: globalThis.Array.isArray(object?.sequencerInfoList)
        ? object.sequencerInfoList.map((e: any) => SequencerInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetSequencersByRollappResponse): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (message.sequencerInfoList?.length) {
      obj.sequencerInfoList = message.sequencerInfoList.map((e) => SequencerInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetSequencersByRollappResponse>, I>>(
    base?: I,
  ): QueryGetSequencersByRollappResponse {
    return QueryGetSequencersByRollappResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetSequencersByRollappResponse>, I>>(
    object: I,
  ): QueryGetSequencersByRollappResponse {
    const message = createBaseQueryGetSequencersByRollappResponse();
    message.rollappId = object.rollappId ?? "";
    message.sequencerInfoList = object.sequencerInfoList?.map((e) => SequencerInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryAllSequencersByRollappRequest(): QueryAllSequencersByRollappRequest {
  return { pagination: undefined };
}

export const QueryAllSequencersByRollappRequest = {
  encode(message: QueryAllSequencersByRollappRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSequencersByRollappRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSequencersByRollappRequest();
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

  fromJSON(object: any): QueryAllSequencersByRollappRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllSequencersByRollappRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllSequencersByRollappRequest>, I>>(
    base?: I,
  ): QueryAllSequencersByRollappRequest {
    return QueryAllSequencersByRollappRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllSequencersByRollappRequest>, I>>(
    object: I,
  ): QueryAllSequencersByRollappRequest {
    const message = createBaseQueryAllSequencersByRollappRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSequencersByRollappResponse(): QueryAllSequencersByRollappResponse {
  return { sequencersByRollapp: [], pagination: undefined };
}

export const QueryAllSequencersByRollappResponse = {
  encode(message: QueryAllSequencersByRollappResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.sequencersByRollapp) {
      QueryGetSequencersByRollappResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSequencersByRollappResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSequencersByRollappResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencersByRollapp.push(QueryGetSequencersByRollappResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllSequencersByRollappResponse {
    return {
      sequencersByRollapp: globalThis.Array.isArray(object?.sequencersByRollapp)
        ? object.sequencersByRollapp.map((e: any) => QueryGetSequencersByRollappResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllSequencersByRollappResponse): unknown {
    const obj: any = {};
    if (message.sequencersByRollapp?.length) {
      obj.sequencersByRollapp = message.sequencersByRollapp.map((e) => QueryGetSequencersByRollappResponse.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllSequencersByRollappResponse>, I>>(
    base?: I,
  ): QueryAllSequencersByRollappResponse {
    return QueryAllSequencersByRollappResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllSequencersByRollappResponse>, I>>(
    object: I,
  ): QueryAllSequencersByRollappResponse {
    const message = createBaseQueryAllSequencersByRollappResponse();
    message.sequencersByRollapp =
      object.sequencersByRollapp?.map((e) => QueryGetSequencersByRollappResponse.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetSchedulerRequest(): QueryGetSchedulerRequest {
  return { sequencerAddress: "" };
}

export const QueryGetSchedulerRequest = {
  encode(message: QueryGetSchedulerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequencerAddress !== "") {
      writer.uint32(10).string(message.sequencerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSchedulerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSchedulerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetSchedulerRequest {
    return { sequencerAddress: isSet(object.sequencerAddress) ? globalThis.String(object.sequencerAddress) : "" };
  },

  toJSON(message: QueryGetSchedulerRequest): unknown {
    const obj: any = {};
    if (message.sequencerAddress !== "") {
      obj.sequencerAddress = message.sequencerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetSchedulerRequest>, I>>(base?: I): QueryGetSchedulerRequest {
    return QueryGetSchedulerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetSchedulerRequest>, I>>(object: I): QueryGetSchedulerRequest {
    const message = createBaseQueryGetSchedulerRequest();
    message.sequencerAddress = object.sequencerAddress ?? "";
    return message;
  },
};

function createBaseQueryGetSchedulerResponse(): QueryGetSchedulerResponse {
  return { scheduler: undefined };
}

export const QueryGetSchedulerResponse = {
  encode(message: QueryGetSchedulerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scheduler !== undefined) {
      Scheduler.encode(message.scheduler, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSchedulerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSchedulerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scheduler = Scheduler.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGetSchedulerResponse {
    return { scheduler: isSet(object.scheduler) ? Scheduler.fromJSON(object.scheduler) : undefined };
  },

  toJSON(message: QueryGetSchedulerResponse): unknown {
    const obj: any = {};
    if (message.scheduler !== undefined) {
      obj.scheduler = Scheduler.toJSON(message.scheduler);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGetSchedulerResponse>, I>>(base?: I): QueryGetSchedulerResponse {
    return QueryGetSchedulerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGetSchedulerResponse>, I>>(object: I): QueryGetSchedulerResponse {
    const message = createBaseQueryGetSchedulerResponse();
    message.scheduler = (object.scheduler !== undefined && object.scheduler !== null)
      ? Scheduler.fromPartial(object.scheduler)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSchedulerRequest(): QueryAllSchedulerRequest {
  return { pagination: undefined };
}

export const QueryAllSchedulerRequest = {
  encode(message: QueryAllSchedulerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSchedulerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSchedulerRequest();
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

  fromJSON(object: any): QueryAllSchedulerRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllSchedulerRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllSchedulerRequest>, I>>(base?: I): QueryAllSchedulerRequest {
    return QueryAllSchedulerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllSchedulerRequest>, I>>(object: I): QueryAllSchedulerRequest {
    const message = createBaseQueryAllSchedulerRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSchedulerResponse(): QueryAllSchedulerResponse {
  return { scheduler: [], pagination: undefined };
}

export const QueryAllSchedulerResponse = {
  encode(message: QueryAllSchedulerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.scheduler) {
      Scheduler.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSchedulerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSchedulerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scheduler.push(Scheduler.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllSchedulerResponse {
    return {
      scheduler: globalThis.Array.isArray(object?.scheduler)
        ? object.scheduler.map((e: any) => Scheduler.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllSchedulerResponse): unknown {
    const obj: any = {};
    if (message.scheduler?.length) {
      obj.scheduler = message.scheduler.map((e) => Scheduler.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllSchedulerResponse>, I>>(base?: I): QueryAllSchedulerResponse {
    return QueryAllSchedulerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllSchedulerResponse>, I>>(object: I): QueryAllSchedulerResponse {
    const message = createBaseQueryAllSchedulerResponse();
    message.scheduler = object.scheduler?.map((e) => Scheduler.fromPartial(e)) || [];
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
  /** Queries a Sequencer by index. */
  Sequencer(request: QueryGetSequencerRequest): Promise<QueryGetSequencerResponse>;
  /** Queries a list of Sequencer items. */
  SequencerAll(request: QueryAllSequencerRequest): Promise<QueryAllSequencerResponse>;
  /** Queries a SequencersByRollapp by index. */
  SequencersByRollapp(request: QueryGetSequencersByRollappRequest): Promise<QueryGetSequencersByRollappResponse>;
  /** Queries a list of SequencersByRollapp items. */
  SequencersByRollappAll(request: QueryAllSequencersByRollappRequest): Promise<QueryAllSequencersByRollappResponse>;
  /** Queries a Scheduler by index. */
  Scheduler(request: QueryGetSchedulerRequest): Promise<QueryGetSchedulerResponse>;
  /** Queries a list of Scheduler items. */
  SchedulerAll(request: QueryAllSchedulerRequest): Promise<QueryAllSchedulerResponse>;
}

export const QueryServiceName = "dymensionxyz.dymension.sequencer.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Sequencer = this.Sequencer.bind(this);
    this.SequencerAll = this.SequencerAll.bind(this);
    this.SequencersByRollapp = this.SequencersByRollapp.bind(this);
    this.SequencersByRollappAll = this.SequencersByRollappAll.bind(this);
    this.Scheduler = this.Scheduler.bind(this);
    this.SchedulerAll = this.SchedulerAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  Sequencer(request: QueryGetSequencerRequest): Promise<QueryGetSequencerResponse> {
    const data = QueryGetSequencerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Sequencer", data);
    return promise.then((data) => QueryGetSequencerResponse.decode(_m0.Reader.create(data)));
  }

  SequencerAll(request: QueryAllSequencerRequest): Promise<QueryAllSequencerResponse> {
    const data = QueryAllSequencerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SequencerAll", data);
    return promise.then((data) => QueryAllSequencerResponse.decode(_m0.Reader.create(data)));
  }

  SequencersByRollapp(request: QueryGetSequencersByRollappRequest): Promise<QueryGetSequencersByRollappResponse> {
    const data = QueryGetSequencersByRollappRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SequencersByRollapp", data);
    return promise.then((data) => QueryGetSequencersByRollappResponse.decode(_m0.Reader.create(data)));
  }

  SequencersByRollappAll(request: QueryAllSequencersByRollappRequest): Promise<QueryAllSequencersByRollappResponse> {
    const data = QueryAllSequencersByRollappRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SequencersByRollappAll", data);
    return promise.then((data) => QueryAllSequencersByRollappResponse.decode(_m0.Reader.create(data)));
  }

  Scheduler(request: QueryGetSchedulerRequest): Promise<QueryGetSchedulerResponse> {
    const data = QueryGetSchedulerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Scheduler", data);
    return promise.then((data) => QueryGetSchedulerResponse.decode(_m0.Reader.create(data)));
  }

  SchedulerAll(request: QueryAllSchedulerRequest): Promise<QueryAllSchedulerResponse> {
    const data = QueryAllSchedulerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SchedulerAll", data);
    return promise.then((data) => QueryAllSchedulerResponse.decode(_m0.Reader.create(data)));
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
