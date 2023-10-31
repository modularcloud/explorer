import { Any } from "./google/protobuf/any";
import {
  MsgMultiSend,
  MsgSend,
} from "./submodules/cosmos-sdk/proto/cosmos/bank/v1beta1/tx";
import { Tx } from "./submodules/cosmos-sdk/proto/cosmos/tx/v1beta1/tx";

// Helper function to decode an Any type
function decodeAny(anyMessage: any) {
  //const anyMessage = Any.decode(anyBuffer);
  const typeUrl = anyMessage.typeUrl;
  const value = anyMessage.value;

  switch (typeUrl) {
    case "/cosmos.bank.v1beta1.MsgSend":
      return MsgSend.decode(value);
    case "/cosmos.bank.v1beta1.MsgMultiSend":
      return MsgMultiSend.decode(value);
    default:
      throw new Error(`Unsupported type URL: ${typeUrl}`);
  }
}
const txRaw =
  "CpgBCpUBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEnUKL2NlbGVzdGlhMWdkMDhmM3M4eXdkanM1bjZoNjU1aDQ3OHl3ajlodmNsdHZkcWF1Ei9jZWxlc3RpYTFzOWNzYXd1c3hwZnFxa2Z0dmFkYTNlNzhjdTdhcTZjc3E1dGhjdRoRCgR1dGlhEgkxMDAwMDAwMDASawpRCkYKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSIwohAkNRMwDOCBaqDCfXFR7VjUdAMihbuQSdoTTc+DwsuSuKEgQKAggBGPcHEhYKEAoEdXRpYRIIMTc1MDMwMDAQ26sFGkBfiUdBCzkg8T7qWRl8X5BuejgcASUQgzfWTm+OmEFH0kl80IGQv7D/4AMpkcBYNAQhY8vZeVjzaP82+GBZote3";

export function decodeTx() {
  // Assume txBodyBuffer is the raw bytes you have for the transaction body
  const txBuffer = Buffer.from(txRaw, "base64");

  try {
    // Decode the transaction body
    const txBody: any = Tx.decode(txBuffer).body;

    // Get the first message from the transaction body
    const messageBuffer = txBody.messages[0];
    // Decode the Any type message
    const message = decodeAny(messageBuffer);

    // Now message contains the properly decoded message based on the type URL
    console.log("Decoded Message:", message);

    // Additional handling based on the specific message type
    // ...
  } catch (error) {
    console.error("Error parsing the transaction body:", error);
  }
}
