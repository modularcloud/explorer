/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { UserOperation, UserOperationResponse } from "./account_abstraction";

export const protobufPackage = "cosmos.accounts.v1";

/** MsgInit defines the Create request type for the Msg/Create RPC method. */
export interface MsgInit {
  /** sender is the address of the sender of this message. */
  sender: string;
  /** account_type is the type of the account to be created. */
  accountType: string;
  /** message is the message to be sent to the account. */
  message: Any | undefined;
}

/** MsgInitResponse defines the Create response type for the Msg/Create RPC method. */
export interface MsgInitResponse {
  /** account_address is the address of the newly created account. */
  accountAddress: string;
  /** response is the response returned by the account implementation. */
  response: Any | undefined;
}

/** MsgExecute defines the Execute request type for the Msg/Execute RPC method. */
export interface MsgExecute {
  /** sender is the address of the sender of this message. */
  sender: string;
  /** target is the address of the account to be executed. */
  target: string;
  /** message is the message to be sent to the account. */
  message: Any | undefined;
}

/** MsgExecuteResponse defines the Execute response type for the Msg/Execute RPC method. */
export interface MsgExecuteResponse {
  /** response is the response returned by the account implementation. */
  response: Any | undefined;
}

/** MsgExecuteBundle defines the ExecuteBundle request type for the Msg/ExecuteBundle RPC method. */
export interface MsgExecuteBundle {
  /**
   * bundler defines the entity going through the standard TX flow
   * to execute one or multiple UserOperations on behalf of others.
   */
  bundler: string;
  /** operations is the list of operations to be executed. */
  operations: UserOperation[];
}

/** MsgExecuteBundleResponse defines the ExecuteBundle response type for the Msg/ExecuteBundle RPC method. */
export interface MsgExecuteBundleResponse {
  /** responses is the list of responses returned by the account implementations. */
  responses: UserOperationResponse[];
}

function createBaseMsgInit(): MsgInit {
  return { sender: "", accountType: "", message: undefined };
}

export const MsgInit = {
  encode(message: MsgInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.accountType !== "") {
      writer.uint32(18).string(message.accountType);
    }
    if (message.message !== undefined) {
      Any.encode(message.message, writer.uint32(26).fork()).ldelim();
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

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accountType = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = Any.decode(reader, reader.uint32());
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
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      accountType: isSet(object.accountType) ? globalThis.String(object.accountType) : "",
      message: isSet(object.message) ? Any.fromJSON(object.message) : undefined,
    };
  },

  toJSON(message: MsgInit): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.accountType !== "") {
      obj.accountType = message.accountType;
    }
    if (message.message !== undefined) {
      obj.message = Any.toJSON(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInit>, I>>(base?: I): MsgInit {
    return MsgInit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgInit>, I>>(object: I): MsgInit {
    const message = createBaseMsgInit();
    message.sender = object.sender ?? "";
    message.accountType = object.accountType ?? "";
    message.message = (object.message !== undefined && object.message !== null)
      ? Any.fromPartial(object.message)
      : undefined;
    return message;
  },
};

function createBaseMsgInitResponse(): MsgInitResponse {
  return { accountAddress: "", response: undefined };
}

export const MsgInitResponse = {
  encode(message: MsgInitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (message.response !== undefined) {
      Any.encode(message.response, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accountAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.response = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgInitResponse {
    return {
      accountAddress: isSet(object.accountAddress) ? globalThis.String(object.accountAddress) : "",
      response: isSet(object.response) ? Any.fromJSON(object.response) : undefined,
    };
  },

  toJSON(message: MsgInitResponse): unknown {
    const obj: any = {};
    if (message.accountAddress !== "") {
      obj.accountAddress = message.accountAddress;
    }
    if (message.response !== undefined) {
      obj.response = Any.toJSON(message.response);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInitResponse>, I>>(base?: I): MsgInitResponse {
    return MsgInitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgInitResponse>, I>>(object: I): MsgInitResponse {
    const message = createBaseMsgInitResponse();
    message.accountAddress = object.accountAddress ?? "";
    message.response = (object.response !== undefined && object.response !== null)
      ? Any.fromPartial(object.response)
      : undefined;
    return message;
  },
};

function createBaseMsgExecute(): MsgExecute {
  return { sender: "", target: "", message: undefined };
}

export const MsgExecute = {
  encode(message: MsgExecute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.target !== "") {
      writer.uint32(18).string(message.target);
    }
    if (message.message !== undefined) {
      Any.encode(message.message, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecute {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecute();
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

          message.target = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecute {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      target: isSet(object.target) ? globalThis.String(object.target) : "",
      message: isSet(object.message) ? Any.fromJSON(object.message) : undefined,
    };
  },

  toJSON(message: MsgExecute): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.target !== "") {
      obj.target = message.target;
    }
    if (message.message !== undefined) {
      obj.message = Any.toJSON(message.message);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExecute>, I>>(base?: I): MsgExecute {
    return MsgExecute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExecute>, I>>(object: I): MsgExecute {
    const message = createBaseMsgExecute();
    message.sender = object.sender ?? "";
    message.target = object.target ?? "";
    message.message = (object.message !== undefined && object.message !== null)
      ? Any.fromPartial(object.message)
      : undefined;
    return message;
  },
};

function createBaseMsgExecuteResponse(): MsgExecuteResponse {
  return { response: undefined };
}

export const MsgExecuteResponse = {
  encode(message: MsgExecuteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.response !== undefined) {
      Any.encode(message.response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.response = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecuteResponse {
    return { response: isSet(object.response) ? Any.fromJSON(object.response) : undefined };
  },

  toJSON(message: MsgExecuteResponse): unknown {
    const obj: any = {};
    if (message.response !== undefined) {
      obj.response = Any.toJSON(message.response);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExecuteResponse>, I>>(base?: I): MsgExecuteResponse {
    return MsgExecuteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExecuteResponse>, I>>(object: I): MsgExecuteResponse {
    const message = createBaseMsgExecuteResponse();
    message.response = (object.response !== undefined && object.response !== null)
      ? Any.fromPartial(object.response)
      : undefined;
    return message;
  },
};

function createBaseMsgExecuteBundle(): MsgExecuteBundle {
  return { bundler: "", operations: [] };
}

export const MsgExecuteBundle = {
  encode(message: MsgExecuteBundle, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bundler !== "") {
      writer.uint32(10).string(message.bundler);
    }
    for (const v of message.operations) {
      UserOperation.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteBundle {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteBundle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bundler = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.operations.push(UserOperation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecuteBundle {
    return {
      bundler: isSet(object.bundler) ? globalThis.String(object.bundler) : "",
      operations: globalThis.Array.isArray(object?.operations)
        ? object.operations.map((e: any) => UserOperation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgExecuteBundle): unknown {
    const obj: any = {};
    if (message.bundler !== "") {
      obj.bundler = message.bundler;
    }
    if (message.operations?.length) {
      obj.operations = message.operations.map((e) => UserOperation.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExecuteBundle>, I>>(base?: I): MsgExecuteBundle {
    return MsgExecuteBundle.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExecuteBundle>, I>>(object: I): MsgExecuteBundle {
    const message = createBaseMsgExecuteBundle();
    message.bundler = object.bundler ?? "";
    message.operations = object.operations?.map((e) => UserOperation.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgExecuteBundleResponse(): MsgExecuteBundleResponse {
  return { responses: [] };
}

export const MsgExecuteBundleResponse = {
  encode(message: MsgExecuteBundleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.responses) {
      UserOperationResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteBundleResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteBundleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.responses.push(UserOperationResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecuteBundleResponse {
    return {
      responses: globalThis.Array.isArray(object?.responses)
        ? object.responses.map((e: any) => UserOperationResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgExecuteBundleResponse): unknown {
    const obj: any = {};
    if (message.responses?.length) {
      obj.responses = message.responses.map((e) => UserOperationResponse.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExecuteBundleResponse>, I>>(base?: I): MsgExecuteBundleResponse {
    return MsgExecuteBundleResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExecuteBundleResponse>, I>>(object: I): MsgExecuteBundleResponse {
    const message = createBaseMsgExecuteBundleResponse();
    message.responses = object.responses?.map((e) => UserOperationResponse.fromPartial(e)) || [];
    return message;
  },
};

/** Msg defines the Msg service for the x/accounts module. */
export interface Msg {
  /** Init creates a new account in the chain. */
  Init(request: MsgInit): Promise<MsgInitResponse>;
  /** Execute executes a message to the target account. */
  Execute(request: MsgExecute): Promise<MsgExecuteResponse>;
  /**
   * ExecuteBundle pertains account abstraction, it is used by the bundler
   * to execute multiple UserOperations in a single transaction message.
   */
  ExecuteBundle(request: MsgExecuteBundle): Promise<MsgExecuteBundleResponse>;
}

export const MsgServiceName = "cosmos.accounts.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.Init = this.Init.bind(this);
    this.Execute = this.Execute.bind(this);
    this.ExecuteBundle = this.ExecuteBundle.bind(this);
  }
  Init(request: MsgInit): Promise<MsgInitResponse> {
    const data = MsgInit.encode(request).finish();
    const promise = this.rpc.request(this.service, "Init", data);
    return promise.then((data) => MsgInitResponse.decode(_m0.Reader.create(data)));
  }

  Execute(request: MsgExecute): Promise<MsgExecuteResponse> {
    const data = MsgExecute.encode(request).finish();
    const promise = this.rpc.request(this.service, "Execute", data);
    return promise.then((data) => MsgExecuteResponse.decode(_m0.Reader.create(data)));
  }

  ExecuteBundle(request: MsgExecuteBundle): Promise<MsgExecuteBundleResponse> {
    const data = MsgExecuteBundle.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExecuteBundle", data);
    return promise.then((data) => MsgExecuteBundleResponse.decode(_m0.Reader.create(data)));
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
