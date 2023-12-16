/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { BlockDescriptors } from "./block_descriptor";
import { StateStatus, stateStatusFromJSON, stateStatusToJSON } from "./state_status";

export const protobufPackage = "dymensionxyz.dymension.rollapp";

/**
 * StateInfoIndex is the data used for indexing and retrieving a StateInfo
 * it updated and saved with every UpdateState in StateInfo.
 * We use the this structure also for:
 * 1. LatestStateInfoIndex which defines the rollapps' current (latest) index of the last UpdateState
 * 2. LatestFinalizedStateIndex which defines the rollapps' current (latest) index of the latest StateInfo that was finalized
 */
export interface StateInfoIndex {
  /**
   * rollappId is the rollapp that the sequencer belongs to and asking to update
   * it used to identify the what rollapp a StateInfo belongs
   * The rollappId follows the same standard as cosmos chain_id
   */
  rollappId: string;
  /**
   * index is a sequential increasing number, updating on each
   * state update used for indexing to a specific state info, the first index is 1
   */
  index: Long;
}

/** StateInfo defines a rollapps' state. */
export interface StateInfo {
  /**
   * stateInfoIndex defines what rollapp the state belongs to
   * and in which index it can be referenced
   */
  stateInfoIndex:
    | StateInfoIndex
    | undefined;
  /** sequencer is the bech32-encoded address of the sequencer sent the update */
  sequencer: string;
  /** startHeight is the block height of the first block in the batch */
  startHeight: Long;
  /** numBlocks is the number of blocks included in this batch update */
  numBlocks: Long;
  /** DAPath is the description of the location on the DA layer */
  DAPath: string;
  /** version is the version of the rollapp */
  version: Long;
  /** creationHeight is the height at which the UpdateState took place */
  creationHeight: Long;
  /** status is the status of the state update */
  status: StateStatus;
  /**
   * BDs is a list of block description objects (one per block)
   * the list must be ordered by height, starting from startHeight to startHeight+numBlocks-1
   */
  BDs: BlockDescriptors | undefined;
}

/** StateInfoSummary is a compact representation of StateInfo */
export interface StateInfoSummary {
  /**
   * stateInfoIndex defines what rollapp the state belongs to
   * and in which index it can be referenced
   */
  stateInfoIndex:
    | StateInfoIndex
    | undefined;
  /** status is the status of the state update */
  status: StateStatus;
  /** creationHeight is the height at which the UpdateState took place */
  creationHeight: Long;
}

/** BlockHeightToFinalizationQueue defines a map from block height to list of states to finalized */
export interface BlockHeightToFinalizationQueue {
  /** finalizationHeight is the block height that the state should be finalized */
  finalizationHeight: Long;
  /**
   * finalizationQueue is a list of states that are waiting to be finalized
   * when the block height becomes finalizationHeight
   */
  finalizationQueue: StateInfoIndex[];
}

function createBaseStateInfoIndex(): StateInfoIndex {
  return { rollappId: "", index: Long.UZERO };
}

export const StateInfoIndex = {
  encode(message: StateInfoIndex, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    if (!message.index.isZero()) {
      writer.uint32(16).uint64(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StateInfoIndex {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStateInfoIndex();
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
          if (tag !== 16) {
            break;
          }

          message.index = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StateInfoIndex {
    return {
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      index: isSet(object.index) ? Long.fromValue(object.index) : Long.UZERO,
    };
  },

  toJSON(message: StateInfoIndex): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (!message.index.isZero()) {
      obj.index = (message.index || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StateInfoIndex>, I>>(base?: I): StateInfoIndex {
    return StateInfoIndex.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StateInfoIndex>, I>>(object: I): StateInfoIndex {
    const message = createBaseStateInfoIndex();
    message.rollappId = object.rollappId ?? "";
    message.index = (object.index !== undefined && object.index !== null) ? Long.fromValue(object.index) : Long.UZERO;
    return message;
  },
};

function createBaseStateInfo(): StateInfo {
  return {
    stateInfoIndex: undefined,
    sequencer: "",
    startHeight: Long.UZERO,
    numBlocks: Long.UZERO,
    DAPath: "",
    version: Long.UZERO,
    creationHeight: Long.UZERO,
    status: 0,
    BDs: undefined,
  };
}

export const StateInfo = {
  encode(message: StateInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stateInfoIndex !== undefined) {
      StateInfoIndex.encode(message.stateInfoIndex, writer.uint32(10).fork()).ldelim();
    }
    if (message.sequencer !== "") {
      writer.uint32(18).string(message.sequencer);
    }
    if (!message.startHeight.isZero()) {
      writer.uint32(24).uint64(message.startHeight);
    }
    if (!message.numBlocks.isZero()) {
      writer.uint32(32).uint64(message.numBlocks);
    }
    if (message.DAPath !== "") {
      writer.uint32(42).string(message.DAPath);
    }
    if (!message.version.isZero()) {
      writer.uint32(48).uint64(message.version);
    }
    if (!message.creationHeight.isZero()) {
      writer.uint32(56).uint64(message.creationHeight);
    }
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    if (message.BDs !== undefined) {
      BlockDescriptors.encode(message.BDs, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StateInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStateInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stateInfoIndex = StateInfoIndex.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sequencer = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.startHeight = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.numBlocks = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.DAPath = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.version = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.creationHeight = reader.uint64() as Long;
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.BDs = BlockDescriptors.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StateInfo {
    return {
      stateInfoIndex: isSet(object.stateInfoIndex) ? StateInfoIndex.fromJSON(object.stateInfoIndex) : undefined,
      sequencer: isSet(object.sequencer) ? globalThis.String(object.sequencer) : "",
      startHeight: isSet(object.startHeight) ? Long.fromValue(object.startHeight) : Long.UZERO,
      numBlocks: isSet(object.numBlocks) ? Long.fromValue(object.numBlocks) : Long.UZERO,
      DAPath: isSet(object.DAPath) ? globalThis.String(object.DAPath) : "",
      version: isSet(object.version) ? Long.fromValue(object.version) : Long.UZERO,
      creationHeight: isSet(object.creationHeight) ? Long.fromValue(object.creationHeight) : Long.UZERO,
      status: isSet(object.status) ? stateStatusFromJSON(object.status) : 0,
      BDs: isSet(object.BDs) ? BlockDescriptors.fromJSON(object.BDs) : undefined,
    };
  },

  toJSON(message: StateInfo): unknown {
    const obj: any = {};
    if (message.stateInfoIndex !== undefined) {
      obj.stateInfoIndex = StateInfoIndex.toJSON(message.stateInfoIndex);
    }
    if (message.sequencer !== "") {
      obj.sequencer = message.sequencer;
    }
    if (!message.startHeight.isZero()) {
      obj.startHeight = (message.startHeight || Long.UZERO).toString();
    }
    if (!message.numBlocks.isZero()) {
      obj.numBlocks = (message.numBlocks || Long.UZERO).toString();
    }
    if (message.DAPath !== "") {
      obj.DAPath = message.DAPath;
    }
    if (!message.version.isZero()) {
      obj.version = (message.version || Long.UZERO).toString();
    }
    if (!message.creationHeight.isZero()) {
      obj.creationHeight = (message.creationHeight || Long.UZERO).toString();
    }
    if (message.status !== 0) {
      obj.status = stateStatusToJSON(message.status);
    }
    if (message.BDs !== undefined) {
      obj.BDs = BlockDescriptors.toJSON(message.BDs);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StateInfo>, I>>(base?: I): StateInfo {
    return StateInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StateInfo>, I>>(object: I): StateInfo {
    const message = createBaseStateInfo();
    message.stateInfoIndex = (object.stateInfoIndex !== undefined && object.stateInfoIndex !== null)
      ? StateInfoIndex.fromPartial(object.stateInfoIndex)
      : undefined;
    message.sequencer = object.sequencer ?? "";
    message.startHeight = (object.startHeight !== undefined && object.startHeight !== null)
      ? Long.fromValue(object.startHeight)
      : Long.UZERO;
    message.numBlocks = (object.numBlocks !== undefined && object.numBlocks !== null)
      ? Long.fromValue(object.numBlocks)
      : Long.UZERO;
    message.DAPath = object.DAPath ?? "";
    message.version = (object.version !== undefined && object.version !== null)
      ? Long.fromValue(object.version)
      : Long.UZERO;
    message.creationHeight = (object.creationHeight !== undefined && object.creationHeight !== null)
      ? Long.fromValue(object.creationHeight)
      : Long.UZERO;
    message.status = object.status ?? 0;
    message.BDs = (object.BDs !== undefined && object.BDs !== null)
      ? BlockDescriptors.fromPartial(object.BDs)
      : undefined;
    return message;
  },
};

function createBaseStateInfoSummary(): StateInfoSummary {
  return { stateInfoIndex: undefined, status: 0, creationHeight: Long.UZERO };
}

export const StateInfoSummary = {
  encode(message: StateInfoSummary, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stateInfoIndex !== undefined) {
      StateInfoIndex.encode(message.stateInfoIndex, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (!message.creationHeight.isZero()) {
      writer.uint32(24).uint64(message.creationHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StateInfoSummary {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStateInfoSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stateInfoIndex = StateInfoIndex.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.creationHeight = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StateInfoSummary {
    return {
      stateInfoIndex: isSet(object.stateInfoIndex) ? StateInfoIndex.fromJSON(object.stateInfoIndex) : undefined,
      status: isSet(object.status) ? stateStatusFromJSON(object.status) : 0,
      creationHeight: isSet(object.creationHeight) ? Long.fromValue(object.creationHeight) : Long.UZERO,
    };
  },

  toJSON(message: StateInfoSummary): unknown {
    const obj: any = {};
    if (message.stateInfoIndex !== undefined) {
      obj.stateInfoIndex = StateInfoIndex.toJSON(message.stateInfoIndex);
    }
    if (message.status !== 0) {
      obj.status = stateStatusToJSON(message.status);
    }
    if (!message.creationHeight.isZero()) {
      obj.creationHeight = (message.creationHeight || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StateInfoSummary>, I>>(base?: I): StateInfoSummary {
    return StateInfoSummary.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StateInfoSummary>, I>>(object: I): StateInfoSummary {
    const message = createBaseStateInfoSummary();
    message.stateInfoIndex = (object.stateInfoIndex !== undefined && object.stateInfoIndex !== null)
      ? StateInfoIndex.fromPartial(object.stateInfoIndex)
      : undefined;
    message.status = object.status ?? 0;
    message.creationHeight = (object.creationHeight !== undefined && object.creationHeight !== null)
      ? Long.fromValue(object.creationHeight)
      : Long.UZERO;
    return message;
  },
};

function createBaseBlockHeightToFinalizationQueue(): BlockHeightToFinalizationQueue {
  return { finalizationHeight: Long.UZERO, finalizationQueue: [] };
}

export const BlockHeightToFinalizationQueue = {
  encode(message: BlockHeightToFinalizationQueue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.finalizationHeight.isZero()) {
      writer.uint32(8).uint64(message.finalizationHeight);
    }
    for (const v of message.finalizationQueue) {
      StateInfoIndex.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockHeightToFinalizationQueue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockHeightToFinalizationQueue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.finalizationHeight = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.finalizationQueue.push(StateInfoIndex.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockHeightToFinalizationQueue {
    return {
      finalizationHeight: isSet(object.finalizationHeight) ? Long.fromValue(object.finalizationHeight) : Long.UZERO,
      finalizationQueue: globalThis.Array.isArray(object?.finalizationQueue)
        ? object.finalizationQueue.map((e: any) => StateInfoIndex.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BlockHeightToFinalizationQueue): unknown {
    const obj: any = {};
    if (!message.finalizationHeight.isZero()) {
      obj.finalizationHeight = (message.finalizationHeight || Long.UZERO).toString();
    }
    if (message.finalizationQueue?.length) {
      obj.finalizationQueue = message.finalizationQueue.map((e) => StateInfoIndex.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockHeightToFinalizationQueue>, I>>(base?: I): BlockHeightToFinalizationQueue {
    return BlockHeightToFinalizationQueue.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockHeightToFinalizationQueue>, I>>(
    object: I,
  ): BlockHeightToFinalizationQueue {
    const message = createBaseBlockHeightToFinalizationQueue();
    message.finalizationHeight = (object.finalizationHeight !== undefined && object.finalizationHeight !== null)
      ? Long.fromValue(object.finalizationHeight)
      : Long.UZERO;
    message.finalizationQueue = object.finalizationQueue?.map((e) => StateInfoIndex.fromPartial(e)) || [];
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
