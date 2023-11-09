/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "celestia.blob.v1";

/**
 * EventPayForBlobs defines an event that is emitted after a pay for blob has
 * been processed.
 */
export interface EventPayForBlobs {
  signer: string;
  blobSizes: number[];
  /**
   * namespaces is a list of namespaces that the blobs in blob_sizes belong to.
   * A namespace has length of 29 bytes where the first byte is the
   * namespaceVersion and the subsequent 28 bytes are the namespaceID.
   */
  namespaces: Uint8Array[];
}

function createBaseEventPayForBlobs(): EventPayForBlobs {
  return { signer: "", blobSizes: [], namespaces: [] };
}

export const EventPayForBlobs = {
  encode(message: EventPayForBlobs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    writer.uint32(18).fork();
    for (const v of message.blobSizes) {
      writer.uint32(v);
    }
    writer.ldelim();
    for (const v of message.namespaces) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventPayForBlobs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventPayForBlobs();
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
          if (tag === 16) {
            message.blobSizes.push(reader.uint32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.blobSizes.push(reader.uint32());
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.namespaces.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventPayForBlobs {
    return {
      signer: isSet(object.signer) ? globalThis.String(object.signer) : "",
      blobSizes: globalThis.Array.isArray(object?.blobSizes)
        ? object.blobSizes.map((e: any) => globalThis.Number(e))
        : [],
      namespaces: globalThis.Array.isArray(object?.namespaces)
        ? object.namespaces.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: EventPayForBlobs): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.blobSizes?.length) {
      obj.blobSizes = message.blobSizes.map((e) => Math.round(e));
    }
    if (message.namespaces?.length) {
      obj.namespaces = message.namespaces.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventPayForBlobs>, I>>(base?: I): EventPayForBlobs {
    return EventPayForBlobs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventPayForBlobs>, I>>(object: I): EventPayForBlobs {
    const message = createBaseEventPayForBlobs();
    message.signer = object.signer ?? "";
    message.blobSizes = object.blobSizes?.map((e) => e) || [];
    message.namespaces = object.namespaces?.map((e) => e) || [];
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
