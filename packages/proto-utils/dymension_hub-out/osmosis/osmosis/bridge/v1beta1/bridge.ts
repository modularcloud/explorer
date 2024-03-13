/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.bridge.v1beta1";

export enum AssetStatus {
  ASSET_STATUS_UNSPECIFIED = 0,
  ASSET_STATUS_OK = 1,
  ASSET_STATUS_BLOCKED_INBOUND = 2,
  ASSET_STATUS_BLOCKED_OUTBOUND = 3,
  ASSET_STATUS_BLOCKED_BOTH = 4,
  UNRECOGNIZED = -1,
}

export function assetStatusFromJSON(object: any): AssetStatus {
  switch (object) {
    case 0:
    case "ASSET_STATUS_UNSPECIFIED":
      return AssetStatus.ASSET_STATUS_UNSPECIFIED;
    case 1:
    case "ASSET_STATUS_OK":
      return AssetStatus.ASSET_STATUS_OK;
    case 2:
    case "ASSET_STATUS_BLOCKED_INBOUND":
      return AssetStatus.ASSET_STATUS_BLOCKED_INBOUND;
    case 3:
    case "ASSET_STATUS_BLOCKED_OUTBOUND":
      return AssetStatus.ASSET_STATUS_BLOCKED_OUTBOUND;
    case 4:
    case "ASSET_STATUS_BLOCKED_BOTH":
      return AssetStatus.ASSET_STATUS_BLOCKED_BOTH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AssetStatus.UNRECOGNIZED;
  }
}

export function assetStatusToJSON(object: AssetStatus): string {
  switch (object) {
    case AssetStatus.ASSET_STATUS_UNSPECIFIED:
      return "ASSET_STATUS_UNSPECIFIED";
    case AssetStatus.ASSET_STATUS_OK:
      return "ASSET_STATUS_OK";
    case AssetStatus.ASSET_STATUS_BLOCKED_INBOUND:
      return "ASSET_STATUS_BLOCKED_INBOUND";
    case AssetStatus.ASSET_STATUS_BLOCKED_OUTBOUND:
      return "ASSET_STATUS_BLOCKED_OUTBOUND";
    case AssetStatus.ASSET_STATUS_BLOCKED_BOTH:
      return "ASSET_STATUS_BLOCKED_BOTH";
    case AssetStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Params defines params for x/bridge module. */
export interface Params {
  /** Signers used to sign inbound and release outbound transactions */
  signers: string[];
  /**
   * Assets is a list used to create tokenfactory denoms
   * for corresponding trading pairs
   */
  assets: AssetWithStatus[];
}

/** AssetWithStatus defines a pair of the asset and its current status. */
export interface AssetWithStatus {
  asset: Asset | undefined;
  assetStatus: AssetStatus;
}

/**
 * Asset defines a pair of the source chain name and its Osmosis representation
 * denoted by denom. It also includes a precision used for coins representation.
 */
export interface Asset {
  /** SourceChain is a source chain name */
  sourceChain: string;
  /** Denom is the Osmosis representation of the SourceChain */
  denom: string;
  /** Precision used for coins representation */
  precision: Long;
}

function createBaseParams(): Params {
  return { signers: [], assets: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.signers) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.assets) {
      AssetWithStatus.encode(v!, writer.uint32(18).fork()).ldelim();
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

          message.signers.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.assets.push(AssetWithStatus.decode(reader, reader.uint32()));
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
      signers: globalThis.Array.isArray(object?.signers) ? object.signers.map((e: any) => globalThis.String(e)) : [],
      assets: globalThis.Array.isArray(object?.assets)
        ? object.assets.map((e: any) => AssetWithStatus.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.signers?.length) {
      obj.signers = message.signers;
    }
    if (message.assets?.length) {
      obj.assets = message.assets.map((e) => AssetWithStatus.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.signers = object.signers?.map((e) => e) || [];
    message.assets = object.assets?.map((e) => AssetWithStatus.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAssetWithStatus(): AssetWithStatus {
  return { asset: undefined, assetStatus: 0 };
}

export const AssetWithStatus = {
  encode(message: AssetWithStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.asset !== undefined) {
      Asset.encode(message.asset, writer.uint32(10).fork()).ldelim();
    }
    if (message.assetStatus !== 0) {
      writer.uint32(16).int32(message.assetStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AssetWithStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetWithStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.asset = Asset.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.assetStatus = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AssetWithStatus {
    return {
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      assetStatus: isSet(object.assetStatus) ? assetStatusFromJSON(object.assetStatus) : 0,
    };
  },

  toJSON(message: AssetWithStatus): unknown {
    const obj: any = {};
    if (message.asset !== undefined) {
      obj.asset = Asset.toJSON(message.asset);
    }
    if (message.assetStatus !== 0) {
      obj.assetStatus = assetStatusToJSON(message.assetStatus);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AssetWithStatus>, I>>(base?: I): AssetWithStatus {
    return AssetWithStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AssetWithStatus>, I>>(object: I): AssetWithStatus {
    const message = createBaseAssetWithStatus();
    message.asset = (object.asset !== undefined && object.asset !== null) ? Asset.fromPartial(object.asset) : undefined;
    message.assetStatus = object.assetStatus ?? 0;
    return message;
  },
};

function createBaseAsset(): Asset {
  return { sourceChain: "", denom: "", precision: Long.UZERO };
}

export const Asset = {
  encode(message: Asset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourceChain !== "") {
      writer.uint32(10).string(message.sourceChain);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (!message.precision.isZero()) {
      writer.uint32(24).uint64(message.precision);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Asset {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sourceChain = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.precision = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Asset {
    return {
      sourceChain: isSet(object.sourceChain) ? globalThis.String(object.sourceChain) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      precision: isSet(object.precision) ? Long.fromValue(object.precision) : Long.UZERO,
    };
  },

  toJSON(message: Asset): unknown {
    const obj: any = {};
    if (message.sourceChain !== "") {
      obj.sourceChain = message.sourceChain;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (!message.precision.isZero()) {
      obj.precision = (message.precision || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Asset>, I>>(base?: I): Asset {
    return Asset.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Asset>, I>>(object: I): Asset {
    const message = createBaseAsset();
    message.sourceChain = object.sourceChain ?? "";
    message.denom = object.denom ?? "";
    message.precision = (object.precision !== undefined && object.precision !== null)
      ? Long.fromValue(object.precision)
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
