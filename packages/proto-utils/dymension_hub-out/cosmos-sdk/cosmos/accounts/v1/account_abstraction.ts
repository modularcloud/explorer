/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmos.accounts.v1";

/**
 * UserOperation defines the type used to define a state transition that
 * an account wants to make.
 */
export interface UserOperation {
  /** sender defines the account that is sending the UserOperation. */
  sender: string;
  /**
   * authentication_method defines the authentication strategy the account wants to use.
   * since accounts can have multiple authentication methods, this field is used to
   * instruct the account on what auth method to use.
   */
  authenticationMethod: string;
  /**
   * authentication_data defines the authentication data associated with the authentication method.
   * It is the account implementer duty to assess that the UserOperation is properly signed.
   */
  authenticationData: Uint8Array;
  /**
   * authentication_gas_limit expresses the gas limit to be used for the authentication part of the
   * UserOperation.
   */
  authenticationGasLimit: Long;
  /**
   * bundler_payment_messages expresses a list of messages that the account
   * executes to pay the bundler for submitting the UserOperation.
   * It can be empty if the bundler does not need any form of payment,
   * the handshake for submitting the UserOperation might have happened off-chain.
   * Bundlers and accounts are free to use any form of payment, in fact the payment can
   * either be empty or be expressed as:
   * - NFT payment
   * - IBC Token payment.
   * - Payment through delegations.
   */
  bundlerPaymentMessages: Any[];
  /**
   * bundler_payment_gas_limit defines the gas limit to be used for the bundler payment.
   * This ensures that, since the bundler executes a list of UserOperations and there needs to
   * be minimal trust between bundler and UserOperation sender, the sender cannot consume
   * the whole bundle gas.
   */
  bundlerPaymentGasLimit: Long;
  /**
   * execution_messages expresses a list of messages that the account wants to execute.
   * This concretely is the intent of the transaction expressed as a UserOperation.
   */
  executionMessages: Any[];
  /**
   * execution_gas_limit defines the gas limit to be used for the execution of the UserOperation's
   * execution messages.
   */
  executionGasLimit: Long;
}

/**
 * UserOperationResponse defines the response of a UserOperation.
 * If the operation fails the error field will be populated.
 */
export interface UserOperationResponse {
  /** authentication_gas_used defines the gas used for the authentication part of the UserOperation. */
  authenticationGasUsed: Long;
  /** bundler_payment_gas_used defines the gas used for the bundler payment part of the UserOperation. */
  bundlerPaymentGasUsed: Long;
  /**
   * bundler_payment_responses defines the responses of the bundler payment messages.
   * It can be empty if the bundler does not need any form of payment.
   */
  bundlerPaymentResponses: Any[];
  /** execution_gas_used defines the gas used for the execution part of the UserOperation. */
  executionGasUsed: Long;
  /** execution_responses defines the responses of the execution messages. */
  executionResponses: Any[];
  /**
   * error defines the error that occurred during the execution of the UserOperation.
   * If the error is not empty, the UserOperation failed.
   * Other fields might be populated even if the error is not empty, for example
   * if the operation fails after the authentication step, the authentication_gas_used
   * field will be populated.
   */
  error: string;
}

function createBaseUserOperation(): UserOperation {
  return {
    sender: "",
    authenticationMethod: "",
    authenticationData: new Uint8Array(0),
    authenticationGasLimit: Long.UZERO,
    bundlerPaymentMessages: [],
    bundlerPaymentGasLimit: Long.UZERO,
    executionMessages: [],
    executionGasLimit: Long.UZERO,
  };
}

export const UserOperation = {
  encode(message: UserOperation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.authenticationMethod !== "") {
      writer.uint32(18).string(message.authenticationMethod);
    }
    if (message.authenticationData.length !== 0) {
      writer.uint32(26).bytes(message.authenticationData);
    }
    if (!message.authenticationGasLimit.isZero()) {
      writer.uint32(32).uint64(message.authenticationGasLimit);
    }
    for (const v of message.bundlerPaymentMessages) {
      Any.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (!message.bundlerPaymentGasLimit.isZero()) {
      writer.uint32(48).uint64(message.bundlerPaymentGasLimit);
    }
    for (const v of message.executionMessages) {
      Any.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (!message.executionGasLimit.isZero()) {
      writer.uint32(64).uint64(message.executionGasLimit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserOperation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserOperation();
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

          message.authenticationMethod = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.authenticationData = reader.bytes();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.authenticationGasLimit = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.bundlerPaymentMessages.push(Any.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.bundlerPaymentGasLimit = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.executionMessages.push(Any.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.executionGasLimit = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserOperation {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      authenticationMethod: isSet(object.authenticationMethod) ? globalThis.String(object.authenticationMethod) : "",
      authenticationData: isSet(object.authenticationData)
        ? bytesFromBase64(object.authenticationData)
        : new Uint8Array(0),
      authenticationGasLimit: isSet(object.authenticationGasLimit)
        ? Long.fromValue(object.authenticationGasLimit)
        : Long.UZERO,
      bundlerPaymentMessages: globalThis.Array.isArray(object?.bundlerPaymentMessages)
        ? object.bundlerPaymentMessages.map((e: any) => Any.fromJSON(e))
        : [],
      bundlerPaymentGasLimit: isSet(object.bundlerPaymentGasLimit)
        ? Long.fromValue(object.bundlerPaymentGasLimit)
        : Long.UZERO,
      executionMessages: globalThis.Array.isArray(object?.executionMessages)
        ? object.executionMessages.map((e: any) => Any.fromJSON(e))
        : [],
      executionGasLimit: isSet(object.executionGasLimit) ? Long.fromValue(object.executionGasLimit) : Long.UZERO,
    };
  },

  toJSON(message: UserOperation): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.authenticationMethod !== "") {
      obj.authenticationMethod = message.authenticationMethod;
    }
    if (message.authenticationData.length !== 0) {
      obj.authenticationData = base64FromBytes(message.authenticationData);
    }
    if (!message.authenticationGasLimit.isZero()) {
      obj.authenticationGasLimit = (message.authenticationGasLimit || Long.UZERO).toString();
    }
    if (message.bundlerPaymentMessages?.length) {
      obj.bundlerPaymentMessages = message.bundlerPaymentMessages.map((e) => Any.toJSON(e));
    }
    if (!message.bundlerPaymentGasLimit.isZero()) {
      obj.bundlerPaymentGasLimit = (message.bundlerPaymentGasLimit || Long.UZERO).toString();
    }
    if (message.executionMessages?.length) {
      obj.executionMessages = message.executionMessages.map((e) => Any.toJSON(e));
    }
    if (!message.executionGasLimit.isZero()) {
      obj.executionGasLimit = (message.executionGasLimit || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserOperation>, I>>(base?: I): UserOperation {
    return UserOperation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserOperation>, I>>(object: I): UserOperation {
    const message = createBaseUserOperation();
    message.sender = object.sender ?? "";
    message.authenticationMethod = object.authenticationMethod ?? "";
    message.authenticationData = object.authenticationData ?? new Uint8Array(0);
    message.authenticationGasLimit =
      (object.authenticationGasLimit !== undefined && object.authenticationGasLimit !== null)
        ? Long.fromValue(object.authenticationGasLimit)
        : Long.UZERO;
    message.bundlerPaymentMessages = object.bundlerPaymentMessages?.map((e) => Any.fromPartial(e)) || [];
    message.bundlerPaymentGasLimit =
      (object.bundlerPaymentGasLimit !== undefined && object.bundlerPaymentGasLimit !== null)
        ? Long.fromValue(object.bundlerPaymentGasLimit)
        : Long.UZERO;
    message.executionMessages = object.executionMessages?.map((e) => Any.fromPartial(e)) || [];
    message.executionGasLimit = (object.executionGasLimit !== undefined && object.executionGasLimit !== null)
      ? Long.fromValue(object.executionGasLimit)
      : Long.UZERO;
    return message;
  },
};

function createBaseUserOperationResponse(): UserOperationResponse {
  return {
    authenticationGasUsed: Long.UZERO,
    bundlerPaymentGasUsed: Long.UZERO,
    bundlerPaymentResponses: [],
    executionGasUsed: Long.UZERO,
    executionResponses: [],
    error: "",
  };
}

export const UserOperationResponse = {
  encode(message: UserOperationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.authenticationGasUsed.isZero()) {
      writer.uint32(8).uint64(message.authenticationGasUsed);
    }
    if (!message.bundlerPaymentGasUsed.isZero()) {
      writer.uint32(16).uint64(message.bundlerPaymentGasUsed);
    }
    for (const v of message.bundlerPaymentResponses) {
      Any.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.executionGasUsed.isZero()) {
      writer.uint32(32).uint64(message.executionGasUsed);
    }
    for (const v of message.executionResponses) {
      Any.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.error !== "") {
      writer.uint32(50).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserOperationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserOperationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.authenticationGasUsed = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.bundlerPaymentGasUsed = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bundlerPaymentResponses.push(Any.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.executionGasUsed = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.executionResponses.push(Any.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserOperationResponse {
    return {
      authenticationGasUsed: isSet(object.authenticationGasUsed)
        ? Long.fromValue(object.authenticationGasUsed)
        : Long.UZERO,
      bundlerPaymentGasUsed: isSet(object.bundlerPaymentGasUsed)
        ? Long.fromValue(object.bundlerPaymentGasUsed)
        : Long.UZERO,
      bundlerPaymentResponses: globalThis.Array.isArray(object?.bundlerPaymentResponses)
        ? object.bundlerPaymentResponses.map((e: any) => Any.fromJSON(e))
        : [],
      executionGasUsed: isSet(object.executionGasUsed) ? Long.fromValue(object.executionGasUsed) : Long.UZERO,
      executionResponses: globalThis.Array.isArray(object?.executionResponses)
        ? object.executionResponses.map((e: any) => Any.fromJSON(e))
        : [],
      error: isSet(object.error) ? globalThis.String(object.error) : "",
    };
  },

  toJSON(message: UserOperationResponse): unknown {
    const obj: any = {};
    if (!message.authenticationGasUsed.isZero()) {
      obj.authenticationGasUsed = (message.authenticationGasUsed || Long.UZERO).toString();
    }
    if (!message.bundlerPaymentGasUsed.isZero()) {
      obj.bundlerPaymentGasUsed = (message.bundlerPaymentGasUsed || Long.UZERO).toString();
    }
    if (message.bundlerPaymentResponses?.length) {
      obj.bundlerPaymentResponses = message.bundlerPaymentResponses.map((e) => Any.toJSON(e));
    }
    if (!message.executionGasUsed.isZero()) {
      obj.executionGasUsed = (message.executionGasUsed || Long.UZERO).toString();
    }
    if (message.executionResponses?.length) {
      obj.executionResponses = message.executionResponses.map((e) => Any.toJSON(e));
    }
    if (message.error !== "") {
      obj.error = message.error;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserOperationResponse>, I>>(base?: I): UserOperationResponse {
    return UserOperationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserOperationResponse>, I>>(object: I): UserOperationResponse {
    const message = createBaseUserOperationResponse();
    message.authenticationGasUsed =
      (object.authenticationGasUsed !== undefined && object.authenticationGasUsed !== null)
        ? Long.fromValue(object.authenticationGasUsed)
        : Long.UZERO;
    message.bundlerPaymentGasUsed =
      (object.bundlerPaymentGasUsed !== undefined && object.bundlerPaymentGasUsed !== null)
        ? Long.fromValue(object.bundlerPaymentGasUsed)
        : Long.UZERO;
    message.bundlerPaymentResponses = object.bundlerPaymentResponses?.map((e) => Any.fromPartial(e)) || [];
    message.executionGasUsed = (object.executionGasUsed !== undefined && object.executionGasUsed !== null)
      ? Long.fromValue(object.executionGasUsed)
      : Long.UZERO;
    message.executionResponses = object.executionResponses?.map((e) => Any.fromPartial(e)) || [];
    message.error = object.error ?? "";
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
