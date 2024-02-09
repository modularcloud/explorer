/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";
import { Gauge } from "./gauge";
import { Group } from "./group";
import { Params } from "./params";

export const protobufPackage = "osmosis.incentives";

/**
 * GenesisState defines the incentives module's various parameters when first
 * initialized
 */
export interface GenesisState {
  /** params are all the parameters of the module */
  params:
    | Params
    | undefined;
  /**
   * gauges are all gauges (not including group gauges) that should exist at
   * genesis
   */
  gauges: Gauge[];
  /**
   * lockable_durations are all lockup durations that gauges can be locked for
   * in order to receive incentives
   */
  lockableDurations: Duration[];
  /**
   * last_gauge_id is what the gauge number will increment from when creating
   * the next gauge after genesis
   */
  lastGaugeId: Long;
  /** gauges are all group gauges that should exist at genesis */
  groupGauges: Gauge[];
  /** groups are all the groups that should exist at genesis */
  groups: Group[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, gauges: [], lockableDurations: [], lastGaugeId: Long.UZERO, groupGauges: [], groups: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.gauges) {
      Gauge.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.lockableDurations) {
      Duration.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.lastGaugeId.isZero()) {
      writer.uint32(32).uint64(message.lastGaugeId);
    }
    for (const v of message.groupGauges) {
      Gauge.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.groups) {
      Group.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.gauges.push(Gauge.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lockableDurations.push(Duration.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.lastGaugeId = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.groupGauges.push(Gauge.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
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

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      gauges: globalThis.Array.isArray(object?.gauges) ? object.gauges.map((e: any) => Gauge.fromJSON(e)) : [],
      lockableDurations: globalThis.Array.isArray(object?.lockableDurations)
        ? object.lockableDurations.map((e: any) => Duration.fromJSON(e))
        : [],
      lastGaugeId: isSet(object.lastGaugeId) ? Long.fromValue(object.lastGaugeId) : Long.UZERO,
      groupGauges: globalThis.Array.isArray(object?.groupGauges)
        ? object.groupGauges.map((e: any) => Gauge.fromJSON(e))
        : [],
      groups: globalThis.Array.isArray(object?.groups) ? object.groups.map((e: any) => Group.fromJSON(e)) : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.gauges?.length) {
      obj.gauges = message.gauges.map((e) => Gauge.toJSON(e));
    }
    if (message.lockableDurations?.length) {
      obj.lockableDurations = message.lockableDurations.map((e) => Duration.toJSON(e));
    }
    if (!message.lastGaugeId.isZero()) {
      obj.lastGaugeId = (message.lastGaugeId || Long.UZERO).toString();
    }
    if (message.groupGauges?.length) {
      obj.groupGauges = message.groupGauges.map((e) => Gauge.toJSON(e));
    }
    if (message.groups?.length) {
      obj.groups = message.groups.map((e) => Group.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.gauges = object.gauges?.map((e) => Gauge.fromPartial(e)) || [];
    message.lockableDurations = object.lockableDurations?.map((e) => Duration.fromPartial(e)) || [];
    message.lastGaugeId = (object.lastGaugeId !== undefined && object.lastGaugeId !== null)
      ? Long.fromValue(object.lastGaugeId)
      : Long.UZERO;
    message.groupGauges = object.groupGauges?.map((e) => Gauge.fromPartial(e)) || [];
    message.groups = object.groups?.map((e) => Group.fromPartial(e)) || [];
    return message;
  },
};

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
