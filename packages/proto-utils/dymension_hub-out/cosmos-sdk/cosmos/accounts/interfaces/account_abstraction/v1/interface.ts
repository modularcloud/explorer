/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../../google/protobuf/any";
import { UserOperation } from "../../../v1/account_abstraction";

export const protobufPackage = "cosmos.accounts.interfaces.account_abstraction.v1";

/**
 * MsgAuthenticate is a message that an x/account account abstraction implementer
 * must handle to authenticate a state transition.
 */
export interface MsgAuthenticate {
  /**
   * bundler defines the address of the bundler that sent the operation.
   * NOTE: in case the operation was sent directly by the user, this field will reflect
   * the user address.
   */
  bundler: string;
  /**
   * user_operation is the operation that the user is trying to perform.
   * it also contains authentication information.
   */
  userOperation: UserOperation | undefined;
}

/**
 * MsgAuthenticateResponse is the response to MsgAuthenticate.
 * The authentication either fails or succeeds, this is why
 * there are no auxiliary fields to the response.
 */
export interface MsgAuthenticateResponse {
}

/**
 * MsgPayBundler is a message that an x/account account abstraction implementer
 * can optionally implement in case it wants to further refine control over
 * the bundler payment messages.
 * The account must ensure the caller of this message is the x/accounts module itself.
 */
export interface MsgPayBundler {
  /**
   * bundler is the address of the bundler.
   * NOTE: in case the operation was sent directly by the user, this field will
   * reflect the user address.
   */
  bundler: string;
  /**
   * bundler_payment_messages are the messages that the operation sender will execute.
   * The account can modify the messages as it sees fit.
   */
  bundlerPaymentMessages: Any[];
}

/** MsgPayBundlerResponse is the response to MsgPayBundler. */
export interface MsgPayBundlerResponse {
  /** bundler_payment_messages_response are the messages that the bundler will pay for. */
  bundlerPaymentMessagesResponse: Any[];
}

/**
 * MsgExecute is a message that an x/account account abstraction implementer
 * can optionally implement in case it wants to further refine control over
 * the execution messages. It can be used to extend the execution flow, possibly
 * block certain messages, or modify them.
 * The account must ensure the caller of this message is the x/accounts module itself.
 */
export interface MsgExecute {
  /**
   * bundler is the address of the bundler.
   * NOTE: in case the operation was sent directly by the user, this field will
   * reflect the user address.
   */
  bundler: string;
  /**
   * execution_messages are the messages that the operation sender will execute.
   * The account can modify the messages as it sees fit.
   */
  executionMessages: Any[];
}

/** MsgExecuteResponse is the response to MsgExecute. */
export interface MsgExecuteResponse {
  /** execution_messages_response are the messages that the operation sender will execute. */
  executionMessagesResponse: Any[];
}

/**
 * QueryAuthenticationMethods is a query that an x/account account abstraction implementer
 * must handle to return the authentication methods that the account supports.
 */
export interface QueryAuthenticationMethods {
}

/** QueryAuthenticationMethodsResponse is the response to QueryAuthenticationMethods. */
export interface QueryAuthenticationMethodsResponse {
  /** authentication_methods are the authentication methods that the account supports. */
  authenticationMethods: string[];
}

function createBaseMsgAuthenticate(): MsgAuthenticate {
  return { bundler: "", userOperation: undefined };
}

export const MsgAuthenticate = {
  encode(message: MsgAuthenticate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bundler !== "") {
      writer.uint32(10).string(message.bundler);
    }
    if (message.userOperation !== undefined) {
      UserOperation.encode(message.userOperation, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuthenticate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthenticate();
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

          message.userOperation = UserOperation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAuthenticate {
    return {
      bundler: isSet(object.bundler) ? globalThis.String(object.bundler) : "",
      userOperation: isSet(object.userOperation) ? UserOperation.fromJSON(object.userOperation) : undefined,
    };
  },

  toJSON(message: MsgAuthenticate): unknown {
    const obj: any = {};
    if (message.bundler !== "") {
      obj.bundler = message.bundler;
    }
    if (message.userOperation !== undefined) {
      obj.userOperation = UserOperation.toJSON(message.userOperation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAuthenticate>, I>>(base?: I): MsgAuthenticate {
    return MsgAuthenticate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAuthenticate>, I>>(object: I): MsgAuthenticate {
    const message = createBaseMsgAuthenticate();
    message.bundler = object.bundler ?? "";
    message.userOperation = (object.userOperation !== undefined && object.userOperation !== null)
      ? UserOperation.fromPartial(object.userOperation)
      : undefined;
    return message;
  },
};

function createBaseMsgAuthenticateResponse(): MsgAuthenticateResponse {
  return {};
}

export const MsgAuthenticateResponse = {
  encode(_: MsgAuthenticateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuthenticateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthenticateResponse();
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

  fromJSON(_: any): MsgAuthenticateResponse {
    return {};
  },

  toJSON(_: MsgAuthenticateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAuthenticateResponse>, I>>(base?: I): MsgAuthenticateResponse {
    return MsgAuthenticateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAuthenticateResponse>, I>>(_: I): MsgAuthenticateResponse {
    const message = createBaseMsgAuthenticateResponse();
    return message;
  },
};

function createBaseMsgPayBundler(): MsgPayBundler {
  return { bundler: "", bundlerPaymentMessages: [] };
}

export const MsgPayBundler = {
  encode(message: MsgPayBundler, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bundler !== "") {
      writer.uint32(10).string(message.bundler);
    }
    for (const v of message.bundlerPaymentMessages) {
      Any.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPayBundler {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPayBundler();
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

          message.bundlerPaymentMessages.push(Any.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgPayBundler {
    return {
      bundler: isSet(object.bundler) ? globalThis.String(object.bundler) : "",
      bundlerPaymentMessages: globalThis.Array.isArray(object?.bundlerPaymentMessages)
        ? object.bundlerPaymentMessages.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgPayBundler): unknown {
    const obj: any = {};
    if (message.bundler !== "") {
      obj.bundler = message.bundler;
    }
    if (message.bundlerPaymentMessages?.length) {
      obj.bundlerPaymentMessages = message.bundlerPaymentMessages.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgPayBundler>, I>>(base?: I): MsgPayBundler {
    return MsgPayBundler.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgPayBundler>, I>>(object: I): MsgPayBundler {
    const message = createBaseMsgPayBundler();
    message.bundler = object.bundler ?? "";
    message.bundlerPaymentMessages = object.bundlerPaymentMessages?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgPayBundlerResponse(): MsgPayBundlerResponse {
  return { bundlerPaymentMessagesResponse: [] };
}

export const MsgPayBundlerResponse = {
  encode(message: MsgPayBundlerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.bundlerPaymentMessagesResponse) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPayBundlerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPayBundlerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bundlerPaymentMessagesResponse.push(Any.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgPayBundlerResponse {
    return {
      bundlerPaymentMessagesResponse: globalThis.Array.isArray(object?.bundlerPaymentMessagesResponse)
        ? object.bundlerPaymentMessagesResponse.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgPayBundlerResponse): unknown {
    const obj: any = {};
    if (message.bundlerPaymentMessagesResponse?.length) {
      obj.bundlerPaymentMessagesResponse = message.bundlerPaymentMessagesResponse.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgPayBundlerResponse>, I>>(base?: I): MsgPayBundlerResponse {
    return MsgPayBundlerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgPayBundlerResponse>, I>>(object: I): MsgPayBundlerResponse {
    const message = createBaseMsgPayBundlerResponse();
    message.bundlerPaymentMessagesResponse = object.bundlerPaymentMessagesResponse?.map((e) => Any.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseMsgExecute(): MsgExecute {
  return { bundler: "", executionMessages: [] };
}

export const MsgExecute = {
  encode(message: MsgExecute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bundler !== "") {
      writer.uint32(10).string(message.bundler);
    }
    for (const v of message.executionMessages) {
      Any.encode(v!, writer.uint32(18).fork()).ldelim();
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

          message.bundler = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.executionMessages.push(Any.decode(reader, reader.uint32()));
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
      bundler: isSet(object.bundler) ? globalThis.String(object.bundler) : "",
      executionMessages: globalThis.Array.isArray(object?.executionMessages)
        ? object.executionMessages.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgExecute): unknown {
    const obj: any = {};
    if (message.bundler !== "") {
      obj.bundler = message.bundler;
    }
    if (message.executionMessages?.length) {
      obj.executionMessages = message.executionMessages.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExecute>, I>>(base?: I): MsgExecute {
    return MsgExecute.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExecute>, I>>(object: I): MsgExecute {
    const message = createBaseMsgExecute();
    message.bundler = object.bundler ?? "";
    message.executionMessages = object.executionMessages?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgExecuteResponse(): MsgExecuteResponse {
  return { executionMessagesResponse: [] };
}

export const MsgExecuteResponse = {
  encode(message: MsgExecuteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.executionMessagesResponse) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
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

          message.executionMessagesResponse.push(Any.decode(reader, reader.uint32()));
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
    return {
      executionMessagesResponse: globalThis.Array.isArray(object?.executionMessagesResponse)
        ? object.executionMessagesResponse.map((e: any) => Any.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgExecuteResponse): unknown {
    const obj: any = {};
    if (message.executionMessagesResponse?.length) {
      obj.executionMessagesResponse = message.executionMessagesResponse.map((e) => Any.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExecuteResponse>, I>>(base?: I): MsgExecuteResponse {
    return MsgExecuteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExecuteResponse>, I>>(object: I): MsgExecuteResponse {
    const message = createBaseMsgExecuteResponse();
    message.executionMessagesResponse = object.executionMessagesResponse?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryAuthenticationMethods(): QueryAuthenticationMethods {
  return {};
}

export const QueryAuthenticationMethods = {
  encode(_: QueryAuthenticationMethods, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuthenticationMethods {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuthenticationMethods();
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

  fromJSON(_: any): QueryAuthenticationMethods {
    return {};
  },

  toJSON(_: QueryAuthenticationMethods): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAuthenticationMethods>, I>>(base?: I): QueryAuthenticationMethods {
    return QueryAuthenticationMethods.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAuthenticationMethods>, I>>(_: I): QueryAuthenticationMethods {
    const message = createBaseQueryAuthenticationMethods();
    return message;
  },
};

function createBaseQueryAuthenticationMethodsResponse(): QueryAuthenticationMethodsResponse {
  return { authenticationMethods: [] };
}

export const QueryAuthenticationMethodsResponse = {
  encode(message: QueryAuthenticationMethodsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.authenticationMethods) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAuthenticationMethodsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAuthenticationMethodsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authenticationMethods.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAuthenticationMethodsResponse {
    return {
      authenticationMethods: globalThis.Array.isArray(object?.authenticationMethods)
        ? object.authenticationMethods.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: QueryAuthenticationMethodsResponse): unknown {
    const obj: any = {};
    if (message.authenticationMethods?.length) {
      obj.authenticationMethods = message.authenticationMethods;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAuthenticationMethodsResponse>, I>>(
    base?: I,
  ): QueryAuthenticationMethodsResponse {
    return QueryAuthenticationMethodsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAuthenticationMethodsResponse>, I>>(
    object: I,
  ): QueryAuthenticationMethodsResponse {
    const message = createBaseQueryAuthenticationMethodsResponse();
    message.authenticationMethods = object.authenticationMethods?.map((e) => e) || [];
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
