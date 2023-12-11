/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.accounts.testing.rotation.v1";

/**
 * MsgInit is the init message used to create a new account
 * abstraction implementation that we use for testing, this account
 * also allows for rotating the public key.
 */
export interface MsgInit {
  pubKeyBytes: Uint8Array;
}

/** MsgInitResponse is the init message response. */
export interface MsgInitResponse {
}

/**
 * MsgRotatePubKey is the message used to swap the public key
 * of the account.
 */
export interface MsgRotatePubKey {
  newPubKeyBytes: Uint8Array;
}

/** MsgRotatePubKeyResponse is the MsgRotatePubKey response. */
export interface MsgRotatePubKeyResponse {
}

function createBaseMsgInit(): MsgInit {
  return { pubKeyBytes: new Uint8Array(0) };
}

export const MsgInit = {
  encode(message: MsgInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pubKeyBytes.length !== 0) {
      writer.uint32(10).bytes(message.pubKeyBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pubKeyBytes = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgInit {
    return { pubKeyBytes: isSet(object.pubKeyBytes) ? bytesFromBase64(object.pubKeyBytes) : new Uint8Array(0) };
  },

  toJSON(message: MsgInit): unknown {
    const obj: any = {};
    if (message.pubKeyBytes.length !== 0) {
      obj.pubKeyBytes = base64FromBytes(message.pubKeyBytes);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInit>, I>>(base?: I): MsgInit {
    return MsgInit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgInit>, I>>(object: I): MsgInit {
    const message = createBaseMsgInit();
    message.pubKeyBytes = object.pubKeyBytes ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgInitResponse(): MsgInitResponse {
  return {};
}

export const MsgInitResponse = {
  encode(_: MsgInitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInitResponse();
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

  fromJSON(_: any): MsgInitResponse {
    return {};
  },

  toJSON(_: MsgInitResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInitResponse>, I>>(base?: I): MsgInitResponse {
    return MsgInitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgInitResponse>, I>>(_: I): MsgInitResponse {
    const message = createBaseMsgInitResponse();
    return message;
  },
};

function createBaseMsgRotatePubKey(): MsgRotatePubKey {
  return { newPubKeyBytes: new Uint8Array(0) };
}

export const MsgRotatePubKey = {
  encode(message: MsgRotatePubKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.newPubKeyBytes.length !== 0) {
      writer.uint32(10).bytes(message.newPubKeyBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRotatePubKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRotatePubKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.newPubKeyBytes = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRotatePubKey {
    return {
      newPubKeyBytes: isSet(object.newPubKeyBytes) ? bytesFromBase64(object.newPubKeyBytes) : new Uint8Array(0),
    };
  },

  toJSON(message: MsgRotatePubKey): unknown {
    const obj: any = {};
    if (message.newPubKeyBytes.length !== 0) {
      obj.newPubKeyBytes = base64FromBytes(message.newPubKeyBytes);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRotatePubKey>, I>>(base?: I): MsgRotatePubKey {
    return MsgRotatePubKey.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRotatePubKey>, I>>(object: I): MsgRotatePubKey {
    const message = createBaseMsgRotatePubKey();
    message.newPubKeyBytes = object.newPubKeyBytes ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMsgRotatePubKeyResponse(): MsgRotatePubKeyResponse {
  return {};
}

export const MsgRotatePubKeyResponse = {
  encode(_: MsgRotatePubKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRotatePubKeyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRotatePubKeyResponse();
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

  fromJSON(_: any): MsgRotatePubKeyResponse {
    return {};
  },

  toJSON(_: MsgRotatePubKeyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRotatePubKeyResponse>, I>>(base?: I): MsgRotatePubKeyResponse {
    return MsgRotatePubKeyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRotatePubKeyResponse>, I>>(_: I): MsgRotatePubKeyResponse {
    const message = createBaseMsgRotatePubKeyResponse();
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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
