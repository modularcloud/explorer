/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "celestia.blob.v1";

/** MsgPayForBlobs pays for the inclusion of a blob in the block. */
export interface MsgPayForBlobs {
  /**
   * signer is the bech32 encoded signer address. See
   * https://en.bitcoin.it/wiki/Bech32.
   */
  signer: string;
  /**
   * namespaces is a list of namespaces that the blobs are associated with. A
   * namespace is a byte slice of length 29 where the first byte is the
   * namespaceVersion and the subsequent 28 bytes are the namespaceId.
   */
  namespaces: Uint8Array[];
  /** blob_sizes is a list of blob sizes (one per blob). Each size is in bytes. */
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

/**
 * MsgPayForBlobsResponse describes the response returned after the submission
 * of a PayForBlobs
 */
export interface MsgPayForBlobsResponse {
}

function createBaseMsgPayForBlobs(): MsgPayForBlobs {
  return { signer: "", namespaces: [], blobSizes: [], shareCommitments: [], shareVersions: [] };
}

export const MsgPayForBlobs = {
  encode(message: MsgPayForBlobs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPayForBlobs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.namespaces.push(reader.bytes());
          continue;
        case 3:
          if (tag === 24) {
            message.blobSizes.push(reader.uint32());

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.blobSizes.push(reader.uint32());
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.shareCommitments.push(reader.bytes());
          continue;
        case 8:
          if (tag === 64) {
            message.shareVersions.push(reader.uint32());

            continue;
          }

          if (tag === 66) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.shareVersions.push(reader.uint32());
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

  fromJSON(object: any): MsgPayForBlobs {
    return {
      signer: isSet(object.signer) ? globalThis.String(object.signer) : "",
      namespaces: globalThis.Array.isArray(object?.namespaces)
        ? object.namespaces.map((e: any) => bytesFromBase64(e))
        : [],
      blobSizes: globalThis.Array.isArray(object?.blobSizes)
        ? object.blobSizes.map((e: any) => globalThis.Number(e))
        : [],
      shareCommitments: globalThis.Array.isArray(object?.shareCommitments)
        ? object.shareCommitments.map((e: any) => bytesFromBase64(e))
        : [],
      shareVersions: globalThis.Array.isArray(object?.shareVersions)
        ? object.shareVersions.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: MsgPayForBlobs): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.namespaces?.length) {
      obj.namespaces = message.namespaces.map((e) => base64FromBytes(e));
    }
    if (message.blobSizes?.length) {
      obj.blobSizes = message.blobSizes.map((e) => Math.round(e));
    }
    if (message.shareCommitments?.length) {
      obj.shareCommitments = message.shareCommitments.map((e) => base64FromBytes(e));
    }
    if (message.shareVersions?.length) {
      obj.shareVersions = message.shareVersions.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgPayForBlobs>, I>>(base?: I): MsgPayForBlobs {
    return MsgPayForBlobs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgPayForBlobs>, I>>(object: I): MsgPayForBlobs {
    const message = createBaseMsgPayForBlobs();
    message.signer = object.signer ?? "";
    message.namespaces = object.namespaces?.map((e) => e) || [];
    message.blobSizes = object.blobSizes?.map((e) => e) || [];
    message.shareCommitments = object.shareCommitments?.map((e) => e) || [];
    message.shareVersions = object.shareVersions?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgPayForBlobsResponse(): MsgPayForBlobsResponse {
  return {};
}

export const MsgPayForBlobsResponse = {
  encode(_: MsgPayForBlobsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPayForBlobsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPayForBlobsResponse();
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

  fromJSON(_: any): MsgPayForBlobsResponse {
    return {};
  },

  toJSON(_: MsgPayForBlobsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgPayForBlobsResponse>, I>>(base?: I): MsgPayForBlobsResponse {
    return MsgPayForBlobsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgPayForBlobsResponse>, I>>(_: I): MsgPayForBlobsResponse {
    const message = createBaseMsgPayForBlobsResponse();
    return message;
  },
};

/** Msg defines the blob Msg service. */
export interface Msg {
  /** PayForBlobs allows the user to pay for the inclusion of one or more blobs */
  PayForBlobs(request: MsgPayForBlobs): Promise<MsgPayForBlobsResponse>;
}

export const MsgServiceName = "celestia.blob.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.PayForBlobs = this.PayForBlobs.bind(this);
  }
  PayForBlobs(request: MsgPayForBlobs): Promise<MsgPayForBlobsResponse> {
    const data = MsgPayForBlobs.encode(request).finish();
    const promise = this.rpc.request(this.service, "PayForBlobs", data);
    return promise.then((data) => MsgPayForBlobsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
