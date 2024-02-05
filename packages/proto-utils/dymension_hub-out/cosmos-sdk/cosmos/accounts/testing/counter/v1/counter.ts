/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.accounts.testing.counter.v1";

/** MsgInit defines a message which initializes the counter with a given amount. */
export interface MsgInit {
  /** initial_value is the initial amount to set the counter to. */
  initialValue: Long;
}

/** MsgInitResponse defines the MsgInit response type. */
export interface MsgInitResponse {
}

/** MsgIncreaseCounter defines a message which increases the counter by a given amount. */
export interface MsgIncreaseCounter {
  /** amount is the amount to increase the counter by. */
  amount: Long;
}

/**
 * MsgIncreaseCounterResponse defines the MsgIncreaseCounter response type.
 * Returns the new counter value.
 */
export interface MsgIncreaseCounterResponse {
  /** new_amount defines the new counter value after the increase. */
  newAmount: Long;
}

/** MsgTestDependencies is used to test the dependencies. */
export interface MsgTestDependencies {
}

/** MsgTestDependenciesResponse is used to test the dependencies. */
export interface MsgTestDependenciesResponse {
  /** chain_id is used to test that the header service correctly works. */
  chainId: string;
  /** address is used to test address codec. */
  address: string;
  /** before_gas is used to test the gas meter reporting. */
  beforeGas: Long;
  /** after_gas is used to test gas meter increasing. */
  afterGas: Long;
}

/** QueryCounterRequest is used to query the counter value. */
export interface QueryCounterRequest {
}

/** QueryCounterResponse returns the counter value. */
export interface QueryCounterResponse {
  /** value defines the value of the counter. */
  value: Long;
}

function createBaseMsgInit(): MsgInit {
  return { initialValue: Long.UZERO };
}

export const MsgInit = {
  encode(message: MsgInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.initialValue.isZero()) {
      writer.uint32(8).uint64(message.initialValue);
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
          if (tag !== 8) {
            break;
          }

          message.initialValue = reader.uint64() as Long;
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
    return { initialValue: isSet(object.initialValue) ? Long.fromValue(object.initialValue) : Long.UZERO };
  },

  toJSON(message: MsgInit): unknown {
    const obj: any = {};
    if (!message.initialValue.isZero()) {
      obj.initialValue = (message.initialValue || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgInit>, I>>(base?: I): MsgInit {
    return MsgInit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgInit>, I>>(object: I): MsgInit {
    const message = createBaseMsgInit();
    message.initialValue = (object.initialValue !== undefined && object.initialValue !== null)
      ? Long.fromValue(object.initialValue)
      : Long.UZERO;
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

function createBaseMsgIncreaseCounter(): MsgIncreaseCounter {
  return { amount: Long.UZERO };
}

export const MsgIncreaseCounter = {
  encode(message: MsgIncreaseCounter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.amount.isZero()) {
      writer.uint32(8).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIncreaseCounter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIncreaseCounter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.amount = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgIncreaseCounter {
    return { amount: isSet(object.amount) ? Long.fromValue(object.amount) : Long.UZERO };
  },

  toJSON(message: MsgIncreaseCounter): unknown {
    const obj: any = {};
    if (!message.amount.isZero()) {
      obj.amount = (message.amount || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgIncreaseCounter>, I>>(base?: I): MsgIncreaseCounter {
    return MsgIncreaseCounter.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgIncreaseCounter>, I>>(object: I): MsgIncreaseCounter {
    const message = createBaseMsgIncreaseCounter();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Long.fromValue(object.amount)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgIncreaseCounterResponse(): MsgIncreaseCounterResponse {
  return { newAmount: Long.UZERO };
}

export const MsgIncreaseCounterResponse = {
  encode(message: MsgIncreaseCounterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.newAmount.isZero()) {
      writer.uint32(8).uint64(message.newAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIncreaseCounterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIncreaseCounterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.newAmount = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgIncreaseCounterResponse {
    return { newAmount: isSet(object.newAmount) ? Long.fromValue(object.newAmount) : Long.UZERO };
  },

  toJSON(message: MsgIncreaseCounterResponse): unknown {
    const obj: any = {};
    if (!message.newAmount.isZero()) {
      obj.newAmount = (message.newAmount || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgIncreaseCounterResponse>, I>>(base?: I): MsgIncreaseCounterResponse {
    return MsgIncreaseCounterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgIncreaseCounterResponse>, I>>(object: I): MsgIncreaseCounterResponse {
    const message = createBaseMsgIncreaseCounterResponse();
    message.newAmount = (object.newAmount !== undefined && object.newAmount !== null)
      ? Long.fromValue(object.newAmount)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgTestDependencies(): MsgTestDependencies {
  return {};
}

export const MsgTestDependencies = {
  encode(_: MsgTestDependencies, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTestDependencies {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTestDependencies();
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

  fromJSON(_: any): MsgTestDependencies {
    return {};
  },

  toJSON(_: MsgTestDependencies): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTestDependencies>, I>>(base?: I): MsgTestDependencies {
    return MsgTestDependencies.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTestDependencies>, I>>(_: I): MsgTestDependencies {
    const message = createBaseMsgTestDependencies();
    return message;
  },
};

function createBaseMsgTestDependenciesResponse(): MsgTestDependenciesResponse {
  return { chainId: "", address: "", beforeGas: Long.UZERO, afterGas: Long.UZERO };
}

export const MsgTestDependenciesResponse = {
  encode(message: MsgTestDependenciesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (!message.beforeGas.isZero()) {
      writer.uint32(24).uint64(message.beforeGas);
    }
    if (!message.afterGas.isZero()) {
      writer.uint32(32).uint64(message.afterGas);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTestDependenciesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTestDependenciesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chainId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.beforeGas = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.afterGas = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTestDependenciesResponse {
    return {
      chainId: isSet(object.chainId) ? globalThis.String(object.chainId) : "",
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      beforeGas: isSet(object.beforeGas) ? Long.fromValue(object.beforeGas) : Long.UZERO,
      afterGas: isSet(object.afterGas) ? Long.fromValue(object.afterGas) : Long.UZERO,
    };
  },

  toJSON(message: MsgTestDependenciesResponse): unknown {
    const obj: any = {};
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (!message.beforeGas.isZero()) {
      obj.beforeGas = (message.beforeGas || Long.UZERO).toString();
    }
    if (!message.afterGas.isZero()) {
      obj.afterGas = (message.afterGas || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTestDependenciesResponse>, I>>(base?: I): MsgTestDependenciesResponse {
    return MsgTestDependenciesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTestDependenciesResponse>, I>>(object: I): MsgTestDependenciesResponse {
    const message = createBaseMsgTestDependenciesResponse();
    message.chainId = object.chainId ?? "";
    message.address = object.address ?? "";
    message.beforeGas = (object.beforeGas !== undefined && object.beforeGas !== null)
      ? Long.fromValue(object.beforeGas)
      : Long.UZERO;
    message.afterGas = (object.afterGas !== undefined && object.afterGas !== null)
      ? Long.fromValue(object.afterGas)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryCounterRequest(): QueryCounterRequest {
  return {};
}

export const QueryCounterRequest = {
  encode(_: QueryCounterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCounterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCounterRequest();
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

  fromJSON(_: any): QueryCounterRequest {
    return {};
  },

  toJSON(_: QueryCounterRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCounterRequest>, I>>(base?: I): QueryCounterRequest {
    return QueryCounterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCounterRequest>, I>>(_: I): QueryCounterRequest {
    const message = createBaseQueryCounterRequest();
    return message;
  },
};

function createBaseQueryCounterResponse(): QueryCounterResponse {
  return { value: Long.UZERO };
}

export const QueryCounterResponse = {
  encode(message: QueryCounterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.value.isZero()) {
      writer.uint32(8).uint64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCounterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCounterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryCounterResponse {
    return { value: isSet(object.value) ? Long.fromValue(object.value) : Long.UZERO };
  },

  toJSON(message: QueryCounterResponse): unknown {
    const obj: any = {};
    if (!message.value.isZero()) {
      obj.value = (message.value || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryCounterResponse>, I>>(base?: I): QueryCounterResponse {
    return QueryCounterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryCounterResponse>, I>>(object: I): QueryCounterResponse {
    const message = createBaseQueryCounterResponse();
    message.value = (object.value !== undefined && object.value !== null) ? Long.fromValue(object.value) : Long.UZERO;
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
