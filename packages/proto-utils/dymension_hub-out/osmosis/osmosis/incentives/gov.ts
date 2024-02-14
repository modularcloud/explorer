/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { CreateGroup } from "./group";

export const protobufPackage = "osmosis.incentives";

/**
 * CreateGroupsProposal is a type for creating one or more groups via
 * governance. This is useful for creating groups without having to pay
 * creation fees.
 */
export interface CreateGroupsProposal {
  title: string;
  description: string;
  createGroups: CreateGroup[];
}

function createBaseCreateGroupsProposal(): CreateGroupsProposal {
  return { title: "", description: "", createGroups: [] };
}

export const CreateGroupsProposal = {
  encode(message: CreateGroupsProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.createGroups) {
      CreateGroup.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateGroupsProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateGroupsProposal();
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

          message.createGroups.push(CreateGroup.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateGroupsProposal {
    return {
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      createGroups: globalThis.Array.isArray(object?.createGroups)
        ? object.createGroups.map((e: any) => CreateGroup.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateGroupsProposal): unknown {
    const obj: any = {};
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.createGroups?.length) {
      obj.createGroups = message.createGroups.map((e) => CreateGroup.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateGroupsProposal>, I>>(base?: I): CreateGroupsProposal {
    return CreateGroupsProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateGroupsProposal>, I>>(object: I): CreateGroupsProposal {
    const message = createBaseCreateGroupsProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.createGroups = object.createGroups?.map((e) => CreateGroup.fromPartial(e)) || [];
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
