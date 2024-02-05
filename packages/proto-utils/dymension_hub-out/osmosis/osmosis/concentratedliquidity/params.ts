/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";

export const protobufPackage = "osmosis.concentratedliquidity";

export interface Params {
  /**
   * authorized_tick_spacing is an array of uint64s that represents the tick
   * spacing values concentrated-liquidity pools can be created with. For
   * example, an authorized_tick_spacing of [1, 10, 30] allows for pools
   * to be created with tick spacing of 1, 10, or 30.
   */
  authorizedTickSpacing: Long[];
  authorizedSpreadFactors: string[];
  /**
   * balancer_shares_reward_discount is the rate by which incentives flowing
   * from CL to Balancer pools will be discounted to encourage LPs to migrate.
   * e.g. a rate of 0.05 means Balancer LPs get 5% less incentives than full
   * range CL LPs.
   * This field can range from (0,1]. If set to 1, it indicates that all
   * incentives stay at cl pool.
   */
  balancerSharesRewardDiscount: string;
  /**
   * authorized_quote_denoms is a list of quote denoms that can be used as
   * token1 when creating a pool. We limit the quote assets to a small set for
   * the purposes of having convenient price increments stemming from tick to
   * price conversion. These increments are in a human readable magnitude only
   * for token1 as a quote. For limit orders in the future, this will be a
   * desirable property in terms of UX as to allow users to set limit orders at
   * prices in terms of token1 (quote asset) that are easy to reason about.
   */
  authorizedQuoteDenoms: string[];
  authorizedUptimes: Duration[];
  /**
   * is_permissionless_pool_creation_enabled is a boolean that determines if
   * concentrated liquidity pools can be created via message. At launch,
   * we consider allowing only governance to create pools, and then later
   * allowing permissionless pool creation by switching this flag to true
   * with a governance proposal.
   */
  isPermissionlessPoolCreationEnabled: boolean;
  /**
   * unrestricted_pool_creator_whitelist is a list of addresses that are
   * allowed to bypass restrictions on permissionless supercharged pool
   * creation, like pool_creation_enabled, restricted quote assets, no
   * double creation of pools, etc.
   */
  unrestrictedPoolCreatorWhitelist: string[];
  hookGasLimit: Long;
}

function createBaseParams(): Params {
  return {
    authorizedTickSpacing: [],
    authorizedSpreadFactors: [],
    balancerSharesRewardDiscount: "",
    authorizedQuoteDenoms: [],
    authorizedUptimes: [],
    isPermissionlessPoolCreationEnabled: false,
    unrestrictedPoolCreatorWhitelist: [],
    hookGasLimit: Long.UZERO,
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.authorizedTickSpacing) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.authorizedSpreadFactors) {
      writer.uint32(18).string(v!);
    }
    if (message.balancerSharesRewardDiscount !== "") {
      writer.uint32(26).string(message.balancerSharesRewardDiscount);
    }
    for (const v of message.authorizedQuoteDenoms) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.authorizedUptimes) {
      Duration.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.isPermissionlessPoolCreationEnabled === true) {
      writer.uint32(48).bool(message.isPermissionlessPoolCreationEnabled);
    }
    for (const v of message.unrestrictedPoolCreatorWhitelist) {
      writer.uint32(58).string(v!);
    }
    if (!message.hookGasLimit.isZero()) {
      writer.uint32(64).uint64(message.hookGasLimit);
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
          if (tag === 8) {
            message.authorizedTickSpacing.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.authorizedTickSpacing.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.authorizedSpreadFactors.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.balancerSharesRewardDiscount = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.authorizedQuoteDenoms.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.authorizedUptimes.push(Duration.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.isPermissionlessPoolCreationEnabled = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.unrestrictedPoolCreatorWhitelist.push(reader.string());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.hookGasLimit = reader.uint64() as Long;
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
      authorizedTickSpacing: globalThis.Array.isArray(object?.authorizedTickSpacing)
        ? object.authorizedTickSpacing.map((e: any) => Long.fromValue(e))
        : [],
      authorizedSpreadFactors: globalThis.Array.isArray(object?.authorizedSpreadFactors)
        ? object.authorizedSpreadFactors.map((e: any) => globalThis.String(e))
        : [],
      balancerSharesRewardDiscount: isSet(object.balancerSharesRewardDiscount)
        ? globalThis.String(object.balancerSharesRewardDiscount)
        : "",
      authorizedQuoteDenoms: globalThis.Array.isArray(object?.authorizedQuoteDenoms)
        ? object.authorizedQuoteDenoms.map((e: any) => globalThis.String(e))
        : [],
      authorizedUptimes: globalThis.Array.isArray(object?.authorizedUptimes)
        ? object.authorizedUptimes.map((e: any) => Duration.fromJSON(e))
        : [],
      isPermissionlessPoolCreationEnabled: isSet(object.isPermissionlessPoolCreationEnabled)
        ? globalThis.Boolean(object.isPermissionlessPoolCreationEnabled)
        : false,
      unrestrictedPoolCreatorWhitelist: globalThis.Array.isArray(object?.unrestrictedPoolCreatorWhitelist)
        ? object.unrestrictedPoolCreatorWhitelist.map((e: any) => globalThis.String(e))
        : [],
      hookGasLimit: isSet(object.hookGasLimit) ? Long.fromValue(object.hookGasLimit) : Long.UZERO,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.authorizedTickSpacing?.length) {
      obj.authorizedTickSpacing = message.authorizedTickSpacing.map((e) => (e || Long.UZERO).toString());
    }
    if (message.authorizedSpreadFactors?.length) {
      obj.authorizedSpreadFactors = message.authorizedSpreadFactors;
    }
    if (message.balancerSharesRewardDiscount !== "") {
      obj.balancerSharesRewardDiscount = message.balancerSharesRewardDiscount;
    }
    if (message.authorizedQuoteDenoms?.length) {
      obj.authorizedQuoteDenoms = message.authorizedQuoteDenoms;
    }
    if (message.authorizedUptimes?.length) {
      obj.authorizedUptimes = message.authorizedUptimes.map((e) => Duration.toJSON(e));
    }
    if (message.isPermissionlessPoolCreationEnabled === true) {
      obj.isPermissionlessPoolCreationEnabled = message.isPermissionlessPoolCreationEnabled;
    }
    if (message.unrestrictedPoolCreatorWhitelist?.length) {
      obj.unrestrictedPoolCreatorWhitelist = message.unrestrictedPoolCreatorWhitelist;
    }
    if (!message.hookGasLimit.isZero()) {
      obj.hookGasLimit = (message.hookGasLimit || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.authorizedTickSpacing = object.authorizedTickSpacing?.map((e) => Long.fromValue(e)) || [];
    message.authorizedSpreadFactors = object.authorizedSpreadFactors?.map((e) => e) || [];
    message.balancerSharesRewardDiscount = object.balancerSharesRewardDiscount ?? "";
    message.authorizedQuoteDenoms = object.authorizedQuoteDenoms?.map((e) => e) || [];
    message.authorizedUptimes = object.authorizedUptimes?.map((e) => Duration.fromPartial(e)) || [];
    message.isPermissionlessPoolCreationEnabled = object.isPermissionlessPoolCreationEnabled ?? false;
    message.unrestrictedPoolCreatorWhitelist = object.unrestrictedPoolCreatorWhitelist?.map((e) => e) || [];
    message.hookGasLimit = (object.hookGasLimit !== undefined && object.hookGasLimit !== null)
      ? Long.fromValue(object.hookGasLimit)
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
