/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DistrRecord } from "./incentives";

export const protobufPackage = "osmosis.poolincentives.v1beta1";

/**
 * ReplacePoolIncentivesProposal is a gov Content type for updating the pool
 * incentives. If a ReplacePoolIncentivesProposal passes, the proposal’s records
 * override the existing DistrRecords set in the module. Each record has a
 * specified gauge id and weight, and the incentives are distributed to each
 * gauge according to weight/total_weight. The incentives are put in the fee
 * pool and it is allocated to gauges and community pool by the DistrRecords
 * configuration. Note that gaugeId=0 represents the community pool.
 */
export interface ReplacePoolIncentivesProposal {
  title: string;
  description: string;
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
export interface UpdatePoolIncentivesProposal {
  title: string;
  description: string;
  records: DistrRecord[];
}

function createBaseReplacePoolIncentivesProposal(): ReplacePoolIncentivesProposal {
  return { title: "", description: "", records: [] };
}

export const ReplacePoolIncentivesProposal = {
  encode(message: ReplacePoolIncentivesProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReplacePoolIncentivesProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplacePoolIncentivesProposal();
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
          if (tag !== 26) {
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

  fromJSON(object: any): ReplacePoolIncentivesProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      records: globalThis.Array.isArray(object?.records) ? object.records.map((e: any) => DistrRecord.fromJSON(e)) : [],
    };
  },

  toJSON(message: ReplacePoolIncentivesProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => DistrRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReplacePoolIncentivesProposal>, I>>(base?: I): ReplacePoolIncentivesProposal {
    return ReplacePoolIncentivesProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReplacePoolIncentivesProposal>, I>>(
    object: I,
  ): ReplacePoolIncentivesProposal {
    const message = createBaseReplacePoolIncentivesProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.records = object.records?.map((e) => DistrRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdatePoolIncentivesProposal(): UpdatePoolIncentivesProposal {
  return { title: "", description: "", records: [] };
}

export const UpdatePoolIncentivesProposal = {
  encode(message: UpdatePoolIncentivesProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePoolIncentivesProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePoolIncentivesProposal();
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
          if (tag !== 26) {
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

  fromJSON(object: any): UpdatePoolIncentivesProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      records: globalThis.Array.isArray(object?.records) ? object.records.map((e: any) => DistrRecord.fromJSON(e)) : [],
    };
  },

  toJSON(message: UpdatePoolIncentivesProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.records?.length) {
      obj.records = message.records.map((e) => DistrRecord.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdatePoolIncentivesProposal>, I>>(base?: I): UpdatePoolIncentivesProposal {
    return UpdatePoolIncentivesProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdatePoolIncentivesProposal>, I>>(object: I): UpdatePoolIncentivesProposal {
    const message = createBaseUpdatePoolIncentivesProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
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
