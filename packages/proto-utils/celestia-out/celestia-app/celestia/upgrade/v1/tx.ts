/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "celestia.upgrade.v1";

/** MsgSignalVersion signals for an upgrade */
export interface MsgSignalVersion {
  validatorAddress: string;
  version: Long;
}

/**
 * MsgSignalVersionResponse describes the response returned after the submission
 * of a SignalVersion
 */
export interface MsgSignalVersionResponse {
}

/** MsgTryUpgrade tries to upgrade the chain */
export interface MsgTryUpgrade {
  signer: string;
}

/** MsgTryUpgradeResponse describes the response returned after the submission */
export interface MsgTryUpgradeResponse {
}

function createBaseMsgSignalVersion(): MsgSignalVersion {
  return { validatorAddress: "", version: Long.UZERO };
}

export const MsgSignalVersion = {
  encode(message: MsgSignalVersion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (!message.version.isZero()) {
      writer.uint32(16).uint64(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignalVersion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignalVersion();
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
          if (tag !== 16) {
            break;
          }

          message.version = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSignalVersion {
    return {
      validatorAddress: isSet(object.validatorAddress) ? globalThis.String(object.validatorAddress) : "",
      version: isSet(object.version) ? Long.fromValue(object.version) : Long.UZERO,
    };
  },

  toJSON(message: MsgSignalVersion): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    if (!message.version.isZero()) {
      obj.version = (message.version || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSignalVersion>, I>>(base?: I): MsgSignalVersion {
    return MsgSignalVersion.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSignalVersion>, I>>(object: I): MsgSignalVersion {
    const message = createBaseMsgSignalVersion();
    message.validatorAddress = object.validatorAddress ?? "";
    message.version = (object.version !== undefined && object.version !== null)
      ? Long.fromValue(object.version)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgSignalVersionResponse(): MsgSignalVersionResponse {
  return {};
}

export const MsgSignalVersionResponse = {
  encode(_: MsgSignalVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignalVersionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignalVersionResponse();
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

  fromJSON(_: any): MsgSignalVersionResponse {
    return {};
  },

  toJSON(_: MsgSignalVersionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSignalVersionResponse>, I>>(base?: I): MsgSignalVersionResponse {
    return MsgSignalVersionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSignalVersionResponse>, I>>(_: I): MsgSignalVersionResponse {
    const message = createBaseMsgSignalVersionResponse();
    return message;
  },
};

function createBaseMsgTryUpgrade(): MsgTryUpgrade {
  return { signer: "" };
}

export const MsgTryUpgrade = {
  encode(message: MsgTryUpgrade, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signer !== "") {
      writer.uint32(10).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTryUpgrade {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTryUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTryUpgrade {
    return { signer: isSet(object.signer) ? globalThis.String(object.signer) : "" };
  },

  toJSON(message: MsgTryUpgrade): unknown {
    const obj: any = {};
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTryUpgrade>, I>>(base?: I): MsgTryUpgrade {
    return MsgTryUpgrade.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTryUpgrade>, I>>(object: I): MsgTryUpgrade {
    const message = createBaseMsgTryUpgrade();
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgTryUpgradeResponse(): MsgTryUpgradeResponse {
  return {};
}

export const MsgTryUpgradeResponse = {
  encode(_: MsgTryUpgradeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTryUpgradeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTryUpgradeResponse();
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

  fromJSON(_: any): MsgTryUpgradeResponse {
    return {};
  },

  toJSON(_: MsgTryUpgradeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTryUpgradeResponse>, I>>(base?: I): MsgTryUpgradeResponse {
    return MsgTryUpgradeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTryUpgradeResponse>, I>>(_: I): MsgTryUpgradeResponse {
    const message = createBaseMsgTryUpgradeResponse();
    return message;
  },
};

/** Msg defines the upgrade Msg service. */
export interface Msg {
  /** SignalVersion allows the validator to signal for an upgrade */
  SignalVersion(request: MsgSignalVersion): Promise<MsgSignalVersionResponse>;
  /**
   * TryUpgrade tallies all the votes and if a quorum is reached, it will
   * trigger an upgrade for the following height
   */
  TryUpgrade(request: MsgTryUpgrade): Promise<MsgTryUpgradeResponse>;
}

export const MsgServiceName = "celestia.upgrade.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.SignalVersion = this.SignalVersion.bind(this);
    this.TryUpgrade = this.TryUpgrade.bind(this);
  }
  SignalVersion(request: MsgSignalVersion): Promise<MsgSignalVersionResponse> {
    const data = MsgSignalVersion.encode(request).finish();
    const promise = this.rpc.request(this.service, "SignalVersion", data);
    return promise.then((data) => MsgSignalVersionResponse.decode(_m0.Reader.create(data)));
  }

  TryUpgrade(request: MsgTryUpgrade): Promise<MsgTryUpgradeResponse> {
    const data = MsgTryUpgrade.encode(request).finish();
    const promise = this.rpc.request(this.service, "TryUpgrade", data);
    return promise.then((data) => MsgTryUpgradeResponse.decode(_m0.Reader.create(data)));
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
