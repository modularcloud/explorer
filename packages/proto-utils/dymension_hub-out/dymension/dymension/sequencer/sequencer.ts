/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Any } from "../../google/protobuf/any";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Description } from "./description";
import { OperatingStatus, operatingStatusFromJSON, operatingStatusToJSON } from "./operating_status";

export const protobufPackage = "dymensionxyz.dymension.sequencer";

/**
 * Sequencer defines a sequencer identified by its' address (sequencerAddress).
 * The sequencer could be attached to only one rollapp (rollappId).
 */
export interface Sequencer {
  /** sequencerAddress is the bech32-encoded address of the sequencer account which is the account that the message was sent from. */
  sequencerAddress: string;
  /** pubkey is the public key of the sequencers' dymint client, as a Protobuf Any. */
  dymintPubKey:
    | Any
    | undefined;
  /** rollappId defines the rollapp to which the sequencer belongs. */
  rollappId: string;
  /** description defines the descriptive terms for the sequencer. */
  description:
    | Description
    | undefined;
  /** jailed defined whether the sequencer has been jailed from bonded status or not. */
  jailed: boolean;
  /** proposer defines whether the sequencer is a proposer or not. */
  proposer: boolean;
  /** status is the sequencer status (bonded/unbonding/unbonded). */
  status: OperatingStatus;
  /** tokens define the delegated tokens (incl. self-delegation). */
  tokens: Coin[];
  /** unbonding_height defines, if unbonding, the height at which this sequencer has begun unbonding. */
  unbondingHeight: Long;
  /** unbond_time defines, if unbonding, the min time for the sequencer to complete unbonding. */
  unbondTime: Date | undefined;
}

function createBaseSequencer(): Sequencer {
  return {
    sequencerAddress: "",
    dymintPubKey: undefined,
    rollappId: "",
    description: undefined,
    jailed: false,
    proposer: false,
    status: 0,
    tokens: [],
    unbondingHeight: Long.ZERO,
    unbondTime: undefined,
  };
}

export const Sequencer = {
  encode(message: Sequencer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequencerAddress !== "") {
      writer.uint32(10).string(message.sequencerAddress);
    }
    if (message.dymintPubKey !== undefined) {
      Any.encode(message.dymintPubKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.rollappId !== "") {
      writer.uint32(26).string(message.rollappId);
    }
    if (message.description !== undefined) {
      Description.encode(message.description, writer.uint32(34).fork()).ldelim();
    }
    if (message.jailed === true) {
      writer.uint32(40).bool(message.jailed);
    }
    if (message.proposer === true) {
      writer.uint32(48).bool(message.proposer);
    }
    if (message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    for (const v of message.tokens) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (!message.unbondingHeight.isZero()) {
      writer.uint32(72).int64(message.unbondingHeight);
    }
    if (message.unbondTime !== undefined) {
      Timestamp.encode(toTimestamp(message.unbondTime), writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sequencer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequencer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencerAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.dymintPubKey = Any.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rollappId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = Description.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.jailed = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.proposer = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.tokens.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.unbondingHeight = reader.int64() as Long;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.unbondTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Sequencer {
    return {
      sequencerAddress: isSet(object.sequencerAddress) ? globalThis.String(object.sequencerAddress) : "",
      dymintPubKey: isSet(object.dymintPubKey) ? Any.fromJSON(object.dymintPubKey) : undefined,
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
      jailed: isSet(object.jailed) ? globalThis.Boolean(object.jailed) : false,
      proposer: isSet(object.proposer) ? globalThis.Boolean(object.proposer) : false,
      status: isSet(object.status) ? operatingStatusFromJSON(object.status) : 0,
      tokens: globalThis.Array.isArray(object?.tokens) ? object.tokens.map((e: any) => Coin.fromJSON(e)) : [],
      unbondingHeight: isSet(object.unbondingHeight) ? Long.fromValue(object.unbondingHeight) : Long.ZERO,
      unbondTime: isSet(object.unbondTime) ? fromJsonTimestamp(object.unbondTime) : undefined,
    };
  },

  toJSON(message: Sequencer): unknown {
    const obj: any = {};
    if (message.sequencerAddress !== "") {
      obj.sequencerAddress = message.sequencerAddress;
    }
    if (message.dymintPubKey !== undefined) {
      obj.dymintPubKey = Any.toJSON(message.dymintPubKey);
    }
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (message.description !== undefined) {
      obj.description = Description.toJSON(message.description);
    }
    if (message.jailed === true) {
      obj.jailed = message.jailed;
    }
    if (message.proposer === true) {
      obj.proposer = message.proposer;
    }
    if (message.status !== 0) {
      obj.status = operatingStatusToJSON(message.status);
    }
    if (message.tokens?.length) {
      obj.tokens = message.tokens.map((e) => Coin.toJSON(e));
    }
    if (!message.unbondingHeight.isZero()) {
      obj.unbondingHeight = (message.unbondingHeight || Long.ZERO).toString();
    }
    if (message.unbondTime !== undefined) {
      obj.unbondTime = message.unbondTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Sequencer>, I>>(base?: I): Sequencer {
    return Sequencer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Sequencer>, I>>(object: I): Sequencer {
    const message = createBaseSequencer();
    message.sequencerAddress = object.sequencerAddress ?? "";
    message.dymintPubKey = (object.dymintPubKey !== undefined && object.dymintPubKey !== null)
      ? Any.fromPartial(object.dymintPubKey)
      : undefined;
    message.rollappId = object.rollappId ?? "";
    message.description = (object.description !== undefined && object.description !== null)
      ? Description.fromPartial(object.description)
      : undefined;
    message.jailed = object.jailed ?? false;
    message.proposer = object.proposer ?? false;
    message.status = object.status ?? 0;
    message.tokens = object.tokens?.map((e) => Coin.fromPartial(e)) || [];
    message.unbondingHeight = (object.unbondingHeight !== undefined && object.unbondingHeight !== null)
      ? Long.fromValue(object.unbondingHeight)
      : Long.ZERO;
    message.unbondTime = object.unbondTime ?? undefined;
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
