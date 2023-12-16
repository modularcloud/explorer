/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { TokenMetadata } from "./bank";
import { BlockDescriptors } from "./block_descriptor";

export const protobufPackage = "dymensionxyz.dymension.rollapp";

/** ===================== MsgCreateRollapp */
export interface MsgCreateRollapp {
  /** creator is the bech32-encoded address of the rollapp creator */
  creator: string;
  /**
   * rollappId is the unique identifier of the rollapp chain.
   * The rollappId follows the same standard as cosmos chain_id
   */
  rollappId: string;
  /**
   * codeStamp is the description of the genesis file location on the DA
   *
   * @deprecated
   */
  codeStamp: string;
  /**
   * genesisPath is the description of the genesis file location on the DA
   *
   * @deprecated
   */
  genesisPath: string;
  /**
   * maxWithholdingBlocks is the maximum number of blocks for
   * an active sequencer to send a state update (MsgUpdateState)
   *
   * @deprecated
   */
  maxWithholdingBlocks: Long;
  /** maxSequencers is the maximum number of sequencers */
  maxSequencers: Long;
  /**
   * permissionedAddresses is a bech32-encoded address list of the
   * sequencers that are allowed to serve this rollappId.
   * In the case of an empty list, the rollapp is considered permissionless
   */
  permissionedAddresses: string[];
  /** metadata provides the client information for all the registered tokens. */
  metadatas: TokenMetadata[];
}

export interface MsgCreateRollappResponse {
}

/**
 * ===================== MsgUpdateState
 * Updating a rollapp state with a block batch
 * a block batch is a list of ordered blocks (by height)
 */
export interface MsgUpdateState {
  /** creator is the bech32-encoded address of the sequencer sending the update */
  creator: string;
  /**
   * rollappId is the rollapp that the sequencer belongs to and asking to update
   * The rollappId follows the same standard as cosmos chain_id
   */
  rollappId: string;
  /** startHeight is the block height of the first block in the batch */
  startHeight: Long;
  /** numBlocks is the number of blocks included in this batch update */
  numBlocks: Long;
  /** DAPath is the description of the location on the DA layer */
  DAPath: string;
  /** version is the version of the rollapp */
  version: Long;
  /**
   * BDs is a list of block description objects (one per block)
   * the list must be ordered by height, starting from startHeight to startHeight+numBlocks-1
   */
  BDs: BlockDescriptors | undefined;
}

export interface MsgUpdateStateResponse {
}

function createBaseMsgCreateRollapp(): MsgCreateRollapp {
  return {
    creator: "",
    rollappId: "",
    codeStamp: "",
    genesisPath: "",
    maxWithholdingBlocks: Long.UZERO,
    maxSequencers: Long.UZERO,
    permissionedAddresses: [],
    metadatas: [],
  };
}

export const MsgCreateRollapp = {
  encode(message: MsgCreateRollapp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.rollappId !== "") {
      writer.uint32(18).string(message.rollappId);
    }
    if (message.codeStamp !== "") {
      writer.uint32(26).string(message.codeStamp);
    }
    if (message.genesisPath !== "") {
      writer.uint32(34).string(message.genesisPath);
    }
    if (!message.maxWithholdingBlocks.isZero()) {
      writer.uint32(40).uint64(message.maxWithholdingBlocks);
    }
    if (!message.maxSequencers.isZero()) {
      writer.uint32(48).uint64(message.maxSequencers);
    }
    for (const v of message.permissionedAddresses) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.metadatas) {
      TokenMetadata.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRollapp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRollapp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rollappId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.codeStamp = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.genesisPath = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.maxWithholdingBlocks = reader.uint64() as Long;
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.maxSequencers = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.permissionedAddresses.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.metadatas.push(TokenMetadata.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRollapp {
    return {
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      codeStamp: isSet(object.codeStamp) ? globalThis.String(object.codeStamp) : "",
      genesisPath: isSet(object.genesisPath) ? globalThis.String(object.genesisPath) : "",
      maxWithholdingBlocks: isSet(object.maxWithholdingBlocks)
        ? Long.fromValue(object.maxWithholdingBlocks)
        : Long.UZERO,
      maxSequencers: isSet(object.maxSequencers) ? Long.fromValue(object.maxSequencers) : Long.UZERO,
      permissionedAddresses: globalThis.Array.isArray(object?.permissionedAddresses)
        ? object.permissionedAddresses.map((e: any) => globalThis.String(e))
        : [],
      metadatas: globalThis.Array.isArray(object?.metadatas)
        ? object.metadatas.map((e: any) => TokenMetadata.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgCreateRollapp): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
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
    if (message.metadatas?.length) {
      obj.metadatas = message.metadatas.map((e) => TokenMetadata.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateRollapp>, I>>(base?: I): MsgCreateRollapp {
    return MsgCreateRollapp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateRollapp>, I>>(object: I): MsgCreateRollapp {
    const message = createBaseMsgCreateRollapp();
    message.creator = object.creator ?? "";
    message.rollappId = object.rollappId ?? "";
    message.codeStamp = object.codeStamp ?? "";
    message.genesisPath = object.genesisPath ?? "";
    message.maxWithholdingBlocks = (object.maxWithholdingBlocks !== undefined && object.maxWithholdingBlocks !== null)
      ? Long.fromValue(object.maxWithholdingBlocks)
      : Long.UZERO;
    message.maxSequencers = (object.maxSequencers !== undefined && object.maxSequencers !== null)
      ? Long.fromValue(object.maxSequencers)
      : Long.UZERO;
    message.permissionedAddresses = object.permissionedAddresses?.map((e) => e) || [];
    message.metadatas = object.metadatas?.map((e) => TokenMetadata.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgCreateRollappResponse(): MsgCreateRollappResponse {
  return {};
}

export const MsgCreateRollappResponse = {
  encode(_: MsgCreateRollappResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRollappResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRollappResponse();
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

  fromJSON(_: any): MsgCreateRollappResponse {
    return {};
  },

  toJSON(_: MsgCreateRollappResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateRollappResponse>, I>>(base?: I): MsgCreateRollappResponse {
    return MsgCreateRollappResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateRollappResponse>, I>>(_: I): MsgCreateRollappResponse {
    const message = createBaseMsgCreateRollappResponse();
    return message;
  },
};

function createBaseMsgUpdateState(): MsgUpdateState {
  return {
    creator: "",
    rollappId: "",
    startHeight: Long.UZERO,
    numBlocks: Long.UZERO,
    DAPath: "",
    version: Long.UZERO,
    BDs: undefined,
  };
}

export const MsgUpdateState = {
  encode(message: MsgUpdateState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.rollappId !== "") {
      writer.uint32(18).string(message.rollappId);
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
    if (message.BDs !== undefined) {
      BlockDescriptors.encode(message.BDs, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rollappId = reader.string();
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
          if (tag !== 58) {
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

  fromJSON(object: any): MsgUpdateState {
    return {
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      startHeight: isSet(object.startHeight) ? Long.fromValue(object.startHeight) : Long.UZERO,
      numBlocks: isSet(object.numBlocks) ? Long.fromValue(object.numBlocks) : Long.UZERO,
      DAPath: isSet(object.DAPath) ? globalThis.String(object.DAPath) : "",
      version: isSet(object.version) ? Long.fromValue(object.version) : Long.UZERO,
      BDs: isSet(object.BDs) ? BlockDescriptors.fromJSON(object.BDs) : undefined,
    };
  },

  toJSON(message: MsgUpdateState): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
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
    if (message.BDs !== undefined) {
      obj.BDs = BlockDescriptors.toJSON(message.BDs);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateState>, I>>(base?: I): MsgUpdateState {
    return MsgUpdateState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateState>, I>>(object: I): MsgUpdateState {
    const message = createBaseMsgUpdateState();
    message.creator = object.creator ?? "";
    message.rollappId = object.rollappId ?? "";
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
    message.BDs = (object.BDs !== undefined && object.BDs !== null)
      ? BlockDescriptors.fromPartial(object.BDs)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateStateResponse(): MsgUpdateStateResponse {
  return {};
}

export const MsgUpdateStateResponse = {
  encode(_: MsgUpdateStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateStateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateStateResponse();
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

  fromJSON(_: any): MsgUpdateStateResponse {
    return {};
  },

  toJSON(_: MsgUpdateStateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateStateResponse>, I>>(base?: I): MsgUpdateStateResponse {
    return MsgUpdateStateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateStateResponse>, I>>(_: I): MsgUpdateStateResponse {
    const message = createBaseMsgUpdateStateResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateRollapp(request: MsgCreateRollapp): Promise<MsgCreateRollappResponse>;
  UpdateState(request: MsgUpdateState): Promise<MsgUpdateStateResponse>;
}

export const MsgServiceName = "dymensionxyz.dymension.rollapp.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateRollapp = this.CreateRollapp.bind(this);
    this.UpdateState = this.UpdateState.bind(this);
  }
  CreateRollapp(request: MsgCreateRollapp): Promise<MsgCreateRollappResponse> {
    const data = MsgCreateRollapp.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateRollapp", data);
    return promise.then((data) => MsgCreateRollappResponse.decode(_m0.Reader.create(data)));
  }

  UpdateState(request: MsgUpdateState): Promise<MsgUpdateStateResponse> {
    const data = MsgUpdateState.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateState", data);
    return promise.then((data) => MsgUpdateStateResponse.decode(_m0.Reader.create(data)));
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
