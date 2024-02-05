/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "osmosis.tokenfactory.v1beta1";

/** Params defines the parameters for the tokenfactory module. */
export interface Params {
  /**
   * DenomCreationFee defines the fee to be charged on the creation of a new
   * denom. The fee is drawn from the MsgCreateDenom's sender account, and
   * transferred to the community pool.
   */
  denomCreationFee: Coin[];
  /**
   * DenomCreationGasConsume defines the gas cost for creating a new denom.
   * This is intended as a spam deterrence mechanism.
   *
   * See: https://github.com/CosmWasm/token-factory/issues/11
   */
  denomCreationGasConsume: Long;
}

function createBaseParams(): Params {
  return { denomCreationFee: [], denomCreationGasConsume: Long.UZERO };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denomCreationFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (!message.denomCreationGasConsume.isZero()) {
      writer.uint32(16).uint64(message.denomCreationGasConsume);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomCreationFee.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.denomCreationGasConsume = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      denomCreationFee: globalThis.Array.isArray(object?.denomCreationFee)
        ? object.denomCreationFee.map((e: any) => Coin.fromJSON(e))
        : [],
      denomCreationGasConsume: isSet(object.denomCreationGasConsume)
        ? Long.fromValue(object.denomCreationGasConsume)
        : Long.UZERO,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.denomCreationFee?.length) {
      obj.denomCreationFee = message.denomCreationFee.map((e) => Coin.toJSON(e));
    }
    if (!message.denomCreationGasConsume.isZero()) {
      obj.denomCreationGasConsume = (message.denomCreationGasConsume || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.denomCreationFee = object.denomCreationFee?.map((e) => Coin.fromPartial(e)) || [];
    message.denomCreationGasConsume =
      (object.denomCreationGasConsume !== undefined && object.denomCreationGasConsume !== null)
        ? Long.fromValue(object.denomCreationGasConsume)
        : Long.UZERO;
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
