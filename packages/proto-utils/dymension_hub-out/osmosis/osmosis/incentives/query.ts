/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Duration } from "../../google/protobuf/duration";
import { Gauge } from "./gauge";
import { Group, GroupsWithGauge } from "./group";

export const protobufPackage = "osmosis.incentives";

export interface ModuleToDistributeCoinsRequest {
}

export interface ModuleToDistributeCoinsResponse {
  /** Coins that have yet to be distributed */
  coins: Coin[];
}

export interface GaugeByIDRequest {
  /** Gague ID being queried */
  id: Long;
}

export interface GaugeByIDResponse {
  /** Gauge that corresponds to provided gague ID */
  gauge: Gauge | undefined;
}

export interface GaugesRequest {
  /** Pagination defines pagination for the request */
  pagination: PageRequest | undefined;
}

export interface GaugesResponse {
  /** Upcoming and active gauges */
  data: Gauge[];
  /** Pagination defines pagination for the response */
  pagination: PageResponse | undefined;
}

export interface ActiveGaugesRequest {
  /** Pagination defines pagination for the request */
  pagination: PageRequest | undefined;
}

export interface ActiveGaugesResponse {
  /** Active gagues only */
  data: Gauge[];
  /** Pagination defines pagination for the response */
  pagination: PageResponse | undefined;
}

export interface ActiveGaugesPerDenomRequest {
  /** Desired denom when querying active gagues */
  denom: string;
  /** Pagination defines pagination for the request */
  pagination: PageRequest | undefined;
}

export interface ActiveGaugesPerDenomResponse {
  /** Active gagues that match denom in query */
  data: Gauge[];
  /** Pagination defines pagination for the response */
  pagination: PageResponse | undefined;
}

export interface UpcomingGaugesRequest {
  /** Pagination defines pagination for the request */
  pagination: PageRequest | undefined;
}

export interface UpcomingGaugesResponse {
  /** Gauges whose distribution is upcoming */
  data: Gauge[];
  /** Pagination defines pagination for the response */
  pagination: PageResponse | undefined;
}

export interface UpcomingGaugesPerDenomRequest {
  /** Filter for upcoming gagues that match specific denom */
  denom: string;
  /** Pagination defines pagination for the request */
  pagination: PageRequest | undefined;
}

export interface UpcomingGaugesPerDenomResponse {
  /** Upcoming gagues that match denom in query */
  upcomingGauges: Gauge[];
  /** Pagination defines pagination for the response */
  pagination: PageResponse | undefined;
}

export interface RewardsEstRequest {
  /** Address that is being queried for future estimated rewards */
  owner: string;
  /** Lock IDs included in future reward estimation */
  lockIds: Long[];
  /**
   * Upper time limit of reward estimation
   * Lower limit is current epoch
   */
  endEpoch: Long;
}

export interface RewardsEstResponse {
  /**
   * Estimated coin rewards that will be received at provided address
   * from specified locks between current time and end epoch
   */
  coins: Coin[];
}

export interface QueryLockableDurationsRequest {
}

export interface QueryLockableDurationsResponse {
  /** Time durations that users can lock coins for in order to receive rewards */
  lockableDurations: Duration[];
}

export interface QueryAllGroupsRequest {
}

export interface QueryAllGroupsResponse {
  groups: Group[];
}

export interface QueryAllGroupsGaugesRequest {
}

export interface QueryAllGroupsGaugesResponse {
  gauges: Gauge[];
}

export interface QueryAllGroupsWithGaugeRequest {
}

export interface QueryAllGroupsWithGaugeResponse {
  groupsWithGauge: GroupsWithGauge[];
}

export interface QueryGroupByGroupGaugeIDRequest {
  id: Long;
}

export interface QueryGroupByGroupGaugeIDResponse {
  group: Group | undefined;
}

export interface QueryCurrentWeightByGroupGaugeIDRequest {
  groupGaugeId: Long;
}

export interface QueryCurrentWeightByGroupGaugeIDResponse {
  gaugeWeight: GaugeWeight[];
}

export interface GaugeWeight {
  gaugeId: Long;
  weightRatio: string;
}

function createBaseModuleToDistributeCoinsRequest(): ModuleToDistributeCoinsRequest {
  return {};
}

export const ModuleToDistributeCoinsRequest = {
  encode(_: ModuleToDistributeCoinsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleToDistributeCoinsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleToDistributeCoinsRequest();
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

  fromJSON(_: any): ModuleToDistributeCoinsRequest {
    return {};
  },

  toJSON(_: ModuleToDistributeCoinsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ModuleToDistributeCoinsRequest>, I>>(base?: I): ModuleToDistributeCoinsRequest {
    return ModuleToDistributeCoinsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModuleToDistributeCoinsRequest>, I>>(_: I): ModuleToDistributeCoinsRequest {
    const message = createBaseModuleToDistributeCoinsRequest();
    return message;
  },
};

function createBaseModuleToDistributeCoinsResponse(): ModuleToDistributeCoinsResponse {
  return { coins: [] };
}

export const ModuleToDistributeCoinsResponse = {
  encode(message: ModuleToDistributeCoinsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleToDistributeCoinsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleToDistributeCoinsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModuleToDistributeCoinsResponse {
    return { coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: ModuleToDistributeCoinsResponse): unknown {
    const obj: any = {};
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ModuleToDistributeCoinsResponse>, I>>(base?: I): ModuleToDistributeCoinsResponse {
    return ModuleToDistributeCoinsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ModuleToDistributeCoinsResponse>, I>>(
    object: I,
  ): ModuleToDistributeCoinsResponse {
    const message = createBaseModuleToDistributeCoinsResponse();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGaugeByIDRequest(): GaugeByIDRequest {
  return { id: Long.UZERO };
}

export const GaugeByIDRequest = {
  encode(message: GaugeByIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GaugeByIDRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugeByIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GaugeByIDRequest {
    return { id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO };
  },

  toJSON(message: GaugeByIDRequest): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GaugeByIDRequest>, I>>(base?: I): GaugeByIDRequest {
    return GaugeByIDRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GaugeByIDRequest>, I>>(object: I): GaugeByIDRequest {
    const message = createBaseGaugeByIDRequest();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseGaugeByIDResponse(): GaugeByIDResponse {
  return { gauge: undefined };
}

export const GaugeByIDResponse = {
  encode(message: GaugeByIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gauge !== undefined) {
      Gauge.encode(message.gauge, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GaugeByIDResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugeByIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.gauge = Gauge.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GaugeByIDResponse {
    return { gauge: isSet(object.gauge) ? Gauge.fromJSON(object.gauge) : undefined };
  },

  toJSON(message: GaugeByIDResponse): unknown {
    const obj: any = {};
    if (message.gauge !== undefined) {
      obj.gauge = Gauge.toJSON(message.gauge);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GaugeByIDResponse>, I>>(base?: I): GaugeByIDResponse {
    return GaugeByIDResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GaugeByIDResponse>, I>>(object: I): GaugeByIDResponse {
    const message = createBaseGaugeByIDResponse();
    message.gauge = (object.gauge !== undefined && object.gauge !== null) ? Gauge.fromPartial(object.gauge) : undefined;
    return message;
  },
};

function createBaseGaugesRequest(): GaugesRequest {
  return { pagination: undefined };
}

export const GaugesRequest = {
  encode(message: GaugesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GaugesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugesRequest();
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

  fromJSON(object: any): GaugesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: GaugesRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GaugesRequest>, I>>(base?: I): GaugesRequest {
    return GaugesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GaugesRequest>, I>>(object: I): GaugesRequest {
    const message = createBaseGaugesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseGaugesResponse(): GaugesResponse {
  return { data: [], pagination: undefined };
}

export const GaugesResponse = {
  encode(message: GaugesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GaugesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(Gauge.decode(reader, reader.uint32()));
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

  fromJSON(object: any): GaugesResponse {
    return {
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: GaugesResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => Gauge.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GaugesResponse>, I>>(base?: I): GaugesResponse {
    return GaugesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GaugesResponse>, I>>(object: I): GaugesResponse {
    const message = createBaseGaugesResponse();
    message.data = object.data?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveGaugesRequest(): ActiveGaugesRequest {
  return { pagination: undefined };
}

export const ActiveGaugesRequest = {
  encode(message: ActiveGaugesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveGaugesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesRequest();
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

  fromJSON(object: any): ActiveGaugesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: ActiveGaugesRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveGaugesRequest>, I>>(base?: I): ActiveGaugesRequest {
    return ActiveGaugesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActiveGaugesRequest>, I>>(object: I): ActiveGaugesRequest {
    const message = createBaseActiveGaugesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveGaugesResponse(): ActiveGaugesResponse {
  return { data: [], pagination: undefined };
}

export const ActiveGaugesResponse = {
  encode(message: ActiveGaugesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveGaugesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(Gauge.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ActiveGaugesResponse {
    return {
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: ActiveGaugesResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => Gauge.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveGaugesResponse>, I>>(base?: I): ActiveGaugesResponse {
    return ActiveGaugesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActiveGaugesResponse>, I>>(object: I): ActiveGaugesResponse {
    const message = createBaseActiveGaugesResponse();
    message.data = object.data?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveGaugesPerDenomRequest(): ActiveGaugesPerDenomRequest {
  return { denom: "", pagination: undefined };
}

export const ActiveGaugesPerDenomRequest = {
  encode(message: ActiveGaugesPerDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveGaugesPerDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesPerDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
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

  fromJSON(object: any): ActiveGaugesPerDenomRequest {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: ActiveGaugesPerDenomRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveGaugesPerDenomRequest>, I>>(base?: I): ActiveGaugesPerDenomRequest {
    return ActiveGaugesPerDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActiveGaugesPerDenomRequest>, I>>(object: I): ActiveGaugesPerDenomRequest {
    const message = createBaseActiveGaugesPerDenomRequest();
    message.denom = object.denom ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveGaugesPerDenomResponse(): ActiveGaugesPerDenomResponse {
  return { data: [], pagination: undefined };
}

export const ActiveGaugesPerDenomResponse = {
  encode(message: ActiveGaugesPerDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveGaugesPerDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesPerDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(Gauge.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ActiveGaugesPerDenomResponse {
    return {
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: ActiveGaugesPerDenomResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => Gauge.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveGaugesPerDenomResponse>, I>>(base?: I): ActiveGaugesPerDenomResponse {
    return ActiveGaugesPerDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActiveGaugesPerDenomResponse>, I>>(object: I): ActiveGaugesPerDenomResponse {
    const message = createBaseActiveGaugesPerDenomResponse();
    message.data = object.data?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingGaugesRequest(): UpcomingGaugesRequest {
  return { pagination: undefined };
}

export const UpcomingGaugesRequest = {
  encode(message: UpcomingGaugesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingGaugesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesRequest();
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

  fromJSON(object: any): UpcomingGaugesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: UpcomingGaugesRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpcomingGaugesRequest>, I>>(base?: I): UpcomingGaugesRequest {
    return UpcomingGaugesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpcomingGaugesRequest>, I>>(object: I): UpcomingGaugesRequest {
    const message = createBaseUpcomingGaugesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingGaugesResponse(): UpcomingGaugesResponse {
  return { data: [], pagination: undefined };
}

export const UpcomingGaugesResponse = {
  encode(message: UpcomingGaugesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingGaugesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(Gauge.decode(reader, reader.uint32()));
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

  fromJSON(object: any): UpcomingGaugesResponse {
    return {
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: UpcomingGaugesResponse): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => Gauge.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpcomingGaugesResponse>, I>>(base?: I): UpcomingGaugesResponse {
    return UpcomingGaugesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpcomingGaugesResponse>, I>>(object: I): UpcomingGaugesResponse {
    const message = createBaseUpcomingGaugesResponse();
    message.data = object.data?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingGaugesPerDenomRequest(): UpcomingGaugesPerDenomRequest {
  return { denom: "", pagination: undefined };
}

export const UpcomingGaugesPerDenomRequest = {
  encode(message: UpcomingGaugesPerDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingGaugesPerDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesPerDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
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

  fromJSON(object: any): UpcomingGaugesPerDenomRequest {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: UpcomingGaugesPerDenomRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpcomingGaugesPerDenomRequest>, I>>(base?: I): UpcomingGaugesPerDenomRequest {
    return UpcomingGaugesPerDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpcomingGaugesPerDenomRequest>, I>>(
    object: I,
  ): UpcomingGaugesPerDenomRequest {
    const message = createBaseUpcomingGaugesPerDenomRequest();
    message.denom = object.denom ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingGaugesPerDenomResponse(): UpcomingGaugesPerDenomResponse {
  return { upcomingGauges: [], pagination: undefined };
}

export const UpcomingGaugesPerDenomResponse = {
  encode(message: UpcomingGaugesPerDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.upcomingGauges) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingGaugesPerDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesPerDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.upcomingGauges.push(Gauge.decode(reader, reader.uint32()));
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

  fromJSON(object: any): UpcomingGaugesPerDenomResponse {
    return {
      upcomingGauges: globalThis.Array.isArray(object?.upcomingGauges)
        ? object.upcomingGauges.map((e: any) => Gauge.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: UpcomingGaugesPerDenomResponse): unknown {
    const obj: any = {};
    if (message.upcomingGauges?.length) {
      obj.upcomingGauges = message.upcomingGauges.map((e) => Gauge.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpcomingGaugesPerDenomResponse>, I>>(base?: I): UpcomingGaugesPerDenomResponse {
    return UpcomingGaugesPerDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpcomingGaugesPerDenomResponse>, I>>(
    object: I,
  ): UpcomingGaugesPerDenomResponse {
    const message = createBaseUpcomingGaugesPerDenomResponse();
    message.upcomingGauges = object.upcomingGauges?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseRewardsEstRequest(): RewardsEstRequest {
  return { owner: "", lockIds: [], endEpoch: Long.ZERO };
}

export const RewardsEstRequest = {
  encode(message: RewardsEstRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    writer.uint32(18).fork();
    for (const v of message.lockIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (!message.endEpoch.isZero()) {
      writer.uint32(24).int64(message.endEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardsEstRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardsEstRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag === 16) {
            message.lockIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.lockIds.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.endEpoch = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RewardsEstRequest {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      lockIds: globalThis.Array.isArray(object?.lockIds) ? object.lockIds.map((e: any) => Long.fromValue(e)) : [],
      endEpoch: isSet(object.endEpoch) ? Long.fromValue(object.endEpoch) : Long.ZERO,
    };
  },

  toJSON(message: RewardsEstRequest): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.lockIds?.length) {
      obj.lockIds = message.lockIds.map((e) => (e || Long.UZERO).toString());
    }
    if (!message.endEpoch.isZero()) {
      obj.endEpoch = (message.endEpoch || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RewardsEstRequest>, I>>(base?: I): RewardsEstRequest {
    return RewardsEstRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RewardsEstRequest>, I>>(object: I): RewardsEstRequest {
    const message = createBaseRewardsEstRequest();
    message.owner = object.owner ?? "";
    message.lockIds = object.lockIds?.map((e) => Long.fromValue(e)) || [];
    message.endEpoch = (object.endEpoch !== undefined && object.endEpoch !== null)
      ? Long.fromValue(object.endEpoch)
      : Long.ZERO;
    return message;
  },
};

function createBaseRewardsEstResponse(): RewardsEstResponse {
  return { coins: [] };
}

export const RewardsEstResponse = {
  encode(message: RewardsEstResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardsEstResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardsEstResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RewardsEstResponse {
    return { coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: RewardsEstResponse): unknown {
    const obj: any = {};
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RewardsEstResponse>, I>>(base?: I): RewardsEstResponse {
    return RewardsEstResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RewardsEstResponse>, I>>(object: I): RewardsEstResponse {
    const message = createBaseRewardsEstResponse();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
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

function createBaseQueryAllGroupsRequest(): QueryAllGroupsRequest {
  return {};
}

export const QueryAllGroupsRequest = {
  encode(_: QueryAllGroupsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllGroupsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllGroupsRequest();
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

  fromJSON(_: any): QueryAllGroupsRequest {
    return {};
  },

  toJSON(_: QueryAllGroupsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllGroupsRequest>, I>>(base?: I): QueryAllGroupsRequest {
    return QueryAllGroupsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllGroupsRequest>, I>>(_: I): QueryAllGroupsRequest {
    const message = createBaseQueryAllGroupsRequest();
    return message;
  },
};

function createBaseQueryAllGroupsResponse(): QueryAllGroupsResponse {
  return { groups: [] };
}

export const QueryAllGroupsResponse = {
  encode(message: QueryAllGroupsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.groups) {
      Group.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllGroupsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllGroupsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groups.push(Group.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllGroupsResponse {
    return { groups: globalThis.Array.isArray(object?.groups) ? object.groups.map((e: any) => Group.fromJSON(e)) : [] };
  },

  toJSON(message: QueryAllGroupsResponse): unknown {
    const obj: any = {};
    if (message.groups?.length) {
      obj.groups = message.groups.map((e) => Group.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllGroupsResponse>, I>>(base?: I): QueryAllGroupsResponse {
    return QueryAllGroupsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllGroupsResponse>, I>>(object: I): QueryAllGroupsResponse {
    const message = createBaseQueryAllGroupsResponse();
    message.groups = object.groups?.map((e) => Group.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryAllGroupsGaugesRequest(): QueryAllGroupsGaugesRequest {
  return {};
}

export const QueryAllGroupsGaugesRequest = {
  encode(_: QueryAllGroupsGaugesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllGroupsGaugesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllGroupsGaugesRequest();
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

  fromJSON(_: any): QueryAllGroupsGaugesRequest {
    return {};
  },

  toJSON(_: QueryAllGroupsGaugesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllGroupsGaugesRequest>, I>>(base?: I): QueryAllGroupsGaugesRequest {
    return QueryAllGroupsGaugesRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllGroupsGaugesRequest>, I>>(_: I): QueryAllGroupsGaugesRequest {
    const message = createBaseQueryAllGroupsGaugesRequest();
    return message;
  },
};

function createBaseQueryAllGroupsGaugesResponse(): QueryAllGroupsGaugesResponse {
  return { gauges: [] };
}

export const QueryAllGroupsGaugesResponse = {
  encode(message: QueryAllGroupsGaugesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.gauges) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllGroupsGaugesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllGroupsGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.gauges.push(Gauge.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllGroupsGaugesResponse {
    return { gauges: globalThis.Array.isArray(object?.gauges) ? object.gauges.map((e: any) => Gauge.fromJSON(e)) : [] };
  },

  toJSON(message: QueryAllGroupsGaugesResponse): unknown {
    const obj: any = {};
    if (message.gauges?.length) {
      obj.gauges = message.gauges.map((e) => Gauge.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllGroupsGaugesResponse>, I>>(base?: I): QueryAllGroupsGaugesResponse {
    return QueryAllGroupsGaugesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllGroupsGaugesResponse>, I>>(object: I): QueryAllGroupsGaugesResponse {
    const message = createBaseQueryAllGroupsGaugesResponse();
    message.gauges = object.gauges?.map((e) => Gauge.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryAllGroupsWithGaugeRequest(): QueryAllGroupsWithGaugeRequest {
  return {};
}

export const QueryAllGroupsWithGaugeRequest = {
  encode(_: QueryAllGroupsWithGaugeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllGroupsWithGaugeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllGroupsWithGaugeRequest();
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

  fromJSON(_: any): QueryAllGroupsWithGaugeRequest {
    return {};
  },

  toJSON(_: QueryAllGroupsWithGaugeRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllGroupsWithGaugeRequest>, I>>(base?: I): QueryAllGroupsWithGaugeRequest {
    return QueryAllGroupsWithGaugeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllGroupsWithGaugeRequest>, I>>(_: I): QueryAllGroupsWithGaugeRequest {
    const message = createBaseQueryAllGroupsWithGaugeRequest();
    return message;
  },
};

function createBaseQueryAllGroupsWithGaugeResponse(): QueryAllGroupsWithGaugeResponse {
  return { groupsWithGauge: [] };
}

export const QueryAllGroupsWithGaugeResponse = {
  encode(message: QueryAllGroupsWithGaugeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.groupsWithGauge) {
      GroupsWithGauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllGroupsWithGaugeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllGroupsWithGaugeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupsWithGauge.push(GroupsWithGauge.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAllGroupsWithGaugeResponse {
    return {
      groupsWithGauge: globalThis.Array.isArray(object?.groupsWithGauge)
        ? object.groupsWithGauge.map((e: any) => GroupsWithGauge.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryAllGroupsWithGaugeResponse): unknown {
    const obj: any = {};
    if (message.groupsWithGauge?.length) {
      obj.groupsWithGauge = message.groupsWithGauge.map((e) => GroupsWithGauge.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAllGroupsWithGaugeResponse>, I>>(base?: I): QueryAllGroupsWithGaugeResponse {
    return QueryAllGroupsWithGaugeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAllGroupsWithGaugeResponse>, I>>(
    object: I,
  ): QueryAllGroupsWithGaugeResponse {
    const message = createBaseQueryAllGroupsWithGaugeResponse();
    message.groupsWithGauge = object.groupsWithGauge?.map((e) => GroupsWithGauge.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryGroupByGroupGaugeIDRequest(): QueryGroupByGroupGaugeIDRequest {
  return { id: Long.UZERO };
}

export const QueryGroupByGroupGaugeIDRequest = {
  encode(message: QueryGroupByGroupGaugeIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupByGroupGaugeIDRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupByGroupGaugeIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupByGroupGaugeIDRequest {
    return { id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO };
  },

  toJSON(message: QueryGroupByGroupGaugeIDRequest): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupByGroupGaugeIDRequest>, I>>(base?: I): QueryGroupByGroupGaugeIDRequest {
    return QueryGroupByGroupGaugeIDRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupByGroupGaugeIDRequest>, I>>(
    object: I,
  ): QueryGroupByGroupGaugeIDRequest {
    const message = createBaseQueryGroupByGroupGaugeIDRequest();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  },
};

function createBaseQueryGroupByGroupGaugeIDResponse(): QueryGroupByGroupGaugeIDResponse {
  return { group: undefined };
}

export const QueryGroupByGroupGaugeIDResponse = {
  encode(message: QueryGroupByGroupGaugeIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.group !== undefined) {
      Group.encode(message.group, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupByGroupGaugeIDResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupByGroupGaugeIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.group = Group.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupByGroupGaugeIDResponse {
    return { group: isSet(object.group) ? Group.fromJSON(object.group) : undefined };
  },

  toJSON(message: QueryGroupByGroupGaugeIDResponse): unknown {
    const obj: any = {};
    if (message.group !== undefined) {
      obj.group = Group.toJSON(message.group);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupByGroupGaugeIDResponse>, I>>(
    base?: I,
  ): QueryGroupByGroupGaugeIDResponse {
    return QueryGroupByGroupGaugeIDResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupByGroupGaugeIDResponse>, I>>(
    object: I,
  ): QueryGroupByGroupGaugeIDResponse {
    const message = createBaseQueryGroupByGroupGaugeIDResponse();
    message.group = (object.group !== undefined && object.group !== null) ? Group.fromPartial(object.group) : undefined;
    return message;
  },
};

function createBaseQueryCurrentWeightByGroupGaugeIDRequest(): QueryCurrentWeightByGroupGaugeIDRequest {
  return { groupGaugeId: Long.UZERO };
}

export const QueryCurrentWeightByGroupGaugeIDRequest = {
  encode(message: QueryCurrentWeightByGroupGaugeIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.groupGaugeId.isZero()) {
      writer.uint32(8).uint64(message.groupGaugeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrentWeightByGroupGaugeIDRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentWeightByGroupGaugeIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.groupGaugeId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCurrentWeightByGroupGaugeIDRequest {
    return { groupGaugeId: isSet(object.groupGaugeId) ? Long.fromValue(object.groupGaugeId) : Long.UZERO };
  },

  toJSON(message: QueryCurrentWeightByGroupGaugeIDRequest): unknown {
    const obj: any = {};
    if (!message.groupGaugeId.isZero()) {
      obj.groupGaugeId = (message.groupGaugeId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCurrentWeightByGroupGaugeIDRequest>, I>>(
    base?: I,
  ): QueryCurrentWeightByGroupGaugeIDRequest {
    return QueryCurrentWeightByGroupGaugeIDRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentWeightByGroupGaugeIDRequest>, I>>(
    object: I,
  ): QueryCurrentWeightByGroupGaugeIDRequest {
    const message = createBaseQueryCurrentWeightByGroupGaugeIDRequest();
    message.groupGaugeId = (object.groupGaugeId !== undefined && object.groupGaugeId !== null)
      ? Long.fromValue(object.groupGaugeId)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryCurrentWeightByGroupGaugeIDResponse(): QueryCurrentWeightByGroupGaugeIDResponse {
  return { gaugeWeight: [] };
}

export const QueryCurrentWeightByGroupGaugeIDResponse = {
  encode(message: QueryCurrentWeightByGroupGaugeIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.gaugeWeight) {
      GaugeWeight.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrentWeightByGroupGaugeIDResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentWeightByGroupGaugeIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.gaugeWeight.push(GaugeWeight.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCurrentWeightByGroupGaugeIDResponse {
    return {
      gaugeWeight: globalThis.Array.isArray(object?.gaugeWeight)
        ? object.gaugeWeight.map((e: any) => GaugeWeight.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryCurrentWeightByGroupGaugeIDResponse): unknown {
    const obj: any = {};
    if (message.gaugeWeight?.length) {
      obj.gaugeWeight = message.gaugeWeight.map((e) => GaugeWeight.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCurrentWeightByGroupGaugeIDResponse>, I>>(
    base?: I,
  ): QueryCurrentWeightByGroupGaugeIDResponse {
    return QueryCurrentWeightByGroupGaugeIDResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCurrentWeightByGroupGaugeIDResponse>, I>>(
    object: I,
  ): QueryCurrentWeightByGroupGaugeIDResponse {
    const message = createBaseQueryCurrentWeightByGroupGaugeIDResponse();
    message.gaugeWeight = object.gaugeWeight?.map((e) => GaugeWeight.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGaugeWeight(): GaugeWeight {
  return { gaugeId: Long.UZERO, weightRatio: "" };
}

export const GaugeWeight = {
  encode(message: GaugeWeight, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.gaugeId.isZero()) {
      writer.uint32(8).uint64(message.gaugeId);
    }
    if (message.weightRatio !== "") {
      writer.uint32(18).string(message.weightRatio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GaugeWeight {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugeWeight();
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

          message.weightRatio = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GaugeWeight {
    return {
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
      weightRatio: isSet(object.weightRatio) ? globalThis.String(object.weightRatio) : "",
    };
  },

  toJSON(message: GaugeWeight): unknown {
    const obj: any = {};
    if (!message.gaugeId.isZero()) {
      obj.gaugeId = (message.gaugeId || Long.UZERO).toString();
    }
    if (message.weightRatio !== "") {
      obj.weightRatio = message.weightRatio;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GaugeWeight>, I>>(base?: I): GaugeWeight {
    return GaugeWeight.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GaugeWeight>, I>>(object: I): GaugeWeight {
    const message = createBaseGaugeWeight();
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    message.weightRatio = object.weightRatio ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service */
export interface Query {
  /** ModuleToDistributeCoins returns coins that are going to be distributed */
  ModuleToDistributeCoins(request: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse>;
  /** GaugeByID returns gauges by their respective ID */
  GaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse>;
  /** Gauges returns both upcoming and active gauges */
  Gauges(request: GaugesRequest): Promise<GaugesResponse>;
  /** ActiveGauges returns active gauges */
  ActiveGauges(request: ActiveGaugesRequest): Promise<ActiveGaugesResponse>;
  /** ActiveGaugesPerDenom returns active gauges by denom */
  ActiveGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse>;
  /** Returns scheduled gauges that have not yet occurred */
  UpcomingGauges(request: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse>;
  /**
   * UpcomingGaugesPerDenom returns scheduled gauges that have not yet occurred
   * by denom
   */
  UpcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse>;
  /**
   * RewardsEst returns an estimate of the rewards from now until a specified
   * time in the future The querier either provides an address or a set of locks
   * for which they want to find the associated rewards
   */
  RewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse>;
  /**
   * LockableDurations returns lockable durations that are valid to distribute
   * incentives for
   */
  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>;
  /** AllGroups returns all groups */
  AllGroups(request: QueryAllGroupsRequest): Promise<QueryAllGroupsResponse>;
  /** AllGroupsGauges returns all group gauges */
  AllGroupsGauges(request: QueryAllGroupsGaugesRequest): Promise<QueryAllGroupsGaugesResponse>;
  /** AllGroupsWithGauge returns all groups with their group gauge */
  AllGroupsWithGauge(request: QueryAllGroupsWithGaugeRequest): Promise<QueryAllGroupsWithGaugeResponse>;
  /** GroupByGroupGaugeID returns a group given its group gauge ID */
  GroupByGroupGaugeID(request: QueryGroupByGroupGaugeIDRequest): Promise<QueryGroupByGroupGaugeIDResponse>;
  /**
   * CurrentWeightByGroupGaugeID returns the current weight since the
   * the last epoch given a group gauge ID
   */
  CurrentWeightByGroupGaugeID(
    request: QueryCurrentWeightByGroupGaugeIDRequest,
  ): Promise<QueryCurrentWeightByGroupGaugeIDResponse>;
}

export const QueryServiceName = "osmosis.incentives.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.ModuleToDistributeCoins = this.ModuleToDistributeCoins.bind(this);
    this.GaugeByID = this.GaugeByID.bind(this);
    this.Gauges = this.Gauges.bind(this);
    this.ActiveGauges = this.ActiveGauges.bind(this);
    this.ActiveGaugesPerDenom = this.ActiveGaugesPerDenom.bind(this);
    this.UpcomingGauges = this.UpcomingGauges.bind(this);
    this.UpcomingGaugesPerDenom = this.UpcomingGaugesPerDenom.bind(this);
    this.RewardsEst = this.RewardsEst.bind(this);
    this.LockableDurations = this.LockableDurations.bind(this);
    this.AllGroups = this.AllGroups.bind(this);
    this.AllGroupsGauges = this.AllGroupsGauges.bind(this);
    this.AllGroupsWithGauge = this.AllGroupsWithGauge.bind(this);
    this.GroupByGroupGaugeID = this.GroupByGroupGaugeID.bind(this);
    this.CurrentWeightByGroupGaugeID = this.CurrentWeightByGroupGaugeID.bind(this);
  }
  ModuleToDistributeCoins(request: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse> {
    const data = ModuleToDistributeCoinsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ModuleToDistributeCoins", data);
    return promise.then((data) => ModuleToDistributeCoinsResponse.decode(_m0.Reader.create(data)));
  }

  GaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse> {
    const data = GaugeByIDRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GaugeByID", data);
    return promise.then((data) => GaugeByIDResponse.decode(_m0.Reader.create(data)));
  }

  Gauges(request: GaugesRequest): Promise<GaugesResponse> {
    const data = GaugesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Gauges", data);
    return promise.then((data) => GaugesResponse.decode(_m0.Reader.create(data)));
  }

  ActiveGauges(request: ActiveGaugesRequest): Promise<ActiveGaugesResponse> {
    const data = ActiveGaugesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ActiveGauges", data);
    return promise.then((data) => ActiveGaugesResponse.decode(_m0.Reader.create(data)));
  }

  ActiveGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse> {
    const data = ActiveGaugesPerDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ActiveGaugesPerDenom", data);
    return promise.then((data) => ActiveGaugesPerDenomResponse.decode(_m0.Reader.create(data)));
  }

  UpcomingGauges(request: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse> {
    const data = UpcomingGaugesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpcomingGauges", data);
    return promise.then((data) => UpcomingGaugesResponse.decode(_m0.Reader.create(data)));
  }

  UpcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse> {
    const data = UpcomingGaugesPerDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpcomingGaugesPerDenom", data);
    return promise.then((data) => UpcomingGaugesPerDenomResponse.decode(_m0.Reader.create(data)));
  }

  RewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse> {
    const data = RewardsEstRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RewardsEst", data);
    return promise.then((data) => RewardsEstResponse.decode(_m0.Reader.create(data)));
  }

  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse> {
    const data = QueryLockableDurationsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "LockableDurations", data);
    return promise.then((data) => QueryLockableDurationsResponse.decode(_m0.Reader.create(data)));
  }

  AllGroups(request: QueryAllGroupsRequest): Promise<QueryAllGroupsResponse> {
    const data = QueryAllGroupsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AllGroups", data);
    return promise.then((data) => QueryAllGroupsResponse.decode(_m0.Reader.create(data)));
  }

  AllGroupsGauges(request: QueryAllGroupsGaugesRequest): Promise<QueryAllGroupsGaugesResponse> {
    const data = QueryAllGroupsGaugesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AllGroupsGauges", data);
    return promise.then((data) => QueryAllGroupsGaugesResponse.decode(_m0.Reader.create(data)));
  }

  AllGroupsWithGauge(request: QueryAllGroupsWithGaugeRequest): Promise<QueryAllGroupsWithGaugeResponse> {
    const data = QueryAllGroupsWithGaugeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AllGroupsWithGauge", data);
    return promise.then((data) => QueryAllGroupsWithGaugeResponse.decode(_m0.Reader.create(data)));
  }

  GroupByGroupGaugeID(request: QueryGroupByGroupGaugeIDRequest): Promise<QueryGroupByGroupGaugeIDResponse> {
    const data = QueryGroupByGroupGaugeIDRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GroupByGroupGaugeID", data);
    return promise.then((data) => QueryGroupByGroupGaugeIDResponse.decode(_m0.Reader.create(data)));
  }

  CurrentWeightByGroupGaugeID(
    request: QueryCurrentWeightByGroupGaugeIDRequest,
  ): Promise<QueryCurrentWeightByGroupGaugeIDResponse> {
    const data = QueryCurrentWeightByGroupGaugeIDRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CurrentWeightByGroupGaugeID", data);
    return promise.then((data) => QueryCurrentWeightByGroupGaugeIDResponse.decode(_m0.Reader.create(data)));
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
