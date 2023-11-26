/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "celestia.mint.v1";

/** Minter represents the mint state. */
export interface Minter {
  /**
   * InflationRate is the rate at which new tokens should be minted for the
   * current year. For example if InflationRate=0.1, then 10% of the total
   * supply will be minted over the course of the year.
   */
  inflationRate: string;
  /**
   * AnnualProvisions is the total number of tokens to be minted in the current
   * year due to inflation.
   */
  annualProvisions: string;
  /** PreviousBlockTime is the timestamp of the previous block. */
  previousBlockTime:
    | Date
    | undefined;
  /** BondDenom is the denomination of the token that should be minted. */
  bondDenom: string;
}

/** GenesisTime contains the timestamp of the genesis block. */
export interface GenesisTime {
  /** GenesisTime is the timestamp of the genesis block. */
  genesisTime: Date | undefined;
}

function createBaseMinter(): Minter {
  return { inflationRate: "", annualProvisions: "", previousBlockTime: undefined, bondDenom: "" };
}

export const Minter = {
  encode(message: Minter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inflationRate !== "") {
      writer.uint32(10).string(message.inflationRate);
    }
    if (message.annualProvisions !== "") {
      writer.uint32(18).string(message.annualProvisions);
    }
    if (message.previousBlockTime !== undefined) {
      Timestamp.encode(toTimestamp(message.previousBlockTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.bondDenom !== "") {
      writer.uint32(42).string(message.bondDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Minter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMinter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.inflationRate = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.annualProvisions = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.previousBlockTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.bondDenom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Minter {
    return {
      inflationRate: isSet(object.inflationRate) ? globalThis.String(object.inflationRate) : "",
      annualProvisions: isSet(object.annualProvisions) ? globalThis.String(object.annualProvisions) : "",
      previousBlockTime: isSet(object.previousBlockTime) ? fromJsonTimestamp(object.previousBlockTime) : undefined,
      bondDenom: isSet(object.bondDenom) ? globalThis.String(object.bondDenom) : "",
    };
  },

  toJSON(message: Minter): unknown {
    const obj: any = {};
    if (message.inflationRate !== "") {
      obj.inflationRate = message.inflationRate;
    }
    if (message.annualProvisions !== "") {
      obj.annualProvisions = message.annualProvisions;
    }
    if (message.previousBlockTime !== undefined) {
      obj.previousBlockTime = message.previousBlockTime.toISOString();
    }
    if (message.bondDenom !== "") {
      obj.bondDenom = message.bondDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Minter>, I>>(base?: I): Minter {
    return Minter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Minter>, I>>(object: I): Minter {
    const message = createBaseMinter();
    message.inflationRate = object.inflationRate ?? "";
    message.annualProvisions = object.annualProvisions ?? "";
    message.previousBlockTime = object.previousBlockTime ?? undefined;
    message.bondDenom = object.bondDenom ?? "";
    return message;
  },
};

function createBaseGenesisTime(): GenesisTime {
  return { genesisTime: undefined };
}

export const GenesisTime = {
  encode(message: GenesisTime, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.genesisTime !== undefined) {
      Timestamp.encode(toTimestamp(message.genesisTime), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisTime {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisTime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.genesisTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisTime {
    return { genesisTime: isSet(object.genesisTime) ? fromJsonTimestamp(object.genesisTime) : undefined };
  },

  toJSON(message: GenesisTime): unknown {
    const obj: any = {};
    if (message.genesisTime !== undefined) {
      obj.genesisTime = message.genesisTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisTime>, I>>(base?: I): GenesisTime {
    return GenesisTime.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisTime>, I>>(object: I): GenesisTime {
    const message = createBaseGenesisTime();
    message.genesisTime = object.genesisTime ?? undefined;
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
