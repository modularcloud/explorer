/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { CommissionRates, Description } from "../cosmos/staking/v1beta1/staking";
import { Any } from "../google/protobuf/any";

export const protobufPackage = "rollapp.sequencers.types";

/** MsgCreateSequencer defines a SDK message for creating a new sequencer. */
export interface MsgCreateSequencer {
  description: Description | undefined;
  commission: CommissionRates | undefined;
  minSelfDelegation: string;
  delegatorAddress: string;
  sequencerAddress: string;
  pubkey: Any | undefined;
  value: Coin | undefined;
}

/** MsgCreateSequencerResponse defines the Msg/CreateSequencer response type. */
export interface MsgCreateSequencerResponse {
}

function createBaseMsgCreateSequencer(): MsgCreateSequencer {
  return {
    description: undefined,
    commission: undefined,
    minSelfDelegation: "",
    delegatorAddress: "",
    sequencerAddress: "",
    pubkey: undefined,
    value: undefined,
  };
}

export const MsgCreateSequencer = {
  encode(message: MsgCreateSequencer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== undefined) {
      Description.encode(message.description, writer.uint32(10).fork()).ldelim();
    }
    if (message.commission !== undefined) {
      CommissionRates.encode(message.commission, writer.uint32(18).fork()).ldelim();
    }
    if (message.minSelfDelegation !== "") {
      writer.uint32(26).string(message.minSelfDelegation);
    }
    if (message.delegatorAddress !== "") {
      writer.uint32(34).string(message.delegatorAddress);
    }
    if (message.sequencerAddress !== "") {
      writer.uint32(42).string(message.sequencerAddress);
    }
    if (message.pubkey !== undefined) {
      Any.encode(message.pubkey, writer.uint32(50).fork()).ldelim();
    }
    if (message.value !== undefined) {
      Coin.encode(message.value, writer.uint32(58).fork()).ldelim();
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

          message.description = Description.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.commission = CommissionRates.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.minSelfDelegation = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.delegatorAddress = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sequencerAddress = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.pubkey = Any.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.value = Coin.decode(reader, reader.uint32());
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
      description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
      commission: isSet(object.commission) ? CommissionRates.fromJSON(object.commission) : undefined,
      minSelfDelegation: isSet(object.minSelfDelegation) ? globalThis.String(object.minSelfDelegation) : "",
      delegatorAddress: isSet(object.delegatorAddress) ? globalThis.String(object.delegatorAddress) : "",
      sequencerAddress: isSet(object.sequencerAddress) ? globalThis.String(object.sequencerAddress) : "",
      pubkey: isSet(object.pubkey) ? Any.fromJSON(object.pubkey) : undefined,
      value: isSet(object.value) ? Coin.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: MsgCreateSequencer): unknown {
    const obj: any = {};
    if (message.description !== undefined) {
      obj.description = Description.toJSON(message.description);
    }
    if (message.commission !== undefined) {
      obj.commission = CommissionRates.toJSON(message.commission);
    }
    if (message.minSelfDelegation !== "") {
      obj.minSelfDelegation = message.minSelfDelegation;
    }
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.sequencerAddress !== "") {
      obj.sequencerAddress = message.sequencerAddress;
    }
    if (message.pubkey !== undefined) {
      obj.pubkey = Any.toJSON(message.pubkey);
    }
    if (message.value !== undefined) {
      obj.value = Coin.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateSequencer>, I>>(base?: I): MsgCreateSequencer {
    return MsgCreateSequencer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateSequencer>, I>>(object: I): MsgCreateSequencer {
    const message = createBaseMsgCreateSequencer();
    message.description = (object.description !== undefined && object.description !== null)
      ? Description.fromPartial(object.description)
      : undefined;
    message.commission = (object.commission !== undefined && object.commission !== null)
      ? CommissionRates.fromPartial(object.commission)
      : undefined;
    message.minSelfDelegation = object.minSelfDelegation ?? "";
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.sequencerAddress = object.sequencerAddress ?? "";
    message.pubkey = (object.pubkey !== undefined && object.pubkey !== null)
      ? Any.fromPartial(object.pubkey)
      : undefined;
    message.value = (object.value !== undefined && object.value !== null) ? Coin.fromPartial(object.value) : undefined;
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

/** Msg defines the Msg service. */
export interface Msg {
  /**
   * this line is used by starport scaffolding # proto/tx/rpc
   * CreateValidator defines a method for creating a new validator.
   */
  CreateSequencer(request: MsgCreateSequencer): Promise<MsgCreateSequencerResponse>;
}

export const MsgServiceName = "rollapp.sequencers.types.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateSequencer = this.CreateSequencer.bind(this);
  }
  CreateSequencer(request: MsgCreateSequencer): Promise<MsgCreateSequencerResponse> {
    const data = MsgCreateSequencer.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateSequencer", data);
    return promise.then((data) => MsgCreateSequencerResponse.decode(_m0.Reader.create(data)));
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
