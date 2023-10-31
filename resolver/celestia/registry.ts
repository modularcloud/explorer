import { Any } from "./google/protobuf/any";
import { Tx } from "./submodules/cosmos-sdk/proto/cosmos/tx/v1beta1/tx";
import * as _1 from "./submodules/celestia-app/proto/celestia/blob/v1/tx";
import * as _2 from "./submodules/cosmos-sdk/proto/cosmos/bank/v1beta1/tx";
import * as _3 from "./submodules/celestia-app/proto/celestia/qgb/v1/tx";
import * as _4 from "./submodules/cosmos-sdk/proto/cosmos/authz/v1beta1/tx";
import * as _5 from "./submodules/cosmos-sdk/proto/cosmos/crisis/v1beta1/tx";
import * as _6 from "./submodules/cosmos-sdk/proto/cosmos/distribution/v1beta1/tx";
import * as _7 from "./submodules/cosmos-sdk/proto/cosmos/evidence/v1beta1/tx";
import * as _8 from "./submodules/cosmos-sdk/proto/cosmos/feegrant/v1beta1/tx";
import * as _9 from "./submodules/cosmos-sdk/proto/cosmos/gov/v1/tx";
import * as _10 from "./submodules/cosmos-sdk/proto/cosmos/gov/v1/tx";
import * as _11 from "./submodules/cosmos-sdk/proto/cosmos/group/v1/tx";
import * as _12 from "./submodules/cosmos-sdk/proto/cosmos/slashing/v1beta1/tx";
import * as _13 from "./submodules/cosmos-sdk/proto/cosmos/staking/v1beta1/tx";
import * as _14 from "./submodules/cosmos-sdk/proto/cosmos/upgrade/v1beta1/tx";
import * as _15 from "./submodules/cosmos-sdk/proto/cosmos/vesting/v1beta1/tx";
import * as _16 from "./submodules/ibc-go/proto/ibc/applications/fee/v1/tx";
import * as _17 from "./submodules/ibc-go/proto/ibc/applications/interchain_accounts/controller/v1/tx";
import * as _18 from "./submodules/ibc-go/proto/ibc/applications/transfer/v1/tx";
import * as _19 from "./submodules/ibc-go/proto/ibc/applications/transfer/v1/tx";
import * as _20 from "./submodules/cosmos-sdk/proto/cosmos/nft/v1beta1/tx";
import * as _21 from "./submodules/ibc-go/proto/ibc/core/channel/v1/tx";
import * as _22 from "./submodules/ibc-go/proto/ibc/core/client/v1/tx";
import * as _23 from "./submodules/ibc-go/proto/ibc/core/connection/v1/tx";
const allParsers = [
  _1,
  _2,
  _3,
  _4,
  _5,
  _6,
  _7,
  _8,
  _9,
  _10,
  _11,
  _12,
  _13,
  _14,
  _15,
  _16,
  _17,
  _18,
  _19,
  _20,
  _21,
  _22,
  _23,
];
/**
 * This is the most time efficient and least error prone way of getting this done.
 * Ideally, there would be a script that builds this map automatically.
 */
const parsers: any = {};
allParsers.forEach((parser) => {
  if (!parser.protobufPackage) return;
  Object.entries(parser).forEach(([key, value]) => {
    if (key.startsWith("Msg")) {
      parsers[`/${parser.protobufPackage}.${key}`] = value;
    }
  });
});

// Helper function to decode an Any type
function decodeAny(anyMessage: Any) {
  //const anyMessage = Any.decode(anyBuffer);
  const typeUrl = anyMessage.typeUrl;
  const value = anyMessage.value;

  const parser = parsers[typeUrl];
  if (!parser) {
    throw new Error(`Unsupported type URL: ${typeUrl}`);
  }
  return parser.decode(value);
}

export type DecodedAny = { typeUrl: string; decodedValue: any };
export function decodeTx(txRaw: string) {
  // Assume txBodyBuffer is the raw bytes you have for the transaction body
  const txBuffer = Buffer.from(txRaw, "base64");

  try {
    const txBody = Tx.decode(txBuffer).body;
    if (!txBody) {
      return null;
    }

    const messageBuffer = txBody.messages[0];
    const message = decodeAny(messageBuffer);

    return {
      typeUrl: messageBuffer.typeUrl,
      decodedValue: message,
    };
  } catch (error) {
    return null;
  }
}
