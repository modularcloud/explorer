/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "cosmos.slashing.v1beta1";

/**
 * ValidatorSigningInfo defines a validator's signing info for monitoring their
 * liveness activity.
 */
export interface ValidatorSigningInfo {
  address: string;
  /** Height at which validator was first a candidate OR was un-jailed */
  startHeight: Long;
  /**
   * Index which is incremented every time a validator is bonded in a block and
   * _may_ have signed a pre-commit or not. This in conjunction with the
   * signed_blocks_window param determines the index in the missed block bitmap.
   */
  indexOffset: Long;
  /** Timestamp until which the validator is jailed due to liveness downtime. */
  jailedUntil:
    | Date
    | undefined;
  /**
   * Whether or not a validator has been tombstoned (killed out of validator
   * set). It is set once the validator commits an equivocation or for any other
   * configured misbehavior.
   */
  tombstoned: boolean;
  /**
   * A counter of missed (unsigned) blocks. It is used to avoid unnecessary
   * reads in the missed block bitmap.
   */
  missedBlocksCounter: Long;
}

/** Params represents the parameters used for by the slashing module. */
export interface Params {
  signedBlocksWindow: Long;
  minSignedPerWindow: Uint8Array;
  downtimeJailDuration: Duration | undefined;
  slashFractionDoubleSign: Uint8Array;
  slashFractionDowntime: Uint8Array;
}

function createBaseValidatorSigningInfo(): ValidatorSigningInfo {
  return {
    address: "",
    startHeight: Long.ZERO,
    indexOffset: Long.ZERO,
    jailedUntil: undefined,
    tombstoned: false,
    missedBlocksCounter: Long.ZERO,
  };
}

export const ValidatorSigningInfo = {
  encode(message: ValidatorSigningInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (!message.startHeight.isZero()) {
      writer.uint32(16).int64(message.startHeight);
    }
    if (!message.indexOffset.isZero()) {
      writer.uint32(24).int64(message.indexOffset);
    }
    if (message.jailedUntil !== undefined) {
      Timestamp.encode(toTimestamp(message.jailedUntil), writer.uint32(34).fork()).ldelim();
    }
    if (message.tombstoned === true) {
      writer.uint32(40).bool(message.tombstoned);
    }
    if (!message.missedBlocksCounter.isZero()) {
      writer.uint32(48).int64(message.missedBlocksCounter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSigningInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSigningInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.startHeight = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.indexOffset = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.jailedUntil = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.tombstoned = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.missedBlocksCounter = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorSigningInfo {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      startHeight: isSet(object.startHeight) ? Long.fromValue(object.startHeight) : Long.ZERO,
      indexOffset: isSet(object.indexOffset) ? Long.fromValue(object.indexOffset) : Long.ZERO,
      jailedUntil: isSet(object.jailedUntil) ? fromJsonTimestamp(object.jailedUntil) : undefined,
      tombstoned: isSet(object.tombstoned) ? globalThis.Boolean(object.tombstoned) : false,
      missedBlocksCounter: isSet(object.missedBlocksCounter) ? Long.fromValue(object.missedBlocksCounter) : Long.ZERO,
    };
  },

  toJSON(message: ValidatorSigningInfo): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (!message.startHeight.isZero()) {
      obj.startHeight = (message.startHeight || Long.ZERO).toString();
    }
    if (!message.indexOffset.isZero()) {
      obj.indexOffset = (message.indexOffset || Long.ZERO).toString();
    }
    if (message.jailedUntil !== undefined) {
      obj.jailedUntil = message.jailedUntil.toISOString();
    }
    if (message.tombstoned === true) {
      obj.tombstoned = message.tombstoned;
    }
    if (!message.missedBlocksCounter.isZero()) {
      obj.missedBlocksCounter = (message.missedBlocksCounter || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorSigningInfo>, I>>(base?: I): ValidatorSigningInfo {
    return ValidatorSigningInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorSigningInfo>, I>>(object: I): ValidatorSigningInfo {
    const message = createBaseValidatorSigningInfo();
    message.address = object.address ?? "";
    message.startHeight = (object.startHeight !== undefined && object.startHeight !== null)
      ? Long.fromValue(object.startHeight)
      : Long.ZERO;
    message.indexOffset = (object.indexOffset !== undefined && object.indexOffset !== null)
      ? Long.fromValue(object.indexOffset)
      : Long.ZERO;
    message.jailedUntil = object.jailedUntil ?? undefined;
    message.tombstoned = object.tombstoned ?? false;
    message.missedBlocksCounter = (object.missedBlocksCounter !== undefined && object.missedBlocksCounter !== null)
      ? Long.fromValue(object.missedBlocksCounter)
      : Long.ZERO;
    return message;
  },
};

function createBaseParams(): Params {
  return {
    signedBlocksWindow: Long.ZERO,
    minSignedPerWindow: new Uint8Array(0),
    downtimeJailDuration: undefined,
    slashFractionDoubleSign: new Uint8Array(0),
    slashFractionDowntime: new Uint8Array(0),
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.signedBlocksWindow.isZero()) {
      writer.uint32(8).int64(message.signedBlocksWindow);
    }
    if (message.minSignedPerWindow.length !== 0) {
      writer.uint32(18).bytes(message.minSignedPerWindow);
    }
    if (message.downtimeJailDuration !== undefined) {
      Duration.encode(message.downtimeJailDuration, writer.uint32(26).fork()).ldelim();
    }
    if (message.slashFractionDoubleSign.length !== 0) {
      writer.uint32(34).bytes(message.slashFractionDoubleSign);
    }
    if (message.slashFractionDowntime.length !== 0) {
      writer.uint32(42).bytes(message.slashFractionDowntime);
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

          message.signedBlocksWindow = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.minSignedPerWindow = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.downtimeJailDuration = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.slashFractionDoubleSign = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.slashFractionDowntime = reader.bytes();
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
      signedBlocksWindow: isSet(object.signedBlocksWindow) ? Long.fromValue(object.signedBlocksWindow) : Long.ZERO,
      minSignedPerWindow: isSet(object.minSignedPerWindow)
        ? bytesFromBase64(object.minSignedPerWindow)
        : new Uint8Array(0),
      downtimeJailDuration: isSet(object.downtimeJailDuration)
        ? Duration.fromJSON(object.downtimeJailDuration)
        : undefined,
      slashFractionDoubleSign: isSet(object.slashFractionDoubleSign)
        ? bytesFromBase64(object.slashFractionDoubleSign)
        : new Uint8Array(0),
      slashFractionDowntime: isSet(object.slashFractionDowntime)
        ? bytesFromBase64(object.slashFractionDowntime)
        : new Uint8Array(0),
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (!message.signedBlocksWindow.isZero()) {
      obj.signedBlocksWindow = (message.signedBlocksWindow || Long.ZERO).toString();
    }
    if (message.minSignedPerWindow.length !== 0) {
      obj.minSignedPerWindow = base64FromBytes(message.minSignedPerWindow);
    }
    if (message.downtimeJailDuration !== undefined) {
      obj.downtimeJailDuration = Duration.toJSON(message.downtimeJailDuration);
    }
    if (message.slashFractionDoubleSign.length !== 0) {
      obj.slashFractionDoubleSign = base64FromBytes(message.slashFractionDoubleSign);
    }
    if (message.slashFractionDowntime.length !== 0) {
      obj.slashFractionDowntime = base64FromBytes(message.slashFractionDowntime);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.signedBlocksWindow = (object.signedBlocksWindow !== undefined && object.signedBlocksWindow !== null)
      ? Long.fromValue(object.signedBlocksWindow)
      : Long.ZERO;
    message.minSignedPerWindow = object.minSignedPerWindow ?? new Uint8Array(0);
    message.downtimeJailDuration = (object.downtimeJailDuration !== undefined && object.downtimeJailDuration !== null)
      ? Duration.fromPartial(object.downtimeJailDuration)
      : undefined;
    message.slashFractionDoubleSign = object.slashFractionDoubleSign ?? new Uint8Array(0);
    message.slashFractionDowntime = object.slashFractionDowntime ?? new Uint8Array(0);
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
