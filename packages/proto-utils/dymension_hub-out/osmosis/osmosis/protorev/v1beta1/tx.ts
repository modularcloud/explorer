/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { BaseDenom, InfoByPoolType, TokenPairArbRoutes } from "./protorev";

export const protobufPackage = "osmosis.protorev.v1beta1";

/** MsgSetHotRoutes defines the Msg/SetHotRoutes request type. */
export interface MsgSetHotRoutes {
  /** admin is the account that is authorized to set the hot routes. */
  admin: string;
  /** hot_routes is the list of hot routes to set. */
  hotRoutes: TokenPairArbRoutes[];
}

/** MsgSetHotRoutesResponse defines the Msg/SetHotRoutes response type. */
export interface MsgSetHotRoutesResponse {
}

/** MsgSetDeveloperAccount defines the Msg/SetDeveloperAccount request type. */
export interface MsgSetDeveloperAccount {
  /** admin is the account that is authorized to set the developer account. */
  admin: string;
  /**
   * developer_account is the account that will receive a portion of the profits
   * from the protorev module.
   */
  developerAccount: string;
}

/**
 * MsgSetDeveloperAccountResponse defines the Msg/SetDeveloperAccount response
 * type.
 */
export interface MsgSetDeveloperAccountResponse {
}

/** MsgSetInfoByPoolType defines the Msg/SetInfoByPoolType request type. */
export interface MsgSetInfoByPoolType {
  /** admin is the account that is authorized to set the pool weights. */
  admin: string;
  /** info_by_pool_type contains information about the pool types. */
  infoByPoolType: InfoByPoolType | undefined;
}

/** MsgSetInfoByPoolTypeResponse defines the Msg/SetInfoByPoolType response type. */
export interface MsgSetInfoByPoolTypeResponse {
}

/** MsgSetMaxPoolPointsPerTx defines the Msg/SetMaxPoolPointsPerTx request type. */
export interface MsgSetMaxPoolPointsPerTx {
  /** admin is the account that is authorized to set the max pool points per tx. */
  admin: string;
  /**
   * max_pool_points_per_tx is the maximum number of pool points that can be
   * consumed per transaction.
   */
  maxPoolPointsPerTx: Long;
}

/**
 * MsgSetMaxPoolPointsPerTxResponse defines the Msg/SetMaxPoolPointsPerTx
 * response type.
 */
export interface MsgSetMaxPoolPointsPerTxResponse {
}

/**
 * MsgSetMaxPoolPointsPerBlock defines the Msg/SetMaxPoolPointsPerBlock request
 * type.
 */
export interface MsgSetMaxPoolPointsPerBlock {
  /**
   * admin is the account that is authorized to set the max pool points per
   * block.
   */
  admin: string;
  /**
   * max_pool_points_per_block is the maximum number of pool points that can be
   * consumed per block.
   */
  maxPoolPointsPerBlock: Long;
}

/**
 * MsgSetMaxPoolPointsPerBlockResponse defines the
 * Msg/SetMaxPoolPointsPerBlock response type.
 */
export interface MsgSetMaxPoolPointsPerBlockResponse {
}

/** MsgSetBaseDenoms defines the Msg/SetBaseDenoms request type. */
export interface MsgSetBaseDenoms {
  /** admin is the account that is authorized to set the base denoms. */
  admin: string;
  /** base_denoms is the list of base denoms to set. */
  baseDenoms: BaseDenom[];
}

/** MsgSetBaseDenomsResponse defines the Msg/SetBaseDenoms response type. */
export interface MsgSetBaseDenomsResponse {
}

function createBaseMsgSetHotRoutes(): MsgSetHotRoutes {
  return { admin: "", hotRoutes: [] };
}

export const MsgSetHotRoutes = {
  encode(message: MsgSetHotRoutes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.hotRoutes) {
      TokenPairArbRoutes.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetHotRoutes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetHotRoutes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hotRoutes.push(TokenPairArbRoutes.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetHotRoutes {
    return {
      admin: isSet(object.admin) ? globalThis.String(object.admin) : "",
      hotRoutes: globalThis.Array.isArray(object?.hotRoutes)
        ? object.hotRoutes.map((e: any) => TokenPairArbRoutes.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgSetHotRoutes): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.hotRoutes?.length) {
      obj.hotRoutes = message.hotRoutes.map((e) => TokenPairArbRoutes.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetHotRoutes>, I>>(base?: I): MsgSetHotRoutes {
    return MsgSetHotRoutes.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetHotRoutes>, I>>(object: I): MsgSetHotRoutes {
    const message = createBaseMsgSetHotRoutes();
    message.admin = object.admin ?? "";
    message.hotRoutes = object.hotRoutes?.map((e) => TokenPairArbRoutes.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgSetHotRoutesResponse(): MsgSetHotRoutesResponse {
  return {};
}

export const MsgSetHotRoutesResponse = {
  encode(_: MsgSetHotRoutesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetHotRoutesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetHotRoutesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgSetHotRoutesResponse {
    return {};
  },

  toJSON(_: MsgSetHotRoutesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetHotRoutesResponse>, I>>(base?: I): MsgSetHotRoutesResponse {
    return MsgSetHotRoutesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetHotRoutesResponse>, I>>(_: I): MsgSetHotRoutesResponse {
    const message = createBaseMsgSetHotRoutesResponse();
    return message;
  },
};

function createBaseMsgSetDeveloperAccount(): MsgSetDeveloperAccount {
  return { admin: "", developerAccount: "" };
}

export const MsgSetDeveloperAccount = {
  encode(message: MsgSetDeveloperAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.developerAccount !== "") {
      writer.uint32(18).string(message.developerAccount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDeveloperAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDeveloperAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.developerAccount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetDeveloperAccount {
    return {
      admin: isSet(object.admin) ? globalThis.String(object.admin) : "",
      developerAccount: isSet(object.developerAccount) ? globalThis.String(object.developerAccount) : "",
    };
  },

  toJSON(message: MsgSetDeveloperAccount): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.developerAccount !== "") {
      obj.developerAccount = message.developerAccount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetDeveloperAccount>, I>>(base?: I): MsgSetDeveloperAccount {
    return MsgSetDeveloperAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetDeveloperAccount>, I>>(object: I): MsgSetDeveloperAccount {
    const message = createBaseMsgSetDeveloperAccount();
    message.admin = object.admin ?? "";
    message.developerAccount = object.developerAccount ?? "";
    return message;
  },
};

function createBaseMsgSetDeveloperAccountResponse(): MsgSetDeveloperAccountResponse {
  return {};
}

export const MsgSetDeveloperAccountResponse = {
  encode(_: MsgSetDeveloperAccountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDeveloperAccountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDeveloperAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgSetDeveloperAccountResponse {
    return {};
  },

  toJSON(_: MsgSetDeveloperAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetDeveloperAccountResponse>, I>>(base?: I): MsgSetDeveloperAccountResponse {
    return MsgSetDeveloperAccountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetDeveloperAccountResponse>, I>>(_: I): MsgSetDeveloperAccountResponse {
    const message = createBaseMsgSetDeveloperAccountResponse();
    return message;
  },
};

function createBaseMsgSetInfoByPoolType(): MsgSetInfoByPoolType {
  return { admin: "", infoByPoolType: undefined };
}

export const MsgSetInfoByPoolType = {
  encode(message: MsgSetInfoByPoolType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.infoByPoolType !== undefined) {
      InfoByPoolType.encode(message.infoByPoolType, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetInfoByPoolType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetInfoByPoolType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.infoByPoolType = InfoByPoolType.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetInfoByPoolType {
    return {
      admin: isSet(object.admin) ? globalThis.String(object.admin) : "",
      infoByPoolType: isSet(object.infoByPoolType) ? InfoByPoolType.fromJSON(object.infoByPoolType) : undefined,
    };
  },

  toJSON(message: MsgSetInfoByPoolType): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.infoByPoolType !== undefined) {
      obj.infoByPoolType = InfoByPoolType.toJSON(message.infoByPoolType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetInfoByPoolType>, I>>(base?: I): MsgSetInfoByPoolType {
    return MsgSetInfoByPoolType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetInfoByPoolType>, I>>(object: I): MsgSetInfoByPoolType {
    const message = createBaseMsgSetInfoByPoolType();
    message.admin = object.admin ?? "";
    message.infoByPoolType = (object.infoByPoolType !== undefined && object.infoByPoolType !== null)
      ? InfoByPoolType.fromPartial(object.infoByPoolType)
      : undefined;
    return message;
  },
};

function createBaseMsgSetInfoByPoolTypeResponse(): MsgSetInfoByPoolTypeResponse {
  return {};
}

export const MsgSetInfoByPoolTypeResponse = {
  encode(_: MsgSetInfoByPoolTypeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetInfoByPoolTypeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetInfoByPoolTypeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgSetInfoByPoolTypeResponse {
    return {};
  },

  toJSON(_: MsgSetInfoByPoolTypeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetInfoByPoolTypeResponse>, I>>(base?: I): MsgSetInfoByPoolTypeResponse {
    return MsgSetInfoByPoolTypeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetInfoByPoolTypeResponse>, I>>(_: I): MsgSetInfoByPoolTypeResponse {
    const message = createBaseMsgSetInfoByPoolTypeResponse();
    return message;
  },
};

function createBaseMsgSetMaxPoolPointsPerTx(): MsgSetMaxPoolPointsPerTx {
  return { admin: "", maxPoolPointsPerTx: Long.UZERO };
}

export const MsgSetMaxPoolPointsPerTx = {
  encode(message: MsgSetMaxPoolPointsPerTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (!message.maxPoolPointsPerTx.isZero()) {
      writer.uint32(16).uint64(message.maxPoolPointsPerTx);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetMaxPoolPointsPerTx {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMaxPoolPointsPerTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxPoolPointsPerTx = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetMaxPoolPointsPerTx {
    return {
      admin: isSet(object.admin) ? globalThis.String(object.admin) : "",
      maxPoolPointsPerTx: isSet(object.maxPoolPointsPerTx) ? Long.fromValue(object.maxPoolPointsPerTx) : Long.UZERO,
    };
  },

  toJSON(message: MsgSetMaxPoolPointsPerTx): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (!message.maxPoolPointsPerTx.isZero()) {
      obj.maxPoolPointsPerTx = (message.maxPoolPointsPerTx || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetMaxPoolPointsPerTx>, I>>(base?: I): MsgSetMaxPoolPointsPerTx {
    return MsgSetMaxPoolPointsPerTx.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetMaxPoolPointsPerTx>, I>>(object: I): MsgSetMaxPoolPointsPerTx {
    const message = createBaseMsgSetMaxPoolPointsPerTx();
    message.admin = object.admin ?? "";
    message.maxPoolPointsPerTx = (object.maxPoolPointsPerTx !== undefined && object.maxPoolPointsPerTx !== null)
      ? Long.fromValue(object.maxPoolPointsPerTx)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgSetMaxPoolPointsPerTxResponse(): MsgSetMaxPoolPointsPerTxResponse {
  return {};
}

export const MsgSetMaxPoolPointsPerTxResponse = {
  encode(_: MsgSetMaxPoolPointsPerTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetMaxPoolPointsPerTxResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMaxPoolPointsPerTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgSetMaxPoolPointsPerTxResponse {
    return {};
  },

  toJSON(_: MsgSetMaxPoolPointsPerTxResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetMaxPoolPointsPerTxResponse>, I>>(
    base?: I,
  ): MsgSetMaxPoolPointsPerTxResponse {
    return MsgSetMaxPoolPointsPerTxResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetMaxPoolPointsPerTxResponse>, I>>(
    _: I,
  ): MsgSetMaxPoolPointsPerTxResponse {
    const message = createBaseMsgSetMaxPoolPointsPerTxResponse();
    return message;
  },
};

function createBaseMsgSetMaxPoolPointsPerBlock(): MsgSetMaxPoolPointsPerBlock {
  return { admin: "", maxPoolPointsPerBlock: Long.UZERO };
}

export const MsgSetMaxPoolPointsPerBlock = {
  encode(message: MsgSetMaxPoolPointsPerBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (!message.maxPoolPointsPerBlock.isZero()) {
      writer.uint32(16).uint64(message.maxPoolPointsPerBlock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetMaxPoolPointsPerBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMaxPoolPointsPerBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxPoolPointsPerBlock = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetMaxPoolPointsPerBlock {
    return {
      admin: isSet(object.admin) ? globalThis.String(object.admin) : "",
      maxPoolPointsPerBlock: isSet(object.maxPoolPointsPerBlock)
        ? Long.fromValue(object.maxPoolPointsPerBlock)
        : Long.UZERO,
    };
  },

  toJSON(message: MsgSetMaxPoolPointsPerBlock): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (!message.maxPoolPointsPerBlock.isZero()) {
      obj.maxPoolPointsPerBlock = (message.maxPoolPointsPerBlock || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetMaxPoolPointsPerBlock>, I>>(base?: I): MsgSetMaxPoolPointsPerBlock {
    return MsgSetMaxPoolPointsPerBlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetMaxPoolPointsPerBlock>, I>>(object: I): MsgSetMaxPoolPointsPerBlock {
    const message = createBaseMsgSetMaxPoolPointsPerBlock();
    message.admin = object.admin ?? "";
    message.maxPoolPointsPerBlock =
      (object.maxPoolPointsPerBlock !== undefined && object.maxPoolPointsPerBlock !== null)
        ? Long.fromValue(object.maxPoolPointsPerBlock)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgSetMaxPoolPointsPerBlockResponse(): MsgSetMaxPoolPointsPerBlockResponse {
  return {};
}

export const MsgSetMaxPoolPointsPerBlockResponse = {
  encode(_: MsgSetMaxPoolPointsPerBlockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetMaxPoolPointsPerBlockResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMaxPoolPointsPerBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgSetMaxPoolPointsPerBlockResponse {
    return {};
  },

  toJSON(_: MsgSetMaxPoolPointsPerBlockResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetMaxPoolPointsPerBlockResponse>, I>>(
    base?: I,
  ): MsgSetMaxPoolPointsPerBlockResponse {
    return MsgSetMaxPoolPointsPerBlockResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetMaxPoolPointsPerBlockResponse>, I>>(
    _: I,
  ): MsgSetMaxPoolPointsPerBlockResponse {
    const message = createBaseMsgSetMaxPoolPointsPerBlockResponse();
    return message;
  },
};

function createBaseMsgSetBaseDenoms(): MsgSetBaseDenoms {
  return { admin: "", baseDenoms: [] };
}

export const MsgSetBaseDenoms = {
  encode(message: MsgSetBaseDenoms, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.baseDenoms) {
      BaseDenom.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetBaseDenoms {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetBaseDenoms();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.baseDenoms.push(BaseDenom.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetBaseDenoms {
    return {
      admin: isSet(object.admin) ? globalThis.String(object.admin) : "",
      baseDenoms: globalThis.Array.isArray(object?.baseDenoms)
        ? object.baseDenoms.map((e: any) => BaseDenom.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgSetBaseDenoms): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.baseDenoms?.length) {
      obj.baseDenoms = message.baseDenoms.map((e) => BaseDenom.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetBaseDenoms>, I>>(base?: I): MsgSetBaseDenoms {
    return MsgSetBaseDenoms.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetBaseDenoms>, I>>(object: I): MsgSetBaseDenoms {
    const message = createBaseMsgSetBaseDenoms();
    message.admin = object.admin ?? "";
    message.baseDenoms = object.baseDenoms?.map((e) => BaseDenom.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgSetBaseDenomsResponse(): MsgSetBaseDenomsResponse {
  return {};
}

export const MsgSetBaseDenomsResponse = {
  encode(_: MsgSetBaseDenomsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetBaseDenomsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetBaseDenomsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgSetBaseDenomsResponse {
    return {};
  },

  toJSON(_: MsgSetBaseDenomsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetBaseDenomsResponse>, I>>(base?: I): MsgSetBaseDenomsResponse {
    return MsgSetBaseDenomsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetBaseDenomsResponse>, I>>(_: I): MsgSetBaseDenomsResponse {
    const message = createBaseMsgSetBaseDenomsResponse();
    return message;
  },
};

export interface Msg {
  /**
   * SetHotRoutes sets the hot routes that will be explored when creating
   * cyclic arbitrage routes. Can only be called by the admin account.
   */
  SetHotRoutes(request: MsgSetHotRoutes): Promise<MsgSetHotRoutesResponse>;
  /**
   * SetDeveloperAccount sets the account that can withdraw a portion of the
   * profits from the protorev module. This will be Skip's address.
   */
  SetDeveloperAccount(request: MsgSetDeveloperAccount): Promise<MsgSetDeveloperAccountResponse>;
  /**
   * SetMaxPoolPointsPerTx sets the maximum number of pool points that can be
   * consumed per transaction. Can only be called by the admin account.
   */
  SetMaxPoolPointsPerTx(request: MsgSetMaxPoolPointsPerTx): Promise<MsgSetMaxPoolPointsPerTxResponse>;
  /**
   * SetMaxPoolPointsPerBlock sets the maximum number of pool points that can be
   * consumed per block. Can only be called by the admin account.
   */
  SetMaxPoolPointsPerBlock(request: MsgSetMaxPoolPointsPerBlock): Promise<MsgSetMaxPoolPointsPerBlockResponse>;
  /**
   * SetInfoByPoolType sets the pool type information needed to make smart
   * assumptions about swapping on different pool types
   */
  SetInfoByPoolType(request: MsgSetInfoByPoolType): Promise<MsgSetInfoByPoolTypeResponse>;
  /**
   * SetBaseDenoms sets the base denoms that will be used to create cyclic
   * arbitrage routes. Can only be called by the admin account.
   */
  SetBaseDenoms(request: MsgSetBaseDenoms): Promise<MsgSetBaseDenomsResponse>;
}

export const MsgServiceName = "osmosis.protorev.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.SetHotRoutes = this.SetHotRoutes.bind(this);
    this.SetDeveloperAccount = this.SetDeveloperAccount.bind(this);
    this.SetMaxPoolPointsPerTx = this.SetMaxPoolPointsPerTx.bind(this);
    this.SetMaxPoolPointsPerBlock = this.SetMaxPoolPointsPerBlock.bind(this);
    this.SetInfoByPoolType = this.SetInfoByPoolType.bind(this);
    this.SetBaseDenoms = this.SetBaseDenoms.bind(this);
  }
  SetHotRoutes(request: MsgSetHotRoutes): Promise<MsgSetHotRoutesResponse> {
    const data = MsgSetHotRoutes.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetHotRoutes", data);
    return promise.then((data) => MsgSetHotRoutesResponse.decode(_m0.Reader.create(data)));
  }

  SetDeveloperAccount(request: MsgSetDeveloperAccount): Promise<MsgSetDeveloperAccountResponse> {
    const data = MsgSetDeveloperAccount.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetDeveloperAccount", data);
    return promise.then((data) => MsgSetDeveloperAccountResponse.decode(_m0.Reader.create(data)));
  }

  SetMaxPoolPointsPerTx(request: MsgSetMaxPoolPointsPerTx): Promise<MsgSetMaxPoolPointsPerTxResponse> {
    const data = MsgSetMaxPoolPointsPerTx.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetMaxPoolPointsPerTx", data);
    return promise.then((data) => MsgSetMaxPoolPointsPerTxResponse.decode(_m0.Reader.create(data)));
  }

  SetMaxPoolPointsPerBlock(request: MsgSetMaxPoolPointsPerBlock): Promise<MsgSetMaxPoolPointsPerBlockResponse> {
    const data = MsgSetMaxPoolPointsPerBlock.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetMaxPoolPointsPerBlock", data);
    return promise.then((data) => MsgSetMaxPoolPointsPerBlockResponse.decode(_m0.Reader.create(data)));
  }

  SetInfoByPoolType(request: MsgSetInfoByPoolType): Promise<MsgSetInfoByPoolTypeResponse> {
    const data = MsgSetInfoByPoolType.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetInfoByPoolType", data);
    return promise.then((data) => MsgSetInfoByPoolTypeResponse.decode(_m0.Reader.create(data)));
  }

  SetBaseDenoms(request: MsgSetBaseDenoms): Promise<MsgSetBaseDenomsResponse> {
    const data = MsgSetBaseDenoms.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetBaseDenoms", data);
    return promise.then((data) => MsgSetBaseDenomsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
