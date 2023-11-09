/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.base.snapshots.v1beta1";

/** Snapshot contains Tendermint state sync snapshot info. */
export interface Snapshot {
  height: Long;
  format: number;
  chunks: number;
  hash: Uint8Array;
  metadata: Metadata | undefined;
}

/** Metadata contains SDK-specific snapshot metadata. */
export interface Metadata {
  /** SHA-256 chunk hashes */
  chunkHashes: Uint8Array[];
}

/**
 * SnapshotItem is an item contained in a rootmulti.Store snapshot.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotItem {
  store?: SnapshotStoreItem | undefined;
  iavl?: SnapshotIAVLItem | undefined;
  extension?: SnapshotExtensionMeta | undefined;
  extensionPayload?: SnapshotExtensionPayload | undefined;
  kv?: SnapshotKVItem | undefined;
  schema?: SnapshotSchema | undefined;
}

/**
 * SnapshotStoreItem contains metadata about a snapshotted store.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotStoreItem {
  name: string;
}

/**
 * SnapshotIAVLItem is an exported IAVL node.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotIAVLItem {
  key: Uint8Array;
  value: Uint8Array;
  /** version is block height */
  version: Long;
  /** height is depth of the tree. */
  height: number;
}

/**
 * SnapshotExtensionMeta contains metadata about an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionMeta {
  name: string;
  format: number;
}

/**
 * SnapshotExtensionPayload contains payloads of an external snapshotter.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotExtensionPayload {
  payload: Uint8Array;
}

/**
 * SnapshotKVItem is an exported Key/Value Pair
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotKVItem {
  key: Uint8Array;
  value: Uint8Array;
}

/**
 * SnapshotSchema is an exported schema of smt store
 *
 * Since: cosmos-sdk 0.46
 */
export interface SnapshotSchema {
  keys: Uint8Array[];
}

function createBaseSnapshot(): Snapshot {
  return { height: Long.UZERO, format: 0, chunks: 0, hash: new Uint8Array(0), metadata: undefined };
}

export const Snapshot = {
  encode(message: Snapshot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunks !== 0) {
      writer.uint32(24).uint32(message.chunks);
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Snapshot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.format = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.chunks = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hash = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.metadata = Metadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Snapshot {
    return {
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      format: isSet(object.format) ? globalThis.Number(object.format) : 0,
      chunks: isSet(object.chunks) ? globalThis.Number(object.chunks) : 0,
      hash: isSet(object.hash) ? bytesFromBase64(object.hash) : new Uint8Array(0),
      metadata: isSet(object.metadata) ? Metadata.fromJSON(object.metadata) : undefined,
    };
  },

  toJSON(message: Snapshot): unknown {
    const obj: any = {};
    if (!message.height.isZero()) {
      obj.height = (message.height || Long.UZERO).toString();
    }
    if (message.format !== 0) {
      obj.format = Math.round(message.format);
    }
    if (message.chunks !== 0) {
      obj.chunks = Math.round(message.chunks);
    }
    if (message.hash.length !== 0) {
      obj.hash = base64FromBytes(message.hash);
    }
    if (message.metadata !== undefined) {
      obj.metadata = Metadata.toJSON(message.metadata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Snapshot>, I>>(base?: I): Snapshot {
    return Snapshot.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Snapshot>, I>>(object: I): Snapshot {
    const message = createBaseSnapshot();
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.UZERO;
    message.format = object.format ?? 0;
    message.chunks = object.chunks ?? 0;
    message.hash = object.hash ?? new Uint8Array(0);
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Metadata.fromPartial(object.metadata)
      : undefined;
    return message;
  },
};

function createBaseMetadata(): Metadata {
  return { chunkHashes: [] };
}

export const Metadata = {
  encode(message: Metadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.chunkHashes) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chunkHashes.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      chunkHashes: globalThis.Array.isArray(object?.chunkHashes)
        ? object.chunkHashes.map((e: any) => bytesFromBase64(e))
        : [],
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    if (message.chunkHashes?.length) {
      obj.chunkHashes = message.chunkHashes.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Metadata>, I>>(base?: I): Metadata {
    return Metadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.chunkHashes = object.chunkHashes?.map((e) => e) || [];
    return message;
  },
};

function createBaseSnapshotItem(): SnapshotItem {
  return {
    store: undefined,
    iavl: undefined,
    extension: undefined,
    extensionPayload: undefined,
    kv: undefined,
    schema: undefined,
  };
}

export const SnapshotItem = {
  encode(message: SnapshotItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.store !== undefined) {
      SnapshotStoreItem.encode(message.store, writer.uint32(10).fork()).ldelim();
    }
    if (message.iavl !== undefined) {
      SnapshotIAVLItem.encode(message.iavl, writer.uint32(18).fork()).ldelim();
    }
    if (message.extension !== undefined) {
      SnapshotExtensionMeta.encode(message.extension, writer.uint32(26).fork()).ldelim();
    }
    if (message.extensionPayload !== undefined) {
      SnapshotExtensionPayload.encode(message.extensionPayload, writer.uint32(34).fork()).ldelim();
    }
    if (message.kv !== undefined) {
      SnapshotKVItem.encode(message.kv, writer.uint32(42).fork()).ldelim();
    }
    if (message.schema !== undefined) {
      SnapshotSchema.encode(message.schema, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.store = SnapshotStoreItem.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.iavl = SnapshotIAVLItem.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.extension = SnapshotExtensionMeta.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.extensionPayload = SnapshotExtensionPayload.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.kv = SnapshotKVItem.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.schema = SnapshotSchema.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SnapshotItem {
    return {
      store: isSet(object.store) ? SnapshotStoreItem.fromJSON(object.store) : undefined,
      iavl: isSet(object.iavl) ? SnapshotIAVLItem.fromJSON(object.iavl) : undefined,
      extension: isSet(object.extension) ? SnapshotExtensionMeta.fromJSON(object.extension) : undefined,
      extensionPayload: isSet(object.extensionPayload)
        ? SnapshotExtensionPayload.fromJSON(object.extensionPayload)
        : undefined,
      kv: isSet(object.kv) ? SnapshotKVItem.fromJSON(object.kv) : undefined,
      schema: isSet(object.schema) ? SnapshotSchema.fromJSON(object.schema) : undefined,
    };
  },

  toJSON(message: SnapshotItem): unknown {
    const obj: any = {};
    if (message.store !== undefined) {
      obj.store = SnapshotStoreItem.toJSON(message.store);
    }
    if (message.iavl !== undefined) {
      obj.iavl = SnapshotIAVLItem.toJSON(message.iavl);
    }
    if (message.extension !== undefined) {
      obj.extension = SnapshotExtensionMeta.toJSON(message.extension);
    }
    if (message.extensionPayload !== undefined) {
      obj.extensionPayload = SnapshotExtensionPayload.toJSON(message.extensionPayload);
    }
    if (message.kv !== undefined) {
      obj.kv = SnapshotKVItem.toJSON(message.kv);
    }
    if (message.schema !== undefined) {
      obj.schema = SnapshotSchema.toJSON(message.schema);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SnapshotItem>, I>>(base?: I): SnapshotItem {
    return SnapshotItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotItem>, I>>(object: I): SnapshotItem {
    const message = createBaseSnapshotItem();
    message.store = (object.store !== undefined && object.store !== null)
      ? SnapshotStoreItem.fromPartial(object.store)
      : undefined;
    message.iavl = (object.iavl !== undefined && object.iavl !== null)
      ? SnapshotIAVLItem.fromPartial(object.iavl)
      : undefined;
    message.extension = (object.extension !== undefined && object.extension !== null)
      ? SnapshotExtensionMeta.fromPartial(object.extension)
      : undefined;
    message.extensionPayload = (object.extensionPayload !== undefined && object.extensionPayload !== null)
      ? SnapshotExtensionPayload.fromPartial(object.extensionPayload)
      : undefined;
    message.kv = (object.kv !== undefined && object.kv !== null) ? SnapshotKVItem.fromPartial(object.kv) : undefined;
    message.schema = (object.schema !== undefined && object.schema !== null)
      ? SnapshotSchema.fromPartial(object.schema)
      : undefined;
    return message;
  },
};

function createBaseSnapshotStoreItem(): SnapshotStoreItem {
  return { name: "" };
}

export const SnapshotStoreItem = {
  encode(message: SnapshotStoreItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotStoreItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotStoreItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SnapshotStoreItem {
    return { name: isSet(object.name) ? globalThis.String(object.name) : "" };
  },

  toJSON(message: SnapshotStoreItem): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SnapshotStoreItem>, I>>(base?: I): SnapshotStoreItem {
    return SnapshotStoreItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotStoreItem>, I>>(object: I): SnapshotStoreItem {
    const message = createBaseSnapshotStoreItem();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseSnapshotIAVLItem(): SnapshotIAVLItem {
  return { key: new Uint8Array(0), value: new Uint8Array(0), version: Long.ZERO, height: 0 };
}

export const SnapshotIAVLItem = {
  encode(message: SnapshotIAVLItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    if (!message.version.isZero()) {
      writer.uint32(24).int64(message.version);
    }
    if (message.height !== 0) {
      writer.uint32(32).int32(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotIAVLItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotIAVLItem();
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
        case 3:
          if (tag !== 24) {
            break;
          }

          message.version = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.height = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SnapshotIAVLItem {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      version: isSet(object.version) ? Long.fromValue(object.version) : Long.ZERO,
      height: isSet(object.height) ? globalThis.Number(object.height) : 0,
    };
  },

  toJSON(message: SnapshotIAVLItem): unknown {
    const obj: any = {};
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (!message.version.isZero()) {
      obj.version = (message.version || Long.ZERO).toString();
    }
    if (message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SnapshotIAVLItem>, I>>(base?: I): SnapshotIAVLItem {
    return SnapshotIAVLItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotIAVLItem>, I>>(object: I): SnapshotIAVLItem {
    const message = createBaseSnapshotIAVLItem();
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    message.version = (object.version !== undefined && object.version !== null)
      ? Long.fromValue(object.version)
      : Long.ZERO;
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseSnapshotExtensionMeta(): SnapshotExtensionMeta {
  return { name: "", format: 0 };
}

export const SnapshotExtensionMeta = {
  encode(message: SnapshotExtensionMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotExtensionMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotExtensionMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.format = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SnapshotExtensionMeta {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      format: isSet(object.format) ? globalThis.Number(object.format) : 0,
    };
  },

  toJSON(message: SnapshotExtensionMeta): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.format !== 0) {
      obj.format = Math.round(message.format);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SnapshotExtensionMeta>, I>>(base?: I): SnapshotExtensionMeta {
    return SnapshotExtensionMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotExtensionMeta>, I>>(object: I): SnapshotExtensionMeta {
    const message = createBaseSnapshotExtensionMeta();
    message.name = object.name ?? "";
    message.format = object.format ?? 0;
    return message;
  },
};

function createBaseSnapshotExtensionPayload(): SnapshotExtensionPayload {
  return { payload: new Uint8Array(0) };
}

export const SnapshotExtensionPayload = {
  encode(message: SnapshotExtensionPayload, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payload.length !== 0) {
      writer.uint32(10).bytes(message.payload);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotExtensionPayload {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotExtensionPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.payload = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SnapshotExtensionPayload {
    return { payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(0) };
  },

  toJSON(message: SnapshotExtensionPayload): unknown {
    const obj: any = {};
    if (message.payload.length !== 0) {
      obj.payload = base64FromBytes(message.payload);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SnapshotExtensionPayload>, I>>(base?: I): SnapshotExtensionPayload {
    return SnapshotExtensionPayload.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotExtensionPayload>, I>>(object: I): SnapshotExtensionPayload {
    const message = createBaseSnapshotExtensionPayload();
    message.payload = object.payload ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSnapshotKVItem(): SnapshotKVItem {
  return { key: new Uint8Array(0), value: new Uint8Array(0) };
}

export const SnapshotKVItem = {
  encode(message: SnapshotKVItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotKVItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotKVItem();
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

  fromJSON(object: any): SnapshotKVItem {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: SnapshotKVItem): unknown {
    const obj: any = {};
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SnapshotKVItem>, I>>(base?: I): SnapshotKVItem {
    return SnapshotKVItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotKVItem>, I>>(object: I): SnapshotKVItem {
    const message = createBaseSnapshotKVItem();
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSnapshotSchema(): SnapshotSchema {
  return { keys: [] };
}

export const SnapshotSchema = {
  encode(message: SnapshotSchema, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.keys) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotSchema {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotSchema();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keys.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SnapshotSchema {
    return { keys: globalThis.Array.isArray(object?.keys) ? object.keys.map((e: any) => bytesFromBase64(e)) : [] };
  },

  toJSON(message: SnapshotSchema): unknown {
    const obj: any = {};
    if (message.keys?.length) {
      obj.keys = message.keys.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SnapshotSchema>, I>>(base?: I): SnapshotSchema {
    return SnapshotSchema.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SnapshotSchema>, I>>(object: I): SnapshotSchema {
    const message = createBaseSnapshotSchema();
    message.keys = object.keys?.map((e) => e) || [];
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
