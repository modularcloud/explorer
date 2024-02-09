/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.cosmwasmpool.v1beta1";

/** ===================== JoinPoolExecuteMsg */
export interface EmptyRequest {
}

export interface JoinPoolExecuteMsgRequest {
  /**
   * join_pool is the structure containing all request fields of the join pool
   * execute message.
   */
  joinPool: EmptyRequest | undefined;
}

export interface JoinPoolExecuteMsgResponse {
}

/** ===================== ExitPoolExecuteMsg */
export interface ExitPoolExecuteMsgRequest {
  /**
   * exit_pool is the structure containing all request fields of the exit pool
   * execute message.
   */
  exitPool: EmptyRequest | undefined;
}

export interface ExitPoolExecuteMsgResponse {
}

function createBaseEmptyRequest(): EmptyRequest {
  return {};
}

export const EmptyRequest = {
  encode(_: EmptyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmptyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyRequest();
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

  fromJSON(_: any): EmptyRequest {
    return {};
  },

  toJSON(_: EmptyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<EmptyRequest>, I>>(base?: I): EmptyRequest {
    return EmptyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EmptyRequest>, I>>(_: I): EmptyRequest {
    const message = createBaseEmptyRequest();
    return message;
  },
};

function createBaseJoinPoolExecuteMsgRequest(): JoinPoolExecuteMsgRequest {
  return { joinPool: undefined };
}

export const JoinPoolExecuteMsgRequest = {
  encode(message: JoinPoolExecuteMsgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.joinPool !== undefined) {
      EmptyRequest.encode(message.joinPool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JoinPoolExecuteMsgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinPoolExecuteMsgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.joinPool = EmptyRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JoinPoolExecuteMsgRequest {
    return { joinPool: isSet(object.joinPool) ? EmptyRequest.fromJSON(object.joinPool) : undefined };
  },

  toJSON(message: JoinPoolExecuteMsgRequest): unknown {
    const obj: any = {};
    if (message.joinPool !== undefined) {
      obj.joinPool = EmptyRequest.toJSON(message.joinPool);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JoinPoolExecuteMsgRequest>, I>>(base?: I): JoinPoolExecuteMsgRequest {
    return JoinPoolExecuteMsgRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JoinPoolExecuteMsgRequest>, I>>(object: I): JoinPoolExecuteMsgRequest {
    const message = createBaseJoinPoolExecuteMsgRequest();
    message.joinPool = (object.joinPool !== undefined && object.joinPool !== null)
      ? EmptyRequest.fromPartial(object.joinPool)
      : undefined;
    return message;
  },
};

function createBaseJoinPoolExecuteMsgResponse(): JoinPoolExecuteMsgResponse {
  return {};
}

export const JoinPoolExecuteMsgResponse = {
  encode(_: JoinPoolExecuteMsgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JoinPoolExecuteMsgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinPoolExecuteMsgResponse();
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

  fromJSON(_: any): JoinPoolExecuteMsgResponse {
    return {};
  },

  toJSON(_: JoinPoolExecuteMsgResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<JoinPoolExecuteMsgResponse>, I>>(base?: I): JoinPoolExecuteMsgResponse {
    return JoinPoolExecuteMsgResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JoinPoolExecuteMsgResponse>, I>>(_: I): JoinPoolExecuteMsgResponse {
    const message = createBaseJoinPoolExecuteMsgResponse();
    return message;
  },
};

function createBaseExitPoolExecuteMsgRequest(): ExitPoolExecuteMsgRequest {
  return { exitPool: undefined };
}

export const ExitPoolExecuteMsgRequest = {
  encode(message: ExitPoolExecuteMsgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.exitPool !== undefined) {
      EmptyRequest.encode(message.exitPool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExitPoolExecuteMsgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExitPoolExecuteMsgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.exitPool = EmptyRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExitPoolExecuteMsgRequest {
    return { exitPool: isSet(object.exitPool) ? EmptyRequest.fromJSON(object.exitPool) : undefined };
  },

  toJSON(message: ExitPoolExecuteMsgRequest): unknown {
    const obj: any = {};
    if (message.exitPool !== undefined) {
      obj.exitPool = EmptyRequest.toJSON(message.exitPool);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExitPoolExecuteMsgRequest>, I>>(base?: I): ExitPoolExecuteMsgRequest {
    return ExitPoolExecuteMsgRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExitPoolExecuteMsgRequest>, I>>(object: I): ExitPoolExecuteMsgRequest {
    const message = createBaseExitPoolExecuteMsgRequest();
    message.exitPool = (object.exitPool !== undefined && object.exitPool !== null)
      ? EmptyRequest.fromPartial(object.exitPool)
      : undefined;
    return message;
  },
};

function createBaseExitPoolExecuteMsgResponse(): ExitPoolExecuteMsgResponse {
  return {};
}

export const ExitPoolExecuteMsgResponse = {
  encode(_: ExitPoolExecuteMsgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExitPoolExecuteMsgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExitPoolExecuteMsgResponse();
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

  fromJSON(_: any): ExitPoolExecuteMsgResponse {
    return {};
  },

  toJSON(_: ExitPoolExecuteMsgResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ExitPoolExecuteMsgResponse>, I>>(base?: I): ExitPoolExecuteMsgResponse {
    return ExitPoolExecuteMsgResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ExitPoolExecuteMsgResponse>, I>>(_: I): ExitPoolExecuteMsgResponse {
    const message = createBaseExitPoolExecuteMsgResponse();
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
