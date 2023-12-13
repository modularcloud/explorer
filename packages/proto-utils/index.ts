import { Msgs } from "./celestia-msgs";
import {
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
} from "./celestia-out/celestiaorg_cosmos-sdk/cosmos/bank/v1beta1/query";
import { Tx } from "./celestia-out/celestiaorg_cosmos-sdk/cosmos/tx/v1beta1/tx";
import { Msgs as RollappsMsgs } from "./rollapps-msgs";
import { Msgs as DymensionMsgs } from "./dymension_hub-msgs";
import { Tx as DymensionTx } from "./dymension_hub-out/cosmos-sdk/cosmos/tx/v1beta1/tx";

export const Shared = {
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
};

export const Celestia = {
  Msgs,
  Tx,
};

export const Rollapps = {
  Msgs: RollappsMsgs,
  Tx: DymensionTx, // TODO: use the correct Tx
};

export const DymensionHub = {
  Msgs: DymensionMsgs,
  Tx: DymensionTx,
};
