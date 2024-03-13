/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Asset, AssetWithStatus, Params } from "./bridge";

export const protobufPackage = "osmosis.bridge.v1beta1";

/**
 * MsgInboundTransfer defines the message structure for the InboundTransfer gRPC
 * service method. It allows a sender to perform an inbound cross-chain
 * transfer, i.e., to transfer their tokens from the source chain to Osmosis and
 * get the equivalent amount of the corresponding token (specified in subdenom)
 * on Osmosis in return. The tokens are minted through the x/tokenfactory module
 * to the destination address.
 */
export interface MsgInboundTransfer {
  /** Sender is a sender's address */
  sender: string;
  /** DestAddr is a destination Osmosis address */
  destAddr: string;
  /** Asset contains a source chain and a target denom */
  asset:
    | Asset
    | undefined;
  /** Amount of coins to transfer */
  amount: string;
}

export interface MsgInboundTransferResponse {
}

/**
 * MsgOutboundTransfer defines the message structure for the OutboundTransfer
 * gRPC service method. It allows a sender to perform an outbound cross-chain
 * transfer, i.e., to transfer their tokens from Osmosis to the destination
 * chain. The tokens are burned through the x/tokenfactory module from the
 * sender's address.
 */
export interface MsgOutboundTransfer {
  /** Sender is a sender's Osmosis address */
  sender: string;
  /** DestAddr is a destination address */
  destAddr: string;
  /** Asset contains a target chain and a source denom */
  asset:
    | Asset
    | undefined;
  /** Amount of coins to transfer */
  amount: string;
}

export interface MsgOutboundTransferResponse {
}

/**
 * MsgUpdateParams allows to update module params. It contains UpdateParams
 * instead of just Params to forbid status updating using this method.
 * All new assets introduced with this method have ASSET_STATUS_BLOCKED_BOTH
 * status by default.
 */
export interface MsgUpdateParams {
  /** Sender is a sender's address */
  sender: string;
  /** NewParams should be fully populated */
  newParams: Params | undefined;
}

export interface MsgUpdateParamsResponse {
}

/** MsgChangeAssetStatus changes the status of the provided asset. */
export interface MsgChangeAssetStatus {
  /** Sender is a sender's address */
  sender: string;
  /**
   * NewAssetStatus is a pair of the asset and its new status.
   * The asset should be known; otherwise, the method will failed.
   */
  newAssetStatus: AssetWithStatus | undefined;
}

export interface MsgChangeAssetStatusResponse {
}

function createBaseMsgInboundTransfer(): MsgInboundTransfer {
  return { sender: "", destAddr: "", asset: undefined, amount: "" };
}

export const MsgInboundTransfer = {
  encode(message: MsgInboundTransfer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.destAddr !== "") {
      writer.uint32(18).string(message.destAddr);
    }
    if (message.asset !== undefined) {
      Asset.encode(message.asset, writer.uint32(26).fork()).ldelim();
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInboundTransfer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInboundTransfer();
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

          message.destAddr = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.asset = Asset.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.amount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgInboundTransfer {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      destAddr: isSet(object.destAddr) ? globalThis.String(object.destAddr) : "",
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      amount: isSet(object.amount) ? globalThis.String(object.amount) : "",
    };
  },

  toJSON(message: MsgInboundTransfer): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.destAddr !== "") {
      obj.destAddr = message.destAddr;
    }
    if (message.asset !== undefined) {
      obj.asset = Asset.toJSON(message.asset);
    }
    if (message.amount !== "") {
      obj.amount = message.amount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInboundTransfer>, I>>(base?: I): MsgInboundTransfer {
    return MsgInboundTransfer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgInboundTransfer>, I>>(object: I): MsgInboundTransfer {
    const message = createBaseMsgInboundTransfer();
    message.sender = object.sender ?? "";
    message.destAddr = object.destAddr ?? "";
    message.asset = (object.asset !== undefined && object.asset !== null) ? Asset.fromPartial(object.asset) : undefined;
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseMsgInboundTransferResponse(): MsgInboundTransferResponse {
  return {};
}

export const MsgInboundTransferResponse = {
  encode(_: MsgInboundTransferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInboundTransferResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInboundTransferResponse();
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

  fromJSON(_: any): MsgInboundTransferResponse {
    return {};
  },

  toJSON(_: MsgInboundTransferResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInboundTransferResponse>, I>>(base?: I): MsgInboundTransferResponse {
    return MsgInboundTransferResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgInboundTransferResponse>, I>>(_: I): MsgInboundTransferResponse {
    const message = createBaseMsgInboundTransferResponse();
    return message;
  },
};

function createBaseMsgOutboundTransfer(): MsgOutboundTransfer {
  return { sender: "", destAddr: "", asset: undefined, amount: "" };
}

export const MsgOutboundTransfer = {
  encode(message: MsgOutboundTransfer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.destAddr !== "") {
      writer.uint32(18).string(message.destAddr);
    }
    if (message.asset !== undefined) {
      Asset.encode(message.asset, writer.uint32(26).fork()).ldelim();
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgOutboundTransfer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOutboundTransfer();
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

          message.destAddr = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.asset = Asset.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.amount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgOutboundTransfer {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      destAddr: isSet(object.destAddr) ? globalThis.String(object.destAddr) : "",
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      amount: isSet(object.amount) ? globalThis.String(object.amount) : "",
    };
  },

  toJSON(message: MsgOutboundTransfer): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.destAddr !== "") {
      obj.destAddr = message.destAddr;
    }
    if (message.asset !== undefined) {
      obj.asset = Asset.toJSON(message.asset);
    }
    if (message.amount !== "") {
      obj.amount = message.amount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgOutboundTransfer>, I>>(base?: I): MsgOutboundTransfer {
    return MsgOutboundTransfer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgOutboundTransfer>, I>>(object: I): MsgOutboundTransfer {
    const message = createBaseMsgOutboundTransfer();
    message.sender = object.sender ?? "";
    message.destAddr = object.destAddr ?? "";
    message.asset = (object.asset !== undefined && object.asset !== null) ? Asset.fromPartial(object.asset) : undefined;
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseMsgOutboundTransferResponse(): MsgOutboundTransferResponse {
  return {};
}

export const MsgOutboundTransferResponse = {
  encode(_: MsgOutboundTransferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgOutboundTransferResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOutboundTransferResponse();
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

  fromJSON(_: any): MsgOutboundTransferResponse {
    return {};
  },

  toJSON(_: MsgOutboundTransferResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgOutboundTransferResponse>, I>>(base?: I): MsgOutboundTransferResponse {
    return MsgOutboundTransferResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgOutboundTransferResponse>, I>>(_: I): MsgOutboundTransferResponse {
    const message = createBaseMsgOutboundTransferResponse();
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { sender: "", newParams: undefined };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.newParams !== undefined) {
      Params.encode(message.newParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
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

          message.newParams = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      newParams: isSet(object.newParams) ? Params.fromJSON(object.newParams) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.newParams !== undefined) {
      obj.newParams = Params.toJSON(message.newParams);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(base?: I): MsgUpdateParams {
    return MsgUpdateParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.sender = object.sender ?? "";
    message.newParams = (object.newParams !== undefined && object.newParams !== null)
      ? Params.fromPartial(object.newParams)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(base?: I): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgChangeAssetStatus(): MsgChangeAssetStatus {
  return { sender: "", newAssetStatus: undefined };
}

export const MsgChangeAssetStatus = {
  encode(message: MsgChangeAssetStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.newAssetStatus !== undefined) {
      AssetWithStatus.encode(message.newAssetStatus, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChangeAssetStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeAssetStatus();
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

          message.newAssetStatus = AssetWithStatus.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChangeAssetStatus {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      newAssetStatus: isSet(object.newAssetStatus) ? AssetWithStatus.fromJSON(object.newAssetStatus) : undefined,
    };
  },

  toJSON(message: MsgChangeAssetStatus): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.newAssetStatus !== undefined) {
      obj.newAssetStatus = AssetWithStatus.toJSON(message.newAssetStatus);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChangeAssetStatus>, I>>(base?: I): MsgChangeAssetStatus {
    return MsgChangeAssetStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChangeAssetStatus>, I>>(object: I): MsgChangeAssetStatus {
    const message = createBaseMsgChangeAssetStatus();
    message.sender = object.sender ?? "";
    message.newAssetStatus = (object.newAssetStatus !== undefined && object.newAssetStatus !== null)
      ? AssetWithStatus.fromPartial(object.newAssetStatus)
      : undefined;
    return message;
  },
};

function createBaseMsgChangeAssetStatusResponse(): MsgChangeAssetStatusResponse {
  return {};
}

export const MsgChangeAssetStatusResponse = {
  encode(_: MsgChangeAssetStatusResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChangeAssetStatusResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeAssetStatusResponse();
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

  fromJSON(_: any): MsgChangeAssetStatusResponse {
    return {};
  },

  toJSON(_: MsgChangeAssetStatusResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChangeAssetStatusResponse>, I>>(base?: I): MsgChangeAssetStatusResponse {
    return MsgChangeAssetStatusResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChangeAssetStatusResponse>, I>>(_: I): MsgChangeAssetStatusResponse {
    const message = createBaseMsgChangeAssetStatusResponse();
    return message;
  },
};

/** Msg defines the bridge module's gRPC message service. */
export interface Msg {
  /** InboundTransfer is used for inbound transfers (<other_chain> -> OSMO). */
  InboundTransfer(request: MsgInboundTransfer): Promise<MsgInboundTransferResponse>;
  /** OutboundTransfer is used for outbound transfers (OSMO -> <other_chain>). */
  OutboundTransfer(request: MsgOutboundTransfer): Promise<MsgOutboundTransferResponse>;
  /** UpdateParams is used for updating module params. */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** ChangeAssetStatus will change the provided asset's status. */
  ChangeAssetStatus(request: MsgChangeAssetStatus): Promise<MsgChangeAssetStatusResponse>;
}

export const MsgServiceName = "osmosis.bridge.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.InboundTransfer = this.InboundTransfer.bind(this);
    this.OutboundTransfer = this.OutboundTransfer.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
    this.ChangeAssetStatus = this.ChangeAssetStatus.bind(this);
  }
  InboundTransfer(request: MsgInboundTransfer): Promise<MsgInboundTransferResponse> {
    const data = MsgInboundTransfer.encode(request).finish();
    const promise = this.rpc.request(this.service, "InboundTransfer", data);
    return promise.then((data) => MsgInboundTransferResponse.decode(_m0.Reader.create(data)));
  }

  OutboundTransfer(request: MsgOutboundTransfer): Promise<MsgOutboundTransferResponse> {
    const data = MsgOutboundTransfer.encode(request).finish();
    const promise = this.rpc.request(this.service, "OutboundTransfer", data);
    return promise.then((data) => MsgOutboundTransferResponse.decode(_m0.Reader.create(data)));
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
  }

  ChangeAssetStatus(request: MsgChangeAssetStatus): Promise<MsgChangeAssetStatusResponse> {
    const data = MsgChangeAssetStatus.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChangeAssetStatus", data);
    return promise.then((data) => MsgChangeAssetStatusResponse.decode(_m0.Reader.create(data)));
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
