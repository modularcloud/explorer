import { fromBase64 } from "@cosmjs/encoding";
import { decodeTxRaw, Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes } from "@cosmjs/stargate";

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

export type Message = {
  type: string,
  data: {[key: string]: string }
}

export function getMessages(txstr: string): Message[] {
    const registry = new Registry(defaultRegistryTypes);
    const raw = fromBase64(txstr);
    const tx = decodeTxRaw(raw);

    const decodedMessages = [];
    for (const message of tx.body.messages) {
        const decodedMsg = registry.decode(message);
        decodedMessages.push({
          type: convertToName(message.typeUrl),
          data: convertToKeyValue(decodedMsg),
        });
      }
      return decodedMessages;
}