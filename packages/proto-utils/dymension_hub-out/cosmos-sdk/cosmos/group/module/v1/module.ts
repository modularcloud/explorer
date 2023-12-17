/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../../google/protobuf/duration";

export const protobufPackage = "cosmos.group.module.v1";

/** Module is the config object of the group module. */
export interface Module {
  /**
   * max_execution_period defines the max duration after a proposal's voting period ends that members can send a MsgExec
   * to execute the proposal.
   */
  maxExecutionPeriod:
    | Duration
    | undefined;
  /**
   * MaxMetadataLen defines the max chars allowed in all
   * messages that allows creating or updating a group
   * with a metadata field
   * Defaults to 255 if not explicitly set.
   */
  maxMetadataLen: Long;
  /**
   * MaxProposalTitleLen defines the max chars allowed
   * in string for the MsgSubmitProposal and Proposal
   * summary field
   * Defaults to 255 if not explicitly set.
   */
  maxProposalTitleLen: Long;
  /**
   * MaxProposalSummaryLen defines the max chars allowed
   * in string for the MsgSubmitProposal and Proposal
   * summary field
   * Defaults to 10200 if not explicitly set.
   */
  maxProposalSummaryLen: Long;
}

function createBaseModule(): Module {
  return {
    maxExecutionPeriod: undefined,
    maxMetadataLen: Long.UZERO,
    maxProposalTitleLen: Long.UZERO,
    maxProposalSummaryLen: Long.UZERO,
  };
}

export const Module = {
  encode(message: Module, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxExecutionPeriod !== undefined) {
      Duration.encode(message.maxExecutionPeriod, writer.uint32(10).fork()).ldelim();
    }
    if (!message.maxMetadataLen.isZero()) {
      writer.uint32(16).uint64(message.maxMetadataLen);
    }
    if (!message.maxProposalTitleLen.isZero()) {
      writer.uint32(24).uint64(message.maxProposalTitleLen);
    }
    if (!message.maxProposalSummaryLen.isZero()) {
      writer.uint32(32).uint64(message.maxProposalSummaryLen);
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
          if (tag !== 10) {
            break;
          }

          message.maxExecutionPeriod = Duration.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxMetadataLen = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxProposalTitleLen = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.maxProposalSummaryLen = reader.uint64() as Long;
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
      maxExecutionPeriod: isSet(object.maxExecutionPeriod) ? Duration.fromJSON(object.maxExecutionPeriod) : undefined,
      maxMetadataLen: isSet(object.maxMetadataLen) ? Long.fromValue(object.maxMetadataLen) : Long.UZERO,
      maxProposalTitleLen: isSet(object.maxProposalTitleLen) ? Long.fromValue(object.maxProposalTitleLen) : Long.UZERO,
      maxProposalSummaryLen: isSet(object.maxProposalSummaryLen)
        ? Long.fromValue(object.maxProposalSummaryLen)
        : Long.UZERO,
    };
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    if (message.maxExecutionPeriod !== undefined) {
      obj.maxExecutionPeriod = Duration.toJSON(message.maxExecutionPeriod);
    }
    if (!message.maxMetadataLen.isZero()) {
      obj.maxMetadataLen = (message.maxMetadataLen || Long.UZERO).toString();
    }
    if (!message.maxProposalTitleLen.isZero()) {
      obj.maxProposalTitleLen = (message.maxProposalTitleLen || Long.UZERO).toString();
    }
    if (!message.maxProposalSummaryLen.isZero()) {
      obj.maxProposalSummaryLen = (message.maxProposalSummaryLen || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Module>, I>>(base?: I): Module {
    return Module.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Module>, I>>(object: I): Module {
    const message = createBaseModule();
    message.maxExecutionPeriod = (object.maxExecutionPeriod !== undefined && object.maxExecutionPeriod !== null)
      ? Duration.fromPartial(object.maxExecutionPeriod)
      : undefined;
    message.maxMetadataLen = (object.maxMetadataLen !== undefined && object.maxMetadataLen !== null)
      ? Long.fromValue(object.maxMetadataLen)
      : Long.UZERO;
    message.maxProposalTitleLen = (object.maxProposalTitleLen !== undefined && object.maxProposalTitleLen !== null)
      ? Long.fromValue(object.maxProposalTitleLen)
      : Long.UZERO;
    message.maxProposalSummaryLen =
      (object.maxProposalSummaryLen !== undefined && object.maxProposalSummaryLen !== null)
        ? Long.fromValue(object.maxProposalSummaryLen)
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
