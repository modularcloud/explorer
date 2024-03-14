/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
import { Description } from "./description";

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
  rollappIDs: string[];
  /** description defines the descriptive terms for the sequencer. */
  description: Description | undefined;
}

function createBaseSequencer(): Sequencer {
  return { sequencerAddress: "", dymintPubKey: undefined, rollappIDs: [], description: undefined };
}

export const Sequencer = {
  encode(message: Sequencer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequencerAddress !== "") {
      writer.uint32(10).string(message.sequencerAddress);
    }
    if (message.dymintPubKey !== undefined) {
      Any.encode(message.dymintPubKey, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.rollappIDs) {
      writer.uint32(26).string(v!);
    }
    if (message.description !== undefined) {
      Description.encode(message.description, writer.uint32(34).fork()).ldelim();
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

          message.rollappIDs.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = Description.decode(reader, reader.uint32());
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
      rollappIDs: globalThis.Array.isArray(object?.rollappIDs)
        ? object.rollappIDs.map((e: any) => globalThis.String(e))
        : [],
      description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
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
    if (message.rollappIDs?.length) {
      obj.rollappIDs = message.rollappIDs;
    }
    if (message.description !== undefined) {
      obj.description = Description.toJSON(message.description);
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
    message.rollappIDs = object.rollappIDs?.map((e) => e) || [];
    message.description = (object.description !== undefined && object.description !== null)
      ? Description.fromPartial(object.description)
      : undefined;
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
