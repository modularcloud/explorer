import { sha256 } from "@cosmjs/crypto";
import { fromBase64 } from "@cosmjs/encoding";
import { decodeTxRaw, Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes } from "@cosmjs/stargate";
import { MalleatedTx, MsgPayForBlobs } from "../proto/celestia";
import { Entity } from "../types/entity.type";
import { QueryBalanceRequest, QueryBalanceResponse } from "../proto/cosmos";

function fixCapsAndSpacing(camel: string): string {
  const letters = camel.split("");

  // Capitalize the first letter if needed
  letters[0] = letters[0].toUpperCase();

  // Add a space before capital latters (new words)
  const characters = letters.map(letter => letter === letter.toUpperCase() ? ` ${letter}` : letter);

  return characters.join("").trim();
}

function convertToName(typeUrl: string): string {
  // Get the part after Msg
  const parts = typeUrl.split("Msg");
  const name = parts[parts.length - 1];

  // If there was no Msg then we don't know how to find the name
  if (parts.length === 1) {
    return "Unknown";
  }

  // Add IBC prefix if needed and return (properly formatted)
  return (typeUrl.indexOf("ibc") !== -1 ? "IBC " : "") + fixCapsAndSpacing(name);
}

function convertToKeyValue(obj: { [key: string]: any }): { [key: string]: string } {
  const KV: { [key: string]: string } = {};
  Object.entries(obj).forEach((entry) => {

    if (typeof entry[1] === "object") {
      if(entry[0] == "amount") {
        KV[fixCapsAndSpacing(entry[0])] = getAmountString(entry[1])
      } else {
        // Flatten nested objects into top level keys
        Object.entries(entry[1]).forEach((subentry) => {
          KV[`${fixCapsAndSpacing(entry[0])} ${fixCapsAndSpacing(subentry[0])}`] = String(subentry[1]);
        });
      }
    } else {
      KV[fixCapsAndSpacing(entry[0])] = String(entry[1]);
    }
  });
  return KV;
}

// amount has schema:
// "amount": [ { denom: 'udym', amount: '6000000' } ]
function getAmountString(obJ: object) : string {
  let denom, amount
  if("udym" === obJ[0]["denom"]) {
    // special case for dymension 
    denom = obJ[0]["denom"].substring(1)
    amount = (Number(obJ[0]["amount"]) / 1000000).toString()
  } else {
    denom = obJ[0]["denom"]
    amount = obJ[0]["amount"]
  }
  return amount + " " + denom
}

export function txStringToHash(txstr: string) {
  let raw = fromBase64(txstr);
  try {
    decodeTxRaw(raw); // detecting if normal transaction, if PFB it catches
  } catch { 
    raw = MalleatedTx.decode(raw).tx;
  }

  return Buffer.from(sha256(raw)).toString("hex");
}

export function getBalanceQueryData(address: string, denom: string) {
  const QBR = QueryBalanceRequest.fromJSON({ address, denom });
  const bytes = QueryBalanceRequest.encode(QBR).finish()
  return Buffer.from(bytes).toString("hex");
}

export function parseBalance(str: string) {
  const bytes = Buffer.from(str, "base64");
  const response = QueryBalanceResponse.decode(bytes);
  return response.balance?.amount;
}

export function getMessages(txstr: string): Entity[] {
  const registry = new Registry(defaultRegistryTypes);
  registry.register("/blob.MsgPayForBlobs", MsgPayForBlobs);
  let raw = fromBase64(txstr);
  let tx;
  try {
    tx = decodeTxRaw(raw);
  } catch {
    tx = decodeTxRaw(MalleatedTx.decode(raw).tx);
  }

  const decodedMessages: Entity[] = [];
  tx.body.messages.forEach((message, index) => {
    try {
      const decodedMsg = registry.decode(message);
      decodedMessages.push({
        uniqueIdentifier: convertToName(message.typeUrl),
        uniqueIdentifierLabel: "Type",
        metadata: convertToKeyValue(decodedMsg),
        computed: {},
        context: {
          network: "N/A", // TODO: replace network with path 
          entityTypeName: "Message"
        },
        raw: JSON.stringify(decodedMsg),
      });
    } catch {
      decodedMessages.push({
        uniqueIdentifier: "Unknown",
        uniqueIdentifierLabel: "Type",
        metadata: {
          index: String(index)
        },
        computed: {},
        context: {
          network: "N/A", // TODO: replace network with path 
          entityTypeName: "Message"
        },
        raw: JSON.stringify(message),
      });
    }
  })
  return decodedMessages;

}