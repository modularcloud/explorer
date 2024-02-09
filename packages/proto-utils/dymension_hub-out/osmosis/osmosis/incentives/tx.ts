/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";
import { QueryCondition } from "../lockup/lock";

export const protobufPackage = "osmosis.incentives";

/** MsgCreateGauge creates a gague to distribute rewards to users */
export interface MsgCreateGauge {
  /**
   * is_perpetual shows if it's a perpetual or non-perpetual gauge
   * Non-perpetual gauges distribute their tokens equally per epoch while the
   * gauge is in the active period. Perpetual gauges distribute all their tokens
   * at a single time and only distribute their tokens again once the gauge is
   * refilled
   */
  isPerpetual: boolean;
  /** owner is the address of gauge creator */
  owner: string;
  /**
   * distribute_to show which lock the gauge should distribute to by time
   * duration or by timestamp
   */
  distributeTo:
    | QueryCondition
    | undefined;
  /** coins are coin(s) to be distributed by the gauge */
  coins: Coin[];
  /** start_time is the distribution start time */
  startTime:
    | Date
    | undefined;
  /**
   * num_epochs_paid_over is the number of epochs distribution will be completed
   * over
   */
  numEpochsPaidOver: Long;
  /**
   * pool_id is the ID of the pool that the gauge is meant to be associated
   * with. if pool_id is set, then the "QueryCondition.LockQueryType" must be
   * "NoLock" with all other fields of the "QueryCondition.LockQueryType" struct
   * unset, including "QueryCondition.Denom". However, note that, internally,
   * the empty string in "QueryCondition.Denom" ends up being overwritten with
   * incentivestypes.NoLockExternalGaugeDenom(<pool-id>) so that the gauges
   * associated with a pool can be queried by this prefix if needed.
   */
  poolId: Long;
}

export interface MsgCreateGaugeResponse {
}

/** MsgAddToGauge adds coins to a previously created gauge */
export interface MsgAddToGauge {
  /** owner is the gauge owner's address */
  owner: string;
  /** gauge_id is the ID of gauge that rewards are getting added to */
  gaugeId: Long;
  /** rewards are the coin(s) to add to gauge */
  rewards: Coin[];
}

export interface MsgAddToGaugeResponse {
}

/** MsgCreateGroup creates a group to distribute rewards to a group of pools */
export interface MsgCreateGroup {
  /** coins are the provided coins that the group will distribute */
  coins: Coin[];
  /**
   * num_epochs_paid_over is the number of epochs distribution will be completed
   * in. 0 means it's perpetual
   */
  numEpochsPaidOver: Long;
  /** owner is the group owner's address */
  owner: string;
  /** pool_ids are the IDs of pools that the group is comprised of */
  poolIds: Long[];
}

export interface MsgCreateGroupResponse {
  /** group_id is the ID of the group that is created from this msg */
  groupId: Long;
}

function createBaseMsgCreateGauge(): MsgCreateGauge {
  return {
    isPerpetual: false,
    owner: "",
    distributeTo: undefined,
    coins: [],
    startTime: undefined,
    numEpochsPaidOver: Long.UZERO,
    poolId: Long.UZERO,
  };
}

export const MsgCreateGauge = {
  encode(message: MsgCreateGauge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.isPerpetual === true) {
      writer.uint32(8).bool(message.isPerpetual);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.distributeTo !== undefined) {
      QueryCondition.encode(message.distributeTo, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(42).fork()).ldelim();
    }
    if (!message.numEpochsPaidOver.isZero()) {
      writer.uint32(48).uint64(message.numEpochsPaidOver);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(56).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGauge {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGauge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.isPerpetual = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.distributeTo = QueryCondition.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.numEpochsPaidOver = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
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

  fromJSON(object: any): MsgCreateGauge {
    return {
      isPerpetual: isSet(object.isPerpetual) ? globalThis.Boolean(object.isPerpetual) : false,
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      distributeTo: isSet(object.distributeTo) ? QueryCondition.fromJSON(object.distributeTo) : undefined,
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      numEpochsPaidOver: isSet(object.numEpochsPaidOver) ? Long.fromValue(object.numEpochsPaidOver) : Long.UZERO,
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
    };
  },

  toJSON(message: MsgCreateGauge): unknown {
    const obj: any = {};
    if (message.isPerpetual === true) {
      obj.isPerpetual = message.isPerpetual;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.distributeTo !== undefined) {
      obj.distributeTo = QueryCondition.toJSON(message.distributeTo);
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (!message.numEpochsPaidOver.isZero()) {
      obj.numEpochsPaidOver = (message.numEpochsPaidOver || Long.UZERO).toString();
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGauge>, I>>(base?: I): MsgCreateGauge {
    return MsgCreateGauge.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGauge>, I>>(object: I): MsgCreateGauge {
    const message = createBaseMsgCreateGauge();
    message.isPerpetual = object.isPerpetual ?? false;
    message.owner = object.owner ?? "";
    message.distributeTo = (object.distributeTo !== undefined && object.distributeTo !== null)
      ? QueryCondition.fromPartial(object.distributeTo)
      : undefined;
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.startTime = object.startTime ?? undefined;
    message.numEpochsPaidOver = (object.numEpochsPaidOver !== undefined && object.numEpochsPaidOver !== null)
      ? Long.fromValue(object.numEpochsPaidOver)
      : Long.UZERO;
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgCreateGaugeResponse(): MsgCreateGaugeResponse {
  return {};
}

export const MsgCreateGaugeResponse = {
  encode(_: MsgCreateGaugeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGaugeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGaugeResponse();
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

  fromJSON(_: any): MsgCreateGaugeResponse {
    return {};
  },

  toJSON(_: MsgCreateGaugeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGaugeResponse>, I>>(base?: I): MsgCreateGaugeResponse {
    return MsgCreateGaugeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGaugeResponse>, I>>(_: I): MsgCreateGaugeResponse {
    const message = createBaseMsgCreateGaugeResponse();
    return message;
  },
};

function createBaseMsgAddToGauge(): MsgAddToGauge {
  return { owner: "", gaugeId: Long.UZERO, rewards: [] };
}

export const MsgAddToGauge = {
  encode(message: MsgAddToGauge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (!message.gaugeId.isZero()) {
      writer.uint32(16).uint64(message.gaugeId);
    }
    for (const v of message.rewards) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddToGauge {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddToGauge();
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
          if (tag !== 16) {
            break;
          }

          message.gaugeId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rewards.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddToGauge {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
      rewards: globalThis.Array.isArray(object?.rewards) ? object.rewards.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgAddToGauge): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (!message.gaugeId.isZero()) {
      obj.gaugeId = (message.gaugeId || Long.UZERO).toString();
    }
    if (message.rewards?.length) {
      obj.rewards = message.rewards.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddToGauge>, I>>(base?: I): MsgAddToGauge {
    return MsgAddToGauge.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddToGauge>, I>>(object: I): MsgAddToGauge {
    const message = createBaseMsgAddToGauge();
    message.owner = object.owner ?? "";
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    message.rewards = object.rewards?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgAddToGaugeResponse(): MsgAddToGaugeResponse {
  return {};
}

export const MsgAddToGaugeResponse = {
  encode(_: MsgAddToGaugeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddToGaugeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddToGaugeResponse();
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

  fromJSON(_: any): MsgAddToGaugeResponse {
    return {};
  },

  toJSON(_: MsgAddToGaugeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddToGaugeResponse>, I>>(base?: I): MsgAddToGaugeResponse {
    return MsgAddToGaugeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddToGaugeResponse>, I>>(_: I): MsgAddToGaugeResponse {
    const message = createBaseMsgAddToGaugeResponse();
    return message;
  },
};

function createBaseMsgCreateGroup(): MsgCreateGroup {
  return { coins: [], numEpochsPaidOver: Long.UZERO, owner: "", poolIds: [] };
}

export const MsgCreateGroup = {
  encode(message: MsgCreateGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (!message.numEpochsPaidOver.isZero()) {
      writer.uint32(16).uint64(message.numEpochsPaidOver);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    writer.uint32(34).fork();
    for (const v of message.poolIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numEpochsPaidOver = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 4:
          if (tag === 32) {
            message.poolIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.poolIds.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroup {
    return {
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      numEpochsPaidOver: isSet(object.numEpochsPaidOver) ? Long.fromValue(object.numEpochsPaidOver) : Long.UZERO,
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      poolIds: globalThis.Array.isArray(object?.poolIds) ? object.poolIds.map((e: any) => Long.fromValue(e)) : [],
    };
  },

  toJSON(message: MsgCreateGroup): unknown {
    const obj: any = {};
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    if (!message.numEpochsPaidOver.isZero()) {
      obj.numEpochsPaidOver = (message.numEpochsPaidOver || Long.UZERO).toString();
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.poolIds?.length) {
      obj.poolIds = message.poolIds.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGroup>, I>>(base?: I): MsgCreateGroup {
    return MsgCreateGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGroup>, I>>(object: I): MsgCreateGroup {
    const message = createBaseMsgCreateGroup();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.numEpochsPaidOver = (object.numEpochsPaidOver !== undefined && object.numEpochsPaidOver !== null)
      ? Long.fromValue(object.numEpochsPaidOver)
      : Long.UZERO;
    message.owner = object.owner ?? "";
    message.poolIds = object.poolIds?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseMsgCreateGroupResponse(): MsgCreateGroupResponse {
  return { groupId: Long.UZERO };
}

export const MsgCreateGroupResponse = {
  encode(message: MsgCreateGroupResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.groupId.isZero()) {
      writer.uint32(8).uint64(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.groupId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupResponse {
    return { groupId: isSet(object.groupId) ? Long.fromValue(object.groupId) : Long.UZERO };
  },

  toJSON(message: MsgCreateGroupResponse): unknown {
    const obj: any = {};
    if (!message.groupId.isZero()) {
      obj.groupId = (message.groupId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGroupResponse>, I>>(base?: I): MsgCreateGroupResponse {
    return MsgCreateGroupResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupResponse>, I>>(object: I): MsgCreateGroupResponse {
    const message = createBaseMsgCreateGroupResponse();
    message.groupId = (object.groupId !== undefined && object.groupId !== null)
      ? Long.fromValue(object.groupId)
      : Long.UZERO;
    return message;
  },
};

export interface Msg {
  CreateGauge(request: MsgCreateGauge): Promise<MsgCreateGaugeResponse>;
  AddToGauge(request: MsgAddToGauge): Promise<MsgAddToGaugeResponse>;
  CreateGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse>;
}

export const MsgServiceName = "osmosis.incentives.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateGauge = this.CreateGauge.bind(this);
    this.AddToGauge = this.AddToGauge.bind(this);
    this.CreateGroup = this.CreateGroup.bind(this);
  }
  CreateGauge(request: MsgCreateGauge): Promise<MsgCreateGaugeResponse> {
    const data = MsgCreateGauge.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateGauge", data);
    return promise.then((data) => MsgCreateGaugeResponse.decode(_m0.Reader.create(data)));
  }

  AddToGauge(request: MsgAddToGauge): Promise<MsgAddToGaugeResponse> {
    const data = MsgAddToGauge.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddToGauge", data);
    return promise.then((data) => MsgAddToGaugeResponse.decode(_m0.Reader.create(data)));
  }

  CreateGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse> {
    const data = MsgCreateGroup.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateGroup", data);
    return promise.then((data) => MsgCreateGroupResponse.decode(_m0.Reader.create(data)));
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
