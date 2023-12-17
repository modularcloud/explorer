/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.gov.module.v1";

/** Module is the config object of the gov module. */
export interface Module {
  /**
   * max_metadata_len defines the maximum proposal metadata length.
   * Defaults to 255 if not explicitly set.
   */
  maxMetadataLen: Long;
  /** authority defines the custom module authority. If not set, defaults to the governance module. */
  authority: string;
  /**
   * max_title_len defines the maximum proposal title length.
   * Defaults to 255 if not explicitly set.
   */
  maxTitleLen: Long;
  /**
   * max_summary_len defines the maximum proposal summary length.
   * Defaults to 10200 if not explicitly set.
   */
  maxSummaryLen: Long;
}

function createBaseModule(): Module {
  return { maxMetadataLen: Long.UZERO, authority: "", maxTitleLen: Long.UZERO, maxSummaryLen: Long.UZERO };
}

export const Module = {
  encode(message: Module, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.maxMetadataLen.isZero()) {
      writer.uint32(8).uint64(message.maxMetadataLen);
    }
    if (message.authority !== "") {
      writer.uint32(18).string(message.authority);
    }
    if (!message.maxTitleLen.isZero()) {
      writer.uint32(24).uint64(message.maxTitleLen);
    }
    if (!message.maxSummaryLen.isZero()) {
      writer.uint32(32).uint64(message.maxSummaryLen);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Module {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maxMetadataLen = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxTitleLen = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.maxSummaryLen = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Module {
    return {
      maxMetadataLen: isSet(object.maxMetadataLen) ? Long.fromValue(object.maxMetadataLen) : Long.UZERO,
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      maxTitleLen: isSet(object.maxTitleLen) ? Long.fromValue(object.maxTitleLen) : Long.UZERO,
      maxSummaryLen: isSet(object.maxSummaryLen) ? Long.fromValue(object.maxSummaryLen) : Long.UZERO,
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    if (!message.maxMetadataLen.isZero()) {
      obj.maxMetadataLen = (message.maxMetadataLen || Long.UZERO).toString();
    }
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (!message.maxTitleLen.isZero()) {
      obj.maxTitleLen = (message.maxTitleLen || Long.UZERO).toString();
    }
    if (!message.maxSummaryLen.isZero()) {
      obj.maxSummaryLen = (message.maxSummaryLen || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Module>, I>>(base?: I): Module {
    return Module.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Module>, I>>(object: I): Module {
    const message = createBaseModule();
    message.maxMetadataLen = (object.maxMetadataLen !== undefined && object.maxMetadataLen !== null)
      ? Long.fromValue(object.maxMetadataLen)
      : Long.UZERO;
    message.authority = object.authority ?? "";
    message.maxTitleLen = (object.maxTitleLen !== undefined && object.maxTitleLen !== null)
      ? Long.fromValue(object.maxTitleLen)
      : Long.UZERO;
    message.maxSummaryLen = (object.maxSummaryLen !== undefined && object.maxSummaryLen !== null)
      ? Long.fromValue(object.maxSummaryLen)
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
