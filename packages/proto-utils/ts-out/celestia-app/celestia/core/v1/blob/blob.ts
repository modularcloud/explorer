/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "celestia.core.v1.blob";

/**
 * Blob (named after binary large object) is a chunk of data submitted by a user
 * to be published to the Celestia blockchain. The data of a Blob is published
 * to a namespace and is encoded into shares based on the format specified by
 * share_version.
 */
export interface Blob {
  namespaceId: Uint8Array;
  data: Uint8Array;
  shareVersion: number;
  namespaceVersion: number;
}

/**
 * BlobTx wraps an encoded sdk.Tx with a second field to contain blobs of data.
 * The raw bytes of the blobs are not signed over, instead we verify each blob
 * using the relevant MsgPayForBlobs that is signed over in the encoded sdk.Tx.
 */
export interface BlobTx {
  tx: Uint8Array;
  blobs: Blob[];
  typeId: string;
}

function createBaseBlob(): Blob {
  return { namespaceId: new Uint8Array(0), data: new Uint8Array(0), shareVersion: 0, namespaceVersion: 0 };
}

export const Blob = {
  encode(message: Blob, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.namespaceId.length !== 0) {
      writer.uint32(10).bytes(message.namespaceId);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.shareVersion !== 0) {
      writer.uint32(24).uint32(message.shareVersion);
    }
    if (message.namespaceVersion !== 0) {
      writer.uint32(32).uint32(message.namespaceVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Blob {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlob();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.namespaceId = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.shareVersion = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.namespaceVersion = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Blob {
    return {
      namespaceId: isSet(object.namespaceId) ? bytesFromBase64(object.namespaceId) : new Uint8Array(0),
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      shareVersion: isSet(object.shareVersion) ? globalThis.Number(object.shareVersion) : 0,
      namespaceVersion: isSet(object.namespaceVersion) ? globalThis.Number(object.namespaceVersion) : 0,
    };
  },

  toJSON(message: Blob): unknown {
    const obj: any = {};
    if (message.namespaceId.length !== 0) {
      obj.namespaceId = base64FromBytes(message.namespaceId);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.shareVersion !== 0) {
      obj.shareVersion = Math.round(message.shareVersion);
    }
    if (message.namespaceVersion !== 0) {
      obj.namespaceVersion = Math.round(message.namespaceVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Blob>, I>>(base?: I): Blob {
    return Blob.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Blob>, I>>(object: I): Blob {
    const message = createBaseBlob();
    message.namespaceId = object.namespaceId ?? new Uint8Array(0);
    message.data = object.data ?? new Uint8Array(0);
    message.shareVersion = object.shareVersion ?? 0;
    message.namespaceVersion = object.namespaceVersion ?? 0;
    return message;
  },
};

function createBaseBlobTx(): BlobTx {
  return { tx: new Uint8Array(0), blobs: [], typeId: "" };
}

export const BlobTx = {
  encode(message: BlobTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tx.length !== 0) {
      writer.uint32(10).bytes(message.tx);
    }
    for (const v of message.blobs) {
      Blob.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.typeId !== "") {
      writer.uint32(26).string(message.typeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlobTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlobTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tx = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.blobs.push(Blob.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.typeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlobTx {
    return {
      tx: isSet(object.tx) ? bytesFromBase64(object.tx) : new Uint8Array(0),
      blobs: globalThis.Array.isArray(object?.blobs) ? object.blobs.map((e: any) => Blob.fromJSON(e)) : [],
      typeId: isSet(object.typeId) ? globalThis.String(object.typeId) : "",
    };
  },

  toJSON(message: BlobTx): unknown {
    const obj: any = {};
    if (message.tx.length !== 0) {
      obj.tx = base64FromBytes(message.tx);
    }
    if (message.blobs?.length) {
      obj.blobs = message.blobs.map((e) => Blob.toJSON(e));
    }
    if (message.typeId !== "") {
      obj.typeId = message.typeId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlobTx>, I>>(base?: I): BlobTx {
    return BlobTx.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlobTx>, I>>(object: I): BlobTx {
    const message = createBaseBlobTx();
    message.tx = object.tx ?? new Uint8Array(0);
    message.blobs = object.blobs?.map((e) => Blob.fromPartial(e)) || [];
    message.typeId = object.typeId ?? "";
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
