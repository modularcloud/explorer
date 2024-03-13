/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Asset, AssetWithStatus } from "./bridge";

export const protobufPackage = "osmosis.bridge.v1beta1";

export interface EventInboundTransfer {
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

export interface EventOutboundTransfer {
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

export interface EventUpdateParams {
  newSigners: string[];
  createdSigners: string[];
  deletedSigners: string[];
  newAssets: AssetWithStatus[];
  createdAssets: AssetWithStatus[];
  deletedAssets: AssetWithStatus[];
}

export interface EventChangeAssetStatus {
  /** Sender is a sender's address */
  sender: string;
  /** NewAssetStatus is a pair of the asset and its new status */
  oldAssetStatus: AssetWithStatus | undefined;
  newAssetStatus: AssetWithStatus | undefined;
}

function createBaseEventInboundTransfer(): EventInboundTransfer {
  return { sender: "", destAddr: "", asset: undefined, amount: "" };
}

export const EventInboundTransfer = {
  encode(message: EventInboundTransfer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): EventInboundTransfer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventInboundTransfer();
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

  fromJSON(object: any): EventInboundTransfer {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      destAddr: isSet(object.destAddr) ? globalThis.String(object.destAddr) : "",
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      amount: isSet(object.amount) ? globalThis.String(object.amount) : "",
    };
  },

  toJSON(message: EventInboundTransfer): unknown {
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

  create<I extends Exact<DeepPartial<EventInboundTransfer>, I>>(base?: I): EventInboundTransfer {
    return EventInboundTransfer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventInboundTransfer>, I>>(object: I): EventInboundTransfer {
    const message = createBaseEventInboundTransfer();
    message.sender = object.sender ?? "";
    message.destAddr = object.destAddr ?? "";
    message.asset = (object.asset !== undefined && object.asset !== null) ? Asset.fromPartial(object.asset) : undefined;
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseEventOutboundTransfer(): EventOutboundTransfer {
  return { sender: "", destAddr: "", asset: undefined, amount: "" };
}

export const EventOutboundTransfer = {
  encode(message: EventOutboundTransfer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): EventOutboundTransfer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventOutboundTransfer();
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

  fromJSON(object: any): EventOutboundTransfer {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      destAddr: isSet(object.destAddr) ? globalThis.String(object.destAddr) : "",
      asset: isSet(object.asset) ? Asset.fromJSON(object.asset) : undefined,
      amount: isSet(object.amount) ? globalThis.String(object.amount) : "",
    };
  },

  toJSON(message: EventOutboundTransfer): unknown {
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

  create<I extends Exact<DeepPartial<EventOutboundTransfer>, I>>(base?: I): EventOutboundTransfer {
    return EventOutboundTransfer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventOutboundTransfer>, I>>(object: I): EventOutboundTransfer {
    const message = createBaseEventOutboundTransfer();
    message.sender = object.sender ?? "";
    message.destAddr = object.destAddr ?? "";
    message.asset = (object.asset !== undefined && object.asset !== null) ? Asset.fromPartial(object.asset) : undefined;
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseEventUpdateParams(): EventUpdateParams {
  return {
    newSigners: [],
    createdSigners: [],
    deletedSigners: [],
    newAssets: [],
    createdAssets: [],
    deletedAssets: [],
  };
}

export const EventUpdateParams = {
  encode(message: EventUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.newSigners) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.createdSigners) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.deletedSigners) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.newAssets) {
      AssetWithStatus.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.createdAssets) {
      AssetWithStatus.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.deletedAssets) {
      AssetWithStatus.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUpdateParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.newSigners.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.createdSigners.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deletedSigners.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.newAssets.push(AssetWithStatus.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createdAssets.push(AssetWithStatus.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.deletedAssets.push(AssetWithStatus.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EventUpdateParams {
    return {
      newSigners: globalThis.Array.isArray(object?.newSigners)
        ? object.newSigners.map((e: any) => globalThis.String(e))
        : [],
      createdSigners: globalThis.Array.isArray(object?.createdSigners)
        ? object.createdSigners.map((e: any) => globalThis.String(e))
        : [],
      deletedSigners: globalThis.Array.isArray(object?.deletedSigners)
        ? object.deletedSigners.map((e: any) => globalThis.String(e))
        : [],
      newAssets: globalThis.Array.isArray(object?.newAssets)
        ? object.newAssets.map((e: any) => AssetWithStatus.fromJSON(e))
        : [],
      createdAssets: globalThis.Array.isArray(object?.createdAssets)
        ? object.createdAssets.map((e: any) => AssetWithStatus.fromJSON(e))
        : [],
      deletedAssets: globalThis.Array.isArray(object?.deletedAssets)
        ? object.deletedAssets.map((e: any) => AssetWithStatus.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EventUpdateParams): unknown {
    const obj: any = {};
    if (message.newSigners?.length) {
      obj.newSigners = message.newSigners;
    }
    if (message.createdSigners?.length) {
      obj.createdSigners = message.createdSigners;
    }
    if (message.deletedSigners?.length) {
      obj.deletedSigners = message.deletedSigners;
    }
    if (message.newAssets?.length) {
      obj.newAssets = message.newAssets.map((e) => AssetWithStatus.toJSON(e));
    }
    if (message.createdAssets?.length) {
      obj.createdAssets = message.createdAssets.map((e) => AssetWithStatus.toJSON(e));
    }
    if (message.deletedAssets?.length) {
      obj.deletedAssets = message.deletedAssets.map((e) => AssetWithStatus.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventUpdateParams>, I>>(base?: I): EventUpdateParams {
    return EventUpdateParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventUpdateParams>, I>>(object: I): EventUpdateParams {
    const message = createBaseEventUpdateParams();
    message.newSigners = object.newSigners?.map((e) => e) || [];
    message.createdSigners = object.createdSigners?.map((e) => e) || [];
    message.deletedSigners = object.deletedSigners?.map((e) => e) || [];
    message.newAssets = object.newAssets?.map((e) => AssetWithStatus.fromPartial(e)) || [];
    message.createdAssets = object.createdAssets?.map((e) => AssetWithStatus.fromPartial(e)) || [];
    message.deletedAssets = object.deletedAssets?.map((e) => AssetWithStatus.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEventChangeAssetStatus(): EventChangeAssetStatus {
  return { sender: "", oldAssetStatus: undefined, newAssetStatus: undefined };
}

export const EventChangeAssetStatus = {
  encode(message: EventChangeAssetStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.oldAssetStatus !== undefined) {
      AssetWithStatus.encode(message.oldAssetStatus, writer.uint32(18).fork()).ldelim();
    }
    if (message.newAssetStatus !== undefined) {
      AssetWithStatus.encode(message.newAssetStatus, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventChangeAssetStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventChangeAssetStatus();
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

          message.oldAssetStatus = AssetWithStatus.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
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

  fromJSON(object: any): EventChangeAssetStatus {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      oldAssetStatus: isSet(object.oldAssetStatus) ? AssetWithStatus.fromJSON(object.oldAssetStatus) : undefined,
      newAssetStatus: isSet(object.newAssetStatus) ? AssetWithStatus.fromJSON(object.newAssetStatus) : undefined,
    };
  },

  toJSON(message: EventChangeAssetStatus): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.oldAssetStatus !== undefined) {
      obj.oldAssetStatus = AssetWithStatus.toJSON(message.oldAssetStatus);
    }
    if (message.newAssetStatus !== undefined) {
      obj.newAssetStatus = AssetWithStatus.toJSON(message.newAssetStatus);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventChangeAssetStatus>, I>>(base?: I): EventChangeAssetStatus {
    return EventChangeAssetStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventChangeAssetStatus>, I>>(object: I): EventChangeAssetStatus {
    const message = createBaseEventChangeAssetStatus();
    message.sender = object.sender ?? "";
    message.oldAssetStatus = (object.oldAssetStatus !== undefined && object.oldAssetStatus !== null)
      ? AssetWithStatus.fromPartial(object.oldAssetStatus)
      : undefined;
    message.newAssetStatus = (object.newAssetStatus !== undefined && object.newAssetStatus !== null)
      ? AssetWithStatus.fromPartial(object.newAssetStatus)
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
