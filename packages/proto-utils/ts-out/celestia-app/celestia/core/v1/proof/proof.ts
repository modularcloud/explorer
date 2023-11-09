/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Proof } from "../../../../tendermint/crypto/proof";

export const protobufPackage = "celestia.core.v1.proof";

/**
 * ShareProof is an NMT proof that a set of shares exist in a set of rows and a
 * Merkle proof that those rows exist in a Merkle tree with a given data root.
 */
export interface ShareProof {
  data: Uint8Array[];
  shareProofs: NMTProof[];
  namespaceId: Uint8Array;
  rowProof: RowProof | undefined;
  namespaceVersion: number;
}

/**
 * RowProof is a Merkle proof that a set of rows exist in a Merkle tree with a
 * given data root.
 */
export interface RowProof {
  rowRoots: Uint8Array[];
  proofs: Proof[];
  root: Uint8Array;
  startRow: number;
  endRow: number;
}

/**
 * NMTProof is a proof of a namespace.ID in an NMT.
 * In case this proof proves the absence of a namespace.ID
 * in a tree it also contains the leaf hashes of the range
 * where that namespace would be.
 */
export interface NMTProof {
  /** Start index of this proof. */
  start: number;
  /** End index of this proof. */
  end: number;
  /**
   * Nodes that together with the corresponding leaf values can be used to
   * recompute the root and verify this proof. Nodes should consist of the max
   * and min namespaces along with the actual hash, resulting in each being 48
   * bytes each
   */
  nodes: Uint8Array[];
  /**
   * leafHash are nil if the namespace is present in the NMT. In case the
   * namespace to be proved is in the min/max range of the tree but absent, this
   * will contain the leaf hash necessary to verify the proof of absence. Leaf
   * hashes should consist of the namespace along with the actual hash,
   * resulting 40 bytes total.
   */
  leafHash: Uint8Array;
}

function createBaseShareProof(): ShareProof {
  return { data: [], shareProofs: [], namespaceId: new Uint8Array(0), rowProof: undefined, namespaceVersion: 0 };
}

export const ShareProof = {
  encode(message: ShareProof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      writer.uint32(10).bytes(v!);
    }
    for (const v of message.shareProofs) {
      NMTProof.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.namespaceId.length !== 0) {
      writer.uint32(26).bytes(message.namespaceId);
    }
    if (message.rowProof !== undefined) {
      RowProof.encode(message.rowProof, writer.uint32(34).fork()).ldelim();
    }
    if (message.namespaceVersion !== 0) {
      writer.uint32(40).uint32(message.namespaceVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ShareProof {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseShareProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data.push(reader.bytes());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.shareProofs.push(NMTProof.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.namespaceId = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.rowProof = RowProof.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
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

  fromJSON(object: any): ShareProof {
    return {
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e: any) => bytesFromBase64(e)) : [],
      shareProofs: globalThis.Array.isArray(object?.shareProofs)
        ? object.shareProofs.map((e: any) => NMTProof.fromJSON(e))
        : [],
      namespaceId: isSet(object.namespaceId) ? bytesFromBase64(object.namespaceId) : new Uint8Array(0),
      rowProof: isSet(object.rowProof) ? RowProof.fromJSON(object.rowProof) : undefined,
      namespaceVersion: isSet(object.namespaceVersion) ? globalThis.Number(object.namespaceVersion) : 0,
    };
  },

  toJSON(message: ShareProof): unknown {
    const obj: any = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => base64FromBytes(e));
    }
    if (message.shareProofs?.length) {
      obj.shareProofs = message.shareProofs.map((e) => NMTProof.toJSON(e));
    }
    if (message.namespaceId.length !== 0) {
      obj.namespaceId = base64FromBytes(message.namespaceId);
    }
    if (message.rowProof !== undefined) {
      obj.rowProof = RowProof.toJSON(message.rowProof);
    }
    if (message.namespaceVersion !== 0) {
      obj.namespaceVersion = Math.round(message.namespaceVersion);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ShareProof>, I>>(base?: I): ShareProof {
    return ShareProof.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ShareProof>, I>>(object: I): ShareProof {
    const message = createBaseShareProof();
    message.data = object.data?.map((e) => e) || [];
    message.shareProofs = object.shareProofs?.map((e) => NMTProof.fromPartial(e)) || [];
    message.namespaceId = object.namespaceId ?? new Uint8Array(0);
    message.rowProof = (object.rowProof !== undefined && object.rowProof !== null)
      ? RowProof.fromPartial(object.rowProof)
      : undefined;
    message.namespaceVersion = object.namespaceVersion ?? 0;
    return message;
  },
};

function createBaseRowProof(): RowProof {
  return { rowRoots: [], proofs: [], root: new Uint8Array(0), startRow: 0, endRow: 0 };
}

export const RowProof = {
  encode(message: RowProof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.rowRoots) {
      writer.uint32(10).bytes(v!);
    }
    for (const v of message.proofs) {
      Proof.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.root.length !== 0) {
      writer.uint32(26).bytes(message.root);
    }
    if (message.startRow !== 0) {
      writer.uint32(32).uint32(message.startRow);
    }
    if (message.endRow !== 0) {
      writer.uint32(40).uint32(message.endRow);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RowProof {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRowProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rowRoots.push(reader.bytes());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proofs.push(Proof.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.root = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.startRow = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.endRow = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RowProof {
    return {
      rowRoots: globalThis.Array.isArray(object?.rowRoots) ? object.rowRoots.map((e: any) => bytesFromBase64(e)) : [],
      proofs: globalThis.Array.isArray(object?.proofs) ? object.proofs.map((e: any) => Proof.fromJSON(e)) : [],
      root: isSet(object.root) ? bytesFromBase64(object.root) : new Uint8Array(0),
      startRow: isSet(object.startRow) ? globalThis.Number(object.startRow) : 0,
      endRow: isSet(object.endRow) ? globalThis.Number(object.endRow) : 0,
    };
  },

  toJSON(message: RowProof): unknown {
    const obj: any = {};
    if (message.rowRoots?.length) {
      obj.rowRoots = message.rowRoots.map((e) => base64FromBytes(e));
    }
    if (message.proofs?.length) {
      obj.proofs = message.proofs.map((e) => Proof.toJSON(e));
    }
    if (message.root.length !== 0) {
      obj.root = base64FromBytes(message.root);
    }
    if (message.startRow !== 0) {
      obj.startRow = Math.round(message.startRow);
    }
    if (message.endRow !== 0) {
      obj.endRow = Math.round(message.endRow);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RowProof>, I>>(base?: I): RowProof {
    return RowProof.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RowProof>, I>>(object: I): RowProof {
    const message = createBaseRowProof();
    message.rowRoots = object.rowRoots?.map((e) => e) || [];
    message.proofs = object.proofs?.map((e) => Proof.fromPartial(e)) || [];
    message.root = object.root ?? new Uint8Array(0);
    message.startRow = object.startRow ?? 0;
    message.endRow = object.endRow ?? 0;
    return message;
  },
};

function createBaseNMTProof(): NMTProof {
  return { start: 0, end: 0, nodes: [], leafHash: new Uint8Array(0) };
}

export const NMTProof = {
  encode(message: NMTProof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    for (const v of message.nodes) {
      writer.uint32(26).bytes(v!);
    }
    if (message.leafHash.length !== 0) {
      writer.uint32(34).bytes(message.leafHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NMTProof {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNMTProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.start = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.end = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nodes.push(reader.bytes());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.leafHash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NMTProof {
    return {
      start: isSet(object.start) ? globalThis.Number(object.start) : 0,
      end: isSet(object.end) ? globalThis.Number(object.end) : 0,
      nodes: globalThis.Array.isArray(object?.nodes) ? object.nodes.map((e: any) => bytesFromBase64(e)) : [],
      leafHash: isSet(object.leafHash) ? bytesFromBase64(object.leafHash) : new Uint8Array(0),
    };
  },

  toJSON(message: NMTProof): unknown {
    const obj: any = {};
    if (message.start !== 0) {
      obj.start = Math.round(message.start);
    }
    if (message.end !== 0) {
      obj.end = Math.round(message.end);
    }
    if (message.nodes?.length) {
      obj.nodes = message.nodes.map((e) => base64FromBytes(e));
    }
    if (message.leafHash.length !== 0) {
      obj.leafHash = base64FromBytes(message.leafHash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NMTProof>, I>>(base?: I): NMTProof {
    return NMTProof.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NMTProof>, I>>(object: I): NMTProof {
    const message = createBaseNMTProof();
    message.start = object.start ?? 0;
    message.end = object.end ?? 0;
    message.nodes = object.nodes?.map((e) => e) || [];
    message.leafHash = object.leafHash ?? new Uint8Array(0);
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
