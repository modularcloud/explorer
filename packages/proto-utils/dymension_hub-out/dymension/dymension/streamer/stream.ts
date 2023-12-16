/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";
import { DistrInfo } from "./distr_info";

export const protobufPackage = "dymensionxyz.dymension.streamer";

/**
 * Stream is an object that stores and distributes yields to recipients who
 * satisfy certain conditions. Currently streams support conditions around the
 * duration for which a given denom is locked.
 */
export interface Stream {
  /** id is the unique ID of a Stream */
  id: Long;
  /** distribute_to is the distr_info. */
  distributeTo:
    | DistrInfo
    | undefined;
  /**
   * coins is the total amount of coins that have been in the stream
   * Can distribute multiple coin denoms
   */
  coins: Coin[];
  /** start_time is the distribution start time */
  startTime:
    | Date
    | undefined;
  /**
   * distr_epoch_identifier is what epoch type di-stribution will be triggered by
   * (day, week, etc.)
   */
  distrEpochIdentifier: string;
  /**
   * num_epochs_paid_over is the number of total epochs distribution will be
   * completed over
   */
  numEpochsPaidOver: Long;
  /**
   * filled_epochs is the number of epochs distribution has been completed on
   * already
   */
  filledEpochs: Long;
  /** distributed_coins are coins that have been distributed already */
  distributedCoins: Coin[];
}

function createBaseStream(): Stream {
  return {
    id: Long.UZERO,
    distributeTo: undefined,
    coins: [],
    startTime: undefined,
    distrEpochIdentifier: "",
    numEpochsPaidOver: Long.UZERO,
    filledEpochs: Long.UZERO,
    distributedCoins: [],
  };
}

export const Stream = {
  encode(message: Stream, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.distributeTo !== undefined) {
      DistrInfo.encode(message.distributeTo, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.distrEpochIdentifier !== "") {
      writer.uint32(42).string(message.distrEpochIdentifier);
    }
    if (!message.numEpochsPaidOver.isZero()) {
      writer.uint32(48).uint64(message.numEpochsPaidOver);
    }
    if (!message.filledEpochs.isZero()) {
      writer.uint32(56).uint64(message.filledEpochs);
    }
    for (const v of message.distributedCoins) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Stream {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStream();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.distributeTo = DistrInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
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

          message.distrEpochIdentifier = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.numEpochsPaidOver = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.filledEpochs = reader.uint64() as Long;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.distributedCoins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Stream {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      distributeTo: isSet(object.distributeTo) ? DistrInfo.fromJSON(object.distributeTo) : undefined,
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      distrEpochIdentifier: isSet(object.distrEpochIdentifier) ? globalThis.String(object.distrEpochIdentifier) : "",
      numEpochsPaidOver: isSet(object.numEpochsPaidOver) ? Long.fromValue(object.numEpochsPaidOver) : Long.UZERO,
      filledEpochs: isSet(object.filledEpochs) ? Long.fromValue(object.filledEpochs) : Long.UZERO,
      distributedCoins: globalThis.Array.isArray(object?.distributedCoins)
        ? object.distributedCoins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Stream): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    if (message.distributeTo !== undefined) {
      obj.distributeTo = DistrInfo.toJSON(message.distributeTo);
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (message.distrEpochIdentifier !== "") {
      obj.distrEpochIdentifier = message.distrEpochIdentifier;
    }
    if (!message.numEpochsPaidOver.isZero()) {
      obj.numEpochsPaidOver = (message.numEpochsPaidOver || Long.UZERO).toString();
    }
    if (!message.filledEpochs.isZero()) {
      obj.filledEpochs = (message.filledEpochs || Long.UZERO).toString();
    }
    if (message.distributedCoins?.length) {
      obj.distributedCoins = message.distributedCoins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Stream>, I>>(base?: I): Stream {
    return Stream.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Stream>, I>>(object: I): Stream {
    const message = createBaseStream();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    message.distributeTo = (object.distributeTo !== undefined && object.distributeTo !== null)
      ? DistrInfo.fromPartial(object.distributeTo)
      : undefined;
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.startTime = object.startTime ?? undefined;
    message.distrEpochIdentifier = object.distrEpochIdentifier ?? "";
    message.numEpochsPaidOver = (object.numEpochsPaidOver !== undefined && object.numEpochsPaidOver !== null)
      ? Long.fromValue(object.numEpochsPaidOver)
      : Long.UZERO;
    message.filledEpochs = (object.filledEpochs !== undefined && object.filledEpochs !== null)
      ? Long.fromValue(object.filledEpochs)
      : Long.UZERO;
    message.distributedCoins = object.distributedCoins?.map((e) => Coin.fromPartial(e)) || [];
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
