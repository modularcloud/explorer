/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dymensionxyz.dymension.rollapp";

export interface SubmitFraudProposal {
  title: string;
  description: string;
  /** The rollapp id */
  rollappId: string;
  /** The ibc client id of the rollapp */
  ibcClientId: string;
  /** The height of the fraudelent block */
  fraudelentHeight: Long;
  /** The address of the fraudelent sequencer */
  fraudelentSequencerAddress: string;
}

function createBaseSubmitFraudProposal(): SubmitFraudProposal {
  return {
    title: "",
    description: "",
    rollappId: "",
    ibcClientId: "",
    fraudelentHeight: Long.UZERO,
    fraudelentSequencerAddress: "",
  };
}

export const SubmitFraudProposal = {
  encode(message: SubmitFraudProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.rollappId !== "") {
      writer.uint32(26).string(message.rollappId);
    }
    if (message.ibcClientId !== "") {
      writer.uint32(34).string(message.ibcClientId);
    }
    if (!message.fraudelentHeight.isZero()) {
      writer.uint32(40).uint64(message.fraudelentHeight);
    }
    if (message.fraudelentSequencerAddress !== "") {
      writer.uint32(50).string(message.fraudelentSequencerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubmitFraudProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubmitFraudProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
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

          message.ibcClientId = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.fraudelentHeight = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.fraudelentSequencerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SubmitFraudProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      ibcClientId: isSet(object.ibcClientId) ? globalThis.String(object.ibcClientId) : "",
      fraudelentHeight: isSet(object.fraudelentHeight) ? Long.fromValue(object.fraudelentHeight) : Long.UZERO,
      fraudelentSequencerAddress: isSet(object.fraudelentSequencerAddress)
        ? globalThis.String(object.fraudelentSequencerAddress)
        : "",
    };
  },

  toJSON(message: SubmitFraudProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (message.ibcClientId !== "") {
      obj.ibcClientId = message.ibcClientId;
    }
    if (!message.fraudelentHeight.isZero()) {
      obj.fraudelentHeight = (message.fraudelentHeight || Long.UZERO).toString();
    }
    if (message.fraudelentSequencerAddress !== "") {
      obj.fraudelentSequencerAddress = message.fraudelentSequencerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SubmitFraudProposal>, I>>(base?: I): SubmitFraudProposal {
    return SubmitFraudProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SubmitFraudProposal>, I>>(object: I): SubmitFraudProposal {
    const message = createBaseSubmitFraudProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.rollappId = object.rollappId ?? "";
    message.ibcClientId = object.ibcClientId ?? "";
    message.fraudelentHeight = (object.fraudelentHeight !== undefined && object.fraudelentHeight !== null)
      ? Long.fromValue(object.fraudelentHeight)
      : Long.UZERO;
    message.fraudelentSequencerAddress = object.fraudelentSequencerAddress ?? "";
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
