/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "rollapp.mint.v1beta1";

/** Minter represents the minting state. */
export interface Minter {
  /** current epoch provisions */
  epochProvisions: string;
}

/** Params holds parameters for the mint module. */
export interface Params {
  /** type of coin to mint */
  mintDenom: string;
  /** epoch provisions from the first epoch */
  genesisEpochProvisions: string;
  /** mint epoch identifier */
  epochIdentifier: string;
  /** number of epochs take to reduce rewards */
  reductionPeriodInEpochs: Long;
  /** reduction multiplier to execute on each period */
  reductionFactor: string;
  /** start epoch to distribute minting rewards */
  mintingRewardsDistributionStartEpoch: Long;
}

function createBaseMinter(): Minter {
  return { epochProvisions: "" };
}

export const Minter = {
  encode(message: Minter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.epochProvisions !== "") {
      writer.uint32(10).string(message.epochProvisions);
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

          message.epochProvisions = reader.string();
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
    return { epochProvisions: isSet(object.epochProvisions) ? globalThis.String(object.epochProvisions) : "" };
  },

  toJSON(message: Minter): unknown {
    const obj: any = {};
    if (message.epochProvisions !== "") {
      obj.epochProvisions = message.epochProvisions;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Minter>, I>>(base?: I): Minter {
    return Minter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Minter>, I>>(object: I): Minter {
    const message = createBaseMinter();
    message.epochProvisions = object.epochProvisions ?? "";
    return message;
  },
};

function createBaseParams(): Params {
  return {
    mintDenom: "",
    genesisEpochProvisions: "",
    epochIdentifier: "",
    reductionPeriodInEpochs: Long.ZERO,
    reductionFactor: "",
    mintingRewardsDistributionStartEpoch: Long.ZERO,
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mintDenom !== "") {
      writer.uint32(10).string(message.mintDenom);
    }
    if (message.genesisEpochProvisions !== "") {
      writer.uint32(18).string(message.genesisEpochProvisions);
    }
    if (message.epochIdentifier !== "") {
      writer.uint32(26).string(message.epochIdentifier);
    }
    if (!message.reductionPeriodInEpochs.isZero()) {
      writer.uint32(32).int64(message.reductionPeriodInEpochs);
    }
    if (message.reductionFactor !== "") {
      writer.uint32(42).string(message.reductionFactor);
    }
    if (!message.mintingRewardsDistributionStartEpoch.isZero()) {
      writer.uint32(48).int64(message.mintingRewardsDistributionStartEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mintDenom = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.genesisEpochProvisions = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.epochIdentifier = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.reductionPeriodInEpochs = reader.int64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.reductionFactor = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.mintingRewardsDistributionStartEpoch = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      mintDenom: isSet(object.mintDenom) ? globalThis.String(object.mintDenom) : "",
      genesisEpochProvisions: isSet(object.genesisEpochProvisions)
        ? globalThis.String(object.genesisEpochProvisions)
        : "",
      epochIdentifier: isSet(object.epochIdentifier) ? globalThis.String(object.epochIdentifier) : "",
      reductionPeriodInEpochs: isSet(object.reductionPeriodInEpochs)
        ? Long.fromValue(object.reductionPeriodInEpochs)
        : Long.ZERO,
      reductionFactor: isSet(object.reductionFactor) ? globalThis.String(object.reductionFactor) : "",
      mintingRewardsDistributionStartEpoch: isSet(object.mintingRewardsDistributionStartEpoch)
        ? Long.fromValue(object.mintingRewardsDistributionStartEpoch)
        : Long.ZERO,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.mintDenom !== "") {
      obj.mintDenom = message.mintDenom;
    }
    if (message.genesisEpochProvisions !== "") {
      obj.genesisEpochProvisions = message.genesisEpochProvisions;
    }
    if (message.epochIdentifier !== "") {
      obj.epochIdentifier = message.epochIdentifier;
    }
    if (!message.reductionPeriodInEpochs.isZero()) {
      obj.reductionPeriodInEpochs = (message.reductionPeriodInEpochs || Long.ZERO).toString();
    }
    if (message.reductionFactor !== "") {
      obj.reductionFactor = message.reductionFactor;
    }
    if (!message.mintingRewardsDistributionStartEpoch.isZero()) {
      obj.mintingRewardsDistributionStartEpoch = (message.mintingRewardsDistributionStartEpoch || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.mintDenom = object.mintDenom ?? "";
    message.genesisEpochProvisions = object.genesisEpochProvisions ?? "";
    message.epochIdentifier = object.epochIdentifier ?? "";
    message.reductionPeriodInEpochs =
      (object.reductionPeriodInEpochs !== undefined && object.reductionPeriodInEpochs !== null)
        ? Long.fromValue(object.reductionPeriodInEpochs)
        : Long.ZERO;
    message.reductionFactor = object.reductionFactor ?? "";
    message.mintingRewardsDistributionStartEpoch =
      (object.mintingRewardsDistributionStartEpoch !== undefined &&
          object.mintingRewardsDistributionStartEpoch !== null)
        ? Long.fromValue(object.mintingRewardsDistributionStartEpoch)
        : Long.ZERO;
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
