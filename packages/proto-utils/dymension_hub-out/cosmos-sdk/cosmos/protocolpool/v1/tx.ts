/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.protocolpool.v1";

/**
 * MsgFundCommunityPool allows an account to directly
 * fund the community pool.
 */
export interface MsgFundCommunityPool {
  amount: Coin[];
  depositor: string;
}

/** MsgFundCommunityPoolResponse defines the Msg/FundCommunityPool response type. */
export interface MsgFundCommunityPoolResponse {
}

/**
 * MsgCommunityPoolSpend defines a message for sending tokens from the community
 * pool to another account. This message is typically executed via a governance
 * proposal with the governance module being the executing authority.
 */
export interface MsgCommunityPoolSpend {
  /** Authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  recipient: string;
  amount: Coin[];
}

/**
 * MsgCommunityPoolSpendResponse defines the response to executing a
 * MsgCommunityPoolSpend message.
 */
export interface MsgCommunityPoolSpendResponse {
}

/** MsgSubmitBudgetProposal defines budget proposal type. */
export interface MsgSubmitBudgetProposal {
  /** Authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** RecipientAddress is the address of the recipient who can claim the budget. */
  recipientAddress: string;
  /** TotalBudget is the total amount allocated for the budget. */
  totalBudget:
    | Coin
    | undefined;
  /**
   * StartTime is the time when the budget becomes claimable.
   * If StartTime is less than the current block time, proposal will not be accepted.
   */
  startTime:
    | Date
    | undefined;
  /** Tranches is the number of times the total budget amount is to be distributed. */
  tranches: Long;
  /**
   * Period is the time interval(number of seconds) at which funds distribution should be performed.
   * For example, if a period is set to 3600, it represents an action that
   * should occur every hour (3600 seconds).
   */
  period: Duration | undefined;
}

/**
 * MsgSubmitBudgetProposalResponse defines the response to executing a
 * MsgSubmitBudgetProposal message.
 */
export interface MsgSubmitBudgetProposalResponse {
}

/** MsgClaimBudget defines a message for claiming the distributed budget. */
export interface MsgClaimBudget {
  recipientAddress: string;
}

/**
 * MsgClaimBudgetResponse defines the response to executing a
 * MsgClaimBudget message.
 */
export interface MsgClaimBudgetResponse {
  amount: Coin | undefined;
}

/** MsgCreateContinuousFund defines a message for adding continuous funds. */
export interface MsgCreateContinuousFund {
  /** Authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** Recipient address of the account receiving funds. */
  recipient: string;
  /** Percentage is the percentage of funds to be allocated from Community pool. */
  percentage: string;
  /** Optional, if expiry is set, removes the state object when expired. */
  expiry: Date | undefined;
}

/**
 * MsgCreateContinuousFundResponse defines the response to executing a
 * MsgCreateContinuousFund message.
 */
export interface MsgCreateContinuousFundResponse {
}

/** MsgCancelContinuousFund defines a message to cancel continuous funds for a specific recipient. */
export interface MsgCancelContinuousFund {
  /** Authority is the account address of authority. */
  authority: string;
  /** RecipientAddress is the account address of recipient whose funds are to be cancelled. */
  recipientAddress: string;
}

/**
 * MsgCancelContinuousFundResponse defines the response to executing a
 * MsgCancelContinuousFund message.
 */
export interface MsgCancelContinuousFundResponse {
  /** CanceledTime is the canceled time. */
  canceledTime:
    | Date
    | undefined;
  /** CanceledHeight defines the canceled block height. */
  canceledHeight: Long;
  /** RecipientAddress is the account address of recipient whose funds are cancelled. */
  recipientAddress: string;
  /**
   * withdrawnAllocatedFund represents the fund allocated to this recipient (if any) that have not been withdrawn yet,
   * before a cancellation request has been initiated.
   * It involves first withdrawing the funds and then canceling the request.
   */
  withdrawnAllocatedFund: Coin | undefined;
}

/** MsgWithdrawContinuousFund defines a message for withdrawing the continuous fund allocated to it. */
export interface MsgWithdrawContinuousFund {
  recipientAddress: string;
}

/**
 * MsgWithdrawContinuousFundResponse defines the response to executing a
 * MsgWithdrawContinuousFund message.
 */
export interface MsgWithdrawContinuousFundResponse {
  amount: Coin | undefined;
}

function createBaseMsgFundCommunityPool(): MsgFundCommunityPool {
  return { amount: [], depositor: "" };
}

export const MsgFundCommunityPool = {
  encode(message: MsgFundCommunityPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.depositor !== "") {
      writer.uint32(18).string(message.depositor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFundCommunityPool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundCommunityPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.depositor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgFundCommunityPool {
    return {
      amount: globalThis.Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
      depositor: isSet(object.depositor) ? globalThis.String(object.depositor) : "",
    };
  },

  toJSON(message: MsgFundCommunityPool): unknown {
    const obj: any = {};
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    if (message.depositor !== "") {
      obj.depositor = message.depositor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFundCommunityPool>, I>>(base?: I): MsgFundCommunityPool {
    return MsgFundCommunityPool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgFundCommunityPool>, I>>(object: I): MsgFundCommunityPool {
    const message = createBaseMsgFundCommunityPool();
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.depositor = object.depositor ?? "";
    return message;
  },
};

function createBaseMsgFundCommunityPoolResponse(): MsgFundCommunityPoolResponse {
  return {};
}

export const MsgFundCommunityPoolResponse = {
  encode(_: MsgFundCommunityPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFundCommunityPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundCommunityPoolResponse();
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

  fromJSON(_: any): MsgFundCommunityPoolResponse {
    return {};
  },

  toJSON(_: MsgFundCommunityPoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFundCommunityPoolResponse>, I>>(base?: I): MsgFundCommunityPoolResponse {
    return MsgFundCommunityPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgFundCommunityPoolResponse>, I>>(_: I): MsgFundCommunityPoolResponse {
    const message = createBaseMsgFundCommunityPoolResponse();
    return message;
  },
};

function createBaseMsgCommunityPoolSpend(): MsgCommunityPoolSpend {
  return { authority: "", recipient: "", amount: [] };
}

export const MsgCommunityPoolSpend = {
  encode(message: MsgCommunityPoolSpend, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCommunityPoolSpend {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCommunityPoolSpend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.recipient = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCommunityPoolSpend {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      recipient: isSet(object.recipient) ? globalThis.String(object.recipient) : "",
      amount: globalThis.Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgCommunityPoolSpend): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCommunityPoolSpend>, I>>(base?: I): MsgCommunityPoolSpend {
    return MsgCommunityPoolSpend.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCommunityPoolSpend>, I>>(object: I): MsgCommunityPoolSpend {
    const message = createBaseMsgCommunityPoolSpend();
    message.authority = object.authority ?? "";
    message.recipient = object.recipient ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgCommunityPoolSpendResponse(): MsgCommunityPoolSpendResponse {
  return {};
}

export const MsgCommunityPoolSpendResponse = {
  encode(_: MsgCommunityPoolSpendResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCommunityPoolSpendResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCommunityPoolSpendResponse();
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

  fromJSON(_: any): MsgCommunityPoolSpendResponse {
    return {};
  },

  toJSON(_: MsgCommunityPoolSpendResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCommunityPoolSpendResponse>, I>>(base?: I): MsgCommunityPoolSpendResponse {
    return MsgCommunityPoolSpendResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCommunityPoolSpendResponse>, I>>(_: I): MsgCommunityPoolSpendResponse {
    const message = createBaseMsgCommunityPoolSpendResponse();
    return message;
  },
};

function createBaseMsgSubmitBudgetProposal(): MsgSubmitBudgetProposal {
  return {
    authority: "",
    recipientAddress: "",
    totalBudget: undefined,
    startTime: undefined,
    tranches: Long.UZERO,
    period: undefined,
  };
}

export const MsgSubmitBudgetProposal = {
  encode(message: MsgSubmitBudgetProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.recipientAddress !== "") {
      writer.uint32(18).string(message.recipientAddress);
    }
    if (message.totalBudget !== undefined) {
      Coin.encode(message.totalBudget, writer.uint32(26).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(34).fork()).ldelim();
    }
    if (!message.tranches.isZero()) {
      writer.uint32(40).uint64(message.tranches);
    }
    if (message.period !== undefined) {
      Duration.encode(message.period, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitBudgetProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitBudgetProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.recipientAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.totalBudget = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.tranches = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.period = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitBudgetProposal {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      recipientAddress: isSet(object.recipientAddress) ? globalThis.String(object.recipientAddress) : "",
      totalBudget: isSet(object.totalBudget) ? Coin.fromJSON(object.totalBudget) : undefined,
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      tranches: isSet(object.tranches) ? Long.fromValue(object.tranches) : Long.UZERO,
      period: isSet(object.period) ? Duration.fromJSON(object.period) : undefined,
    };
  },

  toJSON(message: MsgSubmitBudgetProposal): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.recipientAddress !== "") {
      obj.recipientAddress = message.recipientAddress;
    }
    if (message.totalBudget !== undefined) {
      obj.totalBudget = Coin.toJSON(message.totalBudget);
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (!message.tranches.isZero()) {
      obj.tranches = (message.tranches || Long.UZERO).toString();
    }
    if (message.period !== undefined) {
      obj.period = Duration.toJSON(message.period);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSubmitBudgetProposal>, I>>(base?: I): MsgSubmitBudgetProposal {
    return MsgSubmitBudgetProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSubmitBudgetProposal>, I>>(object: I): MsgSubmitBudgetProposal {
    const message = createBaseMsgSubmitBudgetProposal();
    message.authority = object.authority ?? "";
    message.recipientAddress = object.recipientAddress ?? "";
    message.totalBudget = (object.totalBudget !== undefined && object.totalBudget !== null)
      ? Coin.fromPartial(object.totalBudget)
      : undefined;
    message.startTime = object.startTime ?? undefined;
    message.tranches = (object.tranches !== undefined && object.tranches !== null)
      ? Long.fromValue(object.tranches)
      : Long.UZERO;
    message.period = (object.period !== undefined && object.period !== null)
      ? Duration.fromPartial(object.period)
      : undefined;
    return message;
  },
};

function createBaseMsgSubmitBudgetProposalResponse(): MsgSubmitBudgetProposalResponse {
  return {};
}

export const MsgSubmitBudgetProposalResponse = {
  encode(_: MsgSubmitBudgetProposalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitBudgetProposalResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitBudgetProposalResponse();
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

  fromJSON(_: any): MsgSubmitBudgetProposalResponse {
    return {};
  },

  toJSON(_: MsgSubmitBudgetProposalResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSubmitBudgetProposalResponse>, I>>(base?: I): MsgSubmitBudgetProposalResponse {
    return MsgSubmitBudgetProposalResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSubmitBudgetProposalResponse>, I>>(_: I): MsgSubmitBudgetProposalResponse {
    const message = createBaseMsgSubmitBudgetProposalResponse();
    return message;
  },
};

function createBaseMsgClaimBudget(): MsgClaimBudget {
  return { recipientAddress: "" };
}

export const MsgClaimBudget = {
  encode(message: MsgClaimBudget, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipientAddress !== "") {
      writer.uint32(10).string(message.recipientAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimBudget {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimBudget();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recipientAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgClaimBudget {
    return { recipientAddress: isSet(object.recipientAddress) ? globalThis.String(object.recipientAddress) : "" };
  },

  toJSON(message: MsgClaimBudget): unknown {
    const obj: any = {};
    if (message.recipientAddress !== "") {
      obj.recipientAddress = message.recipientAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimBudget>, I>>(base?: I): MsgClaimBudget {
    return MsgClaimBudget.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgClaimBudget>, I>>(object: I): MsgClaimBudget {
    const message = createBaseMsgClaimBudget();
    message.recipientAddress = object.recipientAddress ?? "";
    return message;
  },
};

function createBaseMsgClaimBudgetResponse(): MsgClaimBudgetResponse {
  return { amount: undefined };
}

export const MsgClaimBudgetResponse = {
  encode(message: MsgClaimBudgetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgClaimBudgetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimBudgetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgClaimBudgetResponse {
    return { amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined };
  },

  toJSON(message: MsgClaimBudgetResponse): unknown {
    const obj: any = {};
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgClaimBudgetResponse>, I>>(base?: I): MsgClaimBudgetResponse {
    return MsgClaimBudgetResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgClaimBudgetResponse>, I>>(object: I): MsgClaimBudgetResponse {
    const message = createBaseMsgClaimBudgetResponse();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

function createBaseMsgCreateContinuousFund(): MsgCreateContinuousFund {
  return { authority: "", recipient: "", percentage: "", expiry: undefined };
}

export const MsgCreateContinuousFund = {
  encode(message: MsgCreateContinuousFund, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    if (message.percentage !== "") {
      writer.uint32(26).string(message.percentage);
    }
    if (message.expiry !== undefined) {
      Timestamp.encode(toTimestamp(message.expiry), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateContinuousFund {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateContinuousFund();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.recipient = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.percentage = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.expiry = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateContinuousFund {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      recipient: isSet(object.recipient) ? globalThis.String(object.recipient) : "",
      percentage: isSet(object.percentage) ? globalThis.String(object.percentage) : "",
      expiry: isSet(object.expiry) ? fromJsonTimestamp(object.expiry) : undefined,
    };
  },

  toJSON(message: MsgCreateContinuousFund): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    if (message.percentage !== "") {
      obj.percentage = message.percentage;
    }
    if (message.expiry !== undefined) {
      obj.expiry = message.expiry.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateContinuousFund>, I>>(base?: I): MsgCreateContinuousFund {
    return MsgCreateContinuousFund.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateContinuousFund>, I>>(object: I): MsgCreateContinuousFund {
    const message = createBaseMsgCreateContinuousFund();
    message.authority = object.authority ?? "";
    message.recipient = object.recipient ?? "";
    message.percentage = object.percentage ?? "";
    message.expiry = object.expiry ?? undefined;
    return message;
  },
};

function createBaseMsgCreateContinuousFundResponse(): MsgCreateContinuousFundResponse {
  return {};
}

export const MsgCreateContinuousFundResponse = {
  encode(_: MsgCreateContinuousFundResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateContinuousFundResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateContinuousFundResponse();
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

  fromJSON(_: any): MsgCreateContinuousFundResponse {
    return {};
  },

  toJSON(_: MsgCreateContinuousFundResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateContinuousFundResponse>, I>>(base?: I): MsgCreateContinuousFundResponse {
    return MsgCreateContinuousFundResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateContinuousFundResponse>, I>>(_: I): MsgCreateContinuousFundResponse {
    const message = createBaseMsgCreateContinuousFundResponse();
    return message;
  },
};

function createBaseMsgCancelContinuousFund(): MsgCancelContinuousFund {
  return { authority: "", recipientAddress: "" };
}

export const MsgCancelContinuousFund = {
  encode(message: MsgCancelContinuousFund, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.recipientAddress !== "") {
      writer.uint32(18).string(message.recipientAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelContinuousFund {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelContinuousFund();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.recipientAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCancelContinuousFund {
    return {
      authority: isSet(object.authority) ? globalThis.String(object.authority) : "",
      recipientAddress: isSet(object.recipientAddress) ? globalThis.String(object.recipientAddress) : "",
    };
  },

  toJSON(message: MsgCancelContinuousFund): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.recipientAddress !== "") {
      obj.recipientAddress = message.recipientAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCancelContinuousFund>, I>>(base?: I): MsgCancelContinuousFund {
    return MsgCancelContinuousFund.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCancelContinuousFund>, I>>(object: I): MsgCancelContinuousFund {
    const message = createBaseMsgCancelContinuousFund();
    message.authority = object.authority ?? "";
    message.recipientAddress = object.recipientAddress ?? "";
    return message;
  },
};

function createBaseMsgCancelContinuousFundResponse(): MsgCancelContinuousFundResponse {
  return {
    canceledTime: undefined,
    canceledHeight: Long.UZERO,
    recipientAddress: "",
    withdrawnAllocatedFund: undefined,
  };
}

export const MsgCancelContinuousFundResponse = {
  encode(message: MsgCancelContinuousFundResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.canceledTime !== undefined) {
      Timestamp.encode(toTimestamp(message.canceledTime), writer.uint32(10).fork()).ldelim();
    }
    if (!message.canceledHeight.isZero()) {
      writer.uint32(16).uint64(message.canceledHeight);
    }
    if (message.recipientAddress !== "") {
      writer.uint32(26).string(message.recipientAddress);
    }
    if (message.withdrawnAllocatedFund !== undefined) {
      Coin.encode(message.withdrawnAllocatedFund, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelContinuousFundResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelContinuousFundResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.canceledTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.canceledHeight = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.recipientAddress = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.withdrawnAllocatedFund = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCancelContinuousFundResponse {
    return {
      canceledTime: isSet(object.canceledTime) ? fromJsonTimestamp(object.canceledTime) : undefined,
      canceledHeight: isSet(object.canceledHeight) ? Long.fromValue(object.canceledHeight) : Long.UZERO,
      recipientAddress: isSet(object.recipientAddress) ? globalThis.String(object.recipientAddress) : "",
      withdrawnAllocatedFund: isSet(object.withdrawnAllocatedFund)
        ? Coin.fromJSON(object.withdrawnAllocatedFund)
        : undefined,
    };
  },

  toJSON(message: MsgCancelContinuousFundResponse): unknown {
    const obj: any = {};
    if (message.canceledTime !== undefined) {
      obj.canceledTime = message.canceledTime.toISOString();
    }
    if (!message.canceledHeight.isZero()) {
      obj.canceledHeight = (message.canceledHeight || Long.UZERO).toString();
    }
    if (message.recipientAddress !== "") {
      obj.recipientAddress = message.recipientAddress;
    }
    if (message.withdrawnAllocatedFund !== undefined) {
      obj.withdrawnAllocatedFund = Coin.toJSON(message.withdrawnAllocatedFund);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCancelContinuousFundResponse>, I>>(base?: I): MsgCancelContinuousFundResponse {
    return MsgCancelContinuousFundResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCancelContinuousFundResponse>, I>>(
    object: I,
  ): MsgCancelContinuousFundResponse {
    const message = createBaseMsgCancelContinuousFundResponse();
    message.canceledTime = object.canceledTime ?? undefined;
    message.canceledHeight = (object.canceledHeight !== undefined && object.canceledHeight !== null)
      ? Long.fromValue(object.canceledHeight)
      : Long.UZERO;
    message.recipientAddress = object.recipientAddress ?? "";
    message.withdrawnAllocatedFund =
      (object.withdrawnAllocatedFund !== undefined && object.withdrawnAllocatedFund !== null)
        ? Coin.fromPartial(object.withdrawnAllocatedFund)
        : undefined;
    return message;
  },
};

function createBaseMsgWithdrawContinuousFund(): MsgWithdrawContinuousFund {
  return { recipientAddress: "" };
}

export const MsgWithdrawContinuousFund = {
  encode(message: MsgWithdrawContinuousFund, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipientAddress !== "") {
      writer.uint32(10).string(message.recipientAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawContinuousFund {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawContinuousFund();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recipientAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawContinuousFund {
    return { recipientAddress: isSet(object.recipientAddress) ? globalThis.String(object.recipientAddress) : "" };
  },

  toJSON(message: MsgWithdrawContinuousFund): unknown {
    const obj: any = {};
    if (message.recipientAddress !== "") {
      obj.recipientAddress = message.recipientAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgWithdrawContinuousFund>, I>>(base?: I): MsgWithdrawContinuousFund {
    return MsgWithdrawContinuousFund.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgWithdrawContinuousFund>, I>>(object: I): MsgWithdrawContinuousFund {
    const message = createBaseMsgWithdrawContinuousFund();
    message.recipientAddress = object.recipientAddress ?? "";
    return message;
  },
};

function createBaseMsgWithdrawContinuousFundResponse(): MsgWithdrawContinuousFundResponse {
  return { amount: undefined };
}

export const MsgWithdrawContinuousFundResponse = {
  encode(message: MsgWithdrawContinuousFundResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawContinuousFundResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawContinuousFundResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawContinuousFundResponse {
    return { amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined };
  },

  toJSON(message: MsgWithdrawContinuousFundResponse): unknown {
    const obj: any = {};
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgWithdrawContinuousFundResponse>, I>>(
    base?: I,
  ): MsgWithdrawContinuousFundResponse {
    return MsgWithdrawContinuousFundResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgWithdrawContinuousFundResponse>, I>>(
    object: I,
  ): MsgWithdrawContinuousFundResponse {
    const message = createBaseMsgWithdrawContinuousFundResponse();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

/** Msg defines the pool Msg service. */
export interface Msg {
  /**
   * FundCommunityPool defines a method to allow an account to directly
   * fund the community pool.
   */
  FundCommunityPool(request: MsgFundCommunityPool): Promise<MsgFundCommunityPoolResponse>;
  /**
   * CommunityPoolSpend defines a governance operation for sending tokens from
   * the community pool in the x/protocolpool module to another account, which
   * could be the governance module itself. The authority is defined in the
   * keeper.
   */
  CommunityPoolSpend(request: MsgCommunityPoolSpend): Promise<MsgCommunityPoolSpendResponse>;
  /** SubmitBudgetProposal defines a method to set a budget proposal. */
  SubmitBudgetProposal(request: MsgSubmitBudgetProposal): Promise<MsgSubmitBudgetProposalResponse>;
  /** ClaimBudget defines a method to claim the distributed budget. */
  ClaimBudget(request: MsgClaimBudget): Promise<MsgClaimBudgetResponse>;
  /** CreateContinuousFund defines a method to add funds continuously. */
  CreateContinuousFund(request: MsgCreateContinuousFund): Promise<MsgCreateContinuousFundResponse>;
  /** WithdrawContinuousFund defines a method to withdraw continuous fund allocated. */
  WithdrawContinuousFund(request: MsgWithdrawContinuousFund): Promise<MsgWithdrawContinuousFundResponse>;
  /** CancelContinuousFund defines a method for cancelling continuous fund. */
  CancelContinuousFund(request: MsgCancelContinuousFund): Promise<MsgCancelContinuousFundResponse>;
}

export const MsgServiceName = "cosmos.protocolpool.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.FundCommunityPool = this.FundCommunityPool.bind(this);
    this.CommunityPoolSpend = this.CommunityPoolSpend.bind(this);
    this.SubmitBudgetProposal = this.SubmitBudgetProposal.bind(this);
    this.ClaimBudget = this.ClaimBudget.bind(this);
    this.CreateContinuousFund = this.CreateContinuousFund.bind(this);
    this.WithdrawContinuousFund = this.WithdrawContinuousFund.bind(this);
    this.CancelContinuousFund = this.CancelContinuousFund.bind(this);
  }
  FundCommunityPool(request: MsgFundCommunityPool): Promise<MsgFundCommunityPoolResponse> {
    const data = MsgFundCommunityPool.encode(request).finish();
    const promise = this.rpc.request(this.service, "FundCommunityPool", data);
    return promise.then((data) => MsgFundCommunityPoolResponse.decode(_m0.Reader.create(data)));
  }

  CommunityPoolSpend(request: MsgCommunityPoolSpend): Promise<MsgCommunityPoolSpendResponse> {
    const data = MsgCommunityPoolSpend.encode(request).finish();
    const promise = this.rpc.request(this.service, "CommunityPoolSpend", data);
    return promise.then((data) => MsgCommunityPoolSpendResponse.decode(_m0.Reader.create(data)));
  }

  SubmitBudgetProposal(request: MsgSubmitBudgetProposal): Promise<MsgSubmitBudgetProposalResponse> {
    const data = MsgSubmitBudgetProposal.encode(request).finish();
    const promise = this.rpc.request(this.service, "SubmitBudgetProposal", data);
    return promise.then((data) => MsgSubmitBudgetProposalResponse.decode(_m0.Reader.create(data)));
  }

  ClaimBudget(request: MsgClaimBudget): Promise<MsgClaimBudgetResponse> {
    const data = MsgClaimBudget.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClaimBudget", data);
    return promise.then((data) => MsgClaimBudgetResponse.decode(_m0.Reader.create(data)));
  }

  CreateContinuousFund(request: MsgCreateContinuousFund): Promise<MsgCreateContinuousFundResponse> {
    const data = MsgCreateContinuousFund.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateContinuousFund", data);
    return promise.then((data) => MsgCreateContinuousFundResponse.decode(_m0.Reader.create(data)));
  }

  WithdrawContinuousFund(request: MsgWithdrawContinuousFund): Promise<MsgWithdrawContinuousFundResponse> {
    const data = MsgWithdrawContinuousFund.encode(request).finish();
    const promise = this.rpc.request(this.service, "WithdrawContinuousFund", data);
    return promise.then((data) => MsgWithdrawContinuousFundResponse.decode(_m0.Reader.create(data)));
  }

  CancelContinuousFund(request: MsgCancelContinuousFund): Promise<MsgCancelContinuousFundResponse> {
    const data = MsgCancelContinuousFund.encode(request).finish();
    const promise = this.rpc.request(this.service, "CancelContinuousFund", data);
    return promise.then((data) => MsgCancelContinuousFundResponse.decode(_m0.Reader.create(data)));
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
