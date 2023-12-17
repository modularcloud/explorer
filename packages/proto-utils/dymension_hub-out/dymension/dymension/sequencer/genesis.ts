/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "./params";
import { Scheduler } from "./scheduler";
import { Sequencer } from "./sequencer";
import { SequencersByRollapp } from "./sequencers_by_rollapp";

export const protobufPackage = "dymensionxyz.dymension.sequencer";

/** GenesisState defines the sequencer module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  sequencerList: Sequencer[];
  sequencersByRollappList: SequencersByRollapp[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  schedulerList: Scheduler[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, sequencerList: [], sequencersByRollappList: [], schedulerList: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.sequencerList) {
      Sequencer.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.sequencersByRollappList) {
      SequencersByRollapp.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.schedulerList) {
      Scheduler.encode(v!, writer.uint32(34).fork()).ldelim();
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

          message.sequencerList.push(Sequencer.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sequencersByRollappList.push(SequencersByRollapp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.schedulerList.push(Scheduler.decode(reader, reader.uint32()));
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
      sequencerList: globalThis.Array.isArray(object?.sequencerList)
        ? object.sequencerList.map((e: any) => Sequencer.fromJSON(e))
        : [],
      sequencersByRollappList: globalThis.Array.isArray(object?.sequencersByRollappList)
        ? object.sequencersByRollappList.map((e: any) => SequencersByRollapp.fromJSON(e))
        : [],
      schedulerList: globalThis.Array.isArray(object?.schedulerList)
        ? object.schedulerList.map((e: any) => Scheduler.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.sequencerList?.length) {
      obj.sequencerList = message.sequencerList.map((e) => Sequencer.toJSON(e));
    }
    if (message.sequencersByRollappList?.length) {
      obj.sequencersByRollappList = message.sequencersByRollappList.map((e) => SequencersByRollapp.toJSON(e));
    }
    if (message.schedulerList?.length) {
      obj.schedulerList = message.schedulerList.map((e) => Scheduler.toJSON(e));
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
    message.sequencerList = object.sequencerList?.map((e) => Sequencer.fromPartial(e)) || [];
    message.sequencersByRollappList = object.sequencersByRollappList?.map((e) => SequencersByRollapp.fromPartial(e)) ||
      [];
    message.schedulerList = object.schedulerList?.map((e) => Scheduler.fromPartial(e)) || [];
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
