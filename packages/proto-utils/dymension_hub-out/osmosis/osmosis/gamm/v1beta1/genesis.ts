/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Any } from "../../../google/protobuf/any";
import { MigrationRecords } from "./shared";

export const protobufPackage = "osmosis.gamm.v1beta1";

/** Params holds parameters for the incentives module */
export interface Params {
  poolCreationFee: Coin[];
}

/** GenesisState defines the gamm module's genesis state. */
export interface GenesisState {
  pools: Any[];
  /** will be renamed to next_pool_id in an upcoming version */
  nextPoolNumber: Long;
  params: Params | undefined;
  migrationRecords: MigrationRecords | undefined;
}

function createBaseParams(): Params {
  return { poolCreationFee: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.poolCreationFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.poolCreationFee.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      poolCreationFee: globalThis.Array.isArray(object?.poolCreationFee)
        ? object.poolCreationFee.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.poolCreationFee?.length) {
      obj.poolCreationFee = message.poolCreationFee.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.poolCreationFee = object.poolCreationFee?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return { pools: [], nextPoolNumber: Long.UZERO, params: undefined, migrationRecords: undefined };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pools) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (!message.nextPoolNumber.isZero()) {
      writer.uint32(16).uint64(message.nextPoolNumber);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(26).fork()).ldelim();
    }
    if (message.migrationRecords !== undefined) {
      MigrationRecords.encode(message.migrationRecords, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pools.push(Any.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.nextPoolNumber = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.migrationRecords = MigrationRecords.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      pools: globalThis.Array.isArray(object?.pools) ? object.pools.map((e: any) => Any.fromJSON(e)) : [],
      nextPoolNumber: isSet(object.nextPoolNumber) ? Long.fromValue(object.nextPoolNumber) : Long.UZERO,
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      migrationRecords: isSet(object.migrationRecords) ? MigrationRecords.fromJSON(object.migrationRecords) : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.pools?.length) {
      obj.pools = message.pools.map((e) => Any.toJSON(e));
    }
    if (!message.nextPoolNumber.isZero()) {
      obj.nextPoolNumber = (message.nextPoolNumber || Long.UZERO).toString();
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.migrationRecords !== undefined) {
      obj.migrationRecords = MigrationRecords.toJSON(message.migrationRecords);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.pools = object.pools?.map((e) => Any.fromPartial(e)) || [];
    message.nextPoolNumber = (object.nextPoolNumber !== undefined && object.nextPoolNumber !== null)
      ? Long.fromValue(object.nextPoolNumber)
      : Long.UZERO;
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.migrationRecords = (object.migrationRecords !== undefined && object.migrationRecords !== null)
      ? MigrationRecords.fromPartial(object.migrationRecords)
      : undefined;
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
