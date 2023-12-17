/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dymensionxyz.dymension.sequencer";

/**
 * SequencersByRollapp defines an map between rollappId to a list of
 * all sequencers that belongs to it.
 */
export interface SequencersByRollapp {
  /**
   * rollappId is the unique identifier of the rollapp chain.
   * The rollappId follows the same standard as cosmos chain_id.
   */
  rollappId: string;
  /**
   * list of sequencers' account address
   * repeated string sequencers = 2;
   */
  sequencers: Sequencers | undefined;
}

/** Sequencers defines list of sequencers addresses. */
export interface Sequencers {
  addresses: string[];
}

function createBaseSequencersByRollapp(): SequencersByRollapp {
  return { rollappId: "", sequencers: undefined };
}

export const SequencersByRollapp = {
  encode(message: SequencersByRollapp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollappId !== "") {
      writer.uint32(10).string(message.rollappId);
    }
    if (message.sequencers !== undefined) {
      Sequencers.encode(message.sequencers, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SequencersByRollapp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequencersByRollapp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rollappId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sequencers = Sequencers.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SequencersByRollapp {
    return {
      rollappId: isSet(object.rollappId) ? globalThis.String(object.rollappId) : "",
      sequencers: isSet(object.sequencers) ? Sequencers.fromJSON(object.sequencers) : undefined,
    };
  },

  toJSON(message: SequencersByRollapp): unknown {
    const obj: any = {};
    if (message.rollappId !== "") {
      obj.rollappId = message.rollappId;
    }
    if (message.sequencers !== undefined) {
      obj.sequencers = Sequencers.toJSON(message.sequencers);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SequencersByRollapp>, I>>(base?: I): SequencersByRollapp {
    return SequencersByRollapp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SequencersByRollapp>, I>>(object: I): SequencersByRollapp {
    const message = createBaseSequencersByRollapp();
    message.rollappId = object.rollappId ?? "";
    message.sequencers = (object.sequencers !== undefined && object.sequencers !== null)
      ? Sequencers.fromPartial(object.sequencers)
      : undefined;
    return message;
  },
};

function createBaseSequencers(): Sequencers {
  return { addresses: [] };
}

export const Sequencers = {
  encode(message: Sequencers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.addresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sequencers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequencers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.addresses.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Sequencers {
    return {
      addresses: globalThis.Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Sequencers): unknown {
    const obj: any = {};
    if (message.addresses?.length) {
      obj.addresses = message.addresses;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Sequencers>, I>>(base?: I): Sequencers {
    return Sequencers.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Sequencers>, I>>(object: I): Sequencers {
    const message = createBaseSequencers();
    message.addresses = object.addresses?.map((e) => e) || [];
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
