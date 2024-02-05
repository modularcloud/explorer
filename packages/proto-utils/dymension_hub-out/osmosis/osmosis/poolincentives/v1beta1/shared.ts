/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.poolincentives.v1beta1";

/**
 * MigrationRecords contains all the links between balancer and concentrated
 * pools.
 *
 * This is copied over from the gamm proto file in order to circumnavigate
 * the circular dependency between the two modules.
 */
export interface MigrationRecords {
  balancerToConcentratedPoolLinks: BalancerToConcentratedPoolLink[];
}

/**
 * BalancerToConcentratedPoolLink defines a single link between a single
 * balancer pool and a single concentrated liquidity pool. This link is used to
 * allow a balancer pool to migrate to a single canonical full range
 * concentrated liquidity pool position
 * A balancer pool can be linked to a maximum of one cl pool, and a cl pool can
 * be linked to a maximum of one balancer pool.
 *
 * This is copied over from the gamm proto file in order to circumnavigate
 * the circular dependency between the two modules.
 */
export interface BalancerToConcentratedPoolLink {
  balancerPoolId: Long;
  clPoolId: Long;
}

function createBaseMigrationRecords(): MigrationRecords {
  return { balancerToConcentratedPoolLinks: [] };
}

export const MigrationRecords = {
  encode(message: MigrationRecords, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.balancerToConcentratedPoolLinks) {
      BalancerToConcentratedPoolLink.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MigrationRecords {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMigrationRecords();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.balancerToConcentratedPoolLinks.push(BalancerToConcentratedPoolLink.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MigrationRecords {
    return {
      balancerToConcentratedPoolLinks: globalThis.Array.isArray(object?.balancerToConcentratedPoolLinks)
        ? object.balancerToConcentratedPoolLinks.map((e: any) => BalancerToConcentratedPoolLink.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MigrationRecords): unknown {
    const obj: any = {};
    if (message.balancerToConcentratedPoolLinks?.length) {
      obj.balancerToConcentratedPoolLinks = message.balancerToConcentratedPoolLinks.map((e) =>
        BalancerToConcentratedPoolLink.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MigrationRecords>, I>>(base?: I): MigrationRecords {
    return MigrationRecords.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MigrationRecords>, I>>(object: I): MigrationRecords {
    const message = createBaseMigrationRecords();
    message.balancerToConcentratedPoolLinks =
      object.balancerToConcentratedPoolLinks?.map((e) => BalancerToConcentratedPoolLink.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBalancerToConcentratedPoolLink(): BalancerToConcentratedPoolLink {
  return { balancerPoolId: Long.UZERO, clPoolId: Long.UZERO };
}

export const BalancerToConcentratedPoolLink = {
  encode(message: BalancerToConcentratedPoolLink, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.balancerPoolId.isZero()) {
      writer.uint32(8).uint64(message.balancerPoolId);
    }
    if (!message.clPoolId.isZero()) {
      writer.uint32(16).uint64(message.clPoolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BalancerToConcentratedPoolLink {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalancerToConcentratedPoolLink();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.balancerPoolId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.clPoolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BalancerToConcentratedPoolLink {
    return {
      balancerPoolId: isSet(object.balancerPoolId) ? Long.fromValue(object.balancerPoolId) : Long.UZERO,
      clPoolId: isSet(object.clPoolId) ? Long.fromValue(object.clPoolId) : Long.UZERO,
    };
  },

  toJSON(message: BalancerToConcentratedPoolLink): unknown {
    const obj: any = {};
    if (!message.balancerPoolId.isZero()) {
      obj.balancerPoolId = (message.balancerPoolId || Long.UZERO).toString();
    }
    if (!message.clPoolId.isZero()) {
      obj.clPoolId = (message.clPoolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BalancerToConcentratedPoolLink>, I>>(base?: I): BalancerToConcentratedPoolLink {
    return BalancerToConcentratedPoolLink.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BalancerToConcentratedPoolLink>, I>>(
    object: I,
  ): BalancerToConcentratedPoolLink {
    const message = createBaseBalancerToConcentratedPoolLink();
    message.balancerPoolId = (object.balancerPoolId !== undefined && object.balancerPoolId !== null)
      ? Long.fromValue(object.balancerPoolId)
      : Long.UZERO;
    message.clPoolId = (object.clPoolId !== undefined && object.clPoolId !== null)
      ? Long.fromValue(object.clPoolId)
      : Long.UZERO;
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
