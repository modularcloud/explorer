/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Validator } from "../cosmos/staking/v1beta1/staking";
import { Params } from "./params";

export const protobufPackage = "rollapp.sequencers.types";

/** GenesisState defines the test module's genesis state. */
export interface GenesisState {
  /** this line is used by starport scaffolding # genesis/proto/state */
  params:
    | Params
    | undefined;
  /** delegations defines the validator set at genesis. */
  sequencers: Validator[];
  exported: boolean;
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, sequencers: [], exported: false };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.sequencers) {
      Validator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.exported === true) {
      writer.uint32(24).bool(message.exported);
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

          message.sequencers.push(Validator.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.exported = reader.bool();
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
      sequencers: globalThis.Array.isArray(object?.sequencers)
        ? object.sequencers.map((e: any) => Validator.fromJSON(e))
        : [],
      exported: isSet(object.exported) ? globalThis.Boolean(object.exported) : false,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.sequencers?.length) {
      obj.sequencers = message.sequencers.map((e) => Validator.toJSON(e));
    }
    if (message.exported === true) {
      obj.exported = message.exported;
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
    message.sequencers = object.sequencers?.map((e) => Validator.fromPartial(e)) || [];
    message.exported = object.exported ?? false;
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
