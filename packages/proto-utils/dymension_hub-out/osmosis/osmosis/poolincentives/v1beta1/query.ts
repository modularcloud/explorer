/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Gauge } from "../../incentives/gauge";
import { DistrInfo, Params } from "./incentives";

export const protobufPackage = "osmosis.poolincentives.v1beta1";

export interface QueryGaugeIdsRequest {
  poolId: Long;
}

export interface QueryGaugeIdsResponse {
  gaugeIdsWithDuration: QueryGaugeIdsResponse_GaugeIdWithDuration[];
}

export interface QueryGaugeIdsResponse_GaugeIdWithDuration {
  gaugeId: Long;
  duration: Duration | undefined;
  gaugeIncentivePercentage: string;
}

export interface QueryDistrInfoRequest {
}

export interface QueryDistrInfoResponse {
  distrInfo: DistrInfo | undefined;
}

export interface QueryParamsRequest {
}

export interface QueryParamsResponse {
  params: Params | undefined;
}

export interface QueryLockableDurationsRequest {
}

export interface QueryLockableDurationsResponse {
  lockableDurations: Duration[];
}

export interface QueryIncentivizedPoolsRequest {
}

export interface IncentivizedPool {
  poolId: Long;
  lockableDuration: Duration | undefined;
  gaugeId: Long;
}

export interface QueryIncentivizedPoolsResponse {
  incentivizedPools: IncentivizedPool[];
}

export interface QueryExternalIncentiveGaugesRequest {
}

export interface QueryExternalIncentiveGaugesResponse {
  data: Gauge[];
}

function createBaseQueryGaugeIdsRequest(): QueryGaugeIdsRequest {
  return { poolId: Long.UZERO };
}

export const QueryGaugeIdsRequest = {
  encode(message: QueryGaugeIdsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGaugeIdsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGaugeIdsRequest();
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

  fromJSON(object: any): QueryGaugeIdsRequest {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: QueryGaugeIdsRequest): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGaugeIdsRequest>, I>>(base?: I): QueryGaugeIdsRequest {
    return QueryGaugeIdsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGaugeIdsRequest>, I>>(object: I): QueryGaugeIdsRequest {
    const message = createBaseQueryGaugeIdsRequest();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryGaugeIdsResponse(): QueryGaugeIdsResponse {
  return { gaugeIdsWithDuration: [] };
}

export const QueryGaugeIdsResponse = {
  encode(message: QueryGaugeIdsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.gaugeIdsWithDuration) {
      QueryGaugeIdsResponse_GaugeIdWithDuration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGaugeIdsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGaugeIdsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.gaugeIdsWithDuration.push(QueryGaugeIdsResponse_GaugeIdWithDuration.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGaugeIdsResponse {
    return {
      gaugeIdsWithDuration: globalThis.Array.isArray(object?.gaugeIdsWithDuration)
        ? object.gaugeIdsWithDuration.map((e: any) => QueryGaugeIdsResponse_GaugeIdWithDuration.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGaugeIdsResponse): unknown {
    const obj: any = {};
    if (message.gaugeIdsWithDuration?.length) {
      obj.gaugeIdsWithDuration = message.gaugeIdsWithDuration.map((e) =>
        QueryGaugeIdsResponse_GaugeIdWithDuration.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGaugeIdsResponse>, I>>(base?: I): QueryGaugeIdsResponse {
    return QueryGaugeIdsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGaugeIdsResponse>, I>>(object: I): QueryGaugeIdsResponse {
    const message = createBaseQueryGaugeIdsResponse();
    message.gaugeIdsWithDuration =
      object.gaugeIdsWithDuration?.map((e) => QueryGaugeIdsResponse_GaugeIdWithDuration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryGaugeIdsResponse_GaugeIdWithDuration(): QueryGaugeIdsResponse_GaugeIdWithDuration {
  return { gaugeId: Long.UZERO, duration: undefined, gaugeIncentivePercentage: "" };
}

export const QueryGaugeIdsResponse_GaugeIdWithDuration = {
  encode(message: QueryGaugeIdsResponse_GaugeIdWithDuration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.gaugeId.isZero()) {
      writer.uint32(8).uint64(message.gaugeId);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim();
    }
    if (message.gaugeIncentivePercentage !== "") {
      writer.uint32(26).string(message.gaugeIncentivePercentage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGaugeIdsResponse_GaugeIdWithDuration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGaugeIdsResponse_GaugeIdWithDuration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.gaugeId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.duration = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.gaugeIncentivePercentage = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGaugeIdsResponse_GaugeIdWithDuration {
    return {
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      gaugeIncentivePercentage: isSet(object.gaugeIncentivePercentage)
        ? globalThis.String(object.gaugeIncentivePercentage)
        : "",
    };
  },

  toJSON(message: QueryGaugeIdsResponse_GaugeIdWithDuration): unknown {
    const obj: any = {};
    if (!message.gaugeId.isZero()) {
      obj.gaugeId = (message.gaugeId || Long.UZERO).toString();
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    if (message.gaugeIncentivePercentage !== "") {
      obj.gaugeIncentivePercentage = message.gaugeIncentivePercentage;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGaugeIdsResponse_GaugeIdWithDuration>, I>>(
    base?: I,
  ): QueryGaugeIdsResponse_GaugeIdWithDuration {
    return QueryGaugeIdsResponse_GaugeIdWithDuration.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGaugeIdsResponse_GaugeIdWithDuration>, I>>(
    object: I,
  ): QueryGaugeIdsResponse_GaugeIdWithDuration {
    const message = createBaseQueryGaugeIdsResponse_GaugeIdWithDuration();
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    message.gaugeIncentivePercentage = object.gaugeIncentivePercentage ?? "";
    return message;
  },
};

function createBaseQueryDistrInfoRequest(): QueryDistrInfoRequest {
  return {};
}

export const QueryDistrInfoRequest = {
  encode(_: QueryDistrInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDistrInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDistrInfoRequest();
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

  fromJSON(_: any): QueryDistrInfoRequest {
    return {};
  },

  toJSON(_: QueryDistrInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDistrInfoRequest>, I>>(base?: I): QueryDistrInfoRequest {
    return QueryDistrInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDistrInfoRequest>, I>>(_: I): QueryDistrInfoRequest {
    const message = createBaseQueryDistrInfoRequest();
    return message;
  },
};

function createBaseQueryDistrInfoResponse(): QueryDistrInfoResponse {
  return { distrInfo: undefined };
}

export const QueryDistrInfoResponse = {
  encode(message: QueryDistrInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.distrInfo !== undefined) {
      DistrInfo.encode(message.distrInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDistrInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDistrInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.distrInfo = DistrInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDistrInfoResponse {
    return { distrInfo: isSet(object.distrInfo) ? DistrInfo.fromJSON(object.distrInfo) : undefined };
  },

  toJSON(message: QueryDistrInfoResponse): unknown {
    const obj: any = {};
    if (message.distrInfo !== undefined) {
      obj.distrInfo = DistrInfo.toJSON(message.distrInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDistrInfoResponse>, I>>(base?: I): QueryDistrInfoResponse {
    return QueryDistrInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDistrInfoResponse>, I>>(object: I): QueryDistrInfoResponse {
    const message = createBaseQueryDistrInfoResponse();
    message.distrInfo = (object.distrInfo !== undefined && object.distrInfo !== null)
      ? DistrInfo.fromPartial(object.distrInfo)
      : undefined;
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

function createBaseQueryLockableDurationsRequest(): QueryLockableDurationsRequest {
  return {};
}

export const QueryLockableDurationsRequest = {
  encode(_: QueryLockableDurationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLockableDurationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLockableDurationsRequest();
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

  fromJSON(_: any): QueryLockableDurationsRequest {
    return {};
  },

  toJSON(_: QueryLockableDurationsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLockableDurationsRequest>, I>>(base?: I): QueryLockableDurationsRequest {
    return QueryLockableDurationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLockableDurationsRequest>, I>>(_: I): QueryLockableDurationsRequest {
    const message = createBaseQueryLockableDurationsRequest();
    return message;
  },
};

function createBaseQueryLockableDurationsResponse(): QueryLockableDurationsResponse {
  return { lockableDurations: [] };
}

export const QueryLockableDurationsResponse = {
  encode(message: QueryLockableDurationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.lockableDurations) {
      Duration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLockableDurationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLockableDurationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lockableDurations.push(Duration.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryLockableDurationsResponse {
    return {
      lockableDurations: globalThis.Array.isArray(object?.lockableDurations)
        ? object.lockableDurations.map((e: any) => Duration.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryLockableDurationsResponse): unknown {
    const obj: any = {};
    if (message.lockableDurations?.length) {
      obj.lockableDurations = message.lockableDurations.map((e) => Duration.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLockableDurationsResponse>, I>>(base?: I): QueryLockableDurationsResponse {
    return QueryLockableDurationsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLockableDurationsResponse>, I>>(
    object: I,
  ): QueryLockableDurationsResponse {
    const message = createBaseQueryLockableDurationsResponse();
    message.lockableDurations = object.lockableDurations?.map((e) => Duration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryIncentivizedPoolsRequest(): QueryIncentivizedPoolsRequest {
  return {};
}

export const QueryIncentivizedPoolsRequest = {
  encode(_: QueryIncentivizedPoolsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPoolsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPoolsRequest();
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

  fromJSON(_: any): QueryIncentivizedPoolsRequest {
    return {};
  },

  toJSON(_: QueryIncentivizedPoolsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIncentivizedPoolsRequest>, I>>(base?: I): QueryIncentivizedPoolsRequest {
    return QueryIncentivizedPoolsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIncentivizedPoolsRequest>, I>>(_: I): QueryIncentivizedPoolsRequest {
    const message = createBaseQueryIncentivizedPoolsRequest();
    return message;
  },
};

function createBaseIncentivizedPool(): IncentivizedPool {
  return { poolId: Long.UZERO, lockableDuration: undefined, gaugeId: Long.UZERO };
}

export const IncentivizedPool = {
  encode(message: IncentivizedPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.lockableDuration !== undefined) {
      Duration.encode(message.lockableDuration, writer.uint32(18).fork()).ldelim();
    }
    if (!message.gaugeId.isZero()) {
      writer.uint32(24).uint64(message.gaugeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IncentivizedPool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentivizedPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lockableDuration = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.gaugeId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IncentivizedPool {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      lockableDuration: isSet(object.lockableDuration) ? Duration.fromJSON(object.lockableDuration) : undefined,
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
    };
  },

  toJSON(message: IncentivizedPool): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.lockableDuration !== undefined) {
      obj.lockableDuration = Duration.toJSON(message.lockableDuration);
    }
    if (!message.gaugeId.isZero()) {
      obj.gaugeId = (message.gaugeId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<IncentivizedPool>, I>>(base?: I): IncentivizedPool {
    return IncentivizedPool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<IncentivizedPool>, I>>(object: I): IncentivizedPool {
    const message = createBaseIncentivizedPool();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.lockableDuration = (object.lockableDuration !== undefined && object.lockableDuration !== null)
      ? Duration.fromPartial(object.lockableDuration)
      : undefined;
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryIncentivizedPoolsResponse(): QueryIncentivizedPoolsResponse {
  return { incentivizedPools: [] };
}

export const QueryIncentivizedPoolsResponse = {
  encode(message: QueryIncentivizedPoolsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.incentivizedPools) {
      IncentivizedPool.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPoolsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.incentivizedPools.push(IncentivizedPool.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryIncentivizedPoolsResponse {
    return {
      incentivizedPools: globalThis.Array.isArray(object?.incentivizedPools)
        ? object.incentivizedPools.map((e: any) => IncentivizedPool.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryIncentivizedPoolsResponse): unknown {
    const obj: any = {};
    if (message.incentivizedPools?.length) {
      obj.incentivizedPools = message.incentivizedPools.map((e) => IncentivizedPool.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryIncentivizedPoolsResponse>, I>>(base?: I): QueryIncentivizedPoolsResponse {
    return QueryIncentivizedPoolsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryIncentivizedPoolsResponse>, I>>(
    object: I,
  ): QueryIncentivizedPoolsResponse {
    const message = createBaseQueryIncentivizedPoolsResponse();
    message.incentivizedPools = object.incentivizedPools?.map((e) => IncentivizedPool.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryExternalIncentiveGaugesRequest(): QueryExternalIncentiveGaugesRequest {
  return {};
}

export const QueryExternalIncentiveGaugesRequest = {
  encode(_: QueryExternalIncentiveGaugesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryExternalIncentiveGaugesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExternalIncentiveGaugesRequest();
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

  fromJSON(_: any): QueryExternalIncentiveGaugesRequest {
    return {};
  },

  toJSON(_: QueryExternalIncentiveGaugesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryExternalIncentiveGaugesRequest>, I>>(
    base?: I,
  ): QueryExternalIncentiveGaugesRequest {
    return QueryExternalIncentiveGaugesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryExternalIncentiveGaugesRequest>, I>>(
    _: I,
  ): QueryExternalIncentiveGaugesRequest {
    const message = createBaseQueryExternalIncentiveGaugesRequest();
    return message;
  },
};

function createBaseQueryExternalIncentiveGaugesResponse(): QueryExternalIncentiveGaugesResponse {
  return { data: [] };
}

export const QueryExternalIncentiveGaugesResponse = {
  encode(message: QueryExternalIncentiveGaugesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryExternalIncentiveGaugesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExternalIncentiveGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(Gauge.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryExternalIncentiveGaugesResponse {
    return { data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromJSON(e)) : [] };
  },

  toJSON(message: QueryExternalIncentiveGaugesResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => Gauge.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryExternalIncentiveGaugesResponse>, I>>(
    base?: I,
  ): QueryExternalIncentiveGaugesResponse {
    return QueryExternalIncentiveGaugesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryExternalIncentiveGaugesResponse>, I>>(
    object: I,
  ): QueryExternalIncentiveGaugesResponse {
    const message = createBaseQueryExternalIncentiveGaugesResponse();
    message.data = object.data?.map((e) => Gauge.fromPartial(e)) || [];
    return message;
  },
};

export interface Query {
  /** GaugeIds takes the pool id and returns the matching gauge ids and durations */
  GaugeIds(request: QueryGaugeIdsRequest): Promise<QueryGaugeIdsResponse>;
  /** DistrInfo returns the pool's matching gauge ids and weights. */
  DistrInfo(request: QueryDistrInfoRequest): Promise<QueryDistrInfoResponse>;
  /** Params returns pool incentives params. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** LockableDurations returns lock durations for pools. */
  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>;
  /** IncentivizedPools returns currently incentivized pools */
  IncentivizedPools(request: QueryIncentivizedPoolsRequest): Promise<QueryIncentivizedPoolsResponse>;
  /** ExternalIncentiveGauges returns external incentive gauges. */
  ExternalIncentiveGauges(request: QueryExternalIncentiveGaugesRequest): Promise<QueryExternalIncentiveGaugesResponse>;
}

export const QueryServiceName = "osmosis.poolincentives.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.GaugeIds = this.GaugeIds.bind(this);
    this.DistrInfo = this.DistrInfo.bind(this);
    this.Params = this.Params.bind(this);
    this.LockableDurations = this.LockableDurations.bind(this);
    this.IncentivizedPools = this.IncentivizedPools.bind(this);
    this.ExternalIncentiveGauges = this.ExternalIncentiveGauges.bind(this);
  }
  GaugeIds(request: QueryGaugeIdsRequest): Promise<QueryGaugeIdsResponse> {
    const data = QueryGaugeIdsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GaugeIds", data);
    return promise.then((data) => QueryGaugeIdsResponse.decode(_m0.Reader.create(data)));
  }

  DistrInfo(request: QueryDistrInfoRequest): Promise<QueryDistrInfoResponse> {
    const data = QueryDistrInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DistrInfo", data);
    return promise.then((data) => QueryDistrInfoResponse.decode(_m0.Reader.create(data)));
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse> {
    const data = QueryLockableDurationsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "LockableDurations", data);
    return promise.then((data) => QueryLockableDurationsResponse.decode(_m0.Reader.create(data)));
  }

  IncentivizedPools(request: QueryIncentivizedPoolsRequest): Promise<QueryIncentivizedPoolsResponse> {
    const data = QueryIncentivizedPoolsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "IncentivizedPools", data);
    return promise.then((data) => QueryIncentivizedPoolsResponse.decode(_m0.Reader.create(data)));
  }

  ExternalIncentiveGauges(request: QueryExternalIncentiveGaugesRequest): Promise<QueryExternalIncentiveGaugesResponse> {
    const data = QueryExternalIncentiveGaugesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExternalIncentiveGauges", data);
    return promise.then((data) => QueryExternalIncentiveGaugesResponse.decode(_m0.Reader.create(data)));
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
