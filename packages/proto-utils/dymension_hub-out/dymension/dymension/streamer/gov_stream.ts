/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";
import { DistrRecord } from "./distr_info";

export const protobufPackage = "dymensionxyz.dymension.streamer";

export interface CreateStreamProposal {
  title: string;
  description: string;
  distributeToRecords: DistrRecord[];
  /** coins are coin(s) to be distributed by the stream */
  coins: Coin[];
  /** start_time is the distribution start time */
  startTime: Date | undefined;
  distrEpochIdentifier: string;
  /**
   * num_epochs_paid_over is the number of epochs distribution will be completed
   * over
   */
  numEpochsPaidOver: Long;
}

export interface TerminateStreamProposal {
  title: string;
  description: string;
  streamId: Long;
}

function createBaseCreateStreamProposal(): CreateStreamProposal {
  return {
    title: "",
    description: "",
    distributeToRecords: [],
    coins: [],
    startTime: undefined,
    distrEpochIdentifier: "",
    numEpochsPaidOver: Long.UZERO,
  };
}

export const CreateStreamProposal = {
  encode(message: CreateStreamProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.distributeToRecords) {
      DistrRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.distrEpochIdentifier !== "") {
      writer.uint32(50).string(message.distrEpochIdentifier);
    }
    if (!message.numEpochsPaidOver.isZero()) {
      writer.uint32(56).uint64(message.numEpochsPaidOver);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateStreamProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateStreamProposal();
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

          message.distributeToRecords.push(DistrRecord.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.distrEpochIdentifier = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.numEpochsPaidOver = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateStreamProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      distributeToRecords: globalThis.Array.isArray(object?.distributeToRecords)
        ? object.distributeToRecords.map((e: any) => DistrRecord.fromJSON(e))
        : [],
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      distrEpochIdentifier: isSet(object.distrEpochIdentifier) ? globalThis.String(object.distrEpochIdentifier) : "",
      numEpochsPaidOver: isSet(object.numEpochsPaidOver) ? Long.fromValue(object.numEpochsPaidOver) : Long.UZERO,
    };
  },

  toJSON(message: CreateStreamProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.distributeToRecords?.length) {
      obj.distributeToRecords = message.distributeToRecords.map((e) => DistrRecord.toJSON(e));
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
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateStreamProposal>, I>>(base?: I): CreateStreamProposal {
    return CreateStreamProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateStreamProposal>, I>>(object: I): CreateStreamProposal {
    const message = createBaseCreateStreamProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.distributeToRecords = object.distributeToRecords?.map((e) => DistrRecord.fromPartial(e)) || [];
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.startTime = object.startTime ?? undefined;
    message.distrEpochIdentifier = object.distrEpochIdentifier ?? "";
    message.numEpochsPaidOver = (object.numEpochsPaidOver !== undefined && object.numEpochsPaidOver !== null)
      ? Long.fromValue(object.numEpochsPaidOver)
      : Long.UZERO;
    return message;
  },
};

function createBaseTerminateStreamProposal(): TerminateStreamProposal {
  return { title: "", description: "", streamId: Long.UZERO };
}

export const TerminateStreamProposal = {
  encode(message: TerminateStreamProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (!message.streamId.isZero()) {
      writer.uint32(32).uint64(message.streamId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TerminateStreamProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTerminateStreamProposal();
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
        case 4:
          if (tag !== 32) {
            break;
          }

          message.streamId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TerminateStreamProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      streamId: isSet(object.streamId) ? Long.fromValue(object.streamId) : Long.UZERO,
    };
  },

  toJSON(message: TerminateStreamProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (!message.streamId.isZero()) {
      obj.streamId = (message.streamId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TerminateStreamProposal>, I>>(base?: I): TerminateStreamProposal {
    return TerminateStreamProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TerminateStreamProposal>, I>>(object: I): TerminateStreamProposal {
    const message = createBaseTerminateStreamProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.streamId = (object.streamId !== undefined && object.streamId !== null)
      ? Long.fromValue(object.streamId)
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
