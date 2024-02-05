/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "./params";
import {
  LockIdIntermediaryAccountConnection,
  OsmoEquivalentMultiplierRecord,
  SuperfluidAsset,
  SuperfluidIntermediaryAccount,
} from "./superfluid";

export const protobufPackage = "osmosis.superfluid";

/** GenesisState defines the module's genesis state. */
export interface GenesisState {
  params:
    | Params
    | undefined;
  /**
   * superfluid_assets defines the registered superfluid assets that have been
   * registered via governance.
   */
  superfluidAssets: SuperfluidAsset[];
  /**
   * osmo_equivalent_multipliers is the records of osmo equivalent amount of
   * each superfluid registered pool, updated every epoch.
   */
  osmoEquivalentMultipliers: OsmoEquivalentMultiplierRecord[];
  /**
   * intermediary_accounts is a secondary account for superfluid staking that
   * plays an intermediary role between validators and the delegators.
   */
  intermediaryAccounts: SuperfluidIntermediaryAccount[];
  intemediaryAccountConnections: LockIdIntermediaryAccountConnection[];
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    superfluidAssets: [],
    osmoEquivalentMultipliers: [],
    intermediaryAccounts: [],
    intemediaryAccountConnections: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.superfluidAssets) {
      SuperfluidAsset.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.osmoEquivalentMultipliers) {
      OsmoEquivalentMultiplierRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.intermediaryAccounts) {
      SuperfluidIntermediaryAccount.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.intemediaryAccountConnections) {
      LockIdIntermediaryAccountConnection.encode(v!, writer.uint32(42).fork()).ldelim();
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

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.superfluidAssets.push(SuperfluidAsset.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.osmoEquivalentMultipliers.push(OsmoEquivalentMultiplierRecord.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.intermediaryAccounts.push(SuperfluidIntermediaryAccount.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.intemediaryAccountConnections.push(
            LockIdIntermediaryAccountConnection.decode(reader, reader.uint32()),
          );
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
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      superfluidAssets: globalThis.Array.isArray(object?.superfluidAssets)
        ? object.superfluidAssets.map((e: any) => SuperfluidAsset.fromJSON(e))
        : [],
      osmoEquivalentMultipliers: globalThis.Array.isArray(object?.osmoEquivalentMultipliers)
        ? object.osmoEquivalentMultipliers.map((e: any) => OsmoEquivalentMultiplierRecord.fromJSON(e))
        : [],
      intermediaryAccounts: globalThis.Array.isArray(object?.intermediaryAccounts)
        ? object.intermediaryAccounts.map((e: any) => SuperfluidIntermediaryAccount.fromJSON(e))
        : [],
      intemediaryAccountConnections: globalThis.Array.isArray(object?.intemediaryAccountConnections)
        ? object.intemediaryAccountConnections.map((e: any) => LockIdIntermediaryAccountConnection.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.superfluidAssets?.length) {
      obj.superfluidAssets = message.superfluidAssets.map((e) => SuperfluidAsset.toJSON(e));
    }
    if (message.osmoEquivalentMultipliers?.length) {
      obj.osmoEquivalentMultipliers = message.osmoEquivalentMultipliers.map((e) =>
        OsmoEquivalentMultiplierRecord.toJSON(e)
      );
    }
    if (message.intermediaryAccounts?.length) {
      obj.intermediaryAccounts = message.intermediaryAccounts.map((e) => SuperfluidIntermediaryAccount.toJSON(e));
    }
    if (message.intemediaryAccountConnections?.length) {
      obj.intemediaryAccountConnections = message.intemediaryAccountConnections.map((e) =>
        LockIdIntermediaryAccountConnection.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.superfluidAssets = object.superfluidAssets?.map((e) => SuperfluidAsset.fromPartial(e)) || [];
    message.osmoEquivalentMultipliers =
      object.osmoEquivalentMultipliers?.map((e) => OsmoEquivalentMultiplierRecord.fromPartial(e)) || [];
    message.intermediaryAccounts =
      object.intermediaryAccounts?.map((e) => SuperfluidIntermediaryAccount.fromPartial(e)) || [];
    message.intemediaryAccountConnections =
      object.intemediaryAccountConnections?.map((e) => LockIdIntermediaryAccountConnection.fromPartial(e)) || [];
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
