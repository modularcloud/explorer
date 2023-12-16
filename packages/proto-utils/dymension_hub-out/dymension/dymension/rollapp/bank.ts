/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dymensionxyz.dymension.rollapp";

/**
 * DenomUnit represents a struct that describes a given
 * denomination unit of the basic token.
 */
export interface DenomUnit {
  /** denom represents the string name of the given denom unit (e.g uatom). */
  denom: string;
  /**
   * exponent represents power of 10 exponent that one must
   * raise the base_denom to in order to equal the given DenomUnit's denom
   * 1 denom = 10^exponent base_denom
   * (e.g. with a base_denom of uatom, one can create a DenomUnit of 'atom' with
   * exponent = 6, thus: 1 atom = 10^6 uatom).
   */
  exponent: number;
  /** aliases is a list of string aliases for the given denom */
  aliases: string[];
}

/**
 * Metadata represents a struct that describes
 * a basic token.
 */
export interface TokenMetadata {
  description: string;
  /** denom_units represents the list of DenomUnit's for a given coin */
  denomUnits: DenomUnit[];
  /** base represents the base denom (should be the DenomUnit with exponent = 0). */
  base: string;
  /**
   * display indicates the suggested denom that should be
   * displayed in clients.
   */
  display: string;
  /**
   * name defines the name of the token (eg: Cosmos Atom)
   *
   * Since: cosmos-sdk 0.43
   */
  name: string;
  /**
   * symbol is the token symbol usually shown on exchanges (eg: ATOM). This can
   * be the same as the display.
   *
   * Since: cosmos-sdk 0.43
   */
  symbol: string;
  /**
   * URI to a document (on or off-chain) that contains additional information. Optional.
   *
   * Since: cosmos-sdk 0.46
   */
  uri: string;
  /**
   * URIHash is a sha256 hash of a document pointed by URI. It's used to verify that
   * the document didn't change. Optional.
   *
   * Since: cosmos-sdk 0.46
   */
  uriHash: string;
}

function createBaseDenomUnit(): DenomUnit {
  return { denom: "", exponent: 0, aliases: [] };
}

export const DenomUnit = {
  encode(message: DenomUnit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.exponent !== 0) {
      writer.uint32(16).uint32(message.exponent);
    }
    for (const v of message.aliases) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DenomUnit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenomUnit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.exponent = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.aliases.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DenomUnit {
    return {
      denom: isSet(object.denom) ? globalThis.String(object.denom) : "",
      exponent: isSet(object.exponent) ? globalThis.Number(object.exponent) : 0,
      aliases: globalThis.Array.isArray(object?.aliases) ? object.aliases.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: DenomUnit): unknown {
    const obj: any = {};
    if (message.denom !== "") {
      obj.denom = message.denom;
    }
    if (message.exponent !== 0) {
      obj.exponent = Math.round(message.exponent);
    }
    if (message.aliases?.length) {
      obj.aliases = message.aliases;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DenomUnit>, I>>(base?: I): DenomUnit {
    return DenomUnit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DenomUnit>, I>>(object: I): DenomUnit {
    const message = createBaseDenomUnit();
    message.denom = object.denom ?? "";
    message.exponent = object.exponent ?? 0;
    message.aliases = object.aliases?.map((e) => e) || [];
    return message;
  },
};

function createBaseTokenMetadata(): TokenMetadata {
  return { description: "", denomUnits: [], base: "", display: "", name: "", symbol: "", uri: "", uriHash: "" };
}

export const TokenMetadata = {
  encode(message: TokenMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    for (const v of message.denomUnits) {
      DenomUnit.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.base !== "") {
      writer.uint32(26).string(message.base);
    }
    if (message.display !== "") {
      writer.uint32(34).string(message.display);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(50).string(message.symbol);
    }
    if (message.uri !== "") {
      writer.uint32(58).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(66).string(message.uriHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.denomUnits.push(DenomUnit.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.base = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.display = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.name = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.uriHash = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TokenMetadata {
    return {
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      denomUnits: globalThis.Array.isArray(object?.denomUnits)
        ? object.denomUnits.map((e: any) => DenomUnit.fromJSON(e))
        : [],
      base: isSet(object.base) ? globalThis.String(object.base) : "",
      display: isSet(object.display) ? globalThis.String(object.display) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      symbol: isSet(object.symbol) ? globalThis.String(object.symbol) : "",
      uri: isSet(object.uri) ? globalThis.String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? globalThis.String(object.uriHash) : "",
    };
  },

  toJSON(message: TokenMetadata): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.denomUnits?.length) {
      obj.denomUnits = message.denomUnits.map((e) => DenomUnit.toJSON(e));
    }
    if (message.base !== "") {
      obj.base = message.base;
    }
    if (message.display !== "") {
      obj.display = message.display;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.symbol !== "") {
      obj.symbol = message.symbol;
    }
    if (message.uri !== "") {
      obj.uri = message.uri;
    }
    if (message.uriHash !== "") {
      obj.uriHash = message.uriHash;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TokenMetadata>, I>>(base?: I): TokenMetadata {
    return TokenMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TokenMetadata>, I>>(object: I): TokenMetadata {
    const message = createBaseTokenMetadata();
    message.description = object.description ?? "";
    message.denomUnits = object.denomUnits?.map((e) => DenomUnit.fromPartial(e)) || [];
    message.base = object.base ?? "";
    message.display = object.display ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
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
