/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Budget, ContinuousFund } from "./types";

export const protobufPackage = "cosmos.protocolpool.v1";

/** GenesisState defines the protocolpool module's genesis state. */
export interface GenesisState {
  /** ContinuousFund defines the continuous funds at genesis. */
  continuousFund: ContinuousFund[];
  /** Budget defines the budget proposals at genesis. */
  budget: Budget[];
  toDistribute: string;
}

function createBaseGenesisState(): GenesisState {
  return { continuousFund: [], budget: [], toDistribute: "" };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.continuousFund) {
      ContinuousFund.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.budget) {
      Budget.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.toDistribute !== "") {
      writer.uint32(26).string(message.toDistribute);
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

          message.continuousFund.push(ContinuousFund.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.budget.push(Budget.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.toDistribute = reader.string();
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
      continuousFund: globalThis.Array.isArray(object?.continuousFund)
        ? object.continuousFund.map((e: any) => ContinuousFund.fromJSON(e))
        : [],
      budget: globalThis.Array.isArray(object?.budget) ? object.budget.map((e: any) => Budget.fromJSON(e)) : [],
      toDistribute: isSet(object.toDistribute) ? globalThis.String(object.toDistribute) : "",
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.continuousFund?.length) {
      obj.continuousFund = message.continuousFund.map((e) => ContinuousFund.toJSON(e));
    }
    if (message.budget?.length) {
      obj.budget = message.budget.map((e) => Budget.toJSON(e));
    }
    if (message.toDistribute !== "") {
      obj.toDistribute = message.toDistribute;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.continuousFund = object.continuousFund?.map((e) => ContinuousFund.fromPartial(e)) || [];
    message.budget = object.budget?.map((e) => Budget.fromPartial(e)) || [];
    message.toDistribute = object.toDistribute ?? "";
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
