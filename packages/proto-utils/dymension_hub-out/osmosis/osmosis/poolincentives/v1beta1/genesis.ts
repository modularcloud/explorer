/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { AnyPoolToInternalGauges, ConcentratedPoolToNoLockGauges, DistrInfo, Params } from "./incentives";

export const protobufPackage = "osmosis.poolincentives.v1beta1";

/** GenesisState defines the pool incentives module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters of the module. */
  params: Params | undefined;
  lockableDurations: Duration[];
  distrInfo:
    | DistrInfo
    | undefined;
  /**
   * any_pool_to_internal_gauges defines the gauges for any pool to internal
   * pool. For every pool type (e.g. LP, Concentrated, etc), there is one such
   * link
   */
  anyPoolToInternalGauges:
    | AnyPoolToInternalGauges
    | undefined;
  /**
   * concentrated_pool_to_no_lock_gauges defines the no lock gauges for
   * concentrated pool. This only exists between concentrated pool and no lock
   * gauges. Both external and internal gauges are included.
   */
  concentratedPoolToNoLockGauges: ConcentratedPoolToNoLockGauges | undefined;
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    lockableDurations: [],
    distrInfo: undefined,
    anyPoolToInternalGauges: undefined,
    concentratedPoolToNoLockGauges: undefined,
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.lockableDurations) {
      Duration.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.distrInfo !== undefined) {
      DistrInfo.encode(message.distrInfo, writer.uint32(26).fork()).ldelim();
    }
    if (message.anyPoolToInternalGauges !== undefined) {
      AnyPoolToInternalGauges.encode(message.anyPoolToInternalGauges, writer.uint32(34).fork()).ldelim();
    }
    if (message.concentratedPoolToNoLockGauges !== undefined) {
      ConcentratedPoolToNoLockGauges.encode(message.concentratedPoolToNoLockGauges, writer.uint32(42).fork()).ldelim();
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

          message.lockableDurations.push(Duration.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.distrInfo = DistrInfo.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.anyPoolToInternalGauges = AnyPoolToInternalGauges.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.concentratedPoolToNoLockGauges = ConcentratedPoolToNoLockGauges.decode(reader, reader.uint32());
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
      lockableDurations: globalThis.Array.isArray(object?.lockableDurations)
        ? object.lockableDurations.map((e: any) => Duration.fromJSON(e))
        : [],
      distrInfo: isSet(object.distrInfo) ? DistrInfo.fromJSON(object.distrInfo) : undefined,
      anyPoolToInternalGauges: isSet(object.anyPoolToInternalGauges)
        ? AnyPoolToInternalGauges.fromJSON(object.anyPoolToInternalGauges)
        : undefined,
      concentratedPoolToNoLockGauges: isSet(object.concentratedPoolToNoLockGauges)
        ? ConcentratedPoolToNoLockGauges.fromJSON(object.concentratedPoolToNoLockGauges)
        : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.lockableDurations?.length) {
      obj.lockableDurations = message.lockableDurations.map((e) => Duration.toJSON(e));
    }
    if (message.distrInfo !== undefined) {
      obj.distrInfo = DistrInfo.toJSON(message.distrInfo);
    }
    if (message.anyPoolToInternalGauges !== undefined) {
      obj.anyPoolToInternalGauges = AnyPoolToInternalGauges.toJSON(message.anyPoolToInternalGauges);
    }
    if (message.concentratedPoolToNoLockGauges !== undefined) {
      obj.concentratedPoolToNoLockGauges = ConcentratedPoolToNoLockGauges.toJSON(
        message.concentratedPoolToNoLockGauges,
      );
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
    message.lockableDurations = object.lockableDurations?.map((e) => Duration.fromPartial(e)) || [];
    message.distrInfo = (object.distrInfo !== undefined && object.distrInfo !== null)
      ? DistrInfo.fromPartial(object.distrInfo)
      : undefined;
    message.anyPoolToInternalGauges =
      (object.anyPoolToInternalGauges !== undefined && object.anyPoolToInternalGauges !== null)
        ? AnyPoolToInternalGauges.fromPartial(object.anyPoolToInternalGauges)
        : undefined;
    message.concentratedPoolToNoLockGauges =
      (object.concentratedPoolToNoLockGauges !== undefined && object.concentratedPoolToNoLockGauges !== null)
        ? ConcentratedPoolToNoLockGauges.fromPartial(object.concentratedPoolToNoLockGauges)
        : undefined;
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
