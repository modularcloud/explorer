/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  RequestBeginBlock,
  RequestDeliverTx,
  RequestEndBlock,
  ResponseBeginBlock,
  ResponseCommit,
  ResponseDeliverTx,
  ResponseEndBlock,
} from "../../../../tendermint/abci/types";

export const protobufPackage = "cosmos.base.store.v1beta1";

/**
 * StoreKVPair is a KVStore KVPair used for listening to state changes (Sets and Deletes)
 * It optionally includes the StoreKey for the originating KVStore and a Boolean flag to distinguish between Sets and
 * Deletes
 *
 * Since: cosmos-sdk 0.43
 */
export interface StoreKVPair {
  /** the store key for the KVStore this pair originates from */
  storeKey: string;
  /** true indicates a delete operation, false indicates a set operation */
  delete: boolean;
  key: Uint8Array;
  value: Uint8Array;
}

/**
 * BlockMetadata contains all the abci event data of a block
 * the file streamer dump them into files together with the state changes.
 */
export interface BlockMetadata {
  requestBeginBlock: RequestBeginBlock | undefined;
  responseBeginBlock: ResponseBeginBlock | undefined;
  deliverTxs: BlockMetadata_DeliverTx[];
  requestEndBlock: RequestEndBlock | undefined;
  responseEndBlock: ResponseEndBlock | undefined;
  responseCommit: ResponseCommit | undefined;
}

/** DeliverTx encapulate deliver tx request and response. */
export interface BlockMetadata_DeliverTx {
  request: RequestDeliverTx | undefined;
  response: ResponseDeliverTx | undefined;
}

function createBaseStoreKVPair(): StoreKVPair {
  return { storeKey: "", delete: false, key: new Uint8Array(0), value: new Uint8Array(0) };
}

export const StoreKVPair = {
  encode(message: StoreKVPair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.storeKey !== "") {
      writer.uint32(10).string(message.storeKey);
    }
    if (message.delete === true) {
      writer.uint32(16).bool(message.delete);
    }
    if (message.key.length !== 0) {
      writer.uint32(26).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(34).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StoreKVPair {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoreKVPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.storeKey = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.delete = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StoreKVPair {
    return {
      storeKey: isSet(object.storeKey) ? globalThis.String(object.storeKey) : "",
      delete: isSet(object.delete) ? globalThis.Boolean(object.delete) : false,
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: StoreKVPair): unknown {
    const obj: any = {};
    if (message.storeKey !== "") {
      obj.storeKey = message.storeKey;
    }
    if (message.delete === true) {
      obj.delete = message.delete;
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StoreKVPair>, I>>(base?: I): StoreKVPair {
    return StoreKVPair.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StoreKVPair>, I>>(object: I): StoreKVPair {
    const message = createBaseStoreKVPair();
    message.storeKey = object.storeKey ?? "";
    message.delete = object.delete ?? false;
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseBlockMetadata(): BlockMetadata {
  return {
    requestBeginBlock: undefined,
    responseBeginBlock: undefined,
    deliverTxs: [],
    requestEndBlock: undefined,
    responseEndBlock: undefined,
    responseCommit: undefined,
  };
}

export const BlockMetadata = {
  encode(message: BlockMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.requestBeginBlock !== undefined) {
      RequestBeginBlock.encode(message.requestBeginBlock, writer.uint32(10).fork()).ldelim();
    }
    if (message.responseBeginBlock !== undefined) {
      ResponseBeginBlock.encode(message.responseBeginBlock, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.deliverTxs) {
      BlockMetadata_DeliverTx.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.requestEndBlock !== undefined) {
      RequestEndBlock.encode(message.requestEndBlock, writer.uint32(34).fork()).ldelim();
    }
    if (message.responseEndBlock !== undefined) {
      ResponseEndBlock.encode(message.responseEndBlock, writer.uint32(42).fork()).ldelim();
    }
    if (message.responseCommit !== undefined) {
      ResponseCommit.encode(message.responseCommit, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.requestBeginBlock = RequestBeginBlock.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.responseBeginBlock = ResponseBeginBlock.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deliverTxs.push(BlockMetadata_DeliverTx.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.requestEndBlock = RequestEndBlock.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.responseEndBlock = ResponseEndBlock.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.responseCommit = ResponseCommit.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockMetadata {
    return {
      requestBeginBlock: isSet(object.requestBeginBlock)
        ? RequestBeginBlock.fromJSON(object.requestBeginBlock)
        : undefined,
      responseBeginBlock: isSet(object.responseBeginBlock)
        ? ResponseBeginBlock.fromJSON(object.responseBeginBlock)
        : undefined,
      deliverTxs: globalThis.Array.isArray(object?.deliverTxs)
        ? object.deliverTxs.map((e: any) => BlockMetadata_DeliverTx.fromJSON(e))
        : [],
      requestEndBlock: isSet(object.requestEndBlock) ? RequestEndBlock.fromJSON(object.requestEndBlock) : undefined,
      responseEndBlock: isSet(object.responseEndBlock) ? ResponseEndBlock.fromJSON(object.responseEndBlock) : undefined,
      responseCommit: isSet(object.responseCommit) ? ResponseCommit.fromJSON(object.responseCommit) : undefined,
    };
  },

  toJSON(message: BlockMetadata): unknown {
    const obj: any = {};
    if (message.requestBeginBlock !== undefined) {
      obj.requestBeginBlock = RequestBeginBlock.toJSON(message.requestBeginBlock);
    }
    if (message.responseBeginBlock !== undefined) {
      obj.responseBeginBlock = ResponseBeginBlock.toJSON(message.responseBeginBlock);
    }
    if (message.deliverTxs?.length) {
      obj.deliverTxs = message.deliverTxs.map((e) => BlockMetadata_DeliverTx.toJSON(e));
    }
    if (message.requestEndBlock !== undefined) {
      obj.requestEndBlock = RequestEndBlock.toJSON(message.requestEndBlock);
    }
    if (message.responseEndBlock !== undefined) {
      obj.responseEndBlock = ResponseEndBlock.toJSON(message.responseEndBlock);
    }
    if (message.responseCommit !== undefined) {
      obj.responseCommit = ResponseCommit.toJSON(message.responseCommit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockMetadata>, I>>(base?: I): BlockMetadata {
    return BlockMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockMetadata>, I>>(object: I): BlockMetadata {
    const message = createBaseBlockMetadata();
    message.requestBeginBlock = (object.requestBeginBlock !== undefined && object.requestBeginBlock !== null)
      ? RequestBeginBlock.fromPartial(object.requestBeginBlock)
      : undefined;
    message.responseBeginBlock = (object.responseBeginBlock !== undefined && object.responseBeginBlock !== null)
      ? ResponseBeginBlock.fromPartial(object.responseBeginBlock)
      : undefined;
    message.deliverTxs = object.deliverTxs?.map((e) => BlockMetadata_DeliverTx.fromPartial(e)) || [];
    message.requestEndBlock = (object.requestEndBlock !== undefined && object.requestEndBlock !== null)
      ? RequestEndBlock.fromPartial(object.requestEndBlock)
      : undefined;
    message.responseEndBlock = (object.responseEndBlock !== undefined && object.responseEndBlock !== null)
      ? ResponseEndBlock.fromPartial(object.responseEndBlock)
      : undefined;
    message.responseCommit = (object.responseCommit !== undefined && object.responseCommit !== null)
      ? ResponseCommit.fromPartial(object.responseCommit)
      : undefined;
    return message;
  },
};

function createBaseBlockMetadata_DeliverTx(): BlockMetadata_DeliverTx {
  return { request: undefined, response: undefined };
}

export const BlockMetadata_DeliverTx = {
  encode(message: BlockMetadata_DeliverTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.request !== undefined) {
      RequestDeliverTx.encode(message.request, writer.uint32(10).fork()).ldelim();
    }
    if (message.response !== undefined) {
      ResponseDeliverTx.encode(message.response, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockMetadata_DeliverTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockMetadata_DeliverTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.request = RequestDeliverTx.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.response = ResponseDeliverTx.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockMetadata_DeliverTx {
    return {
      request: isSet(object.request) ? RequestDeliverTx.fromJSON(object.request) : undefined,
      response: isSet(object.response) ? ResponseDeliverTx.fromJSON(object.response) : undefined,
    };
  },

  toJSON(message: BlockMetadata_DeliverTx): unknown {
    const obj: any = {};
    if (message.request !== undefined) {
      obj.request = RequestDeliverTx.toJSON(message.request);
    }
    if (message.response !== undefined) {
      obj.response = ResponseDeliverTx.toJSON(message.response);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockMetadata_DeliverTx>, I>>(base?: I): BlockMetadata_DeliverTx {
    return BlockMetadata_DeliverTx.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockMetadata_DeliverTx>, I>>(object: I): BlockMetadata_DeliverTx {
    const message = createBaseBlockMetadata_DeliverTx();
    message.request = (object.request !== undefined && object.request !== null)
      ? RequestDeliverTx.fromPartial(object.request)
      : undefined;
    message.response = (object.response !== undefined && object.response !== null)
      ? ResponseDeliverTx.fromPartial(object.response)
      : undefined;
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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
