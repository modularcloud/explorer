/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ProofSpec } from "../../../../cosmos/ics23/v1/proofs";
import { Duration } from "../../../../google/protobuf/duration";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { SignedHeader } from "../../../../tendermint/types/types";
import { ValidatorSet } from "../../../../tendermint/types/validator";
import { Height } from "../../../core/client/v1/client";
import { MerkleRoot } from "../../../core/commitment/v1/commitment";

export const protobufPackage = "ibc.lightclients.tendermint.v1";

/**
 * ClientState from Tendermint tracks the current validator set, latest height,
 * and a possible frozen height.
 */
export interface ClientState {
  chainId: string;
  trustLevel:
    | Fraction
    | undefined;
  /**
   * duration of the period since the LastestTimestamp during which the
   * submitted headers are valid for upgrade
   */
  trustingPeriod:
    | Duration
    | undefined;
  /** duration of the staking unbonding period */
  unbondingPeriod:
    | Duration
    | undefined;
  /** defines how much new (untrusted) header's Time can drift into the future. */
  maxClockDrift:
    | Duration
    | undefined;
  /** Block height when the client was frozen due to a misbehaviour */
  frozenHeight:
    | Height
    | undefined;
  /** Latest height the client was updated to */
  latestHeight:
    | Height
    | undefined;
  /** Proof specifications used in verifying counterparty state */
  proofSpecs: ProofSpec[];
  /**
   * Path at which next upgraded client will be committed.
   * Each element corresponds to the key for a single CommitmentProof in the
   * chained proof. NOTE: ClientState must stored under
   * `{upgradePath}/{upgradeHeight}/clientState` ConsensusState must be stored
   * under `{upgradepath}/{upgradeHeight}/consensusState` For SDK chains using
   * the default upgrade module, upgrade_path should be []string{"upgrade",
   * "upgradedIBCState"}`
   */
  upgradePath: string[];
  /**
   * allow_update_after_expiry is deprecated
   *
   * @deprecated
   */
  allowUpdateAfterExpiry: boolean;
  /**
   * allow_update_after_misbehaviour is deprecated
   *
   * @deprecated
   */
  allowUpdateAfterMisbehaviour: boolean;
}

/** ConsensusState defines the consensus state from Tendermint. */
export interface ConsensusState {
  /**
   * timestamp that corresponds to the block height in which the ConsensusState
   * was stored.
   */
  timestamp:
    | Date
    | undefined;
  /** commitment root (i.e app hash) */
  root: MerkleRoot | undefined;
  nextValidatorsHash: Uint8Array;
}

/**
 * Misbehaviour is a wrapper over two conflicting Headers
 * that implements Misbehaviour interface expected by ICS-02
 */
export interface Misbehaviour {
  /**
   * ClientID is deprecated
   *
   * @deprecated
   */
  clientId: string;
  header1: Header | undefined;
  header2: Header | undefined;
}

/**
 * Header defines the Tendermint client consensus Header.
 * It encapsulates all the information necessary to update from a trusted
 * Tendermint ConsensusState. The inclusion of TrustedHeight and
 * TrustedValidators allows this update to process correctly, so long as the
 * ConsensusState for the TrustedHeight exists, this removes race conditions
 * among relayers The SignedHeader and ValidatorSet are the new untrusted update
 * fields for the client. The TrustedHeight is the height of a stored
 * ConsensusState on the client that will be used to verify the new untrusted
 * header. The Trusted ConsensusState must be within the unbonding period of
 * current time in order to correctly verify, and the TrustedValidators must
 * hash to TrustedConsensusState.NextValidatorsHash since that is the last
 * trusted validator set at the TrustedHeight.
 */
export interface Header {
  signedHeader: SignedHeader | undefined;
  validatorSet: ValidatorSet | undefined;
  trustedHeight: Height | undefined;
  trustedValidators: ValidatorSet | undefined;
}

/**
 * Fraction defines the protobuf message type for tmmath.Fraction that only
 * supports positive values.
 */
export interface Fraction {
  numerator: Long;
  denominator: Long;
}

function createBaseClientState(): ClientState {
  return {
    chainId: "",
    trustLevel: undefined,
    trustingPeriod: undefined,
    unbondingPeriod: undefined,
    maxClockDrift: undefined,
    frozenHeight: undefined,
    latestHeight: undefined,
    proofSpecs: [],
    upgradePath: [],
    allowUpdateAfterExpiry: false,
    allowUpdateAfterMisbehaviour: false,
  };
}

export const ClientState = {
  encode(message: ClientState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.trustLevel !== undefined) {
      Fraction.encode(message.trustLevel, writer.uint32(18).fork()).ldelim();
    }
    if (message.trustingPeriod !== undefined) {
      Duration.encode(message.trustingPeriod, writer.uint32(26).fork()).ldelim();
    }
    if (message.unbondingPeriod !== undefined) {
      Duration.encode(message.unbondingPeriod, writer.uint32(34).fork()).ldelim();
    }
    if (message.maxClockDrift !== undefined) {
      Duration.encode(message.maxClockDrift, writer.uint32(42).fork()).ldelim();
    }
    if (message.frozenHeight !== undefined) {
      Height.encode(message.frozenHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.latestHeight !== undefined) {
      Height.encode(message.latestHeight, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.proofSpecs) {
      ProofSpec.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.upgradePath) {
      writer.uint32(74).string(v!);
    }
    if (message.allowUpdateAfterExpiry === true) {
      writer.uint32(80).bool(message.allowUpdateAfterExpiry);
    }
    if (message.allowUpdateAfterMisbehaviour === true) {
      writer.uint32(88).bool(message.allowUpdateAfterMisbehaviour);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientState();
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

          message.trustLevel = Fraction.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.trustingPeriod = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.unbondingPeriod = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.maxClockDrift = Duration.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.frozenHeight = Height.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.latestHeight = Height.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proofSpecs.push(ProofSpec.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.upgradePath.push(reader.string());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.allowUpdateAfterExpiry = reader.bool();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.allowUpdateAfterMisbehaviour = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClientState {
    return {
      chainId: isSet(object.chainId) ? globalThis.String(object.chainId) : "",
      trustLevel: isSet(object.trustLevel) ? Fraction.fromJSON(object.trustLevel) : undefined,
      trustingPeriod: isSet(object.trustingPeriod) ? Duration.fromJSON(object.trustingPeriod) : undefined,
      unbondingPeriod: isSet(object.unbondingPeriod) ? Duration.fromJSON(object.unbondingPeriod) : undefined,
      maxClockDrift: isSet(object.maxClockDrift) ? Duration.fromJSON(object.maxClockDrift) : undefined,
      frozenHeight: isSet(object.frozenHeight) ? Height.fromJSON(object.frozenHeight) : undefined,
      latestHeight: isSet(object.latestHeight) ? Height.fromJSON(object.latestHeight) : undefined,
      proofSpecs: globalThis.Array.isArray(object?.proofSpecs)
        ? object.proofSpecs.map((e: any) => ProofSpec.fromJSON(e))
        : [],
      upgradePath: globalThis.Array.isArray(object?.upgradePath)
        ? object.upgradePath.map((e: any) => globalThis.String(e))
        : [],
      allowUpdateAfterExpiry: isSet(object.allowUpdateAfterExpiry)
        ? globalThis.Boolean(object.allowUpdateAfterExpiry)
        : false,
      allowUpdateAfterMisbehaviour: isSet(object.allowUpdateAfterMisbehaviour)
        ? globalThis.Boolean(object.allowUpdateAfterMisbehaviour)
        : false,
    };
  },

  toJSON(message: ClientState): unknown {
    const obj: any = {};
    if (message.chainId !== "") {
      obj.chainId = message.chainId;
    }
    if (message.trustLevel !== undefined) {
      obj.trustLevel = Fraction.toJSON(message.trustLevel);
    }
    if (message.trustingPeriod !== undefined) {
      obj.trustingPeriod = Duration.toJSON(message.trustingPeriod);
    }
    if (message.unbondingPeriod !== undefined) {
      obj.unbondingPeriod = Duration.toJSON(message.unbondingPeriod);
    }
    if (message.maxClockDrift !== undefined) {
      obj.maxClockDrift = Duration.toJSON(message.maxClockDrift);
    }
    if (message.frozenHeight !== undefined) {
      obj.frozenHeight = Height.toJSON(message.frozenHeight);
    }
    if (message.latestHeight !== undefined) {
      obj.latestHeight = Height.toJSON(message.latestHeight);
    }
    if (message.proofSpecs?.length) {
      obj.proofSpecs = message.proofSpecs.map((e) => ProofSpec.toJSON(e));
    }
    if (message.upgradePath?.length) {
      obj.upgradePath = message.upgradePath;
    }
    if (message.allowUpdateAfterExpiry === true) {
      obj.allowUpdateAfterExpiry = message.allowUpdateAfterExpiry;
    }
    if (message.allowUpdateAfterMisbehaviour === true) {
      obj.allowUpdateAfterMisbehaviour = message.allowUpdateAfterMisbehaviour;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClientState>, I>>(base?: I): ClientState {
    return ClientState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClientState>, I>>(object: I): ClientState {
    const message = createBaseClientState();
    message.chainId = object.chainId ?? "";
    message.trustLevel = (object.trustLevel !== undefined && object.trustLevel !== null)
      ? Fraction.fromPartial(object.trustLevel)
      : undefined;
    message.trustingPeriod = (object.trustingPeriod !== undefined && object.trustingPeriod !== null)
      ? Duration.fromPartial(object.trustingPeriod)
      : undefined;
    message.unbondingPeriod = (object.unbondingPeriod !== undefined && object.unbondingPeriod !== null)
      ? Duration.fromPartial(object.unbondingPeriod)
      : undefined;
    message.maxClockDrift = (object.maxClockDrift !== undefined && object.maxClockDrift !== null)
      ? Duration.fromPartial(object.maxClockDrift)
      : undefined;
    message.frozenHeight = (object.frozenHeight !== undefined && object.frozenHeight !== null)
      ? Height.fromPartial(object.frozenHeight)
      : undefined;
    message.latestHeight = (object.latestHeight !== undefined && object.latestHeight !== null)
      ? Height.fromPartial(object.latestHeight)
      : undefined;
    message.proofSpecs = object.proofSpecs?.map((e) => ProofSpec.fromPartial(e)) || [];
    message.upgradePath = object.upgradePath?.map((e) => e) || [];
    message.allowUpdateAfterExpiry = object.allowUpdateAfterExpiry ?? false;
    message.allowUpdateAfterMisbehaviour = object.allowUpdateAfterMisbehaviour ?? false;
    return message;
  },
};

function createBaseConsensusState(): ConsensusState {
  return { timestamp: undefined, root: undefined, nextValidatorsHash: new Uint8Array(0) };
}

export const ConsensusState = {
  encode(message: ConsensusState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    if (message.root !== undefined) {
      MerkleRoot.encode(message.root, writer.uint32(18).fork()).ldelim();
    }
    if (message.nextValidatorsHash.length !== 0) {
      writer.uint32(26).bytes(message.nextValidatorsHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.root = MerkleRoot.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nextValidatorsHash = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConsensusState {
    return {
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      root: isSet(object.root) ? MerkleRoot.fromJSON(object.root) : undefined,
      nextValidatorsHash: isSet(object.nextValidatorsHash)
        ? bytesFromBase64(object.nextValidatorsHash)
        : new Uint8Array(0),
    };
  },

  toJSON(message: ConsensusState): unknown {
    const obj: any = {};
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.root !== undefined) {
      obj.root = MerkleRoot.toJSON(message.root);
    }
    if (message.nextValidatorsHash.length !== 0) {
      obj.nextValidatorsHash = base64FromBytes(message.nextValidatorsHash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ConsensusState>, I>>(base?: I): ConsensusState {
    return ConsensusState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConsensusState>, I>>(object: I): ConsensusState {
    const message = createBaseConsensusState();
    message.timestamp = object.timestamp ?? undefined;
    message.root = (object.root !== undefined && object.root !== null)
      ? MerkleRoot.fromPartial(object.root)
      : undefined;
    message.nextValidatorsHash = object.nextValidatorsHash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMisbehaviour(): Misbehaviour {
  return { clientId: "", header1: undefined, header2: undefined };
}

export const Misbehaviour = {
  encode(message: Misbehaviour, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.header1 !== undefined) {
      Header.encode(message.header1, writer.uint32(18).fork()).ldelim();
    }
    if (message.header2 !== undefined) {
      Header.encode(message.header2, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Misbehaviour {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMisbehaviour();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.header1 = Header.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.header2 = Header.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Misbehaviour {
    return {
      clientId: isSet(object.clientId) ? globalThis.String(object.clientId) : "",
      header1: isSet(object.header1) ? Header.fromJSON(object.header1) : undefined,
      header2: isSet(object.header2) ? Header.fromJSON(object.header2) : undefined,
    };
  },

  toJSON(message: Misbehaviour): unknown {
    const obj: any = {};
    if (message.clientId !== "") {
      obj.clientId = message.clientId;
    }
    if (message.header1 !== undefined) {
      obj.header1 = Header.toJSON(message.header1);
    }
    if (message.header2 !== undefined) {
      obj.header2 = Header.toJSON(message.header2);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Misbehaviour>, I>>(base?: I): Misbehaviour {
    return Misbehaviour.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Misbehaviour>, I>>(object: I): Misbehaviour {
    const message = createBaseMisbehaviour();
    message.clientId = object.clientId ?? "";
    message.header1 = (object.header1 !== undefined && object.header1 !== null)
      ? Header.fromPartial(object.header1)
      : undefined;
    message.header2 = (object.header2 !== undefined && object.header2 !== null)
      ? Header.fromPartial(object.header2)
      : undefined;
    return message;
  },
};

function createBaseHeader(): Header {
  return { signedHeader: undefined, validatorSet: undefined, trustedHeight: undefined, trustedValidators: undefined };
}

export const Header = {
  encode(message: Header, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signedHeader !== undefined) {
      SignedHeader.encode(message.signedHeader, writer.uint32(10).fork()).ldelim();
    }
    if (message.validatorSet !== undefined) {
      ValidatorSet.encode(message.validatorSet, writer.uint32(18).fork()).ldelim();
    }
    if (message.trustedHeight !== undefined) {
      Height.encode(message.trustedHeight, writer.uint32(26).fork()).ldelim();
    }
    if (message.trustedValidators !== undefined) {
      ValidatorSet.encode(message.trustedValidators, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.signedHeader = SignedHeader.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.validatorSet = ValidatorSet.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.trustedHeight = Height.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.trustedValidators = ValidatorSet.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Header {
    return {
      signedHeader: isSet(object.signedHeader) ? SignedHeader.fromJSON(object.signedHeader) : undefined,
      validatorSet: isSet(object.validatorSet) ? ValidatorSet.fromJSON(object.validatorSet) : undefined,
      trustedHeight: isSet(object.trustedHeight) ? Height.fromJSON(object.trustedHeight) : undefined,
      trustedValidators: isSet(object.trustedValidators) ? ValidatorSet.fromJSON(object.trustedValidators) : undefined,
    };
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    if (message.signedHeader !== undefined) {
      obj.signedHeader = SignedHeader.toJSON(message.signedHeader);
    }
    if (message.validatorSet !== undefined) {
      obj.validatorSet = ValidatorSet.toJSON(message.validatorSet);
    }
    if (message.trustedHeight !== undefined) {
      obj.trustedHeight = Height.toJSON(message.trustedHeight);
    }
    if (message.trustedValidators !== undefined) {
      obj.trustedValidators = ValidatorSet.toJSON(message.trustedValidators);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Header>, I>>(base?: I): Header {
    return Header.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Header>, I>>(object: I): Header {
    const message = createBaseHeader();
    message.signedHeader = (object.signedHeader !== undefined && object.signedHeader !== null)
      ? SignedHeader.fromPartial(object.signedHeader)
      : undefined;
    message.validatorSet = (object.validatorSet !== undefined && object.validatorSet !== null)
      ? ValidatorSet.fromPartial(object.validatorSet)
      : undefined;
    message.trustedHeight = (object.trustedHeight !== undefined && object.trustedHeight !== null)
      ? Height.fromPartial(object.trustedHeight)
      : undefined;
    message.trustedValidators = (object.trustedValidators !== undefined && object.trustedValidators !== null)
      ? ValidatorSet.fromPartial(object.trustedValidators)
      : undefined;
    return message;
  },
};

function createBaseFraction(): Fraction {
  return { numerator: Long.UZERO, denominator: Long.UZERO };
}

export const Fraction = {
  encode(message: Fraction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.numerator.isZero()) {
      writer.uint32(8).uint64(message.numerator);
    }
    if (!message.denominator.isZero()) {
      writer.uint32(16).uint64(message.denominator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fraction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFraction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.numerator = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.denominator = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Fraction {
    return {
      numerator: isSet(object.numerator) ? Long.fromValue(object.numerator) : Long.UZERO,
      denominator: isSet(object.denominator) ? Long.fromValue(object.denominator) : Long.UZERO,
    };
  },

  toJSON(message: Fraction): unknown {
    const obj: any = {};
    if (!message.numerator.isZero()) {
      obj.numerator = (message.numerator || Long.UZERO).toString();
    }
    if (!message.denominator.isZero()) {
      obj.denominator = (message.denominator || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Fraction>, I>>(base?: I): Fraction {
    return Fraction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Fraction>, I>>(object: I): Fraction {
    const message = createBaseFraction();
    message.numerator = (object.numerator !== undefined && object.numerator !== null)
      ? Long.fromValue(object.numerator)
      : Long.UZERO;
    message.denominator = (object.denominator !== undefined && object.denominator !== null)
      ? Long.fromValue(object.denominator)
      : Long.UZERO;
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
