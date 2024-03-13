import { Any } from "./google/protobuf/any";
import { Celestia } from "proto-utils";
import { MsgType } from "proto-utils/celestia-msgs";
const parsers = Celestia.Msgs;

export type ParsedMsg<T extends MsgType["typeUrl"]> = {
  typeUrl: T;
  decodedValue: ReturnType<
    Extract<MsgType, { typeUrl: T }>["parser"]["decode"]
  >;
};

function decodeAny(anyMessage: Any) {
  const typeUrl = anyMessage.typeUrl;
  const value = anyMessage.value;

  const parser = parsers.find((p) => p.typeUrl === typeUrl)?.parser;
  // TODO: exclude "Msg" and any other type that breaks this (typeof MsgClientImpl and "ibc.core.connection.v1.Msg")
  if (!parser || typeof parser === "string" || !("decode" in parser)) {
    throw new Error(`Unsupported type URL: ${typeUrl}`);
  }
  return parser.decode(value);
}

export type DecodedAny = { typeUrl: string; decodedValue: any };
export function getMessages(txRaw: string): any {
  const txBuffer = Buffer.from(txRaw, "base64");

  const txBody = Celestia.Tx.decode(txBuffer).body;
  if (!txBody) {
    return [];
  }

  return txBody.messages.map((anyMessage) => {
    const message = decodeAny(anyMessage);

    return {
      typeUrl: anyMessage.typeUrl,
      decodedValue: message,
    };
  });
}

export function getMemo(txRaw: string) {
  const txBuffer = Buffer.from(txRaw, "base64");

  const txBody = Celestia.Tx.decode(txBuffer).body;

  return txBody?.memo;
}
