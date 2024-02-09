/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PeriodLock, SyntheticLock } from "./lock";
import { Params } from "./params";

export const protobufPackage = "osmosis.lockup";

/** GenesisState defines the lockup module's genesis state. */
export interface GenesisState {
  lastLockId: Long;
  locks: PeriodLock[];
  syntheticLocks: SyntheticLock[];
  params: Params | undefined;
}

function createBaseGenesisState(): GenesisState {
  return { lastLockId: Long.UZERO, locks: [], syntheticLocks: [], params: undefined };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.lastLockId.isZero()) {
      writer.uint32(8).uint64(message.lastLockId);
    }
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.syntheticLocks) {
      SyntheticLock.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
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
          if (tag !== 8) {
            break;
          }

          message.lastLockId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.locks.push(PeriodLock.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.syntheticLocks.push(SyntheticLock.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): GenesisState {
    return {
      lastLockId: isSet(object.lastLockId) ? Long.fromValue(object.lastLockId) : Long.UZERO,
      locks: globalThis.Array.isArray(object?.locks) ? object.locks.map((e: any) => PeriodLock.fromJSON(e)) : [],
      syntheticLocks: globalThis.Array.isArray(object?.syntheticLocks)
        ? object.syntheticLocks.map((e: any) => SyntheticLock.fromJSON(e))
        : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (!message.lastLockId.isZero()) {
      obj.lastLockId = (message.lastLockId || Long.UZERO).toString();
    }
    if (message.locks?.length) {
      obj.locks = message.locks.map((e) => PeriodLock.toJSON(e));
    }
    if (message.syntheticLocks?.length) {
      obj.syntheticLocks = message.syntheticLocks.map((e) => SyntheticLock.toJSON(e));
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.lastLockId = (object.lastLockId !== undefined && object.lastLockId !== null)
      ? Long.fromValue(object.lastLockId)
      : Long.UZERO;
    message.locks = object.locks?.map((e) => PeriodLock.fromPartial(e)) || [];
    message.syntheticLocks = object.syntheticLocks?.map((e) => SyntheticLock.fromPartial(e)) || [];
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
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
