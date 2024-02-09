/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "osmosis.cosmwasmpool.v1beta1";

/** ===================== CalcOutAmtGivenIn */
export interface CalcOutAmtGivenIn {
  /** token_in is the token to be sent to the pool. */
  tokenIn:
    | Coin
    | undefined;
  /** token_out_denom is the token denom to be received from the pool. */
  tokenOutDenom: string;
  /** swap_fee is the swap fee for this swap estimate. */
  swapFee: string;
}

export interface CalcOutAmtGivenInRequest {
  /**
   * calc_out_amt_given_in is the structure containing all the request
   * information for this query.
   */
  calcOutAmtGivenIn: CalcOutAmtGivenIn | undefined;
}

export interface CalcOutAmtGivenInResponse {
  /** token_out is the token out computed from this swap estimate call. */
  tokenOut: Coin | undefined;
}

/** ===================== CalcInAmtGivenOut */
export interface CalcInAmtGivenOut {
  /** token_out is the token out to be receoved from the pool. */
  tokenOut:
    | Coin
    | undefined;
  /** token_in_denom is the token denom to be sentt to the pool. */
  tokenInDenom: string;
  /** swap_fee is the swap fee for this swap estimate. */
  swapFee: string;
}

export interface CalcInAmtGivenOutRequest {
  /**
   * calc_in_amt_given_out is the structure containing all the request
   * information for this query.
   */
  calcInAmtGivenOut: CalcInAmtGivenOut | undefined;
}

export interface CalcInAmtGivenOutResponse {
  /** token_in is the token in computed from this swap estimate call. */
  tokenIn: Coin | undefined;
}

function createBaseCalcOutAmtGivenIn(): CalcOutAmtGivenIn {
  return { tokenIn: undefined, tokenOutDenom: "", swapFee: "" };
}

export const CalcOutAmtGivenIn = {
  encode(message: CalcOutAmtGivenIn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(10).fork()).ldelim();
    }
    if (message.tokenOutDenom !== "") {
      writer.uint32(18).string(message.tokenOutDenom);
    }
    if (message.swapFee !== "") {
      writer.uint32(26).string(message.swapFee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalcOutAmtGivenIn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcOutAmtGivenIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenIn = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tokenOutDenom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.swapFee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalcOutAmtGivenIn {
    return {
      tokenIn: isSet(object.tokenIn) ? Coin.fromJSON(object.tokenIn) : undefined,
      tokenOutDenom: isSet(object.tokenOutDenom) ? globalThis.String(object.tokenOutDenom) : "",
      swapFee: isSet(object.swapFee) ? globalThis.String(object.swapFee) : "",
    };
  },

  toJSON(message: CalcOutAmtGivenIn): unknown {
    const obj: any = {};
    if (message.tokenIn !== undefined) {
      obj.tokenIn = Coin.toJSON(message.tokenIn);
    }
    if (message.tokenOutDenom !== "") {
      obj.tokenOutDenom = message.tokenOutDenom;
    }
    if (message.swapFee !== "") {
      obj.swapFee = message.swapFee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalcOutAmtGivenIn>, I>>(base?: I): CalcOutAmtGivenIn {
    return CalcOutAmtGivenIn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalcOutAmtGivenIn>, I>>(object: I): CalcOutAmtGivenIn {
    const message = createBaseCalcOutAmtGivenIn();
    message.tokenIn = (object.tokenIn !== undefined && object.tokenIn !== null)
      ? Coin.fromPartial(object.tokenIn)
      : undefined;
    message.tokenOutDenom = object.tokenOutDenom ?? "";
    message.swapFee = object.swapFee ?? "";
    return message;
  },
};

function createBaseCalcOutAmtGivenInRequest(): CalcOutAmtGivenInRequest {
  return { calcOutAmtGivenIn: undefined };
}

export const CalcOutAmtGivenInRequest = {
  encode(message: CalcOutAmtGivenInRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.calcOutAmtGivenIn !== undefined) {
      CalcOutAmtGivenIn.encode(message.calcOutAmtGivenIn, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalcOutAmtGivenInRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcOutAmtGivenInRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.calcOutAmtGivenIn = CalcOutAmtGivenIn.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalcOutAmtGivenInRequest {
    return {
      calcOutAmtGivenIn: isSet(object.calcOutAmtGivenIn)
        ? CalcOutAmtGivenIn.fromJSON(object.calcOutAmtGivenIn)
        : undefined,
    };
  },

  toJSON(message: CalcOutAmtGivenInRequest): unknown {
    const obj: any = {};
    if (message.calcOutAmtGivenIn !== undefined) {
      obj.calcOutAmtGivenIn = CalcOutAmtGivenIn.toJSON(message.calcOutAmtGivenIn);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalcOutAmtGivenInRequest>, I>>(base?: I): CalcOutAmtGivenInRequest {
    return CalcOutAmtGivenInRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalcOutAmtGivenInRequest>, I>>(object: I): CalcOutAmtGivenInRequest {
    const message = createBaseCalcOutAmtGivenInRequest();
    message.calcOutAmtGivenIn = (object.calcOutAmtGivenIn !== undefined && object.calcOutAmtGivenIn !== null)
      ? CalcOutAmtGivenIn.fromPartial(object.calcOutAmtGivenIn)
      : undefined;
    return message;
  },
};

function createBaseCalcOutAmtGivenInResponse(): CalcOutAmtGivenInResponse {
  return { tokenOut: undefined };
}

export const CalcOutAmtGivenInResponse = {
  encode(message: CalcOutAmtGivenInResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalcOutAmtGivenInResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcOutAmtGivenInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenOut = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalcOutAmtGivenInResponse {
    return { tokenOut: isSet(object.tokenOut) ? Coin.fromJSON(object.tokenOut) : undefined };
  },

  toJSON(message: CalcOutAmtGivenInResponse): unknown {
    const obj: any = {};
    if (message.tokenOut !== undefined) {
      obj.tokenOut = Coin.toJSON(message.tokenOut);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalcOutAmtGivenInResponse>, I>>(base?: I): CalcOutAmtGivenInResponse {
    return CalcOutAmtGivenInResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalcOutAmtGivenInResponse>, I>>(object: I): CalcOutAmtGivenInResponse {
    const message = createBaseCalcOutAmtGivenInResponse();
    message.tokenOut = (object.tokenOut !== undefined && object.tokenOut !== null)
      ? Coin.fromPartial(object.tokenOut)
      : undefined;
    return message;
  },
};

function createBaseCalcInAmtGivenOut(): CalcInAmtGivenOut {
  return { tokenOut: undefined, tokenInDenom: "", swapFee: "" };
}

export const CalcInAmtGivenOut = {
  encode(message: CalcInAmtGivenOut, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(10).fork()).ldelim();
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(18).string(message.tokenInDenom);
    }
    if (message.swapFee !== "") {
      writer.uint32(26).string(message.swapFee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalcInAmtGivenOut {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcInAmtGivenOut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenOut = Coin.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tokenInDenom = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.swapFee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalcInAmtGivenOut {
    return {
      tokenOut: isSet(object.tokenOut) ? Coin.fromJSON(object.tokenOut) : undefined,
      tokenInDenom: isSet(object.tokenInDenom) ? globalThis.String(object.tokenInDenom) : "",
      swapFee: isSet(object.swapFee) ? globalThis.String(object.swapFee) : "",
    };
  },

  toJSON(message: CalcInAmtGivenOut): unknown {
    const obj: any = {};
    if (message.tokenOut !== undefined) {
      obj.tokenOut = Coin.toJSON(message.tokenOut);
    }
    if (message.tokenInDenom !== "") {
      obj.tokenInDenom = message.tokenInDenom;
    }
    if (message.swapFee !== "") {
      obj.swapFee = message.swapFee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalcInAmtGivenOut>, I>>(base?: I): CalcInAmtGivenOut {
    return CalcInAmtGivenOut.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalcInAmtGivenOut>, I>>(object: I): CalcInAmtGivenOut {
    const message = createBaseCalcInAmtGivenOut();
    message.tokenOut = (object.tokenOut !== undefined && object.tokenOut !== null)
      ? Coin.fromPartial(object.tokenOut)
      : undefined;
    message.tokenInDenom = object.tokenInDenom ?? "";
    message.swapFee = object.swapFee ?? "";
    return message;
  },
};

function createBaseCalcInAmtGivenOutRequest(): CalcInAmtGivenOutRequest {
  return { calcInAmtGivenOut: undefined };
}

export const CalcInAmtGivenOutRequest = {
  encode(message: CalcInAmtGivenOutRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.calcInAmtGivenOut !== undefined) {
      CalcInAmtGivenOut.encode(message.calcInAmtGivenOut, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalcInAmtGivenOutRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcInAmtGivenOutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.calcInAmtGivenOut = CalcInAmtGivenOut.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalcInAmtGivenOutRequest {
    return {
      calcInAmtGivenOut: isSet(object.calcInAmtGivenOut)
        ? CalcInAmtGivenOut.fromJSON(object.calcInAmtGivenOut)
        : undefined,
    };
  },

  toJSON(message: CalcInAmtGivenOutRequest): unknown {
    const obj: any = {};
    if (message.calcInAmtGivenOut !== undefined) {
      obj.calcInAmtGivenOut = CalcInAmtGivenOut.toJSON(message.calcInAmtGivenOut);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalcInAmtGivenOutRequest>, I>>(base?: I): CalcInAmtGivenOutRequest {
    return CalcInAmtGivenOutRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalcInAmtGivenOutRequest>, I>>(object: I): CalcInAmtGivenOutRequest {
    const message = createBaseCalcInAmtGivenOutRequest();
    message.calcInAmtGivenOut = (object.calcInAmtGivenOut !== undefined && object.calcInAmtGivenOut !== null)
      ? CalcInAmtGivenOut.fromPartial(object.calcInAmtGivenOut)
      : undefined;
    return message;
  },
};

function createBaseCalcInAmtGivenOutResponse(): CalcInAmtGivenOutResponse {
  return { tokenIn: undefined };
}

export const CalcInAmtGivenOutResponse = {
  encode(message: CalcInAmtGivenOutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CalcInAmtGivenOutResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCalcInAmtGivenOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenIn = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CalcInAmtGivenOutResponse {
    return { tokenIn: isSet(object.tokenIn) ? Coin.fromJSON(object.tokenIn) : undefined };
  },

  toJSON(message: CalcInAmtGivenOutResponse): unknown {
    const obj: any = {};
    if (message.tokenIn !== undefined) {
      obj.tokenIn = Coin.toJSON(message.tokenIn);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CalcInAmtGivenOutResponse>, I>>(base?: I): CalcInAmtGivenOutResponse {
    return CalcInAmtGivenOutResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CalcInAmtGivenOutResponse>, I>>(object: I): CalcInAmtGivenOutResponse {
    const message = createBaseCalcInAmtGivenOutResponse();
    message.tokenIn = (object.tokenIn !== undefined && object.tokenIn !== null)
      ? Coin.fromPartial(object.tokenIn)
      : undefined;
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
