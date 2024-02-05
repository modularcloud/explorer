/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "osmosis.superfluid";

export interface MsgSuperfluidDelegate {
  sender: string;
  lockId: Long;
  valAddr: string;
}

export interface MsgSuperfluidDelegateResponse {
}

export interface MsgSuperfluidUndelegate {
  sender: string;
  lockId: Long;
}

export interface MsgSuperfluidUndelegateResponse {
}

export interface MsgSuperfluidUnbondLock {
  sender: string;
  lockId: Long;
}

export interface MsgSuperfluidUnbondLockResponse {
}

export interface MsgSuperfluidUndelegateAndUnbondLock {
  sender: string;
  lockId: Long;
  /** Amount of unlocking coin. */
  coin: Coin | undefined;
}

export interface MsgSuperfluidUndelegateAndUnbondLockResponse {
  /**
   * lock id of the new lock created for the remaining amount.
   * returns the original lockid if the unlocked amount is equal to the
   * original lock's amount.
   */
  lockId: Long;
}

/**
 * MsgLockAndSuperfluidDelegate locks coins with the unbonding period duration,
 * and then does a superfluid lock from the newly created lockup, to the
 * specified validator addr.
 */
export interface MsgLockAndSuperfluidDelegate {
  sender: string;
  coins: Coin[];
  valAddr: string;
}

export interface MsgLockAndSuperfluidDelegateResponse {
  ID: Long;
}

/**
 * MsgCreateFullRangePositionAndSuperfluidDelegate creates a full range position
 * in a concentrated liquidity pool, then superfluid delegates.
 */
export interface MsgCreateFullRangePositionAndSuperfluidDelegate {
  sender: string;
  coins: Coin[];
  valAddr: string;
  poolId: Long;
}

export interface MsgCreateFullRangePositionAndSuperfluidDelegateResponse {
  lockID: Long;
  positionID: Long;
}

/**
 * MsgUnPoolWhitelistedPool Unpools every lock the sender has, that is
 * associated with pool pool_id. If pool_id is not approved for unpooling by
 * governance, this is a no-op. Unpooling takes the locked gamm shares, and runs
 * "ExitPool" on it, to get the constituent tokens. e.g. z gamm/pool/1 tokens
 * ExitPools into constituent tokens x uatom, y uosmo. Then it creates a new
 * lock for every constituent token, with the duration associated with the lock.
 * If the lock was unbonding, the new lockup durations should be the time left
 * until unbond completion.
 */
export interface MsgUnPoolWhitelistedPool {
  sender: string;
  poolId: Long;
}

export interface MsgUnPoolWhitelistedPoolResponse {
  exitedLockIds: Long[];
}

/**
 * =====================
 * MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition
 */
export interface MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition {
  sender: string;
  lockId: Long;
  sharesToMigrate:
    | Coin
    | undefined;
  /** token_out_mins indicates minimum token to exit Balancer pool with. */
  tokenOutMins: Coin[];
}

export interface MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse {
  amount0: string;
  amount1: string;
  liquidityCreated: string;
  joinTime: Date | undefined;
}

/** ===================== MsgAddToConcentratedLiquiditySuperfluidPosition */
export interface MsgAddToConcentratedLiquiditySuperfluidPosition {
  positionId: Long;
  sender: string;
  tokenDesired0: Coin | undefined;
  tokenDesired1: Coin | undefined;
}

export interface MsgAddToConcentratedLiquiditySuperfluidPositionResponse {
  positionId: Long;
  amount0: string;
  amount1: string;
  /**
   * new_liquidity is the final liquidity after the add.
   * It includes the liquidity that existed before in the position
   * and the new liquidity that was added to the position.
   */
  newLiquidity: string;
  lockId: Long;
}

/** ===================== MsgUnbondConvertAndStake */
export interface MsgUnbondConvertAndStake {
  /**
   * lock ID to convert and stake.
   * lock id with 0 should be provided if converting liquid gamm shares to stake
   */
  lockId: Long;
  sender: string;
  /**
   * validator address to delegate to.
   * If provided empty string, we use the validators returned from
   * valset-preference module.
   */
  valAddr: string;
  /** min_amt_to_stake indicates the minimum amount to stake after conversion */
  minAmtToStake: string;
  /**
   * shares_to_convert indicates shares wanted to stake.
   * Note that this field is only used for liquid(unlocked) gamm shares.
   * For all other cases, this field would be disregarded.
   */
  sharesToConvert: Coin | undefined;
}

export interface MsgUnbondConvertAndStakeResponse {
  totalAmtStaked: string;
}

function createBaseMsgSuperfluidDelegate(): MsgSuperfluidDelegate {
  return { sender: "", lockId: Long.UZERO, valAddr: "" };
}

export const MsgSuperfluidDelegate = {
  encode(message: MsgSuperfluidDelegate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.lockId.isZero()) {
      writer.uint32(16).uint64(message.lockId);
    }
    if (message.valAddr !== "") {
      writer.uint32(26).string(message.valAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSuperfluidDelegate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSuperfluidDelegate();
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
          if (tag !== 16) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.valAddr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSuperfluidDelegate {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO,
      valAddr: isSet(object.valAddr) ? globalThis.String(object.valAddr) : "",
    };
  },

  toJSON(message: MsgSuperfluidDelegate): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    if (message.valAddr !== "") {
      obj.valAddr = message.valAddr;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSuperfluidDelegate>, I>>(base?: I): MsgSuperfluidDelegate {
    return MsgSuperfluidDelegate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSuperfluidDelegate>, I>>(object: I): MsgSuperfluidDelegate {
    const message = createBaseMsgSuperfluidDelegate();
    message.sender = object.sender ?? "";
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    message.valAddr = object.valAddr ?? "";
    return message;
  },
};

function createBaseMsgSuperfluidDelegateResponse(): MsgSuperfluidDelegateResponse {
  return {};
}

export const MsgSuperfluidDelegateResponse = {
  encode(_: MsgSuperfluidDelegateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSuperfluidDelegateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSuperfluidDelegateResponse();
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

  fromJSON(_: any): MsgSuperfluidDelegateResponse {
    return {};
  },

  toJSON(_: MsgSuperfluidDelegateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSuperfluidDelegateResponse>, I>>(base?: I): MsgSuperfluidDelegateResponse {
    return MsgSuperfluidDelegateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSuperfluidDelegateResponse>, I>>(_: I): MsgSuperfluidDelegateResponse {
    const message = createBaseMsgSuperfluidDelegateResponse();
    return message;
  },
};

function createBaseMsgSuperfluidUndelegate(): MsgSuperfluidUndelegate {
  return { sender: "", lockId: Long.UZERO };
}

export const MsgSuperfluidUndelegate = {
  encode(message: MsgSuperfluidUndelegate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.lockId.isZero()) {
      writer.uint32(16).uint64(message.lockId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSuperfluidUndelegate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSuperfluidUndelegate();
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
          if (tag !== 16) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSuperfluidUndelegate {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO,
    };
  },

  toJSON(message: MsgSuperfluidUndelegate): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSuperfluidUndelegate>, I>>(base?: I): MsgSuperfluidUndelegate {
    return MsgSuperfluidUndelegate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSuperfluidUndelegate>, I>>(object: I): MsgSuperfluidUndelegate {
    const message = createBaseMsgSuperfluidUndelegate();
    message.sender = object.sender ?? "";
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgSuperfluidUndelegateResponse(): MsgSuperfluidUndelegateResponse {
  return {};
}

export const MsgSuperfluidUndelegateResponse = {
  encode(_: MsgSuperfluidUndelegateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSuperfluidUndelegateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSuperfluidUndelegateResponse();
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

  fromJSON(_: any): MsgSuperfluidUndelegateResponse {
    return {};
  },

  toJSON(_: MsgSuperfluidUndelegateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSuperfluidUndelegateResponse>, I>>(base?: I): MsgSuperfluidUndelegateResponse {
    return MsgSuperfluidUndelegateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSuperfluidUndelegateResponse>, I>>(_: I): MsgSuperfluidUndelegateResponse {
    const message = createBaseMsgSuperfluidUndelegateResponse();
    return message;
  },
};

function createBaseMsgSuperfluidUnbondLock(): MsgSuperfluidUnbondLock {
  return { sender: "", lockId: Long.UZERO };
}

export const MsgSuperfluidUnbondLock = {
  encode(message: MsgSuperfluidUnbondLock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.lockId.isZero()) {
      writer.uint32(16).uint64(message.lockId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSuperfluidUnbondLock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSuperfluidUnbondLock();
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
          if (tag !== 16) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSuperfluidUnbondLock {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO,
    };
  },

  toJSON(message: MsgSuperfluidUnbondLock): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSuperfluidUnbondLock>, I>>(base?: I): MsgSuperfluidUnbondLock {
    return MsgSuperfluidUnbondLock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSuperfluidUnbondLock>, I>>(object: I): MsgSuperfluidUnbondLock {
    const message = createBaseMsgSuperfluidUnbondLock();
    message.sender = object.sender ?? "";
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgSuperfluidUnbondLockResponse(): MsgSuperfluidUnbondLockResponse {
  return {};
}

export const MsgSuperfluidUnbondLockResponse = {
  encode(_: MsgSuperfluidUnbondLockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSuperfluidUnbondLockResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSuperfluidUnbondLockResponse();
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

  fromJSON(_: any): MsgSuperfluidUnbondLockResponse {
    return {};
  },

  toJSON(_: MsgSuperfluidUnbondLockResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSuperfluidUnbondLockResponse>, I>>(base?: I): MsgSuperfluidUnbondLockResponse {
    return MsgSuperfluidUnbondLockResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSuperfluidUnbondLockResponse>, I>>(_: I): MsgSuperfluidUnbondLockResponse {
    const message = createBaseMsgSuperfluidUnbondLockResponse();
    return message;
  },
};

function createBaseMsgSuperfluidUndelegateAndUnbondLock(): MsgSuperfluidUndelegateAndUnbondLock {
  return { sender: "", lockId: Long.UZERO, coin: undefined };
}

export const MsgSuperfluidUndelegateAndUnbondLock = {
  encode(message: MsgSuperfluidUndelegateAndUnbondLock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.lockId.isZero()) {
      writer.uint32(16).uint64(message.lockId);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSuperfluidUndelegateAndUnbondLock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSuperfluidUndelegateAndUnbondLock();
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
          if (tag !== 16) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.coin = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSuperfluidUndelegateAndUnbondLock {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO,
      coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
    };
  },

  toJSON(message: MsgSuperfluidUndelegateAndUnbondLock): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    if (message.coin !== undefined) {
      obj.coin = Coin.toJSON(message.coin);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSuperfluidUndelegateAndUnbondLock>, I>>(
    base?: I,
  ): MsgSuperfluidUndelegateAndUnbondLock {
    return MsgSuperfluidUndelegateAndUnbondLock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSuperfluidUndelegateAndUnbondLock>, I>>(
    object: I,
  ): MsgSuperfluidUndelegateAndUnbondLock {
    const message = createBaseMsgSuperfluidUndelegateAndUnbondLock();
    message.sender = object.sender ?? "";
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
    return message;
  },
};

function createBaseMsgSuperfluidUndelegateAndUnbondLockResponse(): MsgSuperfluidUndelegateAndUnbondLockResponse {
  return { lockId: Long.UZERO };
}

export const MsgSuperfluidUndelegateAndUnbondLockResponse = {
  encode(message: MsgSuperfluidUndelegateAndUnbondLockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.lockId.isZero()) {
      writer.uint32(8).uint64(message.lockId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSuperfluidUndelegateAndUnbondLockResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSuperfluidUndelegateAndUnbondLockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSuperfluidUndelegateAndUnbondLockResponse {
    return { lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO };
  },

  toJSON(message: MsgSuperfluidUndelegateAndUnbondLockResponse): unknown {
    const obj: any = {};
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSuperfluidUndelegateAndUnbondLockResponse>, I>>(
    base?: I,
  ): MsgSuperfluidUndelegateAndUnbondLockResponse {
    return MsgSuperfluidUndelegateAndUnbondLockResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSuperfluidUndelegateAndUnbondLockResponse>, I>>(
    object: I,
  ): MsgSuperfluidUndelegateAndUnbondLockResponse {
    const message = createBaseMsgSuperfluidUndelegateAndUnbondLockResponse();
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgLockAndSuperfluidDelegate(): MsgLockAndSuperfluidDelegate {
  return { sender: "", coins: [], valAddr: "" };
}

export const MsgLockAndSuperfluidDelegate = {
  encode(message: MsgLockAndSuperfluidDelegate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.valAddr !== "") {
      writer.uint32(26).string(message.valAddr);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLockAndSuperfluidDelegate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLockAndSuperfluidDelegate();
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

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.valAddr = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgLockAndSuperfluidDelegate {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      valAddr: isSet(object.valAddr) ? globalThis.String(object.valAddr) : "",
    };
  },

  toJSON(message: MsgLockAndSuperfluidDelegate): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    if (message.valAddr !== "") {
      obj.valAddr = message.valAddr;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgLockAndSuperfluidDelegate>, I>>(base?: I): MsgLockAndSuperfluidDelegate {
    return MsgLockAndSuperfluidDelegate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgLockAndSuperfluidDelegate>, I>>(object: I): MsgLockAndSuperfluidDelegate {
    const message = createBaseMsgLockAndSuperfluidDelegate();
    message.sender = object.sender ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.valAddr = object.valAddr ?? "";
    return message;
  },
};

function createBaseMsgLockAndSuperfluidDelegateResponse(): MsgLockAndSuperfluidDelegateResponse {
  return { ID: Long.UZERO };
}

export const MsgLockAndSuperfluidDelegateResponse = {
  encode(message: MsgLockAndSuperfluidDelegateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.ID.isZero()) {
      writer.uint32(8).uint64(message.ID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLockAndSuperfluidDelegateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLockAndSuperfluidDelegateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.ID = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgLockAndSuperfluidDelegateResponse {
    return { ID: isSet(object.ID) ? Long.fromValue(object.ID) : Long.UZERO };
  },

  toJSON(message: MsgLockAndSuperfluidDelegateResponse): unknown {
    const obj: any = {};
    if (!message.ID.isZero()) {
      obj.ID = (message.ID || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgLockAndSuperfluidDelegateResponse>, I>>(
    base?: I,
  ): MsgLockAndSuperfluidDelegateResponse {
    return MsgLockAndSuperfluidDelegateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgLockAndSuperfluidDelegateResponse>, I>>(
    object: I,
  ): MsgLockAndSuperfluidDelegateResponse {
    const message = createBaseMsgLockAndSuperfluidDelegateResponse();
    message.ID = (object.ID !== undefined && object.ID !== null) ? Long.fromValue(object.ID) : Long.UZERO;
    return message;
  },
};

function createBaseMsgCreateFullRangePositionAndSuperfluidDelegate(): MsgCreateFullRangePositionAndSuperfluidDelegate {
  return { sender: "", coins: [], valAddr: "", poolId: Long.UZERO };
}

export const MsgCreateFullRangePositionAndSuperfluidDelegate = {
  encode(
    message: MsgCreateFullRangePositionAndSuperfluidDelegate,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.valAddr !== "") {
      writer.uint32(26).string(message.valAddr);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(32).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateFullRangePositionAndSuperfluidDelegate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateFullRangePositionAndSuperfluidDelegate();
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

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.valAddr = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateFullRangePositionAndSuperfluidDelegate {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      valAddr: isSet(object.valAddr) ? globalThis.String(object.valAddr) : "",
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
    };
  },

  toJSON(message: MsgCreateFullRangePositionAndSuperfluidDelegate): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    if (message.valAddr !== "") {
      obj.valAddr = message.valAddr;
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateFullRangePositionAndSuperfluidDelegate>, I>>(
    base?: I,
  ): MsgCreateFullRangePositionAndSuperfluidDelegate {
    return MsgCreateFullRangePositionAndSuperfluidDelegate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateFullRangePositionAndSuperfluidDelegate>, I>>(
    object: I,
  ): MsgCreateFullRangePositionAndSuperfluidDelegate {
    const message = createBaseMsgCreateFullRangePositionAndSuperfluidDelegate();
    message.sender = object.sender ?? "";
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.valAddr = object.valAddr ?? "";
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgCreateFullRangePositionAndSuperfluidDelegateResponse(): MsgCreateFullRangePositionAndSuperfluidDelegateResponse {
  return { lockID: Long.UZERO, positionID: Long.UZERO };
}

export const MsgCreateFullRangePositionAndSuperfluidDelegateResponse = {
  encode(
    message: MsgCreateFullRangePositionAndSuperfluidDelegateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.lockID.isZero()) {
      writer.uint32(8).uint64(message.lockID);
    }
    if (!message.positionID.isZero()) {
      writer.uint32(16).uint64(message.positionID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateFullRangePositionAndSuperfluidDelegateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateFullRangePositionAndSuperfluidDelegateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lockID = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.positionID = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateFullRangePositionAndSuperfluidDelegateResponse {
    return {
      lockID: isSet(object.lockID) ? Long.fromValue(object.lockID) : Long.UZERO,
      positionID: isSet(object.positionID) ? Long.fromValue(object.positionID) : Long.UZERO,
    };
  },

  toJSON(message: MsgCreateFullRangePositionAndSuperfluidDelegateResponse): unknown {
    const obj: any = {};
    if (!message.lockID.isZero()) {
      obj.lockID = (message.lockID || Long.UZERO).toString();
    }
    if (!message.positionID.isZero()) {
      obj.positionID = (message.positionID || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateFullRangePositionAndSuperfluidDelegateResponse>, I>>(
    base?: I,
  ): MsgCreateFullRangePositionAndSuperfluidDelegateResponse {
    return MsgCreateFullRangePositionAndSuperfluidDelegateResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateFullRangePositionAndSuperfluidDelegateResponse>, I>>(
    object: I,
  ): MsgCreateFullRangePositionAndSuperfluidDelegateResponse {
    const message = createBaseMsgCreateFullRangePositionAndSuperfluidDelegateResponse();
    message.lockID = (object.lockID !== undefined && object.lockID !== null)
      ? Long.fromValue(object.lockID)
      : Long.UZERO;
    message.positionID = (object.positionID !== undefined && object.positionID !== null)
      ? Long.fromValue(object.positionID)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgUnPoolWhitelistedPool(): MsgUnPoolWhitelistedPool {
  return { sender: "", poolId: Long.UZERO };
}

export const MsgUnPoolWhitelistedPool = {
  encode(message: MsgUnPoolWhitelistedPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.poolId.isZero()) {
      writer.uint32(16).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnPoolWhitelistedPool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnPoolWhitelistedPool();
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
          if (tag !== 16) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUnPoolWhitelistedPool {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO,
    };
  },

  toJSON(message: MsgUnPoolWhitelistedPool): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnPoolWhitelistedPool>, I>>(base?: I): MsgUnPoolWhitelistedPool {
    return MsgUnPoolWhitelistedPool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUnPoolWhitelistedPool>, I>>(object: I): MsgUnPoolWhitelistedPool {
    const message = createBaseMsgUnPoolWhitelistedPool();
    message.sender = object.sender ?? "";
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgUnPoolWhitelistedPoolResponse(): MsgUnPoolWhitelistedPoolResponse {
  return { exitedLockIds: [] };
}

export const MsgUnPoolWhitelistedPoolResponse = {
  encode(message: MsgUnPoolWhitelistedPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.exitedLockIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnPoolWhitelistedPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnPoolWhitelistedPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.exitedLockIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.exitedLockIds.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUnPoolWhitelistedPoolResponse {
    return {
      exitedLockIds: globalThis.Array.isArray(object?.exitedLockIds)
        ? object.exitedLockIds.map((e: any) => Long.fromValue(e))
        : [],
    };
  },

  toJSON(message: MsgUnPoolWhitelistedPoolResponse): unknown {
    const obj: any = {};
    if (message.exitedLockIds?.length) {
      obj.exitedLockIds = message.exitedLockIds.map((e) => (e || Long.UZERO).toString());
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnPoolWhitelistedPoolResponse>, I>>(
    base?: I,
  ): MsgUnPoolWhitelistedPoolResponse {
    return MsgUnPoolWhitelistedPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUnPoolWhitelistedPoolResponse>, I>>(
    object: I,
  ): MsgUnPoolWhitelistedPoolResponse {
    const message = createBaseMsgUnPoolWhitelistedPoolResponse();
    message.exitedLockIds = object.exitedLockIds?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

function createBaseMsgUnlockAndMigrateSharesToFullRangeConcentratedPosition(): MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition {
  return { sender: "", lockId: Long.ZERO, sharesToMigrate: undefined, tokenOutMins: [] };
}

export const MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition = {
  encode(
    message: MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (!message.lockId.isZero()) {
      writer.uint32(16).int64(message.lockId);
    }
    if (message.sharesToMigrate !== undefined) {
      Coin.encode(message.sharesToMigrate, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.tokenOutMins) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlockAndMigrateSharesToFullRangeConcentratedPosition();
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
          if (tag !== 16) {
            break;
          }

          message.lockId = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sharesToMigrate = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.tokenOutMins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.ZERO,
      sharesToMigrate: isSet(object.sharesToMigrate) ? Coin.fromJSON(object.sharesToMigrate) : undefined,
      tokenOutMins: globalThis.Array.isArray(object?.tokenOutMins)
        ? object.tokenOutMins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.ZERO).toString();
    }
    if (message.sharesToMigrate !== undefined) {
      obj.sharesToMigrate = Coin.toJSON(message.sharesToMigrate);
    }
    if (message.tokenOutMins?.length) {
      obj.tokenOutMins = message.tokenOutMins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition>, I>>(
    base?: I,
  ): MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition {
    return MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition>, I>>(
    object: I,
  ): MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition {
    const message = createBaseMsgUnlockAndMigrateSharesToFullRangeConcentratedPosition();
    message.sender = object.sender ?? "";
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.ZERO;
    message.sharesToMigrate = (object.sharesToMigrate !== undefined && object.sharesToMigrate !== null)
      ? Coin.fromPartial(object.sharesToMigrate)
      : undefined;
    message.tokenOutMins = object.tokenOutMins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse(): MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse {
  return { amount0: "", amount1: "", liquidityCreated: "", joinTime: undefined };
}

export const MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse = {
  encode(
    message: MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.amount0 !== "") {
      writer.uint32(10).string(message.amount0);
    }
    if (message.amount1 !== "") {
      writer.uint32(18).string(message.amount1);
    }
    if (message.liquidityCreated !== "") {
      writer.uint32(26).string(message.liquidityCreated);
    }
    if (message.joinTime !== undefined) {
      Timestamp.encode(toTimestamp(message.joinTime), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.liquidityCreated = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.joinTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse {
    return {
      amount0: isSet(object.amount0) ? globalThis.String(object.amount0) : "",
      amount1: isSet(object.amount1) ? globalThis.String(object.amount1) : "",
      liquidityCreated: isSet(object.liquidityCreated) ? globalThis.String(object.liquidityCreated) : "",
      joinTime: isSet(object.joinTime) ? fromJsonTimestamp(object.joinTime) : undefined,
    };
  },

  toJSON(message: MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse): unknown {
    const obj: any = {};
    if (message.amount0 !== "") {
      obj.amount0 = message.amount0;
    }
    if (message.amount1 !== "") {
      obj.amount1 = message.amount1;
    }
    if (message.liquidityCreated !== "") {
      obj.liquidityCreated = message.liquidityCreated;
    }
    if (message.joinTime !== undefined) {
      obj.joinTime = message.joinTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse>, I>>(
    base?: I,
  ): MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse {
    return MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse>, I>>(
    object: I,
  ): MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse {
    const message = createBaseMsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse();
    message.amount0 = object.amount0 ?? "";
    message.amount1 = object.amount1 ?? "";
    message.liquidityCreated = object.liquidityCreated ?? "";
    message.joinTime = object.joinTime ?? undefined;
    return message;
  },
};

function createBaseMsgAddToConcentratedLiquiditySuperfluidPosition(): MsgAddToConcentratedLiquiditySuperfluidPosition {
  return { positionId: Long.UZERO, sender: "", tokenDesired0: undefined, tokenDesired1: undefined };
}

export const MsgAddToConcentratedLiquiditySuperfluidPosition = {
  encode(
    message: MsgAddToConcentratedLiquiditySuperfluidPosition,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.tokenDesired0 !== undefined) {
      Coin.encode(message.tokenDesired0, writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenDesired1 !== undefined) {
      Coin.encode(message.tokenDesired1, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddToConcentratedLiquiditySuperfluidPosition {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddToConcentratedLiquiditySuperfluidPosition();
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

          message.tokenDesired0 = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.tokenDesired1 = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddToConcentratedLiquiditySuperfluidPosition {
    return {
      positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO,
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      tokenDesired0: isSet(object.tokenDesired0) ? Coin.fromJSON(object.tokenDesired0) : undefined,
      tokenDesired1: isSet(object.tokenDesired1) ? Coin.fromJSON(object.tokenDesired1) : undefined,
    };
  },

  toJSON(message: MsgAddToConcentratedLiquiditySuperfluidPosition): unknown {
    const obj: any = {};
    if (!message.positionId.isZero()) {
      obj.positionId = (message.positionId || Long.UZERO).toString();
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.tokenDesired0 !== undefined) {
      obj.tokenDesired0 = Coin.toJSON(message.tokenDesired0);
    }
    if (message.tokenDesired1 !== undefined) {
      obj.tokenDesired1 = Coin.toJSON(message.tokenDesired1);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddToConcentratedLiquiditySuperfluidPosition>, I>>(
    base?: I,
  ): MsgAddToConcentratedLiquiditySuperfluidPosition {
    return MsgAddToConcentratedLiquiditySuperfluidPosition.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddToConcentratedLiquiditySuperfluidPosition>, I>>(
    object: I,
  ): MsgAddToConcentratedLiquiditySuperfluidPosition {
    const message = createBaseMsgAddToConcentratedLiquiditySuperfluidPosition();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    message.sender = object.sender ?? "";
    message.tokenDesired0 = (object.tokenDesired0 !== undefined && object.tokenDesired0 !== null)
      ? Coin.fromPartial(object.tokenDesired0)
      : undefined;
    message.tokenDesired1 = (object.tokenDesired1 !== undefined && object.tokenDesired1 !== null)
      ? Coin.fromPartial(object.tokenDesired1)
      : undefined;
    return message;
  },
};

function createBaseMsgAddToConcentratedLiquiditySuperfluidPositionResponse(): MsgAddToConcentratedLiquiditySuperfluidPositionResponse {
  return { positionId: Long.UZERO, amount0: "", amount1: "", newLiquidity: "", lockId: Long.UZERO };
}

export const MsgAddToConcentratedLiquiditySuperfluidPositionResponse = {
  encode(
    message: MsgAddToConcentratedLiquiditySuperfluidPositionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (!message.positionId.isZero()) {
      writer.uint32(8).uint64(message.positionId);
    }
    if (message.amount0 !== "") {
      writer.uint32(18).string(message.amount0);
    }
    if (message.amount1 !== "") {
      writer.uint32(26).string(message.amount1);
    }
    if (message.newLiquidity !== "") {
      writer.uint32(42).string(message.newLiquidity);
    }
    if (!message.lockId.isZero()) {
      writer.uint32(32).uint64(message.lockId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddToConcentratedLiquiditySuperfluidPositionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddToConcentratedLiquiditySuperfluidPositionResponse();
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

          message.newLiquidity = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.lockId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddToConcentratedLiquiditySuperfluidPositionResponse {
    return {
      positionId: isSet(object.positionId) ? Long.fromValue(object.positionId) : Long.UZERO,
      amount0: isSet(object.amount0) ? globalThis.String(object.amount0) : "",
      amount1: isSet(object.amount1) ? globalThis.String(object.amount1) : "",
      newLiquidity: isSet(object.newLiquidity) ? globalThis.String(object.newLiquidity) : "",
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO,
    };
  },

  toJSON(message: MsgAddToConcentratedLiquiditySuperfluidPositionResponse): unknown {
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
    if (message.newLiquidity !== "") {
      obj.newLiquidity = message.newLiquidity;
    }
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddToConcentratedLiquiditySuperfluidPositionResponse>, I>>(
    base?: I,
  ): MsgAddToConcentratedLiquiditySuperfluidPositionResponse {
    return MsgAddToConcentratedLiquiditySuperfluidPositionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddToConcentratedLiquiditySuperfluidPositionResponse>, I>>(
    object: I,
  ): MsgAddToConcentratedLiquiditySuperfluidPositionResponse {
    const message = createBaseMsgAddToConcentratedLiquiditySuperfluidPositionResponse();
    message.positionId = (object.positionId !== undefined && object.positionId !== null)
      ? Long.fromValue(object.positionId)
      : Long.UZERO;
    message.amount0 = object.amount0 ?? "";
    message.amount1 = object.amount1 ?? "";
    message.newLiquidity = object.newLiquidity ?? "";
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgUnbondConvertAndStake(): MsgUnbondConvertAndStake {
  return { lockId: Long.UZERO, sender: "", valAddr: "", minAmtToStake: "", sharesToConvert: undefined };
}

export const MsgUnbondConvertAndStake = {
  encode(message: MsgUnbondConvertAndStake, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.lockId.isZero()) {
      writer.uint32(8).uint64(message.lockId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.valAddr !== "") {
      writer.uint32(26).string(message.valAddr);
    }
    if (message.minAmtToStake !== "") {
      writer.uint32(34).string(message.minAmtToStake);
    }
    if (message.sharesToConvert !== undefined) {
      Coin.encode(message.sharesToConvert, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnbondConvertAndStake {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnbondConvertAndStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.lockId = reader.uint64() as Long;
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

          message.valAddr = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.minAmtToStake = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sharesToConvert = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUnbondConvertAndStake {
    return {
      lockId: isSet(object.lockId) ? Long.fromValue(object.lockId) : Long.UZERO,
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      valAddr: isSet(object.valAddr) ? globalThis.String(object.valAddr) : "",
      minAmtToStake: isSet(object.minAmtToStake) ? globalThis.String(object.minAmtToStake) : "",
      sharesToConvert: isSet(object.sharesToConvert) ? Coin.fromJSON(object.sharesToConvert) : undefined,
    };
  },

  toJSON(message: MsgUnbondConvertAndStake): unknown {
    const obj: any = {};
    if (!message.lockId.isZero()) {
      obj.lockId = (message.lockId || Long.UZERO).toString();
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.valAddr !== "") {
      obj.valAddr = message.valAddr;
    }
    if (message.minAmtToStake !== "") {
      obj.minAmtToStake = message.minAmtToStake;
    }
    if (message.sharesToConvert !== undefined) {
      obj.sharesToConvert = Coin.toJSON(message.sharesToConvert);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnbondConvertAndStake>, I>>(base?: I): MsgUnbondConvertAndStake {
    return MsgUnbondConvertAndStake.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUnbondConvertAndStake>, I>>(object: I): MsgUnbondConvertAndStake {
    const message = createBaseMsgUnbondConvertAndStake();
    message.lockId = (object.lockId !== undefined && object.lockId !== null)
      ? Long.fromValue(object.lockId)
      : Long.UZERO;
    message.sender = object.sender ?? "";
    message.valAddr = object.valAddr ?? "";
    message.minAmtToStake = object.minAmtToStake ?? "";
    message.sharesToConvert = (object.sharesToConvert !== undefined && object.sharesToConvert !== null)
      ? Coin.fromPartial(object.sharesToConvert)
      : undefined;
    return message;
  },
};

function createBaseMsgUnbondConvertAndStakeResponse(): MsgUnbondConvertAndStakeResponse {
  return { totalAmtStaked: "" };
}

export const MsgUnbondConvertAndStakeResponse = {
  encode(message: MsgUnbondConvertAndStakeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalAmtStaked !== "") {
      writer.uint32(10).string(message.totalAmtStaked);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnbondConvertAndStakeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnbondConvertAndStakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.totalAmtStaked = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUnbondConvertAndStakeResponse {
    return { totalAmtStaked: isSet(object.totalAmtStaked) ? globalThis.String(object.totalAmtStaked) : "" };
  },

  toJSON(message: MsgUnbondConvertAndStakeResponse): unknown {
    const obj: any = {};
    if (message.totalAmtStaked !== "") {
      obj.totalAmtStaked = message.totalAmtStaked;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUnbondConvertAndStakeResponse>, I>>(
    base?: I,
  ): MsgUnbondConvertAndStakeResponse {
    return MsgUnbondConvertAndStakeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUnbondConvertAndStakeResponse>, I>>(
    object: I,
  ): MsgUnbondConvertAndStakeResponse {
    const message = createBaseMsgUnbondConvertAndStakeResponse();
    message.totalAmtStaked = object.totalAmtStaked ?? "";
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** Execute superfluid delegation for a lockup */
  SuperfluidDelegate(request: MsgSuperfluidDelegate): Promise<MsgSuperfluidDelegateResponse>;
  /** Execute superfluid undelegation for a lockup */
  SuperfluidUndelegate(request: MsgSuperfluidUndelegate): Promise<MsgSuperfluidUndelegateResponse>;
  /**
   * For a given lock that is being superfluidly undelegated,
   * also unbond the underlying lock.
   */
  SuperfluidUnbondLock(request: MsgSuperfluidUnbondLock): Promise<MsgSuperfluidUnbondLockResponse>;
  /** Superfluid undelegate and unbond partial amount of the underlying lock. */
  SuperfluidUndelegateAndUnbondLock(
    request: MsgSuperfluidUndelegateAndUnbondLock,
  ): Promise<MsgSuperfluidUndelegateAndUnbondLockResponse>;
  /** Execute lockup lock and superfluid delegation in a single msg */
  LockAndSuperfluidDelegate(request: MsgLockAndSuperfluidDelegate): Promise<MsgLockAndSuperfluidDelegateResponse>;
  CreateFullRangePositionAndSuperfluidDelegate(
    request: MsgCreateFullRangePositionAndSuperfluidDelegate,
  ): Promise<MsgCreateFullRangePositionAndSuperfluidDelegateResponse>;
  UnPoolWhitelistedPool(request: MsgUnPoolWhitelistedPool): Promise<MsgUnPoolWhitelistedPoolResponse>;
  UnlockAndMigrateSharesToFullRangeConcentratedPosition(
    request: MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition,
  ): Promise<MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse>;
  AddToConcentratedLiquiditySuperfluidPosition(
    request: MsgAddToConcentratedLiquiditySuperfluidPosition,
  ): Promise<MsgAddToConcentratedLiquiditySuperfluidPositionResponse>;
  /**
   * UnbondConvertAndStake breaks all locks / superfluid staked assets,
   * converts them to osmo then stakes the osmo to the designated validator.
   */
  UnbondConvertAndStake(request: MsgUnbondConvertAndStake): Promise<MsgUnbondConvertAndStakeResponse>;
}

export const MsgServiceName = "osmosis.superfluid.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.SuperfluidDelegate = this.SuperfluidDelegate.bind(this);
    this.SuperfluidUndelegate = this.SuperfluidUndelegate.bind(this);
    this.SuperfluidUnbondLock = this.SuperfluidUnbondLock.bind(this);
    this.SuperfluidUndelegateAndUnbondLock = this.SuperfluidUndelegateAndUnbondLock.bind(this);
    this.LockAndSuperfluidDelegate = this.LockAndSuperfluidDelegate.bind(this);
    this.CreateFullRangePositionAndSuperfluidDelegate = this.CreateFullRangePositionAndSuperfluidDelegate.bind(this);
    this.UnPoolWhitelistedPool = this.UnPoolWhitelistedPool.bind(this);
    this.UnlockAndMigrateSharesToFullRangeConcentratedPosition = this
      .UnlockAndMigrateSharesToFullRangeConcentratedPosition.bind(this);
    this.AddToConcentratedLiquiditySuperfluidPosition = this.AddToConcentratedLiquiditySuperfluidPosition.bind(this);
    this.UnbondConvertAndStake = this.UnbondConvertAndStake.bind(this);
  }
  SuperfluidDelegate(request: MsgSuperfluidDelegate): Promise<MsgSuperfluidDelegateResponse> {
    const data = MsgSuperfluidDelegate.encode(request).finish();
    const promise = this.rpc.request(this.service, "SuperfluidDelegate", data);
    return promise.then((data) => MsgSuperfluidDelegateResponse.decode(_m0.Reader.create(data)));
  }

  SuperfluidUndelegate(request: MsgSuperfluidUndelegate): Promise<MsgSuperfluidUndelegateResponse> {
    const data = MsgSuperfluidUndelegate.encode(request).finish();
    const promise = this.rpc.request(this.service, "SuperfluidUndelegate", data);
    return promise.then((data) => MsgSuperfluidUndelegateResponse.decode(_m0.Reader.create(data)));
  }

  SuperfluidUnbondLock(request: MsgSuperfluidUnbondLock): Promise<MsgSuperfluidUnbondLockResponse> {
    const data = MsgSuperfluidUnbondLock.encode(request).finish();
    const promise = this.rpc.request(this.service, "SuperfluidUnbondLock", data);
    return promise.then((data) => MsgSuperfluidUnbondLockResponse.decode(_m0.Reader.create(data)));
  }

  SuperfluidUndelegateAndUnbondLock(
    request: MsgSuperfluidUndelegateAndUnbondLock,
  ): Promise<MsgSuperfluidUndelegateAndUnbondLockResponse> {
    const data = MsgSuperfluidUndelegateAndUnbondLock.encode(request).finish();
    const promise = this.rpc.request(this.service, "SuperfluidUndelegateAndUnbondLock", data);
    return promise.then((data) => MsgSuperfluidUndelegateAndUnbondLockResponse.decode(_m0.Reader.create(data)));
  }

  LockAndSuperfluidDelegate(request: MsgLockAndSuperfluidDelegate): Promise<MsgLockAndSuperfluidDelegateResponse> {
    const data = MsgLockAndSuperfluidDelegate.encode(request).finish();
    const promise = this.rpc.request(this.service, "LockAndSuperfluidDelegate", data);
    return promise.then((data) => MsgLockAndSuperfluidDelegateResponse.decode(_m0.Reader.create(data)));
  }

  CreateFullRangePositionAndSuperfluidDelegate(
    request: MsgCreateFullRangePositionAndSuperfluidDelegate,
  ): Promise<MsgCreateFullRangePositionAndSuperfluidDelegateResponse> {
    const data = MsgCreateFullRangePositionAndSuperfluidDelegate.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateFullRangePositionAndSuperfluidDelegate", data);
    return promise.then((data) =>
      MsgCreateFullRangePositionAndSuperfluidDelegateResponse.decode(_m0.Reader.create(data))
    );
  }

  UnPoolWhitelistedPool(request: MsgUnPoolWhitelistedPool): Promise<MsgUnPoolWhitelistedPoolResponse> {
    const data = MsgUnPoolWhitelistedPool.encode(request).finish();
    const promise = this.rpc.request(this.service, "UnPoolWhitelistedPool", data);
    return promise.then((data) => MsgUnPoolWhitelistedPoolResponse.decode(_m0.Reader.create(data)));
  }

  UnlockAndMigrateSharesToFullRangeConcentratedPosition(
    request: MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition,
  ): Promise<MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse> {
    const data = MsgUnlockAndMigrateSharesToFullRangeConcentratedPosition.encode(request).finish();
    const promise = this.rpc.request(this.service, "UnlockAndMigrateSharesToFullRangeConcentratedPosition", data);
    return promise.then((data) =>
      MsgUnlockAndMigrateSharesToFullRangeConcentratedPositionResponse.decode(_m0.Reader.create(data))
    );
  }

  AddToConcentratedLiquiditySuperfluidPosition(
    request: MsgAddToConcentratedLiquiditySuperfluidPosition,
  ): Promise<MsgAddToConcentratedLiquiditySuperfluidPositionResponse> {
    const data = MsgAddToConcentratedLiquiditySuperfluidPosition.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddToConcentratedLiquiditySuperfluidPosition", data);
    return promise.then((data) =>
      MsgAddToConcentratedLiquiditySuperfluidPositionResponse.decode(_m0.Reader.create(data))
    );
  }

  UnbondConvertAndStake(request: MsgUnbondConvertAndStake): Promise<MsgUnbondConvertAndStakeResponse> {
    const data = MsgUnbondConvertAndStake.encode(request).finish();
    const promise = this.rpc.request(this.service, "UnbondConvertAndStake", data);
    return promise.then((data) => MsgUnbondConvertAndStakeResponse.decode(_m0.Reader.create(data)));
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
