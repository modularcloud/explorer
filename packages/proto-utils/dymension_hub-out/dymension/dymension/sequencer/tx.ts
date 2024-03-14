/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Any } from "../../google/protobuf/any";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Description } from "./description";

export const protobufPackage = "dymensionxyz.dymension.sequencer";

/** MsgCreateSequencer defines a SDK message for creating a new sequencer. */
export interface MsgCreateSequencer {
  /** creator is the bech32-encoded address of the sequencer account which is the account that the message was sent from. */
  creator: string;
  /** pubkey is the public key of the sequencers' dymint client, as a Protobuf Any. */
  dymintPubKey:
    | Any
    | undefined;
  /** rollappId defines the rollapp to which the sequencer belongs. */
  rollappId: string;
  /** description defines the descriptive terms for the sequencer. */
  description: Description | undefined;
  bond: Coin | undefined;
}

export interface MsgCreateSequencerResponse {
}

/**
 * MsgUnbond defines a SDK message for performing an undelegation from a
 * bond and a sequencer.
 */
export interface MsgUnbond {
  creator: string;
}

/** MsgUnbondResponse defines the Msg/Unbond response type. */
export interface MsgUnbondResponse {
  completionTime: Date | undefined;
}

function createBaseMsgCreateSequencer(): MsgCreateSequencer {
  return { creator: "", dymintPubKey: undefined, rollappId: "", description: undefined, bond: undefined };
}

export const MsgCreateSequencer = {
  encode(message: MsgCreateSequencer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
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
    if (message.bond !== undefined) {
      Coin.encode(message.bond, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateSequencer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSequencer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
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
          if (tag !== 42) {
            break;
          }

          message.bond = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateSequencer {
    return {
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      dymintPubKey: isSet(object.dymintPubKey) ? Any.fromJSON(object.dymintPubKey) : undefined,
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
      bond: isSet(object.bond) ? Coin.fromJSON(object.bond) : undefined,
    };
  },

  toJSON(message: MsgCreateSequencer): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
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
    if (message.bond !== undefined) {
      obj.bond = Coin.toJSON(message.bond);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateSequencer>, I>>(base?: I): MsgCreateSequencer {
    return MsgCreateSequencer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateSequencer>, I>>(object: I): MsgCreateSequencer {
    const message = createBaseMsgCreateSequencer();
    message.creator = object.creator ?? "";
    message.dymintPubKey = (object.dymintPubKey !== undefined && object.dymintPubKey !== null)
      ? Any.fromPartial(object.dymintPubKey)
      : undefined;
    message.rollappId = object.rollappId ?? "";
    message.description = (object.description !== undefined && object.description !== null)
      ? Description.fromPartial(object.description)
      : undefined;
    message.bond = (object.bond !== undefined && object.bond !== null) ? Coin.fromPartial(object.bond) : undefined;
    return message;
  },
};

function createBaseMsgCreateSequencerResponse(): MsgCreateSequencerResponse {
  return {};
}

export const MsgCreateSequencerResponse = {
  encode(_: MsgCreateSequencerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateSequencerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSequencerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgCreateSequencerResponse {
    return {};
  },

  toJSON(_: MsgCreateSequencerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateSequencerResponse>, I>>(base?: I): MsgCreateSequencerResponse {
    return MsgCreateSequencerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateSequencerResponse>, I>>(_: I): MsgCreateSequencerResponse {
    const message = createBaseMsgCreateSequencerResponse();
    return message;
  },
};

function createBaseMsgUnbond(): MsgUnbond {
  return { creator: "" };
}

export const MsgUnbond = {
  encode(message: MsgUnbond, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnbond {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnbond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUnbond {
    return { creator: isSet(object.creator) ? globalThis.String(object.creator) : "" };
  },

  toJSON(message: MsgUnbond): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnbond>, I>>(base?: I): MsgUnbond {
    return MsgUnbond.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUnbond>, I>>(object: I): MsgUnbond {
    const message = createBaseMsgUnbond();
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseMsgUnbondResponse(): MsgUnbondResponse {
  return { completionTime: undefined };
}

export const MsgUnbondResponse = {
  encode(message: MsgUnbondResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnbondResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnbondResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUnbondResponse {
    return { completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined };
  },

  toJSON(message: MsgUnbondResponse): unknown {
    const obj: any = {};
    if (message.completionTime !== undefined) {
      obj.completionTime = message.completionTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnbondResponse>, I>>(base?: I): MsgUnbondResponse {
    return MsgUnbondResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUnbondResponse>, I>>(object: I): MsgUnbondResponse {
    const message = createBaseMsgUnbondResponse();
    message.completionTime = object.completionTime ?? undefined;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** CreateSequencer defines a method for creating a new sequencer. */
  CreateSequencer(request: MsgCreateSequencer): Promise<MsgCreateSequencerResponse>;
  /** Unbond defines a method for removing coins from sequencer's bond */
  Unbond(request: MsgUnbond): Promise<MsgUnbondResponse>;
}

export const MsgServiceName = "dymensionxyz.dymension.sequencer.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateSequencer = this.CreateSequencer.bind(this);
    this.Unbond = this.Unbond.bind(this);
  }
  CreateSequencer(request: MsgCreateSequencer): Promise<MsgCreateSequencerResponse> {
    const data = MsgCreateSequencer.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateSequencer", data);
    return promise.then((data) => MsgCreateSequencerResponse.decode(_m0.Reader.create(data)));
  }

  Unbond(request: MsgUnbond): Promise<MsgUnbondResponse> {
    const data = MsgUnbond.encode(request).finish();
    const promise = this.rpc.request(this.service, "Unbond", data);
    return promise.then((data) => MsgUnbondResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
