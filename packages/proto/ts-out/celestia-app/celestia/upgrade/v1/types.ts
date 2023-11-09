/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "celestia.upgrade.v1";

/** MsgVersionChange is a message that signals an app version change */
export interface MsgVersionChange {
  /** the app version this message proposes upgrading to */
  version: Long;
}

function createBaseMsgVersionChange(): MsgVersionChange {
  return { version: Long.UZERO };
}

export const MsgVersionChange = {
  encode(message: MsgVersionChange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.version.isZero()) {
      writer.uint32(8).uint64(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVersionChange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVersionChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.version = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgVersionChange {
    return { version: isSet(object.version) ? Long.fromValue(object.version) : Long.UZERO };
  },

  toJSON(message: MsgVersionChange): unknown {
    const obj: any = {};
    if (!message.version.isZero()) {
      obj.version = (message.version || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgVersionChange>, I>>(base?: I): MsgVersionChange {
    return MsgVersionChange.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgVersionChange>, I>>(object: I): MsgVersionChange {
    const message = createBaseMsgVersionChange();
    message.version = (object.version !== undefined && object.version !== null)
      ? Long.fromValue(object.version)
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
