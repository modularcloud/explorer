/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.ibchooks";

export interface MsgEmitIBCAck {
  sender: string;
  packetSequence: Long;
  channel: string;
}

export interface MsgEmitIBCAckResponse {
  contractResult: string;
  ibcAck: string;
}

function createBaseMsgEmitIBCAck(): MsgEmitIBCAck {
  return { sender: "", packetSequence: Long.UZERO, channel: "" };
}

export const MsgEmitIBCAck = {
  encode(message: MsgEmitIBCAck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.packetSequence.isZero()) {
      writer.uint32(16).uint64(message.packetSequence);
    }
    if (message.channel !== "") {
      writer.uint32(26).string(message.channel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEmitIBCAck {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEmitIBCAck();
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
          if (tag !== 16) {
            break;
          }

          message.packetSequence = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.channel = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgEmitIBCAck {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      packetSequence: isSet(object.packetSequence) ? Long.fromValue(object.packetSequence) : Long.UZERO,
      channel: isSet(object.channel) ? globalThis.String(object.channel) : "",
    };
  },

  toJSON(message: MsgEmitIBCAck): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.packetSequence.isZero()) {
      obj.packetSequence = (message.packetSequence || Long.UZERO).toString();
    }
    if (message.channel !== "") {
      obj.channel = message.channel;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgEmitIBCAck>, I>>(base?: I): MsgEmitIBCAck {
    return MsgEmitIBCAck.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgEmitIBCAck>, I>>(object: I): MsgEmitIBCAck {
    const message = createBaseMsgEmitIBCAck();
    message.sender = object.sender ?? "";
    message.packetSequence = (object.packetSequence !== undefined && object.packetSequence !== null)
      ? Long.fromValue(object.packetSequence)
      : Long.UZERO;
    message.channel = object.channel ?? "";
    return message;
  },
};

function createBaseMsgEmitIBCAckResponse(): MsgEmitIBCAckResponse {
  return { contractResult: "", ibcAck: "" };
}

export const MsgEmitIBCAckResponse = {
  encode(message: MsgEmitIBCAckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contractResult !== "") {
      writer.uint32(10).string(message.contractResult);
    }
    if (message.ibcAck !== "") {
      writer.uint32(18).string(message.ibcAck);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEmitIBCAckResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEmitIBCAckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.contractResult = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ibcAck = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgEmitIBCAckResponse {
    return {
      contractResult: isSet(object.contractResult) ? globalThis.String(object.contractResult) : "",
      ibcAck: isSet(object.ibcAck) ? globalThis.String(object.ibcAck) : "",
    };
  },

  toJSON(message: MsgEmitIBCAckResponse): unknown {
    const obj: any = {};
    if (message.contractResult !== "") {
      obj.contractResult = message.contractResult;
    }
    if (message.ibcAck !== "") {
      obj.ibcAck = message.ibcAck;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgEmitIBCAckResponse>, I>>(base?: I): MsgEmitIBCAckResponse {
    return MsgEmitIBCAckResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgEmitIBCAckResponse>, I>>(object: I): MsgEmitIBCAckResponse {
    const message = createBaseMsgEmitIBCAckResponse();
    message.contractResult = object.contractResult ?? "";
    message.ibcAck = object.ibcAck ?? "";
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /**
   * EmitIBCAck checks the sender can emit the ack and writes the IBC
   * acknowledgement
   */
  EmitIBCAck(request: MsgEmitIBCAck): Promise<MsgEmitIBCAckResponse>;
}

export const MsgServiceName = "osmosis.ibchooks.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.EmitIBCAck = this.EmitIBCAck.bind(this);
  }
  EmitIBCAck(request: MsgEmitIBCAck): Promise<MsgEmitIBCAckResponse> {
    const data = MsgEmitIBCAck.encode(request).finish();
    const promise = this.rpc.request(this.service, "EmitIBCAck", data);
    return promise.then((data) => MsgEmitIBCAckResponse.decode(_m0.Reader.create(data)));
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
