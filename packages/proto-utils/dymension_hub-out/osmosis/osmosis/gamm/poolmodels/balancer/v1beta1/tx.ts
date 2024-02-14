/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PoolAsset, PoolParams } from "../../../v1beta1/balancerPool";

export const protobufPackage = "osmosis.gamm.poolmodels.balancer.v1beta1";

/** ===================== MsgCreatePool */
export interface MsgCreateBalancerPool {
  sender: string;
  poolParams: PoolParams | undefined;
  poolAssets: PoolAsset[];
  futurePoolGovernor: string;
}

/** Returns the poolID */
export interface MsgCreateBalancerPoolResponse {
  poolId: Long;
}

function createBaseMsgCreateBalancerPool(): MsgCreateBalancerPool {
  return { sender: "", poolParams: undefined, poolAssets: [], futurePoolGovernor: "" };
}

export const MsgCreateBalancerPool = {
  encode(message: MsgCreateBalancerPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolParams !== undefined) {
      PoolParams.encode(message.poolParams, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.poolAssets) {
      PoolAsset.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.futurePoolGovernor !== "") {
      writer.uint32(34).string(message.futurePoolGovernor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateBalancerPool {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateBalancerPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.poolParams = PoolParams.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.poolAssets.push(PoolAsset.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.futurePoolGovernor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateBalancerPool {
    return {
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      poolParams: isSet(object.poolParams) ? PoolParams.fromJSON(object.poolParams) : undefined,
      poolAssets: globalThis.Array.isArray(object?.poolAssets)
        ? object.poolAssets.map((e: any) => PoolAsset.fromJSON(e))
        : [],
      futurePoolGovernor: isSet(object.futurePoolGovernor) ? globalThis.String(object.futurePoolGovernor) : "",
    };
  },

  toJSON(message: MsgCreateBalancerPool): unknown {
    const obj: any = {};
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.poolParams !== undefined) {
      obj.poolParams = PoolParams.toJSON(message.poolParams);
    }
    if (message.poolAssets?.length) {
      obj.poolAssets = message.poolAssets.map((e) => PoolAsset.toJSON(e));
    }
    if (message.futurePoolGovernor !== "") {
      obj.futurePoolGovernor = message.futurePoolGovernor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateBalancerPool>, I>>(base?: I): MsgCreateBalancerPool {
    return MsgCreateBalancerPool.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateBalancerPool>, I>>(object: I): MsgCreateBalancerPool {
    const message = createBaseMsgCreateBalancerPool();
    message.sender = object.sender ?? "";
    message.poolParams = (object.poolParams !== undefined && object.poolParams !== null)
      ? PoolParams.fromPartial(object.poolParams)
      : undefined;
    message.poolAssets = object.poolAssets?.map((e) => PoolAsset.fromPartial(e)) || [];
    message.futurePoolGovernor = object.futurePoolGovernor ?? "";
    return message;
  },
};

function createBaseMsgCreateBalancerPoolResponse(): MsgCreateBalancerPoolResponse {
  return { poolId: Long.UZERO };
}

export const MsgCreateBalancerPoolResponse = {
  encode(message: MsgCreateBalancerPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.poolId.isZero()) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateBalancerPoolResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateBalancerPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.poolId = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateBalancerPoolResponse {
    return { poolId: isSet(object.poolId) ? Long.fromValue(object.poolId) : Long.UZERO };
  },

  toJSON(message: MsgCreateBalancerPoolResponse): unknown {
    const obj: any = {};
    if (!message.poolId.isZero()) {
      obj.poolId = (message.poolId || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateBalancerPoolResponse>, I>>(base?: I): MsgCreateBalancerPoolResponse {
    return MsgCreateBalancerPoolResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateBalancerPoolResponse>, I>>(
    object: I,
  ): MsgCreateBalancerPoolResponse {
    const message = createBaseMsgCreateBalancerPoolResponse();
    message.poolId = (object.poolId !== undefined && object.poolId !== null)
      ? Long.fromValue(object.poolId)
      : Long.UZERO;
    return message;
  },
};

export interface Msg {
  CreateBalancerPool(request: MsgCreateBalancerPool): Promise<MsgCreateBalancerPoolResponse>;
}

export const MsgServiceName = "osmosis.gamm.poolmodels.balancer.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateBalancerPool = this.CreateBalancerPool.bind(this);
  }
  CreateBalancerPool(request: MsgCreateBalancerPool): Promise<MsgCreateBalancerPoolResponse> {
    const data = MsgCreateBalancerPool.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateBalancerPool", data);
    return promise.then((data) => MsgCreateBalancerPoolResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
