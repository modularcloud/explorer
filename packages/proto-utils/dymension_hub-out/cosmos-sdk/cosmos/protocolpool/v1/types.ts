/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.protocolpool.v1";

/** Budget defines the fields of a budget proposal. */
export interface Budget {
  /** recipient_address is the address of the recipient who can claim the budget. */
  recipientAddress: string;
  /** total_budget is the total amount allocated for the budget. */
  totalBudget:
    | Coin
    | undefined;
  /** claimed_amount is the total amount claimed from the total budget amount requested. */
  claimedAmount:
    | Coin
    | undefined;
  /** start_time is the time when the budget becomes claimable. */
  startTime:
    | Date
    | undefined;
  /**
   * next_claim_from is the time when the budget was last successfully claimed or distributed.
   * It is used to track the next starting claim time for fund distribution. If set, it cannot be less than start_time.
   */
  nextClaimFrom:
    | Date
    | undefined;
  /** tranches is the number of times the total budget amount is to be distributed. */
  tranches: Long;
  /** tranches_left is the number of tranches left for the amount to be distributed. */
  tranchesLeft: Long;
  /**
   * Period is the time interval(number of seconds) at which funds distribution should be performed.
   * For example, if a period is set to 3600, it represents an action that
   * should occur every hour (3600 seconds).
   */
  period: Duration | undefined;
}

/** ContinuousFund defines the fields of continuous fund proposal. */
export interface ContinuousFund {
  /** Recipient address of the account receiving funds. */
  recipient: string;
  /** Percentage is the percentage of funds to be allocated from Community pool. */
  percentage: string;
  /** Optional, if expiry is set, removes the state object when expired. */
  expiry: Date | undefined;
}

function createBaseBudget(): Budget {
  return {
    recipientAddress: "",
    totalBudget: undefined,
    claimedAmount: undefined,
    startTime: undefined,
    nextClaimFrom: undefined,
    tranches: Long.UZERO,
    tranchesLeft: Long.UZERO,
    period: undefined,
  };
}

export const Budget = {
  encode(message: Budget, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipientAddress !== "") {
      writer.uint32(10).string(message.recipientAddress);
    }
    if (message.totalBudget !== undefined) {
      Coin.encode(message.totalBudget, writer.uint32(18).fork()).ldelim();
    }
    if (message.claimedAmount !== undefined) {
      Coin.encode(message.claimedAmount, writer.uint32(26).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.nextClaimFrom !== undefined) {
      Timestamp.encode(toTimestamp(message.nextClaimFrom), writer.uint32(42).fork()).ldelim();
    }
    if (!message.tranches.isZero()) {
      writer.uint32(48).uint64(message.tranches);
    }
    if (!message.tranchesLeft.isZero()) {
      writer.uint32(56).uint64(message.tranchesLeft);
    }
    if (message.period !== undefined) {
      Duration.encode(message.period, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Budget {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBudget();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recipientAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.totalBudget = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.claimedAmount = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.nextClaimFrom = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.tranches = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.tranchesLeft = reader.uint64() as Long;
          continue;
        case 8:
          if (tag !== 66) {
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

  fromJSON(object: any): Budget {
    return {
      recipientAddress: isSet(object.recipientAddress) ? globalThis.String(object.recipientAddress) : "",
      totalBudget: isSet(object.totalBudget) ? Coin.fromJSON(object.totalBudget) : undefined,
      claimedAmount: isSet(object.claimedAmount) ? Coin.fromJSON(object.claimedAmount) : undefined,
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      nextClaimFrom: isSet(object.nextClaimFrom) ? fromJsonTimestamp(object.nextClaimFrom) : undefined,
      tranches: isSet(object.tranches) ? Long.fromValue(object.tranches) : Long.UZERO,
      tranchesLeft: isSet(object.tranchesLeft) ? Long.fromValue(object.tranchesLeft) : Long.UZERO,
      period: isSet(object.period) ? Duration.fromJSON(object.period) : undefined,
    };
  },

  toJSON(message: Budget): unknown {
    const obj: any = {};
    if (message.recipientAddress !== "") {
      obj.recipientAddress = message.recipientAddress;
    }
    if (message.totalBudget !== undefined) {
      obj.totalBudget = Coin.toJSON(message.totalBudget);
    }
    if (message.claimedAmount !== undefined) {
      obj.claimedAmount = Coin.toJSON(message.claimedAmount);
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (message.nextClaimFrom !== undefined) {
      obj.nextClaimFrom = message.nextClaimFrom.toISOString();
    }
    if (!message.tranches.isZero()) {
      obj.tranches = (message.tranches || Long.UZERO).toString();
    }
    if (!message.tranchesLeft.isZero()) {
      obj.tranchesLeft = (message.tranchesLeft || Long.UZERO).toString();
    }
    if (message.period !== undefined) {
      obj.period = Duration.toJSON(message.period);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Budget>, I>>(base?: I): Budget {
    return Budget.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Budget>, I>>(object: I): Budget {
    const message = createBaseBudget();
    message.recipientAddress = object.recipientAddress ?? "";
    message.totalBudget = (object.totalBudget !== undefined && object.totalBudget !== null)
      ? Coin.fromPartial(object.totalBudget)
      : undefined;
    message.claimedAmount = (object.claimedAmount !== undefined && object.claimedAmount !== null)
      ? Coin.fromPartial(object.claimedAmount)
      : undefined;
    message.startTime = object.startTime ?? undefined;
    message.nextClaimFrom = object.nextClaimFrom ?? undefined;
    message.tranches = (object.tranches !== undefined && object.tranches !== null)
      ? Long.fromValue(object.tranches)
      : Long.UZERO;
    message.tranchesLeft = (object.tranchesLeft !== undefined && object.tranchesLeft !== null)
      ? Long.fromValue(object.tranchesLeft)
      : Long.UZERO;
    message.period = (object.period !== undefined && object.period !== null)
      ? Duration.fromPartial(object.period)
      : undefined;
    return message;
  },
};

function createBaseContinuousFund(): ContinuousFund {
  return { recipient: "", percentage: "", expiry: undefined };
}

export const ContinuousFund = {
  encode(message: ContinuousFund, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    if (message.percentage !== "") {
      writer.uint32(18).string(message.percentage);
    }
    if (message.expiry !== undefined) {
      Timestamp.encode(toTimestamp(message.expiry), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContinuousFund {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContinuousFund();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.recipient = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.percentage = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): ContinuousFund {
    return {
      recipient: isSet(object.recipient) ? globalThis.String(object.recipient) : "",
      percentage: isSet(object.percentage) ? globalThis.String(object.percentage) : "",
      expiry: isSet(object.expiry) ? fromJsonTimestamp(object.expiry) : undefined,
    };
  },

  toJSON(message: ContinuousFund): unknown {
    const obj: any = {};
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

  create<I extends Exact<DeepPartial<ContinuousFund>, I>>(base?: I): ContinuousFund {
    return ContinuousFund.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ContinuousFund>, I>>(object: I): ContinuousFund {
    const message = createBaseContinuousFund();
    message.recipient = object.recipient ?? "";
    message.percentage = object.percentage ?? "";
    message.expiry = object.expiry ?? undefined;
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
