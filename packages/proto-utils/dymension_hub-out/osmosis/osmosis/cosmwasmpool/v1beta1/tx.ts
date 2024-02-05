/* eslint-disable */

export const protobufPackage = "osmosis.cosmwasmpool.v1beta1";

export interface Msg {
}

export const MsgServiceName = "osmosis.cosmwasmpool.v1beta1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
