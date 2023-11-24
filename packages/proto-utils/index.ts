import { Msgs } from "./celestia-msgs";
import { Tx } from "./celestia-out/celestiaorg_cosmos-sdk/cosmos/tx/v1beta1/tx";
import { Msgs as RollappsMsgs } from "./rollapps-msgs";

export const Celestia = {
    Msgs,
    Tx,
}

export const Rollapps = {
    Msgs: RollappsMsgs,
    Tx, // TODO: use the correct Tx
}