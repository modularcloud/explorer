/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dymensionxyz.dymension.rollapp";

export interface DeployerParams {
  /**
   * address is a bech32-encoded address of the
   * accounts that are allowed to create a rollapp.
   */
  address: string;
  /** max_rollapps is the maximum number of rollapps that address allowed to deploy */
  maxRollapps: Long;
}

/** Params defines the parameters for the module. */
export interface Params {
  /**
   * dispute_period_in_blocks the number of blocks it takes
   * to change a status of a state from received to finalized.
   * during that period, any user could submit fraud proof
   */
  disputePeriodInBlocks: Long;
  /**
   * deployer_whitelist is a list of the
   * accounts that are allowed to create a rollapp and maximum number of rollapps.
   * In the case of an empty list, there are no restrictions
   */
  deployerWhitelist: DeployerParams[];
  rollappsEnabled: boolean;
}

function createBaseDeployerParams(): DeployerParams {
  return { address: "", maxRollapps: Long.UZERO };
}

export const DeployerParams = {
  encode(message: DeployerParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (!message.maxRollapps.isZero()) {
      writer.uint32(16).uint64(message.maxRollapps);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeployerParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeployerParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxRollapps = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeployerParams {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      maxRollapps: isSet(object.maxRollapps) ? Long.fromValue(object.maxRollapps) : Long.UZERO,
    };
  },

  toJSON(message: DeployerParams): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (!message.maxRollapps.isZero()) {
      obj.maxRollapps = (message.maxRollapps || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeployerParams>, I>>(base?: I): DeployerParams {
    return DeployerParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeployerParams>, I>>(object: I): DeployerParams {
    const message = createBaseDeployerParams();
    message.address = object.address ?? "";
    message.maxRollapps = (object.maxRollapps !== undefined && object.maxRollapps !== null)
      ? Long.fromValue(object.maxRollapps)
      : Long.UZERO;
    return message;
  },
};

function createBaseParams(): Params {
  return { disputePeriodInBlocks: Long.UZERO, deployerWhitelist: [], rollappsEnabled: false };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.disputePeriodInBlocks.isZero()) {
      writer.uint32(8).uint64(message.disputePeriodInBlocks);
    }
    for (const v of message.deployerWhitelist) {
      DeployerParams.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.rollappsEnabled === true) {
      writer.uint32(24).bool(message.rollappsEnabled);
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
          if (tag !== 8) {
            break;
          }

          message.disputePeriodInBlocks = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deployerWhitelist.push(DeployerParams.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.rollappsEnabled = reader.bool();
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
      disputePeriodInBlocks: isSet(object.disputePeriodInBlocks)
        ? Long.fromValue(object.disputePeriodInBlocks)
        : Long.UZERO,
      deployerWhitelist: globalThis.Array.isArray(object?.deployerWhitelist)
        ? object.deployerWhitelist.map((e: any) => DeployerParams.fromJSON(e))
        : [],
      rollappsEnabled: isSet(object.rollappsEnabled) ? globalThis.Boolean(object.rollappsEnabled) : false,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (!message.disputePeriodInBlocks.isZero()) {
      obj.disputePeriodInBlocks = (message.disputePeriodInBlocks || Long.UZERO).toString();
    }
    if (message.deployerWhitelist?.length) {
      obj.deployerWhitelist = message.deployerWhitelist.map((e) => DeployerParams.toJSON(e));
    }
    if (message.rollappsEnabled === true) {
      obj.rollappsEnabled = message.rollappsEnabled;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.disputePeriodInBlocks =
      (object.disputePeriodInBlocks !== undefined && object.disputePeriodInBlocks !== null)
        ? Long.fromValue(object.disputePeriodInBlocks)
        : Long.UZERO;
    message.deployerWhitelist = object.deployerWhitelist?.map((e) => DeployerParams.fromPartial(e)) || [];
    message.rollappsEnabled = object.rollappsEnabled ?? false;
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
