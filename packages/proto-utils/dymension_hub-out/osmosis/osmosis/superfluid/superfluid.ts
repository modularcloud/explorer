/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { SyntheticLock } from "../lockup/lock";

export const protobufPackage = "osmosis.superfluid";

/**
 * SuperfluidAssetType indicates whether the superfluid asset is
 * a native token, lp share of a pool, or concentrated share of a pool
 */
export enum SuperfluidAssetType {
  SuperfluidAssetTypeNative = 0,
  SuperfluidAssetTypeLPShare = 1,
  /** SuperfluidAssetTypeConcentratedShare - SuperfluidAssetTypeLendingShare = 3; // for now not exist */
  SuperfluidAssetTypeConcentratedShare = 2,
  UNRECOGNIZED = -1,
}

export function superfluidAssetTypeFromJSON(object: any): SuperfluidAssetType {
  switch (object) {
    case 0:
    case "SuperfluidAssetTypeNative":
      return SuperfluidAssetType.SuperfluidAssetTypeNative;
    case 1:
    case "SuperfluidAssetTypeLPShare":
      return SuperfluidAssetType.SuperfluidAssetTypeLPShare;
    case 2:
    case "SuperfluidAssetTypeConcentratedShare":
      return SuperfluidAssetType.SuperfluidAssetTypeConcentratedShare;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SuperfluidAssetType.UNRECOGNIZED;
  }
}

export function superfluidAssetTypeToJSON(object: SuperfluidAssetType): string {
  switch (object) {
    case SuperfluidAssetType.SuperfluidAssetTypeNative:
      return "SuperfluidAssetTypeNative";
    case SuperfluidAssetType.SuperfluidAssetTypeLPShare:
      return "SuperfluidAssetTypeLPShare";
    case SuperfluidAssetType.SuperfluidAssetTypeConcentratedShare:
      return "SuperfluidAssetTypeConcentratedShare";
    case SuperfluidAssetType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** SuperfluidAsset stores the pair of superfluid asset type and denom pair */
export interface SuperfluidAsset {
  denom: string;
  /**
   * AssetType indicates whether the superfluid asset is a native token or an lp
   * share
   */
  assetType: SuperfluidAssetType;
}

/**
 * SuperfluidIntermediaryAccount takes the role of intermediary between LP token
 * and OSMO tokens for superfluid staking. The intermediary account is the
 * actual account responsible for delegation, not the validator account itself.
 */
export interface SuperfluidIntermediaryAccount {
  /** Denom indicates the denom of the superfluid asset. */
  denom: string;
  valAddr: string;
  /** perpetual gauge for rewards distribution */
  gaugeId: Long;
}

/**
 * The Osmo-Equivalent-Multiplier Record for epoch N refers to the osmo worth we
 * treat an LP share as having, for all of epoch N. Eventually this is intended
 * to be set as the Time-weighted-average-osmo-backing for the entire duration
 * of epoch N-1. (Thereby locking what's in use for epoch N as based on the
 * prior epochs rewards) However for now, this is not the TWAP but instead the
 * spot price at the boundary. For different types of assets in the future, it
 * could change.
 */
export interface OsmoEquivalentMultiplierRecord {
  epochNumber: Long;
  /** superfluid asset denom, can be LP token or native token */
  denom: string;
  multiplier: string;
}

/**
 * SuperfluidDelegationRecord is a struct used to indicate superfluid
 * delegations of an account in the state machine in a user friendly form.
 */
export interface SuperfluidDelegationRecord {
  delegatorAddress: string;
  validatorAddress: string;
  delegationAmount: Coin | undefined;
  equivalentStakedAmount: Coin | undefined;
}

/**
 * LockIdIntermediaryAccountConnection is a struct used to indicate the
 * relationship between the underlying lock id and superfluid delegation done
 * via lp shares.
 */
export interface LockIdIntermediaryAccountConnection {
  lockId: Long;
  intermediaryAccount: string;
}

export interface UnpoolWhitelistedPools {
  ids: Long[];
}

export interface ConcentratedPoolUserPositionRecord {
  validatorAddress: string;
  positionId: Long;
  lockId: Long;
  syntheticLock: SyntheticLock | undefined;
  delegationAmount: Coin | undefined;
  equivalentStakedAmount: Coin | undefined;
}

function createBaseSuperfluidAsset(): SuperfluidAsset {
  return { denom: "", assetType: 0 };
}

export const SuperfluidAsset = {
  encode(message: SuperfluidAsset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.assetType !== 0) {
      writer.uint32(16).int32(message.assetType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidAsset {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.assetType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidAsset {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      assetType: isSet(object.assetType) ? superfluidAssetTypeFromJSON(object.assetType) : 0,
    };
  },

  toJSON(message: SuperfluidAsset): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.assetType !== 0) {
      obj.assetType = superfluidAssetTypeToJSON(message.assetType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidAsset>, I>>(base?: I): SuperfluidAsset {
    return SuperfluidAsset.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidAsset>, I>>(object: I): SuperfluidAsset {
    const message = createBaseSuperfluidAsset();
    message.denom = object.denom ?? "";
    message.assetType = object.assetType ?? 0;
    return message;
  },
};

function createBaseSuperfluidIntermediaryAccount(): SuperfluidIntermediaryAccount {
  return { denom: "", valAddr: "", gaugeId: Long.UZERO };
}

export const SuperfluidIntermediaryAccount = {
  encode(message: SuperfluidIntermediaryAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.valAddr !== "") {
      writer.uint32(18).string(message.valAddr);
    }
    if (!message.gaugeId.isZero()) {
      writer.uint32(24).uint64(message.gaugeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidIntermediaryAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidIntermediaryAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.valAddr = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.gaugeId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidIntermediaryAccount {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      valAddr: isSet(object.valAddr) ? globalThis.String(object.valAddr) : "",
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
    };
  },

  toJSON(message: SuperfluidIntermediaryAccount): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.valAddr !== "") {
      obj.valAddr = message.valAddr;
    }
    if (!message.gaugeId.isZero()) {
      obj.gaugeId = (message.gaugeId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidIntermediaryAccount>, I>>(base?: I): SuperfluidIntermediaryAccount {
    return SuperfluidIntermediaryAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidIntermediaryAccount>, I>>(
    object: I,
  ): SuperfluidIntermediaryAccount {
    const message = createBaseSuperfluidIntermediaryAccount();
    message.denom = object.denom ?? "";
    message.valAddr = object.valAddr ?? "";
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    return message;
  },
};

function createBaseOsmoEquivalentMultiplierRecord(): OsmoEquivalentMultiplierRecord {
  return { epochNumber: Long.ZERO, denom: "", multiplier: "" };
}

export const OsmoEquivalentMultiplierRecord = {
  encode(message: OsmoEquivalentMultiplierRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.epochNumber.isZero()) {
      writer.uint32(8).int64(message.epochNumber);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.multiplier !== "") {
      writer.uint32(26).string(message.multiplier);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OsmoEquivalentMultiplierRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOsmoEquivalentMultiplierRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.epochNumber = reader.int64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.multiplier = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OsmoEquivalentMultiplierRecord {
    return {
      epochNumber: isSet(object.epochNumber) ? Long.fromValue(object.epochNumber) : Long.ZERO,
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      multiplier: isSet(object.multiplier) ? globalThis.String(object.multiplier) : "",
    };
  },

  toJSON(message: OsmoEquivalentMultiplierRecord): unknown {
    const obj: any = {};
    if (!message.epochNumber.isZero()) {
      obj.epochNumber = (message.epochNumber || Long.ZERO).toString();
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.multiplier !== "") {
      obj.multiplier = message.multiplier;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OsmoEquivalentMultiplierRecord>, I>>(base?: I): OsmoEquivalentMultiplierRecord {
    return OsmoEquivalentMultiplierRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OsmoEquivalentMultiplierRecord>, I>>(
    object: I,
  ): OsmoEquivalentMultiplierRecord {
    const message = createBaseOsmoEquivalentMultiplierRecord();
    message.epochNumber = (object.epochNumber !== undefined && object.epochNumber !== null)
      ? Long.fromValue(object.epochNumber)
      : Long.ZERO;
    message.denom = object.denom ?? "";
    message.multiplier = object.multiplier ?? "";
    return message;
  },
};

function createBaseSuperfluidDelegationRecord(): SuperfluidDelegationRecord {
  return { delegatorAddress: "", validatorAddress: "", delegationAmount: undefined, equivalentStakedAmount: undefined };
}

export const SuperfluidDelegationRecord = {
  encode(message: SuperfluidDelegationRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.delegationAmount !== undefined) {
      Coin.encode(message.delegationAmount, writer.uint32(26).fork()).ldelim();
    }
    if (message.equivalentStakedAmount !== undefined) {
      Coin.encode(message.equivalentStakedAmount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidDelegationRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.delegationAmount = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.equivalentStakedAmount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidDelegationRecord {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? globalThis.String(object.delegatorAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? globalThis.String(object.validatorAddress) : "",
      delegationAmount: isSet(object.delegationAmount) ? Coin.fromJSON(object.delegationAmount) : undefined,
      equivalentStakedAmount: isSet(object.equivalentStakedAmount)
        ? Coin.fromJSON(object.equivalentStakedAmount)
        : undefined,
    };
  },

  toJSON(message: SuperfluidDelegationRecord): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.delegationAmount !== undefined) {
      obj.delegationAmount = Coin.toJSON(message.delegationAmount);
    }
    if (message.equivalentStakedAmount !== undefined) {
      obj.equivalentStakedAmount = Coin.toJSON(message.equivalentStakedAmount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidDelegationRecord>, I>>(base?: I): SuperfluidDelegationRecord {
    return SuperfluidDelegationRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidDelegationRecord>, I>>(object: I): SuperfluidDelegationRecord {
    const message = createBaseSuperfluidDelegationRecord();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.delegationAmount = (object.delegationAmount !== undefined && object.delegationAmount !== null)
      ? Coin.fromPartial(object.delegationAmount)
      : undefined;
    message.equivalentStakedAmount =
      (object.equivalentStakedAmount !== undefined && object.equivalentStakedAmount !== null)
        ? Coin.fromPartial(object.equivalentStakedAmount)
        : undefined;
    return message;
  },
};

function createBaseLockIdIntermediaryAccountConnection(): LockIdIntermediaryAccountConnection {
  return { lockId: Long.UZERO, intermediaryAccount: "" };
}

export const LockIdIntermediaryAccountConnection = {
  encode(message: LockIdIntermediaryAccountConnection, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.lockId.isZero()) {
      writer.uint32(8).uint64(message.lockId);
    }
    if (message.intermediaryAccount !== "") {
      writer.uint32(18).string(message.intermediaryAccount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LockIdIntermediaryAccountConnection {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLockIdIntermediaryAccountConnection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.intermediaryAccount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LockIdIntermediaryAccountConnection {
    return {
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO,
      intermediaryAccount: isSet(object.intermediaryAccount) ? globalThis.String(object.intermediaryAccount) : "",
    };
  },

  toJSON(message: LockIdIntermediaryAccountConnection): unknown {
    const obj: any = {};
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    if (message.intermediaryAccount !== "") {
      obj.intermediaryAccount = message.intermediaryAccount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LockIdIntermediaryAccountConnection>, I>>(
    base?: I,
  ): LockIdIntermediaryAccountConnection {
    return LockIdIntermediaryAccountConnection.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LockIdIntermediaryAccountConnection>, I>>(
    object: I,
  ): LockIdIntermediaryAccountConnection {
    const message = createBaseLockIdIntermediaryAccountConnection();
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    message.intermediaryAccount = object.intermediaryAccount ?? "";
    return message;
  },
};

function createBaseUnpoolWhitelistedPools(): UnpoolWhitelistedPools {
  return { ids: [] };
}

export const UnpoolWhitelistedPools = {
  encode(message: UnpoolWhitelistedPools, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.ids) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnpoolWhitelistedPools {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnpoolWhitelistedPools();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.ids.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ids.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnpoolWhitelistedPools {
    return { ids: globalThis.Array.isArray(object?.ids) ? object.ids.map((e: any) => Long.fromValue(e)) : [] };
  },

  toJSON(message: UnpoolWhitelistedPools): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UnpoolWhitelistedPools>, I>>(base?: I): UnpoolWhitelistedPools {
    return UnpoolWhitelistedPools.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UnpoolWhitelistedPools>, I>>(object: I): UnpoolWhitelistedPools {
    const message = createBaseUnpoolWhitelistedPools();
    message.ids = object.ids?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseConcentratedPoolUserPositionRecord(): ConcentratedPoolUserPositionRecord {
  return {
    validatorAddress: "",
    positionId: Long.UZERO,
    lockId: Long.UZERO,
    syntheticLock: undefined,
    delegationAmount: undefined,
    equivalentStakedAmount: undefined,
  };
}

export const ConcentratedPoolUserPositionRecord = {
  encode(message: ConcentratedPoolUserPositionRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (!message.positionId.isZero()) {
      writer.uint32(16).uint64(message.positionId);
    }
    if (!message.lockId.isZero()) {
      writer.uint32(24).uint64(message.lockId);
    }
    if (message.syntheticLock !== undefined) {
      SyntheticLock.encode(message.syntheticLock, writer.uint32(34).fork()).ldelim();
    }
    if (message.delegationAmount !== undefined) {
      Coin.encode(message.delegationAmount, writer.uint32(42).fork()).ldelim();
    }
    if (message.equivalentStakedAmount !== undefined) {
      Coin.encode(message.equivalentStakedAmount, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConcentratedPoolUserPositionRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConcentratedPoolUserPositionRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.positionId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.syntheticLock = SyntheticLock.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.delegationAmount = Coin.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.equivalentStakedAmount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConcentratedPoolUserPositionRecord {
    return {
      validatorAddress: isSet(object.validatorAddress) ? globalThis.String(object.validatorAddress) : "",
      positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO,
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO,
      syntheticLock: isSet(object.syntheticLock) ? SyntheticLock.fromJSON(object.syntheticLock) : undefined,
      delegationAmount: isSet(object.delegationAmount) ? Coin.fromJSON(object.delegationAmount) : undefined,
      equivalentStakedAmount: isSet(object.equivalentStakedAmount)
        ? Coin.fromJSON(object.equivalentStakedAmount)
        : undefined,
    };
  },

  toJSON(message: ConcentratedPoolUserPositionRecord): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    if (message.syntheticLock !== undefined) {
      obj.syntheticLock = SyntheticLock.toJSON(message.syntheticLock);
    }
    if (message.delegationAmount !== undefined) {
      obj.delegationAmount = Coin.toJSON(message.delegationAmount);
    }
    if (message.equivalentStakedAmount !== undefined) {
      obj.equivalentStakedAmount = Coin.toJSON(message.equivalentStakedAmount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConcentratedPoolUserPositionRecord>, I>>(
    base?: I,
  ): ConcentratedPoolUserPositionRecord {
    return ConcentratedPoolUserPositionRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConcentratedPoolUserPositionRecord>, I>>(
    object: I,
  ): ConcentratedPoolUserPositionRecord {
    const message = createBaseConcentratedPoolUserPositionRecord();
    message.validatorAddress = object.validatorAddress ?? "";
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    message.syntheticLock = (object.syntheticLock !== undefined && object.syntheticLock !== null)
      ? SyntheticLock.fromPartial(object.syntheticLock)
      : undefined;
    message.delegationAmount = (object.delegationAmount !== undefined && object.delegationAmount !== null)
      ? Coin.fromPartial(object.delegationAmount)
      : undefined;
    message.equivalentStakedAmount =
      (object.equivalentStakedAmount !== undefined && object.equivalentStakedAmount !== null)
        ? Coin.fromPartial(object.equivalentStakedAmount)
        : undefined;
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
