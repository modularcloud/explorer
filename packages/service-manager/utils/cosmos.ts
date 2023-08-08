import { sha256 } from "@cosmjs/crypto";
import { fromBase64 } from "@cosmjs/encoding";
import { decodeTxRaw, Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes } from "@cosmjs/stargate";
import { IndexWrapper, MalleatedTx, MsgPayForBlobs } from "../proto/celestia";
import { Entity } from "../types/entity.type";
import { QueryBalanceRequest, QueryBalanceResponse } from "../proto/cosmos";
import { ValueSchemaType } from "../types/valueschema.type";

function fixCapsAndSpacing(camel: string): string {
  const letters = camel.split("");

  // Capitalize the first letter if needed
  letters[0] = letters[0].toUpperCase();

  // Add a space before capital latters (new words)
  const characters = letters.map((letter) =>
    letter === letter.toUpperCase() ? ` ${letter}` : letter,
  );

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
  return (
    (typeUrl.indexOf("ibc") !== -1 ? "IBC " : "") + fixCapsAndSpacing(name)
  );
}

function convertToKeyValue(obj: { [key: string]: any }): {
  [key: string]: ValueSchemaType;
} {
  const KV: { [key: string]: ValueSchemaType } = {};
  Object.entries(obj).forEach((entry) => {
    // we are converting the way amount is display, this occurs only when the value is an object or array
    const isAmount = entry[0] === "amount";

    if (Array.isArray(entry[1])) {
      KV[fixCapsAndSpacing(entry[0])] = {
        type: "list",
        payload: entry[1].map((val) =>
          isAmount ? getAmountString(val) : String(val),
        ),
      };
    } else if (typeof entry[1] === "object") {
      if (isAmount) {
        KV[fixCapsAndSpacing(entry[0])] = {
          type: "string",
          payload: getAmountString(entry[1]),
        };
      } else {
        let properties = { type: "list" as "list", payload: [] as string[] };
        Object.entries(entry[1]).forEach((subentry) => {
          properties.payload.push(
            `${fixCapsAndSpacing(subentry[0])}: ${subentry[1]}`,
          );
        });
        KV[fixCapsAndSpacing(entry[0])] = properties;
      }
    } else {
      KV[fixCapsAndSpacing(entry[0])] = {
        type: "string",
        payload: String(entry[1]),
      };
    }
  });
  return KV;
}

// amount has schema:
// "amount": [ { denom: 'udym', amount: '6000000' } ]
// or
// "amount": { denom: 'udym', amount: '6000000' }
function getAmountString(obJ: any): string {
  let denom = obJ[0]?.denom ?? obJ.denom;
  let amount = obJ[0]?.amount ?? obJ.amount;

  if (!denom || !amount) {
    return "Unknown";
  }

  if (denom === "udym") {
    denom = "DYM";
    amount = String(Number(amount) / 1000000);
  }

  return amount + " " + denom;
}

export function txStringToHash(txstr: string) {
  let raw = fromBase64(txstr);
  try {
    decodeTxRaw(raw); // detecting if normal transaction, if PFB it catches
  } catch {
    try {
      raw = IndexWrapper.decode(raw).tx;
    } catch {
      raw = MalleatedTx.decode(raw).tx;
    }
  }

  return Buffer.from(sha256(raw)).toString("hex");
}

export function getBalanceQueryData(address: string, denom: string) {
  const QBR = QueryBalanceRequest.fromJSON({ address, denom });
  const bytes = QueryBalanceRequest.encode(QBR).finish();
  return Buffer.from(bytes).toString("hex");
}

export function parseBalance(str: string) {
  const bytes = Buffer.from(str, "base64");
  const response = QueryBalanceResponse.decode(bytes);
  return response.balance?.amount;
}

export function getMessages(txstr: string): Entity[] {
  const registry = new Registry(defaultRegistryTypes);
  registry.register("/celestia.blob.v1.MsgPayForBlobs", MsgPayForBlobs);
  registry.register("/payment.MsgPayForData", MsgPayForBlobs);
  let raw = fromBase64(txstr);
  let tx;
  try {
    tx = decodeTxRaw(raw);
  } catch {
    tx = decodeTxRaw(IndexWrapper.decode(raw).tx);
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
          entityTypeName: "Message",
        },
        raw: JSON.stringify(decodedMsg),
      });
    } catch {
      decodedMessages.push({
        uniqueIdentifier: "Unknown",
        uniqueIdentifierLabel: "Type",
        metadata: {
          index: { type: "string", payload: String(index) },
        },
        computed: {},
        context: {
          network: "N/A", // TODO: replace network with path
          entityTypeName: "Message",
        },
        raw: JSON.stringify(message),
      });
    }
  });
  return decodedMessages;
}
