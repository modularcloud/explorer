/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DenomPairTakerFee } from "./tx";

export const protobufPackage = "osmosis.poolmanager.v1beta1";

/**
 * DenomPairTakerFeeProposal is a type for adding/removing a custom taker fee(s)
 * for one or more denom pairs.
 */
export interface DenomPairTakerFeeProposal {
  title: string;
  description: string;
  denomPairTakerFee: DenomPairTakerFee[];
}

function createBaseDenomPairTakerFeeProposal(): DenomPairTakerFeeProposal {
  return { title: "", description: "", denomPairTakerFee: [] };
}

export const DenomPairTakerFeeProposal = {
  encode(message: DenomPairTakerFeeProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.denomPairTakerFee) {
      DenomPairTakerFee.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DenomPairTakerFeeProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenomPairTakerFeeProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.denomPairTakerFee.push(DenomPairTakerFee.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DenomPairTakerFeeProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      denomPairTakerFee: globalThis.Array.isArray(object?.denomPairTakerFee)
        ? object.denomPairTakerFee.map((e: any) => DenomPairTakerFee.fromJSON(e))
        : [],
    };
  },

  toJSON(message: DenomPairTakerFeeProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.denomPairTakerFee?.length) {
      obj.denomPairTakerFee = message.denomPairTakerFee.map((e) => DenomPairTakerFee.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DenomPairTakerFeeProposal>, I>>(base?: I): DenomPairTakerFeeProposal {
    return DenomPairTakerFeeProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DenomPairTakerFeeProposal>, I>>(object: I): DenomPairTakerFeeProposal {
    const message = createBaseDenomPairTakerFeeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.denomPairTakerFee = object.denomPairTakerFee?.map((e) => DenomPairTakerFee.fromPartial(e)) || [];
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
