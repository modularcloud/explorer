import { Msgs } from "./celestia-msgs";
import {
  QueryAllBalancesRequest,
  QueryAllBalancesResponse,
} from "./celestia-out/celestiaorg_cosmos-sdk/cosmos/bank/v1beta1/query";
import { Tx } from "./celestia-out/celestiaorg_cosmos-sdk/cosmos/tx/v1beta1/tx";
import { Msgs as RollappsMsgs } from "./rollapps-msgs";

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
  Tx, // TODO: use the correct Tx
};
