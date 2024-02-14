/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Duration } from "../../google/protobuf/duration";
import { PeriodLock } from "./lock";

export const protobufPackage = "osmosis.lockup";

export interface MsgLockTokens {
  owner: string;
  duration: Duration | undefined;
  coins: Coin[];
}

export interface MsgLockTokensResponse {
  ID: Long;
}

export interface MsgBeginUnlockingAll {
  owner: string;
}

export interface MsgBeginUnlockingAllResponse {
  unlocks: PeriodLock[];
}

export interface MsgBeginUnlocking {
  owner: string;
  ID: Long;
  /** Amount of unlocking coins. Unlock all if not set. */
  coins: Coin[];
}

export interface MsgBeginUnlockingResponse {
  success: boolean;
  unlockingLockID: Long;
}

/**
 * MsgExtendLockup extends the existing lockup's duration.
 * The new duration is longer than the original.
 */
export interface MsgExtendLockup {
  owner: string;
  ID: Long;
  /**
   * duration to be set. fails if lower than the current duration, or is
   * unlocking
   */
  duration: Duration | undefined;
}

export interface MsgExtendLockupResponse {
  success: boolean;
}

/**
 * MsgForceUnlock unlocks locks immediately for
 * addresses registered via governance.
 */
export interface MsgForceUnlock {
  owner: string;
  ID: Long;
  /** Amount of unlocking coins. Unlock all if not set. */
  coins: Coin[];
}

export interface MsgForceUnlockResponse {
  success: boolean;
}

export interface MsgSetRewardReceiverAddress {
  owner: string;
  lockID: Long;
  rewardReceiver: string;
}

export interface MsgSetRewardReceiverAddressResponse {
  success: boolean;
}

function createBaseMsgLockTokens(): MsgLockTokens {
  return { owner: "", duration: undefined, coins: [] };
}

export const MsgLockTokens = {
  encode(message: MsgLockTokens, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLockTokens {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLockTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.duration = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgLockTokens {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgLockTokens): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgLockTokens>, I>>(base?: I): MsgLockTokens {
    return MsgLockTokens.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgLockTokens>, I>>(object: I): MsgLockTokens {
    const message = createBaseMsgLockTokens();
    message.owner = object.owner ?? "";
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgLockTokensResponse(): MsgLockTokensResponse {
  return { ID: Long.UZERO };
}

export const MsgLockTokensResponse = {
  encode(message: MsgLockTokensResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.ID.isZero()) {
      writer.uint32(8).uint64(message.ID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLockTokensResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLockTokensResponse();
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

  fromJSON(object: any): MsgLockTokensResponse {
    return { ID: isSet(object.ID) ? Long.fromValue(object.ID) : Long.UZERO };
  },

  toJSON(message: MsgLockTokensResponse): unknown {
    const obj: any = {};
    if (!message.ID.isZero()) {
      obj.ID = (message.ID || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgLockTokensResponse>, I>>(base?: I): MsgLockTokensResponse {
    return MsgLockTokensResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgLockTokensResponse>, I>>(object: I): MsgLockTokensResponse {
    const message = createBaseMsgLockTokensResponse();
    message.ID = (object.ID !== undefined && object.ID !== null) ? Long.fromValue(object.ID) : Long.UZERO;
    return message;
  },
};

function createBaseMsgBeginUnlockingAll(): MsgBeginUnlockingAll {
  return { owner: "" };
}

export const MsgBeginUnlockingAll = {
  encode(message: MsgBeginUnlockingAll, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBeginUnlockingAll {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBeginUnlockingAll();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBeginUnlockingAll {
    return { owner: isSet(object.owner) ? globalThis.String(object.owner) : "" };
  },

  toJSON(message: MsgBeginUnlockingAll): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBeginUnlockingAll>, I>>(base?: I): MsgBeginUnlockingAll {
    return MsgBeginUnlockingAll.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBeginUnlockingAll>, I>>(object: I): MsgBeginUnlockingAll {
    const message = createBaseMsgBeginUnlockingAll();
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseMsgBeginUnlockingAllResponse(): MsgBeginUnlockingAllResponse {
  return { unlocks: [] };
}

export const MsgBeginUnlockingAllResponse = {
  encode(message: MsgBeginUnlockingAllResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.unlocks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBeginUnlockingAllResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBeginUnlockingAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.unlocks.push(PeriodLock.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBeginUnlockingAllResponse {
    return {
      unlocks: globalThis.Array.isArray(object?.unlocks) ? object.unlocks.map((e: any) => PeriodLock.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgBeginUnlockingAllResponse): unknown {
    const obj: any = {};
    if (message.unlocks?.length) {
      obj.unlocks = message.unlocks.map((e) => PeriodLock.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBeginUnlockingAllResponse>, I>>(base?: I): MsgBeginUnlockingAllResponse {
    return MsgBeginUnlockingAllResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBeginUnlockingAllResponse>, I>>(object: I): MsgBeginUnlockingAllResponse {
    const message = createBaseMsgBeginUnlockingAllResponse();
    message.unlocks = object.unlocks?.map((e) => PeriodLock.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgBeginUnlocking(): MsgBeginUnlocking {
  return { owner: "", ID: Long.UZERO, coins: [] };
}

export const MsgBeginUnlocking = {
  encode(message: MsgBeginUnlocking, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (!message.ID.isZero()) {
      writer.uint32(16).uint64(message.ID);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBeginUnlocking {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBeginUnlocking();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.ID = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBeginUnlocking {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      ID: isSet(object.ID) ? Long.fromValue(object.ID) : Long.UZERO,
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgBeginUnlocking): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (!message.ID.isZero()) {
      obj.ID = (message.ID || Long.UZERO).toString();
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBeginUnlocking>, I>>(base?: I): MsgBeginUnlocking {
    return MsgBeginUnlocking.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBeginUnlocking>, I>>(object: I): MsgBeginUnlocking {
    const message = createBaseMsgBeginUnlocking();
    message.owner = object.owner ?? "";
    message.ID = (object.ID !== undefined && object.ID !== null) ? Long.fromValue(object.ID) : Long.UZERO;
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgBeginUnlockingResponse(): MsgBeginUnlockingResponse {
  return { success: false, unlockingLockID: Long.UZERO };
}

export const MsgBeginUnlockingResponse = {
  encode(message: MsgBeginUnlockingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (!message.unlockingLockID.isZero()) {
      writer.uint32(16).uint64(message.unlockingLockID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBeginUnlockingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBeginUnlockingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.unlockingLockID = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBeginUnlockingResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      unlockingLockID: isSet(object.unlockingLockID) ? Long.fromValue(object.unlockingLockID) : Long.UZERO,
    };
  },

  toJSON(message: MsgBeginUnlockingResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    if (!message.unlockingLockID.isZero()) {
      obj.unlockingLockID = (message.unlockingLockID || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBeginUnlockingResponse>, I>>(base?: I): MsgBeginUnlockingResponse {
    return MsgBeginUnlockingResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBeginUnlockingResponse>, I>>(object: I): MsgBeginUnlockingResponse {
    const message = createBaseMsgBeginUnlockingResponse();
    message.success = object.success ?? false;
    message.unlockingLockID = (object.unlockingLockID !== undefined && object.unlockingLockID !== null)
      ? Long.fromValue(object.unlockingLockID)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgExtendLockup(): MsgExtendLockup {
  return { owner: "", ID: Long.UZERO, duration: undefined };
}

export const MsgExtendLockup = {
  encode(message: MsgExtendLockup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (!message.ID.isZero()) {
      writer.uint32(16).uint64(message.ID);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExtendLockup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExtendLockup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.ID = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.duration = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExtendLockup {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      ID: isSet(object.ID) ? Long.fromValue(object.ID) : Long.UZERO,
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
    };
  },

  toJSON(message: MsgExtendLockup): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (!message.ID.isZero()) {
      obj.ID = (message.ID || Long.UZERO).toString();
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExtendLockup>, I>>(base?: I): MsgExtendLockup {
    return MsgExtendLockup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExtendLockup>, I>>(object: I): MsgExtendLockup {
    const message = createBaseMsgExtendLockup();
    message.owner = object.owner ?? "";
    message.ID = (object.ID !== undefined && object.ID !== null) ? Long.fromValue(object.ID) : Long.UZERO;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    return message;
  },
};

function createBaseMsgExtendLockupResponse(): MsgExtendLockupResponse {
  return { success: false };
}

export const MsgExtendLockupResponse = {
  encode(message: MsgExtendLockupResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExtendLockupResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExtendLockupResponse();
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

  fromJSON(object: any): MsgExtendLockupResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: MsgExtendLockupResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExtendLockupResponse>, I>>(base?: I): MsgExtendLockupResponse {
    return MsgExtendLockupResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExtendLockupResponse>, I>>(object: I): MsgExtendLockupResponse {
    const message = createBaseMsgExtendLockupResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseMsgForceUnlock(): MsgForceUnlock {
  return { owner: "", ID: Long.UZERO, coins: [] };
}

export const MsgForceUnlock = {
  encode(message: MsgForceUnlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (!message.ID.isZero()) {
      writer.uint32(16).uint64(message.ID);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgForceUnlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForceUnlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.ID = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.coins.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgForceUnlock {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      ID: isSet(object.ID) ? Long.fromValue(object.ID) : Long.UZERO,
      coins: globalThis.Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: MsgForceUnlock): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (!message.ID.isZero()) {
      obj.ID = (message.ID || Long.UZERO).toString();
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgForceUnlock>, I>>(base?: I): MsgForceUnlock {
    return MsgForceUnlock.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgForceUnlock>, I>>(object: I): MsgForceUnlock {
    const message = createBaseMsgForceUnlock();
    message.owner = object.owner ?? "";
    message.ID = (object.ID !== undefined && object.ID !== null) ? Long.fromValue(object.ID) : Long.UZERO;
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgForceUnlockResponse(): MsgForceUnlockResponse {
  return { success: false };
}

export const MsgForceUnlockResponse = {
  encode(message: MsgForceUnlockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgForceUnlockResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForceUnlockResponse();
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

  fromJSON(object: any): MsgForceUnlockResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: MsgForceUnlockResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgForceUnlockResponse>, I>>(base?: I): MsgForceUnlockResponse {
    return MsgForceUnlockResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgForceUnlockResponse>, I>>(object: I): MsgForceUnlockResponse {
    const message = createBaseMsgForceUnlockResponse();
    message.success = object.success ?? false;
    return message;
  },
};

function createBaseMsgSetRewardReceiverAddress(): MsgSetRewardReceiverAddress {
  return { owner: "", lockID: Long.UZERO, rewardReceiver: "" };
}

export const MsgSetRewardReceiverAddress = {
  encode(message: MsgSetRewardReceiverAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (!message.lockID.isZero()) {
      writer.uint32(16).uint64(message.lockID);
    }
    if (message.rewardReceiver !== "") {
      writer.uint32(26).string(message.rewardReceiver);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetRewardReceiverAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetRewardReceiverAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lockID = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rewardReceiver = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSetRewardReceiverAddress {
    return {
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      lockID: isSet(object.lockID) ? Long.fromValue(object.lockID) : Long.UZERO,
      rewardReceiver: isSet(object.rewardReceiver) ? globalThis.String(object.rewardReceiver) : "",
    };
  },

  toJSON(message: MsgSetRewardReceiverAddress): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (!message.lockID.isZero()) {
      obj.lockID = (message.lockID || Long.UZERO).toString();
    }
    if (message.rewardReceiver !== "") {
      obj.rewardReceiver = message.rewardReceiver;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetRewardReceiverAddress>, I>>(base?: I): MsgSetRewardReceiverAddress {
    return MsgSetRewardReceiverAddress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetRewardReceiverAddress>, I>>(object: I): MsgSetRewardReceiverAddress {
    const message = createBaseMsgSetRewardReceiverAddress();
    message.owner = object.owner ?? "";
    message.lockID = (object.lockID !== undefined && object.lockID !== null)
      ? Long.fromValue(object.lockID)
      : Long.UZERO;
    message.rewardReceiver = object.rewardReceiver ?? "";
    return message;
  },
};

function createBaseMsgSetRewardReceiverAddressResponse(): MsgSetRewardReceiverAddressResponse {
  return { success: false };
}

export const MsgSetRewardReceiverAddressResponse = {
  encode(message: MsgSetRewardReceiverAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetRewardReceiverAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetRewardReceiverAddressResponse();
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

  fromJSON(object: any): MsgSetRewardReceiverAddressResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: MsgSetRewardReceiverAddressResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSetRewardReceiverAddressResponse>, I>>(
    base?: I,
  ): MsgSetRewardReceiverAddressResponse {
    return MsgSetRewardReceiverAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetRewardReceiverAddressResponse>, I>>(
    object: I,
  ): MsgSetRewardReceiverAddressResponse {
    const message = createBaseMsgSetRewardReceiverAddressResponse();
    message.success = object.success ?? false;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** LockTokens lock tokens */
  LockTokens(request: MsgLockTokens): Promise<MsgLockTokensResponse>;
  /** BeginUnlockingAll begin unlocking all tokens */
  BeginUnlockingAll(request: MsgBeginUnlockingAll): Promise<MsgBeginUnlockingAllResponse>;
  /** MsgBeginUnlocking begins unlocking tokens by lock ID */
  BeginUnlocking(request: MsgBeginUnlocking): Promise<MsgBeginUnlockingResponse>;
  /** MsgEditLockup edits the existing lockups by lock ID */
  ExtendLockup(request: MsgExtendLockup): Promise<MsgExtendLockupResponse>;
  ForceUnlock(request: MsgForceUnlock): Promise<MsgForceUnlockResponse>;
  /** SetRewardReceiverAddress edits the reward receiver for the given lock ID */
  SetRewardReceiverAddress(request: MsgSetRewardReceiverAddress): Promise<MsgSetRewardReceiverAddressResponse>;
}

export const MsgServiceName = "osmosis.lockup.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.LockTokens = this.LockTokens.bind(this);
    this.BeginUnlockingAll = this.BeginUnlockingAll.bind(this);
    this.BeginUnlocking = this.BeginUnlocking.bind(this);
    this.ExtendLockup = this.ExtendLockup.bind(this);
    this.ForceUnlock = this.ForceUnlock.bind(this);
    this.SetRewardReceiverAddress = this.SetRewardReceiverAddress.bind(this);
  }
  LockTokens(request: MsgLockTokens): Promise<MsgLockTokensResponse> {
    const data = MsgLockTokens.encode(request).finish();
    const promise = this.rpc.request(this.service, "LockTokens", data);
    return promise.then((data) => MsgLockTokensResponse.decode(_m0.Reader.create(data)));
  }

  BeginUnlockingAll(request: MsgBeginUnlockingAll): Promise<MsgBeginUnlockingAllResponse> {
    const data = MsgBeginUnlockingAll.encode(request).finish();
    const promise = this.rpc.request(this.service, "BeginUnlockingAll", data);
    return promise.then((data) => MsgBeginUnlockingAllResponse.decode(_m0.Reader.create(data)));
  }

  BeginUnlocking(request: MsgBeginUnlocking): Promise<MsgBeginUnlockingResponse> {
    const data = MsgBeginUnlocking.encode(request).finish();
    const promise = this.rpc.request(this.service, "BeginUnlocking", data);
    return promise.then((data) => MsgBeginUnlockingResponse.decode(_m0.Reader.create(data)));
  }

  ExtendLockup(request: MsgExtendLockup): Promise<MsgExtendLockupResponse> {
    const data = MsgExtendLockup.encode(request).finish();
    const promise = this.rpc.request(this.service, "ExtendLockup", data);
    return promise.then((data) => MsgExtendLockupResponse.decode(_m0.Reader.create(data)));
  }

  ForceUnlock(request: MsgForceUnlock): Promise<MsgForceUnlockResponse> {
    const data = MsgForceUnlock.encode(request).finish();
    const promise = this.rpc.request(this.service, "ForceUnlock", data);
    return promise.then((data) => MsgForceUnlockResponse.decode(_m0.Reader.create(data)));
  }

  SetRewardReceiverAddress(request: MsgSetRewardReceiverAddress): Promise<MsgSetRewardReceiverAddressResponse> {
    const data = MsgSetRewardReceiverAddress.encode(request).finish();
    const promise = this.rpc.request(this.service, "SetRewardReceiverAddress", data);
    return promise.then((data) => MsgSetRewardReceiverAddressResponse.decode(_m0.Reader.create(data)));
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
