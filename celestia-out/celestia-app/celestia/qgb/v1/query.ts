/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Params } from "./genesis";
import { DataCommitment, Valset } from "./types";

export const protobufPackage = "celestia.qgb.v1";

/** QueryParamsRequest */
export interface QueryParamsRequest {
}

/** QueryParamsResponse */
export interface QueryParamsResponse {
  params: Params | undefined;
}

/** QueryAttestationRequestByNonceRequest */
export interface QueryAttestationRequestByNonceRequest {
  nonce: Long;
}

/** QueryAttestationRequestByNonceResponse */
export interface QueryAttestationRequestByNonceResponse {
  /**
   * AttestationRequestI is either a Data Commitment or a Valset.
   * This was decided as part of the universal nonce approach under:
   * https://github.com/celestiaorg/celestia-app/issues/468#issuecomment-1156887715
   */
  attestation: Any | undefined;
}

/** QueryLatestAttestationNonceRequest latest attestation nonce request */
export interface QueryLatestAttestationNonceRequest {
}

/** QueryLatestAttestationNonceResponse latest attestation nonce response */
export interface QueryLatestAttestationNonceResponse {
  nonce: Long;
}

/** QueryEarliestAttestationNonceRequest earliest attestation nonce request */
export interface QueryEarliestAttestationNonceRequest {
}

/** QueryEarliestAttestationNonceResponse earliest attestation nonce response */
export interface QueryEarliestAttestationNonceResponse {
  nonce: Long;
}

/**
 * QueryLatestValsetRequestBeforeNonceRequest latest Valset request before
 * universal nonce request
 */
export interface QueryLatestValsetRequestBeforeNonceRequest {
  nonce: Long;
}

/**
 * QueryLatestValsetRequestBeforeNonceResponse latest Valset request before
 * height response
 */
export interface QueryLatestValsetRequestBeforeNonceResponse {
  valset: Valset | undefined;
}

/** QueryLatestUnbondingHeightRequest */
export interface QueryLatestUnbondingHeightRequest {
}

/** QueryLatestUnbondingHeightResponse */
export interface QueryLatestUnbondingHeightResponse {
  height: Long;
}

/** QueryLatestDataCommitmentRequest */
export interface QueryLatestDataCommitmentRequest {
}

/** QueryLatestDataCommitmentResponse */
export interface QueryLatestDataCommitmentResponse {
  dataCommitment: DataCommitment | undefined;
}

/** QueryDataCommitmentRangeForHeightRequest */
export interface QueryDataCommitmentRangeForHeightRequest {
  height: Long;
}

/** QueryDataCommitmentRangeForHeightResponse */
export interface QueryDataCommitmentRangeForHeightResponse {
  dataCommitment: DataCommitment | undefined;
}

/** QueryEVMAddressRequest */
export interface QueryEVMAddressRequest {
  validatorAddress: string;
}

/** QueryEVMAddressResponse */
export interface QueryEVMAddressResponse {
  evmAddress: string;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(base?: I): QueryParamsRequest {
    return QueryParamsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(base?: I): QueryParamsResponse {
    return QueryParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryAttestationRequestByNonceRequest(): QueryAttestationRequestByNonceRequest {
  return { nonce: Long.UZERO };
}

export const QueryAttestationRequestByNonceRequest = {
  encode(message: QueryAttestationRequestByNonceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.nonce.isZero()) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAttestationRequestByNonceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationRequestByNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nonce = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAttestationRequestByNonceRequest {
    return { nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO };
  },

  toJSON(message: QueryAttestationRequestByNonceRequest): unknown {
    const obj: any = {};
    if (!message.nonce.isZero()) {
      obj.nonce = (message.nonce || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAttestationRequestByNonceRequest>, I>>(
    base?: I,
  ): QueryAttestationRequestByNonceRequest {
    return QueryAttestationRequestByNonceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAttestationRequestByNonceRequest>, I>>(
    object: I,
  ): QueryAttestationRequestByNonceRequest {
    const message = createBaseQueryAttestationRequestByNonceRequest();
    message.nonce = (object.nonce !== undefined && object.nonce !== null) ? Long.fromValue(object.nonce) : Long.UZERO;
    return message;
  },
};

function createBaseQueryAttestationRequestByNonceResponse(): QueryAttestationRequestByNonceResponse {
  return { attestation: undefined };
}

export const QueryAttestationRequestByNonceResponse = {
  encode(message: QueryAttestationRequestByNonceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.attestation !== undefined) {
      Any.encode(message.attestation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAttestationRequestByNonceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationRequestByNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.attestation = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryAttestationRequestByNonceResponse {
    return { attestation: isSet(object.attestation) ? Any.fromJSON(object.attestation) : undefined };
  },

  toJSON(message: QueryAttestationRequestByNonceResponse): unknown {
    const obj: any = {};
    if (message.attestation !== undefined) {
      obj.attestation = Any.toJSON(message.attestation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryAttestationRequestByNonceResponse>, I>>(
    base?: I,
  ): QueryAttestationRequestByNonceResponse {
    return QueryAttestationRequestByNonceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryAttestationRequestByNonceResponse>, I>>(
    object: I,
  ): QueryAttestationRequestByNonceResponse {
    const message = createBaseQueryAttestationRequestByNonceResponse();
    message.attestation = (object.attestation !== undefined && object.attestation !== null)
      ? Any.fromPartial(object.attestation)
      : undefined;
    return message;
  },
};

function createBaseQueryLatestAttestationNonceRequest(): QueryLatestAttestationNonceRequest {
  return {};
}

export const QueryLatestAttestationNonceRequest = {
  encode(_: QueryLatestAttestationNonceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestAttestationNonceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestAttestationNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryLatestAttestationNonceRequest {
    return {};
  },

  toJSON(_: QueryLatestAttestationNonceRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLatestAttestationNonceRequest>, I>>(
    base?: I,
  ): QueryLatestAttestationNonceRequest {
    return QueryLatestAttestationNonceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLatestAttestationNonceRequest>, I>>(
    _: I,
  ): QueryLatestAttestationNonceRequest {
    const message = createBaseQueryLatestAttestationNonceRequest();
    return message;
  },
};

function createBaseQueryLatestAttestationNonceResponse(): QueryLatestAttestationNonceResponse {
  return { nonce: Long.UZERO };
}

export const QueryLatestAttestationNonceResponse = {
  encode(message: QueryLatestAttestationNonceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.nonce.isZero()) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestAttestationNonceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestAttestationNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nonce = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryLatestAttestationNonceResponse {
    return { nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO };
  },

  toJSON(message: QueryLatestAttestationNonceResponse): unknown {
    const obj: any = {};
    if (!message.nonce.isZero()) {
      obj.nonce = (message.nonce || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLatestAttestationNonceResponse>, I>>(
    base?: I,
  ): QueryLatestAttestationNonceResponse {
    return QueryLatestAttestationNonceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLatestAttestationNonceResponse>, I>>(
    object: I,
  ): QueryLatestAttestationNonceResponse {
    const message = createBaseQueryLatestAttestationNonceResponse();
    message.nonce = (object.nonce !== undefined && object.nonce !== null) ? Long.fromValue(object.nonce) : Long.UZERO;
    return message;
  },
};

function createBaseQueryEarliestAttestationNonceRequest(): QueryEarliestAttestationNonceRequest {
  return {};
}

export const QueryEarliestAttestationNonceRequest = {
  encode(_: QueryEarliestAttestationNonceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEarliestAttestationNonceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEarliestAttestationNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryEarliestAttestationNonceRequest {
    return {};
  },

  toJSON(_: QueryEarliestAttestationNonceRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEarliestAttestationNonceRequest>, I>>(
    base?: I,
  ): QueryEarliestAttestationNonceRequest {
    return QueryEarliestAttestationNonceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEarliestAttestationNonceRequest>, I>>(
    _: I,
  ): QueryEarliestAttestationNonceRequest {
    const message = createBaseQueryEarliestAttestationNonceRequest();
    return message;
  },
};

function createBaseQueryEarliestAttestationNonceResponse(): QueryEarliestAttestationNonceResponse {
  return { nonce: Long.UZERO };
}

export const QueryEarliestAttestationNonceResponse = {
  encode(message: QueryEarliestAttestationNonceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.nonce.isZero()) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEarliestAttestationNonceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEarliestAttestationNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nonce = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryEarliestAttestationNonceResponse {
    return { nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO };
  },

  toJSON(message: QueryEarliestAttestationNonceResponse): unknown {
    const obj: any = {};
    if (!message.nonce.isZero()) {
      obj.nonce = (message.nonce || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEarliestAttestationNonceResponse>, I>>(
    base?: I,
  ): QueryEarliestAttestationNonceResponse {
    return QueryEarliestAttestationNonceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEarliestAttestationNonceResponse>, I>>(
    object: I,
  ): QueryEarliestAttestationNonceResponse {
    const message = createBaseQueryEarliestAttestationNonceResponse();
    message.nonce = (object.nonce !== undefined && object.nonce !== null) ? Long.fromValue(object.nonce) : Long.UZERO;
    return message;
  },
};

function createBaseQueryLatestValsetRequestBeforeNonceRequest(): QueryLatestValsetRequestBeforeNonceRequest {
  return { nonce: Long.UZERO };
}

export const QueryLatestValsetRequestBeforeNonceRequest = {
  encode(message: QueryLatestValsetRequestBeforeNonceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.nonce.isZero()) {
      writer.uint32(8).uint64(message.nonce);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestValsetRequestBeforeNonceRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestValsetRequestBeforeNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nonce = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryLatestValsetRequestBeforeNonceRequest {
    return { nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO };
  },

  toJSON(message: QueryLatestValsetRequestBeforeNonceRequest): unknown {
    const obj: any = {};
    if (!message.nonce.isZero()) {
      obj.nonce = (message.nonce || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLatestValsetRequestBeforeNonceRequest>, I>>(
    base?: I,
  ): QueryLatestValsetRequestBeforeNonceRequest {
    return QueryLatestValsetRequestBeforeNonceRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLatestValsetRequestBeforeNonceRequest>, I>>(
    object: I,
  ): QueryLatestValsetRequestBeforeNonceRequest {
    const message = createBaseQueryLatestValsetRequestBeforeNonceRequest();
    message.nonce = (object.nonce !== undefined && object.nonce !== null) ? Long.fromValue(object.nonce) : Long.UZERO;
    return message;
  },
};

function createBaseQueryLatestValsetRequestBeforeNonceResponse(): QueryLatestValsetRequestBeforeNonceResponse {
  return { valset: undefined };
}

export const QueryLatestValsetRequestBeforeNonceResponse = {
  encode(message: QueryLatestValsetRequestBeforeNonceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.valset !== undefined) {
      Valset.encode(message.valset, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestValsetRequestBeforeNonceResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestValsetRequestBeforeNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.valset = Valset.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryLatestValsetRequestBeforeNonceResponse {
    return { valset: isSet(object.valset) ? Valset.fromJSON(object.valset) : undefined };
  },

  toJSON(message: QueryLatestValsetRequestBeforeNonceResponse): unknown {
    const obj: any = {};
    if (message.valset !== undefined) {
      obj.valset = Valset.toJSON(message.valset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLatestValsetRequestBeforeNonceResponse>, I>>(
    base?: I,
  ): QueryLatestValsetRequestBeforeNonceResponse {
    return QueryLatestValsetRequestBeforeNonceResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLatestValsetRequestBeforeNonceResponse>, I>>(
    object: I,
  ): QueryLatestValsetRequestBeforeNonceResponse {
    const message = createBaseQueryLatestValsetRequestBeforeNonceResponse();
    message.valset = (object.valset !== undefined && object.valset !== null)
      ? Valset.fromPartial(object.valset)
      : undefined;
    return message;
  },
};

function createBaseQueryLatestUnbondingHeightRequest(): QueryLatestUnbondingHeightRequest {
  return {};
}

export const QueryLatestUnbondingHeightRequest = {
  encode(_: QueryLatestUnbondingHeightRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestUnbondingHeightRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestUnbondingHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryLatestUnbondingHeightRequest {
    return {};
  },

  toJSON(_: QueryLatestUnbondingHeightRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLatestUnbondingHeightRequest>, I>>(
    base?: I,
  ): QueryLatestUnbondingHeightRequest {
    return QueryLatestUnbondingHeightRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLatestUnbondingHeightRequest>, I>>(
    _: I,
  ): QueryLatestUnbondingHeightRequest {
    const message = createBaseQueryLatestUnbondingHeightRequest();
    return message;
  },
};

function createBaseQueryLatestUnbondingHeightResponse(): QueryLatestUnbondingHeightResponse {
  return { height: Long.UZERO };
}

export const QueryLatestUnbondingHeightResponse = {
  encode(message: QueryLatestUnbondingHeightResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestUnbondingHeightResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestUnbondingHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryLatestUnbondingHeightResponse {
    return { height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO };
  },

  toJSON(message: QueryLatestUnbondingHeightResponse): unknown {
    const obj: any = {};
    if (!message.height.isZero()) {
      obj.height = (message.height || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLatestUnbondingHeightResponse>, I>>(
    base?: I,
  ): QueryLatestUnbondingHeightResponse {
    return QueryLatestUnbondingHeightResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLatestUnbondingHeightResponse>, I>>(
    object: I,
  ): QueryLatestUnbondingHeightResponse {
    const message = createBaseQueryLatestUnbondingHeightResponse();
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryLatestDataCommitmentRequest(): QueryLatestDataCommitmentRequest {
  return {};
}

export const QueryLatestDataCommitmentRequest = {
  encode(_: QueryLatestDataCommitmentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestDataCommitmentRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestDataCommitmentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueryLatestDataCommitmentRequest {
    return {};
  },

  toJSON(_: QueryLatestDataCommitmentRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLatestDataCommitmentRequest>, I>>(
    base?: I,
  ): QueryLatestDataCommitmentRequest {
    return QueryLatestDataCommitmentRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLatestDataCommitmentRequest>, I>>(
    _: I,
  ): QueryLatestDataCommitmentRequest {
    const message = createBaseQueryLatestDataCommitmentRequest();
    return message;
  },
};

function createBaseQueryLatestDataCommitmentResponse(): QueryLatestDataCommitmentResponse {
  return { dataCommitment: undefined };
}

export const QueryLatestDataCommitmentResponse = {
  encode(message: QueryLatestDataCommitmentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataCommitment !== undefined) {
      DataCommitment.encode(message.dataCommitment, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLatestDataCommitmentResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLatestDataCommitmentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataCommitment = DataCommitment.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryLatestDataCommitmentResponse {
    return {
      dataCommitment: isSet(object.dataCommitment) ? DataCommitment.fromJSON(object.dataCommitment) : undefined,
    };
  },

  toJSON(message: QueryLatestDataCommitmentResponse): unknown {
    const obj: any = {};
    if (message.dataCommitment !== undefined) {
      obj.dataCommitment = DataCommitment.toJSON(message.dataCommitment);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryLatestDataCommitmentResponse>, I>>(
    base?: I,
  ): QueryLatestDataCommitmentResponse {
    return QueryLatestDataCommitmentResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryLatestDataCommitmentResponse>, I>>(
    object: I,
  ): QueryLatestDataCommitmentResponse {
    const message = createBaseQueryLatestDataCommitmentResponse();
    message.dataCommitment = (object.dataCommitment !== undefined && object.dataCommitment !== null)
      ? DataCommitment.fromPartial(object.dataCommitment)
      : undefined;
    return message;
  },
};

function createBaseQueryDataCommitmentRangeForHeightRequest(): QueryDataCommitmentRangeForHeightRequest {
  return { height: Long.UZERO };
}

export const QueryDataCommitmentRangeForHeightRequest = {
  encode(message: QueryDataCommitmentRangeForHeightRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDataCommitmentRangeForHeightRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDataCommitmentRangeForHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.height = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDataCommitmentRangeForHeightRequest {
    return { height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO };
  },

  toJSON(message: QueryDataCommitmentRangeForHeightRequest): unknown {
    const obj: any = {};
    if (!message.height.isZero()) {
      obj.height = (message.height || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDataCommitmentRangeForHeightRequest>, I>>(
    base?: I,
  ): QueryDataCommitmentRangeForHeightRequest {
    return QueryDataCommitmentRangeForHeightRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDataCommitmentRangeForHeightRequest>, I>>(
    object: I,
  ): QueryDataCommitmentRangeForHeightRequest {
    const message = createBaseQueryDataCommitmentRangeForHeightRequest();
    message.height = (object.height !== undefined && object.height !== null)
      ? Long.fromValue(object.height)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryDataCommitmentRangeForHeightResponse(): QueryDataCommitmentRangeForHeightResponse {
  return { dataCommitment: undefined };
}

export const QueryDataCommitmentRangeForHeightResponse = {
  encode(message: QueryDataCommitmentRangeForHeightResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataCommitment !== undefined) {
      DataCommitment.encode(message.dataCommitment, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDataCommitmentRangeForHeightResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDataCommitmentRangeForHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataCommitment = DataCommitment.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDataCommitmentRangeForHeightResponse {
    return {
      dataCommitment: isSet(object.dataCommitment) ? DataCommitment.fromJSON(object.dataCommitment) : undefined,
    };
  },

  toJSON(message: QueryDataCommitmentRangeForHeightResponse): unknown {
    const obj: any = {};
    if (message.dataCommitment !== undefined) {
      obj.dataCommitment = DataCommitment.toJSON(message.dataCommitment);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDataCommitmentRangeForHeightResponse>, I>>(
    base?: I,
  ): QueryDataCommitmentRangeForHeightResponse {
    return QueryDataCommitmentRangeForHeightResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDataCommitmentRangeForHeightResponse>, I>>(
    object: I,
  ): QueryDataCommitmentRangeForHeightResponse {
    const message = createBaseQueryDataCommitmentRangeForHeightResponse();
    message.dataCommitment = (object.dataCommitment !== undefined && object.dataCommitment !== null)
      ? DataCommitment.fromPartial(object.dataCommitment)
      : undefined;
    return message;
  },
};

function createBaseQueryEVMAddressRequest(): QueryEVMAddressRequest {
  return { validatorAddress: "" };
}

export const QueryEVMAddressRequest = {
  encode(message: QueryEVMAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEVMAddressRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEVMAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validatorAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryEVMAddressRequest {
    return { validatorAddress: isSet(object.validatorAddress) ? globalThis.String(object.validatorAddress) : "" };
  },

  toJSON(message: QueryEVMAddressRequest): unknown {
    const obj: any = {};
    if (message.validatorAddress !== "") {
      obj.validatorAddress = message.validatorAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEVMAddressRequest>, I>>(base?: I): QueryEVMAddressRequest {
    return QueryEVMAddressRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEVMAddressRequest>, I>>(object: I): QueryEVMAddressRequest {
    const message = createBaseQueryEVMAddressRequest();
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
};

function createBaseQueryEVMAddressResponse(): QueryEVMAddressResponse {
  return { evmAddress: "" };
}

export const QueryEVMAddressResponse = {
  encode(message: QueryEVMAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.evmAddress !== "") {
      writer.uint32(10).string(message.evmAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEVMAddressResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEVMAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.evmAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryEVMAddressResponse {
    return { evmAddress: isSet(object.evmAddress) ? globalThis.String(object.evmAddress) : "" };
  },

  toJSON(message: QueryEVMAddressResponse): unknown {
    const obj: any = {};
    if (message.evmAddress !== "") {
      obj.evmAddress = message.evmAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryEVMAddressResponse>, I>>(base?: I): QueryEVMAddressResponse {
    return QueryEVMAddressResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryEVMAddressResponse>, I>>(object: I): QueryEVMAddressResponse {
    const message = createBaseQueryEVMAddressResponse();
    message.evmAddress = object.evmAddress ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the current parameters for the blobstream module */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * AttestationRequestByNonce queries attestation request by nonce.
   * Returns nil if not found.
   */
  AttestationRequestByNonce(
    request: QueryAttestationRequestByNonceRequest,
  ): Promise<QueryAttestationRequestByNonceResponse>;
  /** LatestAttestationNonce queries latest attestation nonce. */
  LatestAttestationNonce(request: QueryLatestAttestationNonceRequest): Promise<QueryLatestAttestationNonceResponse>;
  /** EarliestAttestationNonce queries the earliest attestation nonce. */
  EarliestAttestationNonce(
    request: QueryEarliestAttestationNonceRequest,
  ): Promise<QueryEarliestAttestationNonceResponse>;
  /**
   * LatestValsetRequestBeforeNonce Queries latest Valset request before nonce.
   * And, even if the current nonce is a valset, it will return the previous
   * one.
   * If the provided nonce is 1, it will return an error, because, there is
   * no valset before nonce 1.
   */
  LatestValsetRequestBeforeNonce(
    request: QueryLatestValsetRequestBeforeNonceRequest,
  ): Promise<QueryLatestValsetRequestBeforeNonceResponse>;
  /** LatestUnbondingHeight returns the latest unbonding height */
  LatestUnbondingHeight(request: QueryLatestUnbondingHeightRequest): Promise<QueryLatestUnbondingHeightResponse>;
  /**
   * DataCommitmentRangeForHeight returns the data commitment window
   * that includes the provided height
   */
  DataCommitmentRangeForHeight(
    request: QueryDataCommitmentRangeForHeightRequest,
  ): Promise<QueryDataCommitmentRangeForHeightResponse>;
  /** LatestDataCommitment returns the latest data commitment in store */
  LatestDataCommitment(request: QueryLatestDataCommitmentRequest): Promise<QueryLatestDataCommitmentResponse>;
  /**
   * EVMAddress returns the evm address associated with a supplied
   * validator address
   */
  EVMAddress(request: QueryEVMAddressRequest): Promise<QueryEVMAddressResponse>;
}

export const QueryServiceName = "celestia.qgb.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.AttestationRequestByNonce = this.AttestationRequestByNonce.bind(this);
    this.LatestAttestationNonce = this.LatestAttestationNonce.bind(this);
    this.EarliestAttestationNonce = this.EarliestAttestationNonce.bind(this);
    this.LatestValsetRequestBeforeNonce = this.LatestValsetRequestBeforeNonce.bind(this);
    this.LatestUnbondingHeight = this.LatestUnbondingHeight.bind(this);
    this.DataCommitmentRangeForHeight = this.DataCommitmentRangeForHeight.bind(this);
    this.LatestDataCommitment = this.LatestDataCommitment.bind(this);
    this.EVMAddress = this.EVMAddress.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
  }

  AttestationRequestByNonce(
    request: QueryAttestationRequestByNonceRequest,
  ): Promise<QueryAttestationRequestByNonceResponse> {
    const data = QueryAttestationRequestByNonceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AttestationRequestByNonce", data);
    return promise.then((data) => QueryAttestationRequestByNonceResponse.decode(_m0.Reader.create(data)));
  }

  LatestAttestationNonce(request: QueryLatestAttestationNonceRequest): Promise<QueryLatestAttestationNonceResponse> {
    const data = QueryLatestAttestationNonceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "LatestAttestationNonce", data);
    return promise.then((data) => QueryLatestAttestationNonceResponse.decode(_m0.Reader.create(data)));
  }

  EarliestAttestationNonce(
    request: QueryEarliestAttestationNonceRequest,
  ): Promise<QueryEarliestAttestationNonceResponse> {
    const data = QueryEarliestAttestationNonceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EarliestAttestationNonce", data);
    return promise.then((data) => QueryEarliestAttestationNonceResponse.decode(_m0.Reader.create(data)));
  }

  LatestValsetRequestBeforeNonce(
    request: QueryLatestValsetRequestBeforeNonceRequest,
  ): Promise<QueryLatestValsetRequestBeforeNonceResponse> {
    const data = QueryLatestValsetRequestBeforeNonceRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "LatestValsetRequestBeforeNonce", data);
    return promise.then((data) => QueryLatestValsetRequestBeforeNonceResponse.decode(_m0.Reader.create(data)));
  }

  LatestUnbondingHeight(request: QueryLatestUnbondingHeightRequest): Promise<QueryLatestUnbondingHeightResponse> {
    const data = QueryLatestUnbondingHeightRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "LatestUnbondingHeight", data);
    return promise.then((data) => QueryLatestUnbondingHeightResponse.decode(_m0.Reader.create(data)));
  }

  DataCommitmentRangeForHeight(
    request: QueryDataCommitmentRangeForHeightRequest,
  ): Promise<QueryDataCommitmentRangeForHeightResponse> {
    const data = QueryDataCommitmentRangeForHeightRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DataCommitmentRangeForHeight", data);
    return promise.then((data) => QueryDataCommitmentRangeForHeightResponse.decode(_m0.Reader.create(data)));
  }

  LatestDataCommitment(request: QueryLatestDataCommitmentRequest): Promise<QueryLatestDataCommitmentResponse> {
    const data = QueryLatestDataCommitmentRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "LatestDataCommitment", data);
    return promise.then((data) => QueryLatestDataCommitmentResponse.decode(_m0.Reader.create(data)));
  }

  EVMAddress(request: QueryEVMAddressRequest): Promise<QueryEVMAddressResponse> {
    const data = QueryEVMAddressRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "EVMAddress", data);
    return promise.then((data) => QueryEVMAddressResponse.decode(_m0.Reader.create(data)));
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
