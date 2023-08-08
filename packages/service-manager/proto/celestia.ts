/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

/** MsgPayForBlobs pays for the inclusion of a blob in the block. */
export interface MsgPayForBlobs {
  signer: string;
  /**
   * namespaces is a list of namespaces that the blobs are associated with. A
   * namespace is a byte slice of length 33 where the first byte is the
   * namespaceVersion and the subsequent 32 bytes are the namespaceId.
   */
  namespaces: Uint8Array[];
  blobSizes: number[];
  /** share_commitments is a list of share commitments (one per blob). */
  shareCommitments: Uint8Array[];
  /**
   * share_versions are the versions of the share format that the blobs
   * associated with this message should use when included in a block. The
   * share_versions specified must match the share_versions used to generate the
   * share_commitment in this message.
   */
  shareVersions: number[];
}

export interface IndexWrapper {
  tx: Uint8Array;
  shareIndexes: number[];
  typeId: string;
}

export interface MalleatedTx {
  originalTxHash: Uint8Array;
  tx: Uint8Array;
}

function createBaseMsgPayForBlobs(): MsgPayForBlobs {
  return {
    signer: "",
    namespaces: [],
    blobSizes: [],
    shareCommitments: [],
    shareVersions: [],
  };
}

export const MsgPayForBlobs = {
  encode(
    message: MsgPayForBlobs,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    for (const v of message.namespaces) {
      writer.uint32(18).bytes(v!);
    }
    writer.uint32(26).fork();
    for (const v of message.blobSizes) {
      writer.uint32(v);
    }
    writer.ldelim();
    for (const v of message.shareCommitments) {
      writer.uint32(34).bytes(v!);
    }
    writer.uint32(66).fork();
    for (const v of message.shareVersions) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPayForBlobs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPayForBlobs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signer = reader.string();
          break;
        case 2:
          message.namespaces.push(reader.bytes());
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.blobSizes.push(reader.uint32());
            }
          } else {
            message.blobSizes.push(reader.uint32());
          }
          break;
        case 4:
          message.shareCommitments.push(reader.bytes());
          break;
        case 8:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.shareVersions.push(reader.uint32());
            }
          } else {
            message.shareVersions.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgPayForBlobs {
    return {
      signer: isSet(object.signer) ? String(object.signer) : "",
      namespaces: Array.isArray(object?.namespaces)
        ? object.namespaces.map((e: any) => bytesFromBase64(e))
        : [],
      blobSizes: Array.isArray(object?.blobSizes)
        ? object.blobSizes.map((e: any) => Number(e))
        : [],
      shareCommitments: Array.isArray(object?.shareCommitments)
        ? object.shareCommitments.map((e: any) => bytesFromBase64(e))
        : [],
      shareVersions: Array.isArray(object?.shareVersions)
        ? object.shareVersions.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: MsgPayForBlobs): unknown {
    const obj: any = {};
    message.signer !== undefined && (obj.signer = message.signer);
    if (message.namespaces) {
      obj.namespaces = message.namespaces.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.namespaces = [];
    }
    if (message.blobSizes) {
      obj.blobSizes = message.blobSizes.map((e) => Math.round(e));
    } else {
      obj.blobSizes = [];
    }
    if (message.shareCommitments) {
      obj.shareCommitments = message.shareCommitments.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array()),
      );
    } else {
      obj.shareCommitments = [];
    }
    if (message.shareVersions) {
      obj.shareVersions = message.shareVersions.map((e) => Math.round(e));
    } else {
      obj.shareVersions = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgPayForBlobs>, I>>(
    base?: I,
  ): MsgPayForBlobs {
    return MsgPayForBlobs.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgPayForBlobs>, I>>(
    object: I,
  ): MsgPayForBlobs {
    const message = createBaseMsgPayForBlobs();
    message.signer = object.signer ?? "";
    message.namespaces = object.namespaces?.map((e) => e) || [];
    message.blobSizes = object.blobSizes?.map((e) => e) || [];
    message.shareCommitments = object.shareCommitments?.map((e) => e) || [];
    message.shareVersions = object.shareVersions?.map((e) => e) || [];
    return message;
  },
};

function createBaseIndexWrapper(): IndexWrapper {
  return { tx: new Uint8Array(), shareIndexes: [], typeId: "" };
}

export const IndexWrapper = {
  encode(
    message: IndexWrapper,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.tx.length !== 0) {
      writer.uint32(10).bytes(message.tx);
    }
    writer.uint32(18).fork();
    for (const v of message.shareIndexes) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.typeId !== "") {
      writer.uint32(26).string(message.typeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndexWrapper {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndexWrapper();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = reader.bytes();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.shareIndexes.push(reader.uint32());
            }
          } else {
            message.shareIndexes.push(reader.uint32());
          }
          break;
        case 3:
          message.typeId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IndexWrapper {
    return {
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(),
      shareIndexes: Array.isArray(object?.shareIndexes)
        ? object.shareIndexes.map((e: any) => Number(e))
        : [],
      typeId: isSet(object.typeId) ? String(object.typeId) : "",
    };
  },

  toJSON(message: IndexWrapper): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = base64FromBytes(
        message.tx !== undefined ? message.tx : new Uint8Array(),
      ));
    if (message.shareIndexes) {
      obj.shareIndexes = message.shareIndexes.map((e) => Math.round(e));
    } else {
      obj.shareIndexes = [];
    }
    message.typeId !== undefined && (obj.typeId = message.typeId);
    return obj;
  },

  create<I extends Exact<DeepPartial<IndexWrapper>, I>>(
    base?: I,
  ): IndexWrapper {
    return IndexWrapper.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<IndexWrapper>, I>>(
    object: I,
  ): IndexWrapper {
    const message = createBaseIndexWrapper();
    message.tx = object.tx ?? new Uint8Array();
    message.shareIndexes = object.shareIndexes?.map((e) => e) || [];
    message.typeId = object.typeId ?? "";
    return message;
  },
};

function createBaseMalleatedTx(): MalleatedTx {
  return { originalTxHash: new Uint8Array(), tx: new Uint8Array() };
}

export const MalleatedTx = {
  encode(
    message: MalleatedTx,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.originalTxHash.length !== 0) {
      writer.uint32(10).bytes(message.originalTxHash);
    }
    if (message.tx.length !== 0) {
      writer.uint32(18).bytes(message.tx);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MalleatedTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMalleatedTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.originalTxHash = reader.bytes();
          break;
        case 2:
          message.tx = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MalleatedTx {
    return {
      originalTxHash: isSet(object.originalTxHash)
        ? bytesFromBase64(object.originalTxHash)
        : new Uint8Array(),
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(),
    };
  },

  toJSON(message: MalleatedTx): unknown {
    const obj: any = {};
    message.originalTxHash !== undefined &&
      (obj.originalTxHash = base64FromBytes(
        message.originalTxHash !== undefined
          ? message.originalTxHash
          : new Uint8Array(),
      ));
    message.tx !== undefined &&
      (obj.tx = base64FromBytes(
        message.tx !== undefined ? message.tx : new Uint8Array(),
      ));
    return obj;
  },

  create<I extends Exact<DeepPartial<MalleatedTx>, I>>(base?: I): MalleatedTx {
    return MalleatedTx.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MalleatedTx>, I>>(
    object: I,
  ): MalleatedTx {
    const message = createBaseMalleatedTx();
    message.originalTxHash = object.originalTxHash ?? new Uint8Array();
    message.tx = object.tx ?? new Uint8Array();
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
