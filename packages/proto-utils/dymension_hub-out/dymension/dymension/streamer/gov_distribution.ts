/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DistrRecord } from "./distr_info";

export const protobufPackage = "dymensionxyz.dymension.streamer";

/**
 * ReplaceStreamDistributionProposal is a gov Content type for updating a stream
 * If a ReplaceStreamDistributionProposal passes, the proposal’s records
 * override the existing DistrRecords set in the module. Each record has a
 * specified gauge id and weight, and the incentives are distributed to each
 * gauge according to weight/total_weight.
 */
export interface ReplaceStreamDistributionProposal {
  title: string;
  description: string;
  streamId: Long;
  records: DistrRecord[];
}

/**
 * For example: if the existing DistrRecords were:
 * [(Gauge 0, 5), (Gauge 1, 6), (Gauge 2, 6)]
 * An UpdatePoolIncentivesProposal includes
 * [(Gauge 1, 0), (Gauge 2, 4), (Gauge 3, 10)]
 * This would delete Gauge 1, Edit Gauge 2, and Add Gauge 3
 * The result DistrRecords in state would be:
 * [(Gauge 0, 5), (Gauge 2, 4), (Gauge 3, 10)]
 */
export interface UpdateStreamDistributionProposal {
  title: string;
  description: string;
  streamId: Long;
  records: DistrRecord[];
}

function createBaseReplaceStreamDistributionProposal(): ReplaceStreamDistributionProposal {
  return { title: "", description: "", streamId: Long.UZERO, records: [] };
}

export const ReplaceStreamDistributionProposal = {
  encode(message: ReplaceStreamDistributionProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (!message.streamId.isZero()) {
      writer.uint32(24).uint64(message.streamId);
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplaceStreamDistributionProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplaceStreamDistributionProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.streamId = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): ReplaceStreamDistributionProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      streamId: isSet(object.streamId) ? Long.fromValue(object.streamId) : Long.UZERO,
      records: globalThis.Array.isArray(object?.records) ? object.records.map((e: any) => DistrRecord.fromJSON(e)) : [],
    };
  },

  toJSON(message: ReplaceStreamDistributionProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (!message.streamId.isZero()) {
      obj.streamId = (message.streamId || Long.UZERO).toString();
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => DistrRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReplaceStreamDistributionProposal>, I>>(
    base?: I,
  ): ReplaceStreamDistributionProposal {
    return ReplaceStreamDistributionProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReplaceStreamDistributionProposal>, I>>(
    object: I,
  ): ReplaceStreamDistributionProposal {
    const message = createBaseReplaceStreamDistributionProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.streamId = (object.streamId !== undefined && object.streamId !== null)
      ? Long.fromValue(object.streamId)
      : Long.UZERO;
    message.records = object.records?.map((e) => DistrRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateStreamDistributionProposal(): UpdateStreamDistributionProposal {
  return { title: "", description: "", streamId: Long.UZERO, records: [] };
}

export const UpdateStreamDistributionProposal = {
  encode(message: UpdateStreamDistributionProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (!message.streamId.isZero()) {
      writer.uint32(24).uint64(message.streamId);
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateStreamDistributionProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateStreamDistributionProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.streamId = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): UpdateStreamDistributionProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      streamId: isSet(object.streamId) ? Long.fromValue(object.streamId) : Long.UZERO,
      records: globalThis.Array.isArray(object?.records) ? object.records.map((e: any) => DistrRecord.fromJSON(e)) : [],
    };
  },

  toJSON(message: UpdateStreamDistributionProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (!message.streamId.isZero()) {
      obj.streamId = (message.streamId || Long.UZERO).toString();
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => DistrRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateStreamDistributionProposal>, I>>(
    base?: I,
  ): UpdateStreamDistributionProposal {
    return UpdateStreamDistributionProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateStreamDistributionProposal>, I>>(
    object: I,
  ): UpdateStreamDistributionProposal {
    const message = createBaseUpdateStreamDistributionProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.streamId = (object.streamId !== undefined && object.streamId !== null)
      ? Long.fromValue(object.streamId)
      : Long.UZERO;
    message.records = object.records?.map((e) => DistrRecord.fromPartial(e)) || [];
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
