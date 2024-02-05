/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { DelegationResponse } from "../../cosmos/staking/v1beta1/staking";
import { SyntheticLock } from "../lockup/lock";
import { Params } from "./params";
import {
  ConcentratedPoolUserPositionRecord,
  OsmoEquivalentMultiplierRecord,
  SuperfluidAsset,
  SuperfluidAssetType,
  superfluidAssetTypeFromJSON,
  superfluidAssetTypeToJSON,
  SuperfluidDelegationRecord,
} from "./superfluid";

export const protobufPackage = "osmosis.superfluid";

export interface QueryParamsRequest {
}

export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

export interface AssetTypeRequest {
  denom: string;
}

export interface AssetTypeResponse {
  assetType: SuperfluidAssetType;
}

export interface AllAssetsRequest {
}

export interface AllAssetsResponse {
  assets: SuperfluidAsset[];
}

export interface AssetMultiplierRequest {
  denom: string;
}

export interface AssetMultiplierResponse {
  osmoEquivalentMultiplier: OsmoEquivalentMultiplierRecord | undefined;
}

export interface SuperfluidIntermediaryAccountInfo {
  denom: string;
  valAddr: string;
  gaugeId: Long;
  address: string;
}

export interface AllIntermediaryAccountsRequest {
  pagination: PageRequest | undefined;
}

export interface AllIntermediaryAccountsResponse {
  accounts: SuperfluidIntermediaryAccountInfo[];
  pagination: PageResponse | undefined;
}

export interface ConnectedIntermediaryAccountRequest {
  lockId: Long;
}

export interface ConnectedIntermediaryAccountResponse {
  account: SuperfluidIntermediaryAccountInfo | undefined;
}

export interface QueryTotalDelegationByValidatorForDenomRequest {
  denom: string;
}

export interface QueryTotalDelegationByValidatorForDenomResponse {
  assets: Delegations[];
}

export interface Delegations {
  valAddr: string;
  amountSfsd: string;
  osmoEquivalent: string;
}

export interface TotalSuperfluidDelegationsRequest {
}

export interface TotalSuperfluidDelegationsResponse {
  totalDelegations: string;
}

export interface SuperfluidDelegationAmountRequest {
  delegatorAddress: string;
  validatorAddress: string;
  denom: string;
}

export interface SuperfluidDelegationAmountResponse {
  amount: Coin[];
}

export interface SuperfluidDelegationsByDelegatorRequest {
  delegatorAddress: string;
}

export interface SuperfluidDelegationsByDelegatorResponse {
  superfluidDelegationRecords: SuperfluidDelegationRecord[];
  totalDelegatedCoins: Coin[];
  totalEquivalentStakedAmount: Coin | undefined;
}

export interface SuperfluidUndelegationsByDelegatorRequest {
  delegatorAddress: string;
  denom: string;
}

export interface SuperfluidUndelegationsByDelegatorResponse {
  superfluidDelegationRecords: SuperfluidDelegationRecord[];
  totalUndelegatedCoins: Coin[];
  syntheticLocks: SyntheticLock[];
}

export interface SuperfluidDelegationsByValidatorDenomRequest {
  validatorAddress: string;
  denom: string;
}

export interface SuperfluidDelegationsByValidatorDenomResponse {
  superfluidDelegationRecords: SuperfluidDelegationRecord[];
}

export interface EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
  validatorAddress: string;
  denom: string;
}

export interface EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
  totalDelegatedCoins: Coin[];
}

export interface QueryTotalDelegationByDelegatorRequest {
  delegatorAddress: string;
}

export interface QueryTotalDelegationByDelegatorResponse {
  superfluidDelegationRecords: SuperfluidDelegationRecord[];
  delegationResponse: DelegationResponse[];
  totalDelegatedCoins: Coin[];
  totalEquivalentStakedAmount: Coin | undefined;
}

export interface QueryUnpoolWhitelistRequest {
}

export interface QueryUnpoolWhitelistResponse {
  poolIds: Long[];
}

export interface UserConcentratedSuperfluidPositionsDelegatedRequest {
  delegatorAddress: string;
}

export interface UserConcentratedSuperfluidPositionsDelegatedResponse {
  clPoolUserPositionRecords: ConcentratedPoolUserPositionRecord[];
}

export interface UserConcentratedSuperfluidPositionsUndelegatingRequest {
  delegatorAddress: string;
}

export interface UserConcentratedSuperfluidPositionsUndelegatingResponse {
  clPoolUserPositionRecords: ConcentratedPoolUserPositionRecord[];
}

/** THIS QUERY IS TEMPORARY */
export interface QueryRestSupplyRequest {
  denom: string;
}

export interface QueryRestSupplyResponse {
  /** amount is the supply of the coin. */
  amount: Coin | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseAssetTypeRequest(): AssetTypeRequest {
  return { denom: "" };
}

export const AssetTypeRequest = {
  encode(message: AssetTypeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssetTypeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetTypeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AssetTypeRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: AssetTypeRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AssetTypeRequest>, I>>(base?: I): AssetTypeRequest {
    return AssetTypeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AssetTypeRequest>, I>>(object: I): AssetTypeRequest {
    const message = createBaseAssetTypeRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseAssetTypeResponse(): AssetTypeResponse {
  return { assetType: 0 };
}

export const AssetTypeResponse = {
  encode(message: AssetTypeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.assetType !== 0) {
      writer.uint32(8).int32(message.assetType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssetTypeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetTypeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
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

  fromJSON(object: any): AssetTypeResponse {
    return { assetType: isSet(object.assetType) ? superfluidAssetTypeFromJSON(object.assetType) : 0 };
  },

  toJSON(message: AssetTypeResponse): unknown {
    const obj: any = {};
    if (message.assetType !== 0) {
      obj.assetType = superfluidAssetTypeToJSON(message.assetType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AssetTypeResponse>, I>>(base?: I): AssetTypeResponse {
    return AssetTypeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AssetTypeResponse>, I>>(object: I): AssetTypeResponse {
    const message = createBaseAssetTypeResponse();
    message.assetType = object.assetType ?? 0;
    return message;
  },
};

function createBaseAllAssetsRequest(): AllAssetsRequest {
  return {};
}

export const AllAssetsRequest = {
  encode(_: AllAssetsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllAssetsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllAssetsRequest();
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

  fromJSON(_: any): AllAssetsRequest {
    return {};
  },

  toJSON(_: AllAssetsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AllAssetsRequest>, I>>(base?: I): AllAssetsRequest {
    return AllAssetsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AllAssetsRequest>, I>>(_: I): AllAssetsRequest {
    const message = createBaseAllAssetsRequest();
    return message;
  },
};

function createBaseAllAssetsResponse(): AllAssetsResponse {
  return { assets: [] };
}

export const AllAssetsResponse = {
  encode(message: AllAssetsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.assets) {
      SuperfluidAsset.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllAssetsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllAssetsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.assets.push(SuperfluidAsset.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllAssetsResponse {
    return {
      assets: globalThis.Array.isArray(object?.assets)
        ? object.assets.map((e: any) => SuperfluidAsset.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AllAssetsResponse): unknown {
    const obj: any = {};
    if (message.assets?.length) {
      obj.assets = message.assets.map((e) => SuperfluidAsset.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AllAssetsResponse>, I>>(base?: I): AllAssetsResponse {
    return AllAssetsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AllAssetsResponse>, I>>(object: I): AllAssetsResponse {
    const message = createBaseAllAssetsResponse();
    message.assets = object.assets?.map((e) => SuperfluidAsset.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAssetMultiplierRequest(): AssetMultiplierRequest {
  return { denom: "" };
}

export const AssetMultiplierRequest = {
  encode(message: AssetMultiplierRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssetMultiplierRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetMultiplierRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AssetMultiplierRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: AssetMultiplierRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AssetMultiplierRequest>, I>>(base?: I): AssetMultiplierRequest {
    return AssetMultiplierRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AssetMultiplierRequest>, I>>(object: I): AssetMultiplierRequest {
    const message = createBaseAssetMultiplierRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseAssetMultiplierResponse(): AssetMultiplierResponse {
  return { osmoEquivalentMultiplier: undefined };
}

export const AssetMultiplierResponse = {
  encode(message: AssetMultiplierResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.osmoEquivalentMultiplier !== undefined) {
      OsmoEquivalentMultiplierRecord.encode(message.osmoEquivalentMultiplier, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssetMultiplierResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetMultiplierResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.osmoEquivalentMultiplier = OsmoEquivalentMultiplierRecord.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AssetMultiplierResponse {
    return {
      osmoEquivalentMultiplier: isSet(object.osmoEquivalentMultiplier)
        ? OsmoEquivalentMultiplierRecord.fromJSON(object.osmoEquivalentMultiplier)
        : undefined,
    };
  },

  toJSON(message: AssetMultiplierResponse): unknown {
    const obj: any = {};
    if (message.osmoEquivalentMultiplier !== undefined) {
      obj.osmoEquivalentMultiplier = OsmoEquivalentMultiplierRecord.toJSON(message.osmoEquivalentMultiplier);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AssetMultiplierResponse>, I>>(base?: I): AssetMultiplierResponse {
    return AssetMultiplierResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AssetMultiplierResponse>, I>>(object: I): AssetMultiplierResponse {
    const message = createBaseAssetMultiplierResponse();
    message.osmoEquivalentMultiplier =
      (object.osmoEquivalentMultiplier !== undefined && object.osmoEquivalentMultiplier !== null)
        ? OsmoEquivalentMultiplierRecord.fromPartial(object.osmoEquivalentMultiplier)
        : undefined;
    return message;
  },
};

function createBaseSuperfluidIntermediaryAccountInfo(): SuperfluidIntermediaryAccountInfo {
  return { denom: "", valAddr: "", gaugeId: Long.UZERO, address: "" };
}

export const SuperfluidIntermediaryAccountInfo = {
  encode(message: SuperfluidIntermediaryAccountInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.valAddr !== "") {
      writer.uint32(18).string(message.valAddr);
    }
    if (!message.gaugeId.isZero()) {
      writer.uint32(24).uint64(message.gaugeId);
    }
    if (message.address !== "") {
      writer.uint32(34).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidIntermediaryAccountInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidIntermediaryAccountInfo();
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
        case 4:
          if (tag !== 34) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidIntermediaryAccountInfo {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      valAddr: isSet(object.valAddr) ? globalThis.String(object.valAddr) : "",
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
      address: isSet(object.address) ? globalThis.String(object.address) : "",
    };
  },

  toJSON(message: SuperfluidIntermediaryAccountInfo): unknown {
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
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidIntermediaryAccountInfo>, I>>(
    base?: I,
  ): SuperfluidIntermediaryAccountInfo {
    return SuperfluidIntermediaryAccountInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidIntermediaryAccountInfo>, I>>(
    object: I,
  ): SuperfluidIntermediaryAccountInfo {
    const message = createBaseSuperfluidIntermediaryAccountInfo();
    message.denom = object.denom ?? "";
    message.valAddr = object.valAddr ?? "";
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseAllIntermediaryAccountsRequest(): AllIntermediaryAccountsRequest {
  return { pagination: undefined };
}

export const AllIntermediaryAccountsRequest = {
  encode(message: AllIntermediaryAccountsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllIntermediaryAccountsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllIntermediaryAccountsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllIntermediaryAccountsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: AllIntermediaryAccountsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AllIntermediaryAccountsRequest>, I>>(base?: I): AllIntermediaryAccountsRequest {
    return AllIntermediaryAccountsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AllIntermediaryAccountsRequest>, I>>(
    object: I,
  ): AllIntermediaryAccountsRequest {
    const message = createBaseAllIntermediaryAccountsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseAllIntermediaryAccountsResponse(): AllIntermediaryAccountsResponse {
  return { accounts: [], pagination: undefined };
}

export const AllIntermediaryAccountsResponse = {
  encode(message: AllIntermediaryAccountsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.accounts) {
      SuperfluidIntermediaryAccountInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllIntermediaryAccountsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllIntermediaryAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accounts.push(SuperfluidIntermediaryAccountInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllIntermediaryAccountsResponse {
    return {
      accounts: globalThis.Array.isArray(object?.accounts)
        ? object.accounts.map((e: any) => SuperfluidIntermediaryAccountInfo.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: AllIntermediaryAccountsResponse): unknown {
    const obj: any = {};
    if (message.accounts?.length) {
      obj.accounts = message.accounts.map((e) => SuperfluidIntermediaryAccountInfo.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AllIntermediaryAccountsResponse>, I>>(base?: I): AllIntermediaryAccountsResponse {
    return AllIntermediaryAccountsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AllIntermediaryAccountsResponse>, I>>(
    object: I,
  ): AllIntermediaryAccountsResponse {
    const message = createBaseAllIntermediaryAccountsResponse();
    message.accounts = object.accounts?.map((e) => SuperfluidIntermediaryAccountInfo.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseConnectedIntermediaryAccountRequest(): ConnectedIntermediaryAccountRequest {
  return { lockId: Long.UZERO };
}

export const ConnectedIntermediaryAccountRequest = {
  encode(message: ConnectedIntermediaryAccountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.lockId.isZero()) {
      writer.uint32(8).uint64(message.lockId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectedIntermediaryAccountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectedIntermediaryAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectedIntermediaryAccountRequest {
    return { lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO };
  },

  toJSON(message: ConnectedIntermediaryAccountRequest): unknown {
    const obj: any = {};
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectedIntermediaryAccountRequest>, I>>(
    base?: I,
  ): ConnectedIntermediaryAccountRequest {
    return ConnectedIntermediaryAccountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectedIntermediaryAccountRequest>, I>>(
    object: I,
  ): ConnectedIntermediaryAccountRequest {
    const message = createBaseConnectedIntermediaryAccountRequest();
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    return message;
  },
};

function createBaseConnectedIntermediaryAccountResponse(): ConnectedIntermediaryAccountResponse {
  return { account: undefined };
}

export const ConnectedIntermediaryAccountResponse = {
  encode(message: ConnectedIntermediaryAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.account !== undefined) {
      SuperfluidIntermediaryAccountInfo.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConnectedIntermediaryAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectedIntermediaryAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.account = SuperfluidIntermediaryAccountInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConnectedIntermediaryAccountResponse {
    return { account: isSet(object.account) ? SuperfluidIntermediaryAccountInfo.fromJSON(object.account) : undefined };
  },

  toJSON(message: ConnectedIntermediaryAccountResponse): unknown {
    const obj: any = {};
    if (message.account !== undefined) {
      obj.account = SuperfluidIntermediaryAccountInfo.toJSON(message.account);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConnectedIntermediaryAccountResponse>, I>>(
    base?: I,
  ): ConnectedIntermediaryAccountResponse {
    return ConnectedIntermediaryAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConnectedIntermediaryAccountResponse>, I>>(
    object: I,
  ): ConnectedIntermediaryAccountResponse {
    const message = createBaseConnectedIntermediaryAccountResponse();
    message.account = (object.account !== undefined && object.account !== null)
      ? SuperfluidIntermediaryAccountInfo.fromPartial(object.account)
      : undefined;
    return message;
  },
};

function createBaseQueryTotalDelegationByValidatorForDenomRequest(): QueryTotalDelegationByValidatorForDenomRequest {
  return { denom: "" };
}

export const QueryTotalDelegationByValidatorForDenomRequest = {
  encode(
    message: QueryTotalDelegationByValidatorForDenomRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalDelegationByValidatorForDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDelegationByValidatorForDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalDelegationByValidatorForDenomRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: QueryTotalDelegationByValidatorForDenomRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalDelegationByValidatorForDenomRequest>, I>>(
    base?: I,
  ): QueryTotalDelegationByValidatorForDenomRequest {
    return QueryTotalDelegationByValidatorForDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalDelegationByValidatorForDenomRequest>, I>>(
    object: I,
  ): QueryTotalDelegationByValidatorForDenomRequest {
    const message = createBaseQueryTotalDelegationByValidatorForDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryTotalDelegationByValidatorForDenomResponse(): QueryTotalDelegationByValidatorForDenomResponse {
  return { assets: [] };
}

export const QueryTotalDelegationByValidatorForDenomResponse = {
  encode(
    message: QueryTotalDelegationByValidatorForDenomResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.assets) {
      Delegations.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalDelegationByValidatorForDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDelegationByValidatorForDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.assets.push(Delegations.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalDelegationByValidatorForDenomResponse {
    return {
      assets: globalThis.Array.isArray(object?.assets) ? object.assets.map((e: any) => Delegations.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryTotalDelegationByValidatorForDenomResponse): unknown {
    const obj: any = {};
    if (message.assets?.length) {
      obj.assets = message.assets.map((e) => Delegations.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalDelegationByValidatorForDenomResponse>, I>>(
    base?: I,
  ): QueryTotalDelegationByValidatorForDenomResponse {
    return QueryTotalDelegationByValidatorForDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalDelegationByValidatorForDenomResponse>, I>>(
    object: I,
  ): QueryTotalDelegationByValidatorForDenomResponse {
    const message = createBaseQueryTotalDelegationByValidatorForDenomResponse();
    message.assets = object.assets?.map((e) => Delegations.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDelegations(): Delegations {
  return { valAddr: "", amountSfsd: "", osmoEquivalent: "" };
}

export const Delegations = {
  encode(message: Delegations, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.valAddr !== "") {
      writer.uint32(10).string(message.valAddr);
    }
    if (message.amountSfsd !== "") {
      writer.uint32(18).string(message.amountSfsd);
    }
    if (message.osmoEquivalent !== "") {
      writer.uint32(26).string(message.osmoEquivalent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Delegations {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegations();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.valAddr = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amountSfsd = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.osmoEquivalent = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Delegations {
    return {
      valAddr: isSet(object.valAddr) ? globalThis.String(object.valAddr) : "",
      amountSfsd: isSet(object.amountSfsd) ? globalThis.String(object.amountSfsd) : "",
      osmoEquivalent: isSet(object.osmoEquivalent) ? globalThis.String(object.osmoEquivalent) : "",
    };
  },

  toJSON(message: Delegations): unknown {
    const obj: any = {};
    if (message.valAddr !== "") {
      obj.valAddr = message.valAddr;
    }
    if (message.amountSfsd !== "") {
      obj.amountSfsd = message.amountSfsd;
    }
    if (message.osmoEquivalent !== "") {
      obj.osmoEquivalent = message.osmoEquivalent;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Delegations>, I>>(base?: I): Delegations {
    return Delegations.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Delegations>, I>>(object: I): Delegations {
    const message = createBaseDelegations();
    message.valAddr = object.valAddr ?? "";
    message.amountSfsd = object.amountSfsd ?? "";
    message.osmoEquivalent = object.osmoEquivalent ?? "";
    return message;
  },
};

function createBaseTotalSuperfluidDelegationsRequest(): TotalSuperfluidDelegationsRequest {
  return {};
}

export const TotalSuperfluidDelegationsRequest = {
  encode(_: TotalSuperfluidDelegationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalSuperfluidDelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalSuperfluidDelegationsRequest();
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

  fromJSON(_: any): TotalSuperfluidDelegationsRequest {
    return {};
  },

  toJSON(_: TotalSuperfluidDelegationsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalSuperfluidDelegationsRequest>, I>>(
    base?: I,
  ): TotalSuperfluidDelegationsRequest {
    return TotalSuperfluidDelegationsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalSuperfluidDelegationsRequest>, I>>(
    _: I,
  ): TotalSuperfluidDelegationsRequest {
    const message = createBaseTotalSuperfluidDelegationsRequest();
    return message;
  },
};

function createBaseTotalSuperfluidDelegationsResponse(): TotalSuperfluidDelegationsResponse {
  return { totalDelegations: "" };
}

export const TotalSuperfluidDelegationsResponse = {
  encode(message: TotalSuperfluidDelegationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalDelegations !== "") {
      writer.uint32(10).string(message.totalDelegations);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalSuperfluidDelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalSuperfluidDelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.totalDelegations = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TotalSuperfluidDelegationsResponse {
    return { totalDelegations: isSet(object.totalDelegations) ? globalThis.String(object.totalDelegations) : "" };
  },

  toJSON(message: TotalSuperfluidDelegationsResponse): unknown {
    const obj: any = {};
    if (message.totalDelegations !== "") {
      obj.totalDelegations = message.totalDelegations;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalSuperfluidDelegationsResponse>, I>>(
    base?: I,
  ): TotalSuperfluidDelegationsResponse {
    return TotalSuperfluidDelegationsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalSuperfluidDelegationsResponse>, I>>(
    object: I,
  ): TotalSuperfluidDelegationsResponse {
    const message = createBaseTotalSuperfluidDelegationsResponse();
    message.totalDelegations = object.totalDelegations ?? "";
    return message;
  },
};

function createBaseSuperfluidDelegationAmountRequest(): SuperfluidDelegationAmountRequest {
  return { delegatorAddress: "", validatorAddress: "", denom: "" };
}

export const SuperfluidDelegationAmountRequest = {
  encode(message: SuperfluidDelegationAmountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidDelegationAmountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationAmountRequest();
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

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidDelegationAmountRequest {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? globalThis.String(object.delegatorAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? globalThis.String(object.validatorAddress) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
    };
  },

  toJSON(message: SuperfluidDelegationAmountRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidDelegationAmountRequest>, I>>(
    base?: I,
  ): SuperfluidDelegationAmountRequest {
    return SuperfluidDelegationAmountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidDelegationAmountRequest>, I>>(
    object: I,
  ): SuperfluidDelegationAmountRequest {
    const message = createBaseSuperfluidDelegationAmountRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseSuperfluidDelegationAmountResponse(): SuperfluidDelegationAmountResponse {
  return { amount: [] };
}

export const SuperfluidDelegationAmountResponse = {
  encode(message: SuperfluidDelegationAmountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidDelegationAmountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationAmountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): SuperfluidDelegationAmountResponse {
    return { amount: globalThis.Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: SuperfluidDelegationAmountResponse): unknown {
    const obj: any = {};
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidDelegationAmountResponse>, I>>(
    base?: I,
  ): SuperfluidDelegationAmountResponse {
    return SuperfluidDelegationAmountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidDelegationAmountResponse>, I>>(
    object: I,
  ): SuperfluidDelegationAmountResponse {
    const message = createBaseSuperfluidDelegationAmountResponse();
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSuperfluidDelegationsByDelegatorRequest(): SuperfluidDelegationsByDelegatorRequest {
  return { delegatorAddress: "" };
}

export const SuperfluidDelegationsByDelegatorRequest = {
  encode(message: SuperfluidDelegationsByDelegatorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidDelegationsByDelegatorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationsByDelegatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidDelegationsByDelegatorRequest {
    return { delegatorAddress: isSet(object.delegatorAddress) ? globalThis.String(object.delegatorAddress) : "" };
  },

  toJSON(message: SuperfluidDelegationsByDelegatorRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidDelegationsByDelegatorRequest>, I>>(
    base?: I,
  ): SuperfluidDelegationsByDelegatorRequest {
    return SuperfluidDelegationsByDelegatorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidDelegationsByDelegatorRequest>, I>>(
    object: I,
  ): SuperfluidDelegationsByDelegatorRequest {
    const message = createBaseSuperfluidDelegationsByDelegatorRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
};

function createBaseSuperfluidDelegationsByDelegatorResponse(): SuperfluidDelegationsByDelegatorResponse {
  return { superfluidDelegationRecords: [], totalDelegatedCoins: [], totalEquivalentStakedAmount: undefined };
}

export const SuperfluidDelegationsByDelegatorResponse = {
  encode(message: SuperfluidDelegationsByDelegatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.superfluidDelegationRecords) {
      SuperfluidDelegationRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.totalDelegatedCoins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.totalEquivalentStakedAmount !== undefined) {
      Coin.encode(message.totalEquivalentStakedAmount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidDelegationsByDelegatorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationsByDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.superfluidDelegationRecords.push(SuperfluidDelegationRecord.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.totalDelegatedCoins.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.totalEquivalentStakedAmount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidDelegationsByDelegatorResponse {
    return {
      superfluidDelegationRecords: globalThis.Array.isArray(object?.superfluidDelegationRecords)
        ? object.superfluidDelegationRecords.map((e: any) => SuperfluidDelegationRecord.fromJSON(e))
        : [],
      totalDelegatedCoins: globalThis.Array.isArray(object?.totalDelegatedCoins)
        ? object.totalDelegatedCoins.map((e: any) => Coin.fromJSON(e))
        : [],
      totalEquivalentStakedAmount: isSet(object.totalEquivalentStakedAmount)
        ? Coin.fromJSON(object.totalEquivalentStakedAmount)
        : undefined,
    };
  },

  toJSON(message: SuperfluidDelegationsByDelegatorResponse): unknown {
    const obj: any = {};
    if (message.superfluidDelegationRecords?.length) {
      obj.superfluidDelegationRecords = message.superfluidDelegationRecords.map((e) =>
        SuperfluidDelegationRecord.toJSON(e)
      );
    }
    if (message.totalDelegatedCoins?.length) {
      obj.totalDelegatedCoins = message.totalDelegatedCoins.map((e) => Coin.toJSON(e));
    }
    if (message.totalEquivalentStakedAmount !== undefined) {
      obj.totalEquivalentStakedAmount = Coin.toJSON(message.totalEquivalentStakedAmount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidDelegationsByDelegatorResponse>, I>>(
    base?: I,
  ): SuperfluidDelegationsByDelegatorResponse {
    return SuperfluidDelegationsByDelegatorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidDelegationsByDelegatorResponse>, I>>(
    object: I,
  ): SuperfluidDelegationsByDelegatorResponse {
    const message = createBaseSuperfluidDelegationsByDelegatorResponse();
    message.superfluidDelegationRecords =
      object.superfluidDelegationRecords?.map((e) => SuperfluidDelegationRecord.fromPartial(e)) || [];
    message.totalDelegatedCoins = object.totalDelegatedCoins?.map((e) => Coin.fromPartial(e)) || [];
    message.totalEquivalentStakedAmount =
      (object.totalEquivalentStakedAmount !== undefined && object.totalEquivalentStakedAmount !== null)
        ? Coin.fromPartial(object.totalEquivalentStakedAmount)
        : undefined;
    return message;
  },
};

function createBaseSuperfluidUndelegationsByDelegatorRequest(): SuperfluidUndelegationsByDelegatorRequest {
  return { delegatorAddress: "", denom: "" };
}

export const SuperfluidUndelegationsByDelegatorRequest = {
  encode(message: SuperfluidUndelegationsByDelegatorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidUndelegationsByDelegatorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidUndelegationsByDelegatorRequest();
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

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidUndelegationsByDelegatorRequest {
    return {
      delegatorAddress: isSet(object.delegatorAddress) ? globalThis.String(object.delegatorAddress) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
    };
  },

  toJSON(message: SuperfluidUndelegationsByDelegatorRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidUndelegationsByDelegatorRequest>, I>>(
    base?: I,
  ): SuperfluidUndelegationsByDelegatorRequest {
    return SuperfluidUndelegationsByDelegatorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidUndelegationsByDelegatorRequest>, I>>(
    object: I,
  ): SuperfluidUndelegationsByDelegatorRequest {
    const message = createBaseSuperfluidUndelegationsByDelegatorRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseSuperfluidUndelegationsByDelegatorResponse(): SuperfluidUndelegationsByDelegatorResponse {
  return { superfluidDelegationRecords: [], totalUndelegatedCoins: [], syntheticLocks: [] };
}

export const SuperfluidUndelegationsByDelegatorResponse = {
  encode(message: SuperfluidUndelegationsByDelegatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.superfluidDelegationRecords) {
      SuperfluidDelegationRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.totalUndelegatedCoins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.syntheticLocks) {
      SyntheticLock.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidUndelegationsByDelegatorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidUndelegationsByDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.superfluidDelegationRecords.push(SuperfluidDelegationRecord.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.totalUndelegatedCoins.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.syntheticLocks.push(SyntheticLock.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidUndelegationsByDelegatorResponse {
    return {
      superfluidDelegationRecords: globalThis.Array.isArray(object?.superfluidDelegationRecords)
        ? object.superfluidDelegationRecords.map((e: any) => SuperfluidDelegationRecord.fromJSON(e))
        : [],
      totalUndelegatedCoins: globalThis.Array.isArray(object?.totalUndelegatedCoins)
        ? object.totalUndelegatedCoins.map((e: any) => Coin.fromJSON(e))
        : [],
      syntheticLocks: globalThis.Array.isArray(object?.syntheticLocks)
        ? object.syntheticLocks.map((e: any) => SyntheticLock.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SuperfluidUndelegationsByDelegatorResponse): unknown {
    const obj: any = {};
    if (message.superfluidDelegationRecords?.length) {
      obj.superfluidDelegationRecords = message.superfluidDelegationRecords.map((e) =>
        SuperfluidDelegationRecord.toJSON(e)
      );
    }
    if (message.totalUndelegatedCoins?.length) {
      obj.totalUndelegatedCoins = message.totalUndelegatedCoins.map((e) => Coin.toJSON(e));
    }
    if (message.syntheticLocks?.length) {
      obj.syntheticLocks = message.syntheticLocks.map((e) => SyntheticLock.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidUndelegationsByDelegatorResponse>, I>>(
    base?: I,
  ): SuperfluidUndelegationsByDelegatorResponse {
    return SuperfluidUndelegationsByDelegatorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidUndelegationsByDelegatorResponse>, I>>(
    object: I,
  ): SuperfluidUndelegationsByDelegatorResponse {
    const message = createBaseSuperfluidUndelegationsByDelegatorResponse();
    message.superfluidDelegationRecords =
      object.superfluidDelegationRecords?.map((e) => SuperfluidDelegationRecord.fromPartial(e)) || [];
    message.totalUndelegatedCoins = object.totalUndelegatedCoins?.map((e) => Coin.fromPartial(e)) || [];
    message.syntheticLocks = object.syntheticLocks?.map((e) => SyntheticLock.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSuperfluidDelegationsByValidatorDenomRequest(): SuperfluidDelegationsByValidatorDenomRequest {
  return { validatorAddress: "", denom: "" };
}

export const SuperfluidDelegationsByValidatorDenomRequest = {
  encode(message: SuperfluidDelegationsByValidatorDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidDelegationsByValidatorDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationsByValidatorDenomRequest();
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
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidDelegationsByValidatorDenomRequest {
    return {
      validatorAddress: isSet(object.validatorAddress) ? globalThis.String(object.validatorAddress) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
    };
  },

  toJSON(message: SuperfluidDelegationsByValidatorDenomRequest): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidDelegationsByValidatorDenomRequest>, I>>(
    base?: I,
  ): SuperfluidDelegationsByValidatorDenomRequest {
    return SuperfluidDelegationsByValidatorDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidDelegationsByValidatorDenomRequest>, I>>(
    object: I,
  ): SuperfluidDelegationsByValidatorDenomRequest {
    const message = createBaseSuperfluidDelegationsByValidatorDenomRequest();
    message.validatorAddress = object.validatorAddress ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseSuperfluidDelegationsByValidatorDenomResponse(): SuperfluidDelegationsByValidatorDenomResponse {
  return { superfluidDelegationRecords: [] };
}

export const SuperfluidDelegationsByValidatorDenomResponse = {
  encode(message: SuperfluidDelegationsByValidatorDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.superfluidDelegationRecords) {
      SuperfluidDelegationRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuperfluidDelegationsByValidatorDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationsByValidatorDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.superfluidDelegationRecords.push(SuperfluidDelegationRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SuperfluidDelegationsByValidatorDenomResponse {
    return {
      superfluidDelegationRecords: globalThis.Array.isArray(object?.superfluidDelegationRecords)
        ? object.superfluidDelegationRecords.map((e: any) => SuperfluidDelegationRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SuperfluidDelegationsByValidatorDenomResponse): unknown {
    const obj: any = {};
    if (message.superfluidDelegationRecords?.length) {
      obj.superfluidDelegationRecords = message.superfluidDelegationRecords.map((e) =>
        SuperfluidDelegationRecord.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SuperfluidDelegationsByValidatorDenomResponse>, I>>(
    base?: I,
  ): SuperfluidDelegationsByValidatorDenomResponse {
    return SuperfluidDelegationsByValidatorDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SuperfluidDelegationsByValidatorDenomResponse>, I>>(
    object: I,
  ): SuperfluidDelegationsByValidatorDenomResponse {
    const message = createBaseSuperfluidDelegationsByValidatorDenomResponse();
    message.superfluidDelegationRecords =
      object.superfluidDelegationRecords?.map((e) => SuperfluidDelegationRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomRequest(): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
  return { validatorAddress: "", denom: "" };
}

export const EstimateSuperfluidDelegatedAmountByValidatorDenomRequest = {
  encode(
    message: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomRequest();
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
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
    return {
      validatorAddress: isSet(object.validatorAddress) ? globalThis.String(object.validatorAddress) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
    };
  },

  toJSON(message: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateSuperfluidDelegatedAmountByValidatorDenomRequest>, I>>(
    base?: I,
  ): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
    return EstimateSuperfluidDelegatedAmountByValidatorDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSuperfluidDelegatedAmountByValidatorDenomRequest>, I>>(
    object: I,
  ): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomRequest();
    message.validatorAddress = object.validatorAddress ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomResponse(): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
  return { totalDelegatedCoins: [] };
}

export const EstimateSuperfluidDelegatedAmountByValidatorDenomResponse = {
  encode(
    message: EstimateSuperfluidDelegatedAmountByValidatorDenomResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.totalDelegatedCoins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.totalDelegatedCoins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
    return {
      totalDelegatedCoins: globalThis.Array.isArray(object?.totalDelegatedCoins)
        ? object.totalDelegatedCoins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EstimateSuperfluidDelegatedAmountByValidatorDenomResponse): unknown {
    const obj: any = {};
    if (message.totalDelegatedCoins?.length) {
      obj.totalDelegatedCoins = message.totalDelegatedCoins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EstimateSuperfluidDelegatedAmountByValidatorDenomResponse>, I>>(
    base?: I,
  ): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
    return EstimateSuperfluidDelegatedAmountByValidatorDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EstimateSuperfluidDelegatedAmountByValidatorDenomResponse>, I>>(
    object: I,
  ): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomResponse();
    message.totalDelegatedCoins = object.totalDelegatedCoins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryTotalDelegationByDelegatorRequest(): QueryTotalDelegationByDelegatorRequest {
  return { delegatorAddress: "" };
}

export const QueryTotalDelegationByDelegatorRequest = {
  encode(message: QueryTotalDelegationByDelegatorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalDelegationByDelegatorRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDelegationByDelegatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalDelegationByDelegatorRequest {
    return { delegatorAddress: isSet(object.delegatorAddress) ? globalThis.String(object.delegatorAddress) : "" };
  },

  toJSON(message: QueryTotalDelegationByDelegatorRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalDelegationByDelegatorRequest>, I>>(
    base?: I,
  ): QueryTotalDelegationByDelegatorRequest {
    return QueryTotalDelegationByDelegatorRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalDelegationByDelegatorRequest>, I>>(
    object: I,
  ): QueryTotalDelegationByDelegatorRequest {
    const message = createBaseQueryTotalDelegationByDelegatorRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
};

function createBaseQueryTotalDelegationByDelegatorResponse(): QueryTotalDelegationByDelegatorResponse {
  return {
    superfluidDelegationRecords: [],
    delegationResponse: [],
    totalDelegatedCoins: [],
    totalEquivalentStakedAmount: undefined,
  };
}

export const QueryTotalDelegationByDelegatorResponse = {
  encode(message: QueryTotalDelegationByDelegatorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.superfluidDelegationRecords) {
      SuperfluidDelegationRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.delegationResponse) {
      DelegationResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.totalDelegatedCoins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.totalEquivalentStakedAmount !== undefined) {
      Coin.encode(message.totalEquivalentStakedAmount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalDelegationByDelegatorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDelegationByDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.superfluidDelegationRecords.push(SuperfluidDelegationRecord.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.delegationResponse.push(DelegationResponse.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.totalDelegatedCoins.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.totalEquivalentStakedAmount = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTotalDelegationByDelegatorResponse {
    return {
      superfluidDelegationRecords: globalThis.Array.isArray(object?.superfluidDelegationRecords)
        ? object.superfluidDelegationRecords.map((e: any) => SuperfluidDelegationRecord.fromJSON(e))
        : [],
      delegationResponse: globalThis.Array.isArray(object?.delegationResponse)
        ? object.delegationResponse.map((e: any) => DelegationResponse.fromJSON(e))
        : [],
      totalDelegatedCoins: globalThis.Array.isArray(object?.totalDelegatedCoins)
        ? object.totalDelegatedCoins.map((e: any) => Coin.fromJSON(e))
        : [],
      totalEquivalentStakedAmount: isSet(object.totalEquivalentStakedAmount)
        ? Coin.fromJSON(object.totalEquivalentStakedAmount)
        : undefined,
    };
  },

  toJSON(message: QueryTotalDelegationByDelegatorResponse): unknown {
    const obj: any = {};
    if (message.superfluidDelegationRecords?.length) {
      obj.superfluidDelegationRecords = message.superfluidDelegationRecords.map((e) =>
        SuperfluidDelegationRecord.toJSON(e)
      );
    }
    if (message.delegationResponse?.length) {
      obj.delegationResponse = message.delegationResponse.map((e) => DelegationResponse.toJSON(e));
    }
    if (message.totalDelegatedCoins?.length) {
      obj.totalDelegatedCoins = message.totalDelegatedCoins.map((e) => Coin.toJSON(e));
    }
    if (message.totalEquivalentStakedAmount !== undefined) {
      obj.totalEquivalentStakedAmount = Coin.toJSON(message.totalEquivalentStakedAmount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTotalDelegationByDelegatorResponse>, I>>(
    base?: I,
  ): QueryTotalDelegationByDelegatorResponse {
    return QueryTotalDelegationByDelegatorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTotalDelegationByDelegatorResponse>, I>>(
    object: I,
  ): QueryTotalDelegationByDelegatorResponse {
    const message = createBaseQueryTotalDelegationByDelegatorResponse();
    message.superfluidDelegationRecords =
      object.superfluidDelegationRecords?.map((e) => SuperfluidDelegationRecord.fromPartial(e)) || [];
    message.delegationResponse = object.delegationResponse?.map((e) => DelegationResponse.fromPartial(e)) || [];
    message.totalDelegatedCoins = object.totalDelegatedCoins?.map((e) => Coin.fromPartial(e)) || [];
    message.totalEquivalentStakedAmount =
      (object.totalEquivalentStakedAmount !== undefined && object.totalEquivalentStakedAmount !== null)
        ? Coin.fromPartial(object.totalEquivalentStakedAmount)
        : undefined;
    return message;
  },
};

function createBaseQueryUnpoolWhitelistRequest(): QueryUnpoolWhitelistRequest {
  return {};
}

export const QueryUnpoolWhitelistRequest = {
  encode(_: QueryUnpoolWhitelistRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnpoolWhitelistRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnpoolWhitelistRequest();
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

  fromJSON(_: any): QueryUnpoolWhitelistRequest {
    return {};
  },

  toJSON(_: QueryUnpoolWhitelistRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUnpoolWhitelistRequest>, I>>(base?: I): QueryUnpoolWhitelistRequest {
    return QueryUnpoolWhitelistRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUnpoolWhitelistRequest>, I>>(_: I): QueryUnpoolWhitelistRequest {
    const message = createBaseQueryUnpoolWhitelistRequest();
    return message;
  },
};

function createBaseQueryUnpoolWhitelistResponse(): QueryUnpoolWhitelistResponse {
  return { poolIds: [] };
}

export const QueryUnpoolWhitelistResponse = {
  encode(message: QueryUnpoolWhitelistResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.poolIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnpoolWhitelistResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnpoolWhitelistResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.poolIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.poolIds.push(reader.uint64() as Long);
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

  fromJSON(object: any): QueryUnpoolWhitelistResponse {
    return {
      poolIds: globalThis.Array.isArray(object?.poolIds) ? object.poolIds.map((e: any) => Long.fromValue(e)) : [],
    };
  },

  toJSON(message: QueryUnpoolWhitelistResponse): unknown {
    const obj: any = {};
    if (message.poolIds?.length) {
      obj.poolIds = message.poolIds.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryUnpoolWhitelistResponse>, I>>(base?: I): QueryUnpoolWhitelistResponse {
    return QueryUnpoolWhitelistResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryUnpoolWhitelistResponse>, I>>(object: I): QueryUnpoolWhitelistResponse {
    const message = createBaseQueryUnpoolWhitelistResponse();
    message.poolIds = object.poolIds?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseUserConcentratedSuperfluidPositionsDelegatedRequest(): UserConcentratedSuperfluidPositionsDelegatedRequest {
  return { delegatorAddress: "" };
}

export const UserConcentratedSuperfluidPositionsDelegatedRequest = {
  encode(
    message: UserConcentratedSuperfluidPositionsDelegatedRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserConcentratedSuperfluidPositionsDelegatedRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserConcentratedSuperfluidPositionsDelegatedRequest {
    return { delegatorAddress: isSet(object.delegatorAddress) ? globalThis.String(object.delegatorAddress) : "" };
  },

  toJSON(message: UserConcentratedSuperfluidPositionsDelegatedRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserConcentratedSuperfluidPositionsDelegatedRequest>, I>>(
    base?: I,
  ): UserConcentratedSuperfluidPositionsDelegatedRequest {
    return UserConcentratedSuperfluidPositionsDelegatedRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserConcentratedSuperfluidPositionsDelegatedRequest>, I>>(
    object: I,
  ): UserConcentratedSuperfluidPositionsDelegatedRequest {
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
};

function createBaseUserConcentratedSuperfluidPositionsDelegatedResponse(): UserConcentratedSuperfluidPositionsDelegatedResponse {
  return { clPoolUserPositionRecords: [] };
}

export const UserConcentratedSuperfluidPositionsDelegatedResponse = {
  encode(
    message: UserConcentratedSuperfluidPositionsDelegatedResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.clPoolUserPositionRecords) {
      ConcentratedPoolUserPositionRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserConcentratedSuperfluidPositionsDelegatedResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clPoolUserPositionRecords.push(ConcentratedPoolUserPositionRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserConcentratedSuperfluidPositionsDelegatedResponse {
    return {
      clPoolUserPositionRecords: globalThis.Array.isArray(object?.clPoolUserPositionRecords)
        ? object.clPoolUserPositionRecords.map((e: any) => ConcentratedPoolUserPositionRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UserConcentratedSuperfluidPositionsDelegatedResponse): unknown {
    const obj: any = {};
    if (message.clPoolUserPositionRecords?.length) {
      obj.clPoolUserPositionRecords = message.clPoolUserPositionRecords.map((e) =>
        ConcentratedPoolUserPositionRecord.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserConcentratedSuperfluidPositionsDelegatedResponse>, I>>(
    base?: I,
  ): UserConcentratedSuperfluidPositionsDelegatedResponse {
    return UserConcentratedSuperfluidPositionsDelegatedResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserConcentratedSuperfluidPositionsDelegatedResponse>, I>>(
    object: I,
  ): UserConcentratedSuperfluidPositionsDelegatedResponse {
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedResponse();
    message.clPoolUserPositionRecords =
      object.clPoolUserPositionRecords?.map((e) => ConcentratedPoolUserPositionRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserConcentratedSuperfluidPositionsUndelegatingRequest(): UserConcentratedSuperfluidPositionsUndelegatingRequest {
  return { delegatorAddress: "" };
}

export const UserConcentratedSuperfluidPositionsUndelegatingRequest = {
  encode(
    message: UserConcentratedSuperfluidPositionsUndelegatingRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserConcentratedSuperfluidPositionsUndelegatingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.delegatorAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserConcentratedSuperfluidPositionsUndelegatingRequest {
    return { delegatorAddress: isSet(object.delegatorAddress) ? globalThis.String(object.delegatorAddress) : "" };
  },

  toJSON(message: UserConcentratedSuperfluidPositionsUndelegatingRequest): unknown {
    const obj: any = {};
    if (message.delegatorAddress !== "") {
      obj.delegatorAddress = message.delegatorAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserConcentratedSuperfluidPositionsUndelegatingRequest>, I>>(
    base?: I,
  ): UserConcentratedSuperfluidPositionsUndelegatingRequest {
    return UserConcentratedSuperfluidPositionsUndelegatingRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserConcentratedSuperfluidPositionsUndelegatingRequest>, I>>(
    object: I,
  ): UserConcentratedSuperfluidPositionsUndelegatingRequest {
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
};

function createBaseUserConcentratedSuperfluidPositionsUndelegatingResponse(): UserConcentratedSuperfluidPositionsUndelegatingResponse {
  return { clPoolUserPositionRecords: [] };
}

export const UserConcentratedSuperfluidPositionsUndelegatingResponse = {
  encode(
    message: UserConcentratedSuperfluidPositionsUndelegatingResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.clPoolUserPositionRecords) {
      ConcentratedPoolUserPositionRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserConcentratedSuperfluidPositionsUndelegatingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clPoolUserPositionRecords.push(ConcentratedPoolUserPositionRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserConcentratedSuperfluidPositionsUndelegatingResponse {
    return {
      clPoolUserPositionRecords: globalThis.Array.isArray(object?.clPoolUserPositionRecords)
        ? object.clPoolUserPositionRecords.map((e: any) => ConcentratedPoolUserPositionRecord.fromJSON(e))
        : [],
    };
  },

  toJSON(message: UserConcentratedSuperfluidPositionsUndelegatingResponse): unknown {
    const obj: any = {};
    if (message.clPoolUserPositionRecords?.length) {
      obj.clPoolUserPositionRecords = message.clPoolUserPositionRecords.map((e) =>
        ConcentratedPoolUserPositionRecord.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserConcentratedSuperfluidPositionsUndelegatingResponse>, I>>(
    base?: I,
  ): UserConcentratedSuperfluidPositionsUndelegatingResponse {
    return UserConcentratedSuperfluidPositionsUndelegatingResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserConcentratedSuperfluidPositionsUndelegatingResponse>, I>>(
    object: I,
  ): UserConcentratedSuperfluidPositionsUndelegatingResponse {
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingResponse();
    message.clPoolUserPositionRecords =
      object.clPoolUserPositionRecords?.map((e) => ConcentratedPoolUserPositionRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryRestSupplyRequest(): QueryRestSupplyRequest {
  return { denom: "" };
}

export const QueryRestSupplyRequest = {
  encode(message: QueryRestSupplyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRestSupplyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRestSupplyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryRestSupplyRequest {
    return { denom: isSet(object.denom) ? globalThis.String(object.denom) : "" };
  },

  toJSON(message: QueryRestSupplyRequest): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRestSupplyRequest>, I>>(base?: I): QueryRestSupplyRequest {
    return QueryRestSupplyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRestSupplyRequest>, I>>(object: I): QueryRestSupplyRequest {
    const message = createBaseQueryRestSupplyRequest();
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseQueryRestSupplyResponse(): QueryRestSupplyResponse {
  return { amount: undefined };
}

export const QueryRestSupplyResponse = {
  encode(message: QueryRestSupplyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRestSupplyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRestSupplyResponse();
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

  fromJSON(object: any): QueryRestSupplyResponse {
    return { amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined };
  },

  toJSON(message: QueryRestSupplyResponse): unknown {
    const obj: any = {};
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRestSupplyResponse>, I>>(base?: I): QueryRestSupplyResponse {
    return QueryRestSupplyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRestSupplyResponse>, I>>(object: I): QueryRestSupplyResponse {
    const message = createBaseQueryRestSupplyResponse();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Params returns the total set of superfluid parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * Returns superfluid asset type, whether if it's a native asset or an lp
   * share.
   */
  AssetType(request: AssetTypeRequest): Promise<AssetTypeResponse>;
  /** Returns all registered superfluid assets. */
  AllAssets(request: AllAssetsRequest): Promise<AllAssetsResponse>;
  /** Returns the osmo equivalent multiplier used in the most recent epoch. */
  AssetMultiplier(request: AssetMultiplierRequest): Promise<AssetMultiplierResponse>;
  /** Returns all superfluid intermediary accounts. */
  AllIntermediaryAccounts(request: AllIntermediaryAccountsRequest): Promise<AllIntermediaryAccountsResponse>;
  /** Returns intermediary account connected to a superfluid staked lock by id */
  ConnectedIntermediaryAccount(
    request: ConnectedIntermediaryAccountRequest,
  ): Promise<ConnectedIntermediaryAccountResponse>;
  /** Returns the amount of delegations of specific denom for all validators */
  TotalDelegationByValidatorForDenom(
    request: QueryTotalDelegationByValidatorForDenomRequest,
  ): Promise<QueryTotalDelegationByValidatorForDenomResponse>;
  /**
   * Returns the total amount of osmo superfluidly staked.
   * Response is denominated in uosmo.
   */
  TotalSuperfluidDelegations(request: TotalSuperfluidDelegationsRequest): Promise<TotalSuperfluidDelegationsResponse>;
  /**
   * Returns the coins superfluid delegated for the delegator, validator, denom
   * triplet
   */
  SuperfluidDelegationAmount(request: SuperfluidDelegationAmountRequest): Promise<SuperfluidDelegationAmountResponse>;
  /** Returns all the delegated superfluid positions for a specific delegator. */
  SuperfluidDelegationsByDelegator(
    request: SuperfluidDelegationsByDelegatorRequest,
  ): Promise<SuperfluidDelegationsByDelegatorResponse>;
  /** Returns all the undelegating superfluid positions for a specific delegator. */
  SuperfluidUndelegationsByDelegator(
    request: SuperfluidUndelegationsByDelegatorRequest,
  ): Promise<SuperfluidUndelegationsByDelegatorResponse>;
  /**
   * Returns all the superfluid positions of a specific denom delegated to one
   * validator
   */
  SuperfluidDelegationsByValidatorDenom(
    request: SuperfluidDelegationsByValidatorDenomRequest,
  ): Promise<SuperfluidDelegationsByValidatorDenomResponse>;
  /**
   * Returns the amount of a specific denom delegated to a specific validator
   * This is labeled an estimate, because the way it calculates the amount can
   * lead rounding errors from the true delegated amount
   */
  EstimateSuperfluidDelegatedAmountByValidatorDenom(
    request: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest,
  ): Promise<EstimateSuperfluidDelegatedAmountByValidatorDenomResponse>;
  /** Returns the specified delegations for a specific delegator */
  TotalDelegationByDelegator(
    request: QueryTotalDelegationByDelegatorRequest,
  ): Promise<QueryTotalDelegationByDelegatorResponse>;
  /** Returns a list of whitelisted pool ids to unpool. */
  UnpoolWhitelist(request: QueryUnpoolWhitelistRequest): Promise<QueryUnpoolWhitelistResponse>;
  /** Returns all of a user's full range CL positions that are superfluid staked. */
  UserConcentratedSuperfluidPositionsDelegated(
    request: UserConcentratedSuperfluidPositionsDelegatedRequest,
  ): Promise<UserConcentratedSuperfluidPositionsDelegatedResponse>;
  UserConcentratedSuperfluidPositionsUndelegating(
    request: UserConcentratedSuperfluidPositionsUndelegatingRequest,
  ): Promise<UserConcentratedSuperfluidPositionsUndelegatingResponse>;
  RestSupply(request: QueryRestSupplyRequest): Promise<QueryRestSupplyResponse>;
}

export const QueryServiceName = "osmosis.superfluid.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.AssetType = this.AssetType.bind(this);
    this.AllAssets = this.AllAssets.bind(this);
    this.AssetMultiplier = this.AssetMultiplier.bind(this);
    this.AllIntermediaryAccounts = this.AllIntermediaryAccounts.bind(this);
    this.ConnectedIntermediaryAccount = this.ConnectedIntermediaryAccount.bind(this);
    this.TotalDelegationByValidatorForDenom = this.TotalDelegationByValidatorForDenom.bind(this);
    this.TotalSuperfluidDelegations = this.TotalSuperfluidDelegations.bind(this);
    this.SuperfluidDelegationAmount = this.SuperfluidDelegationAmount.bind(this);
    this.SuperfluidDelegationsByDelegator = this.SuperfluidDelegationsByDelegator.bind(this);
    this.SuperfluidUndelegationsByDelegator = this.SuperfluidUndelegationsByDelegator.bind(this);
    this.SuperfluidDelegationsByValidatorDenom = this.SuperfluidDelegationsByValidatorDenom.bind(this);
    this.EstimateSuperfluidDelegatedAmountByValidatorDenom = this.EstimateSuperfluidDelegatedAmountByValidatorDenom
      .bind(this);
    this.TotalDelegationByDelegator = this.TotalDelegationByDelegator.bind(this);
    this.UnpoolWhitelist = this.UnpoolWhitelist.bind(this);
    this.UserConcentratedSuperfluidPositionsDelegated = this.UserConcentratedSuperfluidPositionsDelegated.bind(this);
    this.UserConcentratedSuperfluidPositionsUndelegating = this.UserConcentratedSuperfluidPositionsUndelegating.bind(
      this,
    );
    this.RestSupply = this.RestSupply.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  AssetType(request: AssetTypeRequest): Promise<AssetTypeResponse> {
    const data = AssetTypeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AssetType", data);
    return promise.then((data) => AssetTypeResponse.decode(_m0.Reader.create(data)));
  }

  AllAssets(request: AllAssetsRequest): Promise<AllAssetsResponse> {
    const data = AllAssetsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AllAssets", data);
    return promise.then((data) => AllAssetsResponse.decode(_m0.Reader.create(data)));
  }

  AssetMultiplier(request: AssetMultiplierRequest): Promise<AssetMultiplierResponse> {
    const data = AssetMultiplierRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AssetMultiplier", data);
    return promise.then((data) => AssetMultiplierResponse.decode(_m0.Reader.create(data)));
  }

  AllIntermediaryAccounts(request: AllIntermediaryAccountsRequest): Promise<AllIntermediaryAccountsResponse> {
    const data = AllIntermediaryAccountsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AllIntermediaryAccounts", data);
    return promise.then((data) => AllIntermediaryAccountsResponse.decode(_m0.Reader.create(data)));
  }

  ConnectedIntermediaryAccount(
    request: ConnectedIntermediaryAccountRequest,
  ): Promise<ConnectedIntermediaryAccountResponse> {
    const data = ConnectedIntermediaryAccountRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ConnectedIntermediaryAccount", data);
    return promise.then((data) => ConnectedIntermediaryAccountResponse.decode(_m0.Reader.create(data)));
  }

  TotalDelegationByValidatorForDenom(
    request: QueryTotalDelegationByValidatorForDenomRequest,
  ): Promise<QueryTotalDelegationByValidatorForDenomResponse> {
    const data = QueryTotalDelegationByValidatorForDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalDelegationByValidatorForDenom", data);
    return promise.then((data) => QueryTotalDelegationByValidatorForDenomResponse.decode(_m0.Reader.create(data)));
  }

  TotalSuperfluidDelegations(request: TotalSuperfluidDelegationsRequest): Promise<TotalSuperfluidDelegationsResponse> {
    const data = TotalSuperfluidDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalSuperfluidDelegations", data);
    return promise.then((data) => TotalSuperfluidDelegationsResponse.decode(_m0.Reader.create(data)));
  }

  SuperfluidDelegationAmount(request: SuperfluidDelegationAmountRequest): Promise<SuperfluidDelegationAmountResponse> {
    const data = SuperfluidDelegationAmountRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SuperfluidDelegationAmount", data);
    return promise.then((data) => SuperfluidDelegationAmountResponse.decode(_m0.Reader.create(data)));
  }

  SuperfluidDelegationsByDelegator(
    request: SuperfluidDelegationsByDelegatorRequest,
  ): Promise<SuperfluidDelegationsByDelegatorResponse> {
    const data = SuperfluidDelegationsByDelegatorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SuperfluidDelegationsByDelegator", data);
    return promise.then((data) => SuperfluidDelegationsByDelegatorResponse.decode(_m0.Reader.create(data)));
  }

  SuperfluidUndelegationsByDelegator(
    request: SuperfluidUndelegationsByDelegatorRequest,
  ): Promise<SuperfluidUndelegationsByDelegatorResponse> {
    const data = SuperfluidUndelegationsByDelegatorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SuperfluidUndelegationsByDelegator", data);
    return promise.then((data) => SuperfluidUndelegationsByDelegatorResponse.decode(_m0.Reader.create(data)));
  }

  SuperfluidDelegationsByValidatorDenom(
    request: SuperfluidDelegationsByValidatorDenomRequest,
  ): Promise<SuperfluidDelegationsByValidatorDenomResponse> {
    const data = SuperfluidDelegationsByValidatorDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "SuperfluidDelegationsByValidatorDenom", data);
    return promise.then((data) => SuperfluidDelegationsByValidatorDenomResponse.decode(_m0.Reader.create(data)));
  }

  EstimateSuperfluidDelegatedAmountByValidatorDenom(
    request: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest,
  ): Promise<EstimateSuperfluidDelegatedAmountByValidatorDenomResponse> {
    const data = EstimateSuperfluidDelegatedAmountByValidatorDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EstimateSuperfluidDelegatedAmountByValidatorDenom", data);
    return promise.then((data) =>
      EstimateSuperfluidDelegatedAmountByValidatorDenomResponse.decode(_m0.Reader.create(data))
    );
  }

  TotalDelegationByDelegator(
    request: QueryTotalDelegationByDelegatorRequest,
  ): Promise<QueryTotalDelegationByDelegatorResponse> {
    const data = QueryTotalDelegationByDelegatorRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalDelegationByDelegator", data);
    return promise.then((data) => QueryTotalDelegationByDelegatorResponse.decode(_m0.Reader.create(data)));
  }

  UnpoolWhitelist(request: QueryUnpoolWhitelistRequest): Promise<QueryUnpoolWhitelistResponse> {
    const data = QueryUnpoolWhitelistRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UnpoolWhitelist", data);
    return promise.then((data) => QueryUnpoolWhitelistResponse.decode(_m0.Reader.create(data)));
  }

  UserConcentratedSuperfluidPositionsDelegated(
    request: UserConcentratedSuperfluidPositionsDelegatedRequest,
  ): Promise<UserConcentratedSuperfluidPositionsDelegatedResponse> {
    const data = UserConcentratedSuperfluidPositionsDelegatedRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UserConcentratedSuperfluidPositionsDelegated", data);
    return promise.then((data) => UserConcentratedSuperfluidPositionsDelegatedResponse.decode(_m0.Reader.create(data)));
  }

  UserConcentratedSuperfluidPositionsUndelegating(
    request: UserConcentratedSuperfluidPositionsUndelegatingRequest,
  ): Promise<UserConcentratedSuperfluidPositionsUndelegatingResponse> {
    const data = UserConcentratedSuperfluidPositionsUndelegatingRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UserConcentratedSuperfluidPositionsUndelegating", data);
    return promise.then((data) =>
      UserConcentratedSuperfluidPositionsUndelegatingResponse.decode(_m0.Reader.create(data))
    );
  }

  RestSupply(request: QueryRestSupplyRequest): Promise<QueryRestSupplyResponse> {
    const data = QueryRestSupplyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RestSupply", data);
    return promise.then((data) => QueryRestSupplyResponse.decode(_m0.Reader.create(data)));
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
