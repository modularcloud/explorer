/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "../../controller/v1/controller";
import { Params as Params1 } from "../../host/v1/host";

export const protobufPackage = "ibc.applications.interchain_accounts.genesis.v1";

/** GenesisState defines the interchain accounts genesis state */
export interface GenesisState {
  controllerGenesisState: ControllerGenesisState | undefined;
  hostGenesisState: HostGenesisState | undefined;
}

/** ControllerGenesisState defines the interchain accounts controller genesis state */
export interface ControllerGenesisState {
  activeChannels: ActiveChannel[];
  interchainAccounts: RegisteredInterchainAccount[];
  ports: string[];
  params: Params | undefined;
}

/** HostGenesisState defines the interchain accounts host genesis state */
export interface HostGenesisState {
  activeChannels: ActiveChannel[];
  interchainAccounts: RegisteredInterchainAccount[];
  port: string;
  params: Params1 | undefined;
}

/**
 * ActiveChannel contains a connection ID, port ID and associated active channel ID, as well as a boolean flag to
 * indicate if the channel is middleware enabled
 */
export interface ActiveChannel {
  connectionId: string;
  portId: string;
  channelId: string;
  isMiddlewareEnabled: boolean;
}

/** RegisteredInterchainAccount contains a connection ID, port ID and associated interchain account address */
export interface RegisteredInterchainAccount {
  connectionId: string;
  portId: string;
  accountAddress: string;
}

function createBaseGenesisState(): GenesisState {
  return { controllerGenesisState: undefined, hostGenesisState: undefined };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.controllerGenesisState !== undefined) {
      ControllerGenesisState.encode(message.controllerGenesisState, writer.uint32(10).fork()).ldelim();
    }
    if (message.hostGenesisState !== undefined) {
      HostGenesisState.encode(message.hostGenesisState, writer.uint32(18).fork()).ldelim();
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
          if (tag !== 10) {
            break;
          }

          message.controllerGenesisState = ControllerGenesisState.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.hostGenesisState = HostGenesisState.decode(reader, reader.uint32());
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
      controllerGenesisState: isSet(object.controllerGenesisState)
        ? ControllerGenesisState.fromJSON(object.controllerGenesisState)
        : undefined,
      hostGenesisState: isSet(object.hostGenesisState) ? HostGenesisState.fromJSON(object.hostGenesisState) : undefined,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.controllerGenesisState !== undefined) {
      obj.controllerGenesisState = ControllerGenesisState.toJSON(message.controllerGenesisState);
    }
    if (message.hostGenesisState !== undefined) {
      obj.hostGenesisState = HostGenesisState.toJSON(message.hostGenesisState);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.controllerGenesisState =
      (object.controllerGenesisState !== undefined && object.controllerGenesisState !== null)
        ? ControllerGenesisState.fromPartial(object.controllerGenesisState)
        : undefined;
    message.hostGenesisState = (object.hostGenesisState !== undefined && object.hostGenesisState !== null)
      ? HostGenesisState.fromPartial(object.hostGenesisState)
      : undefined;
    return message;
  },
};

function createBaseControllerGenesisState(): ControllerGenesisState {
  return { activeChannels: [], interchainAccounts: [], ports: [], params: undefined };
}

export const ControllerGenesisState = {
  encode(message: ControllerGenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.activeChannels) {
      ActiveChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.interchainAccounts) {
      RegisteredInterchainAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.ports) {
      writer.uint32(26).string(v!);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControllerGenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControllerGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.activeChannels.push(ActiveChannel.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.interchainAccounts.push(RegisteredInterchainAccount.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.ports.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ControllerGenesisState {
    return {
      activeChannels: globalThis.Array.isArray(object?.activeChannels)
        ? object.activeChannels.map((e: any) => ActiveChannel.fromJSON(e))
        : [],
      interchainAccounts: globalThis.Array.isArray(object?.interchainAccounts)
        ? object.interchainAccounts.map((e: any) => RegisteredInterchainAccount.fromJSON(e))
        : [],
      ports: globalThis.Array.isArray(object?.ports) ? object.ports.map((e: any) => globalThis.String(e)) : [],
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: ControllerGenesisState): unknown {
    const obj: any = {};
    if (message.activeChannels?.length) {
      obj.activeChannels = message.activeChannels.map((e) => ActiveChannel.toJSON(e));
    }
    if (message.interchainAccounts?.length) {
      obj.interchainAccounts = message.interchainAccounts.map((e) => RegisteredInterchainAccount.toJSON(e));
    }
    if (message.ports?.length) {
      obj.ports = message.ports;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ControllerGenesisState>, I>>(base?: I): ControllerGenesisState {
    return ControllerGenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ControllerGenesisState>, I>>(object: I): ControllerGenesisState {
    const message = createBaseControllerGenesisState();
    message.activeChannels = object.activeChannels?.map((e) => ActiveChannel.fromPartial(e)) || [];
    message.interchainAccounts = object.interchainAccounts?.map((e) => RegisteredInterchainAccount.fromPartial(e)) ||
      [];
    message.ports = object.ports?.map((e) => e) || [];
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseHostGenesisState(): HostGenesisState {
  return { activeChannels: [], interchainAccounts: [], port: "", params: undefined };
}

export const HostGenesisState = {
  encode(message: HostGenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.activeChannels) {
      ActiveChannel.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.interchainAccounts) {
      RegisteredInterchainAccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.port !== "") {
      writer.uint32(26).string(message.port);
    }
    if (message.params !== undefined) {
      Params1.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostGenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.activeChannels.push(ActiveChannel.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.interchainAccounts.push(RegisteredInterchainAccount.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.port = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.params = Params1.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HostGenesisState {
    return {
      activeChannels: globalThis.Array.isArray(object?.activeChannels)
        ? object.activeChannels.map((e: any) => ActiveChannel.fromJSON(e))
        : [],
      interchainAccounts: globalThis.Array.isArray(object?.interchainAccounts)
        ? object.interchainAccounts.map((e: any) => RegisteredInterchainAccount.fromJSON(e))
        : [],
      port: isSet(object.port) ? globalThis.String(object.port) : "",
      params: isSet(object.params) ? Params1.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: HostGenesisState): unknown {
    const obj: any = {};
    if (message.activeChannels?.length) {
      obj.activeChannels = message.activeChannels.map((e) => ActiveChannel.toJSON(e));
    }
    if (message.interchainAccounts?.length) {
      obj.interchainAccounts = message.interchainAccounts.map((e) => RegisteredInterchainAccount.toJSON(e));
    }
    if (message.port !== "") {
      obj.port = message.port;
    }
    if (message.params !== undefined) {
      obj.params = Params1.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HostGenesisState>, I>>(base?: I): HostGenesisState {
    return HostGenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HostGenesisState>, I>>(object: I): HostGenesisState {
    const message = createBaseHostGenesisState();
    message.activeChannels = object.activeChannels?.map((e) => ActiveChannel.fromPartial(e)) || [];
    message.interchainAccounts = object.interchainAccounts?.map((e) => RegisteredInterchainAccount.fromPartial(e)) ||
      [];
    message.port = object.port ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params1.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseActiveChannel(): ActiveChannel {
  return { connectionId: "", portId: "", channelId: "", isMiddlewareEnabled: false };
}

export const ActiveChannel = {
  encode(message: ActiveChannel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(26).string(message.channelId);
    }
    if (message.isMiddlewareEnabled === true) {
      writer.uint32(32).bool(message.isMiddlewareEnabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveChannel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isMiddlewareEnabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActiveChannel {
    return {
      connectionId: isSet(object.connectionId) ? globalThis.String(object.connectionId) : "",
      portId: isSet(object.portId) ? globalThis.String(object.portId) : "",
      channelId: isSet(object.channelId) ? globalThis.String(object.channelId) : "",
      isMiddlewareEnabled: isSet(object.isMiddlewareEnabled) ? globalThis.Boolean(object.isMiddlewareEnabled) : false,
    };
  },

  toJSON(message: ActiveChannel): unknown {
    const obj: any = {};
    if (message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.isMiddlewareEnabled === true) {
      obj.isMiddlewareEnabled = message.isMiddlewareEnabled;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveChannel>, I>>(base?: I): ActiveChannel {
    return ActiveChannel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActiveChannel>, I>>(object: I): ActiveChannel {
    const message = createBaseActiveChannel();
    message.connectionId = object.connectionId ?? "";
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.isMiddlewareEnabled = object.isMiddlewareEnabled ?? false;
    return message;
  },
};

function createBaseRegisteredInterchainAccount(): RegisteredInterchainAccount {
  return { connectionId: "", portId: "", accountAddress: "" };
}

export const RegisteredInterchainAccount = {
  encode(message: RegisteredInterchainAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    if (message.accountAddress !== "") {
      writer.uint32(26).string(message.accountAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisteredInterchainAccount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connectionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accountAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisteredInterchainAccount {
    return {
      connectionId: isSet(object.connectionId) ? globalThis.String(object.connectionId) : "",
      portId: isSet(object.portId) ? globalThis.String(object.portId) : "",
      accountAddress: isSet(object.accountAddress) ? globalThis.String(object.accountAddress) : "",
    };
  },

  toJSON(message: RegisteredInterchainAccount): unknown {
    const obj: any = {};
    if (message.connectionId !== "") {
      obj.connectionId = message.connectionId;
    }
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.accountAddress !== "") {
      obj.accountAddress = message.accountAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RegisteredInterchainAccount>, I>>(base?: I): RegisteredInterchainAccount {
    return RegisteredInterchainAccount.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RegisteredInterchainAccount>, I>>(object: I): RegisteredInterchainAccount {
    const message = createBaseRegisteredInterchainAccount();
    message.connectionId = object.connectionId ?? "";
    message.portId = object.portId ?? "";
    message.accountAddress = object.accountAddress ?? "";
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
