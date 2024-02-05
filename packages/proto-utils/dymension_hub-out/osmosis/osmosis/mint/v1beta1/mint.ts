/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.mint.v1beta1";

/** Minter represents the minting state. */
export interface Minter {
  /** epoch_provisions represent rewards for the current epoch. */
  epochProvisions: string;
}

/**
 * WeightedAddress represents an address with a weight assigned to it.
 * The weight is used to determine the proportion of the total minted
 * tokens to be minted to the address.
 */
export interface WeightedAddress {
  address: string;
  weight: string;
}

/**
 * DistributionProportions defines the distribution proportions of the minted
 * denom. In other words, defines which stakeholders will receive the minted
 * denoms and how much.
 */
export interface DistributionProportions {
  /**
   * staking defines the proportion of the minted mint_denom that is to be
   * allocated as staking rewards.
   */
  staking: string;
  /**
   * pool_incentives defines the proportion of the minted mint_denom that is
   * to be allocated as pool incentives.
   */
  poolIncentives: string;
  /**
   * developer_rewards defines the proportion of the minted mint_denom that is
   * to be allocated to developer rewards address.
   */
  developerRewards: string;
  /**
   * community_pool defines the proportion of the minted mint_denom that is
   * to be allocated to the community pool.
   */
  communityPool: string;
}

/** Params holds parameters for the x/mint module. */
export interface Params {
  /** mint_denom is the denom of the coin to mint. */
  mintDenom: string;
  /** genesis_epoch_provisions epoch provisions from the first epoch. */
  genesisEpochProvisions: string;
  /** epoch_identifier mint epoch identifier e.g. (day, week). */
  epochIdentifier: string;
  /**
   * reduction_period_in_epochs the number of epochs it takes
   * to reduce the rewards.
   */
  reductionPeriodInEpochs: Long;
  /**
   * reduction_factor is the reduction multiplier to execute
   * at the end of each period set by reduction_period_in_epochs.
   */
  reductionFactor: string;
  /**
   * distribution_proportions defines the distribution proportions of the minted
   * denom. In other words, defines which stakeholders will receive the minted
   * denoms and how much.
   */
  distributionProportions:
    | DistributionProportions
    | undefined;
  /**
   * weighted_developer_rewards_receivers is the address to receive developer
   * rewards with weights assignedt to each address. The final amount that each
   * address receives is: epoch_provisions *
   * distribution_proportions.developer_rewards * Address's Weight.
   */
  weightedDeveloperRewardsReceivers: WeightedAddress[];
  /**
   * minting_rewards_distribution_start_epoch start epoch to distribute minting
   * rewards
   */
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

function createBaseWeightedAddress(): WeightedAddress {
  return { address: "", weight: "" };
}

export const WeightedAddress = {
  encode(message: WeightedAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WeightedAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeightedAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.weight = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WeightedAddress {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      weight: isSet(object.weight) ? globalThis.String(object.weight) : "",
    };
  },

  toJSON(message: WeightedAddress): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.weight !== "") {
      obj.weight = message.weight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WeightedAddress>, I>>(base?: I): WeightedAddress {
    return WeightedAddress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WeightedAddress>, I>>(object: I): WeightedAddress {
    const message = createBaseWeightedAddress();
    message.address = object.address ?? "";
    message.weight = object.weight ?? "";
    return message;
  },
};

function createBaseDistributionProportions(): DistributionProportions {
  return { staking: "", poolIncentives: "", developerRewards: "", communityPool: "" };
}

export const DistributionProportions = {
  encode(message: DistributionProportions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.staking !== "") {
      writer.uint32(10).string(message.staking);
    }
    if (message.poolIncentives !== "") {
      writer.uint32(18).string(message.poolIncentives);
    }
    if (message.developerRewards !== "") {
      writer.uint32(26).string(message.developerRewards);
    }
    if (message.communityPool !== "") {
      writer.uint32(34).string(message.communityPool);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistributionProportions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistributionProportions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.staking = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.poolIncentives = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.developerRewards = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.communityPool = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DistributionProportions {
    return {
      staking: isSet(object.staking) ? globalThis.String(object.staking) : "",
      poolIncentives: isSet(object.poolIncentives) ? globalThis.String(object.poolIncentives) : "",
      developerRewards: isSet(object.developerRewards) ? globalThis.String(object.developerRewards) : "",
      communityPool: isSet(object.communityPool) ? globalThis.String(object.communityPool) : "",
    };
  },

  toJSON(message: DistributionProportions): unknown {
    const obj: any = {};
    if (message.staking !== "") {
      obj.staking = message.staking;
    }
    if (message.poolIncentives !== "") {
      obj.poolIncentives = message.poolIncentives;
    }
    if (message.developerRewards !== "") {
      obj.developerRewards = message.developerRewards;
    }
    if (message.communityPool !== "") {
      obj.communityPool = message.communityPool;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DistributionProportions>, I>>(base?: I): DistributionProportions {
    return DistributionProportions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DistributionProportions>, I>>(object: I): DistributionProportions {
    const message = createBaseDistributionProportions();
    message.staking = object.staking ?? "";
    message.poolIncentives = object.poolIncentives ?? "";
    message.developerRewards = object.developerRewards ?? "";
    message.communityPool = object.communityPool ?? "";
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
    distributionProportions: undefined,
    weightedDeveloperRewardsReceivers: [],
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
    if (message.distributionProportions !== undefined) {
      DistributionProportions.encode(message.distributionProportions, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.weightedDeveloperRewardsReceivers) {
      WeightedAddress.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (!message.mintingRewardsDistributionStartEpoch.isZero()) {
      writer.uint32(64).int64(message.mintingRewardsDistributionStartEpoch);
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
          if (tag !== 50) {
            break;
          }

          message.distributionProportions = DistributionProportions.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.weightedDeveloperRewardsReceivers.push(WeightedAddress.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 64) {
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
      distributionProportions: isSet(object.distributionProportions)
        ? DistributionProportions.fromJSON(object.distributionProportions)
        : undefined,
      weightedDeveloperRewardsReceivers: globalThis.Array.isArray(object?.weightedDeveloperRewardsReceivers)
        ? object.weightedDeveloperRewardsReceivers.map((e: any) => WeightedAddress.fromJSON(e))
        : [],
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
    if (message.distributionProportions !== undefined) {
      obj.distributionProportions = DistributionProportions.toJSON(message.distributionProportions);
    }
    if (message.weightedDeveloperRewardsReceivers?.length) {
      obj.weightedDeveloperRewardsReceivers = message.weightedDeveloperRewardsReceivers.map((e) =>
        WeightedAddress.toJSON(e)
      );
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
    message.distributionProportions =
      (object.distributionProportions !== undefined && object.distributionProportions !== null)
        ? DistributionProportions.fromPartial(object.distributionProportions)
        : undefined;
    message.weightedDeveloperRewardsReceivers =
      object.weightedDeveloperRewardsReceivers?.map((e) => WeightedAddress.fromPartial(e)) || [];
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
