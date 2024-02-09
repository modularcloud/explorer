/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.valsetpref.v1beta1";

/**
 * ValidatorPreference defines the message structure for
 * CreateValidatorSetPreference. It allows a user to set {val_addr, weight} in
 * state. If a user does not have a validator set preference list set, and has
 * staked, make their preference list default to their current staking
 * distribution.
 */
export interface ValidatorPreference {
  /**
   * val_oper_address holds the validator address the user wants to delegate
   * funds to.
   */
  valOperAddress: string;
  /** weight is decimal between 0 and 1, and they all sum to 1. */
  weight: string;
}

/**
 * ValidatorSetPreferences defines a delegator's validator set preference.
 * It contains a list of (validator, percent_allocation) pairs.
 * The percent allocation are arranged in decimal notation from 0 to 1 and must
 * add up to 1.
 */
export interface ValidatorSetPreferences {
  /** preference holds {valAddr, weight} for the user who created it. */
  preferences: ValidatorPreference[];
}

function createBaseValidatorPreference(): ValidatorPreference {
  return { valOperAddress: "", weight: "" };
}

export const ValidatorPreference = {
  encode(message: ValidatorPreference, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.valOperAddress !== "") {
      writer.uint32(10).string(message.valOperAddress);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorPreference {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorPreference();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.valOperAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.weight = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorPreference {
    return {
      valOperAddress: isSet(object.valOperAddress) ? globalThis.String(object.valOperAddress) : "",
      weight: isSet(object.weight) ? globalThis.String(object.weight) : "",
    };
  },

  toJSON(message: ValidatorPreference): unknown {
    const obj: any = {};
    if (message.valOperAddress !== "") {
      obj.valOperAddress = message.valOperAddress;
    }
    if (message.weight !== "") {
      obj.weight = message.weight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorPreference>, I>>(base?: I): ValidatorPreference {
    return ValidatorPreference.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorPreference>, I>>(object: I): ValidatorPreference {
    const message = createBaseValidatorPreference();
    message.valOperAddress = object.valOperAddress ?? "";
    message.weight = object.weight ?? "";
    return message;
  },
};

function createBaseValidatorSetPreferences(): ValidatorSetPreferences {
  return { preferences: [] };
}

export const ValidatorSetPreferences = {
  encode(message: ValidatorSetPreferences, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.preferences) {
      ValidatorPreference.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSetPreferences {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSetPreferences();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.preferences.push(ValidatorPreference.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorSetPreferences {
    return {
      preferences: globalThis.Array.isArray(object?.preferences)
        ? object.preferences.map((e: any) => ValidatorPreference.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ValidatorSetPreferences): unknown {
    const obj: any = {};
    if (message.preferences?.length) {
      obj.preferences = message.preferences.map((e) => ValidatorPreference.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorSetPreferences>, I>>(base?: I): ValidatorSetPreferences {
    return ValidatorSetPreferences.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorSetPreferences>, I>>(object: I): ValidatorSetPreferences {
    const message = createBaseValidatorSetPreferences();
    message.preferences = object.preferences?.map((e) => ValidatorPreference.fromPartial(e)) || [];
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
