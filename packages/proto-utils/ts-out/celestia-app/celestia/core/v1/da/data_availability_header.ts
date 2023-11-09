/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "celestia.core.v1.da";

/**
 * DataAvailabilityHeader contains the row and column roots of the erasure
 * coded version of the data in Block.Data.
 * Therefor the original Block.Data is arranged in a
 * k × k matrix, which is then "extended" to a
 * 2k × 2k matrix applying multiple times Reed-Solomon encoding.
 * For details see Section 5.2: https://arxiv.org/abs/1809.09044
 * or the Celestia specification:
 * https://github.com/celestiaorg/celestia-specs/blob/master/src/specs/data_structures.md#availabledataheader
 * Note that currently we list row and column roots in separate fields
 * (different from the spec).
 */
export interface DataAvailabilityHeader {
  /** RowRoot_j 	= root((M_{j,1} || M_{j,2} || ... || M_{j,2k} )) */
  rowRoots: Uint8Array[];
  /** ColumnRoot_j = root((M_{1,j} || M_{2,j} || ... || M_{2k,j} )) */
  columnRoots: Uint8Array[];
}

function createBaseDataAvailabilityHeader(): DataAvailabilityHeader {
  return { rowRoots: [], columnRoots: [] };
}

export const DataAvailabilityHeader = {
  encode(message: DataAvailabilityHeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.rowRoots) {
      writer.uint32(10).bytes(v!);
    }
    for (const v of message.columnRoots) {
      writer.uint32(18).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataAvailabilityHeader {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataAvailabilityHeader();
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

          message.columnRoots.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DataAvailabilityHeader {
    return {
      rowRoots: globalThis.Array.isArray(object?.rowRoots) ? object.rowRoots.map((e: any) => bytesFromBase64(e)) : [],
      columnRoots: globalThis.Array.isArray(object?.columnRoots)
        ? object.columnRoots.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: DataAvailabilityHeader): unknown {
    const obj: any = {};
    if (message.rowRoots?.length) {
      obj.rowRoots = message.rowRoots.map((e) => base64FromBytes(e));
    }
    if (message.columnRoots?.length) {
      obj.columnRoots = message.columnRoots.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DataAvailabilityHeader>, I>>(base?: I): DataAvailabilityHeader {
    return DataAvailabilityHeader.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DataAvailabilityHeader>, I>>(object: I): DataAvailabilityHeader {
    const message = createBaseDataAvailabilityHeader();
    message.rowRoots = object.rowRoots?.map((e) => e) || [];
    message.columnRoots = object.columnRoots?.map((e) => e) || [];
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
