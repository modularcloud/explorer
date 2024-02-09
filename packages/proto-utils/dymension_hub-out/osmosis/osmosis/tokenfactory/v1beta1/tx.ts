/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Metadata } from "../../../cosmos/bank/v1beta1/bank";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "osmosis.tokenfactory.v1beta1";

/**
 * MsgCreateDenom defines the message structure for the CreateDenom gRPC service
 * method. It allows an account to create a new denom. It requires a sender
 * address and a sub denomination. The (sender_address, sub_denomination) tuple
 * must be unique and cannot be re-used.
 *
 * The resulting denom created is defined as
 * <factory/{creatorAddress}/{subdenom}>. The resulting denom's admin is
 * originally set to be the creator, but this can be changed later. The token
 * denom does not indicate the current admin.
 */
export interface MsgCreateDenom {
  sender: string;
  /** subdenom can be up to 44 "alphanumeric" characters long. */
  subdenom: string;
}

/**
 * MsgCreateDenomResponse is the return value of MsgCreateDenom
 * It returns the full string of the newly created denom
 */
export interface MsgCreateDenomResponse {
  newTokenDenom: string;
}

/**
 * MsgMint is the sdk.Msg type for allowing an admin account to mint
 * more of a token.
 * Only the admin of the token factory denom has permission to mint unless
 * the denom does not have any admin.
 */
export interface MsgMint {
  sender: string;
  amount: Coin | undefined;
  mintToAddress: string;
}

export interface MsgMintResponse {
}

/**
 * MsgBurn is the sdk.Msg type for allowing an admin account to burn
 * a token.
 * Only the admin of the token factory denom has permission to burn unless
 * the denom does not have any admin.
 */
export interface MsgBurn {
  sender: string;
  amount: Coin | undefined;
  burnFromAddress: string;
}

export interface MsgBurnResponse {
}

/**
 * MsgChangeAdmin is the sdk.Msg type for allowing an admin account to reassign
 * adminship of a denom to a new account
 */
export interface MsgChangeAdmin {
  sender: string;
  denom: string;
  newAdmin: string;
}

/**
 * MsgChangeAdminResponse defines the response structure for an executed
 * MsgChangeAdmin message.
 */
export interface MsgChangeAdminResponse {
}

/**
 * MsgSetBeforeSendHook is the sdk.Msg type for allowing an admin account to
 * assign a CosmWasm contract to call with a BeforeSend hook
 */
export interface MsgSetBeforeSendHook {
  sender: string;
  denom: string;
  cosmwasmAddress: string;
}

/**
 * MsgSetBeforeSendHookResponse defines the response structure for an executed
 * MsgSetBeforeSendHook message.
 */
export interface MsgSetBeforeSendHookResponse {
}

/**
 * MsgSetDenomMetadata is the sdk.Msg type for allowing an admin account to set
 * the denom's bank metadata
 */
export interface MsgSetDenomMetadata {
  sender: string;
  metadata: Metadata | undefined;
}

/**
 * MsgSetDenomMetadataResponse defines the response structure for an executed
 * MsgSetDenomMetadata message.
 */
export interface MsgSetDenomMetadataResponse {
}

export interface MsgForceTransfer {
  sender: string;
  amount: Coin | undefined;
  transferFromAddress: string;
  transferToAddress: string;
}

export interface MsgForceTransferResponse {
}

function createBaseMsgCreateDenom(): MsgCreateDenom {
  return { sender: "", subdenom: "" };
}

export const MsgCreateDenom = {
  encode(message: MsgCreateDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.subdenom !== "") {
      writer.uint32(18).string(message.subdenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDenom {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.subdenom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDenom {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      subdenom: isSet(object.subdenom) ? globalThis.String(object.subdenom) : "",
    };
  },

  toJSON(message: MsgCreateDenom): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.subdenom !== "") {
      obj.subdenom = message.subdenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateDenom>, I>>(base?: I): MsgCreateDenom {
    return MsgCreateDenom.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateDenom>, I>>(object: I): MsgCreateDenom {
    const message = createBaseMsgCreateDenom();
    message.sender = object.sender ?? "";
    message.subdenom = object.subdenom ?? "";
    return message;
  },
};

function createBaseMsgCreateDenomResponse(): MsgCreateDenomResponse {
  return { newTokenDenom: "" };
}

export const MsgCreateDenomResponse = {
  encode(message: MsgCreateDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.newTokenDenom !== "") {
      writer.uint32(10).string(message.newTokenDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.newTokenDenom = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDenomResponse {
    return { newTokenDenom: isSet(object.newTokenDenom) ? globalThis.String(object.newTokenDenom) : "" };
  },

  toJSON(message: MsgCreateDenomResponse): unknown {
    const obj: any = {};
    if (message.newTokenDenom !== "") {
      obj.newTokenDenom = message.newTokenDenom;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateDenomResponse>, I>>(base?: I): MsgCreateDenomResponse {
    return MsgCreateDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateDenomResponse>, I>>(object: I): MsgCreateDenomResponse {
    const message = createBaseMsgCreateDenomResponse();
    message.newTokenDenom = object.newTokenDenom ?? "";
    return message;
  },
};

function createBaseMsgMint(): MsgMint {
  return { sender: "", amount: undefined, mintToAddress: "" };
}

export const MsgMint = {
  encode(message: MsgMint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.mintToAddress !== "") {
      writer.uint32(26).string(message.mintToAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMint {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.mintToAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMint {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      mintToAddress: isSet(object.mintToAddress) ? globalThis.String(object.mintToAddress) : "",
    };
  },

  toJSON(message: MsgMint): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    if (message.mintToAddress !== "") {
      obj.mintToAddress = message.mintToAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMint>, I>>(base?: I): MsgMint {
    return MsgMint.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMint>, I>>(object: I): MsgMint {
    const message = createBaseMsgMint();
    message.sender = object.sender ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.mintToAddress = object.mintToAddress ?? "";
    return message;
  },
};

function createBaseMsgMintResponse(): MsgMintResponse {
  return {};
}

export const MsgMintResponse = {
  encode(_: MsgMintResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintResponse();
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

  fromJSON(_: any): MsgMintResponse {
    return {};
  },

  toJSON(_: MsgMintResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMintResponse>, I>>(base?: I): MsgMintResponse {
    return MsgMintResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMintResponse>, I>>(_: I): MsgMintResponse {
    const message = createBaseMsgMintResponse();
    return message;
  },
};

function createBaseMsgBurn(): MsgBurn {
  return { sender: "", amount: undefined, burnFromAddress: "" };
}

export const MsgBurn = {
  encode(message: MsgBurn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.burnFromAddress !== "") {
      writer.uint32(26).string(message.burnFromAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.burnFromAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBurn {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      burnFromAddress: isSet(object.burnFromAddress) ? globalThis.String(object.burnFromAddress) : "",
    };
  },

  toJSON(message: MsgBurn): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    if (message.burnFromAddress !== "") {
      obj.burnFromAddress = message.burnFromAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurn>, I>>(base?: I): MsgBurn {
    return MsgBurn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurn>, I>>(object: I): MsgBurn {
    const message = createBaseMsgBurn();
    message.sender = object.sender ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.burnFromAddress = object.burnFromAddress ?? "";
    return message;
  },
};

function createBaseMsgBurnResponse(): MsgBurnResponse {
  return {};
}

export const MsgBurnResponse = {
  encode(_: MsgBurnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnResponse();
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

  fromJSON(_: any): MsgBurnResponse {
    return {};
  },

  toJSON(_: MsgBurnResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurnResponse>, I>>(base?: I): MsgBurnResponse {
    return MsgBurnResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnResponse>, I>>(_: I): MsgBurnResponse {
    const message = createBaseMsgBurnResponse();
    return message;
  },
};

function createBaseMsgChangeAdmin(): MsgChangeAdmin {
  return { sender: "", denom: "", newAdmin: "" };
}

export const MsgChangeAdmin = {
  encode(message: MsgChangeAdmin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.newAdmin !== "") {
      writer.uint32(26).string(message.newAdmin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChangeAdmin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newAdmin = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChangeAdmin {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      newAdmin: isSet(object.newAdmin) ? globalThis.String(object.newAdmin) : "",
    };
  },

  toJSON(message: MsgChangeAdmin): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.newAdmin !== "") {
      obj.newAdmin = message.newAdmin;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChangeAdmin>, I>>(base?: I): MsgChangeAdmin {
    return MsgChangeAdmin.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChangeAdmin>, I>>(object: I): MsgChangeAdmin {
    const message = createBaseMsgChangeAdmin();
    message.sender = object.sender ?? "";
    message.denom = object.denom ?? "";
    message.newAdmin = object.newAdmin ?? "";
    return message;
  },
};

function createBaseMsgChangeAdminResponse(): MsgChangeAdminResponse {
  return {};
}

export const MsgChangeAdminResponse = {
  encode(_: MsgChangeAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChangeAdminResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeAdminResponse();
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

  fromJSON(_: any): MsgChangeAdminResponse {
    return {};
  },

  toJSON(_: MsgChangeAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChangeAdminResponse>, I>>(base?: I): MsgChangeAdminResponse {
    return MsgChangeAdminResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChangeAdminResponse>, I>>(_: I): MsgChangeAdminResponse {
    const message = createBaseMsgChangeAdminResponse();
    return message;
  },
};

function createBaseMsgSetBeforeSendHook(): MsgSetBeforeSendHook {
  return { sender: "", denom: "", cosmwasmAddress: "" };
}

export const MsgSetBeforeSendHook = {
  encode(message: MsgSetBeforeSendHook, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.cosmwasmAddress !== "") {
      writer.uint32(26).string(message.cosmwasmAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetBeforeSendHook {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetBeforeSendHook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cosmwasmAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetBeforeSendHook {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      cosmwasmAddress: isSet(object.cosmwasmAddress) ? globalThis.String(object.cosmwasmAddress) : "",
    };
  },

  toJSON(message: MsgSetBeforeSendHook): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.cosmwasmAddress !== "") {
      obj.cosmwasmAddress = message.cosmwasmAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetBeforeSendHook>, I>>(base?: I): MsgSetBeforeSendHook {
    return MsgSetBeforeSendHook.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetBeforeSendHook>, I>>(object: I): MsgSetBeforeSendHook {
    const message = createBaseMsgSetBeforeSendHook();
    message.sender = object.sender ?? "";
    message.denom = object.denom ?? "";
    message.cosmwasmAddress = object.cosmwasmAddress ?? "";
    return message;
  },
};

function createBaseMsgSetBeforeSendHookResponse(): MsgSetBeforeSendHookResponse {
  return {};
}

export const MsgSetBeforeSendHookResponse = {
  encode(_: MsgSetBeforeSendHookResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetBeforeSendHookResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetBeforeSendHookResponse();
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

  fromJSON(_: any): MsgSetBeforeSendHookResponse {
    return {};
  },

  toJSON(_: MsgSetBeforeSendHookResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetBeforeSendHookResponse>, I>>(base?: I): MsgSetBeforeSendHookResponse {
    return MsgSetBeforeSendHookResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetBeforeSendHookResponse>, I>>(_: I): MsgSetBeforeSendHookResponse {
    const message = createBaseMsgSetBeforeSendHookResponse();
    return message;
  },
};

function createBaseMsgSetDenomMetadata(): MsgSetDenomMetadata {
  return { sender: "", metadata: undefined };
}

export const MsgSetDenomMetadata = {
  encode(message: MsgSetDenomMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDenomMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDenomMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.metadata = Metadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetDenomMetadata {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      metadata: isSet(object.metadata) ? Metadata.fromJSON(object.metadata) : undefined,
    };
  },

  toJSON(message: MsgSetDenomMetadata): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.metadata !== undefined) {
      obj.metadata = Metadata.toJSON(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetDenomMetadata>, I>>(base?: I): MsgSetDenomMetadata {
    return MsgSetDenomMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetDenomMetadata>, I>>(object: I): MsgSetDenomMetadata {
    const message = createBaseMsgSetDenomMetadata();
    message.sender = object.sender ?? "";
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Metadata.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

function createBaseMsgSetDenomMetadataResponse(): MsgSetDenomMetadataResponse {
  return {};
}

export const MsgSetDenomMetadataResponse = {
  encode(_: MsgSetDenomMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDenomMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDenomMetadataResponse();
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

  fromJSON(_: any): MsgSetDenomMetadataResponse {
    return {};
  },

  toJSON(_: MsgSetDenomMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetDenomMetadataResponse>, I>>(base?: I): MsgSetDenomMetadataResponse {
    return MsgSetDenomMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetDenomMetadataResponse>, I>>(_: I): MsgSetDenomMetadataResponse {
    const message = createBaseMsgSetDenomMetadataResponse();
    return message;
  },
};

function createBaseMsgForceTransfer(): MsgForceTransfer {
  return { sender: "", amount: undefined, transferFromAddress: "", transferToAddress: "" };
}

export const MsgForceTransfer = {
  encode(message: MsgForceTransfer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.transferFromAddress !== "") {
      writer.uint32(26).string(message.transferFromAddress);
    }
    if (message.transferToAddress !== "") {
      writer.uint32(34).string(message.transferToAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgForceTransfer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForceTransfer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.transferFromAddress = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.transferToAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgForceTransfer {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      transferFromAddress: isSet(object.transferFromAddress) ? globalThis.String(object.transferFromAddress) : "",
      transferToAddress: isSet(object.transferToAddress) ? globalThis.String(object.transferToAddress) : "",
    };
  },

  toJSON(message: MsgForceTransfer): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.amount !== undefined) {
      obj.amount = Coin.toJSON(message.amount);
    }
    if (message.transferFromAddress !== "") {
      obj.transferFromAddress = message.transferFromAddress;
    }
    if (message.transferToAddress !== "") {
      obj.transferToAddress = message.transferToAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgForceTransfer>, I>>(base?: I): MsgForceTransfer {
    return MsgForceTransfer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgForceTransfer>, I>>(object: I): MsgForceTransfer {
    const message = createBaseMsgForceTransfer();
    message.sender = object.sender ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.transferFromAddress = object.transferFromAddress ?? "";
    message.transferToAddress = object.transferToAddress ?? "";
    return message;
  },
};

function createBaseMsgForceTransferResponse(): MsgForceTransferResponse {
  return {};
}

export const MsgForceTransferResponse = {
  encode(_: MsgForceTransferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgForceTransferResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForceTransferResponse();
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

  fromJSON(_: any): MsgForceTransferResponse {
    return {};
  },

  toJSON(_: MsgForceTransferResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgForceTransferResponse>, I>>(base?: I): MsgForceTransferResponse {
    return MsgForceTransferResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgForceTransferResponse>, I>>(_: I): MsgForceTransferResponse {
    const message = createBaseMsgForceTransferResponse();
    return message;
  },
};

/** Msg defines the tokefactory module's gRPC message service. */
export interface Msg {
  CreateDenom(request: MsgCreateDenom): Promise<MsgCreateDenomResponse>;
  Mint(request: MsgMint): Promise<MsgMintResponse>;
  Burn(request: MsgBurn): Promise<MsgBurnResponse>;
  ChangeAdmin(request: MsgChangeAdmin): Promise<MsgChangeAdminResponse>;
  SetDenomMetadata(request: MsgSetDenomMetadata): Promise<MsgSetDenomMetadataResponse>;
  SetBeforeSendHook(request: MsgSetBeforeSendHook): Promise<MsgSetBeforeSendHookResponse>;
  ForceTransfer(request: MsgForceTransfer): Promise<MsgForceTransferResponse>;
}

export const MsgServiceName = "osmosis.tokenfactory.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateDenom = this.CreateDenom.bind(this);
    this.Mint = this.Mint.bind(this);
    this.Burn = this.Burn.bind(this);
    this.ChangeAdmin = this.ChangeAdmin.bind(this);
    this.SetDenomMetadata = this.SetDenomMetadata.bind(this);
    this.SetBeforeSendHook = this.SetBeforeSendHook.bind(this);
    this.ForceTransfer = this.ForceTransfer.bind(this);
  }
  CreateDenom(request: MsgCreateDenom): Promise<MsgCreateDenomResponse> {
    const data = MsgCreateDenom.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateDenom", data);
    return promise.then((data) => MsgCreateDenomResponse.decode(_m0.Reader.create(data)));
  }

  Mint(request: MsgMint): Promise<MsgMintResponse> {
    const data = MsgMint.encode(request).finish();
    const promise = this.rpc.request(this.service, "Mint", data);
    return promise.then((data) => MsgMintResponse.decode(_m0.Reader.create(data)));
  }

  Burn(request: MsgBurn): Promise<MsgBurnResponse> {
    const data = MsgBurn.encode(request).finish();
    const promise = this.rpc.request(this.service, "Burn", data);
    return promise.then((data) => MsgBurnResponse.decode(_m0.Reader.create(data)));
  }

  ChangeAdmin(request: MsgChangeAdmin): Promise<MsgChangeAdminResponse> {
    const data = MsgChangeAdmin.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChangeAdmin", data);
    return promise.then((data) => MsgChangeAdminResponse.decode(_m0.Reader.create(data)));
  }

  SetDenomMetadata(request: MsgSetDenomMetadata): Promise<MsgSetDenomMetadataResponse> {
    const data = MsgSetDenomMetadata.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetDenomMetadata", data);
    return promise.then((data) => MsgSetDenomMetadataResponse.decode(_m0.Reader.create(data)));
  }

  SetBeforeSendHook(request: MsgSetBeforeSendHook): Promise<MsgSetBeforeSendHookResponse> {
    const data = MsgSetBeforeSendHook.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetBeforeSendHook", data);
    return promise.then((data) => MsgSetBeforeSendHookResponse.decode(_m0.Reader.create(data)));
  }

  ForceTransfer(request: MsgForceTransfer): Promise<MsgForceTransferResponse> {
    const data = MsgForceTransfer.encode(request).finish();
    const promise = this.rpc.request(this.service, "ForceTransfer", data);
    return promise.then((data) => MsgForceTransferResponse.decode(_m0.Reader.create(data)));
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
