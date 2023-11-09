/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "celestia.qgb.v1";

/** BridgeValidator represents a validator's ETH address and its power */
export interface BridgeValidator {
  /** Voting power of the validator. */
  power: Long;
  /** EVM address that will be used by the validator to sign messages. */
  evmAddress: string;
}

/**
 * Valset is the EVM Bridge Multsig Set, each Blobstream validator also
 * maintains an ETH key to sign messages, these are used to check signatures on
 * ETH because of the significant gas savings
 */
export interface Valset {
  /**
   * Universal nonce defined under:
   * https://github.com/celestiaorg/celestia-app/pull/464
   */
  nonce: Long;
  /** List of BridgeValidator containing the current validator set. */
  members: BridgeValidator[];
  /** Current chain height */
  height: Long;
  /** Block time where this valset was created */
  time: Date | undefined;
}

/**
 * DataCommitment is the data commitment request message that will be signed
 * using orchestrators.
 * It does not contain a `commitment` field as this message will be created
 * inside the state machine and it doesn't make sense to ask tendermint for the
 * commitment there.
 * The range defined by begin_block and end_block is end exclusive.
 */
export interface DataCommitment {
  /**
   * Universal nonce defined under:
   * https://github.com/celestiaorg/celestia-app/pull/464
   */
  nonce: Long;
  /**
   * First block defining the ordered set of blocks used to create the
   * commitment.
   */
  beginBlock: Long;
  /**
   * End exclusive last block defining the ordered set of blocks used to create
   * the commitment.
   */
  endBlock: Long;
  /** Block time where this data commitment was created */
  time: Date | undefined;
}

function createBaseBridgeValidator(): BridgeValidator {
  return { power: Long.UZERO, evmAddress: "" };
}

export const BridgeValidator = {
  encode(message: BridgeValidator, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.power.isZero()) {
      writer.uint32(8).uint64(message.power);
    }
    if (message.evmAddress !== "") {
      writer.uint32(18).string(message.evmAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BridgeValidator {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBridgeValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.power = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.evmAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BridgeValidator {
    return {
      power: isSet(object.power) ? Long.fromValue(object.power) : Long.UZERO,
      evmAddress: isSet(object.evmAddress) ? globalThis.String(object.evmAddress) : "",
    };
  },

  toJSON(message: BridgeValidator): unknown {
    const obj: any = {};
    if (!message.power.isZero()) {
      obj.power = (message.power || Long.UZERO).toString();
    }
    if (message.evmAddress !== "") {
      obj.evmAddress = message.evmAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BridgeValidator>, I>>(base?: I): BridgeValidator {
    return BridgeValidator.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BridgeValidator>, I>>(object: I): BridgeValidator {
    const message = createBaseBridgeValidator();
    message.power = (object.power !== undefined && object.power !== null) ? Long.fromValue(object.power) : Long.UZERO;
    message.evmAddress = object.evmAddress ?? "";
    return message;
  },
};

function createBaseValset(): Valset {
  return { nonce: Long.UZERO, members: [], height: Long.UZERO, time: undefined };
}

export const Valset = {
  encode(message: Valset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.nonce.isZero()) {
      writer.uint32(8).uint64(message.nonce);
    }
    for (const v of message.members) {
      BridgeValidator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (!message.height.isZero()) {
      writer.uint32(24).uint64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Valset {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nonce = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.members.push(BridgeValidator.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Valset {
    return {
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
      members: globalThis.Array.isArray(object?.members)
        ? object.members.map((e: any) => BridgeValidator.fromJSON(e))
        : [],
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
    };
  },

  toJSON(message: Valset): unknown {
    const obj: any = {};
    if (!message.nonce.isZero()) {
      obj.nonce = (message.nonce || Long.UZERO).toString();
    }
    if (message.members?.length) {
      obj.members = message.members.map((e) => BridgeValidator.toJSON(e));
    }
    if (!message.height.isZero()) {
      obj.height = (message.height || Long.UZERO).toString();
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Valset>, I>>(base?: I): Valset {
    return Valset.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Valset>, I>>(object: I): Valset {
    const message = createBaseValset();
    message.nonce = (object.nonce !== undefined && object.nonce !== null) ? Long.fromValue(object.nonce) : Long.UZERO;
    message.members = object.members?.map((e) => BridgeValidator.fromPartial(e)) || [];
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.UZERO;
    message.time = object.time ?? undefined;
    return message;
  },
};

function createBaseDataCommitment(): DataCommitment {
  return { nonce: Long.UZERO, beginBlock: Long.UZERO, endBlock: Long.UZERO, time: undefined };
}

export const DataCommitment = {
  encode(message: DataCommitment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.nonce.isZero()) {
      writer.uint32(8).uint64(message.nonce);
    }
    if (!message.beginBlock.isZero()) {
      writer.uint32(16).uint64(message.beginBlock);
    }
    if (!message.endBlock.isZero()) {
      writer.uint32(24).uint64(message.endBlock);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataCommitment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataCommitment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nonce = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.beginBlock = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.endBlock = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DataCommitment {
    return {
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
      beginBlock: isSet(object.beginBlock) ? Long.fromValue(object.beginBlock) : Long.UZERO,
      endBlock: isSet(object.endBlock) ? Long.fromValue(object.endBlock) : Long.UZERO,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
    };
  },

  toJSON(message: DataCommitment): unknown {
    const obj: any = {};
    if (!message.nonce.isZero()) {
      obj.nonce = (message.nonce || Long.UZERO).toString();
    }
    if (!message.beginBlock.isZero()) {
      obj.beginBlock = (message.beginBlock || Long.UZERO).toString();
    }
    if (!message.endBlock.isZero()) {
      obj.endBlock = (message.endBlock || Long.UZERO).toString();
    }
    if (message.time !== undefined) {
      obj.time = message.time.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DataCommitment>, I>>(base?: I): DataCommitment {
    return DataCommitment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DataCommitment>, I>>(object: I): DataCommitment {
    const message = createBaseDataCommitment();
    message.nonce = (object.nonce !== undefined && object.nonce !== null) ? Long.fromValue(object.nonce) : Long.UZERO;
    message.beginBlock = (object.beginBlock !== undefined && object.beginBlock !== null)
      ? Long.fromValue(object.beginBlock)
      : Long.UZERO;
    message.endBlock = (object.endBlock !== undefined && object.endBlock !== null)
      ? Long.fromValue(object.endBlock)
      : Long.UZERO;
    message.time = object.time ?? undefined;
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
