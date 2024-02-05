/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.cosmwasmpool.v1beta1";

/** ===================== InstantiateMsg */
export interface InstantiateMsg {
  /**
   * pool_asset_denoms is the list of asset denoms that are initialized
   * at pool creation time.
   */
  poolAssetDenoms: string[];
}

function createBaseInstantiateMsg(): InstantiateMsg {
  return { poolAssetDenoms: [] };
}

export const InstantiateMsg = {
  encode(message: InstantiateMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.poolAssetDenoms) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstantiateMsg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstantiateMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolAssetDenoms.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InstantiateMsg {
    return {
      poolAssetDenoms: globalThis.Array.isArray(object?.poolAssetDenoms)
        ? object.poolAssetDenoms.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: InstantiateMsg): unknown {
    const obj: any = {};
    if (message.poolAssetDenoms?.length) {
      obj.poolAssetDenoms = message.poolAssetDenoms;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InstantiateMsg>, I>>(base?: I): InstantiateMsg {
    return InstantiateMsg.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InstantiateMsg>, I>>(object: I): InstantiateMsg {
    const message = createBaseInstantiateMsg();
    message.poolAssetDenoms = object.poolAssetDenoms?.map((e) => e) || [];
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
