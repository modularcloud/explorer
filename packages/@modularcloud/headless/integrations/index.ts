import { registerResolver } from "../router";
import * as SVM from "./svm";
import * as Celestia from "./celestia";

export function registerResolvers() {
    registerResolver(SVM.addressOverviewResolver);
    registerResolver(SVM.addressTransactionsResolver);
    registerResolver(SVM.transactionOverviewResolver);
    registerResolver(SVM.transactionInstructionsResolver);
    registerResolver(SVM.blockOverviewResolver);
    registerResolver(SVM.blockTransactionsResolver);
    registerResolver(SVM.latestBlocksResolver);
    registerResolver(SVM.latestTransactionsResolver);

    registerResolver(Celestia.CelestiaTransactionResolver);
    registerResolver(Celestia.CelestiaBlockResolver);
    registerResolver(Celestia.CelestiaLatestTransactionsResolver);
    registerResolver(Celestia.CelestiaLatestBlocksResolver);

  }