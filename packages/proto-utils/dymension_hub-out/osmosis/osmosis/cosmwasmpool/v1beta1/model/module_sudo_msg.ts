/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "osmosis.cosmwasmpool.v1beta1";

/** ===================== SwapExactAmountIn */
export interface SwapExactAmountIn {
  sender: string;
  /** token_in is the token to be sent to the pool. */
  tokenIn:
    | Coin
    | undefined;
  /** token_out_denom is the token denom to be received from the pool. */
  tokenOutDenom: string;
  /**
   * token_out_min_amount is the minimum amount of token_out to be received from
   * the pool.
   */
  tokenOutMinAmount: string;
  /** swap_fee is the swap fee for this swap estimate. */
  swapFee: string;
}

export interface SwapExactAmountInSudoMsg {
  /**
   * swap_exact_amount_in is the structure containing all the request
   * information for this message.
   */
  swapExactAmountIn: SwapExactAmountIn | undefined;
}

export interface SwapExactAmountInSudoMsgResponse {
  /** token_out_amount is the token out computed from this swap estimate call. */
  tokenOutAmount: string;
}

/** ===================== SwapExactAmountOut */
export interface SwapExactAmountOut {
  sender: string;
  /** token_out is the token to be sent out of the pool. */
  tokenOut:
    | Coin
    | undefined;
  /** token_in_denom is the token denom to be sent too the pool. */
  tokenInDenom: string;
  /**
   * token_in_max_amount is the maximum amount of token_in to be sent to the
   * pool.
   */
  tokenInMaxAmount: string;
  /** swap_fee is the swap fee for this swap estimate. */
  swapFee: string;
}

export interface SwapExactAmountOutSudoMsg {
  /**
   * swap_exact_amount_out is the structure containing all the request
   * information for this message.
   */
  swapExactAmountOut: SwapExactAmountOut | undefined;
}

export interface SwapExactAmountOutSudoMsgResponse {
  /** token_in_amount is the token in computed from this swap estimate call. */
  tokenInAmount: string;
}

function createBaseSwapExactAmountIn(): SwapExactAmountIn {
  return { sender: "", tokenIn: undefined, tokenOutDenom: "", tokenOutMinAmount: "", swapFee: "" };
}

export const SwapExactAmountIn = {
  encode(message: SwapExactAmountIn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenOutDenom !== "") {
      writer.uint32(26).string(message.tokenOutDenom);
    }
    if (message.tokenOutMinAmount !== "") {
      writer.uint32(34).string(message.tokenOutMinAmount);
    }
    if (message.swapFee !== "") {
      writer.uint32(42).string(message.swapFee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwapExactAmountIn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapExactAmountIn();
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

          message.tokenIn = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tokenOutDenom = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.tokenOutMinAmount = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): SwapExactAmountIn {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      tokenIn: isSet(object.tokenIn) ? Coin.fromJSON(object.tokenIn) : undefined,
      tokenOutDenom: isSet(object.tokenOutDenom) ? globalThis.String(object.tokenOutDenom) : "",
      tokenOutMinAmount: isSet(object.tokenOutMinAmount) ? globalThis.String(object.tokenOutMinAmount) : "",
      swapFee: isSet(object.swapFee) ? globalThis.String(object.swapFee) : "",
    };
  },

  toJSON(message: SwapExactAmountIn): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.tokenIn !== undefined) {
      obj.tokenIn = Coin.toJSON(message.tokenIn);
    }
    if (message.tokenOutDenom !== "") {
      obj.tokenOutDenom = message.tokenOutDenom;
    }
    if (message.tokenOutMinAmount !== "") {
      obj.tokenOutMinAmount = message.tokenOutMinAmount;
    }
    if (message.swapFee !== "") {
      obj.swapFee = message.swapFee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SwapExactAmountIn>, I>>(base?: I): SwapExactAmountIn {
    return SwapExactAmountIn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SwapExactAmountIn>, I>>(object: I): SwapExactAmountIn {
    const message = createBaseSwapExactAmountIn();
    message.sender = object.sender ?? "";
    message.tokenIn = (object.tokenIn !== undefined && object.tokenIn !== null)
      ? Coin.fromPartial(object.tokenIn)
      : undefined;
    message.tokenOutDenom = object.tokenOutDenom ?? "";
    message.tokenOutMinAmount = object.tokenOutMinAmount ?? "";
    message.swapFee = object.swapFee ?? "";
    return message;
  },
};

function createBaseSwapExactAmountInSudoMsg(): SwapExactAmountInSudoMsg {
  return { swapExactAmountIn: undefined };
}

export const SwapExactAmountInSudoMsg = {
  encode(message: SwapExactAmountInSudoMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.swapExactAmountIn !== undefined) {
      SwapExactAmountIn.encode(message.swapExactAmountIn, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwapExactAmountInSudoMsg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapExactAmountInSudoMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.swapExactAmountIn = SwapExactAmountIn.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SwapExactAmountInSudoMsg {
    return {
      swapExactAmountIn: isSet(object.swapExactAmountIn)
        ? SwapExactAmountIn.fromJSON(object.swapExactAmountIn)
        : undefined,
    };
  },

  toJSON(message: SwapExactAmountInSudoMsg): unknown {
    const obj: any = {};
    if (message.swapExactAmountIn !== undefined) {
      obj.swapExactAmountIn = SwapExactAmountIn.toJSON(message.swapExactAmountIn);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SwapExactAmountInSudoMsg>, I>>(base?: I): SwapExactAmountInSudoMsg {
    return SwapExactAmountInSudoMsg.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SwapExactAmountInSudoMsg>, I>>(object: I): SwapExactAmountInSudoMsg {
    const message = createBaseSwapExactAmountInSudoMsg();
    message.swapExactAmountIn = (object.swapExactAmountIn !== undefined && object.swapExactAmountIn !== null)
      ? SwapExactAmountIn.fromPartial(object.swapExactAmountIn)
      : undefined;
    return message;
  },
};

function createBaseSwapExactAmountInSudoMsgResponse(): SwapExactAmountInSudoMsgResponse {
  return { tokenOutAmount: "" };
}

export const SwapExactAmountInSudoMsgResponse = {
  encode(message: SwapExactAmountInSudoMsgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwapExactAmountInSudoMsgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapExactAmountInSudoMsgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenOutAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SwapExactAmountInSudoMsgResponse {
    return { tokenOutAmount: isSet(object.tokenOutAmount) ? globalThis.String(object.tokenOutAmount) : "" };
  },

  toJSON(message: SwapExactAmountInSudoMsgResponse): unknown {
    const obj: any = {};
    if (message.tokenOutAmount !== "") {
      obj.tokenOutAmount = message.tokenOutAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SwapExactAmountInSudoMsgResponse>, I>>(
    base?: I,
  ): SwapExactAmountInSudoMsgResponse {
    return SwapExactAmountInSudoMsgResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SwapExactAmountInSudoMsgResponse>, I>>(
    object: I,
  ): SwapExactAmountInSudoMsgResponse {
    const message = createBaseSwapExactAmountInSudoMsgResponse();
    message.tokenOutAmount = object.tokenOutAmount ?? "";
    return message;
  },
};

function createBaseSwapExactAmountOut(): SwapExactAmountOut {
  return { sender: "", tokenOut: undefined, tokenInDenom: "", tokenInMaxAmount: "", swapFee: "" };
}

export const SwapExactAmountOut = {
  encode(message: SwapExactAmountOut, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(26).string(message.tokenInDenom);
    }
    if (message.tokenInMaxAmount !== "") {
      writer.uint32(34).string(message.tokenInMaxAmount);
    }
    if (message.swapFee !== "") {
      writer.uint32(42).string(message.swapFee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwapExactAmountOut {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapExactAmountOut();
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

          message.tokenOut = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tokenInDenom = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.tokenInMaxAmount = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
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

  fromJSON(object: any): SwapExactAmountOut {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      tokenOut: isSet(object.tokenOut) ? Coin.fromJSON(object.tokenOut) : undefined,
      tokenInDenom: isSet(object.tokenInDenom) ? globalThis.String(object.tokenInDenom) : "",
      tokenInMaxAmount: isSet(object.tokenInMaxAmount) ? globalThis.String(object.tokenInMaxAmount) : "",
      swapFee: isSet(object.swapFee) ? globalThis.String(object.swapFee) : "",
    };
  },

  toJSON(message: SwapExactAmountOut): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.tokenOut !== undefined) {
      obj.tokenOut = Coin.toJSON(message.tokenOut);
    }
    if (message.tokenInDenom !== "") {
      obj.tokenInDenom = message.tokenInDenom;
    }
    if (message.tokenInMaxAmount !== "") {
      obj.tokenInMaxAmount = message.tokenInMaxAmount;
    }
    if (message.swapFee !== "") {
      obj.swapFee = message.swapFee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SwapExactAmountOut>, I>>(base?: I): SwapExactAmountOut {
    return SwapExactAmountOut.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SwapExactAmountOut>, I>>(object: I): SwapExactAmountOut {
    const message = createBaseSwapExactAmountOut();
    message.sender = object.sender ?? "";
    message.tokenOut = (object.tokenOut !== undefined && object.tokenOut !== null)
      ? Coin.fromPartial(object.tokenOut)
      : undefined;
    message.tokenInDenom = object.tokenInDenom ?? "";
    message.tokenInMaxAmount = object.tokenInMaxAmount ?? "";
    message.swapFee = object.swapFee ?? "";
    return message;
  },
};

function createBaseSwapExactAmountOutSudoMsg(): SwapExactAmountOutSudoMsg {
  return { swapExactAmountOut: undefined };
}

export const SwapExactAmountOutSudoMsg = {
  encode(message: SwapExactAmountOutSudoMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.swapExactAmountOut !== undefined) {
      SwapExactAmountOut.encode(message.swapExactAmountOut, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwapExactAmountOutSudoMsg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapExactAmountOutSudoMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.swapExactAmountOut = SwapExactAmountOut.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SwapExactAmountOutSudoMsg {
    return {
      swapExactAmountOut: isSet(object.swapExactAmountOut)
        ? SwapExactAmountOut.fromJSON(object.swapExactAmountOut)
        : undefined,
    };
  },

  toJSON(message: SwapExactAmountOutSudoMsg): unknown {
    const obj: any = {};
    if (message.swapExactAmountOut !== undefined) {
      obj.swapExactAmountOut = SwapExactAmountOut.toJSON(message.swapExactAmountOut);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SwapExactAmountOutSudoMsg>, I>>(base?: I): SwapExactAmountOutSudoMsg {
    return SwapExactAmountOutSudoMsg.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SwapExactAmountOutSudoMsg>, I>>(object: I): SwapExactAmountOutSudoMsg {
    const message = createBaseSwapExactAmountOutSudoMsg();
    message.swapExactAmountOut = (object.swapExactAmountOut !== undefined && object.swapExactAmountOut !== null)
      ? SwapExactAmountOut.fromPartial(object.swapExactAmountOut)
      : undefined;
    return message;
  },
};

function createBaseSwapExactAmountOutSudoMsgResponse(): SwapExactAmountOutSudoMsgResponse {
  return { tokenInAmount: "" };
}

export const SwapExactAmountOutSudoMsgResponse = {
  encode(message: SwapExactAmountOutSudoMsgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwapExactAmountOutSudoMsgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwapExactAmountOutSudoMsgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tokenInAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SwapExactAmountOutSudoMsgResponse {
    return { tokenInAmount: isSet(object.tokenInAmount) ? globalThis.String(object.tokenInAmount) : "" };
  },

  toJSON(message: SwapExactAmountOutSudoMsgResponse): unknown {
    const obj: any = {};
    if (message.tokenInAmount !== "") {
      obj.tokenInAmount = message.tokenInAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SwapExactAmountOutSudoMsgResponse>, I>>(
    base?: I,
  ): SwapExactAmountOutSudoMsgResponse {
    return SwapExactAmountOutSudoMsgResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SwapExactAmountOutSudoMsgResponse>, I>>(
    object: I,
  ): SwapExactAmountOutSudoMsgResponse {
    const message = createBaseSwapExactAmountOutSudoMsgResponse();
    message.tokenInAmount = object.tokenInAmount ?? "";
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
