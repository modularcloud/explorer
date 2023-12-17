/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { OperatingStatus, operatingStatusFromJSON, operatingStatusToJSON } from "./operating_status";

export const protobufPackage = "dymensionxyz.dymension.sequencer";

/** Scheduler defines the operating status of a sequencer */
export interface Scheduler {
  /** sequencerAddress is the bech32-encoded address of the sequencer account, identifying the sequencer */
  sequencerAddress: string;
  /** status is the operating status of this sequencer */
  status: OperatingStatus;
}

function createBaseScheduler(): Scheduler {
  return { sequencerAddress: "", status: 0 };
}

export const Scheduler = {
  encode(message: Scheduler, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sequencerAddress !== "") {
      writer.uint32(10).string(message.sequencerAddress);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Scheduler {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduler();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sequencerAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Scheduler {
    return {
      sequencerAddress: isSet(object.sequencerAddress) ? globalThis.String(object.sequencerAddress) : "",
      status: isSet(object.status) ? operatingStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: Scheduler): unknown {
    const obj: any = {};
    if (message.sequencerAddress !== "") {
      obj.sequencerAddress = message.sequencerAddress;
    }
    if (message.status !== 0) {
      obj.status = operatingStatusToJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Scheduler>, I>>(base?: I): Scheduler {
    return Scheduler.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Scheduler>, I>>(object: I): Scheduler {
    const message = createBaseScheduler();
    message.sequencerAddress = object.sequencerAddress ?? "";
    message.status = object.status ?? 0;
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
