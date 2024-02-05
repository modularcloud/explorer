/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { SwapAmountInRoute, SwapAmountInSplitRoute, SwapAmountOutRoute, SwapAmountOutSplitRoute } from "./swap_route";

export const protobufPackage = "osmosis.poolmanager.v1beta1";

/** ===================== MsgSwapExactAmountIn */
export interface MsgSwapExactAmountIn {
  sender: string;
  routes: SwapAmountInRoute[];
  tokenIn: Coin | undefined;
  tokenOutMinAmount: string;
}

export interface MsgSwapExactAmountInResponse {
  tokenOutAmount: string;
}

/** ===================== MsgSplitRouteSwapExactAmountIn */
export interface MsgSplitRouteSwapExactAmountIn {
  sender: string;
  routes: SwapAmountInSplitRoute[];
  tokenInDenom: string;
  tokenOutMinAmount: string;
}

export interface MsgSplitRouteSwapExactAmountInResponse {
  tokenOutAmount: string;
}

/** ===================== MsgSwapExactAmountOut */
export interface MsgSwapExactAmountOut {
  sender: string;
  routes: SwapAmountOutRoute[];
  tokenInMaxAmount: string;
  tokenOut: Coin | undefined;
}

export interface MsgSwapExactAmountOutResponse {
  tokenInAmount: string;
}

/** ===================== MsgSplitRouteSwapExactAmountOut */
export interface MsgSplitRouteSwapExactAmountOut {
  sender: string;
  routes: SwapAmountOutSplitRoute[];
  tokenOutDenom: string;
  tokenInMaxAmount: string;
}

export interface MsgSplitRouteSwapExactAmountOutResponse {
  tokenInAmount: string;
}

/** ===================== MsgSetDenomPairTakerFee */
export interface MsgSetDenomPairTakerFee {
  sender: string;
  denomPairTakerFee: DenomPairTakerFee[];
}

export interface MsgSetDenomPairTakerFeeResponse {
  success: boolean;
}

export interface DenomPairTakerFee {
  /**
   * denom0 and denom1 get automatically lexigographically sorted
   * when being stored, so the order of input here does not matter.
   */
  denom0: string;
  denom1: string;
  takerFee: string;
}

function createBaseMsgSwapExactAmountIn(): MsgSwapExactAmountIn {
  return { sender: "", routes: [], tokenIn: undefined, tokenOutMinAmount: "" };
}

export const MsgSwapExactAmountIn = {
  encode(message: MsgSwapExactAmountIn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.routes) {
      SwapAmountInRoute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenOutMinAmount !== "") {
      writer.uint32(34).string(message.tokenOutMinAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSwapExactAmountIn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactAmountIn();
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

          message.routes.push(SwapAmountInRoute.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tokenIn = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.tokenOutMinAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSwapExactAmountIn {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      routes: globalThis.Array.isArray(object?.routes)
        ? object.routes.map((e: any) => SwapAmountInRoute.fromJSON(e))
        : [],
      tokenIn: isSet(object.tokenIn) ? Coin.fromJSON(object.tokenIn) : undefined,
      tokenOutMinAmount: isSet(object.tokenOutMinAmount) ? globalThis.String(object.tokenOutMinAmount) : "",
    };
  },

  toJSON(message: MsgSwapExactAmountIn): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.routes?.length) {
      obj.routes = message.routes.map((e) => SwapAmountInRoute.toJSON(e));
    }
    if (message.tokenIn !== undefined) {
      obj.tokenIn = Coin.toJSON(message.tokenIn);
    }
    if (message.tokenOutMinAmount !== "") {
      obj.tokenOutMinAmount = message.tokenOutMinAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSwapExactAmountIn>, I>>(base?: I): MsgSwapExactAmountIn {
    return MsgSwapExactAmountIn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSwapExactAmountIn>, I>>(object: I): MsgSwapExactAmountIn {
    const message = createBaseMsgSwapExactAmountIn();
    message.sender = object.sender ?? "";
    message.routes = object.routes?.map((e) => SwapAmountInRoute.fromPartial(e)) || [];
    message.tokenIn = (object.tokenIn !== undefined && object.tokenIn !== null)
      ? Coin.fromPartial(object.tokenIn)
      : undefined;
    message.tokenOutMinAmount = object.tokenOutMinAmount ?? "";
    return message;
  },
};

function createBaseMsgSwapExactAmountInResponse(): MsgSwapExactAmountInResponse {
  return { tokenOutAmount: "" };
}

export const MsgSwapExactAmountInResponse = {
  encode(message: MsgSwapExactAmountInResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSwapExactAmountInResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactAmountInResponse();
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

  fromJSON(object: any): MsgSwapExactAmountInResponse {
    return { tokenOutAmount: isSet(object.tokenOutAmount) ? globalThis.String(object.tokenOutAmount) : "" };
  },

  toJSON(message: MsgSwapExactAmountInResponse): unknown {
    const obj: any = {};
    if (message.tokenOutAmount !== "") {
      obj.tokenOutAmount = message.tokenOutAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSwapExactAmountInResponse>, I>>(base?: I): MsgSwapExactAmountInResponse {
    return MsgSwapExactAmountInResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSwapExactAmountInResponse>, I>>(object: I): MsgSwapExactAmountInResponse {
    const message = createBaseMsgSwapExactAmountInResponse();
    message.tokenOutAmount = object.tokenOutAmount ?? "";
    return message;
  },
};

function createBaseMsgSplitRouteSwapExactAmountIn(): MsgSplitRouteSwapExactAmountIn {
  return { sender: "", routes: [], tokenInDenom: "", tokenOutMinAmount: "" };
}

export const MsgSplitRouteSwapExactAmountIn = {
  encode(message: MsgSplitRouteSwapExactAmountIn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.routes) {
      SwapAmountInSplitRoute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(26).string(message.tokenInDenom);
    }
    if (message.tokenOutMinAmount !== "") {
      writer.uint32(34).string(message.tokenOutMinAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSplitRouteSwapExactAmountIn {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSplitRouteSwapExactAmountIn();
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

          message.routes.push(SwapAmountInSplitRoute.decode(reader, reader.uint32()));
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

          message.tokenOutMinAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSplitRouteSwapExactAmountIn {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      routes: globalThis.Array.isArray(object?.routes)
        ? object.routes.map((e: any) => SwapAmountInSplitRoute.fromJSON(e))
        : [],
      tokenInDenom: isSet(object.tokenInDenom) ? globalThis.String(object.tokenInDenom) : "",
      tokenOutMinAmount: isSet(object.tokenOutMinAmount) ? globalThis.String(object.tokenOutMinAmount) : "",
    };
  },

  toJSON(message: MsgSplitRouteSwapExactAmountIn): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.routes?.length) {
      obj.routes = message.routes.map((e) => SwapAmountInSplitRoute.toJSON(e));
    }
    if (message.tokenInDenom !== "") {
      obj.tokenInDenom = message.tokenInDenom;
    }
    if (message.tokenOutMinAmount !== "") {
      obj.tokenOutMinAmount = message.tokenOutMinAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSplitRouteSwapExactAmountIn>, I>>(base?: I): MsgSplitRouteSwapExactAmountIn {
    return MsgSplitRouteSwapExactAmountIn.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSplitRouteSwapExactAmountIn>, I>>(
    object: I,
  ): MsgSplitRouteSwapExactAmountIn {
    const message = createBaseMsgSplitRouteSwapExactAmountIn();
    message.sender = object.sender ?? "";
    message.routes = object.routes?.map((e) => SwapAmountInSplitRoute.fromPartial(e)) || [];
    message.tokenInDenom = object.tokenInDenom ?? "";
    message.tokenOutMinAmount = object.tokenOutMinAmount ?? "";
    return message;
  },
};

function createBaseMsgSplitRouteSwapExactAmountInResponse(): MsgSplitRouteSwapExactAmountInResponse {
  return { tokenOutAmount: "" };
}

export const MsgSplitRouteSwapExactAmountInResponse = {
  encode(message: MsgSplitRouteSwapExactAmountInResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSplitRouteSwapExactAmountInResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSplitRouteSwapExactAmountInResponse();
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

  fromJSON(object: any): MsgSplitRouteSwapExactAmountInResponse {
    return { tokenOutAmount: isSet(object.tokenOutAmount) ? globalThis.String(object.tokenOutAmount) : "" };
  },

  toJSON(message: MsgSplitRouteSwapExactAmountInResponse): unknown {
    const obj: any = {};
    if (message.tokenOutAmount !== "") {
      obj.tokenOutAmount = message.tokenOutAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSplitRouteSwapExactAmountInResponse>, I>>(
    base?: I,
  ): MsgSplitRouteSwapExactAmountInResponse {
    return MsgSplitRouteSwapExactAmountInResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSplitRouteSwapExactAmountInResponse>, I>>(
    object: I,
  ): MsgSplitRouteSwapExactAmountInResponse {
    const message = createBaseMsgSplitRouteSwapExactAmountInResponse();
    message.tokenOutAmount = object.tokenOutAmount ?? "";
    return message;
  },
};

function createBaseMsgSwapExactAmountOut(): MsgSwapExactAmountOut {
  return { sender: "", routes: [], tokenInMaxAmount: "", tokenOut: undefined };
}

export const MsgSwapExactAmountOut = {
  encode(message: MsgSwapExactAmountOut, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.routes) {
      SwapAmountOutRoute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenInMaxAmount !== "") {
      writer.uint32(26).string(message.tokenInMaxAmount);
    }
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSwapExactAmountOut {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactAmountOut();
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

          message.routes.push(SwapAmountOutRoute.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tokenInMaxAmount = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): MsgSwapExactAmountOut {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      routes: globalThis.Array.isArray(object?.routes)
        ? object.routes.map((e: any) => SwapAmountOutRoute.fromJSON(e))
        : [],
      tokenInMaxAmount: isSet(object.tokenInMaxAmount) ? globalThis.String(object.tokenInMaxAmount) : "",
      tokenOut: isSet(object.tokenOut) ? Coin.fromJSON(object.tokenOut) : undefined,
    };
  },

  toJSON(message: MsgSwapExactAmountOut): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.routes?.length) {
      obj.routes = message.routes.map((e) => SwapAmountOutRoute.toJSON(e));
    }
    if (message.tokenInMaxAmount !== "") {
      obj.tokenInMaxAmount = message.tokenInMaxAmount;
    }
    if (message.tokenOut !== undefined) {
      obj.tokenOut = Coin.toJSON(message.tokenOut);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSwapExactAmountOut>, I>>(base?: I): MsgSwapExactAmountOut {
    return MsgSwapExactAmountOut.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSwapExactAmountOut>, I>>(object: I): MsgSwapExactAmountOut {
    const message = createBaseMsgSwapExactAmountOut();
    message.sender = object.sender ?? "";
    message.routes = object.routes?.map((e) => SwapAmountOutRoute.fromPartial(e)) || [];
    message.tokenInMaxAmount = object.tokenInMaxAmount ?? "";
    message.tokenOut = (object.tokenOut !== undefined && object.tokenOut !== null)
      ? Coin.fromPartial(object.tokenOut)
      : undefined;
    return message;
  },
};

function createBaseMsgSwapExactAmountOutResponse(): MsgSwapExactAmountOutResponse {
  return { tokenInAmount: "" };
}

export const MsgSwapExactAmountOutResponse = {
  encode(message: MsgSwapExactAmountOutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSwapExactAmountOutResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactAmountOutResponse();
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

  fromJSON(object: any): MsgSwapExactAmountOutResponse {
    return { tokenInAmount: isSet(object.tokenInAmount) ? globalThis.String(object.tokenInAmount) : "" };
  },

  toJSON(message: MsgSwapExactAmountOutResponse): unknown {
    const obj: any = {};
    if (message.tokenInAmount !== "") {
      obj.tokenInAmount = message.tokenInAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSwapExactAmountOutResponse>, I>>(base?: I): MsgSwapExactAmountOutResponse {
    return MsgSwapExactAmountOutResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSwapExactAmountOutResponse>, I>>(
    object: I,
  ): MsgSwapExactAmountOutResponse {
    const message = createBaseMsgSwapExactAmountOutResponse();
    message.tokenInAmount = object.tokenInAmount ?? "";
    return message;
  },
};

function createBaseMsgSplitRouteSwapExactAmountOut(): MsgSplitRouteSwapExactAmountOut {
  return { sender: "", routes: [], tokenOutDenom: "", tokenInMaxAmount: "" };
}

export const MsgSplitRouteSwapExactAmountOut = {
  encode(message: MsgSplitRouteSwapExactAmountOut, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.routes) {
      SwapAmountOutSplitRoute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenOutDenom !== "") {
      writer.uint32(26).string(message.tokenOutDenom);
    }
    if (message.tokenInMaxAmount !== "") {
      writer.uint32(34).string(message.tokenInMaxAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSplitRouteSwapExactAmountOut {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSplitRouteSwapExactAmountOut();
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

          message.routes.push(SwapAmountOutSplitRoute.decode(reader, reader.uint32()));
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

          message.tokenInMaxAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSplitRouteSwapExactAmountOut {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      routes: globalThis.Array.isArray(object?.routes)
        ? object.routes.map((e: any) => SwapAmountOutSplitRoute.fromJSON(e))
        : [],
      tokenOutDenom: isSet(object.tokenOutDenom) ? globalThis.String(object.tokenOutDenom) : "",
      tokenInMaxAmount: isSet(object.tokenInMaxAmount) ? globalThis.String(object.tokenInMaxAmount) : "",
    };
  },

  toJSON(message: MsgSplitRouteSwapExactAmountOut): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.routes?.length) {
      obj.routes = message.routes.map((e) => SwapAmountOutSplitRoute.toJSON(e));
    }
    if (message.tokenOutDenom !== "") {
      obj.tokenOutDenom = message.tokenOutDenom;
    }
    if (message.tokenInMaxAmount !== "") {
      obj.tokenInMaxAmount = message.tokenInMaxAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSplitRouteSwapExactAmountOut>, I>>(base?: I): MsgSplitRouteSwapExactAmountOut {
    return MsgSplitRouteSwapExactAmountOut.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSplitRouteSwapExactAmountOut>, I>>(
    object: I,
  ): MsgSplitRouteSwapExactAmountOut {
    const message = createBaseMsgSplitRouteSwapExactAmountOut();
    message.sender = object.sender ?? "";
    message.routes = object.routes?.map((e) => SwapAmountOutSplitRoute.fromPartial(e)) || [];
    message.tokenOutDenom = object.tokenOutDenom ?? "";
    message.tokenInMaxAmount = object.tokenInMaxAmount ?? "";
    return message;
  },
};

function createBaseMsgSplitRouteSwapExactAmountOutResponse(): MsgSplitRouteSwapExactAmountOutResponse {
  return { tokenInAmount: "" };
}

export const MsgSplitRouteSwapExactAmountOutResponse = {
  encode(message: MsgSplitRouteSwapExactAmountOutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSplitRouteSwapExactAmountOutResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSplitRouteSwapExactAmountOutResponse();
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

  fromJSON(object: any): MsgSplitRouteSwapExactAmountOutResponse {
    return { tokenInAmount: isSet(object.tokenInAmount) ? globalThis.String(object.tokenInAmount) : "" };
  },

  toJSON(message: MsgSplitRouteSwapExactAmountOutResponse): unknown {
    const obj: any = {};
    if (message.tokenInAmount !== "") {
      obj.tokenInAmount = message.tokenInAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSplitRouteSwapExactAmountOutResponse>, I>>(
    base?: I,
  ): MsgSplitRouteSwapExactAmountOutResponse {
    return MsgSplitRouteSwapExactAmountOutResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSplitRouteSwapExactAmountOutResponse>, I>>(
    object: I,
  ): MsgSplitRouteSwapExactAmountOutResponse {
    const message = createBaseMsgSplitRouteSwapExactAmountOutResponse();
    message.tokenInAmount = object.tokenInAmount ?? "";
    return message;
  },
};

function createBaseMsgSetDenomPairTakerFee(): MsgSetDenomPairTakerFee {
  return { sender: "", denomPairTakerFee: [] };
}

export const MsgSetDenomPairTakerFee = {
  encode(message: MsgSetDenomPairTakerFee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.denomPairTakerFee) {
      DenomPairTakerFee.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDenomPairTakerFee {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDenomPairTakerFee();
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

          message.denomPairTakerFee.push(DenomPairTakerFee.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetDenomPairTakerFee {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      denomPairTakerFee: globalThis.Array.isArray(object?.denomPairTakerFee)
        ? object.denomPairTakerFee.map((e: any) => DenomPairTakerFee.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgSetDenomPairTakerFee): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.denomPairTakerFee?.length) {
      obj.denomPairTakerFee = message.denomPairTakerFee.map((e) => DenomPairTakerFee.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetDenomPairTakerFee>, I>>(base?: I): MsgSetDenomPairTakerFee {
    return MsgSetDenomPairTakerFee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetDenomPairTakerFee>, I>>(object: I): MsgSetDenomPairTakerFee {
    const message = createBaseMsgSetDenomPairTakerFee();
    message.sender = object.sender ?? "";
    message.denomPairTakerFee = object.denomPairTakerFee?.map((e) => DenomPairTakerFee.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgSetDenomPairTakerFeeResponse(): MsgSetDenomPairTakerFeeResponse {
  return { success: false };
}

export const MsgSetDenomPairTakerFeeResponse = {
  encode(message: MsgSetDenomPairTakerFeeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDenomPairTakerFeeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDenomPairTakerFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetDenomPairTakerFeeResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: MsgSetDenomPairTakerFeeResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetDenomPairTakerFeeResponse>, I>>(base?: I): MsgSetDenomPairTakerFeeResponse {
    return MsgSetDenomPairTakerFeeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetDenomPairTakerFeeResponse>, I>>(
    object: I,
  ): MsgSetDenomPairTakerFeeResponse {
    const message = createBaseMsgSetDenomPairTakerFeeResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseDenomPairTakerFee(): DenomPairTakerFee {
  return { denom0: "", denom1: "", takerFee: "" };
}

export const DenomPairTakerFee = {
  encode(message: DenomPairTakerFee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom0 !== "") {
      writer.uint32(10).string(message.denom0);
    }
    if (message.denom1 !== "") {
      writer.uint32(18).string(message.denom1);
    }
    if (message.takerFee !== "") {
      writer.uint32(26).string(message.takerFee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DenomPairTakerFee {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenomPairTakerFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom0 = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denom1 = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.takerFee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DenomPairTakerFee {
    return {
      denom0: isSet(object.denom0) ? globalThis.String(object.denom0) : "",
      denom1: isSet(object.denom1) ? globalThis.String(object.denom1) : "",
      takerFee: isSet(object.takerFee) ? globalThis.String(object.takerFee) : "",
    };
  },

  toJSON(message: DenomPairTakerFee): unknown {
    const obj: any = {};
    if (message.denom0 !== "") {
      obj.denom0 = message.denom0;
    }
    if (message.denom1 !== "") {
      obj.denom1 = message.denom1;
    }
    if (message.takerFee !== "") {
      obj.takerFee = message.takerFee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DenomPairTakerFee>, I>>(base?: I): DenomPairTakerFee {
    return DenomPairTakerFee.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DenomPairTakerFee>, I>>(object: I): DenomPairTakerFee {
    const message = createBaseDenomPairTakerFee();
    message.denom0 = object.denom0 ?? "";
    message.denom1 = object.denom1 ?? "";
    message.takerFee = object.takerFee ?? "";
    return message;
  },
};

export interface Msg {
  SwapExactAmountIn(request: MsgSwapExactAmountIn): Promise<MsgSwapExactAmountInResponse>;
  SwapExactAmountOut(request: MsgSwapExactAmountOut): Promise<MsgSwapExactAmountOutResponse>;
  SplitRouteSwapExactAmountIn(request: MsgSplitRouteSwapExactAmountIn): Promise<MsgSplitRouteSwapExactAmountInResponse>;
  SplitRouteSwapExactAmountOut(
    request: MsgSplitRouteSwapExactAmountOut,
  ): Promise<MsgSplitRouteSwapExactAmountOutResponse>;
  SetDenomPairTakerFee(request: MsgSetDenomPairTakerFee): Promise<MsgSetDenomPairTakerFeeResponse>;
}

export const MsgServiceName = "osmosis.poolmanager.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.SwapExactAmountIn = this.SwapExactAmountIn.bind(this);
    this.SwapExactAmountOut = this.SwapExactAmountOut.bind(this);
    this.SplitRouteSwapExactAmountIn = this.SplitRouteSwapExactAmountIn.bind(this);
    this.SplitRouteSwapExactAmountOut = this.SplitRouteSwapExactAmountOut.bind(this);
    this.SetDenomPairTakerFee = this.SetDenomPairTakerFee.bind(this);
  }
  SwapExactAmountIn(request: MsgSwapExactAmountIn): Promise<MsgSwapExactAmountInResponse> {
    const data = MsgSwapExactAmountIn.encode(request).finish();
    const promise = this.rpc.request(this.service, "SwapExactAmountIn", data);
    return promise.then((data) => MsgSwapExactAmountInResponse.decode(_m0.Reader.create(data)));
  }

  SwapExactAmountOut(request: MsgSwapExactAmountOut): Promise<MsgSwapExactAmountOutResponse> {
    const data = MsgSwapExactAmountOut.encode(request).finish();
    const promise = this.rpc.request(this.service, "SwapExactAmountOut", data);
    return promise.then((data) => MsgSwapExactAmountOutResponse.decode(_m0.Reader.create(data)));
  }

  SplitRouteSwapExactAmountIn(
    request: MsgSplitRouteSwapExactAmountIn,
  ): Promise<MsgSplitRouteSwapExactAmountInResponse> {
    const data = MsgSplitRouteSwapExactAmountIn.encode(request).finish();
    const promise = this.rpc.request(this.service, "SplitRouteSwapExactAmountIn", data);
    return promise.then((data) => MsgSplitRouteSwapExactAmountInResponse.decode(_m0.Reader.create(data)));
  }

  SplitRouteSwapExactAmountOut(
    request: MsgSplitRouteSwapExactAmountOut,
  ): Promise<MsgSplitRouteSwapExactAmountOutResponse> {
    const data = MsgSplitRouteSwapExactAmountOut.encode(request).finish();
    const promise = this.rpc.request(this.service, "SplitRouteSwapExactAmountOut", data);
    return promise.then((data) => MsgSplitRouteSwapExactAmountOutResponse.decode(_m0.Reader.create(data)));
  }

  SetDenomPairTakerFee(request: MsgSetDenomPairTakerFee): Promise<MsgSetDenomPairTakerFeeResponse> {
    const data = MsgSetDenomPairTakerFee.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetDenomPairTakerFee", data);
    return promise.then((data) => MsgSetDenomPairTakerFeeResponse.decode(_m0.Reader.create(data)));
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
