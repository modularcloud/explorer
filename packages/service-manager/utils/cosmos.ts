import { sha256 } from "@cosmjs/crypto";
import { fromBase64 } from "@cosmjs/encoding";
import { decodeTxRaw, Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes } from "@cosmjs/stargate";
import { Entity } from "../types/entity.type";

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
  if(parts.length === 1) {
    return "Unknown";
  }
  
  // Add IBC prefix if needed and return (properly formatted)
  return (typeUrl.indexOf("ibc") !== -1 ? "IBC " : "") + fixCapsAndSpacing(name);
}

function convertToKeyValue(obj: {[key: string]: any}): {[key: string]: string} {
  const KV: {[key: string]: string} = {};
  Object.entries(obj).forEach((entry) => {
    if(typeof entry[1] === "object") {

      // Flatten nested objects into top level keys
      Object.entries(entry[1]).forEach((subentry) => {
        KV[`${fixCapsAndSpacing(entry[0])} ${fixCapsAndSpacing(subentry[0])}`] = String(subentry[1]);
      });
    } else {
      KV[fixCapsAndSpacing(entry[0])] = String(entry[1]);
    }
  });
  return KV;
}

export function txStringToHash(txstr: string) {
  const raw = fromBase64(txstr);
  return Buffer.from(sha256(raw)).toString("hex");
}

export function getMessages(txstr: string): Entity[] {
    const registry = new Registry(defaultRegistryTypes);
    const raw = fromBase64(txstr);
    const tx = decodeTxRaw(raw);

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