/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "celestia.blob.v1";

/** Params defines the parameters for the module. */
export interface Params {
  gasPerBlobByte: number;
  govMaxSquareSize: Long;
}

function createBaseParams(): Params {
  return { gasPerBlobByte: 0, govMaxSquareSize: Long.UZERO };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gasPerBlobByte !== 0) {
      writer.uint32(8).uint32(message.gasPerBlobByte);
    }
    if (!message.govMaxSquareSize.isZero()) {
      writer.uint32(16).uint64(message.govMaxSquareSize);
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
          if (tag !== 8) {
            break;
          }

          message.gasPerBlobByte = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.govMaxSquareSize = reader.uint64() as Long;
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
      gasPerBlobByte: isSet(object.gasPerBlobByte) ? globalThis.Number(object.gasPerBlobByte) : 0,
      govMaxSquareSize: isSet(object.govMaxSquareSize) ? Long.fromValue(object.govMaxSquareSize) : Long.UZERO,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.gasPerBlobByte !== 0) {
      obj.gasPerBlobByte = Math.round(message.gasPerBlobByte);
    }
    if (!message.govMaxSquareSize.isZero()) {
      obj.govMaxSquareSize = (message.govMaxSquareSize || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.gasPerBlobByte = object.gasPerBlobByte ?? 0;
    message.govMaxSquareSize = (object.govMaxSquareSize !== undefined && object.govMaxSquareSize !== null)
      ? Long.fromValue(object.govMaxSquareSize)
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
