/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { ModuleRoute } from "./module_route";
import { DenomPairTakerFee } from "./tx";

export const protobufPackage = "osmosis.poolmanager.v1beta1";

/** Params holds parameters for the poolmanager module */
export interface Params {
  poolCreationFee: Coin[];
  /** taker_fee_params is the container of taker fee parameters. */
  takerFeeParams:
    | TakerFeeParams
    | undefined;
  /**
   * authorized_quote_denoms is a list of quote denoms that can be used as
   * token1 when creating a concentrated pool. We limit the quote assets to a
   * small set for the purposes of having convenient price increments stemming
   * from tick to price conversion. These increments are in a human readable
   * magnitude only for token1 as a quote. For limit orders in the future, this
   * will be a desirable property in terms of UX as to allow users to set limit
   * orders at prices in terms of token1 (quote asset) that are easy to reason
   * about.
   */
  authorizedQuoteDenoms: string[];
}

/** GenesisState defines the poolmanager module's genesis state. */
export interface GenesisState {
  /** the next_pool_id */
  nextPoolId: Long;
  /** params is the container of poolmanager parameters. */
  params:
    | Params
    | undefined;
  /** pool_routes is the container of the mappings from pool id to pool type. */
  poolRoutes: ModuleRoute[];
  /** KVStore state */
  takerFeesTracker: TakerFeesTracker | undefined;
  poolVolumes: PoolVolume[];
  denomPairTakerFeeStore: DenomPairTakerFee[];
}

/** TakerFeeParams consolidates the taker fee parameters for the poolmanager. */
export interface TakerFeeParams {
  /**
   * default_taker_fee is the fee used when creating a new pool that doesn't
   * fall under a custom pool taker fee or stableswap taker fee category.
   */
  defaultTakerFee: string;
  /**
   * osmo_taker_fee_distribution defines the distribution of taker fees
   * generated in OSMO. As of this writing, it has two categories:
   * - staking_rewards: the percent of the taker fee that gets distributed to
   *   stakers.
   * - community_pool: the percent of the taker fee that gets sent to the
   *   community pool.
   */
  osmoTakerFeeDistribution:
    | TakerFeeDistributionPercentage
    | undefined;
  /**
   * non_osmo_taker_fee_distribution defines the distribution of taker fees
   * generated in non-OSMO. As of this writing, it has two categories:
   * - staking_rewards: the percent of the taker fee that gets swapped to OSMO
   *   and then distributed to stakers.
   * - community_pool: the percent of the taker fee that gets sent to the
   *   community pool. Note: If the non-OSMO asset is an authorized_quote_denom,
   *   that denom is sent directly to the community pool. Otherwise, it is
   *   swapped to the community_pool_denom_to_swap_non_whitelisted_assets_to and
   *   then sent to the community pool as that denom.
   */
  nonOsmoTakerFeeDistribution:
    | TakerFeeDistributionPercentage
    | undefined;
  /**
   * admin_addresses is a list of addresses that are allowed to set and remove
   * custom taker fees for denom pairs. Governance also has the ability to set
   * and remove custom taker fees for denom pairs, but with the normal
   * governance delay.
   */
  adminAddresses: string[];
  /**
   * community_pool_denom_to_swap_non_whitelisted_assets_to is the denom that
   * non-whitelisted taker fees will be swapped to before being sent to
   * the community pool.
   */
  communityPoolDenomToSwapNonWhitelistedAssetsTo: string;
  /**
   * reduced_fee_whitelist is a list of addresses that are
   * allowed to pay a reduce taker fee when performing a swap
   * (i.e. swap without paying the taker fee).
   * It is intended to be used for integrators who meet qualifying factors
   * that are approved by governance.
   * Initially, the taker fee is allowed to be bypassed completely. However
   * In the future, we will charge a reduced taker fee instead of no fee at all.
   */
  reducedFeeWhitelist: string[];
}

/**
 * TakerFeeDistributionPercentage defines what percent of the taker fee category
 * gets distributed to the available categories.
 */
export interface TakerFeeDistributionPercentage {
  stakingRewards: string;
  communityPool: string;
}

export interface TakerFeesTracker {
  takerFeesToStakers: Coin[];
  takerFeesToCommunityPool: Coin[];
  heightAccountingStartsFrom: Long;
}

/**
 * PoolVolume stores the KVStore entries for each pool's volume, which
 * is used in export/import genesis.
 */
export interface PoolVolume {
  /** pool_id is the id of the pool. */
  poolId: Long;
  /** pool_volume is the cumulative volume of the pool. */
  poolVolume: Coin[];
}

function createBaseParams(): Params {
  return { poolCreationFee: [], takerFeeParams: undefined, authorizedQuoteDenoms: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.poolCreationFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.takerFeeParams !== undefined) {
      TakerFeeParams.encode(message.takerFeeParams, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.authorizedQuoteDenoms) {
      writer.uint32(26).string(v!);
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

          message.poolCreationFee.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.takerFeeParams = TakerFeeParams.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.authorizedQuoteDenoms.push(reader.string());
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
      poolCreationFee: globalThis.Array.isArray(object?.poolCreationFee)
        ? object.poolCreationFee.map((e: any) => Coin.fromJSON(e))
        : [],
      takerFeeParams: isSet(object.takerFeeParams) ? TakerFeeParams.fromJSON(object.takerFeeParams) : undefined,
      authorizedQuoteDenoms: globalThis.Array.isArray(object?.authorizedQuoteDenoms)
        ? object.authorizedQuoteDenoms.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.poolCreationFee?.length) {
      obj.poolCreationFee = message.poolCreationFee.map((e) => Coin.toJSON(e));
    }
    if (message.takerFeeParams !== undefined) {
      obj.takerFeeParams = TakerFeeParams.toJSON(message.takerFeeParams);
    }
    if (message.authorizedQuoteDenoms?.length) {
      obj.authorizedQuoteDenoms = message.authorizedQuoteDenoms;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.poolCreationFee = object.poolCreationFee?.map((e) => Coin.fromPartial(e)) || [];
    message.takerFeeParams = (object.takerFeeParams !== undefined && object.takerFeeParams !== null)
      ? TakerFeeParams.fromPartial(object.takerFeeParams)
      : undefined;
    message.authorizedQuoteDenoms = object.authorizedQuoteDenoms?.map((e) => e) || [];
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return {
    nextPoolId: Long.UZERO,
    params: undefined,
    poolRoutes: [],
    takerFeesTracker: undefined,
    poolVolumes: [],
    denomPairTakerFeeStore: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.nextPoolId.isZero()) {
      writer.uint32(8).uint64(message.nextPoolId);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.poolRoutes) {
      ModuleRoute.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.takerFeesTracker !== undefined) {
      TakerFeesTracker.encode(message.takerFeesTracker, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.poolVolumes) {
      PoolVolume.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.denomPairTakerFeeStore) {
      DenomPairTakerFee.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nextPoolId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.poolRoutes.push(ModuleRoute.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.takerFeesTracker = TakerFeesTracker.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.poolVolumes.push(PoolVolume.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.denomPairTakerFeeStore.push(DenomPairTakerFee.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      nextPoolId: isSet(object.nextPoolId) ? Long.fromValue(object.nextPoolId) : Long.UZERO,
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      poolRoutes: globalThis.Array.isArray(object?.poolRoutes)
        ? object.poolRoutes.map((e: any) => ModuleRoute.fromJSON(e))
        : [],
      takerFeesTracker: isSet(object.takerFeesTracker) ? TakerFeesTracker.fromJSON(object.takerFeesTracker) : undefined,
      poolVolumes: globalThis.Array.isArray(object?.poolVolumes)
        ? object.poolVolumes.map((e: any) => PoolVolume.fromJSON(e))
        : [],
      denomPairTakerFeeStore: globalThis.Array.isArray(object?.denomPairTakerFeeStore)
        ? object.denomPairTakerFeeStore.map((e: any) => DenomPairTakerFee.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (!message.nextPoolId.isZero()) {
      obj.nextPoolId = (message.nextPoolId || Long.UZERO).toString();
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.poolRoutes?.length) {
      obj.poolRoutes = message.poolRoutes.map((e) => ModuleRoute.toJSON(e));
    }
    if (message.takerFeesTracker !== undefined) {
      obj.takerFeesTracker = TakerFeesTracker.toJSON(message.takerFeesTracker);
    }
    if (message.poolVolumes?.length) {
      obj.poolVolumes = message.poolVolumes.map((e) => PoolVolume.toJSON(e));
    }
    if (message.denomPairTakerFeeStore?.length) {
      obj.denomPairTakerFeeStore = message.denomPairTakerFeeStore.map((e) => DenomPairTakerFee.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.nextPoolId = (object.nextPoolId !== undefined && object.nextPoolId !== null)
      ? Long.fromValue(object.nextPoolId)
      : Long.UZERO;
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.poolRoutes = object.poolRoutes?.map((e) => ModuleRoute.fromPartial(e)) || [];
    message.takerFeesTracker = (object.takerFeesTracker !== undefined && object.takerFeesTracker !== null)
      ? TakerFeesTracker.fromPartial(object.takerFeesTracker)
      : undefined;
    message.poolVolumes = object.poolVolumes?.map((e) => PoolVolume.fromPartial(e)) || [];
    message.denomPairTakerFeeStore = object.denomPairTakerFeeStore?.map((e) => DenomPairTakerFee.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTakerFeeParams(): TakerFeeParams {
  return {
    defaultTakerFee: "",
    osmoTakerFeeDistribution: undefined,
    nonOsmoTakerFeeDistribution: undefined,
    adminAddresses: [],
    communityPoolDenomToSwapNonWhitelistedAssetsTo: "",
    reducedFeeWhitelist: [],
  };
}

export const TakerFeeParams = {
  encode(message: TakerFeeParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.defaultTakerFee !== "") {
      writer.uint32(10).string(message.defaultTakerFee);
    }
    if (message.osmoTakerFeeDistribution !== undefined) {
      TakerFeeDistributionPercentage.encode(message.osmoTakerFeeDistribution, writer.uint32(18).fork()).ldelim();
    }
    if (message.nonOsmoTakerFeeDistribution !== undefined) {
      TakerFeeDistributionPercentage.encode(message.nonOsmoTakerFeeDistribution, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.adminAddresses) {
      writer.uint32(34).string(v!);
    }
    if (message.communityPoolDenomToSwapNonWhitelistedAssetsTo !== "") {
      writer.uint32(42).string(message.communityPoolDenomToSwapNonWhitelistedAssetsTo);
    }
    for (const v of message.reducedFeeWhitelist) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TakerFeeParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakerFeeParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.defaultTakerFee = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.osmoTakerFeeDistribution = TakerFeeDistributionPercentage.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nonOsmoTakerFeeDistribution = TakerFeeDistributionPercentage.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.adminAddresses.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.communityPoolDenomToSwapNonWhitelistedAssetsTo = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.reducedFeeWhitelist.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TakerFeeParams {
    return {
      defaultTakerFee: isSet(object.defaultTakerFee) ? globalThis.String(object.defaultTakerFee) : "",
      osmoTakerFeeDistribution: isSet(object.osmoTakerFeeDistribution)
        ? TakerFeeDistributionPercentage.fromJSON(object.osmoTakerFeeDistribution)
        : undefined,
      nonOsmoTakerFeeDistribution: isSet(object.nonOsmoTakerFeeDistribution)
        ? TakerFeeDistributionPercentage.fromJSON(object.nonOsmoTakerFeeDistribution)
        : undefined,
      adminAddresses: globalThis.Array.isArray(object?.adminAddresses)
        ? object.adminAddresses.map((e: any) => globalThis.String(e))
        : [],
      communityPoolDenomToSwapNonWhitelistedAssetsTo: isSet(object.communityPoolDenomToSwapNonWhitelistedAssetsTo)
        ? globalThis.String(object.communityPoolDenomToSwapNonWhitelistedAssetsTo)
        : "",
      reducedFeeWhitelist: globalThis.Array.isArray(object?.reducedFeeWhitelist)
        ? object.reducedFeeWhitelist.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: TakerFeeParams): unknown {
    const obj: any = {};
    if (message.defaultTakerFee !== "") {
      obj.defaultTakerFee = message.defaultTakerFee;
    }
    if (message.osmoTakerFeeDistribution !== undefined) {
      obj.osmoTakerFeeDistribution = TakerFeeDistributionPercentage.toJSON(message.osmoTakerFeeDistribution);
    }
    if (message.nonOsmoTakerFeeDistribution !== undefined) {
      obj.nonOsmoTakerFeeDistribution = TakerFeeDistributionPercentage.toJSON(message.nonOsmoTakerFeeDistribution);
    }
    if (message.adminAddresses?.length) {
      obj.adminAddresses = message.adminAddresses;
    }
    if (message.communityPoolDenomToSwapNonWhitelistedAssetsTo !== "") {
      obj.communityPoolDenomToSwapNonWhitelistedAssetsTo = message.communityPoolDenomToSwapNonWhitelistedAssetsTo;
    }
    if (message.reducedFeeWhitelist?.length) {
      obj.reducedFeeWhitelist = message.reducedFeeWhitelist;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TakerFeeParams>, I>>(base?: I): TakerFeeParams {
    return TakerFeeParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TakerFeeParams>, I>>(object: I): TakerFeeParams {
    const message = createBaseTakerFeeParams();
    message.defaultTakerFee = object.defaultTakerFee ?? "";
    message.osmoTakerFeeDistribution =
      (object.osmoTakerFeeDistribution !== undefined && object.osmoTakerFeeDistribution !== null)
        ? TakerFeeDistributionPercentage.fromPartial(object.osmoTakerFeeDistribution)
        : undefined;
    message.nonOsmoTakerFeeDistribution =
      (object.nonOsmoTakerFeeDistribution !== undefined && object.nonOsmoTakerFeeDistribution !== null)
        ? TakerFeeDistributionPercentage.fromPartial(object.nonOsmoTakerFeeDistribution)
        : undefined;
    message.adminAddresses = object.adminAddresses?.map((e) => e) || [];
    message.communityPoolDenomToSwapNonWhitelistedAssetsTo = object.communityPoolDenomToSwapNonWhitelistedAssetsTo ??
      "";
    message.reducedFeeWhitelist = object.reducedFeeWhitelist?.map((e) => e) || [];
    return message;
  },
};

function createBaseTakerFeeDistributionPercentage(): TakerFeeDistributionPercentage {
  return { stakingRewards: "", communityPool: "" };
}

export const TakerFeeDistributionPercentage = {
  encode(message: TakerFeeDistributionPercentage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stakingRewards !== "") {
      writer.uint32(10).string(message.stakingRewards);
    }
    if (message.communityPool !== "") {
      writer.uint32(18).string(message.communityPool);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TakerFeeDistributionPercentage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakerFeeDistributionPercentage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stakingRewards = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): TakerFeeDistributionPercentage {
    return {
      stakingRewards: isSet(object.stakingRewards) ? globalThis.String(object.stakingRewards) : "",
      communityPool: isSet(object.communityPool) ? globalThis.String(object.communityPool) : "",
    };
  },

  toJSON(message: TakerFeeDistributionPercentage): unknown {
    const obj: any = {};
    if (message.stakingRewards !== "") {
      obj.stakingRewards = message.stakingRewards;
    }
    if (message.communityPool !== "") {
      obj.communityPool = message.communityPool;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TakerFeeDistributionPercentage>, I>>(base?: I): TakerFeeDistributionPercentage {
    return TakerFeeDistributionPercentage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TakerFeeDistributionPercentage>, I>>(
    object: I,
  ): TakerFeeDistributionPercentage {
    const message = createBaseTakerFeeDistributionPercentage();
    message.stakingRewards = object.stakingRewards ?? "";
    message.communityPool = object.communityPool ?? "";
    return message;
  },
};

function createBaseTakerFeesTracker(): TakerFeesTracker {
  return { takerFeesToStakers: [], takerFeesToCommunityPool: [], heightAccountingStartsFrom: Long.ZERO };
}

export const TakerFeesTracker = {
  encode(message: TakerFeesTracker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.takerFeesToStakers) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.takerFeesToCommunityPool) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (!message.heightAccountingStartsFrom.isZero()) {
      writer.uint32(24).int64(message.heightAccountingStartsFrom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TakerFeesTracker {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakerFeesTracker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.takerFeesToStakers.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.takerFeesToCommunityPool.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.heightAccountingStartsFrom = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TakerFeesTracker {
    return {
      takerFeesToStakers: globalThis.Array.isArray(object?.takerFeesToStakers)
        ? object.takerFeesToStakers.map((e: any) => Coin.fromJSON(e))
        : [],
      takerFeesToCommunityPool: globalThis.Array.isArray(object?.takerFeesToCommunityPool)
        ? object.takerFeesToCommunityPool.map((e: any) => Coin.fromJSON(e))
        : [],
      heightAccountingStartsFrom: isSet(object.heightAccountingStartsFrom)
        ? Long.fromValue(object.heightAccountingStartsFrom)
        : Long.ZERO,
    };
  },

  toJSON(message: TakerFeesTracker): unknown {
    const obj: any = {};
    if (message.takerFeesToStakers?.length) {
      obj.takerFeesToStakers = message.takerFeesToStakers.map((e) => Coin.toJSON(e));
    }
    if (message.takerFeesToCommunityPool?.length) {
      obj.takerFeesToCommunityPool = message.takerFeesToCommunityPool.map((e) => Coin.toJSON(e));
    }
    if (!message.heightAccountingStartsFrom.isZero()) {
      obj.heightAccountingStartsFrom = (message.heightAccountingStartsFrom || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TakerFeesTracker>, I>>(base?: I): TakerFeesTracker {
    return TakerFeesTracker.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TakerFeesTracker>, I>>(object: I): TakerFeesTracker {
    const message = createBaseTakerFeesTracker();
    message.takerFeesToStakers = object.takerFeesToStakers?.map((e) => Coin.fromPartial(e)) || [];
    message.takerFeesToCommunityPool = object.takerFeesToCommunityPool?.map((e) => Coin.fromPartial(e)) || [];
    message.heightAccountingStartsFrom =
      (object.heightAccountingStartsFrom !== undefined && object.heightAccountingStartsFrom !== null)
        ? Long.fromValue(object.heightAccountingStartsFrom)
        : Long.ZERO;
    return message;
  },
};

function createBasePoolVolume(): PoolVolume {
  return { poolId: Long.UZERO, poolVolume: [] };
}

export const PoolVolume = {
  encode(message: PoolVolume, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    for (const v of message.poolVolume) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolVolume {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.poolVolume.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PoolVolume {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      poolVolume: globalThis.Array.isArray(object?.poolVolume)
        ? object.poolVolume.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PoolVolume): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.poolVolume?.length) {
      obj.poolVolume = message.poolVolume.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PoolVolume>, I>>(base?: I): PoolVolume {
    return PoolVolume.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PoolVolume>, I>>(object: I): PoolVolume {
    const message = createBasePoolVolume();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.poolVolume = object.poolVolume?.map((e) => Coin.fromPartial(e)) || [];
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
