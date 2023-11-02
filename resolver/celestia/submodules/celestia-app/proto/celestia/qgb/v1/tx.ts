/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "celestia.qgb.v1";

/** MsgRegisterEVMAddress registers an evm address to a validator. */
export interface MsgRegisterEVMAddress {
  /** The operating address of the validator. */
  validatorAddress: string;
  /** The matching HEX encoded EVM address. */
  evmAddress: string;
}

/** MsgRegisterEVMAddressResponse is the response to registering an EVM address. */
export interface MsgRegisterEVMAddressResponse {
}

function createBaseMsgRegisterEVMAddress(): MsgRegisterEVMAddress {
  return { validatorAddress: "", evmAddress: "" };
}

export const MsgRegisterEVMAddress = {
  encode(message: MsgRegisterEVMAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.evmAddress !== "") {
      writer.uint32(18).string(message.evmAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterEVMAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterEVMAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.evmAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRegisterEVMAddress {
    return {
      validatorAddress: isSet(object.validatorAddress) ? globalThis.String(object.validatorAddress) : "",
      evmAddress: isSet(object.evmAddress) ? globalThis.String(object.evmAddress) : "",
    };
  },

  toJSON(message: MsgRegisterEVMAddress): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (message.evmAddress !== "") {
      obj.evmAddress = message.evmAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRegisterEVMAddress>, I>>(base?: I): MsgRegisterEVMAddress {
    return MsgRegisterEVMAddress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterEVMAddress>, I>>(object: I): MsgRegisterEVMAddress {
    const message = createBaseMsgRegisterEVMAddress();
    message.validatorAddress = object.validatorAddress ?? "";
    message.evmAddress = object.evmAddress ?? "";
    return message;
  },
};

function createBaseMsgRegisterEVMAddressResponse(): MsgRegisterEVMAddressResponse {
  return {};
}

export const MsgRegisterEVMAddressResponse = {
  encode(_: MsgRegisterEVMAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterEVMAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterEVMAddressResponse();
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

  fromJSON(_: any): MsgRegisterEVMAddressResponse {
    return {};
  },

  toJSON(_: MsgRegisterEVMAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRegisterEVMAddressResponse>, I>>(base?: I): MsgRegisterEVMAddressResponse {
    return MsgRegisterEVMAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterEVMAddressResponse>, I>>(_: I): MsgRegisterEVMAddressResponse {
    const message = createBaseMsgRegisterEVMAddressResponse();
    return message;
  },
};

/** Msg is the message server for receiving Blobstream transactions */
export interface Msg {
  /**
   * RegisterEVMAddress records an evm address for the validator which is used
   * by the relayer to aggregate signatures. A validator can only register a
   * single EVM address. The EVM address can be overridden by a later message.
   * There are no validity checks of the EVM addresses existence on the Ethereum
   * state machine.
   */
  RegisterEVMAddress(request: MsgRegisterEVMAddress): Promise<MsgRegisterEVMAddressResponse>;
}

export const MsgServiceName = "celestia.qgb.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.RegisterEVMAddress = this.RegisterEVMAddress.bind(this);
  }
  RegisterEVMAddress(request: MsgRegisterEVMAddress): Promise<MsgRegisterEVMAddressResponse> {
    const data = MsgRegisterEVMAddress.encode(request).finish();
    const promise = this.rpc.request(this.service, "RegisterEVMAddress", data);
    return promise.then((data) => MsgRegisterEVMAddressResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
