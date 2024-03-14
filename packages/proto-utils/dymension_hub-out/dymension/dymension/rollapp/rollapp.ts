/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { TokenMetadata } from "./bank";
import { StateInfoIndex } from "./state_info";

export const protobufPackage = "dymensionxyz.dymension.rollapp";

/** GenesisAccount is a struct for the genesis account for the rollapp */
export interface GenesisAccount {
  /** amount of coins to be sent to the genesis address */
  amount:
    | Coin
    | undefined;
  /** address is a bech-32 address of the genesis account */
  address: string;
}

/** RollappGenesisState is a partial repr of the state the hub can expect the rollapp to be in upon genesis */
export interface RollappGenesisState {
  /** genesis_accounts is a list of token allocations */
  genesisAccounts: GenesisAccount[];
  /** is_genesis_event is a boolean that indicates if the genesis event has occured */
  isGenesisEvent: boolean;
}

/**
 * Rollapp defines a rollapp object. First the RollApp is created and then
 * sequencers can be created and attached. The RollApp is identified by rollappId
 */
export interface Rollapp {
  /**
   * The unique identifier of the rollapp chain.
   * The rollappId follows the same standard as cosmos chain_id.
   */
  rollappId: string;
  /** creator is the bech32-encoded address of the rollapp creator. */
  creator: string;
  /**
   * version is the software and configuration version.
   * starts from 1 and increases by one on every MsgUpdateState
   */
  version: Long;
  /**
   * codeStamp is a generated hash for unique identification of the rollapp code.
   *
   * @deprecated
   */
  codeStamp: string;
  /**
   * genesisPath is the description of the genesis file location on the DA.
   *
   * @deprecated
   */
  genesisPath: string;
  /**
   * maxWithholdingBlocks is the maximum number of blocks for
   * an active sequencer to send a state update (MsgUpdateState).
   *
   * @deprecated
   */
  maxWithholdingBlocks: Long;
  /** maxSequencers is the maximum number of sequencers. */
  maxSequencers: Long;
  /**
   * permissionedAddresses is a bech32-encoded address list of the sequencers that are allowed to serve this rollappId.
   * In the case of an empty list, the rollapp is considered permissionless.
   */
  permissionedAddresses: string[];
  /** tokenMetadata is a list of TokenMetadata that are registered on this rollapp */
  tokenMetadata: TokenMetadata[];
  /** genesis_state is a partial repr of the state the hub can expect the rollapp to be in upon genesis */
  genesisState:
    | RollappGenesisState
    | undefined;
  /** channel_id will be set to the canonical IBC channel of the rollapp. */
  channelId: string;
  /** frozen is a boolean that indicates if the rollapp is frozen. */
  frozen: boolean;
}

/** Rollapp summary is a compact representation of Rollapp */
export interface RollappSummary {
  /**
   * The unique identifier of the rollapp chain.
   * The rollappId follows the same standard as cosmos chain_id.
   */
  rollappId: string;
  /** Defines the index of the last rollapp UpdateState. */
  latestStateIndex:
    | StateInfoIndex
    | undefined;
  /** Defines the index of the last rollapp UpdateState that was finalized. */
  latestFinalizedStateIndex: StateInfoIndex | undefined;
}

function createBaseGenesisAccount(): GenesisAccount {
  return { amount: undefined, address: "" };
}

export const GenesisAccount = {
  encode(message: GenesisAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): GenesisAccount {
    return {
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      address: isSet(object.address) ? globalThis.String(object.address) : "",
    };
  },

  toJSON(message: GenesisAccount): unknown {
    const obj: any = {};
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisAccount>, I>>(base?: I): GenesisAccount {
    return GenesisAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisAccount>, I>>(object: I): GenesisAccount {
    const message = createBaseGenesisAccount();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseRollappGenesisState(): RollappGenesisState {
  return { genesisAccounts: [], isGenesisEvent: false };
}

export const RollappGenesisState = {
  encode(message: RollappGenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.genesisAccounts) {
      GenesisAccount.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.isGenesisEvent === true) {
      writer.uint32(16).bool(message.isGenesisEvent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RollappGenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRollappGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.genesisAccounts.push(GenesisAccount.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isGenesisEvent = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RollappGenesisState {
    return {
      genesisAccounts: globalThis.Array.isArray(object?.genesisAccounts)
        ? object.genesisAccounts.map((e: any) => GenesisAccount.fromJSON(e))
        : [],
      isGenesisEvent: isSet(object.isGenesisEvent) ? globalThis.Boolean(object.isGenesisEvent) : false,
    };
  },

  toJSON(message: RollappGenesisState): unknown {
    const obj: any = {};
    if (message.genesisAccounts?.length) {
      obj.genesisAccounts = message.genesisAccounts.map((e) => GenesisAccount.toJSON(e));
    }
    if (message.isGenesisEvent === true) {
      obj.isGenesisEvent = message.isGenesisEvent;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RollappGenesisState>, I>>(base?: I): RollappGenesisState {
    return RollappGenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RollappGenesisState>, I>>(object: I): RollappGenesisState {
    const message = createBaseRollappGenesisState();
    message.genesisAccounts = object.genesisAccounts?.map((e) => GenesisAccount.fromPartial(e)) || [];
    message.isGenesisEvent = object.isGenesisEvent ?? false;
    return message;
  },
};

function createBaseRollapp(): Rollapp {
  return {
    rollappId: "",
    creator: "",
    version: Long.UZERO,
    codeStamp: "",
    genesisPath: "",
    maxWithholdingBlocks: Long.UZERO,
    maxSequencers: Long.UZERO,
    permissionedAddresses: [],
    tokenMetadata: [],
    genesisState: undefined,
    channelId: "",
    frozen: false,
  };
}

export const Rollapp = {
  encode(message: Rollapp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (!message.version.isZero()) {
      writer.uint32(24).uint64(message.version);
    }
    if (message.codeStamp !== "") {
      writer.uint32(34).string(message.codeStamp);
    }
    if (message.genesisPath !== "") {
      writer.uint32(42).string(message.genesisPath);
    }
    if (!message.maxWithholdingBlocks.isZero()) {
      writer.uint32(48).uint64(message.maxWithholdingBlocks);
    }
    if (!message.maxSequencers.isZero()) {
      writer.uint32(56).uint64(message.maxSequencers);
    }
    for (const v of message.permissionedAddresses) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.tokenMetadata) {
      TokenMetadata.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.genesisState !== undefined) {
      RollappGenesisState.encode(message.genesisState, writer.uint32(82).fork()).ldelim();
    }
    if (message.channelId !== "") {
      writer.uint32(90).string(message.channelId);
    }
    if (message.frozen === true) {
      writer.uint32(96).bool(message.frozen);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rollapp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRollapp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rollappId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.version = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.codeStamp = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.genesisPath = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.maxWithholdingBlocks = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.maxSequencers = reader.uint64() as Long;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.permissionedAddresses.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.tokenMetadata.push(TokenMetadata.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.genesisState = RollappGenesisState.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.frozen = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Rollapp {
    return {
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      version: isSet(object.version) ? Long.fromValue(object.version) : Long.UZERO,
      codeStamp: isSet(object.codeStamp) ? globalThis.String(object.codeStamp) : "",
      genesisPath: isSet(object.genesisPath) ? globalThis.String(object.genesisPath) : "",
      maxWithholdingBlocks: isSet(object.maxWithholdingBlocks)
        ? Long.fromValue(object.maxWithholdingBlocks)
        : Long.UZERO,
      maxSequencers: isSet(object.maxSequencers) ? Long.fromValue(object.maxSequencers) : Long.UZERO,
      permissionedAddresses: globalThis.Array.isArray(object?.permissionedAddresses)
        ? object.permissionedAddresses.map((e: any) => globalThis.String(e))
        : [],
      tokenMetadata: globalThis.Array.isArray(object?.tokenMetadata)
        ? object.tokenMetadata.map((e: any) => TokenMetadata.fromJSON(e))
        : [],
      genesisState: isSet(object.genesisState) ? RollappGenesisState.fromJSON(object.genesisState) : undefined,
      channelId: isSet(object.channelId) ? globalThis.String(object.channelId) : "",
      frozen: isSet(object.frozen) ? globalThis.Boolean(object.frozen) : false,
    };
  },

  toJSON(message: Rollapp): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (!message.version.isZero()) {
      obj.version = (message.version || Long.UZERO).toString();
    }
    if (message.codeStamp !== "") {
      obj.codeStamp = message.codeStamp;
    }
    if (message.genesisPath !== "") {
      obj.genesisPath = message.genesisPath;
    }
    if (!message.maxWithholdingBlocks.isZero()) {
      obj.maxWithholdingBlocks = (message.maxWithholdingBlocks || Long.UZERO).toString();
    }
    if (!message.maxSequencers.isZero()) {
      obj.maxSequencers = (message.maxSequencers || Long.UZERO).toString();
    }
    if (message.permissionedAddresses?.length) {
      obj.permissionedAddresses = message.permissionedAddresses;
    }
    if (message.tokenMetadata?.length) {
      obj.tokenMetadata = message.tokenMetadata.map((e) => TokenMetadata.toJSON(e));
    }
    if (message.genesisState !== undefined) {
      obj.genesisState = RollappGenesisState.toJSON(message.genesisState);
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.frozen === true) {
      obj.frozen = message.frozen;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Rollapp>, I>>(base?: I): Rollapp {
    return Rollapp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Rollapp>, I>>(object: I): Rollapp {
    const message = createBaseRollapp();
    message.rollappId = object.rollappId ?? "";
    message.creator = object.creator ?? "";
    message.version = (object.version !== undefined && object.version !== null)
      ? Long.fromValue(object.version)
      : Long.UZERO;
    message.codeStamp = object.codeStamp ?? "";
    message.genesisPath = object.genesisPath ?? "";
    message.maxWithholdingBlocks = (object.maxWithholdingBlocks !== undefined && object.maxWithholdingBlocks !== null)
      ? Long.fromValue(object.maxWithholdingBlocks)
      : Long.UZERO;
    message.maxSequencers = (object.maxSequencers !== undefined && object.maxSequencers !== null)
      ? Long.fromValue(object.maxSequencers)
      : Long.UZERO;
    message.permissionedAddresses = object.permissionedAddresses?.map((e) => e) || [];
    message.tokenMetadata = object.tokenMetadata?.map((e) => TokenMetadata.fromPartial(e)) || [];
    message.genesisState = (object.genesisState !== undefined && object.genesisState !== null)
      ? RollappGenesisState.fromPartial(object.genesisState)
      : undefined;
    message.channelId = object.channelId ?? "";
    message.frozen = object.frozen ?? false;
    return message;
  },
};

function createBaseRollappSummary(): RollappSummary {
  return { rollappId: "", latestStateIndex: undefined, latestFinalizedStateIndex: undefined };
}

export const RollappSummary = {
  encode(message: RollappSummary, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    if (message.latestStateIndex !== undefined) {
      StateInfoIndex.encode(message.latestStateIndex, writer.uint32(18).fork()).ldelim();
    }
    if (message.latestFinalizedStateIndex !== undefined) {
      StateInfoIndex.encode(message.latestFinalizedStateIndex, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RollappSummary {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRollappSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rollappId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.latestStateIndex = StateInfoIndex.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.latestFinalizedStateIndex = StateInfoIndex.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RollappSummary {
    return {
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      latestStateIndex: isSet(object.latestStateIndex) ? StateInfoIndex.fromJSON(object.latestStateIndex) : undefined,
      latestFinalizedStateIndex: isSet(object.latestFinalizedStateIndex)
        ? StateInfoIndex.fromJSON(object.latestFinalizedStateIndex)
        : undefined,
    };
  },

  toJSON(message: RollappSummary): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (message.latestStateIndex !== undefined) {
      obj.latestStateIndex = StateInfoIndex.toJSON(message.latestStateIndex);
    }
    if (message.latestFinalizedStateIndex !== undefined) {
      obj.latestFinalizedStateIndex = StateInfoIndex.toJSON(message.latestFinalizedStateIndex);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RollappSummary>, I>>(base?: I): RollappSummary {
    return RollappSummary.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RollappSummary>, I>>(object: I): RollappSummary {
    const message = createBaseRollappSummary();
    message.rollappId = object.rollappId ?? "";
    message.latestStateIndex = (object.latestStateIndex !== undefined && object.latestStateIndex !== null)
      ? StateInfoIndex.fromPartial(object.latestStateIndex)
      : undefined;
    message.latestFinalizedStateIndex =
      (object.latestFinalizedStateIndex !== undefined && object.latestFinalizedStateIndex !== null)
        ? StateInfoIndex.fromPartial(object.latestFinalizedStateIndex)
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
