/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "./params";
import { BaseDenom, CyclicArbTracker, InfoByPoolType, TokenPairArbRoutes } from "./protorev";

export const protobufPackage = "osmosis.protorev.v1beta1";

/** GenesisState defines the protorev module's genesis state. */
export interface GenesisState {
  /** Parameters for the protorev module. */
  params:
    | Params
    | undefined;
  /** Token pair arb routes for the protorev module (hot routes). */
  tokenPairArbRoutes: TokenPairArbRoutes[];
  /**
   * The base denominations being used to create cyclic arbitrage routes via the
   * highest liquidity method.
   */
  baseDenoms: BaseDenom[];
  /** The number of days since module genesis. */
  daysSinceModuleGenesis: Long;
  /** The fees the developer account has accumulated over time. */
  developerFees: Coin[];
  /** The latest block height that the module has processed. */
  latestBlockHeight: Long;
  /** The developer account address of the module. */
  developerAddress: string;
  /**
   * Max pool points per block i.e. the maximum compute time (in ms)
   * that protorev can use per block.
   */
  maxPoolPointsPerBlock: Long;
  /**
   * Max pool points per tx i.e. the maximum compute time (in ms) that
   * protorev can use per tx.
   */
  maxPoolPointsPerTx: Long;
  /** The number of pool points that have been consumed in the current block. */
  pointCountForBlock: Long;
  /** All of the profits that have been accumulated by the module. */
  profits: Coin[];
  /**
   * Information that is used to estimate execution time / gas
   * consumption of a swap on a given pool type.
   */
  infoByPoolType: InfoByPoolType | undefined;
  cyclicArbTracker: CyclicArbTracker | undefined;
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    tokenPairArbRoutes: [],
    baseDenoms: [],
    daysSinceModuleGenesis: Long.UZERO,
    developerFees: [],
    latestBlockHeight: Long.UZERO,
    developerAddress: "",
    maxPoolPointsPerBlock: Long.UZERO,
    maxPoolPointsPerTx: Long.UZERO,
    pointCountForBlock: Long.UZERO,
    profits: [],
    infoByPoolType: undefined,
    cyclicArbTracker: undefined,
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tokenPairArbRoutes) {
      TokenPairArbRoutes.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.baseDenoms) {
      BaseDenom.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.daysSinceModuleGenesis.isZero()) {
      writer.uint32(40).uint64(message.daysSinceModuleGenesis);
    }
    for (const v of message.developerFees) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (!message.latestBlockHeight.isZero()) {
      writer.uint32(56).uint64(message.latestBlockHeight);
    }
    if (message.developerAddress !== "") {
      writer.uint32(66).string(message.developerAddress);
    }
    if (!message.maxPoolPointsPerBlock.isZero()) {
      writer.uint32(72).uint64(message.maxPoolPointsPerBlock);
    }
    if (!message.maxPoolPointsPerTx.isZero()) {
      writer.uint32(80).uint64(message.maxPoolPointsPerTx);
    }
    if (!message.pointCountForBlock.isZero()) {
      writer.uint32(88).uint64(message.pointCountForBlock);
    }
    for (const v of message.profits) {
      Coin.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    if (message.infoByPoolType !== undefined) {
      InfoByPoolType.encode(message.infoByPoolType, writer.uint32(106).fork()).ldelim();
    }
    if (message.cyclicArbTracker !== undefined) {
      CyclicArbTracker.encode(message.cyclicArbTracker, writer.uint32(114).fork()).ldelim();
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
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tokenPairArbRoutes.push(TokenPairArbRoutes.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.baseDenoms.push(BaseDenom.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.daysSinceModuleGenesis = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.developerFees.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.latestBlockHeight = reader.uint64() as Long;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.developerAddress = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.maxPoolPointsPerBlock = reader.uint64() as Long;
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.maxPoolPointsPerTx = reader.uint64() as Long;
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.pointCountForBlock = reader.uint64() as Long;
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.profits.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.infoByPoolType = InfoByPoolType.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.cyclicArbTracker = CyclicArbTracker.decode(reader, reader.uint32());
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
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      tokenPairArbRoutes: globalThis.Array.isArray(object?.tokenPairArbRoutes)
        ? object.tokenPairArbRoutes.map((e: any) => TokenPairArbRoutes.fromJSON(e))
        : [],
      baseDenoms: globalThis.Array.isArray(object?.baseDenoms)
        ? object.baseDenoms.map((e: any) => BaseDenom.fromJSON(e))
        : [],
      daysSinceModuleGenesis: isSet(object.daysSinceModuleGenesis)
        ? Long.fromValue(object.daysSinceModuleGenesis)
        : Long.UZERO,
      developerFees: globalThis.Array.isArray(object?.developerFees)
        ? object.developerFees.map((e: any) => Coin.fromJSON(e))
        : [],
      latestBlockHeight: isSet(object.latestBlockHeight) ? Long.fromValue(object.latestBlockHeight) : Long.UZERO,
      developerAddress: isSet(object.developerAddress) ? globalThis.String(object.developerAddress) : "",
      maxPoolPointsPerBlock: isSet(object.maxPoolPointsPerBlock)
        ? Long.fromValue(object.maxPoolPointsPerBlock)
        : Long.UZERO,
      maxPoolPointsPerTx: isSet(object.maxPoolPointsPerTx) ? Long.fromValue(object.maxPoolPointsPerTx) : Long.UZERO,
      pointCountForBlock: isSet(object.pointCountForBlock) ? Long.fromValue(object.pointCountForBlock) : Long.UZERO,
      profits: globalThis.Array.isArray(object?.profits) ? object.profits.map((e: any) => Coin.fromJSON(e)) : [],
      infoByPoolType: isSet(object.infoByPoolType) ? InfoByPoolType.fromJSON(object.infoByPoolType) : undefined,
      cyclicArbTracker: isSet(object.cyclicArbTracker) ? CyclicArbTracker.fromJSON(object.cyclicArbTracker) : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.tokenPairArbRoutes?.length) {
      obj.tokenPairArbRoutes = message.tokenPairArbRoutes.map((e) => TokenPairArbRoutes.toJSON(e));
    }
    if (message.baseDenoms?.length) {
      obj.baseDenoms = message.baseDenoms.map((e) => BaseDenom.toJSON(e));
    }
    if (!message.daysSinceModuleGenesis.isZero()) {
      obj.daysSinceModuleGenesis = (message.daysSinceModuleGenesis || Long.UZERO).toString();
    }
    if (message.developerFees?.length) {
      obj.developerFees = message.developerFees.map((e) => Coin.toJSON(e));
    }
    if (!message.latestBlockHeight.isZero()) {
      obj.latestBlockHeight = (message.latestBlockHeight || Long.UZERO).toString();
    }
    if (message.developerAddress !== "") {
      obj.developerAddress = message.developerAddress;
    }
    if (!message.maxPoolPointsPerBlock.isZero()) {
      obj.maxPoolPointsPerBlock = (message.maxPoolPointsPerBlock || Long.UZERO).toString();
    }
    if (!message.maxPoolPointsPerTx.isZero()) {
      obj.maxPoolPointsPerTx = (message.maxPoolPointsPerTx || Long.UZERO).toString();
    }
    if (!message.pointCountForBlock.isZero()) {
      obj.pointCountForBlock = (message.pointCountForBlock || Long.UZERO).toString();
    }
    if (message.profits?.length) {
      obj.profits = message.profits.map((e) => Coin.toJSON(e));
    }
    if (message.infoByPoolType !== undefined) {
      obj.infoByPoolType = InfoByPoolType.toJSON(message.infoByPoolType);
    }
    if (message.cyclicArbTracker !== undefined) {
      obj.cyclicArbTracker = CyclicArbTracker.toJSON(message.cyclicArbTracker);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.tokenPairArbRoutes = object.tokenPairArbRoutes?.map((e) => TokenPairArbRoutes.fromPartial(e)) || [];
    message.baseDenoms = object.baseDenoms?.map((e) => BaseDenom.fromPartial(e)) || [];
    message.daysSinceModuleGenesis =
      (object.daysSinceModuleGenesis !== undefined && object.daysSinceModuleGenesis !== null)
        ? Long.fromValue(object.daysSinceModuleGenesis)
        : Long.UZERO;
    message.developerFees = object.developerFees?.map((e) => Coin.fromPartial(e)) || [];
    message.latestBlockHeight = (object.latestBlockHeight !== undefined && object.latestBlockHeight !== null)
      ? Long.fromValue(object.latestBlockHeight)
      : Long.UZERO;
    message.developerAddress = object.developerAddress ?? "";
    message.maxPoolPointsPerBlock =
      (object.maxPoolPointsPerBlock !== undefined && object.maxPoolPointsPerBlock !== null)
        ? Long.fromValue(object.maxPoolPointsPerBlock)
        : Long.UZERO;
    message.maxPoolPointsPerTx = (object.maxPoolPointsPerTx !== undefined && object.maxPoolPointsPerTx !== null)
      ? Long.fromValue(object.maxPoolPointsPerTx)
      : Long.UZERO;
    message.pointCountForBlock = (object.pointCountForBlock !== undefined && object.pointCountForBlock !== null)
      ? Long.fromValue(object.pointCountForBlock)
      : Long.UZERO;
    message.profits = object.profits?.map((e) => Coin.fromPartial(e)) || [];
    message.infoByPoolType = (object.infoByPoolType !== undefined && object.infoByPoolType !== null)
      ? InfoByPoolType.fromPartial(object.infoByPoolType)
      : undefined;
    message.cyclicArbTracker = (object.cyclicArbTracker !== undefined && object.cyclicArbTracker !== null)
      ? CyclicArbTracker.fromPartial(object.cyclicArbTracker)
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
