/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "osmosis.concentratedliquidity.v1beta1";

/** ===================== MsgCreatePosition */
export interface MsgCreatePosition {
  poolId: Long;
  sender: string;
  lowerTick: Long;
  upperTick: Long;
  /**
   * tokens_provided is the amount of tokens provided for the position.
   * It must at a minimum be of length 1 (for a single sided position)
   * and at a maximum be of length 2 (for a position that straddles the current
   * tick).
   */
  tokensProvided: Coin[];
  tokenMinAmount0: string;
  tokenMinAmount1: string;
}

export interface MsgCreatePositionResponse {
  positionId: Long;
  amount0: string;
  amount1: string;
  liquidityCreated: string;
  /**
   * the lower and upper tick are in the response because there are
   * instances in which multiple ticks represent the same price, so
   * we may move their provided tick to the canonical tick that represents
   * the same price.
   */
  lowerTick: Long;
  upperTick: Long;
}

/** ===================== MsgAddToPosition */
export interface MsgAddToPosition {
  positionId: Long;
  sender: string;
  /** amount0 represents the amount of token0 willing to put in. */
  amount0: string;
  /** amount1 represents the amount of token1 willing to put in. */
  amount1: string;
  /**
   * token_min_amount0 represents the minimum amount of token0 desired from the
   * new position being created. Note that this field indicates the min amount0
   * corresponding to the liquidity that is being added, not the total
   * liquidity of the position.
   */
  tokenMinAmount0: string;
  /**
   * token_min_amount1 represents the minimum amount of token1 desired from the
   * new position being created. Note that this field indicates the min amount1
   * corresponding to the liquidity that is being added, not the total
   * liquidity of the position.
   */
  tokenMinAmount1: string;
}

export interface MsgAddToPositionResponse {
  positionId: Long;
  amount0: string;
  amount1: string;
}

/** ===================== MsgWithdrawPosition */
export interface MsgWithdrawPosition {
  positionId: Long;
  sender: string;
  liquidityAmount: string;
}

export interface MsgWithdrawPositionResponse {
  amount0: string;
  amount1: string;
}

/** ===================== MsgCollectSpreadRewards */
export interface MsgCollectSpreadRewards {
  positionIds: Long[];
  sender: string;
}

export interface MsgCollectSpreadRewardsResponse {
  collectedSpreadRewards: Coin[];
}

/** ===================== MsgCollectIncentives */
export interface MsgCollectIncentives {
  positionIds: Long[];
  sender: string;
}

export interface MsgCollectIncentivesResponse {
  collectedIncentives: Coin[];
  forfeitedIncentives: Coin[];
}

/** ===================== MsgFungifyChargedPositions */
export interface MsgFungifyChargedPositions {
  positionIds: Long[];
  sender: string;
}

export interface MsgFungifyChargedPositionsResponse {
  newPositionId: Long;
}

/** ===================== MsgTransferPositions */
export interface MsgTransferPositions {
  positionIds: Long[];
  sender: string;
  newOwner: string;
}

export interface MsgTransferPositionsResponse {
}

function createBaseMsgCreatePosition(): MsgCreatePosition {
  return {
    poolId: Long.UZERO,
    sender: "",
    lowerTick: Long.ZERO,
    upperTick: Long.ZERO,
    tokensProvided: [],
    tokenMinAmount0: "",
    tokenMinAmount1: "",
  };
}

export const MsgCreatePosition = {
  encode(message: MsgCreatePosition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (!message.lowerTick.isZero()) {
      writer.uint32(24).int64(message.lowerTick);
    }
    if (!message.upperTick.isZero()) {
      writer.uint32(32).int64(message.upperTick);
    }
    for (const v of message.tokensProvided) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.tokenMinAmount0 !== "") {
      writer.uint32(50).string(message.tokenMinAmount0);
    }
    if (message.tokenMinAmount1 !== "") {
      writer.uint32(58).string(message.tokenMinAmount1);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePosition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.lowerTick = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.upperTick = reader.int64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.tokensProvided.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.tokenMinAmount0 = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.tokenMinAmount1 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePosition {
    return {
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      lowerTick: isSet(object.lowerTick) ? Long.fromValue(object.lowerTick) : Long.ZERO,
      upperTick: isSet(object.upperTick) ? Long.fromValue(object.upperTick) : Long.ZERO,
      tokensProvided: globalThis.Array.isArray(object?.tokensProvided)
        ? object.tokensProvided.map((e: any) => Coin.fromJSON(e))
        : [],
      tokenMinAmount0: isSet(object.tokenMinAmount0) ? globalThis.String(object.tokenMinAmount0) : "",
      tokenMinAmount1: isSet(object.tokenMinAmount1) ? globalThis.String(object.tokenMinAmount1) : "",
    };
  },

  toJSON(message: MsgCreatePosition): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.lowerTick.isZero()) {
      obj.lowerTick = (message.lowerTick || Long.ZERO).toString();
    }
    if (!message.upperTick.isZero()) {
      obj.upperTick = (message.upperTick || Long.ZERO).toString();
    }
    if (message.tokensProvided?.length) {
      obj.tokensProvided = message.tokensProvided.map((e) => Coin.toJSON(e));
    }
    if (message.tokenMinAmount0 !== "") {
      obj.tokenMinAmount0 = message.tokenMinAmount0;
    }
    if (message.tokenMinAmount1 !== "") {
      obj.tokenMinAmount1 = message.tokenMinAmount1;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreatePosition>, I>>(base?: I): MsgCreatePosition {
    return MsgCreatePosition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreatePosition>, I>>(object: I): MsgCreatePosition {
    const message = createBaseMsgCreatePosition();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    message.sender = object.sender ?? "";
    message.lowerTick = (object.lowerTick !== undefined && object.lowerTick !== null)
      ? Long.fromValue(object.lowerTick)
      : Long.ZERO;
    message.upperTick = (object.upperTick !== undefined && object.upperTick !== null)
      ? Long.fromValue(object.upperTick)
      : Long.ZERO;
    message.tokensProvided = object.tokensProvided?.map((e) => Coin.fromPartial(e)) || [];
    message.tokenMinAmount0 = object.tokenMinAmount0 ?? "";
    message.tokenMinAmount1 = object.tokenMinAmount1 ?? "";
    return message;
  },
};

function createBaseMsgCreatePositionResponse(): MsgCreatePositionResponse {
  return {
    positionId: Long.UZERO,
    amount0: "",
    amount1: "",
    liquidityCreated: "",
    lowerTick: Long.ZERO,
    upperTick: Long.ZERO,
  };
}

export const MsgCreatePositionResponse = {
  encode(message: MsgCreatePositionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    if (message.amount0 !== "") {
      writer.uint32(18).string(message.amount0);
    }
    if (message.amount1 !== "") {
      writer.uint32(26).string(message.amount1);
    }
    if (message.liquidityCreated !== "") {
      writer.uint32(42).string(message.liquidityCreated);
    }
    if (!message.lowerTick.isZero()) {
      writer.uint32(48).int64(message.lowerTick);
    }
    if (!message.upperTick.isZero()) {
      writer.uint32(56).int64(message.upperTick);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePositionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePositionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.positionId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount0 = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount1 = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.liquidityCreated = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.lowerTick = reader.int64() as Long;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.upperTick = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePositionResponse {
    return {
      positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO,
      amount0: isSet(object.amount0) ? globalThis.String(object.amount0) : "",
      amount1: isSet(object.amount1) ? globalThis.String(object.amount1) : "",
      liquidityCreated: isSet(object.liquidityCreated) ? globalThis.String(object.liquidityCreated) : "",
      lowerTick: isSet(object.lowerTick) ? Long.fromValue(object.lowerTick) : Long.ZERO,
      upperTick: isSet(object.upperTick) ? Long.fromValue(object.upperTick) : Long.ZERO,
    };
  },

  toJSON(message: MsgCreatePositionResponse): unknown {
    const obj: any = {};
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    if (message.amount0 !== "") {
      obj.amount0 = message.amount0;
    }
    if (message.amount1 !== "") {
      obj.amount1 = message.amount1;
    }
    if (message.liquidityCreated !== "") {
      obj.liquidityCreated = message.liquidityCreated;
    }
    if (!message.lowerTick.isZero()) {
      obj.lowerTick = (message.lowerTick || Long.ZERO).toString();
    }
    if (!message.upperTick.isZero()) {
      obj.upperTick = (message.upperTick || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreatePositionResponse>, I>>(base?: I): MsgCreatePositionResponse {
    return MsgCreatePositionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreatePositionResponse>, I>>(object: I): MsgCreatePositionResponse {
    const message = createBaseMsgCreatePositionResponse();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    message.amount0 = object.amount0 ?? "";
    message.amount1 = object.amount1 ?? "";
    message.liquidityCreated = object.liquidityCreated ?? "";
    message.lowerTick = (object.lowerTick !== undefined && object.lowerTick !== null)
      ? Long.fromValue(object.lowerTick)
      : Long.ZERO;
    message.upperTick = (object.upperTick !== undefined && object.upperTick !== null)
      ? Long.fromValue(object.upperTick)
      : Long.ZERO;
    return message;
  },
};

function createBaseMsgAddToPosition(): MsgAddToPosition {
  return { positionId: Long.UZERO, sender: "", amount0: "", amount1: "", tokenMinAmount0: "", tokenMinAmount1: "" };
}

export const MsgAddToPosition = {
  encode(message: MsgAddToPosition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.amount0 !== "") {
      writer.uint32(26).string(message.amount0);
    }
    if (message.amount1 !== "") {
      writer.uint32(34).string(message.amount1);
    }
    if (message.tokenMinAmount0 !== "") {
      writer.uint32(42).string(message.tokenMinAmount0);
    }
    if (message.tokenMinAmount1 !== "") {
      writer.uint32(50).string(message.tokenMinAmount1);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddToPosition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddToPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.positionId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount0 = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.amount1 = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.tokenMinAmount0 = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.tokenMinAmount1 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddToPosition {
    return {
      positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO,
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      amount0: isSet(object.amount0) ? globalThis.String(object.amount0) : "",
      amount1: isSet(object.amount1) ? globalThis.String(object.amount1) : "",
      tokenMinAmount0: isSet(object.tokenMinAmount0) ? globalThis.String(object.tokenMinAmount0) : "",
      tokenMinAmount1: isSet(object.tokenMinAmount1) ? globalThis.String(object.tokenMinAmount1) : "",
    };
  },

  toJSON(message: MsgAddToPosition): unknown {
    const obj: any = {};
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.amount0 !== "") {
      obj.amount0 = message.amount0;
    }
    if (message.amount1 !== "") {
      obj.amount1 = message.amount1;
    }
    if (message.tokenMinAmount0 !== "") {
      obj.tokenMinAmount0 = message.tokenMinAmount0;
    }
    if (message.tokenMinAmount1 !== "") {
      obj.tokenMinAmount1 = message.tokenMinAmount1;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddToPosition>, I>>(base?: I): MsgAddToPosition {
    return MsgAddToPosition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddToPosition>, I>>(object: I): MsgAddToPosition {
    const message = createBaseMsgAddToPosition();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    message.sender = object.sender ?? "";
    message.amount0 = object.amount0 ?? "";
    message.amount1 = object.amount1 ?? "";
    message.tokenMinAmount0 = object.tokenMinAmount0 ?? "";
    message.tokenMinAmount1 = object.tokenMinAmount1 ?? "";
    return message;
  },
};

function createBaseMsgAddToPositionResponse(): MsgAddToPositionResponse {
  return { positionId: Long.UZERO, amount0: "", amount1: "" };
}

export const MsgAddToPositionResponse = {
  encode(message: MsgAddToPositionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    if (message.amount0 !== "") {
      writer.uint32(18).string(message.amount0);
    }
    if (message.amount1 !== "") {
      writer.uint32(26).string(message.amount1);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddToPositionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddToPositionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.positionId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount0 = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount1 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddToPositionResponse {
    return {
      positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO,
      amount0: isSet(object.amount0) ? globalThis.String(object.amount0) : "",
      amount1: isSet(object.amount1) ? globalThis.String(object.amount1) : "",
    };
  },

  toJSON(message: MsgAddToPositionResponse): unknown {
    const obj: any = {};
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    if (message.amount0 !== "") {
      obj.amount0 = message.amount0;
    }
    if (message.amount1 !== "") {
      obj.amount1 = message.amount1;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddToPositionResponse>, I>>(base?: I): MsgAddToPositionResponse {
    return MsgAddToPositionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddToPositionResponse>, I>>(object: I): MsgAddToPositionResponse {
    const message = createBaseMsgAddToPositionResponse();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    message.amount0 = object.amount0 ?? "";
    message.amount1 = object.amount1 ?? "";
    return message;
  },
};

function createBaseMsgWithdrawPosition(): MsgWithdrawPosition {
  return { positionId: Long.UZERO, sender: "", liquidityAmount: "" };
}

export const MsgWithdrawPosition = {
  encode(message: MsgWithdrawPosition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.liquidityAmount !== "") {
      writer.uint32(26).string(message.liquidityAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawPosition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.positionId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.liquidityAmount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawPosition {
    return {
      positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO,
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      liquidityAmount: isSet(object.liquidityAmount) ? globalThis.String(object.liquidityAmount) : "",
    };
  },

  toJSON(message: MsgWithdrawPosition): unknown {
    const obj: any = {};
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.liquidityAmount !== "") {
      obj.liquidityAmount = message.liquidityAmount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgWithdrawPosition>, I>>(base?: I): MsgWithdrawPosition {
    return MsgWithdrawPosition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgWithdrawPosition>, I>>(object: I): MsgWithdrawPosition {
    const message = createBaseMsgWithdrawPosition();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    message.sender = object.sender ?? "";
    message.liquidityAmount = object.liquidityAmount ?? "";
    return message;
  },
};

function createBaseMsgWithdrawPositionResponse(): MsgWithdrawPositionResponse {
  return { amount0: "", amount1: "" };
}

export const MsgWithdrawPositionResponse = {
  encode(message: MsgWithdrawPositionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount0 !== "") {
      writer.uint32(10).string(message.amount0);
    }
    if (message.amount1 !== "") {
      writer.uint32(18).string(message.amount1);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawPositionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawPositionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount0 = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.amount1 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawPositionResponse {
    return {
      amount0: isSet(object.amount0) ? globalThis.String(object.amount0) : "",
      amount1: isSet(object.amount1) ? globalThis.String(object.amount1) : "",
    };
  },

  toJSON(message: MsgWithdrawPositionResponse): unknown {
    const obj: any = {};
    if (message.amount0 !== "") {
      obj.amount0 = message.amount0;
    }
    if (message.amount1 !== "") {
      obj.amount1 = message.amount1;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgWithdrawPositionResponse>, I>>(base?: I): MsgWithdrawPositionResponse {
    return MsgWithdrawPositionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgWithdrawPositionResponse>, I>>(object: I): MsgWithdrawPositionResponse {
    const message = createBaseMsgWithdrawPositionResponse();
    message.amount0 = object.amount0 ?? "";
    message.amount1 = object.amount1 ?? "";
    return message;
  },
};

function createBaseMsgCollectSpreadRewards(): MsgCollectSpreadRewards {
  return { positionIds: [], sender: "" };
}

export const MsgCollectSpreadRewards = {
  encode(message: MsgCollectSpreadRewards, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.positionIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCollectSpreadRewards {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCollectSpreadRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.positionIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.positionIds.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sender = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCollectSpreadRewards {
    return {
      positionIds: globalThis.Array.isArray(object?.positionIds)
        ? object.positionIds.map((e: any) => Long.fromValue(e))
        : [],
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
    };
  },

  toJSON(message: MsgCollectSpreadRewards): unknown {
    const obj: any = {};
    if (message.positionIds?.length) {
      obj.positionIds = message.positionIds.map((e) => (e || Long.UZERO).toString());
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCollectSpreadRewards>, I>>(base?: I): MsgCollectSpreadRewards {
    return MsgCollectSpreadRewards.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCollectSpreadRewards>, I>>(object: I): MsgCollectSpreadRewards {
    const message = createBaseMsgCollectSpreadRewards();
    message.positionIds = object.positionIds?.map((e) => Long.fromValue(e)) || [];
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseMsgCollectSpreadRewardsResponse(): MsgCollectSpreadRewardsResponse {
  return { collectedSpreadRewards: [] };
}

export const MsgCollectSpreadRewardsResponse = {
  encode(message: MsgCollectSpreadRewardsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.collectedSpreadRewards) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCollectSpreadRewardsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCollectSpreadRewardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.collectedSpreadRewards.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCollectSpreadRewardsResponse {
    return {
      collectedSpreadRewards: globalThis.Array.isArray(object?.collectedSpreadRewards)
        ? object.collectedSpreadRewards.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgCollectSpreadRewardsResponse): unknown {
    const obj: any = {};
    if (message.collectedSpreadRewards?.length) {
      obj.collectedSpreadRewards = message.collectedSpreadRewards.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCollectSpreadRewardsResponse>, I>>(base?: I): MsgCollectSpreadRewardsResponse {
    return MsgCollectSpreadRewardsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCollectSpreadRewardsResponse>, I>>(
    object: I,
  ): MsgCollectSpreadRewardsResponse {
    const message = createBaseMsgCollectSpreadRewardsResponse();
    message.collectedSpreadRewards = object.collectedSpreadRewards?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgCollectIncentives(): MsgCollectIncentives {
  return { positionIds: [], sender: "" };
}

export const MsgCollectIncentives = {
  encode(message: MsgCollectIncentives, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.positionIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCollectIncentives {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCollectIncentives();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.positionIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.positionIds.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sender = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCollectIncentives {
    return {
      positionIds: globalThis.Array.isArray(object?.positionIds)
        ? object.positionIds.map((e: any) => Long.fromValue(e))
        : [],
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
    };
  },

  toJSON(message: MsgCollectIncentives): unknown {
    const obj: any = {};
    if (message.positionIds?.length) {
      obj.positionIds = message.positionIds.map((e) => (e || Long.UZERO).toString());
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCollectIncentives>, I>>(base?: I): MsgCollectIncentives {
    return MsgCollectIncentives.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCollectIncentives>, I>>(object: I): MsgCollectIncentives {
    const message = createBaseMsgCollectIncentives();
    message.positionIds = object.positionIds?.map((e) => Long.fromValue(e)) || [];
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseMsgCollectIncentivesResponse(): MsgCollectIncentivesResponse {
  return { collectedIncentives: [], forfeitedIncentives: [] };
}

export const MsgCollectIncentivesResponse = {
  encode(message: MsgCollectIncentivesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.collectedIncentives) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.forfeitedIncentives) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCollectIncentivesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCollectIncentivesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.collectedIncentives.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.forfeitedIncentives.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCollectIncentivesResponse {
    return {
      collectedIncentives: globalThis.Array.isArray(object?.collectedIncentives)
        ? object.collectedIncentives.map((e: any) => Coin.fromJSON(e))
        : [],
      forfeitedIncentives: globalThis.Array.isArray(object?.forfeitedIncentives)
        ? object.forfeitedIncentives.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgCollectIncentivesResponse): unknown {
    const obj: any = {};
    if (message.collectedIncentives?.length) {
      obj.collectedIncentives = message.collectedIncentives.map((e) => Coin.toJSON(e));
    }
    if (message.forfeitedIncentives?.length) {
      obj.forfeitedIncentives = message.forfeitedIncentives.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCollectIncentivesResponse>, I>>(base?: I): MsgCollectIncentivesResponse {
    return MsgCollectIncentivesResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCollectIncentivesResponse>, I>>(object: I): MsgCollectIncentivesResponse {
    const message = createBaseMsgCollectIncentivesResponse();
    message.collectedIncentives = object.collectedIncentives?.map((e) => Coin.fromPartial(e)) || [];
    message.forfeitedIncentives = object.forfeitedIncentives?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgFungifyChargedPositions(): MsgFungifyChargedPositions {
  return { positionIds: [], sender: "" };
}

export const MsgFungifyChargedPositions = {
  encode(message: MsgFungifyChargedPositions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.positionIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFungifyChargedPositions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFungifyChargedPositions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.positionIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.positionIds.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sender = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgFungifyChargedPositions {
    return {
      positionIds: globalThis.Array.isArray(object?.positionIds)
        ? object.positionIds.map((e: any) => Long.fromValue(e))
        : [],
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
    };
  },

  toJSON(message: MsgFungifyChargedPositions): unknown {
    const obj: any = {};
    if (message.positionIds?.length) {
      obj.positionIds = message.positionIds.map((e) => (e || Long.UZERO).toString());
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFungifyChargedPositions>, I>>(base?: I): MsgFungifyChargedPositions {
    return MsgFungifyChargedPositions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgFungifyChargedPositions>, I>>(object: I): MsgFungifyChargedPositions {
    const message = createBaseMsgFungifyChargedPositions();
    message.positionIds = object.positionIds?.map((e) => Long.fromValue(e)) || [];
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseMsgFungifyChargedPositionsResponse(): MsgFungifyChargedPositionsResponse {
  return { newPositionId: Long.UZERO };
}

export const MsgFungifyChargedPositionsResponse = {
  encode(message: MsgFungifyChargedPositionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.newPositionId.isZero()) {
      writer.uint32(8).uint64(message.newPositionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFungifyChargedPositionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFungifyChargedPositionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.newPositionId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgFungifyChargedPositionsResponse {
    return { newPositionId: isSet(object.newPositionId) ? Long.fromValue(object.newPositionId) : Long.UZERO };
  },

  toJSON(message: MsgFungifyChargedPositionsResponse): unknown {
    const obj: any = {};
    if (!message.newPositionId.isZero()) {
      obj.newPositionId = (message.newPositionId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgFungifyChargedPositionsResponse>, I>>(
    base?: I,
  ): MsgFungifyChargedPositionsResponse {
    return MsgFungifyChargedPositionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgFungifyChargedPositionsResponse>, I>>(
    object: I,
  ): MsgFungifyChargedPositionsResponse {
    const message = createBaseMsgFungifyChargedPositionsResponse();
    message.newPositionId = (object.newPositionId !== undefined && object.newPositionId !== null)
      ? Long.fromValue(object.newPositionId)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgTransferPositions(): MsgTransferPositions {
  return { positionIds: [], sender: "", newOwner: "" };
}

export const MsgTransferPositions = {
  encode(message: MsgTransferPositions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.positionIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.newOwner !== "") {
      writer.uint32(26).string(message.newOwner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferPositions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferPositions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.positionIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.positionIds.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newOwner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTransferPositions {
    return {
      positionIds: globalThis.Array.isArray(object?.positionIds)
        ? object.positionIds.map((e: any) => Long.fromValue(e))
        : [],
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      newOwner: isSet(object.newOwner) ? globalThis.String(object.newOwner) : "",
    };
  },

  toJSON(message: MsgTransferPositions): unknown {
    const obj: any = {};
    if (message.positionIds?.length) {
      obj.positionIds = message.positionIds.map((e) => (e || Long.UZERO).toString());
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.newOwner !== "") {
      obj.newOwner = message.newOwner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferPositions>, I>>(base?: I): MsgTransferPositions {
    return MsgTransferPositions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferPositions>, I>>(object: I): MsgTransferPositions {
    const message = createBaseMsgTransferPositions();
    message.positionIds = object.positionIds?.map((e) => Long.fromValue(e)) || [];
    message.sender = object.sender ?? "";
    message.newOwner = object.newOwner ?? "";
    return message;
  },
};

function createBaseMsgTransferPositionsResponse(): MsgTransferPositionsResponse {
  return {};
}

export const MsgTransferPositionsResponse = {
  encode(_: MsgTransferPositionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferPositionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferPositionsResponse();
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

  fromJSON(_: any): MsgTransferPositionsResponse {
    return {};
  },

  toJSON(_: MsgTransferPositionsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferPositionsResponse>, I>>(base?: I): MsgTransferPositionsResponse {
    return MsgTransferPositionsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferPositionsResponse>, I>>(_: I): MsgTransferPositionsResponse {
    const message = createBaseMsgTransferPositionsResponse();
    return message;
  },
};

export interface Msg {
  CreatePosition(request: MsgCreatePosition): Promise<MsgCreatePositionResponse>;
  WithdrawPosition(request: MsgWithdrawPosition): Promise<MsgWithdrawPositionResponse>;
  /**
   * AddToPosition attempts to add amount0 and amount1 to a position
   * with the given position id.
   * To maintain backwards-compatibility with future implementations of
   * charging, this function deletes the old position and creates a new one with
   * the resulting amount after addition.
   */
  AddToPosition(request: MsgAddToPosition): Promise<MsgAddToPositionResponse>;
  CollectSpreadRewards(request: MsgCollectSpreadRewards): Promise<MsgCollectSpreadRewardsResponse>;
  CollectIncentives(request: MsgCollectIncentives): Promise<MsgCollectIncentivesResponse>;
  /**
   * TransferPositions transfers ownership of a set of one or more positions
   * from a sender to a recipient.
   */
  TransferPositions(request: MsgTransferPositions): Promise<MsgTransferPositionsResponse>;
}

export const MsgServiceName = "osmosis.concentratedliquidity.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreatePosition = this.CreatePosition.bind(this);
    this.WithdrawPosition = this.WithdrawPosition.bind(this);
    this.AddToPosition = this.AddToPosition.bind(this);
    this.CollectSpreadRewards = this.CollectSpreadRewards.bind(this);
    this.CollectIncentives = this.CollectIncentives.bind(this);
    this.TransferPositions = this.TransferPositions.bind(this);
  }
  CreatePosition(request: MsgCreatePosition): Promise<MsgCreatePositionResponse> {
    const data = MsgCreatePosition.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreatePosition", data);
    return promise.then((data) => MsgCreatePositionResponse.decode(_m0.Reader.create(data)));
  }

  WithdrawPosition(request: MsgWithdrawPosition): Promise<MsgWithdrawPositionResponse> {
    const data = MsgWithdrawPosition.encode(request).finish();
    const promise = this.rpc.request(this.service, "WithdrawPosition", data);
    return promise.then((data) => MsgWithdrawPositionResponse.decode(_m0.Reader.create(data)));
  }

  AddToPosition(request: MsgAddToPosition): Promise<MsgAddToPositionResponse> {
    const data = MsgAddToPosition.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddToPosition", data);
    return promise.then((data) => MsgAddToPositionResponse.decode(_m0.Reader.create(data)));
  }

  CollectSpreadRewards(request: MsgCollectSpreadRewards): Promise<MsgCollectSpreadRewardsResponse> {
    const data = MsgCollectSpreadRewards.encode(request).finish();
    const promise = this.rpc.request(this.service, "CollectSpreadRewards", data);
    return promise.then((data) => MsgCollectSpreadRewardsResponse.decode(_m0.Reader.create(data)));
  }

  CollectIncentives(request: MsgCollectIncentives): Promise<MsgCollectIncentivesResponse> {
    const data = MsgCollectIncentives.encode(request).finish();
    const promise = this.rpc.request(this.service, "CollectIncentives", data);
    return promise.then((data) => MsgCollectIncentivesResponse.decode(_m0.Reader.create(data)));
  }

  TransferPositions(request: MsgTransferPositions): Promise<MsgTransferPositionsResponse> {
    const data = MsgTransferPositions.encode(request).finish();
    const promise = this.rpc.request(this.service, "TransferPositions", data);
    return promise.then((data) => MsgTransferPositionsResponse.decode(_m0.Reader.create(data)));
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
