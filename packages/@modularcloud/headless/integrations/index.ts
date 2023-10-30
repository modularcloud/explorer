import { registerResolver } from "../router";
import * as SVM from "./svm";
import { CelestiaTransactionResolver } from "./celestia/routes/transactions/[hash]/page";
import { CelestiaBlockResolver } from "./celestia/routes/blocks/[hashOrHeight]/page";
import { CelestiaLatestTransactionsResolver } from "./celestia/routes/transactions/page";
import { CelestiaLatestBlocksResolver } from "./celestia/routes/blocks/page";
import { CelestiaBlockTransctionsResolver } from "./celestia/routes/blocks/[hashOrHeight]/transactions/page";
import { CelestiaBlockBlobsResolver } from "./celestia/routes/blocks/[hashOrHeight]/blobs/page";

export function registerResolvers() {
  registerResolver(SVM.addressOverviewResolver);
  registerResolver(SVM.addressTransactionsResolver);
  registerResolver(SVM.transactionOverviewResolver);
  registerResolver(SVM.transactionInstructionsResolver);
  registerResolver(SVM.blockOverviewResolver);
  registerResolver(SVM.blockTransactionsResolver);
  registerResolver(SVM.latestBlocksResolver);
  registerResolver(SVM.latestTransactionsResolver);

  registerResolver(CelestiaTransactionResolver);
  registerResolver(CelestiaBlockResolver);
  registerResolver(CelestiaLatestTransactionsResolver);
  registerResolver(CelestiaLatestBlocksResolver);
  registerResolver(CelestiaBlockTransctionsResolver);
  registerResolver(CelestiaBlockBlobsResolver);

}
