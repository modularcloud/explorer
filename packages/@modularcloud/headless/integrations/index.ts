import { registerResolver } from "../router";
import * as SVM from "./svm";
import { CelestiaTransactionResolver } from "./celestia/routes/transactions/[hash]/page";
import { CelestiaBlockResolver } from "./celestia/routes/blocks/[hashOrHeight]/page";
import { CelestiaLatestTransactionsResolver } from "./celestia/routes/transactions/page";
import { CelestiaLatestBlocksResolver } from "./celestia/routes/blocks/page";
import { CelestiaBlockTransctionsResolver } from "./celestia/routes/blocks/[hashOrHeight]/transactions/page";
import { CelestiaBlockBlobsResolver } from "./celestia/routes/blocks/[hashOrHeight]/blobs/page";
import { CelestiaTransactionBlobsResolver } from "./celestia/routes/transactions/[hash]/blobs/page";
import { CelestiaTransactionMessagesResolver } from "./celestia/routes/transactions/[hash]/messages/page";
import { CelestiaNamespaceResolver } from "./celestia/routes/namespaces/[id]/page";
import { CelestiaAddressBalancesResolver } from "./celestia/routes/addresses/[address]/page";
import { CelestiaBlobResolver } from "./celestia/routes/transactions/[hash]/blobs/[index]/page";

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
  registerResolver(CelestiaTransactionBlobsResolver);
  registerResolver(CelestiaTransactionMessagesResolver);
  registerResolver(CelestiaNamespaceResolver);
  registerResolver(CelestiaAddressBalancesResolver);
  registerResolver(CelestiaBlobResolver);
}