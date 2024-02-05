/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osmosis.cosmwasmpool.v1beta1";

/**
 * UploadCosmWasmPoolCodeAndWhiteListProposal is a gov Content type for
 * uploading coswasm pool code and adding it to internal whitelist. Only the
 * code ids created by this message are eligible for being x/cosmwasmpool pools.
 */
export interface UploadCosmWasmPoolCodeAndWhiteListProposal {
  title: string;
  description: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasmByteCode: Uint8Array;
}

/**
 * MigratePoolContractsProposal is a gov Content type for
 * migrating  given pools to the new contract code and adding to internal
 * whitelist if needed. It has two options to perform the migration:
 *
 * 1. If the codeID is non-zero, it will migrate the pool contracts to a given
 * codeID assuming that it has already been uploaded. uploadByteCode must be
 * empty in such a case. Fails if codeID does not exist. Fails if uploadByteCode
 * is not empty.
 *
 * 2. If the codeID is zero, it will upload the given uploadByteCode and use the
 * new resulting code id to migrate the pool to. Errors if uploadByteCode is
 * empty or invalid.
 *
 * In both cases, if one of the pools specified by the given poolID does not
 * exist, the proposal fails.
 *
 * The reason for having poolIDs be a slice of ids is to account for the
 * potential need for emergency migration of all old code ids associated with
 * particular pools to new code ids, or simply having the flexibility of
 * migrating multiple older pool contracts to a new one at once when there is a
 * release.
 *
 * poolD count to be submitted at once is gated by a governance paramets (20 at
 * launch). The proposal fails if more. Note that 20 was chosen arbitrarily to
 * have a constant bound on the number of pools migrated at once. This size will
 * be configured by a module parameter so it can be changed by a constant.
 */
export interface MigratePoolContractsProposal {
  title: string;
  description: string;
  /**
   * pool_ids are the pool ids of the contracts to be migrated
   * either to the new_code_id that is already uploaded to chain or to
   * the given wasm_byte_code.
   */
  poolIds: Long[];
  /**
   * new_code_id is the code id of the contract code to migrate to.
   * Assumes that the code is already uploaded to chain. Only one of
   * new_code_id and wasm_byte_code should be set.
   */
  newCodeId: Long;
  /**
   * WASMByteCode can be raw or gzip compressed. Assumes that the code id
   * has not been uploaded yet so uploads the given code and migrates to it.
   * Only one of new_code_id and wasm_byte_code should be set.
   */
  wasmByteCode: Uint8Array;
  /** MigrateMsg migrate message to be used for migrating the pool contracts. */
  migrateMsg: Uint8Array;
}

function createBaseUploadCosmWasmPoolCodeAndWhiteListProposal(): UploadCosmWasmPoolCodeAndWhiteListProposal {
  return { title: "", description: "", wasmByteCode: new Uint8Array(0) };
}

export const UploadCosmWasmPoolCodeAndWhiteListProposal = {
  encode(message: UploadCosmWasmPoolCodeAndWhiteListProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.wasmByteCode.length !== 0) {
      writer.uint32(26).bytes(message.wasmByteCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadCosmWasmPoolCodeAndWhiteListProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadCosmWasmPoolCodeAndWhiteListProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.wasmByteCode = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UploadCosmWasmPoolCodeAndWhiteListProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      wasmByteCode: isSet(object.wasmByteCode) ? bytesFromBase64(object.wasmByteCode) : new Uint8Array(0),
    };
  },

  toJSON(message: UploadCosmWasmPoolCodeAndWhiteListProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.wasmByteCode.length !== 0) {
      obj.wasmByteCode = base64FromBytes(message.wasmByteCode);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UploadCosmWasmPoolCodeAndWhiteListProposal>, I>>(
    base?: I,
  ): UploadCosmWasmPoolCodeAndWhiteListProposal {
    return UploadCosmWasmPoolCodeAndWhiteListProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UploadCosmWasmPoolCodeAndWhiteListProposal>, I>>(
    object: I,
  ): UploadCosmWasmPoolCodeAndWhiteListProposal {
    const message = createBaseUploadCosmWasmPoolCodeAndWhiteListProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.wasmByteCode = object.wasmByteCode ?? new Uint8Array(0);
    return message;
  },
};

function createBaseMigratePoolContractsProposal(): MigratePoolContractsProposal {
  return {
    title: "",
    description: "",
    poolIds: [],
    newCodeId: Long.UZERO,
    wasmByteCode: new Uint8Array(0),
    migrateMsg: new Uint8Array(0),
  };
}

export const MigratePoolContractsProposal = {
  encode(message: MigratePoolContractsProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    writer.uint32(26).fork();
    for (const v of message.poolIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (!message.newCodeId.isZero()) {
      writer.uint32(32).uint64(message.newCodeId);
    }
    if (message.wasmByteCode.length !== 0) {
      writer.uint32(42).bytes(message.wasmByteCode);
    }
    if (message.migrateMsg.length !== 0) {
      writer.uint32(50).bytes(message.migrateMsg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MigratePoolContractsProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMigratePoolContractsProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.title = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag === 24) {
            message.poolIds.push(reader.uint64() as Long);

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.poolIds.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.newCodeId = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.wasmByteCode = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.migrateMsg = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MigratePoolContractsProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      poolIds: globalThis.Array.isArray(object?.poolIds) ? object.poolIds.map((e: any) => Long.fromValue(e)) : [],
      newCodeId: isSet(object.newCodeId) ? Long.fromValue(object.newCodeId) : Long.UZERO,
      wasmByteCode: isSet(object.wasmByteCode) ? bytesFromBase64(object.wasmByteCode) : new Uint8Array(0),
      migrateMsg: isSet(object.migrateMsg) ? bytesFromBase64(object.migrateMsg) : new Uint8Array(0),
    };
  },

  toJSON(message: MigratePoolContractsProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.poolIds?.length) {
      obj.poolIds = message.poolIds.map((e) => (e || Long.UZERO).toString());
    }
    if (!message.newCodeId.isZero()) {
      obj.newCodeId = (message.newCodeId || Long.UZERO).toString();
    }
    if (message.wasmByteCode.length !== 0) {
      obj.wasmByteCode = base64FromBytes(message.wasmByteCode);
    }
    if (message.migrateMsg.length !== 0) {
      obj.migrateMsg = base64FromBytes(message.migrateMsg);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MigratePoolContractsProposal>, I>>(base?: I): MigratePoolContractsProposal {
    return MigratePoolContractsProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MigratePoolContractsProposal>, I>>(object: I): MigratePoolContractsProposal {
    const message = createBaseMigratePoolContractsProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.poolIds = object.poolIds?.map((e) => Long.fromValue(e)) || [];
    message.newCodeId = (object.newCodeId !== undefined && object.newCodeId !== null)
      ? Long.fromValue(object.newCodeId)
      : Long.UZERO;
    message.wasmByteCode = object.wasmByteCode ?? new Uint8Array(0);
    message.migrateMsg = object.migrateMsg ?? new Uint8Array(0);
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
