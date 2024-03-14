/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "osmosis.incentives";

/** Params holds parameters for the incentives module */
export interface Params {
  /**
   * distr_epoch_identifier is what epoch type distribution will be triggered by
   * (day, week, etc.)
   */
  distrEpochIdentifier: string;
  /**
   * group_creation_fee is the fee required to create a new group
   * It is only charged to all addresses other than incentive module account
   * or addresses in the unrestricted_creator_whitelist
   */
  groupCreationFee: Coin[];
  /**
   * unrestricted_creator_whitelist is a list of addresses that are
   * allowed to bypass restrictions on permissionless Group
   * creation. In the future, we might expand these to creating gauges
   * as well.
   * The goal of this is to allow a subdao to manage incentives efficiently
   * without being stopped by 5 day governance process or a high fee.
   * At the same time, it prevents spam by having a fee for all
   * other users.
   */
  unrestrictedCreatorWhitelist: string[];
}

function createBaseParams(): Params {
  return { distrEpochIdentifier: "", groupCreationFee: [], unrestrictedCreatorWhitelist: [] };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.distrEpochIdentifier !== "") {
      writer.uint32(10).string(message.distrEpochIdentifier);
    }
    for (const v of message.groupCreationFee) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.unrestrictedCreatorWhitelist) {
      writer.uint32(26).string(v!);
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

          message.distrEpochIdentifier = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groupCreationFee.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.unrestrictedCreatorWhitelist.push(reader.string());
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
      distrEpochIdentifier: isSet(object.distrEpochIdentifier) ? globalThis.String(object.distrEpochIdentifier) : "",
      groupCreationFee: globalThis.Array.isArray(object?.groupCreationFee)
        ? object.groupCreationFee.map((e: any) => Coin.fromJSON(e))
        : [],
      unrestrictedCreatorWhitelist: globalThis.Array.isArray(object?.unrestrictedCreatorWhitelist)
        ? object.unrestrictedCreatorWhitelist.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.distrEpochIdentifier !== "") {
      obj.distrEpochIdentifier = message.distrEpochIdentifier;
    }
    if (message.groupCreationFee?.length) {
      obj.groupCreationFee = message.groupCreationFee.map((e) => Coin.toJSON(e));
    }
    if (message.unrestrictedCreatorWhitelist?.length) {
      obj.unrestrictedCreatorWhitelist = message.unrestrictedCreatorWhitelist;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.distrEpochIdentifier = object.distrEpochIdentifier ?? "";
    message.groupCreationFee = object.groupCreationFee?.map((e) => Coin.fromPartial(e)) || [];
    message.unrestrictedCreatorWhitelist = object.unrestrictedCreatorWhitelist?.map((e) => e) || [];
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
