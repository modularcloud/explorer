/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.accounts.v1";

/** GenesisState defines the accounts' module's genesis state. */
export interface GenesisState {
  /** account_number is the latest account number. */
  accountNumber: Long;
  /** accounts are the genesis accounts. */
  accounts: GenesisAccount[];
}

/** GenesisAccount defines an account to be initialized in the genesis state. */
export interface GenesisAccount {
  /** address is the address of the account. */
  address: string;
  /** account_type is the account type of the account. */
  accountType: string;
  /** account_number is the account number of the account. */
  accountNumber: Long;
  /** state is the account state represented as a slice of raw key value byte pairs. */
  state: KVPair[];
}

/** KVPair defines a key value pair. */
export interface KVPair {
  /** key is the key of the pair. */
  key: Uint8Array;
  /** value is the value of the pair. */
  value: Uint8Array;
}

function createBaseGenesisState(): GenesisState {
  return { accountNumber: Long.UZERO, accounts: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.accountNumber.isZero()) {
      writer.uint32(8).uint64(message.accountNumber);
    }
    for (const v of message.accounts) {
      GenesisAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.accountNumber = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accounts.push(GenesisAccount.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      accountNumber: isSet(object.accountNumber) ? Long.fromValue(object.accountNumber) : Long.UZERO,
      accounts: globalThis.Array.isArray(object?.accounts)
        ? object.accounts.map((e: any) => GenesisAccount.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (!message.accountNumber.isZero()) {
      obj.accountNumber = (message.accountNumber || Long.UZERO).toString();
    }
    if (message.accounts?.length) {
      obj.accounts = message.accounts.map((e) => GenesisAccount.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.accountNumber = (object.accountNumber !== undefined && object.accountNumber !== null)
      ? Long.fromValue(object.accountNumber)
      : Long.UZERO;
    message.accounts = object.accounts?.map((e) => GenesisAccount.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGenesisAccount(): GenesisAccount {
  return { address: "", accountType: "", accountNumber: Long.UZERO, state: [] };
}

export const GenesisAccount = {
  encode(message: GenesisAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.accountType !== "") {
      writer.uint32(18).string(message.accountType);
    }
    if (!message.accountNumber.isZero()) {
      writer.uint32(24).uint64(message.accountNumber);
    }
    for (const v of message.state) {
      KVPair.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.accountType = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.accountNumber = reader.uint64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.state.push(KVPair.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisAccount {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      accountType: isSet(object.accountType) ? globalThis.String(object.accountType) : "",
      accountNumber: isSet(object.accountNumber) ? Long.fromValue(object.accountNumber) : Long.UZERO,
      state: globalThis.Array.isArray(object?.state) ? object.state.map((e: any) => KVPair.fromJSON(e)) : [],
    };
  },

  toJSON(message: GenesisAccount): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.accountType !== "") {
      obj.accountType = message.accountType;
    }
    if (!message.accountNumber.isZero()) {
      obj.accountNumber = (message.accountNumber || Long.UZERO).toString();
    }
    if (message.state?.length) {
      obj.state = message.state.map((e) => KVPair.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisAccount>, I>>(base?: I): GenesisAccount {
    return GenesisAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisAccount>, I>>(object: I): GenesisAccount {
    const message = createBaseGenesisAccount();
    message.address = object.address ?? "";
    message.accountType = object.accountType ?? "";
    message.accountNumber = (object.accountNumber !== undefined && object.accountNumber !== null)
      ? Long.fromValue(object.accountNumber)
      : Long.UZERO;
    message.state = object.state?.map((e) => KVPair.fromPartial(e)) || [];
    return message;
  },
};

function createBaseKVPair(): KVPair {
  return { key: new Uint8Array(0), value: new Uint8Array(0) };
}

export const KVPair = {
  encode(message: KVPair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KVPair {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKVPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KVPair {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: KVPair): unknown {
    const obj: any = {};
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<KVPair>, I>>(base?: I): KVPair {
    return KVPair.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<KVPair>, I>>(object: I): KVPair {
    const message = createBaseKVPair();
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
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
