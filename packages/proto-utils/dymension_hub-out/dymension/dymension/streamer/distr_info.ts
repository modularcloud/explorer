/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dymensionxyz.dymension.streamer";

export interface DistrInfo {
  totalWeight: string;
  records: DistrRecord[];
}

export interface DistrRecord {
  gaugeId: Long;
  weight: string;
}

function createBaseDistrInfo(): DistrInfo {
  return { totalWeight: "", records: [] };
}

export const DistrInfo = {
  encode(message: DistrInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalWeight !== "") {
      writer.uint32(10).string(message.totalWeight);
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistrInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistrInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.totalWeight = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.records.push(DistrRecord.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DistrInfo {
    return {
      totalWeight: isSet(object.totalWeight) ? globalThis.String(object.totalWeight) : "",
      records: globalThis.Array.isArray(object?.records) ? object.records.map((e: any) => DistrRecord.fromJSON(e)) : [],
    };
  },

  toJSON(message: DistrInfo): unknown {
    const obj: any = {};
    if (message.totalWeight !== "") {
      obj.totalWeight = message.totalWeight;
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => DistrRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DistrInfo>, I>>(base?: I): DistrInfo {
    return DistrInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DistrInfo>, I>>(object: I): DistrInfo {
    const message = createBaseDistrInfo();
    message.totalWeight = object.totalWeight ?? "";
    message.records = object.records?.map((e) => DistrRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDistrRecord(): DistrRecord {
  return { gaugeId: Long.UZERO, weight: "" };
}

export const DistrRecord = {
  encode(message: DistrRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.gaugeId.isZero()) {
      writer.uint32(8).uint64(message.gaugeId);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistrRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistrRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.gaugeId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.weight = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DistrRecord {
    return {
      gaugeId: isSet(object.gaugeId) ? Long.fromValue(object.gaugeId) : Long.UZERO,
      weight: isSet(object.weight) ? globalThis.String(object.weight) : "",
    };
  },

  toJSON(message: DistrRecord): unknown {
    const obj: any = {};
    if (!message.gaugeId.isZero()) {
      obj.gaugeId = (message.gaugeId || Long.UZERO).toString();
    }
    if (message.weight !== "") {
      obj.weight = message.weight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DistrRecord>, I>>(base?: I): DistrRecord {
    return DistrRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DistrRecord>, I>>(object: I): DistrRecord {
    const message = createBaseDistrRecord();
    message.gaugeId = (object.gaugeId !== undefined && object.gaugeId !== null)
      ? Long.fromValue(object.gaugeId)
      : Long.UZERO;
    message.weight = object.weight ?? "";
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
