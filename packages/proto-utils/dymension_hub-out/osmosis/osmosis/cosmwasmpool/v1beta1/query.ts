/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../google/protobuf/any";
import { Params } from "./params";

export const protobufPackage = "osmosis.cosmwasmpool.v1beta1";

/** =============================== ContractInfoByPoolId */
export interface ParamsRequest {
}

export interface ParamsResponse {
  params: Params | undefined;
}

/** =============================== Pools */
export interface PoolsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

export interface PoolsResponse {
  pools: Any[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** =============================== ContractInfoByPoolId */
export interface ContractInfoByPoolIdRequest {
  /** pool_id is the pool id of the requested pool. */
  poolId: Long;
}

export interface ContractInfoByPoolIdResponse {
  /**
   * contract_address is the pool address and contract address
   * of the requested pool id.
   */
  contractAddress: string;
  /** code_id is the code id of the requested pool id. */
  codeId: Long;
}

function createBaseParamsRequest(): ParamsRequest {
  return {};
}

export const ParamsRequest = {
  encode(_: ParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
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

  fromJSON(_: any): ParamsRequest {
    return {};
  },

  toJSON(_: ParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsRequest>, I>>(base?: I): ParamsRequest {
    return ParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ParamsRequest>, I>>(_: I): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
};

function createBaseParamsResponse(): ParamsResponse {
  return { params: undefined };
}

export const ParamsResponse = {
  encode(message: ParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
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

  fromJSON(object: any): ParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: ParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsResponse>, I>>(base?: I): ParamsResponse {
    return ParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ParamsResponse>, I>>(object: I): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBasePoolsRequest(): PoolsRequest {
  return { pagination: undefined };
}

export const PoolsRequest = {
  encode(message: PoolsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): PoolsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: PoolsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolsRequest>, I>>(base?: I): PoolsRequest {
    return PoolsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolsRequest>, I>>(object: I): PoolsRequest {
    const message = createBasePoolsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBasePoolsResponse(): PoolsResponse {
  return { pools: [], pagination: undefined };
}

export const PoolsResponse = {
  encode(message: PoolsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pools) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pools.push(Any.decode(reader, reader.uint32()));
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

  fromJSON(object: any): PoolsResponse {
    return {
      pools: globalThis.Array.isArray(object?.pools) ? object.pools.map((e: any) => Any.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: PoolsResponse): unknown {
    const obj: any = {};
    if (message.pools?.length) {
      obj.pools = message.pools.map((e) => Any.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolsResponse>, I>>(base?: I): PoolsResponse {
    return PoolsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolsResponse>, I>>(object: I): PoolsResponse {
    const message = createBasePoolsResponse();
    message.pools = object.pools?.map((e) => Any.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseContractInfoByPoolIdRequest(): ContractInfoByPoolIdRequest {
  return { poolId: Long.UZERO };
}

export const ContractInfoByPoolIdRequest = {
  encode(message: ContractInfoByPoolIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractInfoByPoolIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractInfoByPoolIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContractInfoByPoolIdRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: ContractInfoByPoolIdRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ContractInfoByPoolIdRequest>, I>>(base?: I): ContractInfoByPoolIdRequest {
    return ContractInfoByPoolIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ContractInfoByPoolIdRequest>, I>>(object: I): ContractInfoByPoolIdRequest {
    const message = createBaseContractInfoByPoolIdRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseContractInfoByPoolIdResponse(): ContractInfoByPoolIdResponse {
  return { contractAddress: "", codeId: Long.UZERO };
}

export const ContractInfoByPoolIdResponse = {
  encode(message: ContractInfoByPoolIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (!message.codeId.isZero()) {
      writer.uint32(16).uint64(message.codeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractInfoByPoolIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractInfoByPoolIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.contractAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.codeId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ContractInfoByPoolIdResponse {
    return {
      contractAddress: isSet(object.contractAddress) ? globalThis.String(object.contractAddress) : "",
      codeId: isSet(object.codeId) ? Long.fromValue(object.codeId) : Long.UZERO,
    };
  },

  toJSON(message: ContractInfoByPoolIdResponse): unknown {
    const obj: any = {};
    if (message.contractAddress !== "") {
      obj.contractAddress = message.contractAddress;
    }
    if (!message.codeId.isZero()) {
      obj.codeId = (message.codeId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ContractInfoByPoolIdResponse>, I>>(base?: I): ContractInfoByPoolIdResponse {
    return ContractInfoByPoolIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ContractInfoByPoolIdResponse>, I>>(object: I): ContractInfoByPoolIdResponse {
    const message = createBaseContractInfoByPoolIdResponse();
    message.contractAddress = object.contractAddress ?? "";
    message.codeId = (object.codeId !== undefined && object.codeId !== null)
      ? Long.fromValue(object.codeId)
      : Long.UZERO;
    return message;
  },
};

export interface Query {
  /** Pools returns all cosmwasm pools */
  Pools(request: PoolsRequest): Promise<PoolsResponse>;
  /** Params returns the parameters of the x/cosmwasmpool module. */
  Params(request: ParamsRequest): Promise<ParamsResponse>;
  ContractInfoByPoolId(request: ContractInfoByPoolIdRequest): Promise<ContractInfoByPoolIdResponse>;
}

export const QueryServiceName = "osmosis.cosmwasmpool.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Pools = this.Pools.bind(this);
    this.Params = this.Params.bind(this);
    this.ContractInfoByPoolId = this.ContractInfoByPoolId.bind(this);
  }
  Pools(request: PoolsRequest): Promise<PoolsResponse> {
    const data = PoolsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Pools", data);
    return promise.then((data) => PoolsResponse.decode(_m0.Reader.create(data)));
  }

  Params(request: ParamsRequest): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => ParamsResponse.decode(_m0.Reader.create(data)));
  }

  ContractInfoByPoolId(request: ContractInfoByPoolIdRequest): Promise<ContractInfoByPoolIdResponse> {
    const data = ContractInfoByPoolIdRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ContractInfoByPoolId", data);
    return promise.then((data) => ContractInfoByPoolIdResponse.decode(_m0.Reader.create(data)));
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
