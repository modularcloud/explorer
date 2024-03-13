/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dymensionxyz.dymension.eibc";

/** MsgFulfillOrder defines the FullfillOrder request type. */
export interface MsgFulfillOrder {
  /** fulfiller_address is the bech32-encoded address of the account which the message was sent from. */
  fulfillerAddress: string;
  orderId: string;
}

/** MsgFulfillOrderResponse defines the FullfillOrder response type. */
export interface MsgFulfillOrderResponse {
}

function createBaseMsgFulfillOrder(): MsgFulfillOrder {
  return { fulfillerAddress: "", orderId: "" };
}

export const MsgFulfillOrder = {
  encode(message: MsgFulfillOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fulfillerAddress !== "") {
      writer.uint32(10).string(message.fulfillerAddress);
    }
    if (message.orderId !== "") {
      writer.uint32(18).string(message.orderId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFulfillOrder {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfillOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fulfillerAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orderId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgFulfillOrder {
    return {
      fulfillerAddress: isSet(object.fulfillerAddress) ? globalThis.String(object.fulfillerAddress) : "",
      orderId: isSet(object.orderId) ? globalThis.String(object.orderId) : "",
    };
  },

  toJSON(message: MsgFulfillOrder): unknown {
    const obj: any = {};
    if (message.fulfillerAddress !== "") {
      obj.fulfillerAddress = message.fulfillerAddress;
    }
    if (message.orderId !== "") {
      obj.orderId = message.orderId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFulfillOrder>, I>>(base?: I): MsgFulfillOrder {
    return MsgFulfillOrder.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgFulfillOrder>, I>>(object: I): MsgFulfillOrder {
    const message = createBaseMsgFulfillOrder();
    message.fulfillerAddress = object.fulfillerAddress ?? "";
    message.orderId = object.orderId ?? "";
    return message;
  },
};

function createBaseMsgFulfillOrderResponse(): MsgFulfillOrderResponse {
  return {};
}

export const MsgFulfillOrderResponse = {
  encode(_: MsgFulfillOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFulfillOrderResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFulfillOrderResponse();
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

  fromJSON(_: any): MsgFulfillOrderResponse {
    return {};
  },

  toJSON(_: MsgFulfillOrderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFulfillOrderResponse>, I>>(base?: I): MsgFulfillOrderResponse {
    return MsgFulfillOrderResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgFulfillOrderResponse>, I>>(_: I): MsgFulfillOrderResponse {
    const message = createBaseMsgFulfillOrderResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  FulfillOrder(request: MsgFulfillOrder): Promise<MsgFulfillOrderResponse>;
}

export const MsgServiceName = "dymensionxyz.dymension.eibc.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.FulfillOrder = this.FulfillOrder.bind(this);
  }
  FulfillOrder(request: MsgFulfillOrder): Promise<MsgFulfillOrderResponse> {
    const data = MsgFulfillOrder.encode(request).finish();
    const promise = this.rpc.request(this.service, "FulfillOrder", data);
    return promise.then((data) => MsgFulfillOrderResponse.decode(_m0.Reader.create(data)));
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
