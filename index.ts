import { Msgs } from "./celestia-msgs";
import { Tx } from "./celestia-out/celestiaorg_cosmos-sdk/cosmos/tx/v1beta1/tx";
import { Msgs as RollappsMsgs } from "./rollapps-msgs";

export const Celestia = {
  Msgs,
  Tx,
};

export const Rollapps = {
  Msgs: RollappsMsgs,
  Tx, // TODO: use the correct Tx
};


/**
 * Example
 */
const parsers = Celestia.Msgs;


function decodeAny(anyMessage: any) {
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
export function getMessages(txRaw: string) {
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
function main() {
  var tx = "CpkBCpYBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEnYKL2NlbGVzdGlhMTA1OXJuMGtzZ240ZTdycDJ5cTQ4dnA2czh6cXk1dGw5MDJheG5uEi9jZWxlc3RpYTFmZTdzZjZ5Y3g3MDhzMnZmc2Vyc21tZDk0NDhsMDluc3A1anVmeRoSCgR1dGlhEgo5MDIwMDYwMDAwEmkKUApGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQJ+cMpDLK+l0ZFxmwihvL9BSVTEcvyKX8yilOzDxKPwXxIECgIIARgBEhUKDwoEdXRpYRIHMjUwMDAwMBDQ6AwaQNkmZ579Xjtcq4R0387b9XNB2bTESIKRTPbBVIO4mwqyI8+UoGVcwB3bx/g9BNEzZn8jOdDvF7wYZ/+w7OR52ZM="
  console.log(getMessages(tx));
}
main()
